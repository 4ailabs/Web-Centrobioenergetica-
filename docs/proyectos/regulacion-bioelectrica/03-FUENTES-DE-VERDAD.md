# Fuentes de verdad

## Repositorio académico

Raíz canónica:

```text
/Users/miguelojedarios/cursos-timeline/
  03_Programas/Cursos_Selectos/El_Cuerpo_Electrico_RB/
```

No copiar masivamente esta biblioteca al repositorio web. Registrar aquí las rutas y transformar únicamente contenido aprobado para publicación.

## Jerarquía

1. `Curso_Vigente/Modulo_1/Curso_Video/Clases_Didacticas/`: fuente editorial principal para explicar públicamente los fundamentos del método.
2. `Curso_Vigente/Modulo_2/Curso_Video/Clases_Didacticas/`: fuente editorial principal para los contenidos disponibles del módulo 2.
3. `Curso_Vigente/00_Sistema_de_Produccion/Guia_Pedagogica_Estandar_Mundial.md`: estándar para transformar las clases en contenidos educativos públicos.
4. `Fundamentos_Cientificos/`: verificación de afirmaciones científicas y referencias primarias.
5. `Curso_Vigente/Modulo_1/Curso_Video/Clases_Didacticas_TAME_Quintuple_Integrado/`: material de integración didáctica avanzada; no reemplaza por defecto a `Clases_Didacticas/`.
6. Los programas, manuales de trabajo, guiones y transcripciones de `Curso_Vigente/`: materiales de contraste y apoyo editorial.
7. `Marca_Visual/`: identidad, relación con el Instituto y dirección de arte.
8. `Referencia/Punto_Trauma/Manual/`: referencia profesional complementaria para el nodo de lesión.
9. `Materiales_Antiguos/`: referencia histórica; nunca fuente vigente por defecto.

## Regla de extracción editorial

Para crear páginas, artículos, principios o entradas del CMS se parte de los archivos de `Curso_Video/Clases_Didacticas/`. No se toma el manual de trabajo, el programa general ni un guion de video como fuente editorial principal cuando exista una lección didáctica correspondiente.

Cada publicación debe señalar la lección concreta de origen, por ejemplo:

```text
Curso_Vigente/Modulo_1/Curso_Video/Clases_Didacticas/
  Clase_1_El_Cuerpo_Electrico/Leccion_1.1_Que_es_la_RB.md
```

## Fuentes para inglés

La localización inglesa se rige además por:

1. `Curso_Vigente/Modulo_1/Revision_Traduccion_Manual_RB_EN.md`: voz clínica internacional y términos profesionales aprobados.
2. `Curso_Vigente/00_Sistema_de_Produccion/Guia_Pedagogica_Estandar_Mundial.md`: misma arquitectura didáctica, con adaptación cultural de analogías.
3. `Curso_Vigente/00_Sistema_de_Produccion/Roles_IA_y_Arquitectura_Modular.md`: rol `Localizador EN` y alineación estructural.
4. `Estrategia_Comercial/Descripcion_YouTube_El_Cuerpo_Electrico_EN.md`: precedente editorial para `The Electric Body` y `Bioelectric Regulation`.

El glosario web derivado se conserva en `10-GLOSARIO-BILINGUE.md`. Si contradice una fuente vigente, prevalece `Curso_Vigente` y se registra la corrección.

## Regla de conflicto

Cuando dos documentos difieran:

- prevalece `Curso_Vigente` sobre material antiguo o comercial;
- prevalece el manual de marca vigente sobre una pieza visual aislada;
- una afirmación científica requiere verificación contra `Fundamentos_Cientificos` o una fuente primaria;
- una instrucción clínica no se adapta para público sin aprobación académica;
- si el conflicto no puede resolverse, se registra como decisión pendiente y no se publica.

## Trazabilidad editorial

Cada artículo futuro debe registrar:

- archivo o fuente de origen;
- responsable de adaptación;
- revisión académica;
- fecha de revisión;
- audiencia y nivel de acceso;
- cambios sustantivos respecto de la fuente.

## Mapa aplicado en Framer — 13 de agosto de 2026

Los registros siguientes permanecen en `Borrador`. La referencia visible para el público se redacta como módulo, clase y lección; la ruta interna exacta se conserva aquí.

### Artículos

