import { Service } from "typedi";
import { db } from "../data-source";
import { eq } from "drizzle-orm";
import { employee } from "../entity/Employee";

@Service()
export class EmployeeRepository {
  private readonly _db = db;

  async saveEmployee(data: any) {
    return await this._db.insert(employee).values(data);
  }

  async updateEmployee(id: number, item: any): Promise<boolean> {
    let editedEmployee = await this._db
      .update(employee)
      .set({ ...item, updatedAt: new Date(Date.now()) })
      .where(eq(employee.id, id));

    return editedEmployee[0].affectedRows === 0 ? false : true;
  }

  async findEmployeeByName(name: string) {
    return await this._db.query.employee.findFirst({
      where: (employee, { eq, and, isNull }) =>
        and(eq(employee.name, name), isNull(employee.deletedAt)),
      with: {
        role: true,
      },
    });
  }

  async findEmployeeUsingID(id: number) {
    return await this._db.query.employee.findFirst({
      where: (employee, { eq, and, isNull }) =>
        and(eq(employee.id, id), isNull(employee.deletedAt)),
      with: {
        role: true,
      },
    });
  }

  async getAllEmployees() {
    return await this._db.query.employee.findMany({
      orderBy: (employee, { desc }) => [desc(employee.createdAt)],
      where: (employee, { isNull }) => isNull(employee.deletedAt),
      with: {
        role: true,
      },
    });
  }

  async deleteEmployee(id: number) {
    let deletedEmployee = await this._db
      .update(employee)
      .set({ deleted: true, deletedAt: new Date() })
      .where(eq(employee.id, id));

    return deletedEmployee[0].affectedRows === 0 ? false : true;
  }
}
