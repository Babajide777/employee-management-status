import express, { Application, Router } from "express";
import Container from "typedi";
import { EmployeeController } from "../controller/employeeController";

const router: Router = express.Router();

const employeeController = Container.get(EmployeeController);

router.post("/create", (req, res, next) =>
  employeeController.createEmployee(req, res, next)
);

router.get("/details/:id", (req, res, next) =>
  employeeController.EmployeeDetails(req, res, next)
);

router.put("/edit/:id", (req, res, next) =>
  employeeController.editEmployee(req, res, next)
);

router.delete("/delete/:id", (req, res, next) =>
  employeeController.deleteEmployee(req, res, next)
);

export = router;
