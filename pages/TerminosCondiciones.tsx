import React from 'react';
import LegalPage, { Seccion, Lista, Aviso } from '../components/LegalPage';

const CORREO = 'contacto@institutocentrobioenergetica.com';

/**
 * Términos y condiciones de uso de la plataforma.
 *
 * El apartado de pagos describe el flujo real —la inscripción se acuerda por
 * fuera del sitio— sin fijar una política de devoluciones, porque esa es una
 * decisión del instituto y no debe inventarse aquí.
 */
const TerminosCondiciones: React.FC = () => (
  <LegalPage
    titulo="Términos y condiciones"
    actualizado="1 de agosto de 2026"
    entradilla="Estas son las reglas de uso de la plataforma del Instituto Centrobioenergética. Al crear una cuenta y acceder a los contenidos, las aceptas."
  >
    <Seccion titulo="Qué es esta plataforma">
      <p>
        El Instituto Centrobioenergética, con domicilio en Acapulco 36, Piso 8, Ciudad de México,
        ofrece a través de este sitio formación en salud complementaria y bienestar integral:
        cursos en vivo, talleres y grabaciones dirigidos a terapeutas, profesionales de la salud y
        público general, según el caso.
      </p>
    </Seccion>

    <Seccion titulo="Tu cuenta">
      <Lista
        items={[
          'La cuenta es personal e intransferible. Está a nombre de una sola persona.',
          'El acceso a cada curso lo habilita el instituto una vez confirmada tu inscripción. Crear una cuenta por sí solo no da acceso a ningún contenido.',
          'Eres responsable de mantener tu contraseña en privado. Si crees que alguien más la conoce, escríbenos y la restablecemos.',
          'Compartir tus credenciales para que otra persona vea el contenido puede llevar a la suspensión de la cuenta.',
        ]}
      />
    </Seccion>

    <Seccion titulo="Acceso a los cursos">
      <Lista
        items={[
          'Los cursos con grabación están disponibles mientras el instituto los mantenga publicados en la plataforma.',
          'Los cursos en vivo se imparten en las fechas anunciadas en su página. Si una fecha cambia, se avisa a las personas inscritas.',
          'El instituto puede actualizar, reorganizar o retirar contenidos para mejorarlos o corregirlos.',
        ]}
      />
    </Seccion>

    <Seccion titulo="Inscripciones y pagos">
      <p>
        La plataforma no procesa pagos. Las inscripciones, el monto y la forma de pago se acuerdan
        directamente con el instituto antes de habilitar el acceso, igual que las condiciones de
        cancelación o devolución que apliquen a cada curso.
      </p>
      <p>
        Si tienes dudas sobre una inscripción, escríbenos a{' '}
        <a href={`mailto:${CORREO}`} className="text-primary-600 hover:underline">{CORREO}</a>.
      </p>
    </Seccion>

    <Seccion titulo="Naturaleza del contenido">
      <Aviso>
        La formación y los materiales del instituto tienen fines educativos y de desarrollo
        profesional. No constituyen diagnóstico, tratamiento ni consejo médico, y no sustituyen la
        atención de un profesional de la salud. Ante cualquier condición de salud, consulta a tu
        médico.
      </Aviso>
      <p>
        Quien aplique en consulta las técnicas enseñadas lo hace bajo su propia responsabilidad,
        conforme a su formación, su criterio profesional y el marco legal que le corresponda. El
        instituto forma; no supervisa ni responde por la práctica clínica de terceros.
      </p>
    </Seccion>

    <Seccion titulo="Propiedad de los contenidos">
      <p>
        Los videos, materiales, fichas, modelos y textos publicados en la plataforma son propiedad
        del Instituto Centrobioenergética o de sus autores, y se te licencian para uso personal
        mientras tengas acceso.
      </p>
      <Lista
        items={[
          'Puedes usarlos para tu formación y para tu propia práctica profesional.',
          'No puedes grabarlos, descargarlos, copiarlos ni redistribuirlos.',
          'No puedes reproducirlos en público, revenderlos ni usarlos para impartir formación propia sin autorización escrita del instituto.',
        ]}
      />
    </Seccion>

    <Seccion titulo="Suspensión del acceso">
      <p>
        El instituto puede suspender o cancelar una cuenta que comparta credenciales, redistribuya
        el contenido o use la plataforma de forma que perjudique a otras personas usuarias o al
        propio instituto.
      </p>
    </Seccion>

    <Seccion titulo="Tus datos personales">
      <p>
        El tratamiento de tus datos se explica en el{' '}
        <a href="/aviso-de-privacidad" className="text-primary-600 hover:underline">aviso de privacidad</a>,
        que forma parte de estos términos.
      </p>
    </Seccion>

    <Seccion titulo="Cambios y ley aplicable">
      <p>
        Estos términos pueden actualizarse. Los cambios se publican en esta página con su fecha, y
        aplican desde su publicación.
      </p>
      <p>
        Se rigen por la legislación de los Estados Unidos Mexicanos. Para cualquier controversia,
        las partes se someten a los tribunales competentes de la Ciudad de México.
      </p>
    </Seccion>
  </LegalPage>
);

export default TerminosCondiciones;
