import express from "express";
// @ts-ignore
import cors from "cors";
import session from "express-session";
import { Express_Session_Secret, Full_Domain, PORT } from "../Config";
import Logger from "../Lib/Logger";
import RouteHandler from "../Handlers/RouteHandler";
import { IContributor } from "../Interfaces/Contributor";

declare module "express-session"
{
    interface SessionData {
        user?: IContributor;
    }
}

const server = express();

server.use(cors({
    origin: "*",
    credentials: true,
}));

let sessionMiddleWare = session({
    secret: Express_Session_Secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        path: "/",
        maxAge: 30*24*60*60*1000,
    }
});

server.use(sessionMiddleWare);

server.use(express.urlencoded({ extended: true }));
server.use((req, res, next) => {
    express.json({verify: (req, res, buf, encoding) => {
        // @ts-ignore
        req.rawBody = buf;
    }})(req, res, next);
});

server.use((req, res, next) => {
    res.setHeader('X-Powered-By', 'Tolfix');
    next();
});

RouteHandler(server);

server.listen(PORT, () => Logger.api(`Server listing on port ${PORT} | ${Full_Domain}`));