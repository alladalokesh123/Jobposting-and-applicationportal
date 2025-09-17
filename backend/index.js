const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./db"); 

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Backend server is running!");
});


// Candidates 

app.get("/api/candidates", (req, res) => {
  db.all("SELECT * FROM candidates", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post("/api/candidates", (req, res) => {
  const { name, email } = req.body;
  db.run(
    "INSERT INTO candidates (name, email) VALUES (?, ?)",
    [name, email],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID, name, email });
    }
  );
});

// Jobs

app.get("/api/jobs", (req, res) => {
  db.all("SELECT * FROM jobs", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Get a single job by ID
app.get("/api/jobs/:jobId", (req, res) => {
  const { jobId } = req.params;
  db.get("SELECT * FROM jobs WHERE id = ?", [jobId], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: "Job not found" });
    res.json(row);
  });
});

app.post("/api/jobs", (req, res) => {
  const { title, description, required_skills, recruiter_id } = req.body;
  db.run(
    "INSERT INTO jobs (title, description, required_skills, recruiter_id) VALUES (?, ?, ?, ?)",
    [title, description, required_skills, recruiter_id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({
        id: this.lastID,
        title,
        description,
        required_skills,
        recruiter_id,
      });
    }
  );
});

// Applications 

// Candidate applies for a job
app.post("/api/jobs/:jobId/apply", (req, res) => {
  const { candidate_id } = req.body;
  const { jobId } = req.params;
  db.run(
    "INSERT INTO applications (candidate_id, job_id) VALUES (?, ?)",
    [candidate_id, jobId],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID, message: "Application submitted!" });
    }
  );
});

// Get candidates who applied for a job
app.get("/api/jobs/:jobId/candidates", (req, res) => {
  const { jobId } = req.params;
  const query = `
    SELECT candidates.* 
    FROM candidates 
    JOIN applications ON candidates.id = applications.candidate_id 
    WHERE applications.job_id = ?`;
  db.all(query, [jobId], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});


//  Start Server

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
