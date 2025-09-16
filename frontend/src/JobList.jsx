import { useEffect, useState } from "react";
import JobDetails from "./JobDetails";
import JobForm from "./JobForm";

function JobList({ candidates = [] }) {
  const [jobs, setJobs] = useState([]);
  const [selectedJobId, setSelectedJobId] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/jobs")
      .then(res => res.json())
      .then(data => setJobs(data))
      .catch(err => console.error(err));
  }, []);

  const addJob = (job) => {
    fetch("http://localhost:5000/api/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(job)
    })
      .then(res => res.json())
      .then(newJob => setJobs(prev => [newJob, ...prev]));
  };

  return (
    <div>
      <h2>Jobs</h2>
      <JobForm onAddJob={addJob} />
      {jobs.length === 0 ? <p>No jobs yet</p> : (
        <ul>
          {jobs.map(j => (
            <li key={j.id} style={{ cursor: 'pointer' }} onClick={() => setSelectedJobId(j.id)}>
              {j.title} — ID: {j.id}
            </li>
          ))}
        </ul>
      )}
      {selectedJobId && <JobDetails jobId={selectedJobId} candidates={candidates} />}
    </div>
  );
}

export default JobList;
