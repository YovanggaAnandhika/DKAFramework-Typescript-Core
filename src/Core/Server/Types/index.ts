import {FastifyServerConfiguration} from "../Config/FASTIFY/FastifyServerConfiguration";
import {FastifyServerCallbackV1, FastifyServerCallbackV2} from "../Config/FASTIFY/FastifyServerCallback";
import {SocketIOServerServerConfiguration} from "../Config/SOCKET.IO/SERVER/SocketIOServerConfiguration";
import {SocketIOServerCallback} from "../Config/SOCKET.IO/SERVER/SocketIOServerCallback";

export type SeverFastifySelectVersion<ServerConfig> =
    ServerConfig extends { version: "VERSION_1" } ? Promise<FastifyServerCallbackV1> :
        ServerConfig extends { version: "VERSION_2" } ? FastifyServerCallbackV2 :
            never;

export type ServerCallback<ServerConfig> =
    ServerConfig extends FastifyServerConfiguration ? SeverFastifySelectVersion<ServerConfig> :
        ServerConfig extends SocketIOServerServerConfiguration ? SocketIOServerCallback
            : undefined;


export type ServerConfigurationMultipleTypes = FastifyServerConfiguration | SocketIOServerServerConfiguration;
