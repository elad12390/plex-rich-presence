import {DiscordRPC} from "./rpc.service";
import {IConfig, ISessionsResponse} from "./plex-interfaces";
import {PlexApiWrapper} from "./plex.service";
import {EMPTY, interval, Observable, of} from "rxjs";
import {catchError, delay, distinctUntilChanged, retryWhen, switchMap, tap} from "rxjs/operators";
import fs from "fs";
import {last, sortBy} from "lodash";
import {DELAY_AFTER_ERROR, TIME_INTERVAL, validateConfig} from "./consts";

export class App {
    private readonly rpcService?: DiscordRPC;
    private readonly config?: IConfig;
    private runApp(config: IConfig, {MediaContainer: res}: any, plex: PlexApiWrapper) {
        const observedClientIP = config.PLEX_OBSERVING_CLIENT_IP;
        interval(TIME_INTERVAL).pipe(
            switchMap(() => plex.query('/status/sessions')),
            retryWhen((errors: Observable<any>) => {
                return errors.pipe(
                    tap((e: Error) => {
                        const datenow = new Date();
                        fs.writeFileSync(`fetch-error-log-${datenow.toDateString()}-${datenow.getHours()}.${datenow.getMinutes()}.json`, JSON.stringify(e, Object.getOwnPropertyNames(e), 2))
                        this.rpcService?.closeRPC();
                    }),
                    delay(DELAY_AFTER_ERROR),
                    switchMap(() => plex.query('/status/sessions'))
                );
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
                    of(null)
                        .pipe(
                            switchMap(() => plex.query('/')),
                            retryWhen((errors: Observable<any>) => errors.pipe(
                               delay(DELAY_AFTER_ERROR),
                               tap((e) => {
                                   console.log('Cannot query PleX.');
                                   const datenow = new Date();
                                   const dateStr = `${datenow.toDateString()}-${datenow.getHours()}.${datenow.getMinutes()}`;
                                   fs.writeFileSync(`plex-error-log-${dateStr}.json`,
                                       JSON.stringify(e, Object.getOwnPropertyNames(e), 2))
                               }),
                            )),
                            tap((res) => this.runApp(this.config as IConfig, res, plex))
                        ).subscribe();
            } else {
                throw(new Error('Config invalid !'))
            }
        } catch (e: any) {
            const datenow = new Date();
            fs.writeFileSync(`crash-log-${datenow.toDateString()}-${datenow.getHours()}.${datenow.getMinutes()}.json`, JSON.stringify(e, Object.getOwnPropertyNames(e), 2))
        }
    }
}
