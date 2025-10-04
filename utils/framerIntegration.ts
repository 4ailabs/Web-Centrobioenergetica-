// Utilidades para integración con Framer
export interface FramerMessage {
  type: 'NAVIGATE' | 'SEARCH' | 'COURSE_CLICK' | 'SERVICE_CLICK' | 'PRODUCT_CLICK';
  payload: any;
}

export interface FramerNavigation {
  page: string;
  params?: Record<string, any>;
}

// Función para enviar mensajes al parent (Framer)
export const sendToFramer = (message: FramerMessage) => {
  if (window.parent && window.parent !== window) {
    window.parent.postMessage(message, '*');
  }
};

// Función para navegar a páginas externas en Framer
export const navigateToFramerPage = (page: string, params?: Record<string, any>) => {
  sendToFramer({
    type: 'NAVIGATE',
    payload: { page, params }
  });
};

// Función para abrir enlaces externos
export const openExternalLink = (url: string, target: '_blank' | '_self' = '_blank') => {
  if (window.parent && window.parent !== window) {
    // Si está en iframe, enviar mensaje al parent
    sendToFramer({
      type: 'NAVIGATE',
      payload: { page: 'external', url, target }
    });
  } else {
    // Si no está en iframe, abrir directamente
    window.open(url, target);
  }
};

// Función para manejar clicks en cursos
export const handleCourseClick = (courseId: number, courseTitle: string) => {
  sendToFramer({
    type: 'COURSE_CLICK',
    payload: { courseId, courseTitle }
  });
};

// Función para manejar clicks en servicios
export const handleServiceClick = (serviceId: number, serviceTitle: string) => {
  sendToFramer({
    type: 'SERVICE_CLICK',
    payload: { serviceId, serviceTitle }
  });
};

// Función para manejar clicks en productos
export const handleProductClick = (productId: number, productName: string) => {
  sendToFramer({
    type: 'PRODUCT_CLICK',
    payload: { productId, productName }
  });
};

// Función para detectar si está en iframe
export const isInIframe = (): boolean => {
  try {
    return window.self !== window.top;
  } catch (e) {
    return true;
  }
};

// Función para obtener parámetros de URL
export const getUrlParams = (): Record<string, string> => {
  const params = new URLSearchParams(window.location.search);
  const result: Record<string, string> = {};
  
  for (const [key, value] of params.entries()) {
    result[key] = value;
  }
  
  return result;
};

// Función para escuchar mensajes del parent (Framer)
export const listenToFramer = (callback: (message: FramerMessage) => void) => {
  const handleMessage = (event: MessageEvent) => {
    if (event.data && typeof event.data === 'object' && event.data.type) {
      callback(event.data);
    }
  };

  window.addEventListener('message', handleMessage);
  
  // Retornar función de limpieza
  return () => {
    window.removeEventListener('message', handleMessage);
  };
};
