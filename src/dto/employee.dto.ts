import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { employee } from "../entity/Employee";

export const validateEmployeeSchema = createInsertSchema(employee);

export type employeeDTO = z.infer<typeof validateEmployeeSchema>;

export const validateprofileDetailID = z.object({
  id: z.number().positive(),
});

export type ProfileDetailDTO = z.infer<typeof validateprofileDetailID>;

export const valiteEditEmployee = z.object({
  id: z.number().positive(),
  name: z.string(),
  status: z.enum(["employed", "fired"]).optional(),
  roleId: z.number().positive().optional(),
});

export type EditEmployeeDTO = z.infer<typeof valiteEditEmployee>;

export const valiteUpdateEmployeeStatus = z.object({
  id: z.number().positive(),
  status: z.enum(["employed", "fired"]),
});

export type EmployeeStatusDTO = z.infer<typeof valiteUpdateEmployeeStatus>;
