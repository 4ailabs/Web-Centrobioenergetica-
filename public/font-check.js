// Script de verificación de fuentes
// Este script verifica que Inter se esté aplicando correctamente en toda la aplicación

document.addEventListener('DOMContentLoaded', function() {
  // Verificar que Inter esté cargada
  const interFont = document.fonts.check('16px Inter');
  
  if (interFont) {
    console.log('✅ Inter font loaded successfully');
  } else {
    console.warn('⚠️ Inter font not loaded, falling back to system fonts');
  }
  
  // Verificar elementos específicos
  const elements = document.querySelectorAll('h1, h2, h3, p, button, input, textarea');
  let interCount = 0;
  
  elements.forEach(element => {
    const computedStyle = window.getComputedStyle(element);
    const fontFamily = computedStyle.fontFamily;
    
    if (fontFamily.includes('Inter')) {
      interCount++;
    }
  });
  
  console.log(`📊 Inter applied to ${interCount}/${elements.length} elements`);
  
  // Verificar clases CSS específicas
  const productNames = document.querySelectorAll('.product-name');
  const productDescriptions = document.querySelectorAll('.product-description');
  const dosageInfos = document.querySelectorAll('.dosage-info');
  const warningTexts = document.querySelectorAll('.warning-text');
  
  console.log(`🎯 Custom classes found:`);
  console.log(`   - .product-name: ${productNames.length} elements`);
  console.log(`   - .product-description: ${productDescriptions.length} elements`);
  console.log(`   - .dosage-info: ${dosageInfos.length} elements`);
  console.log(`   - .warning-text: ${warningTexts.length} elements`);
});

// Función para verificar fuentes en tiempo real
function checkFonts() {
  const elements = document.querySelectorAll('*');
  const fontCounts = {};
  
  elements.forEach(element => {
    const computedStyle = window.getComputedStyle(element);
    const fontFamily = computedStyle.fontFamily;
    
    // Extraer el nombre principal de la fuente
    const mainFont = fontFamily.split(',')[0].replace(/['"]/g, '');
    
    if (fontCounts[mainFont]) {
      fontCounts[mainFont]++;
    } else {
      fontCounts[mainFont] = 1;
    }
  });
  
  console.log('📈 Font usage statistics:', fontCounts);
  return fontCounts;
}

// Exportar función para uso en consola
window.checkFonts = checkFonts;
