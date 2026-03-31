import React from "react";
import { useNavigate } from "react-router-dom";

function Team() {
  const Navigate=useNavigate();
  const teamMembers = [
    {
      id: 1,
      name: "John Doe",
      role: "Project Manager",
      email: "john@example.com",
      // avatar: "JD",
    },
    {
      id: 2,
      name: "Jane Smith",
      role: "UI Designer",
      email: "jane@example.com",
      // avatar: "JS",
    },
    {
      id: 3,
      name: "Mike Johnson",
      role: "Backend Developer",
      email: "mike@example.com",
      // avatar: "MJ",
    },
    {
      id: 4,
      name: "Sarah Williams",
      role: "Frontend Developer",
      email: "sarah@example.com",
      // avatar: "SW",
    },
    {
      id: 5,
      name: "Micheal rae",
      role: "Tester",
      email: "micheal@example.com",
      // avatar: "MR",
    },
  ];

  return (
    <div className="team-container">
      <div className="page-header">
        <h2>Team Members</h2>
        <button className="create-btn" onClick={() => Navigate("/add-member")}>
          +Add member
        </button>
      </div>
      <div
        className="team-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        {teamMembers.map((member) => (
          <div
            key={member.id}
            className="team-card"
            style={{
              padding: "20px",
              background: "var(--bg-secondary)",
              border: "1px solid var(--border-color)",
              borderRadius: "12px",
              textAlign: "center",
            }}
          >
            {/* <div
              style={{
                width: "60px",
                height: "60px",
                borderRadius: "50%",
                backgroundColor: "var(--accent)",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.5rem",
                fontWeight: "800",
                margin: "0 auto 15px",
              }}
            >
              {member.avatar}
            </div> */}
            <h3>{member.name}</h3>
            <p
              style={{
                color: "var(--accent)",
                fontSize: "0.85rem",
                marginBottom: "10px",
              }}
            >
              {member.role}
            </p>
            <p style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>
              {member.email}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Team;
