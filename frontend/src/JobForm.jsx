import { useState } from "react";

function JobForm({ onAddJob }) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [skills, setSkills] = useState("");
  const [recruiterId, setRecruiterId] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (!title || !desc) return alert("Title and description required");
    onAddJob({ title, description: desc, required_skills: skills, recruiter_id: recruiterId || null });
    setTitle(""); setDesc(""); setSkills(""); setRecruiterId("");
  };

  return (
    <form onSubmit={submit} style={{ marginBottom: 10 }}>
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Job Title" />
      <input value={desc} onChange={e => setDesc(e.target.value)} placeholder="Description" />
      <input value={skills} onChange={e => setSkills(e.target.value)} placeholder="Required Skills" />
      <input value={recruiterId} onChange={e => setRecruiterId(e.target.value)} placeholder="Recruiter ID (optional)" />
      <button type="submit">Add Job</button>
    </form>
  );
}

export default JobForm;
