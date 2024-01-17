import type { Config } from "drizzle-kit";
import dotenv from "dotenv";

dotenv.config();

export default {
    schema: "./src/entity/Index.ts",
    out: "./src/entity/migrations",
    dbCredentials: {
        connectionString: process.env.DATABASE_URL!,
    },
    strict:true,
    driver: "mysql2",
} satisfies Config;
