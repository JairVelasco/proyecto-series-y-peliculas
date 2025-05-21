import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Link } from 'react-router-dom';

const SeriesSlider = ({ series }) => {
  return (
    <div className="w-full px-4">
      <Swiper
        modules={[Navigation]}
        spaceBetween={10}
        slidesPerView={4}
        navigation
        grabCursor={true}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 5 },
        }}
      >
        {series.map((serie) => (
          <SwiperSlide key={serie.id}>
            <Link to={`/serie/${serie.id}`}>
              <div className="bg-gray-900 rounded overflow-hidden shadow-md hover:scale-105 transition-all">
                <img
                  src={serie.image?.medium || 'https://via.placeholder.com/210x295'}
                  alt={serie.name}
                  className="w-full h-auto"
                />
                <div className="p-2">
                  <h2 className="text-sm text-white truncate">{serie.name}</h2>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SeriesSlider;
