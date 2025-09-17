## Job Posting and Application Portal

This project extends a basic candidate management system into a **relational job portal**.  
Now, recruiters can post jobs, and candidates can apply for them. This introduces a **many-to-many relationship**: a single candidate can apply to multiple jobs, and a single job can have multiple applicants.

## Technologies Used

- **Frontend:** React.js 
- **Backend:** Node.js, Express  
- **Database:** SQLite  

## Project Structure 
```
JobPortal/
├── backend/
│   ├── db.js           
│   ├── index.js       
│   ├── package.json
├── frontend/
│   ├── JobList.jsx       
│   ├── JobDetails.jsx    
│   ├── CandidateForm.jsx 
│   ├── JobForm.jsx       
│   ├── App.jsx           
│   ├── index.js          
│   ├── App.css         
│   ├── package.json
└── README.md

```

## Features

- **Job CRUD:** Create, read jobs.  
- **Candidate Applications:** Candidates can apply for jobs.  
- **Relational Queries:** View all candidates applied for a job. 

## Backend setup
- cd backend
- npm install
- npm start 
Backend runs on http://localhost:5000 

## Frontend setup 
- cd frontend
- npm install
- npm start
Frontend runs on http://localhost:3000 

## Screenshots 
![jobPortal](<Screenshot (398).png>)
![AppliedCandidatesList](<Screenshot (399).png>)