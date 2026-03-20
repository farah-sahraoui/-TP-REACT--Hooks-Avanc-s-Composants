import { useRef, useEffect, useState } from 'react';

function StatsRendus() {
  const renderCount = useRef(0);
  const lastRenderTime = useRef(Date.now());
  const [operations, setOperations] = useState([]);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    renderCount.current += 1;
    const now = Date.now();
    const timeSinceLastRender = lastRenderTime.current ? now - lastRenderTime.current : 0;

    const newOperation = {
      id: renderCount.current,
      time: new Date().toLocaleTimeString(),
      interval: timeSinceLastRender
    };

    setOperations(prev => [newOperation, ...prev].slice(0, 10)); // Garde les 10 derniers
    lastRenderTime.current = now;

    console.log(` Statistique de rendu #${renderCount.current}`);
    console.log(`  Dernier rendu il y a ${timeSinceLastRender}ms`);
  });

  const averageInterval = operations.slice(1).reduce((acc, op, idx, arr) => {
    return acc + op.interval;
  }, 0) / (operations.length - 1) || 0;

  return (
    <div style={containerStyle}>
      <h3>Analyseur de Performance React </h3>
      <div style={statsStyle}>
        <div style={statCardStyle}>
          <div style={statNumberStyle}>{renderCount.current}</div>
          <div>Rendus totaux</div>
        </div>
        <div style={statCardStyle}>
          <div style={statNumberStyle}>
            {averageInterval > 0 ? `${Math.round(averageInterval)}ms` : '—'}
          </div>
          <div>Intervalle moyen</div>
        </div>
      </div>

      <button
        onClick={() => setShowDetails(!showDetails)}
        style={toggleButtonStyle}
      >
        {showDetails ? ' Cacher les détails' : ' Voir les détails'}
      </button>

      {showDetails && (
        <div style={detailsStyle}>
          <h4>Historique des rendus :</h4>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th># Rendu</th>
                <th>Heure</th>
                <th>Intervalle</th>
              </tr>
            </thead>
            <tbody>
              {operations.map(op => (
                <tr key={op.id}>
                  <td>{op.id}</td>
                  <td>{op.time}</td>
                  <td>{op.interval > 0 ? `${op.interval}ms` : 'Premier rendu'}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={tipStyle}>
             Astuce : Chaque fois que ce composant se rend, un nouvel effet s'exécute !
          </div>
        </div>
      )}
    </div>
  );
}

const containerStyle = {
  padding: '20px',
  border: '2px solid #2196F3',
  borderRadius: '10px',
  backgroundColor: '#E3F2FD'
};

const statsStyle = {
  display: 'flex',
  gap: '20px',
  marginBottom: '20px',
  justifyContent: 'center'
};

const statCardStyle = {
  flex: 1,
  textAlign: 'center',
  padding: '20px',
  backgroundColor: 'white',
  borderRadius: '10px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
};

const statNumberStyle = {
  fontSize: '36px',
  fontWeight: 'bold',
  color: '#2196F3'
};

const toggleButtonStyle = {
  backgroundColor: '#2196F3',
  color: 'white',
  border: 'none',
  padding: '10px 20px',
  borderRadius: '5px',
  cursor: 'pointer',
  marginBottom: '15px'
};

const detailsStyle = {
  backgroundColor: 'white',
  padding: '15px',
  borderRadius: '8px',
  marginTop: '15px'
};

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
  marginTop: '10px'
};

const tipStyle = {
  marginTop: '15px',
  padding: '10px',
  backgroundColor: '#FFF3E0',
  borderRadius: '5px',
  fontSize: '14px'
};

export default StatsRendus;