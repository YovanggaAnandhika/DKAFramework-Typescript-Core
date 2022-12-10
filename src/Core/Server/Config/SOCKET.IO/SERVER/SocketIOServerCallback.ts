import {Socket} from "socket.io";
import TypedEmitter from "typed-emitter"
import {DefaultEventsMap} from "socket.io/dist/typed-events";
import {ServerCallbackEventListening} from "../../Global";

export interface SocketIOServerCallbackEventListening extends ServerCallbackEventListening {

}

export type SocketIOServerCallbackEvent = {
    listening: (result: SocketIOServerCallbackEventListening) => void;
    error: (error: any) => void;
    close: () => void;
    connection: (io: Socket<DefaultEventsMap, DefaultEventsMap, any>) => void;
}

export interface SocketIOServerCallback extends TypedEmitter<SocketIOServerCallbackEvent> {

}