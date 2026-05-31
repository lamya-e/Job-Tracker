const Database = require("better-sqlite3");
const path = require("path");

const db = new Database(path.join(__dirname, "jobs.db"));

// create the jobs table if it doesn't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS jobs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company TEXT NOT NULL,
    position TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending',
    applied_date TEXT NOT NULL
  )
`);



module.exports = db;