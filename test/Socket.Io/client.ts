import {Client, Options} from "../../src/Core/v1";

(async () => {
    await Client({
        state: Options.Server.State.SERVER_STATE_DEVELOPMENT,
        engine: Options.Server.Engine.SOCKETIO.Client,
        logger: {
            enabled: true
        },
        host: "127.0.0.1",
        port: 213,
        licenceKey: `./dka.env`,
        costumNameSpace: "/test",
        events: {
            onPing: (latency) => {
                console.log(`${latency} ms`)
            }
        },
        onConnect: async (io) => {
            console.log(`onconnect`, io?.id);
            io?.io?.emit("TEST_DATA", {halo: "dunia"});
        },
        onConnectError: async (io) => {

        },
        onDisconnect: async (id) => {

        },
        settings: {
            /*secure : true,
            key : fs.readFileSync(path.join(__dirname, "./CA/localhost.key")).toString('utf-8'),
            cert : fs.readFileSync(path.join(__dirname,"./CA/localhost.crt")).toString('utf-8'),
            passphrase : "Cyberhack2010",*/
            autoConnect: true,
            /*encryption : {
                enabled : true
            }*/
        }
    }).then(async (result) => {
        //console.log(result);
    }).catch(async (e) => {
        console.error(e);
    })
})();