import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminRawMaterialView.css';

const AdminRawMaterialView = ({ goToPage, PAGES }) => {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMaterials();
  }, []);

  const fetchMaterials = async () => {
    try {
      const response = await axios.get('http://localhost:5000/rawmaterials');
      setMaterials(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching raw materials:', error);
      setLoading(false);
    }
  };

  return (
    <div className="admin-rawmaterial-container">
      <h2 className="dashboard-title">Raw Materials</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="material-list">
          {materials.map((material) => (
            <div className="material-card" key={material.rm_id}>
              <p className="material-name">{material.rm_name}</p>
            </div>
          ))}
        </div>
      )}

<div className="back-button-container">
        <button className="back-button" onClick={() => goToPage(PAGES.ADMIN)}>
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default AdminRawMaterialView;
