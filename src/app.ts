import {DiscordRPC} from "./rpc.service";
import {IConfig, ISessionsResponse} from "./plex-interfaces";
import {PlexApiWrapper} from "./plex.service";
import {EMPTY, interval} from "rxjs";
import {catchError, distinctUntilChanged, switchMap, tap} from "rxjs/operators";
import fs from "fs";
import {last, sortBy} from "lodash";
import {validateConfig} from "./plex-consts";

const TIME_INTERVAL = 5000;
export class App {
    private rpcService?: DiscordRPC;
    private readonly config?: IConfig;
    private runApp(config: IConfig, {MediaContainer: res}: any, plex: PlexApiWrapper) {
        const observedClientIP = config.PLEX_OBSERVING_CLIENT_IP;
        interval(TIME_INTERVAL).pipe(
            switchMap(() => plex.query('/status/sessions')),
            catchError((e: Error) => {
                const datenow = new Date();
                fs.writeFileSync(`fetch-error-log-${datenow.toDateString()}-${datenow.getHours()}.${datenow.getMinutes()}.json`, JSON.stringify(e, Object.getOwnPropertyNames(e), 2))
                this.rpcService?.closeRPC();
                return EMPTY;
            }),
            tap(({MediaContainer: {Metadata: meta}}: ISessionsResponse) => {
                if (meta) {
                    const clientSessions = sortBy(meta.filter(session => session.Player.address === observedClientIP),'key');
                    const currSession = last(clientSessions);
                    if (currSession) {
                        this.rpcService?.updateRPCBySession(config, currSession);
                    }
                } else {
                    this.rpcService?.closeRPC();
                }
            }),
            distinctUntilChanged()
        ).subscribe()
    }
    constructor() {
        try {
            this.config = JSON.parse(String(fs.readFileSync('./config/config.json')));
            if (this.config && validateConfig(this.config)) {
                const plex = new PlexApiWrapper({ hostname: this.config.PLEX_API_HOSTNAME, token: this.config.PLEX_API_KEY });
                this.rpcService = new DiscordRPC(this.config);
                if (this.rpcService)
                    plex.query('/').then((res) => this.runApp(this.config as IConfig, res, plex));
            } else {
                throw(new Error('Config invalid !'))
            }
        } catch (e: any) {
            const datenow = new Date();
            fs.writeFileSync(`crash-log-${datenow.toDateString()}-${datenow.getHours()}.${datenow.getMinutes()}.json`, JSON.stringify(e, Object.getOwnPropertyNames(e), 2))
        }
    }
}
