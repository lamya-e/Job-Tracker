const express = require("express");
const router = express.Router();
const db = require("../db");

// GET /api/jobs - returns all jobs, optionally filtered by status
router.get("/", (req, res) => {
  const { status } = req.query;

  try {
    let jobs;

    if (status && status !== "all") {
      // filter by status if provided
      jobs = db
        .prepare("SELECT * FROM jobs WHERE LOWER(status) = ? ORDER BY applied_date DESC")
        .all(status.toLowerCase());
    } else {
      jobs = db.prepare("SELECT * FROM jobs ORDER BY applied_date DESC").all();
    }

    res.json(jobs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong fetching jobs" });
  }
});

// POST /api/jobs - add a new job
router.post("/", (req, res) => {
  const { company, position, status, applied_date } = req.body;

  if (!company || !position) {
    return res.status(400).json({ error: "Company and position are required" });
  }

  try {
    const result = db
      .prepare(
        "INSERT INTO jobs (company, position, status, applied_date) VALUES (?, ?, ?, ?)"
      )
      .run(
        company,
        position,
        status || "pending",
        applied_date || new Date().toISOString().split("T")[0]
      );

    const newJob = db
      .prepare("SELECT * FROM jobs WHERE id = ?")
      .get(result.lastInsertRowid);

    res.status(201).json(newJob);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add job" });
  }
});

module.exports = router;