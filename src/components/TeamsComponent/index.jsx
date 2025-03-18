import React from 'react';
import './index.css';

const TeamsComponent = ({ teamMembers }) => {
  return (
    <div className="team">
      {teamMembers.map((teamMember, index) => (
        <section key={index} className="team">
          {teamMember.role === 'Project PI' && (
            <>
              <div className="center" id="project-pi">{teamMember.role}</div>

              <div className="project-pi-box" id="project-pi-box">
                <div className="project-pi-content">
                  <img src={teamMember.imgUrl} alt={teamMember.name} className="profile-pic" />
                  <div className="project-pi-description">
                    <h2 className="project-pi-name">{teamMember.name}</h2>
                    <div className="icons">
                      <a rel="noopener" href={teamMember.linkedinUrl}><i className="ri-links-line"></i></a>
                      <a href={`mailto:${teamMember.email}`} title="Email"><i className="ri-mail-line"></i></a>
                    </div>
                    <div className="project-pi-details">{teamMember.description}</div>
                  </div>
                </div>
              </div>
            </>
          )}
          {teamMember.role === 'Current Team Members' && (
            <>
              <div className="center">{teamMember.role}</div>
              <div className="team-content">
                {teamMember.members.map((member, memberIndex) => (
                  <div key={memberIndex} className="box" id="box">
                    <img src={member.imgUrl} alt={member.name} className="profile-pic" />
                    <h3>{member.name}</h3>
                    <h5>{member.description}</h5>
                    <div className="icons">
                      <a rel="noopener" href={member.linkedinUrl}><i className="ri-link"></i></a>
                      <a href={`mailto:${member.email}`} title="Email"><i className="ri-mail-line"></i></a>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
          {teamMember.role === 'Past Team Members' && (
            <>
              <div className="center">{teamMember.role}</div>
              <div className="team-content">
                {teamMember.members.map((member, memberIndex) => (
                  <div key={memberIndex} className="box" id="past-box">
                    <h3>{member}</h3>
                  </div>
                ))}
              </div>
            </>
          )}
        </section>
      ))}
    </div>
  );
};

export default TeamsComponent;
