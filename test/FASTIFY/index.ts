import {Server} from "../../src/Core/v1";
import Encryption from "@dkaframework/encryption";

(async () => {
    let enc = new Encryption({
        secretKey: "Cyberhack2010"
    });
    /*console.log(enc.encodeIvSync({
        name : "Yovangga Anandhika",
        expiresTo : 1764072459
    }));*/
    await Server({
        engine: "FASTIFY",
        app: async (app, opts, next) => {
            app.get("/", async (request, response) => {
                response.send(`Kami Mengundang ${(request.query as any).name}`)
            })
        },
        port: 733,
        licenceKey: `./dka.env`,
        settings: {
            electron: {
                enabled: true
            }
        }
    });
})();