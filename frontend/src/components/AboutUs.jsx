import React from 'react';
import './AboutUs.css';
import useScrollAnimation from '../hooks/useScrollAnimation';
import TeamMember1 from '../assets/team1.jpeg';
import TeamMember2 from '../assets/team2.jpeg';
import TeamMember3 from '../assets/team3.jpeg';
import TeamMember4 from '../assets/team4.jpeg';

function AboutUs() {
  useScrollAnimation();
  
  const team = [
    {
      id: 1,
      name: "Akanksha Bhagwat",
      image: TeamMember1,
      description: "bhagwatakanksha55@gmail.com"
    },
    {
      id: 2,
      name: "Mrinmayi Barve",
      image: TeamMember2,
      description: "mrinmayibarve@gmail.com"
    },
    {
      id: 3,
      name: "Kanak Dagade",
      image: TeamMember3,
      description: "kanakdagade@gmail.com"
    },
    {
      id: 4,
      name: "Bhavika Panpalia",
      image: TeamMember4,
      description: "bhavikapanpalia@gmail.com"
    }
  ];

  return (
    <div className="about-us-section" id="about">
      <h2 className="section-title fade-in">About Us</h2>
      <div className="team-container">
        {team.map((member, index) => (
          <div key={member.id} className="team-member fade-in" style={{ transitionDelay: `${index * 0.15}s` }}>
            <img src={member.image} alt={member.name} className="member-photo" />
            <h3 className="member-name">{member.name}</h3>
            <p className="member-role">{member.role}</p>
            <p className="member-description">{member.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AboutUs;