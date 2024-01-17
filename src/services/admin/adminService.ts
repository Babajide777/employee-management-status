import { Service } from "typedi";
import {
  roleDTO,
  validateRoleSchema,
  AssignRoleDTO,
  validateAssignRoleToUser,
} from "../../dto/role.dto";
import { RoleRepository } from "../../repository/roleRepository";
import {
  ProfileDetailDTO,
  validateprofileDetailID,
  EmployeeStatusDTO,
  valiteUpdateEmployeeStatus,
} from "../../dto/employee.dto";
import { EmployeeRepository } from "../../repository/employeeRepository";

@Service()
export class AdminService {
  constructor(
    private readonly _roleRepository: RoleRepository,
    private readonly _employeeRepository: EmployeeRepository
  ) {}

  async createRole(data: roleDTO) {
    const check = validateRoleSchema.safeParse(data);
    if (!check.success)
      throw new Error(JSON.stringify(check.error.flatten().fieldErrors));

    const roleCheck = await this._roleRepository.findRoleUsingName(
      check.data.name
    );

    if (roleCheck) throw new Error("Role already exists");

    const savedRole = await this._roleRepository.saveRole({
      name: check.data.name,
    });

    if (savedRole[0].affectedRows === 0) throw new Error("Error saving role");

    let savedRoleId = savedRole[0].insertId;

    let theRole = await this._roleRepository.checkRoleUsingID(savedRoleId);
    if (!theRole) throw new Error("Error saving role");

    return theRole;
  }

  async deleteRole(data: ProfileDetailDTO) {
    const check = validateprofileDetailID.safeParse(data);
    if (!check.success)
      throw new Error(JSON.stringify(check.error.flatten().fieldErrors));

    const roleCheck = await this._roleRepository.checkRoleUsingID(data.id);
    if (!roleCheck) throw new Error("Role does not exist");

    const deletedRole = await this._roleRepository.deleteRole(data.id);

    if (!deletedRole) throw new Error("Error deleting Role");

    return "Role deleted successfully";
  }

  async roleAssign(data: AssignRoleDTO) {
    const check = validateAssignRoleToUser.safeParse(data);
    if (!check.success)
      throw new Error(JSON.stringify(check.error.flatten().fieldErrors));

    const theUser = await this._employeeRepository.findEmployeeUsingID(
      data.userId
    );

    if (!theUser) throw new Error("Employee not found");

    const theRole = await this._roleRepository.checkRoleUsingID(data.roleId);
    if (!theRole) throw new Error("Role does not exist. Assign a valid role");

    let assignRole = await this._employeeRepository.updateEmployee(
      data.userId,
      {
        roleId: data.roleId,
      }
    );

    if (!assignRole) throw new Error("Error assigning Role to Employee");

    let newUser = await this._employeeRepository.findEmployeeUsingID(
      data.userId
    );
    if (!newUser) throw new Error("Employee not found");

    return newUser;
  }

  async getAllRoles() {
    const allRoles = await this._roleRepository.getAllRoles();

    return allRoles;
  }

  async getAllEmployees() {
    const allEmployees = await this._employeeRepository.getAllEmployees();

    return allEmployees;
  }

  async UpdateEmployeeStatus(data: EmployeeStatusDTO) {
    const check = valiteUpdateEmployeeStatus.safeParse(data);
    if (!check.success)
      throw new Error(JSON.stringify(check.error.flatten().fieldErrors));

    const theUser = await this._employeeRepository.findEmployeeUsingID(data.id);

    if (!theUser) throw new Error("Employee not found");

    let editStatus = await this._employeeRepository.updateEmployee(data.id, {
      status: data.status,
    });

    if (!editStatus) throw new Error("Error assigning Role to Employee");

    let newUser = await this._employeeRepository.findEmployeeUsingID(data.id);
    if (!newUser) throw new Error("Employee not found");

    return newUser;
  }
}
