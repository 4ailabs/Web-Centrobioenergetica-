import React, { useState } from 'react';
import { getStreamEmbedUrl } from '../lib/cloudflare-stream';

interface PromoVideoProps {
  /** UID de Cloudflare Stream. Debe ser un video SIN "Require Signed URLs":
   *  un promo lo ve gente que todavía no tiene cuenta, y una URL firmada
   *  necesita un token que solo se emite a alumnos inscritos. */
  streamId: string;
  titulo: string;
  /** Texto sobre la miniatura, antes de reproducir. */
  etiqueta?: string;
  /** Segundo del video que se usa como miniatura. */
  posterTime?: string;
  /** Redondeo del marco. Dentro de una tarjeta que ya redondea, pasar
   *  'rounded-none' evita la esquina dentro de otra esquina. */
  rounded?: string;
}

/**
 * Reproductor de video promocional en dos tiempos: primero la miniatura
 * (una imagen), y el iframe de Cloudflare solo cuando la persona pulsa play.
 * Un iframe de terceros cargado de entrada pesa en cada visita a la landing,
 * la vea o no; así solo lo paga quien decide verlo.
 */
const PromoVideo: React.FC<PromoVideoProps> = ({
  streamId,
  titulo,
  etiqueta,
  posterTime = '2s',
  rounded = 'rounded-xl',
}) => {
  const [reproduciendo, setReproduciendo] = useState(false);
  const poster = `https://videodelivery.net/${streamId}/thumbnails/thumbnail.jpg?time=${posterTime}&height=720`;

  if (reproduciendo) {
    return (
      <div className={`${rounded} overflow-hidden aspect-video bg-black`}>
        <iframe
          src={getStreamEmbedUrl(streamId, undefined, { controls: true, autoplay: true })}
          title={titulo}
          allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
          allowFullScreen
          className="w-full h-full border-0"
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setReproduciendo(true)}
      aria-label={`Reproducir video: ${titulo}`}
      className={`group relative block w-full ${rounded} overflow-hidden aspect-video bg-neutral-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2`}
    >
      <img
        src={poster}
        alt=""
        loading="lazy"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover opacity-90 transition-opacity group-hover:opacity-100"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />

      <span className="absolute inset-0 flex items-center justify-center">
        <span className="w-16 h-16 rounded-full bg-white/95 flex items-center justify-center shadow-lg transition-transform group-hover:scale-105">
          {/* Triángulo con desplazamiento óptico: centrado geométrico se ve corrido a la izquierda */}
          <svg viewBox="0 0 24 24" className="w-6 h-6 translate-x-[2px] fill-neutral-900" aria-hidden="true">
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </span>

      {etiqueta && (
        <span className="absolute bottom-4 left-5 right-5 text-left text-[13px] font-medium text-white/90">
          {etiqueta}
        </span>
      )}
    </button>
  );
};

export default PromoVideo;
