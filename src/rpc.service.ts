import {Client} from "discord-rpc";
import { capitalize } from "lodash";
import {IConfig, ISessionMetadata} from "./plex-interfaces";

export class DiscordRPC {
    private canRecieveCommands = false;
    private rpc = new Client({
        transport: 'ipc'
    })

    constructor(config: any) {
        this.rpc.on('ready', () => {
            this.canRecieveCommands = true;
        })

        this.rpc.login({
            clientId: config.RPC_CLIENT_ID
        });
    }

    updateRPCTitleTimeStamp(title: string, state: string, imgKey: string, timeStamp?: Date, duration?: Date): void {
        if (!this.canRecieveCommands)
            return;
        this.rpc.setActivity({
            state,
            details: title,
            largeImageKey: imgKey,
            largeImageText: 'Plex',
            startTimestamp: timeStamp,
            endTimestamp: duration
        })
    }

    updateRPCBySession(config: IConfig, currentSession: ISessionMetadata): void {
        const startTime = (Date.now() - Number(currentSession.viewOffset)) as unknown as Date;
        const endTime = Date.now() + Number(currentSession.duration) - Number(currentSession.viewOffset) as unknown as Date;
        const title = currentSession.grandparentTitle ? `${currentSession.grandparentTitle}: ${currentSession.title}` : currentSession.title;
        const state = currentSession.Player.state;
        if (state !== 'paused') {
            this.updateRPCTitleTimeStamp(title, `${capitalize(state)}`, config.PLEX_IMAGE_KEY, startTime, endTime);
        } else {
            this.updateRPCTitleTimeStamp(title, `${capitalize(state)}`, config.PLEX_IMAGE_KEY);
        }
    }

    closeRPC() {
        this.rpc.clearActivity();
    }

}
