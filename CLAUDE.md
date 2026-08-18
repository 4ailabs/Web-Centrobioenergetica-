# Instituto Centro Bioenergética

## Framer

El agente oficial de Framer **ya está instalado** (`@framer/agent`, agosto 2026). Las skills viven en
`~/.claude/skills/framer` y `~/.agents/skills/framer`, fuera del repositorio, y persisten entre sesiones.

**No hace falta reinstalarlo.** `npx @framer/agent@latest setup` es idempotente y tarda ~1 s con la caché
tibia; ejecútalo solo si el CLI reporta un error de versión o de skills faltantes.

Requisito: **Node ≥ 24**. Ya resuelto en `~/.zshrc`, donde `/opt/homebrew/opt/node@24/bin` se antepone
después de `/usr/local/bin` (ahí vive un Node 22 del instalador `.pkg` que antes lo tapaba). Si `node --version`
devuelve v22, es que esa línea se reordenó otra vez.

No usar el plugin **unframer** (`mcp.unframer.co`). Se eliminó de `~/.mcp.json` a propósito: todo el trabajo
en Framer va por el CLI oficial.

### Proyecto

- Proyecto Framer: `Instituto` — ID `zzgwwJi3CXZa14noLOao`
- Rama de trabajo: `rb-public-foundation` (hija de `public-homepage`); `main` no se toca en esta fase
- Contexto generado por el agente: `~/.claude/skills/framer/projects/zzgwwJi3CXZa14noLOao/`

### Documentación

- [docs/proyectos/regulacion-bioelectrica/](docs/proyectos/regulacion-bioelectrica/) — alcance, arquitectura,
  marca, ramas, localización. `05-FRAMER-Y-RAMAS.md` lleva el estado vivo.
- [docs/FRAMER_NODO_LESION.md](docs/FRAMER_NODO_LESION.md) — manual «El nodo de lesión».
- [docs/FRAMER_DESCUBRIR.md](docs/FRAMER_DESCUBRIR.md) — sección Descubrir.

## Base de datos

Nunca ejecutar `prisma migrate dev` ni `db push` contra producción. Ya hubo una pérdida de usuarios.
Ver [docs/CUIDADO_BASE_DE_DATOS.md](docs/CUIDADO_BASE_DE_DATOS.md).
