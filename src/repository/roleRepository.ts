import { Service } from "typedi";
import { eq, and } from "drizzle-orm";
import { db } from "../data-source";
import { role } from "../entity/Role";

@Service()
export class RoleRepository {
  private readonly _db = db;

  async saveRole(data: any) {
    return await this._db.insert(role).values(data);
  }

  async findRoleUsingName(
    name: "manager" | "developer" | "design" | "scrum master"
  ) {
    return await this._db.query.role.findFirst({
      where: (role, { eq, and, isNull }) =>
        and(eq(role.name, name), isNull(role.deletedAt)),
    });
  }

  async deleteRole(id: number): Promise<boolean> {
    let deletedRole: any = await this._db
      .update(role)
      .set({ deleted: true, deletedAt: new Date() })
      .where(eq(role.id, id));

    return deletedRole[0].affectedRows === 0 ? false : true;
  }

  async checkRoleUsingID(id: number) {
    return await this._db.query.role.findFirst({
      where: (role, { eq, and, isNull }) =>
        and(eq(role.id, id), isNull(role.deletedAt)),
    });
  }

  async getAllRoles() {
    return await this._db.query.role.findMany({
      orderBy: (role, { desc }) => [desc(role.createdAt)],
      where: (role, { isNull }) => isNull(role.deletedAt),
    });
  }

  async updateRoleUsingId(id: number, item: any): Promise<boolean> {
    let editedRole = await this._db
      .update(role)
      .set({ ...item, updatedAt: new Date(Date.now()) })
      .where(eq(role.id, id));

    return editedRole[0].affectedRows === 0 ? false : true;
  }
}
