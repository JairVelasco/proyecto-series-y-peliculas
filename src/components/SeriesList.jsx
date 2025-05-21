import { Link } from 'react-router-dom';

export default function SeriesList({ series }) {
  if (!series.length) {
    return <p className="text-center text-gray-400">No hay resultados todavía. ¡Busca algo arriba!</p>;
  }

  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {series.map(({ show }) => (
        <Link
          to={`/serie/${show.id}`}
          key={show.id}
          className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition cursor-pointer"
        >
          <img
            src={show.image?.medium || 'https://via.placeholder.com/210x295?text=No+Image'}
            alt={show.name}
            className="w-full h-[295px] object-cover"
          />
          <div className="p-4">
            
            <h2 className="text-lg font-semibold text-indigo-700 mb-2">{show.name}</h2>
            <p className="text-sm text-gray-600 line-clamp-3" dangerouslySetInnerHTML={{ __html: show.summary }}></p>
          </div>
        </Link>
      ))}
      
    </div>
  );
  
}