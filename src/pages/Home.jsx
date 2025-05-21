import React, { useEffect, useState } from 'react';
import SeriesSlider from '../components/SeriesSlider';
import { Link } from 'react-router-dom';

const Home = () => {
  const [series, setSeries] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [resultados, setResultados] = useState([]);
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    const fetchSeries = async () => {
      const res = await fetch('https://api.tvmaze.com/shows');
      const data = await res.json();
      setSeries(data.slice(0, 30));
    };
    fetchSeries();
  }, []);

  const buscarSeries = async (texto) => {
    setCargando(true);
    const res = await fetch(`https://api.tvmaze.com/search/shows?q=${texto}`);
    const data = await res.json();
    setResultados(data);
    setCargando(false);
  };

  const handleBusqueda = (e) => {
    const texto = e.target.value;
    setBusqueda(texto);

    if (texto.length > 2) {
      buscarSeries(texto);
    } else {
      setResultados([]);
      setCargando(false);
    }
  };

  return (
    <div className="bg-black min-h-screen text-white p-4">
      <h1 className="text-3xl font-bold mb-4">Buscador de Series</h1>
      <input
        type="text"
        value={busqueda}
        onChange={handleBusqueda}
        placeholder="Buscar serie..."
        className="w-full p-2 rounded text-black mb-6 text-xl shadow-lg"
      />
      {busqueda.length > 2 && (
        <>
          {cargando && <div className="mb-4">Buscando...</div>}
          {!cargando && resultados.length === 0 && (
            <div className="mb-4">No se encontraron resultados.</div>
          )}
          {!cargando && resultados.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
              {resultados.map(({ show }) => (
                <Link key={show.id} to={`/serie/${show.id}`}>
                  <div className="bg-gray-900 rounded shadow hover:scale-105 transition-all">
                    <img
                      src={show.image?.medium || 'https://via.placeholder.com/210x295'}
                      alt={show.name}
                      className="w-full"
                    />
                    <div className="p-2">
                      <h2 className="text-sm">{show.name}</h2>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </>
      )}
      <h2 className="text-2xl font-semibold mb-2">Series Populares</h2>
      <SeriesSlider series={series} />
    </div>
  );
};

export default Home;