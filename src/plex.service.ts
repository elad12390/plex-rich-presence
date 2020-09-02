import {RequestOptions} from "http";
import {merge} from "lodash";
import {PlexApiOptions} from "./plex-interfaces";
const PlexApi = require("plex-api");
export class PlexApiWrapper {
    hostname?: string;
    port: any;
    https: any;
    requestOptions: any;
    timeout: any;
    username: any;
    password: any;
    managedUser: any;
    authToken: any;
    authenticator: any;
    responseParser: any;
    options: any;
    serverUrl?: string;
    getHostname: () => string = () => {
        return '';
    };
    getPort: () => any = () => null;
    getIdentifier: () => any = () => null;
    query: (options: any) => Promise<any> = (options: any) => new Promise<any>(() => null);
    postQuery: (options: any) => Promise<any> = (options: any) => new Promise<any>(() => null);
    putQuery: (options: any) => Promise<any> = (options: any) => new Promise<any>(() => null);
    deleteQuery: (options: any) => Promise<any> = (options: any) => new Promise<any>(() => null);
    perform: (options: any) => Promise<any> = (options: any) => new Promise<any>(() => null);
    find: (options: any, criterias: any) => Promise<any> = (options: any, criterias: any) => new Promise<any>(() => null);
    constructor(options: PlexApiOptions, deprecatedPort?: any) {
        merge(this, new PlexApi(options, deprecatedPort));
    };
}
