require("dotenv").config();

interface DBConfig {
  host?: string;
  user?: string;
  password?: string;
  database?: string;
  DATABASE_URL?: string;
}

interface EnvConfig {
  PORT?: number;
  JWT_SECRET?: string;
}

export const dbConfig: DBConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  DATABASE_URL: process.env.DATABASE_URL,
};

export const envConfig: EnvConfig = {
  PORT: process.env.PORT ? parseInt(process.env.PORT, 10) : undefined,
  JWT_SECRET: process.env.JWT_SECRET,
};

export const AWSENV = {
  ACCESS_KEY: process.env.AWS_ACCESS_KEY_ID,
  PRIVATE_KEY: process.env.AWS_SECRET_ACCESS_KEY,
  DEFAULT_REGION: process.env.AWS_DEFAULT_REGION,
  BUCKET_NAME: process.env.BUCKET_NAME ?? 'test-bucket'
};

export const DEFAULT_PASSWORD: any = process.env.DEFAULT_PASSWORD;

export const TOKEN_SECRET: any = process.env.TOKEN_SECRET;

export const NODE_ENV: any = process.env.NODE_ENV;

export const NODEMAILER_USER: any = process.env.NODEMAILER_USER;

export const NODEMAILER_PWD: any = process.env.NODEMAILER_PWD;

export const CRYPTOSECRETKEY: any = process.env.CRYPTOSECRETKEY;



