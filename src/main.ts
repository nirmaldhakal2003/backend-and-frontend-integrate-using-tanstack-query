import express from "express";
import swaggerUi from "swagger-ui-express";
import { userRouter } from "./routers/user-routes";
import { swaggerDocument } from "./swagger";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/api-docs.json", (req, res) => {
  res.json(swaggerDocument);
});

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

userRouter(app);

app.listen(3000, () => {
  console.log("Server is running at http://localhost:3000");
  console.log("Swagger UI at http://localhost:3000/api-docs");
});
