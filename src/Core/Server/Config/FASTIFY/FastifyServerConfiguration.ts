import {FastifyServerOptions} from "fastify";


export interface FastifyServerConfigurationSettings extends FastifyServerOptions {

}

export interface FastifyServerConfigurationLogger {
    CatchUnknownError?: Error | string | undefined
}


export interface FastifyServerConfiguration {
    version ?: "VERSION_1" | "VERSION_2",
    engine ?: "FASTIFY",
    logger ?: undefined | FastifyServerConfigurationLogger,
    host ?: string,
    port ?: number,
    settings?: FastifyServerConfigurationSettings
}