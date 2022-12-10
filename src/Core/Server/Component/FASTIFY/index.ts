import TypedEmitter from "typed-emitter";
import {FastifyServerConfiguration} from "../../Config/FASTIFY/FastifyServerConfiguration";
import {FastifyServerCallbackEvent} from "../../Config/FASTIFY/FastifyServerCallback";
import fastify, {FastifyInstance} from "fastify";

export function FastifyServer<ServerConfig extends FastifyServerConfiguration, events extends TypedEmitter<FastifyServerCallbackEvent>>(config: ServerConfig, events: events): FastifyInstance {
    let mFastify: FastifyInstance;
    mFastify = fastify(config.settings);
    return mFastify
}

export default FastifyServer;