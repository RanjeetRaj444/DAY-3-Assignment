const express = require("express");
const router = express.Router();
const { toCsv } = require("../utils/toCsv");
const { SECRET } = require("../middleware/auth");

let data = [
  {
    id: "shw99wn7",
    title: "Aman",
    status: "todo",
    createdAt: new Date().toISOString(),
  },
];
router.get("/api/tasks", (req, res) => {
  const { status } = req.query;
  const result = status ? data.filter((task) => task.status === status) : data;
  res.send({ data: result });
});

router.post("/api/tasks", (req, res) => {
  const { title } = req.body;
  data.push({
    id: Math.random().toString(36).substring(2, 10),
    title,
    status: "todo",
    createdAt: new Date().toISOString(),
  });
  res.send({ data });
});

router.patch("/api/tasks/:id", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status) return res.status(400).send({ message: "Status is required" });

  let found = false;
  for (let i = 0; i < data.length; i++) {
    if (data[i].id == id) {
      data[i].status = status;
      found = true;
      break;
    }
  }

  if (!found) return res.status(404).send({ message: "Task not found" });

  res.send({ message: "Status updated successfully", data });
});

router.post("/api/login", (req, res) => {
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ message: "Username is required" });
  }

  const token = jwt.sign({ user: username }, SECRET, { expiresIn: "1h" });
  res.json({ token });
});

router.get("/api/tasks.csv", (req, res) => {
  res.setHeader("Content-Type", "text/csv");
  res.setHeader("Content-Disposition", "attachment; filename=tasks.csv");

  const csv = toCsv(data);
  res.send(csv);
});

module.exports = router;
