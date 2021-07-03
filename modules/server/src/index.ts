import http from "http";
import Koa from "koa";
import bodyParser from "koa-bodyparser";
import logger from "koa-logger";
import helmet from "koa-helmet";
import cors from "@koa/cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import chalk from "chalk";
import { Server } from "socket.io";

dotenv.config();

const app = new Koa();
app.use(cors({ credentials: true }));
app.use(logger());
app.use(bodyParser());
app.use(helmet());

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.statusCode || err.status || 500;
    ctx.body = {
      message: err.message,
      data: err.data,
    };
  }
});

import routes from "./routes";

routes(app);

const server = http.createServer(app.callback());
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const port = process.env.PORT || 5201;

server.listen(port, () =>
  console.log(`✅  The server is running at http://localhost:${port}/`)
);
