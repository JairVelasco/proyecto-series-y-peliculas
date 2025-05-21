import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const SeriePage = () => {
  const { id } = useParams();
  const [serie, setSerie] = useState(null);
  const [temporadas, setTemporadas] = useState([]);
  const [episodiosPorTemporada, setEpisodiosPorTemporada] = useState({});
  const [totalEpisodios, setTotalEpisodios] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarDatos = async () => {
      setLoading(true);
      setError(null);
      try {
        const resSerie = await fetch(`https://api.tvmaze.com/shows/${id}`);
        if (!resSerie.ok) throw new Error('No se pudo cargar la serie');
        const dataSerie = await resSerie.json();
        setSerie(dataSerie);

        const resTemporadas = await fetch(`https://api.tvmaze.com/shows/${id}/seasons`);
        if (!resTemporadas.ok) throw new Error('No se pudieron cargar las temporadas');
        const dataTemporadas = await resTemporadas.json();
        setTemporadas(dataTemporadas);

        const episodiosPorTemp = {};
        let total = 0;

        await Promise.all(
          dataTemporadas.map(async (temp) => {
            const resEpisodios = await fetch(`https://api.tvmaze.com/seasons/${temp.id}/episodes`);
            if (!resEpisodios.ok) throw new Error('No se pudieron cargar los episodios');
            const dataEpisodios = await resEpisodios.json();
            episodiosPorTemp[temp.id] = dataEpisodios.length;
            total += dataEpisodios.length;
          })
        );

        setEpisodiosPorTemporada(episodiosPorTemp);
        setTotalEpisodios(total);
      } catch (error) {
        setError(error.message);
      }
      setLoading(false);
    };

    cargarDatos();
  }, [id]);

  if (loading) return <div className="text-white p-4">Cargando...</div>;
  if (error) return <div className="text-red-400 p-4">{error}</div>;
  if (!serie) return <div className="text-white p-4">No se encontró la serie.</div>;

  return (
    <div className="bg-black min-h-screen text-white p-6">
      <Link to="/" className="text-blue-400 underline mb-4 inline-block">← Volver</Link>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/3 flex justify-center">
          <img
            src={serie.image?.original || 'https://via.placeholder.com/400x600'}
            alt={serie.name ? `Poster de ${serie.name}` : 'Poster no disponible'}
            className="w-[250px] md:w-[300px] h-auto rounded-2xl shadow-lg object-cover"
          />
        </div>
        <div className="md:w-2/3">
          <h1 className="text-4xl font-bold mb-2">{serie.name || 'Sin título'}</h1>
          <p className="text-gray-300 mb-4" dangerouslySetInnerHTML={{ __html: serie.summary || 'Sin descripción.' }}></p>

          <ul className="space-y-1 text-sm">
            <li><strong>Géneros:</strong> {serie.genres?.length ? serie.genres.join(', ') : 'No disponible'}</li>
            <li><strong>Lenguaje:</strong> {serie.language || 'No disponible'}</li>
            <li><strong>Estado:</strong> {serie.status || 'No disponible'}</li>
            <li><strong>Rating:</strong> {serie.rating?.average || 'No disponible'}</li>
            <li><strong>Canal:</strong> {serie.network?.name || 'N/A'}</li>
            <li><strong>Estreno:</strong> {serie.premiered || 'No disponible'}</li>
            <li><strong>Total de Episodios:</strong> {totalEpisodios}</li>
          </ul>

          <div className="mt-6">
            <h2 className="text-2xl font-semibold mb-2">Temporadas</h2>
            <ul className="space-y-2">
              {temporadas.length === 0 && (
                <li>No hay temporadas disponibles.</li>
              )}
              {temporadas.map((temp, index) => (
                <li key={temp.id}>
                  <strong>Temporada {index + 1}:</strong> {episodiosPorTemporada[temp.id] ?? 0} episodio(s)
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeriePage;