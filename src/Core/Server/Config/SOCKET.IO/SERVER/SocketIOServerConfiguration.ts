import {ServerOptions as ServerOptionsHttp} from "http";
import {ServerOptions as ServerOptionsHttps} from "https";
import {ServerOptions} from "socket.io";

export type SocketIOServerServerConfigurationSettingsServerProtocolSettings<Protocol> =
    Protocol extends "HTTP" ? ServerOptionsHttp :
        Protocol extends "HTTPS" ? ServerOptionsHttps
            : ServerOptionsHttp;

export interface SocketIOServerServerConfigurationSettingsServer<Protocol = "HTTP" | "HTTPS"> {
    protocol: Protocol,
    settings?: SocketIOServerServerConfigurationSettingsServerProtocolSettings<Protocol>
}

export interface SocketIOServerServerConfigurationSettingsSocket extends Partial<ServerOptions> {

}

export interface SocketIOServerServerConfigurationSettings {
    server?: SocketIOServerServerConfigurationSettingsServer | undefined,
    socket?: SocketIOServerServerConfigurationSettingsSocket | undefined
}

export interface SocketIOServerServerConfiguration {
    engine: "SOCKET.IO"
    port: number,
    settings?: SocketIOServerServerConfigurationSettings
}