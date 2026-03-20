import { useState, useEffect } from 'react';

function useMeteo(ville) {
  const [meteo, setMeteo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cache, setCache] = useState({});

  useEffect(() => {
    if (!ville) return;

    if (cache[ville]) {
      setMeteo(cache[ville]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    const fetchMeteo = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));

        const meteoData = {
          ville: ville,
          temperature: Math.floor(Math.random() * 30) + 5,
          condition: getRandomCondition(),
          humidite: Math.floor(Math.random() * 60) + 30,
          vent: Math.floor(Math.random() * 30) + 5,
          miseAJour: new Date().toLocaleString()
        };

        setMeteo(meteoData);
        setCache(prev => ({ ...prev, [ville]: meteoData }));
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchMeteo();
  }, [ville, cache]);

  return { meteo, loading, error };
}

function getRandomCondition() {
  const conditions = [' Ensoleillé', ' Partiellement nuageux', ' Pluvieux', ' Nuageux', ' Orageux', ' Neigeux'];
  return conditions[Math.floor(Math.random() * conditions.length)];
}

export default useMeteo;