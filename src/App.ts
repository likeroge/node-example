import express, { Router } from "express";
import { config } from "../config/config";
import mongoose from "mongoose";
import cors from "cors";

interface IRouter {
  router: Router;
  path: string;
}

export class App {
  app: express.Application;
  port: number;
  routes: IRouter[];

  constructor(port: number) {
    this.app = express();
    this.routes = [];
    this.port = port;
  }

  async start() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.routes.map((router: IRouter) => {
      this.app.use(config.app.defaultApiUrl + router.path, router.router);
    });

    try {
      await mongoose.connect(config.app.mongoURL, {}, () =>
        console.log("Greetings from DB")
      );
      console.log("DB connected");
      this.app.listen(this.port, () => console.log("Server is up"));
    } catch (err) {
      console.log(err);
    }
  }

  addRoute(router: Router, path: string = "") {
    const newRouter: IRouter = {
      router: router,
      path: path,
    };
    this.routes.push(newRouter);
  }
}
