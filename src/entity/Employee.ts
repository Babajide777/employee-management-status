import { relations } from "drizzle-orm";
import {
  mysqlTable,
  text,
  timestamp,
  varchar,
  int,
  boolean,
  mysqlEnum,
} from "drizzle-orm/mysql-core";
import { role } from "./Role";

export const employee = mysqlTable("employee", {
  id: int("id").primaryKey().autoincrement(),
  name: varchar("name", { length: 256 }).notNull(),
  status: mysqlEnum("status", ["employed", "fired"]),
  roleId: int("role_id").references(() => role.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at"),
  deletedAt: timestamp("deleted_at"),
  deleted: boolean("deleted").default(false),
});

export const employeeRelations = relations(employee, ({ one }) => ({
  role: one(role, {
    fields: [employee.roleId],
    references: [role.id],
  }),
}));
