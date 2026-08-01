import React from 'react';
import LegalPage, { Seccion, Lista, Aviso } from '../components/LegalPage';

const CORREO = 'contacto@institutocentrobioenergetica.com';

/**
 * Aviso de privacidad. Todo lo que dice está verificado contra el código:
 * el modelo User de Prisma, lo que la app escribe en localStorage y el hecho
 * de que los tests se calculan en el navegador sin enviar nada.
 *
 * Si cambias qué datos guardas, actualiza también este texto y su fecha.
 */
const AvisoPrivacidad: React.FC = () => (
  <LegalPage
    titulo="Aviso de privacidad"
    actualizado="1 de agosto de 2026"
    entradilla="Este aviso explica qué datos personales recabamos cuando usas la plataforma del Instituto Centrobioenergética, para qué los usamos y cómo puedes controlarlos."
  >
    <Seccion titulo="Quién es responsable de tus datos">
      <p>
        <strong className="text-neutral-800 dark:text-neutral-100">Instituto Centrobioenergética</strong>,
        con domicilio en Acapulco 36, Piso 8, Ciudad de México, es responsable del tratamiento de
        tus datos personales.
      </p>
      <p>
        Para cualquier asunto relacionado con este aviso puedes escribirnos a{' '}
        <a href={`mailto:${CORREO}`} className="text-primary-600 hover:underline">{CORREO}</a>.
      </p>
    </Seccion>

    <Seccion titulo="Qué datos recabamos">
      <p>Al crear tu cuenta:</p>
      <Lista
        items={[
          'Tu nombre.',
          'Tu correo electrónico.',
          <>Una contraseña, que se guarda <strong className="text-neutral-800 dark:text-neutral-100">cifrada</strong>. Nadie del instituto puede leerla, ni siquiera el administrador.</>,
        ]}
      />
      <p>Por el uso de la plataforma:</p>
      <Lista
        items={[
          'Los cursos a los que tienes acceso.',
          'Qué capítulos has abierto y cuáles has completado, para que puedas continuar donde lo dejaste.',
          'Las fechas de tu registro y de la última actualización de tu cuenta.',
        ]}
      />
    </Seccion>

    <Seccion titulo="Qué NO recabamos">
      <Lista
        items={[
          <><strong className="text-neutral-800 dark:text-neutral-100">Datos de salud.</strong> No te pedimos ni almacenamos información sobre tu estado de salud. Los cuestionarios del sitio —el test hormonal y el test del vínculo con tu animal— se calculan dentro de tu navegador: sus respuestas no se envían a ningún servidor ni quedan guardadas.</>,
          <><strong className="text-neutral-800 dark:text-neutral-100">Datos bancarios.</strong> La plataforma no procesa pagos. Las inscripciones se acuerdan directamente con el instituto por fuera del sitio.</>,
        ]}
      />
    </Seccion>

    <Seccion titulo="Para qué usamos tus datos">
      <Lista
        items={[
          'Crear tu cuenta y permitirte entrar a la plataforma.',
          'Darte acceso a los cursos en los que te inscribiste.',
          'Guardar tu avance dentro de cada curso.',
          'Comunicarnos contigo sobre los cursos en los que participas.',
        ]}
      />
      <p>
        No usamos tus datos para publicidad de terceros ni los vendemos o cedemos con fines
        comerciales.
      </p>
    </Seccion>

    <Seccion titulo="Quién más trata tus datos">
      <p>
        Para operar la plataforma nos apoyamos en proveedores de servicio que tratan los datos
        únicamente por cuenta del instituto y solo para prestar ese servicio:
      </p>
      <Lista
        items={[
          <><strong className="text-neutral-800 dark:text-neutral-100">Vercel Inc.</strong> — alojamiento de la plataforma.</>,
          <><strong className="text-neutral-800 dark:text-neutral-100">Prisma Data / PostgreSQL</strong> — base de datos donde vive tu cuenta y tu avance.</>,
          <><strong className="text-neutral-800 dark:text-neutral-100">Cloudflare, Inc.</strong> — entrega de los videos de los cursos.</>,
        ]}
      />
      <p>
        Estos servicios operan con servidores fuera de México, por lo que tus datos pueden
        almacenarse en el extranjero.
      </p>
    </Seccion>

    <Seccion titulo="Qué se guarda en tu navegador">
      <p>La plataforma guarda tres cosas en el almacenamiento local de tu navegador:</p>
      <Lista
        items={[
          'La credencial de tu sesión, para no pedirte la contraseña en cada página.',
          'Si prefieres el modo claro u oscuro.',
          'Si tienes la barra lateral plegada.',
        ]}
      />
      <Aviso>
        No usamos cookies de rastreo, ni herramientas de analítica, ni píxeles publicitarios. No
        seguimos tu actividad fuera de esta plataforma.
      </Aviso>
    </Seccion>

    <Seccion titulo="Tus derechos sobre tus datos">
      <p>
        En cualquier momento puedes pedirnos <strong className="text-neutral-800 dark:text-neutral-100">acceder</strong> a
        los datos que tenemos de ti, <strong className="text-neutral-800 dark:text-neutral-100">rectificarlos</strong> si
        son incorrectos, <strong className="text-neutral-800 dark:text-neutral-100">cancelarlos</strong> o{' '}
        <strong className="text-neutral-800 dark:text-neutral-100">oponerte</strong> a que los usemos para
        determinado fin. Son los llamados derechos ARCO.
      </p>
      <p>
        Para ejercerlos, escríbenos a{' '}
        <a href={`mailto:${CORREO}`} className="text-primary-600 hover:underline">{CORREO}</a>{' '}
        indicando tu nombre, el correo con el que te registraste y qué deseas hacer. Responderemos
        en un plazo máximo de veinte días hábiles.
      </p>
      <Aviso>
        Ten en cuenta que cancelar tu cuenta elimina también tu avance en los cursos, y esa
        información no se puede recuperar después.
      </Aviso>
    </Seccion>

    <Seccion titulo="Cambios a este aviso">
      <p>
        Si cambiamos qué datos recabamos o para qué los usamos, actualizaremos este aviso en esta
        misma página y modificaremos la fecha que aparece arriba.
      </p>
    </Seccion>
  </LegalPage>
);

export default AvisoPrivacidad;
