import { useReducer } from 'react';

const initialState = {
  count: 0,
  step: 1,
  maxValue: 10
};

function counterReducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      const newCount = state.count + state.step;
      return {
        ...state,
        count: newCount > state.maxValue ? state.maxValue : newCount
      };
    case 'DECREMENT':
      return {
        ...state,
        count: Math.max(0, state.count - state.step)
      };
    case 'RESET':
      return {
        ...state,
        count: 0
      };
    case 'SET_STEP':
      return {
        ...state,
        step: action.payload
      };
    case 'SET_MAX':
      return {
        ...state,
        maxValue: action.payload,
        count: Math.min(state.count, action.payload)
      };
    default:
      throw new Error(`Action inconnue : ${action.type}`);
  }
}

function CompteurPersonnalise() {
  const [state, dispatch] = useReducer(counterReducer, initialState);
  const { count, step, maxValue } = state;

  return (
    <div style={{ padding: '20px', border: '2px solid #4CAF50', borderRadius: '10px' }}>
      <h3> Mon Super Compteur Intelligent</h3>
      <div style={{ fontSize: '48px', fontWeight: 'bold', margin: '20px' }}>
        {count}
      </div>
      <div>
        <button
          onClick={() => dispatch({ type: 'INCREMENT' })}
          style={buttonStyle}
        >
          +{step}
        </button>
        <button
          onClick={() => dispatch({ type: 'DECREMENT' })}
          style={buttonStyle}
        >
          -{step}
        </button>
        <button
          onClick={() => dispatch({ type: 'RESET' })}
          style={{ ...buttonStyle, backgroundColor: '#ff9800' }}
        >
          Réinitialiser
        </button>
      </div>
      <div style={{ marginTop: '15px' }}>
        <label>Pas d'incrémentation : </label>
        <input
          type="number"
          value={step}
          onChange={(e) => dispatch({
            type: 'SET_STEP',
            payload: parseInt(e.target.value) || 1
          })}
          style={inputStyle}
        />
      </div>
      <div style={{ marginTop: '10px' }}>
        <label>Valeur maximale : </label>
        <input
          type="number"
          value={maxValue}
          onChange={(e) => dispatch({
            type: 'SET_MAX',
            payload: parseInt(e.target.value) || 10
          })}
          style={inputStyle}
        />
      </div>
      <div style={{ marginTop: '10px', fontSize: '14px', color: '#666' }}>
         Valeur minimale: 0 | Maximale: {maxValue}
      </div>
    </div>
  );
}

const buttonStyle = {
  margin: '0 5px',
  padding: '10px 20px',
  fontSize: '16px',
  cursor: 'pointer',
  backgroundColor: '#4CAF50',
  color: 'white',
  border: 'none',
  borderRadius: '5px'
};

const inputStyle = {
  marginLeft: '10px',
  padding: '5px',
  fontSize: '14px',
  width: '60px'
};

export default CompteurPersonnalise;