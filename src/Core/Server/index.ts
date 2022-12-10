import {ServerCallback, ServerConfigurationMultipleTypes} from "./Types";
import TypedEmitter from "typed-emitter";
import {SocketIOServerCallbackEvent} from "./Config/SOCKET.IO/SERVER/SocketIOServerCallback";
import {EventEmitter} from "events";
import {SocketServer} from "./Component/SOCKET.IO/Server";
import * as tcpPortUsed from "tcp-port-used";
import {FastifyServerCallbackEvent} from "./Config/FASTIFY/FastifyServerCallback";
import FastifyServer from "./Component/FASTIFY";

export type FastifyVersion = "VERSION_1" | "VERSION_2";

export function Server<ServerConfig extends ServerConfigurationMultipleTypes, T extends ServerCallback<ServerConfig>>(config: ServerConfig): T {
    switch (config.engine) {
        case "FASTIFY":
            switch (config.version) {
                case "VERSION_1" :
                    let mReturned = new Promise(async (resolve, rejected) => {
                        resolve({})
                    })
                    return mReturned as T;
                case "VERSION_2" :
                    let mEventsFastify = new EventEmitter() as TypedEmitter<FastifyServerCallbackEvent>;
                    let mServerFastify = FastifyServer(config, mEventsFastify);
                    /** Check Port Used **/
                    tcpPortUsed.check({
                        host: config.host,
                        port: config.port as number,
                    }).then(async (inUse) => {
                        if (!inUse) {
                            await mServerFastify.listen({
                                host: config.host,
                                port: config.port
                            }, async (error) => {
                                if (!error) {
                                    mEventsFastify.emit("listening", {
                                        status: true,
                                        code: 200,
                                        msg: `server running successfully`
                                    });
                                } else {
                                    try {
                                        mEventsFastify.emit("error", {
                                            status: false,
                                            code: 500,
                                            msg: `Server Running Failed`,
                                            error: {errorNames: "DKA_SERVER_FAILED_TO_START"}
                                        });
                                    } catch (e) {
                                        (config.logger !== undefined && config.logger.CatchUnknownError !== undefined) ? console.error(e) : null;
                                    }
                                }
                            });
                        } else {
                            try {
                                mEventsFastify.emit("error", {
                                    status: false,
                                    code: 500,
                                    msg: `Server Running Failed`,
                                    error: {errorNames: "DKA_PORT_SERVER_IN_USE"}
                                });
                            } catch (e) {
                                (config.logger !== undefined && config.logger.CatchUnknownError !== undefined) ? console.error(e) : null;
                            }
                        }
                    });
                    mEventsFastify.on("close", async () => {
                        await mServerFastify.close();
                    })
                    return mEventsFastify as T;
                default :
                    return undefined as T;
            }
        case "SOCKET.IO":
            let mEventsSocket = new EventEmitter() as TypedEmitter<SocketIOServerCallbackEvent>;
            /** Get Component Inizialitation **/
            let mServerSocket = SocketServer(config, mEventsSocket);
            /** Check Port Used **/
            tcpPortUsed.check({
                host: "0.0.0.0",
                port: config.port as number,
            }).then(async (inUse) => {
                if (!inUse) {
                    await mServerSocket.listen(config.port, async () => {
                        mEventsSocket.emit("listening", {
                            status: true,
                            code: 200,
                            msg: `server running successfully`
                        })
                    });
                } else {
                    try {
                        mEventsSocket.emit("error", {
                            status: false,
                            code: 500,
                            msg: `Server Running Failed`,
                            error: {errorNames: "DKA_PORT_SERVER_IN_USE"}
                        });
                    } catch (e) {

                    }
                }
            })

            mEventsSocket.on("close", async () => {
                mServerSocket.close();
            })
            return mEventsSocket as T;
        default :
            return undefined as T;
    }
}

export function Client() {

}

export default {Server, Client}