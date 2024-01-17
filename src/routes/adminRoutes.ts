import express, { Application, Router } from "express";
import Container from "typedi";
import { AdminController } from "../controller/admin/adminController";

const app: Application = express();

const router: Router = express.Router();

const adminController = Container.get(AdminController);

//roles
router.post("/create-role", (req, res, next) =>
  adminController.createRole(req, res, next)
);

router.delete("/delete-role/:id", (req, res, next) =>
  adminController.deleteRole(req, res, next)
);

router.put("/assign-role", (req, res, next) =>
  adminController.assignRole(req, res, next)
);

router.get("/get-all-roles", (req, res, next) =>
  adminController.getAllRoles(req, res, next)
);

router.get("/get-all-employees", (req, res, next) =>
  adminController.getAllEmployees(req, res, next)
);

router.put("/update-employee-status", (req, res, next) =>
  adminController.UpdateEmployeeStatus(req, res, next)
);

export = router;
