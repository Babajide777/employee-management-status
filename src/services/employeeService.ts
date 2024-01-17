import { Service } from "typedi";
import { EmployeeRepository } from "../repository/employeeRepository";
import {
  validateEmployeeSchema,
  employeeDTO,
  validateprofileDetailID,
  ProfileDetailDTO,
  valiteEditEmployee,
  EditEmployeeDTO,
} from "../dto/employee.dto";

@Service()
export class EmployeeService {
  constructor(private readonly _employeeRepository: EmployeeRepository) {}

  async createEmployee(data: employeeDTO) {
    const check = validateEmployeeSchema.safeParse(data);
    if (!check.success)
      throw new Error(JSON.stringify(check.error.flatten().fieldErrors));

    let savedEmployee = await this._employeeRepository.saveEmployee({
      name: data.name,
    });

    if (savedEmployee[0].affectedRows === 0)
      throw new Error("Error saving employee");

    const theEmployee = await this._employeeRepository.findEmployeeUsingID(
      savedEmployee[0].insertId
    );
    if (!theEmployee) throw new Error("Error saving Employee");

    return theEmployee;
  }

  async EmployeeDetails(data: ProfileDetailDTO) {
    const check = validateprofileDetailID.safeParse(data);
    if (!check.success)
      throw new Error(JSON.stringify(check.error.flatten().fieldErrors));

    let employee = await this._employeeRepository.findEmployeeUsingID(data.id);

    if (!employee) throw new Error("Employee not found");

    return employee;
  }

  async editEmployee(data: EditEmployeeDTO) {
    const check = valiteEditEmployee.safeParse(data);
    if (!check.success)
      throw new Error(JSON.stringify(check.error.flatten().fieldErrors));

    let theEmployee = await this._employeeRepository.findEmployeeUsingID(
      data.id
    );

    if (!theEmployee) throw new Error("Employee not found");

    let editedEmployee = await this._employeeRepository.updateEmployee(
      data.id,
      data
    );

    if (!editedEmployee) throw new Error("Error editing Employee details");

    let employee = await this._employeeRepository.findEmployeeUsingID(data.id);

    if (!employee) throw new Error("Employee not found");

    return employee;
  }

  async deleteEmployee(data: ProfileDetailDTO) {
    const check = validateprofileDetailID.safeParse(data);
    if (!check.success)
      throw new Error(JSON.stringify(check.error.flatten().fieldErrors));

    let deletedEmployee = await this._employeeRepository.deleteEmployee(
      data.id
    );
    if (!deletedEmployee) throw new Error("Error deleting Employee");

    return "Employee deleted successfully";
  }
}
