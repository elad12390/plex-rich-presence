import fs from "fs";
import {IConfig, IConfigErrors} from "./plex-interfaces";
import { keys } from "lodash";
export const IP_REGEX = new RegExp("^((25[0-5]|(2[0-4]|1[0-9]|[1-9]|)[0-9])(\\.(?!$)|$)){4}$");
export const validateConfig = (config: IConfig): boolean => {
    const errors: IConfigErrors = {};
    if (!config.PLEX_API_HOSTNAME || !config.PLEX_API_HOSTNAME.match(IP_REGEX)) {
        errors.PLEX_API_HOSTNAME = "Hostname missing or does not match regex."
    }
    if (!config.PLEX_OBSERVING_CLIENT_IP || !config.PLEX_OBSERVING_CLIENT_IP.match(IP_REGEX)) {
        errors.PLEX_OBSERVING_CLIENT_IP = "Client ip missing or does not match regex."
    }
    if (!config.RPC_CLIENT_ID || !config.RPC_CLIENT_ID.match(new RegExp("^[0-9]{18}$"))) {
        errors.RPC_CLIENT_ID = "Rpc client id missing or does not match regex."
    }
    if (keys(errors).length) {
        fs.writeFileSync('./config/config-errors.json', JSON.stringify(errors,Object.getOwnPropertyNames(errors),2));
        return false;
    }
    return true;
}
