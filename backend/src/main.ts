import express from "express";
import swaggerUi from "swagger-ui-express";
import cors from "cors";
import { createExpressEndpoints } from "@ts-rest/express";
import { openApiDocument } from "./docs/open-api";
import { errorHandler, notFoundHandler } from "./middleware/error-handler";
import { userRouter } from "./routers/user-router";
import { userContract } from "./contracts/user/contract";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openApiDocument));
app.use("/api-docs.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(openApiDocument);
  res.end();
});

createExpressEndpoints(userContract, userRouter, app);

app.use(notFoundHandler);

app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(3000, () => {
  console.log("Server is running at http://localhost:3000");
  console.log("Swagger UI at http://localhost:3000/api-docs");
});
