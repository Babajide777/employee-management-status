import express, { Application } from "express";
import chalk from "chalk";
import helmet from "helmet";
import employeeRoute from "./routes/employeeRoutes";
import adminRoute from "./routes/adminRoutes";
import morgan from "morgan";
import path from "path";
import { envConfig } from "./config";
import { corsOptions } from "./utils/corsOptions";
import { fail } from "./utils/response";

const app: Application = express();
app.use(morgan("dev"));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
path.join(__dirname, "public");
app.use(express.static(path.join(__dirname, "public")));
app.use(corsOptions);

app.get("/", (req, res) => {
  res.send("Employee Management System Backend API");
});

app.use("/api/employee", employeeRoute);
app.use("/api/admin", adminRoute);

app.all("*", (req, res, next) => {
  next(fail(res, 400, `can't find ${req.originalUrl} on this server`));
});

const PORT = envConfig.PORT;
app.listen(PORT, (): void => {
  console.log(chalk.green(`Server Running here 👉 http://localhost:${PORT}`));
});
