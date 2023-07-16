import { Database } from "./database/index.js";
import { buildRoutePath } from "./utils/build-route-path.js";

const database = new Database();

export const routes = [
  {
    method: "GET",
    path: buildRoutePath("/tasks"),
    handler(request, response) {
      return response.end(JSON.stringify(database.select("tasks")));
    },
  },
  {
    method: "POST",
    path: buildRoutePath("/tasks"),
    handler(request, response) {
      database.insert("tasks", request.body);

      return response.writeHead(201).end("Tarefa criada com sucesso!");
    },
  },
  {
    method: "PUT",
    path: buildRoutePath("/tasks/:id"),
    handler(request, response) {
      const { id } = request.params;
      const { title, description } = request.body;

      database.update("tasks", id, {
        title,
        description,
      });

      return response.writeHead(204).end("Tarefa alterada com sucesso!");
    },
  },
  {
    method: "PATCH",
    path: buildRoutePath("/tasks/:id/complete"),
    handler(request, response) {
      const { id } = request.params;

      database.patch("tasks", id, {
        completed_at: new Date(),
      });

      return response.writeHead(204).end("Tarefa completada com sucesso!");
    },
  },
  {
    method: "DELETE",
    path: buildRoutePath("/tasks/:id"),
    handler(request, response) {
      return response.writeHead(204).end("Tarefa deletada com sucesso!");
    },
  },
];
