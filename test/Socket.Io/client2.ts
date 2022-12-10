import {Client, Options} from "../../src/Core/v1";

(async () => {
    await Client({
        state: Options.Server.State.SERVER_STATE_DEVELOPMENT,
        engine: Options.Server.Engine.SOCKETIO.Client,
        host: "127.0.0.1",
        port: 213,
        costumNameSpace: "test2",
        licenceKey: `./dka.env`,
        events: {
            onPing: (latency) => {
                console.log(`${latency} ms`)
            }
        },
        onConnect: async (io) => {
            console.log(`onconnect`, io?.id)
        },
        onConnectError: async (io) => {
            console.log(io)
        },
        onDisconnect: async (id) => {
            console.log(`user disconnect`, JSON.stringify(id))
        },
        settings: {
            autoConnect: true
        }
    }).then(async (result) => {
        //console.log(result);
    }).catch(async (e) => {
        console.error(e);
    })
})();