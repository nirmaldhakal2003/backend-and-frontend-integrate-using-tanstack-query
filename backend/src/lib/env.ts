import "dotenv/config";
import { z } from "zod";

type TPinoLogLevel = "trace" | "debug" | "info" | "warn" | "error" | "fatal";
type TEnvironment = "prod" | "dev" | "test";

console.log("ENVIRONMENT", process.env["ENVIRONMENT"]);

if (!process.env["ENVIRONMENT"]) {
  console.error("ENVIRONMENT is not set");
  process.exit(1);
}

const EnvSchema = z.object({
  PORT: z.number(),
  WHITELISTED_ORIGINS: z.array(z.string()),
  PINO_LOG_LEVEL: z.enum(["trace", "debug", "info", "warn", "error", "fatal"]),
  ENVIRONMENT: z.enum(["prod", "dev", "test"]),
  DATABASE: z.object({
    URL: z.string().min(1),
    USER: z.string().min(1),
    PASSWORD: z.string().min(1),
    NAME: z.string().min(1),
    HOST: z.string().min(1),
    PORT: z.number(),
    CONNECTION_LIMIT: z.number().optional(),
    CONNECTION_TIMEOUT: z.number().optional(),
  }),
});

type TEnv = z.infer<typeof EnvSchema>;

const env: TEnv = {
  PORT: Number(process.env["PORT"]),
  WHITELISTED_ORIGINS: process.env["WHITELISTED_ORIGINS"]?.split(",") ?? [],
  PINO_LOG_LEVEL: (process.env["PINO_LOG_LEVEL"] as TPinoLogLevel) ?? "info",
  ENVIRONMENT: (process.env["ENVIRONMENT"] as TEnvironment) || "prod",
  DATABASE: {
    URL: process.env["DATABASE_URL"] || "",
    USER: process.env["DATABASE_USER"] || "",
    PASSWORD: process.env["DATABASE_PASSWORD"] || "",
    NAME: process.env["DATABASE_NAME"] || "",
    HOST: process.env["DATABASE_HOST"] || "",
    PORT: Number(process.env["DATABASE_PORT"]) || 3306,
    CONNECTION_LIMIT: Number(process.env["CONNECTION_LIMIT"]) || 10,
    CONNECTION_TIMEOUT: Number(process.env["CONNECTION_TIMEOUT"]) || 300,
  },
  AUTH: {
    BASE: {
      PATH: process.env["BASE_PATH"] || "/auth",
      SALT_ROUNDS: Number(process.env["SALT_ROUNDS"]) || 10,
      TOKEN_SECRET: process.env.TOKEN_SECRET || "THISISTOKENSECRET",
      ACCESS_TOKEN_AGE: Number(process.env["ACCESS_TOKEN_AGE"]) || 60,
      REFRESH_TOKEN_AGE: Number(process.env["REFRESH_TOKEN_AGE"]) || 604800,
      OTP_AGE: Number(process.env["OTP_AGE"]) || 30,
      OTP_SECRET: process.env.OTP_SECRET || "MYOTPSECRETISYOURS",
      COOKIE_DOMAIN: process.env.COOKIE_DOMAIN || "localhost",
      COOKIE_SAME_SITE:
        (process.env.COOKIE_SAME_SITE as "lax" | "strict" | "none") || "lax",
      COOKIE_SECURE: process.env.COOKIE_SECURE === "true",
    },
    GOOGLE: {
      CLIENT_ID: process.env["GOOGLE_CLIENT_ID"] || "",
      CLIENT_SECRET: process.env["GOOGLE_CLIENT_SECRET"] || "",
      SUCCESS_REDIRECT_URI: process.env["GOOGLE_SUCCESS_REDIRECT_URI"] || "",
      FAILURE_REDIRECT_URI: process.env["GOOGLE_FAILURE_REDIRECT_URI"] || "",
    },
  },
  EMAIL: {
    USER: process.env["EMAIL_USER"] || "",
    PASS: process.env["EMAIL_PASS"] || "",
  },
};

const validateEnv = (env: TEnv) => {
  console.log("Validating Env");
  const result = EnvSchema.safeParse(env);
  if (!result.success) {
    console.error(result.error.flatten().fieldErrors);
    process.exit(1);
  }
  console.log("Env Validated", result.data);
};

validateEnv(env);

export { env };
