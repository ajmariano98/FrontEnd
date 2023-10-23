import React from 'react';
import './Home.css'; // Importa el archivo CSS

export default function Home() {
  return (
    <div id="carousel" className="carousel slide carousel-fade black-bg">
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img
            src="https://www.mastekhw.com/wp-content/uploads/2023/05/Computex-2023-Gigabyte-anuncio-sus-modelos-AMD-Radeon-RX-7600.jpg"
            className="d-block w-100" // Aplicamos la clase "rounded"
            alt="..."
          />
        </div>
        <div className="carousel-item">
          <img
          src="https://s1.eestatic.com/2023/10/16/elandroidelibre/noticias-y-novedades/802430187_236839443_1706x960.jpg"
            className="d-block w-100" // Aplicamos la clase "rounded"
            alt="..."
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://tierragamer.com/wp-content/uploads/2023/10/alan-wake-ii-nvidia-geforce-rtx-serie-40-paquete.webp"
            className="d-block w-100" // Aplicamos la clase "rounded"
            alt="..."
          />
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carousel"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Anterior</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carousel"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Siguiente</span>
      </button>
    </div>
  );
}