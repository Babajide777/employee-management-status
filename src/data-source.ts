import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import { dbConfig } from "./config";
import "reflect-metadata";

import { schema } from "./entity/schema";

// create the connection
const poolConnection = mysql.createPool(dbConfig.DATABASE_URL as string);

export const db = drizzle(poolConnection, { schema, mode: "default" });
