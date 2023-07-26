import { Database } from "./database/index.js";
import { buildRoutePath } from "./utils/build-route-path.js";
import { validator } from "./utils/validator/index.js";

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
      let { error, message } = validator(
        ["title", "description"],
        request.body
      );

      if (error) {
        return response.end(message);
      }

      const { title, description } = request.body;

      database.insert("tasks", {
        title,
        description,
      });

      return response.writeHead(201).end("Tarefa criada com sucesso!");
    },
  },
  {
    method: "PUT",
    path: buildRoutePath("/tasks/:id"),
    handler(request, response) {
      let { error, message } = validator(
        ["title", "description"],
        request.body
      );

      if (error) {
        return response.end(message);
      }

      const { id } = request.params;
      const { title, description } = request.body;

      const index = database.update("tasks", id, {
        title,
        description,
      });

      if (index < 0) {
        return response.end("Tarefa não existe!");
      }

      return response.end("Tarefa alterada com sucesso!");
    },
  },
  {
    method: "PATCH",
    path: buildRoutePath("/tasks/:id/complete"),
    handler(request, response) {
      const { id } = request.params;

      const index = database.patch("tasks", id, {
        completed_at: new Date(),
      });

      if (index < 0) {
        return response.end("Tarefa não existe!");
      }

      return response.end("Tarefa completada com sucesso!");
    },
  },
  {
    method: "DELETE",
    path: buildRoutePath("/tasks/:id"),
    handler(request, response) {
      const { id } = request.params;

      const index = database.delete("tasks", id);

      if (index < 0) {
        return response.end("Tarefa não existe!");
      }

      return response.end("Tarefa deletada com sucesso!");
    },
  },
];
