import { Request, Response, NextFunction } from "express";
import { Service } from "typedi";
import { fail, success } from "../utils/response";
import "reflect-metadata";
import { EmployeeService } from "../services/employeeService";
import { isJSON } from "../utils/isJSON";
import { employeeDTO, EditEmployeeDTO } from "../dto/employee.dto";

@Service()
export class EmployeeController {
  constructor(private readonly _employeeService: EmployeeService) {}

  async createEmployee(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      let req: employeeDTO = request.body;

      const createdEmployee = await this._employeeService.createEmployee(req);
      return success(
        response,
        201,
        createdEmployee,
        "Employee created successfully"
      );
    } catch (error: any) {
      let message = isJSON(error.message);
      return fail(response, 400, message);
    }
  }

  async EmployeeDetails(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const req = {
        id: Number(request.params.id),
      };

      const theEmployee = await this._employeeService.EmployeeDetails(req);
      return success(
        response,
        200,
        theEmployee,
        "Employee deatils retrieved successfully"
      );
    } catch (error: any) {
      let message = isJSON(error.message);
      return fail(response, 400, message);
    }
  }

  async editEmployee(request: Request, response: Response, next: NextFunction) {
    try {
      const req: EditEmployeeDTO = {
        id: Number(request.params.id),
        ...request.body,
      };

      const editedEmployee = await this._employeeService.editEmployee(req);
      return success(
        response,
        200,
        editedEmployee,
        "Employee edited successfully"
      );
    } catch (error: any) {
      let message = isJSON(error.message);
      return fail(response, 400, message);
    }
  }

  async deleteEmployee(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const req = {
        id: Number(request.params.id),
      };

      const deletedEmployee = await this._employeeService.deleteEmployee(req);
      return success(response, 200, "", deletedEmployee);
    } catch (error: any) {
      let message = isJSON(error.message);
      return fail(response, 400, message);
    }
  }
}
