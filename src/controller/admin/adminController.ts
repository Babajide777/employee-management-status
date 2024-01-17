import { Request, Response, NextFunction } from "express";
import { Service } from "typedi";
import { fail, success } from "../../utils/response";
import "reflect-metadata";
import { AdminService } from "../../services/admin/adminService";
import { roleDTO, AssignRoleDTO } from "../../dto/role.dto";
import { isJSON } from "../../utils/isJSON";
import { EditEmployeeDTO, EmployeeStatusDTO } from "../../dto/employee.dto";

@Service()
export class AdminController {
  constructor(private readonly _adminService: AdminService) {}

  async createRole(request: Request, response: Response, next: NextFunction) {
    try {
      let req: roleDTO = request.body;
      const savedRole = await this._adminService.createRole(req);
      return success(response, 201, savedRole, "Role created successfully");
    } catch (error: any) {
      let message = isJSON(error.message);
      return fail(response, 400, message);
    }
  }

  async deleteRole(request: Request, response: Response, next: NextFunction) {
    try {
      const req = {
        id: Number(request.params.id),
      };

      const deletedRole = await this._adminService.deleteRole(req);

      return success(response, 200, deletedRole, "");
    } catch (error: any) {
      let message = isJSON(error.message);
      return fail(response, 400, message);
    }
  }

  async assignRole(request: Request, response: Response, next: NextFunction) {
    try {
      let req: AssignRoleDTO = request.body;

      const user = await this._adminService.roleAssign(req);

      return success(response, 200, user, "Role assigned to user");
    } catch (error: any) {
      let message = isJSON(error.message);
      return fail(response, 400, message);
    }
  }

  async getAllRoles(request: Request, response: Response, next: NextFunction) {
    try {
      const allRoles = await this._adminService.getAllRoles();
      return success(response, 200, allRoles, "All Roles retrieved");
    } catch (error: any) {
      let message = isJSON(error.message);
      return fail(response, 400, message);
    }
  }

  async getAllEmployees(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const allEmployees = await this._adminService.getAllEmployees();
      return success(response, 200, allEmployees, "All Employees retrieved");
    } catch (error: any) {
      let message = isJSON(error.message);
      return fail(response, 400, message);
    }
  }

  async UpdateEmployeeStatus(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      let req: EmployeeStatusDTO = request.body;

      const employee = await this._adminService.UpdateEmployeeStatus(req);
      return success(
        response,
        200,
        employee,
        "Employee status edited successfully"
      );
    } catch (error: any) {
      let message = isJSON(error.message);
      return fail(response, 400, message);
    }
  }
}
