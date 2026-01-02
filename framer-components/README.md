# 🎨 Componente CourseDetailPage para Framer

## 📋 **Descripción**

Componente React compatible con Framer que recrea la página de detalles del curso basada en el diseño proporcionado. Incluye una imagen principal, contenido del curso, sidebar con detalles y botones de acción.

## 🚀 **Instalación en Framer**

1. **Copia el código** del archivo `CourseDetailPage.jsx`
2. **Pega en Framer** como un nuevo componente React
3. **Configura las propiedades** según tus necesidades

## 🎛️ **Propiedades Configurables**

### **Contenido del Curso**
- **Course Title**: Título principal del curso
- **Course Description**: Descripción corta del curso
- **Course Content**: Contenido detallado (soporta saltos de línea)
- **Course Image**: URL de la imagen principal

### **Detalles del Curso**
- **Author**: Nombre del autor/instructor
- **Level**: Nivel del curso (Beginner, Intermediate, Advanced)
- **Lessons**: Número de lecciones
- **Language**: Idioma principal
- **Subtitles**: Idiomas de subtítulos disponibles
- **Price**: Precio del curso

### **Personalización Visual**
- **Background Color**: Color de fondo de la página
- **Text Color**: Color del texto principal
- **Accent Color**: Color de acento (botón BUY NOW)

### **Eventos**
- **Back to Courses**: Función a ejecutar al hacer clic en "← BACK TO COURSES"
- **Buy Now**: Función a ejecutar al hacer clic en "BUY NOW"
- **Next Course**: Función a ejecutar al hacer clic en "NEXT COURSE"

## 📱 **Características**

### **Responsive Design**
- Layout adaptativo para diferentes tamaños de pantalla
- Sidebar sticky que se mantiene visible al hacer scroll
- Imagen principal con aspect ratio fijo

### **Interactividad**
- Botones con efectos hover
- Carga progresiva de imágenes
- Transiciones suaves

### **Accesibilidad**
- Alt text en imágenes
- Contraste adecuado de colores
- Navegación por teclado

## 🎯 **Uso Recomendado**

### **1. Integración con tu App**
```javascript
// En tu página principal de Framer
<CourseDetailPage
  courseTitle="Biomagnetismo Kids"
  courseDescription="Técnicas especializadas de biomagnetismo adaptadas para el bienestar de los niños"
  courseImage="https://tu-imagen.com/curso.jpg"
  author="Dr. María González"
  level="Beginner"
  lessons={12}
  price="$299 MXN"
  onBackToCourses={() => {
    // Navegar de vuelta a la lista de cursos
    navigateToPage("courses")
  }}
  onBuyNow={() => {
    // Abrir modal de compra o redirigir
    openPurchaseModal()
  }}
  onNextCourse={() => {
    // Navegar al siguiente curso
    navigateToNextCourse()
  }}
/>
```

### **2. Personalización de Colores**
```javascript
<CourseDetailPage
  backgroundColor="#f8fafc"
  textColor="#1e293b"
  accentColor="#059669"
  // ... otras props
/>
```

## 🔧 **Personalización Avanzada**

### **Modificar Estilos**
Puedes editar los estilos inline en el componente para ajustar:
- Espaciado entre elementos
- Tamaños de fuente
- Colores específicos
- Bordes y sombras

### **Agregar Nuevas Propiedades**
1. Agrega la propiedad en la función del componente
2. Añade el control correspondiente en `addPropertyControls`
3. Usa la propiedad en el JSX

### **Ejemplo de Nueva Propiedad**
```javascript
// En la función del componente
const {
  // ... props existentes
  customProperty = "valor por defecto",
} = props

// En addPropertyControls
customProperty: {
  type: ControlType.String,
  title: "Custom Property",
  defaultValue: "valor por defecto",
}
```

## 📊 **Estructura del Componente**

```
CourseDetailPage
├── Header
│   └── Back to Courses Button
├── Main Content
│   ├── Course Image
│   └── Content Layout
│       ├── Main Content (Title, Description, Content)
│       └── Course Details Sidebar
│           ├── Course Details List
│           └── Buy Now Button
└── Next Course Button
```

## 🎨 **Diseño Basado en la Imagen**

El componente replica fielmente el diseño mostrado en la imagen:
- Header con botón de regreso
- Imagen principal con bordes redondeados
- Layout de dos columnas (contenido + sidebar)
- Sidebar con detalles del curso y botón de compra
- Botón "NEXT COURSE" en la parte inferior

## ⚡ **Optimizaciones**

- **Lazy Loading**: Las imágenes se cargan progresivamente
- **Memoización**: Evita re-renders innecesarios
- **Transiciones**: Efectos suaves en hover
- **Responsive**: Se adapta a diferentes tamaños

## 🐛 **Solución de Problemas**

### **Imagen no carga**
- Verifica que la URL sea válida
- Asegúrate de que la imagen sea accesible públicamente

### **Eventos no funcionan**
- Verifica que las funciones estén correctamente definidas
- Asegúrate de que los EventHandlers estén configurados

### **Estilos no se aplican**
- Verifica que los colores estén en formato hexadecimal válido
- Asegúrate de que las propiedades estén correctamente tipadas

## 📝 **Notas Importantes**

- El componente usa estilos inline para máxima compatibilidad con Framer
- Las imágenes deben ser accesibles públicamente
- Los EventHandlers son opcionales pero recomendados para funcionalidad completa
- El componente es completamente responsive y se adapta a diferentes tamaños de pantalla
