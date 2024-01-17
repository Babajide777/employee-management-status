import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { role } from "../entity/Role";

export const validateRoleSchema = createInsertSchema(role);

export type roleDTO = z.infer<typeof validateRoleSchema>;

export const validateAssignRoleToUser = z.object({
  userId: z.number().positive(),
  roleId: z.number().positive(),
});

export type AssignRoleDTO = z.infer<typeof validateAssignRoleToUser>;
