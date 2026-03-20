import { useRef, useState } from 'react';

function FocusAnimaux() {
  const animalRefs = {
    chien: useRef(null),
    chat: useRef(null),
    oiseau: useRef(null),
    poisson: useRef(null)
  };

  const [message, setMessage] = useState('');
  const [selectedAnimal, setSelectedAnimal] = useState('');

  const focusInput = (animal, ref) => {
    ref.current.focus();
    setSelectedAnimal(animal);
    setMessage(`Le focus est sur : ${animal} ! Tapez votre message...`);

    setTimeout(() => {
      if (selectedAnimal === animal) {
        setMessage('');
      }
    }, 3000);
  };

  const handleKeyPress = (e, animal) => {
    if (e.key === 'Enter') {
      setMessage(` ${animal} dit : "${e.target.value}" `);
      e.target.value = '';
    }
  };

  return (
    <div style={containerStyle}>
      <h3> Messages des Animaux </h3>
      <div style={gridStyle}>
        {Object.entries(animalRefs).map(([animal, ref]) => (
          <div key={animal} style={animalCardStyle}>
            <strong>{getEmoji(animal)} {animal.toUpperCase()}</strong>
            <input
              ref={ref}
              type="text"
              placeholder={`Message du ${animal}...`}
              onKeyPress={(e) => handleKeyPress(e, animal)}
              style={inputStyle}
            />
            <button
              onClick={() => focusInput(animal, ref)}
              style={focusButtonStyle}
            >
               Focus {animal}
            </button>
          </div>
        ))}
      </div>
      {message && <div style={messageStyle}>{message}</div>}
    </div>
  );
}

function getEmoji(animal) {
  const emojis = {
    chien: '',
    chat: '',
    oiseau: '',
    poisson: ''
  };
  return emojis[animal] || '';
}

const containerStyle = {
  padding: '20px',
  border: '2px solid #FF6B6B',
  borderRadius: '10px',
  backgroundColor: '#FFF5F5'
};

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: '15px',
  marginTop: '15px'
};

const animalCardStyle = {
  padding: '15px',
  border: '1px solid #ddd',
  borderRadius: '8px',
  textAlign: 'center',
  backgroundColor: 'white'
};

const inputStyle = {
  width: '100%',
  margin: '10px 0',
  padding: '8px',
  borderRadius: '4px',
  border: '1px solid #ccc',
  boxSizing: 'border-box'
};

const focusButtonStyle = {
  backgroundColor: '#FF6B6B',
  color: 'white',
  border: 'none',
  padding: '8px 12px',
  borderRadius: '5px',
  cursor: 'pointer',
  fontSize: '14px'
};

const messageStyle = {
  marginTop: '15px',
  padding: '10px',
  backgroundColor: '#4CAF50',
  color: 'white',
  borderRadius: '5px',
  textAlign: 'center',
  animation: 'fadeIn 0.5s'
};

export default FocusAnimaux;