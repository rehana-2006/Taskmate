import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Team() {
  const navigate = useNavigate();
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);


  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const response = await api.get("/team-members");
        setTeamMembers(response.data);
      } catch (error) {

        console.error("Error fetching team members:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTeam();
  }, []);


  const handleDeleteClick = (member) => {
    setSelectedMember(member);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!selectedMember) return;
    try {
      await api.delete(`/team-members/${selectedMember.id}`);
      setTeamMembers(teamMembers.filter(m => m.id !== selectedMember.id));
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error deleting member:", error);
    }
  };


  return (
    <div className="team-container">
      <div className="page-header">
        <div className="header-info">
          <h2>Our Team</h2>
          <p>Manage your colleagues and their roles within the projects.</p>
        </div>
        <button className="create-btn" onClick={() => navigate("/add-member")}>
          + Add Member
        </button>
      </div>

      <div className="team-grid">
        {loading ? (
          <div className="loading-state">Loading team members...</div>
        ) : teamMembers.length > 0 ? (
          teamMembers.map((member) => (
            <div key={member.id} className="member-square-card">
              <button 
                className="delete-member-btn" 
                onClick={() => handleDeleteClick(member)}
                title="Remove Member"
              >
                &times;
              </button>
              
              <div className="member-avatar-large">
                {member.fullName?.charAt(0).toUpperCase()}
              </div>
              
              <div className="member-details">
                <h3 className="member-name">{member.fullName}</h3>
                <span className="member-role-badge">
                  {member.role?.replace("_", " ")}
                </span>
                <p className="member-email">{member.email}</p>
              </div>

              <div className="member-footer">
                <span className="member-status-online"></span>
                <span className="status-text">Active</span>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-state">No team members found.</div>
        )}
      </div>

      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="delete-dialog">
            <div className="dialog-icon">⚠️</div>
            <h3>Remove Team Member?</h3>
            <p>
              Are you sure you want to remove <strong>{selectedMember?.fullName}</strong>? 
              This action cannot be undone.
            </p>
            <div className="dialog-actions">
              <button className="cancel-btn" onClick={() => setShowDeleteModal(false)}>
                Cancel
              </button>
              <button className="confirm-delete-btn" onClick={confirmDelete}>
                Delete Member
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .team-container {
          padding: 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        /* Modal / Dialog Styles */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          animation: fadeIn 0.2s ease-out;
        }

        .delete-dialog {
          background: var(--bg-primary);
          padding: 2rem;
          border-radius: 24px;
          width: 90%;
          max-width: 400px;
          text-align: center;
          box-shadow: 0 20px 40px rgba(0,0,0,0.3);
          border: 1px solid var(--border-color);
          animation: slideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .dialog-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }

        .delete-dialog h3 {
          margin-bottom: 0.8rem;
          font-size: 1.4rem;
        }

        .delete-dialog p {
          color: var(--text-muted);
          font-size: 0.95rem;
          line-height: 1.5;
          margin-bottom: 2rem;
        }

        .dialog-actions {
          display: flex;
          gap: 12px;
        }

        .dialog-actions button {
          flex: 1;
          padding: 12px;
          border-radius: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .cancel-btn {
          background: var(--bg-secondary);
          color: var(--text-primary);
          border: 1px solid var(--border-color);
        }

        .cancel-btn:hover {
          background: #374151;
        }

        .confirm-delete-btn {
          background: #ef4444;
          color: white;
          border: none;
        }

        .confirm-delete-btn:hover {
          background: #dc2626;
          transform: scale(1.02);
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        .header-info h2 {
          font-size: 1.8rem;
          margin-bottom: 0.5rem;
          color: var(--text-primary);
        }


        .header-info p {
          color: var(--text-muted);
          font-size: 0.9rem;
        }

        .team-grid {
          display: grid;
          /* Making them square-ish */
          grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
          gap: 24px;
          margin-top: 2rem;
        }

        .member-square-card {
          aspect-ratio: 1 / 1.1; /* Almost square */
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: 20px;
          padding: 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          overflow: hidden;
        }

        .member-square-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 24px rgba(0,0,0,0.1);
          border-color: var(--accent);
        }

        .delete-member-btn {
          position: absolute;
          top: 12px;
          right: 12px;
          background: rgba(239, 68, 68, 0.1);
          color: #ef4444;
          border: none;
          width: 28px;
          height: 28px;
          border-radius: 8px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
          opacity: 0;
          transition: opacity 0.2s;
        }

        .member-square-card:hover .delete-member-btn {
          opacity: 1;
        }

        .member-avatar-large {
          width: 70px;
          height: 70px;
          border-radius: 18px;
          background: linear-gradient(135deg, var(--accent), #6366f1);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.8rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
          box-shadow: 0 8px 16px rgba(109, 40, 217, 0.2);
        }

        .member-details {
          text-align: center;
        }

        .member-name {
          font-size: 1.1rem;
          margin-bottom: 0.5rem;
          font-weight: 700;
        }

        .member-role-badge {
          display: inline-block;
          padding: 4px 12px;
          background: rgba(109, 40, 217, 0.1);
          color: var(--accent);
          border-radius: 100px;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: capitalize;
          margin-bottom: 0.8rem;
        }

        .member-email {
          font-size: 0.8rem;
          color: var(--text-muted);
        }

        .member-footer {
          margin-top: 1.5rem;
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.75rem;
          color: #10b981;
          font-weight: 600;
        }

        .member-status-online {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #10b981;
          box-shadow: 0 0 8px rgba(16, 185, 129, 0.5);
        }

        .loading-state, .empty-state {
          grid-column: 1 / -1;
          padding: 4rem;
          text-align: center;
          background: var(--bg-secondary);
          border-radius: 20px;
          border: 1px dashed var(--border-color);
          color: var(--text-muted);
        }
      `}</style>
    </div>
  );
}


export default Team;
