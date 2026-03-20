import { useState } from 'react';
import useMeteo from './useMeteo';

function MeteoApp() {
  const [ville, setVille] = useState('');
  const [recherche, setRecherche] = useState('Casablanca');
  const { meteo, loading, error } = useMeteo(recherche);

  const villesPopulaires = ['Marrakech', 'Rabat', 'Casablanca', 'Safi', 'sale', 'Meknes'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (ville.trim()) {
      setRecherche(ville);
      setVille('');
    }
  };

  return (
    <div style={containerStyle}>
      <h3>️ Application Météo Connectée </h3>

      <form onSubmit={handleSubmit} style={formStyle}>
        <input
          type="text"
          value={ville}
          onChange={(e) => setVille(e.target.value)}
          placeholder="Entrez une ville..."
          style={inputStyle}
        />
        <button type="submit" style={buttonStyle}> Rechercher</button>
      </form>

      <div style={villesStyle}>
        <strong>Villes populaires :</strong>
        {villesPopulaires.map(v => (
          <button
            key={v}
            onClick={() => setRecherche(v)}
            style={cityButtonStyle}
          >
            {v}
          </button>
        ))}
      </div>

      {loading && (
        <div style={loadingStyle}>
          <div className="spinner"></div>
          <p>Chargement des données météo...</p>
        </div>
      )}

      {error && (
        <div style={errorStyle}>
           Erreur : {error}
        </div>
      )}

      {meteo && !loading && (
        <div style={meteoCardStyle}>
          <h2>{meteo.ville}</h2>
          <div style={tempStyle}>
            {meteo.temperature}°C
          </div>
          <div style={conditionStyle}>
            {meteo.condition}
          </div>
          <div style={detailsStyle}>
            <div> Humidité : {meteo.humidite}%</div>
            <div> Vent : {meteo.vent} km/h</div>
            <div> Dernière mise à jour : {meteo.miseAJour}</div>
          </div>
        </div>
      )}
    </div>
  );
}

const containerStyle = {
  padding: '20px',
  border: '2px solid #FF9800',
  borderRadius: '10px',
  backgroundColor: '#FFF8E1'
};

const formStyle = {
  display: 'flex',
  gap: '10px',
  marginBottom: '20px'
};

const inputStyle = {
  flex: 1,
  padding: '10px',
  fontSize: '16px',
  borderRadius: '5px',
  border: '1px solid #ddd'
};

const buttonStyle = {
  padding: '10px 20px',
  backgroundColor: '#FF9800',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer'
};

const villesStyle = {
  marginBottom: '20px',
  display: 'flex',
  gap: '10px',
  flexWrap: 'wrap',
  alignItems: 'center'
};

const cityButtonStyle = {
  padding: '5px 10px',
  backgroundColor: '#e0e0e0',
  border: 'none',
  borderRadius: '3px',
  cursor: 'pointer',
  fontSize: '14px'
};

const loadingStyle = {
  textAlign: 'center',
  padding: '40px',
  fontSize: '18px'
};

const errorStyle = {
  backgroundColor: '#ffebee',
  color: '#c62828',
  padding: '15px',
  borderRadius: '5px',
  marginTop: '20px'
};

const meteoCardStyle = {
  backgroundColor: 'white',
  padding: '25px',
  borderRadius: '15px',
  textAlign: 'center',
  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  marginTop: '20px'
};

const tempStyle = {
  fontSize: '48px',
  fontWeight: 'bold',
  margin: '20px 0'
};

const conditionStyle = {
  fontSize: '24px',
  margin: '10px 0'
};

const detailsStyle = {
  marginTop: '20px',
  padding: '15px',
  backgroundColor: '#f5f5f5',
  borderRadius: '10px',
  textAlign: 'left'
};

export default MeteoApp;