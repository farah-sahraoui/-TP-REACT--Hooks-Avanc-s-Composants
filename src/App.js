import React, { useState } from 'react';
import CompteurPersonnalise from './CompteurPersonnalise';
import FocusAnimaux from './FocusAnimaux';
import StatsRendus from './StatsRendus';
import MeteoApp from './MeteoApp';
import TimerAvance from './TimerAvance';

function App() {
  const [activeComponent, setActiveComponent] = useState('compteur');

  const menuItems = [
    { id: 'compteur', name: ' Compteur Intelligent', component: CompteurPersonnalise },
    { id: 'focus', name: 'Focus Animaux', component: FocusAnimaux },
    { id: 'stats', name: ' Statistiques Rendus', component: StatsRendus },
    { id: 'meteo', name: ' Météo Connectée', component: MeteoApp },
    { id: 'timer', name: ' Chronomètre', component: TimerAvance }
  ];

  const CurrentComponent = menuItems.find(item => item.id === activeComponent).component;

  return (
    <div style={appContainer}>
      <header style={headerStyle}>
        <h1> Découverte des Hooks Avancés React </h1>
        <p>useReducer • useRef • useEffect • Hooks Personnalisés</p>
      </header>

      <nav style={navStyle}>
        {menuItems.map(item => (
          <button
            key={item.id}
            onClick={() => setActiveComponent(item.id)}
            style={{
              ...navButtonStyle,
              backgroundColor: activeComponent === item.id ? '#2196F3' : '#e0e0e0',
              color: activeComponent === item.id ? 'white' : '#333'
            }}
          >
            {item.name}
          </button>
        ))}
      </nav>

      <main style={mainStyle}>
        <CurrentComponent />
      </main>

      <footer style={footerStyle}>
        <p> TP réalisé avec  - Exploration des hooks avancés </p>
        <p style={{ fontSize: '12px', marginTop: '10px' }}>
           Chaque composant utilise des hooks différents pour des cas d'usage variés
        </p>
      </footer>
    </div>
  );
}

const appContainer = {
  minHeight: '100vh',
  backgroundColor: '#f5f5f5'
};

const headerStyle = {
  backgroundColor: '#2c3e50',
  color: 'white',
  padding: '20px',
  textAlign: 'center',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
};

const navStyle = {
  display: 'flex',
  justifyContent: 'center',
  gap: '10px',
  padding: '15px',
  backgroundColor: 'white',
  flexWrap: 'wrap',
  borderBottom: '1px solid #ddd'
};

const navButtonStyle = {
  padding: '10px 20px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  fontSize: '14px',
  transition: 'all 0.3s ease',
  fontWeight: 'bold'
};

const mainStyle = {
  padding: '20px',
  maxWidth: '1200px',
  margin: '0 auto'
};

const footerStyle = {
  backgroundColor: '#2c3e50',
  color: 'white',
  textAlign: 'center',
  padding: '20px',
  marginTop: '40px'
};

export default App;