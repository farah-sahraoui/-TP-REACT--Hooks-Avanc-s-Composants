import { useState, useEffect } from 'react';

function TimerAvance() {
  const [temps, setTemps] = useState(0);
  const [estActif, setEstActif] = useState(false);
  const [historique, setHistorique] = useState([]);
  const [alerte, setAlerte] = useState(null);

  useEffect(() => {
    let intervalId = null;

    if (estActif) {
      intervalId = setInterval(() => {
        setTemps(prev => {
          const nouveauTemps = prev + 1;

          if (nouveauTemps === 10) {
            setAlerte(" Bravo ! Vous avez atteint 10 secondes !");
            setTimeout(() => setAlerte(null), 3000);
          } else if (nouveauTemps === 30) {
            setAlerte("Impressionnant ! 30 secondes déjà !");
            setTimeout(() => setAlerte(null), 3000);
          } else if (nouveauTemps === 60) {
            setAlerte(" Félicitations ! 1 minute complète !");
            setTimeout(() => setAlerte(null), 3000);
          }

          return nouveauTemps;
        });
      }, 1000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
        console.log(" Nettoyage du timer effectué");
      }
    };
  }, [estActif]);

  const demarrerTimer = () => {
    setEstActif(true);
    ajouterHistorique("Démarré", temps);
  };

  const pauseTimer = () => {
    setEstActif(false);
    ajouterHistorique("En pause", temps);
  };

  const reinitialiserTimer = () => {
    setEstActif(false);
    ajouterHistorique("Réinitialisé", temps);
    setTemps(0);
  };

  const ajouterHistorique = (action, tempsActuel) => {
    setHistorique(prev => [
      {
        id: Date.now(),
        action: action,
        temps: tempsActuel,
        moment: new Date().toLocaleTimeString()
      },
      ...prev
    ].slice(0, 5));
  };

  const formaterTemps = (secondes) => {
    const minutes = Math.floor(secondes / 60);
    const secs = secondes % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div style={containerStyle}>
      <h3>️ Chronomètre Intelligent ️</h3>

      {alerte && (
        <div style={alerteStyle}>
          {alerte}
        </div>
      )}

      <div style={timerDisplayStyle}>
        {formaterTemps(temps)}
      </div>

      <div style={buttonGroupStyle}>
        {!estActif ? (
          <button onClick={demarrerTimer} style={startButtonStyle}>
            Démarrer
          </button>
        ) : (
          <button onClick={pauseTimer} style={pauseButtonStyle}>
             Pause
          </button>
        )}
        <button onClick={reinitialiserTimer} style={resetButtonStyle}>
           Réinitialiser
        </button>
      </div>

      <div style={statsStyle}>
        <div> Temps total : {temps} secondes</div>
        <div> Format : {formaterTemps(temps)}</div>
      </div>

      {historique.length > 0 && (
        <div style={historiqueStyle}>
          <h4> Dernières actions :</h4>
          <ul style={listStyle}>
            {historique.map(entry => (
              <li key={entry.id} style={listItemStyle}>
                <strong>{entry.action}</strong> à {entry.moment}
                (temps: {formaterTemps(entry.temps)})
              </li>
            ))}
          </ul>
        </div>
      )}

      <div style={tipStyle}>
         Astuce : Observez la console pour voir les messages de nettoyage !
      </div>
    </div>
  );
}

const containerStyle = {
  padding: '20px',
  border: '2px solid #9C27B0',
  borderRadius: '10px',
  backgroundColor: '#F3E5F5'
};

const timerDisplayStyle = {
  fontSize: '64px',
  fontWeight: 'bold',
  textAlign: 'center',
  margin: '30px 0',
  fontFamily: 'monospace',
  backgroundColor: 'white',
  padding: '20px',
  borderRadius: '10px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
};

const buttonGroupStyle = {
  display: 'flex',
  gap: '10px',
  justifyContent: 'center',
  marginBottom: '20px'
};

const baseButtonStyle = {
  padding: '12px 24px',
  fontSize: '16px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  fontWeight: 'bold'
};

const startButtonStyle = {
  ...baseButtonStyle,
  backgroundColor: '#4CAF50',
  color: 'white'
};

const pauseButtonStyle = {
  ...baseButtonStyle,
  backgroundColor: '#FF9800',
  color: 'white'
};

const resetButtonStyle = {
  ...baseButtonStyle,
  backgroundColor: '#f44336',
  color: 'white'
};

const statsStyle = {
  textAlign: 'center',
  margin: '15px 0',
  padding: '10px',
  backgroundColor: 'white',
  borderRadius: '8px'
};

const historiqueStyle = {
  marginTop: '20px',
  padding: '15px',
  backgroundColor: 'white',
  borderRadius: '8px'
};

const listStyle = {
  listStyle: 'none',
  padding: 0
};

const listItemStyle = {
  padding: '8px',
  borderBottom: '1px solid #eee',
  fontSize: '14px'
};

const alerteStyle = {
  backgroundColor: '#FFC107',
  color: '#333',
  padding: '10px',
  borderRadius: '5px',
  textAlign: 'center',
  marginBottom: '15px',
  animation: 'slideDown 0.3s ease-out'
};

const tipStyle = {
  marginTop: '20px',
  padding: '10px',
  backgroundColor: '#E1BEE7',
  borderRadius: '5px',
  fontSize: '14px',
  textAlign: 'center'
};

export default TimerAvance;