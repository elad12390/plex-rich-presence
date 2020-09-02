import {RequestOptions} from "http";
export interface IConfig {
    RPC_CLIENT_ID: string;
    PLEX_API_HOSTNAME: string;
    PLEX_API_KEY: string;
    PLEX_OBSERVING_CLIENT_IP: string;
    PLEX_IMAGE_KEY: string;
}
export interface IConfigErrors {
    RPC_CLIENT_ID?: string;
    PLEX_API_HOSTNAME?: string;
    PLEX_API_KEY?: string;
    PLEX_OBSERVING_CLIENT_IP?: string;
}
export interface PlexApiOptions {
    hostname: string;
    port?: string;
    https?: boolean
    username?: string;
    password?: string;
    managedUser?: {
        name?: string;
        pin?: string;
    };
    token?: string;
    timeout?: number;
    responseParser?: () => any;
    requestOptions?: RequestOptions
    options?: {
        identifier: string;
        product: string;
        version: string;
        deviceName: string;
        platform: string;
        platformVersion: string;
        device: string;
    }
}
export interface ISessionMetadata {
    addedAt: string;
    art: string;
    contentRating: string;
    duration: string;
    grandparentArt: string;
    grandparentGuid: string;
    grandparentKey: string;
    grandparentRatingKey: string;
    grandparentTheme: string;
    grandparentThumb: string;
    grandparentTitle: string;
    guid: string;
    index: string;
    key: string;
    lastViewedAt: string;
    librarySectionID: string;
    librarySectionKey: string;
    librarySectionTitle: string;
    originallyAvailableAt: string;
    parentGuid: string;
    parentIndex: string;
    parentKey: string;
    parentRatingKey: string;
    parentThumb: string;
    parentTitle: string;
    ratingKey: string;
    sessionKey: string;
    summary: string;
    thumb: string;
    title: string;
    titleSort: string;
    type: string;
    updatedAt: string;
    viewOffset: string;
    year: string;
    Media: IMediaMetadata[];
    User: IUserMetadata;
    Player: IPlayerMetadata;
    Session: ISessionMetadata;
}
export interface IUserMetadata {
    id: string;
    thumb: string;
    title: string;
}
export interface IMediaMetadata {
    aspectRatio: string;
    audioChannels: string;
    audioCodec: string;
    audioProfile: string;
    bitrate: string;
    container: string;
    duration: string;
    height: string;
    id: string;
    videoCodec: string;
    videoFrameRate: string;
    videoProfile: string;
    videoResolution: string;
    width: string;
    selected: boolean;
    Part: {
        audioProfile: string;
        container: string;
        duration: string;
        file: string;
        id: string;
        indexes: string;
        key: string;
        size: string;
        videoProfile: string;
        decision: string;
        selected: boolean;
        Stream: {
            bitDepth: string;
            bitrate: string;
            chromaLocation: string;
            chromaSubsampling: string;
            codec: string;
            codedHeight: string;
            codedWidth: string;
            default: string;
            displayTitle: string;
            extendedDisplayTitle: string;
            frameRate: string;
            hasScalingMatrix: string;
            height: string;
            id: string;
            index: string;
            level: string;
            profile: string;
            refFrames: string;
            scanType: string;
            streamType: string;
            width: string;
            location: string;
        }[];
    }[];
}

export interface IPlayerMetadata {
    address: string;
    device: string;
    machineIdentifier: string;
    model: string;
    platform: string;
    platformVersion: string;
    product: string;
    profile: string;
    remotePublicAddress: string;
    state: string;
    title: string;
    vendor: string;
    version: string;
    local: boolean;
    relayed: boolean;
    secure: boolean;
    userID: number;
}

export interface ISessionMetadata {
    id: string;
    bandwidth: number;
    location: string;
}

export interface ISessionsResponse {
    MediaContainer: {
        size: number;
        Metadata: ISessionMetadata[];
    }
}
