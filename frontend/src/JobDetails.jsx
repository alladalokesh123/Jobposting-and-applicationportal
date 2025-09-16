import { useEffect, useState } from "react";

function JobDetails({ jobId }) {
  const [job, setJob] = useState(null);
  const [applied, setApplied] = useState([]);
  const [selectedCandidateId, setSelectedCandidateId] = useState("");

  // Fetch job info + applied candidates
  useEffect(() => {
    fetch(`http://localhost:5000/api/jobs/${jobId}`)
      .then(res => res.json())
      .then(data => setJob(data));

    fetch(`http://localhost:5000/api/jobs/${jobId}/candidates`)
      .then(res => res.json())
      .then(data => setApplied(data));
  }, [jobId]);

  // Handle Apply
  const handleApply = () => {
    if (!selectedCandidateId) {
      alert("Enter a candidate ID to apply");
      return;
    }

    fetch(`http://localhost:5000/api/jobs/${jobId}/apply`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ candidate_id: selectedCandidateId })
    })
      .then(res => res.json())
      .then(() => {
        alert("Application submitted!");
        setSelectedCandidateId("");
        // refresh applied candidates
        fetch(`http://localhost:5000/api/jobs/${jobId}/candidates`)
          .then(res => res.json())
          .then(data => setApplied(data));
      });
  };

  if (!job) return <p>Loading job details...</p>;

  return (
    <div style={{ marginTop: 20, padding: 12, border: "1px solid #ccc", borderRadius: 8 }}>
      <h3>{job.title}</h3>
      <p><strong>Description:</strong> {job.description}</p>
      <p><strong>Skills:</strong> {job.required_skills || "N/A"}</p>
      <p><strong>Recruiter ID:</strong> {job.recruiter_id || "N/A"}</p>

      <h4>Applied Candidates</h4>
      {applied.length === 0 ? (
        <p>No applicants yet</p>
      ) : (
        <ul>
          {applied.map(c => (
            <li key={c.id}>{c.name} ({c.email}) — ID: {c.id}</li>
          ))}
        </ul>
      )}

 
      <div style={{ marginTop: 15 }}>
        <input
          type="number"
          placeholder="Enter Candidate ID to apply"
          value={selectedCandidateId}
          onChange={(e) => setSelectedCandidateId(e.target.value)}
        />
        <button onClick={handleApply}>Apply</button>
      </div>
    </div>
  );
}

export default JobDetails;
