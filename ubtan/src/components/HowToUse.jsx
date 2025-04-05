import React from 'react';
import './HowToUse.css';
import useScrollAnimation from '../hooks/useScrollAnimation';

function HowToUse() {
  useScrollAnimation();
  
  const steps = [
    "Mix one tablespoon of Ubtan powder with rose water",
    "Apply evenly on clean face and neck",
    "Gently massage in circular motions for 2-3 minutes",
    "Leave it on for 15 minutes until semi-dry",
    "Rinse off with lukewarm water and pat dry",
    "Use twice a week for best results"
  ];

  return (
    <div className="how-to-use-section">
      <h2 className="section-title fade-in">How to Use</h2>
      <ul className="steps-list">
        {steps.map((step, index) => (
          <li key={index} className="step-item fade-in" style={{ transitionDelay: `${index * 0.1}s` }}>
            {step}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HowToUse;