| Artículo | Fuentes didácticas canónicas |
|---|---|
| Qué significa que el cuerpo sea bioeléctrico | `Modulo_1/Curso_Video/Clases_Didacticas/Clase_1_El_Cuerpo_Electrico/Leccion_1.1_Que_es_la_RB.md`; `Leccion_1.4_El_Vmem_y_la_Jerarquia.md` |
| Del cuerpo-máquina al cuerpo-agente | `Modulo_1/Curso_Video/Clases_Didacticas/Clase_3_El_Cuerpo_Agente/Leccion_3.1_El_Cuerpo_Agente_y_TAME.md`; apoyo: `Clase_1_El_Cuerpo_Electrico/Leccion_1.4_El_Vmem_y_la_Jerarquia.md` |
| Estado bioeléctrico, instrumento y procedimiento | `Modulo_1/Curso_Video/Clases_Didacticas/Clase_1_El_Cuerpo_Electrico/Leccion_1.1_Que_es_la_RB.md`; `Clase_2_El_Instrumento/Leccion_2.1_Campo_Magnetico_y_Tejido.md`; `Leccion_2.2_El_Iman.md`; estructura general: `Modulo_2/Curso_Video/Clases_Didacticas/Clase_1_El_Procedimiento/Leccion_1.1_El_Manual_y_el_Algoritmo.md` |

### Principios

| Principio | Fuente didáctica canónica |
|---|---|
| Potencial de membrana | `Modulo_1/Curso_Video/Clases_Didacticas/Clase_1_El_Cuerpo_Electrico/Leccion_1.4_El_Vmem_y_la_Jerarquia.md` |
| Microambiente tisular | `Modulo_1/Curso_Video/Clases_Didacticas/Clase_1_El_Cuerpo_Electrico/Leccion_1.3_La_Matriz_Extracelular.md` |
| Primero rastreo, después aplicación | `Modulo_1/Curso_Video/Clases_Didacticas/Clase_1_El_Cuerpo_Electrico/Leccion_1.1_Que_es_la_RB.md` |
| Campo magnético estático | `Modulo_1/Curso_Video/Clases_Didacticas/Clase_2_El_Instrumento/Leccion_2.1_Campo_Magnetico_y_Tejido.md`; `Leccion_2.2_El_Iman.md` |
| Agencia biológica | `Modulo_1/Curso_Video/Clases_Didacticas/Clase_3_El_Cuerpo_Agente/Leccion_3.1_El_Cuerpo_Agente_y_TAME.md` |
| Diferenciar mecanismo e intervención | `Modulo_1/Curso_Video/Clases_Didacticas/Clase_1_El_Cuerpo_Electrico/Leccion_1.4_El_Vmem_y_la_Jerarquia.md`; `Clase_2_El_Instrumento/Leccion_2.1_Campo_Magnetico_y_Tejido.md` |

### Página Método

| Bloque público | Fuentes didácticas canónicas |
|---|---|
| Definición y secuencia de RB | `Modulo_1/Curso_Video/Clases_Didacticas/Clase_1_El_Cuerpo_Electrico/Leccion_1.1_Que_es_la_RB.md` |
| Potencial de membrana y estado bioeléctrico | `Modulo_1/Curso_Video/Clases_Didacticas/Clase_1_El_Cuerpo_Electrico/Leccion_1.4_El_Vmem_y_la_Jerarquia.md` |
| Microambiente tisular y matriz extracelular | `Modulo_1/Curso_Video/Clases_Didacticas/Clase_1_El_Cuerpo_Electrico/Leccion_1.3_La_Matriz_Extracelular.md` |
| Campo magnético estático e imán | `Modulo_1/Curso_Video/Clases_Didacticas/Clase_2_El_Instrumento/Leccion_2.1_Campo_Magnetico_y_Tejido.md`; `Leccion_2.2_El_Iman.md` |
| Agencia biológica y marco TAME | `Modulo_1/Curso_Video/Clases_Didacticas/Clase_3_El_Cuerpo_Agente/Leccion_3.1_El_Cuerpo_Agente_y_TAME.md` |
| Diferencia entre regulación, curación y diagnóstico | `Modulo_1/Curso_Video/Clases_Didacticas/Clase_3_El_Cuerpo_Agente/Leccion_3.3_Regular_no_es_Curar.md`; `Clase_4_El_Rastreo/Leccion_4.1_El_Rastreo.md` |
| Perfil bioeléctrico: densidad, distribución y contexto | `Modulo_1/Curso_Video/Clases_Didacticas/Clase_4_El_Rastreo/Leccion_4.1_El_Rastreo.md` |

La adaptación publicada en la rama no expone maniobras ni criterios profesionales. El texto visible identifica las fuentes por módulo, clase y lección; este mapa conserva las rutas internas exactas.

La ruta completa de cada entrada parte de la raíz canónica declarada al inicio de este documento y continúa con `Curso_Vigente/`.

## Fuentes web legadas

Las páginas React existentes (`pages/RBMetodo.tsx` y `pages/RegulacionBioelectrica.tsx`) pueden aportar inventario y mensajes históricos. No reemplazan al curso vigente ni deben migrarse literalmente sin auditoría.
