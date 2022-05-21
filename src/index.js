import express from "express";
import bodyParser from "body-parser";

import usersRoutes from "./routes/rewards.js";

export const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use("/users", usersRoutes);
app.get("/", (_, res) => {
  res.send("Root");
});

app.listen(PORT, () => {
  console.log(`Running on port: ${PORT}`);
});
