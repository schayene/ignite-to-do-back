import { randomUUID } from "node:crypto";
import fs from "node:fs/promises";

const databasePath = new URL("../../db.json", import.meta.url);

export class Database {
  #database = {};

  constructor() {
    fs.readFile(databasePath, "utf-8")
      .then((data) => (this.#database = JSON.parse(data)))
      .catch(() => this.#persist());
  }

  #persist() {
    fs.writeFile(databasePath, JSON.stringify(this.#database));
  }

  select(table) {
    return this.#database[table] ?? [];
  }

  insert(table, data) {
    const task = {
      id: randomUUID(),
      created_at: new Date(),
      updated_at: null,
      completed_at: null,
      ...data,
    };

    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(task);
    } else {
      this.#database[table] = [task];
    }

    this.#persist();
  }

  update(table, id, data) {
    const rowIndex = this.#database[table].findIndex((row) => row.id === id);

    if (rowIndex > -1) {
      this.#database[table][rowIndex] = {
        ...this.#database[table][rowIndex],
        ...data,
        updated_at: new Date(),
      };
    }

    this.#persist();
  }

  patch(table, id, data) {
    const rowIndex = this.#database[table].findIndex((row) => row.id === id);

    if (rowIndex > -1) {
      for (const key in data) {
        this.#database[table][rowIndex][key] = data[key]
      }
    }

    this.#persist();
  }
}
