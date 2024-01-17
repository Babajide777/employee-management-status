import { relations } from "drizzle-orm";
import {
  mysqlTable,
  timestamp,
  int,
  boolean,
  mysqlEnum,
} from "drizzle-orm/mysql-core";
import { employee } from "./Employee";

export const role = mysqlTable("role", {
  id: int("id").primaryKey().autoincrement(),
  name: mysqlEnum("name", ["manager", "developer", "design", "scrum master"])
    .notNull()
    .unique(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at"),
  deletedAt: timestamp("deleted_at"),
  deleted: boolean("deleted").default(false),
});

export const roleRelations = relations(role, ({ many }) => ({
  employees: many(employee),
}));
