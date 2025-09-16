import { useState } from "react";

function CandidateForm({ onAddCandidate }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (!name || !email) return alert("Fill name and email");
    onAddCandidate({ name, email });
    setName(""); setEmail("");
  };

  return (
    <form onSubmit={submit}>
      <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" />
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
      <button type="submit">Add Candidate</button>
    </form>
  );
}

export default CandidateForm;
