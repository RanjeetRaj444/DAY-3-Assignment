const express = require("express");
const app = express();
const tasksRouter = require("./routes/tasks");
const { authenticateJWT, limiter } = require("./middleware/auth");

app.use(express.json());
// app.use(limiter);
// app.use(authenticateJWT);

app.use(tasksRouter);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
