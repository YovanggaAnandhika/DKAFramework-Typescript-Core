import TypedEmitter from "typed-emitter";
import {ServerCallbackEventListening} from "../Global";


export interface FastifyServerCallbackEventListening extends ServerCallbackEventListening {

}

export type FastifyServerCallbackEvent = {
    listening: (result: FastifyServerCallbackEventListening) => void;
    error: (error: any) => void;
    close: () => void;
    ready: () => void;
}


export type FastifyServerCallback<Version> = Version extends "VERSION_1" ? Promise<FastifyServerCallbackV1> :
    Version extends "VERSION_2" ? FastifyServerCallbackV2 :
        undefined;

export interface FastifyServerCallbackV1 {

}

export interface FastifyServerCallbackV2 extends TypedEmitter<FastifyServerCallbackEvent> {

}