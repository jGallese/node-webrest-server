import { Router } from "express";
import { TodosController } from "./todos/controller";
import { TodoRoutes } from "./todos/routes";

export class AppRoutes {

  static get routes(): Router {
    const router = Router();
    const todoController = new TodosController();

    //* funcion .use es un middleware, es un pasamanos, se ejecuta para llamar a otra
    router.use('/api/todos', TodoRoutes.routes);

    return router;
  }

}