# 🎨 Configuración para Framer

## 📋 **Guía de Integración**

### **1. Configuración del iframe en Framer**

```html
<iframe 
  src="https://tu-dominio.com/embed" 
  width="100%" 
  height="800px"
  frameborder="0"
  allow="fullscreen"
  sandbox="allow-scripts allow-same-origin allow-forms"
  style="border: none; border-radius: 12px;"
></iframe>
```

### **2. Eventos que envía la app a Framer**

La app enviará estos mensajes al parent (Framer):

```javascript
// Navegación a páginas
{
  type: 'NAVIGATE',
  payload: { 
    page: 'cursos', 
    params: { category: 'biomagnetismo' } 
  }
}

// Click en curso
{
  type: 'COURSE_CLICK',
  payload: { 
    courseId: 1, 
    courseTitle: 'Biomagnetismo Kids' 
  }
}

// Click en servicio
{
  type: 'SERVICE_CLICK',
  payload: { 
    serviceId: 1, 
    serviceTitle: 'Biomagnetismo' 
  }
}

// Click en producto
{
  type: 'PRODUCT_CLICK',
  payload: { 
    productId: 1, 
    productName: 'Kit de Biomagnetismo' 
  }
}

// Enlace externo
{
  type: 'NAVIGATE',
  payload: { 
    page: 'external', 
    url: 'https://inteligencia-energetica.com/',
    target: '_blank'
  }
}
```

### **3. JavaScript para escuchar eventos en Framer**

```javascript
// En tu página de Framer
window.addEventListener('message', (event) => {
  const { type, payload } = event.data;
  
  switch (type) {
    case 'NAVIGATE':
      if (payload.page === 'external') {
        window.open(payload.url, payload.target);
      } else {
        // Navegar a página interna de Framer
        navigateToPage(payload.page, payload.params);
      }
      break;
      
    case 'COURSE_CLICK':
      // Mostrar detalles del curso
      showCourseDetails(payload.courseId, payload.courseTitle);
      break;
      
    case 'SERVICE_CLICK':
      // Mostrar detalles del servicio
      showServiceDetails(payload.serviceId, payload.serviceTitle);
      break;
      
    case 'PRODUCT_CLICK':
      // Mostrar detalles del producto
      showProductDetails(payload.productId, payload.productName);
      break;
  }
});
```

### **4. URLs de ejemplo para páginas**

```
https://tu-dominio.com/embed?page=cursos
https://tu-dominio.com/embed?page=servicios
https://tu-dominio.com/embed?page=wellkitt
https://tu-dominio.com/embed?page=noticias
https://tu-dominio.com/embed?page=sobre-nosotros
https://tu-dominio.com/embed?page=aplicaciones
```

### **5. Estilos recomendados para el iframe**

```css
.framer-iframe {
  width: 100%;
  height: 800px;
  border: none;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

/* Responsive */
@media (max-width: 768px) {
  .framer-iframe {
    height: 600px;
  }
}
```

### **6. Configuración de CORS**

Asegúrate de que tu servidor permita iframe embedding:

```http
X-Frame-Options: SAMEORIGIN
Content-Security-Policy: frame-ancestors 'self' https://framer.com https://*.framer.com
```

### **7. Testing de integración**

```javascript
// Script de prueba para verificar comunicación
function testFramerIntegration() {
  const iframe = document.querySelector('iframe');
  
  iframe.addEventListener('load', () => {
    // Enviar mensaje de prueba
    iframe.contentWindow.postMessage({
      type: 'TEST',
      payload: { message: 'Hello from Framer!' }
    }, '*');
  });
}
```

## 🚀 **Ventajas de esta integración**

1. **✅ SEO Friendly**: Cada página puede tener su propia URL
2. **✅ Analytics**: Puedes trackear eventos específicos
3. **✅ Navegación fluida**: Transiciones suaves entre páginas
4. **✅ Responsive**: Se adapta perfectamente a cualquier tamaño
5. **✅ Mantenible**: Cambios en la app se reflejan automáticamente
6. **✅ Escalable**: Fácil agregar nuevas funcionalidades

## 📱 **Consideraciones móviles**

- La app está optimizada para móvil
- Los enlaces externos se abren en nueva pestaña
- El iframe se ajusta automáticamente al contenido
- Touch events funcionan correctamente
