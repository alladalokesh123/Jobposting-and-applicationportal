import { useEffect, useState } from "react";
import CandidateForm from "./CandidateForm";
import JobList from "./JobList";

function App() {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/candidates")
      .then(res => res.json())
      .then(data => setCandidates(data))
      .catch(err => console.error(err));
  }, []);

  const handleAddCandidate = (candidate) => {
    fetch("http://localhost:5000/api/candidates", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(candidate)
    })
      .then(res => res.json())
      .then(newCandidate => setCandidates(prev => [newCandidate, ...prev]));
  };

  return (
    <div className="App">
      <h1>Job Posting & Application Portal</h1>

      <section style={{ marginTop: 10 }}>
        <h2>Add Candidate</h2>
        <CandidateForm onAddCandidate={handleAddCandidate} />
      </section>

      <section style={{ marginTop: 20 }}>
        <h2>Candidate List</h2>
        {candidates.length === 0 ? (
          <p>No candidates yet</p>
        ) : (
          <ul>
            {candidates.map(c => (
              <li key={c.id}>{c.name} ({c.email}) — ID: {c.id}</li>
            ))}
          </ul>
        )}
      </section>

      <section style={{ marginTop: 20 }}>
        <JobList candidates={candidates} />
      </section>
    </div>
  );
}

export default App;
