import {Options, Server} from "../../src/Core/v1";
import path from "path";

(async () => {

    await Server({
        state: Options.Server.State.SERVER_STATE_DEVELOPMENT,
        engine: Options.Server.Engine.REACTJS,
        logger: {
            enabled: false,
            level: "none"
        },
        licenceKey: `NDM3OTYyNjU3MjY4NjE2MzZiMzIzMDMxMzA0Mzc5NjI6ZWI1NDU0YjU1M2E2YWFlYjcyMDk1M2Y3NzcxMTUzMzc3MjUyMmI1YTYxNzFiNWJjNDE5NDEwNGMzOWQ1N2Q1NWJkOTk5NWJhN2U0ODk1Yjc1M2ZhYTRmNTIxYjhkN2U3ZTM1MWFiZjg=`,
        options: {
            WebpackDev: {
                hot: true,
                open: false
            },
            Enviroment: {
                mode: "ENV",
                option: {
                    path: path.join(__dirname, "./.env")
                }
            }
        }
    })
        .then(async (res) => {
            console.log(JSON.stringify(res))
        })
        .catch(async (error) => {
            console.log(error)
        })



})();