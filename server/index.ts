import express from 'express'
import { app, conf } from './app'
import "./api"
import "./favicon"
const indexhtml = (req: any, res: any) => {
    res.status(200).send(`<!DOCTYPE html>` +
        `<html>` +
        `<head><title>Music&Lights</title><script type="module" src="/client/bundle.js"></script></head>` +
        `<body><${conf.webcomponent}></${conf.webcomponent}></body>` +
        `</html>`)
}
app.use("/client/index.html", indexhtml)
app.use("/assets", express.static(`${conf.projectRoot}/assets`))
app.use("/client", express.static(`${conf.projectRoot}/build/client`))
app.listen(5000, () => console.log("listening on 5000"))
