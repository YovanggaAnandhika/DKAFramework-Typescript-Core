import {Core} from "../../src";

(async () => {

    /** Server Scope function **/
    let mServ = await Core.Server({
        version: "VERSION_2",
        engine: "FASTIFY",
        host: "0.0.0.0",
        port: 23
    })
    console.log(mServ)



    /*setTimeout(async () => {
        mServ.emit("close")
    }, 3000)*/


})();