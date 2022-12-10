import {createServer as createServerHTTP, Server as HTTPServer} from "http";
import {createServer as createServerHTTPS, Server as HTTPSServer} from "https";
import {SocketIOServerServerConfiguration} from "../../../Config/SOCKET.IO/SERVER/SocketIOServerConfiguration";
import {Server as SocketsServer} from "socket.io";
import {DefaultEventsMap} from "socket.io/dist/typed-events";
import TypedEmitter from "typed-emitter";
import {SocketIOServerCallbackEvent} from "../../../Config/SOCKET.IO/SERVER/SocketIOServerCallback";


export function SocketServer<ServerConfig extends SocketIOServerServerConfiguration, events extends TypedEmitter<SocketIOServerCallbackEvent>>(config: ServerConfig, events: events): HTTPServer | HTTPSServer {
    /** Declaration Initialization Variable **/
    let ServerProtocolEngine: HTTPServer | HTTPSServer;
    let io: SocketsServer<DefaultEventsMap, DefaultEventsMap, any> | undefined;

    /** Io Handler After Initialization Event **/
    function IOHandler() {
        io?.on("connection", async (socket) => {
            await events.emit("connection", socket);
        })
    }

    /** Selection Server Protocol engine **/
    switch (config?.settings?.server?.protocol) {
        case "HTTP" :
            ServerProtocolEngine = (config?.settings?.server?.settings !== undefined) ? createServerHTTP(config?.settings?.server?.settings) : createServerHTTP();
            io = new SocketsServer(ServerProtocolEngine, config?.settings?.socket);
            IOHandler()
            return ServerProtocolEngine;
        case "HTTPS" :
            ServerProtocolEngine = (config?.settings?.server?.settings !== undefined) ? createServerHTTPS(config?.settings?.server?.settings) : createServerHTTPS();
            io = new SocketsServer(ServerProtocolEngine, config?.settings?.socket);
            IOHandler()
            return ServerProtocolEngine;
        default :
            ServerProtocolEngine = (config?.settings?.server?.settings !== undefined) ? createServerHTTP(config?.settings?.server?.settings) : createServerHTTP();
            io = new SocketsServer(ServerProtocolEngine, config?.settings?.socket);
            IOHandler()
            return ServerProtocolEngine;
    }


}