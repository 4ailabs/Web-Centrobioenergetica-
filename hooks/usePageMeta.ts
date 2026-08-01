import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { metaForPath, fullTitle, SITE_URL, DEFAULT_IMAGE } from '../lib/pageMeta';

/** Crea la etiqueta si no existe y le fija el contenido. */
function fijar(clave: 'name' | 'property', valor: string, contenido: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${clave}="${valor}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(clave, valor);
    document.head.appendChild(el);
  }
  el.setAttribute('content', contenido);
}

function fijarCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

/**
 * Mantiene el <head> al día conforme se navega dentro de la app.
 *
 * Sirve para la pestaña del navegador, el historial y los buscadores que sí
 * ejecutan JavaScript. NO sirve para la vista previa de WhatsApp, Facebook o
 * LinkedIn: esos robots no ejecutan JS y solo leen el HTML que manda el
 * servidor. De eso se encarga scripts/prerender-meta.ts durante el build.
 */
export function usePageMeta() {
  const { pathname } = useLocation();

  useEffect(() => {
    const meta = metaForPath(pathname);
    const titulo = fullTitle(meta);
    const url = `${SITE_URL}${pathname}`;
    const imagen = `${SITE_URL}${meta.image ?? DEFAULT_IMAGE}`;

    document.title = titulo;
    fijarCanonical(url);
    fijar('name', 'description', meta.description);

    fijar('property', 'og:title', titulo);
    fijar('property', 'og:description', meta.description);
    fijar('property', 'og:url', url);
    fijar('property', 'og:image', imagen);

    fijar('name', 'twitter:title', titulo);
    fijar('name', 'twitter:description', meta.description);
    fijar('name', 'twitter:image', imagen);
  }, [pathname]);
}
