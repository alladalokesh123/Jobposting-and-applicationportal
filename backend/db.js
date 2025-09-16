const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbFile = path.join(__dirname, "database.db");

const db = new sqlite3.Database(dbFile, (err) => {
  if (err) {
    console.error("❌ SQLite error:", err.message);
    process.exit(1);
  } else {
    console.log("✅ Connected to SQLite:", dbFile);

    // Create tables if not exists
    db.run(`CREATE TABLE IF NOT EXISTS candidates (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS jobs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      required_skills TEXT,
      recruiter_id INTEGER
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS applications (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      candidate_id INTEGER NOT NULL,
      job_id INTEGER NOT NULL,
      FOREIGN KEY(candidate_id) REFERENCES candidates(id),
      FOREIGN KEY(job_id) REFERENCES jobs(id),
      UNIQUE(candidate_id, job_id)
    )`);
  }
});

module.exports = db;
