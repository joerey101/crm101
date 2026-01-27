import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Términos de Servicio - ColumbiaCRM',
  description: 'Términos y condiciones de uso de ColumbiaCRM',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Términos de Servicio
        </h1>
        
        <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
          <p className="text-sm text-gray-500">
            Última actualización: {new Date().toLocaleDateString('es-ES', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              1. Aceptación de los Términos
            </h2>
            <p>
              Al acceder y utilizar ColumbiaCRM ("el Servicio"), aceptas estar sujeto a estos 
              Términos de Servicio y todas las leyes y regulaciones aplicables. Si no estás de 
              acuerdo con alguno de estos términos, no debes usar el Servicio.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              2. Descripción del Servicio
            </h2>
            <p>
              ColumbiaCRM es una plataforma de gestión de relaciones con clientes (CRM) que permite 
              a los usuarios:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Gestionar información de clientes</li>
              <li>Registrar y hacer seguimiento de ventas</li>
              <li>Organizar tareas y actividades comerciales</li>
              <li>Integrar con servicios de terceros como Facebook</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              3. Registro y Cuenta
            </h2>
            <p>
              Para utilizar el Servicio, debes:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Ser mayor de 18 años o tener el consentimiento de un padre o tutor</li>
              <li>Proporcionar información precisa y completa durante el registro</li>
              <li>Mantener la seguridad de tu cuenta y contraseña</li>
              <li>Notificarnos inmediatamente sobre cualquier uso no autorizado de tu cuenta</li>
            </ul>
            <p>
              Eres responsable de todas las actividades que ocurran bajo tu cuenta.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              4. Integración con Facebook
            </h2>
            <p>
              Al utilizar Facebook Login, aceptas:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Los{' '}
                <a 
                  href="https://www.facebook.com/legal/terms" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  Términos de Servicio de Facebook
                </a>
              </li>
              <li>
                La{' '}
                <a 
                  href="https://www.facebook.com/privacy/explanation" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  Política de Privacidad de Facebook
                </a>
              </li>
              <li>Otorgar a ColumbiaCRM los permisos solicitados para acceder a tu información de perfil</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              5. Uso Aceptable
            </h2>
            <p>
              Te comprometes a NO utilizar el Servicio para:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Violar leyes o regulaciones locales, estatales, nacionales o internacionales</li>
              <li>Transmitir contenido ilegal, amenazante, abusivo, difamatorio u obsceno</li>
              <li>Hacerse pasar por otra persona o entidad</li>
              <li>Interferir o interrumpir el Servicio o los servidores conectados al Servicio</li>
              <li>Intentar obtener acceso no autorizado a cualquier parte del Servicio</li>
              <li>Usar el Servicio para enviar spam o contenido no solicitado</li>
              <li>Recopilar información de otros usuarios sin su consentimiento</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              6. Propiedad Intelectual
            </h2>
            <p>
              El Servicio y todo su contenido, características y funcionalidades (incluyendo pero no 
              limitado a información, software, texto, displays, imágenes, video y audio, y el diseño, 
              selección y disposición de los mismos) son propiedad de ColumbiaCRM y están protegidos 
              por derechos de autor, marcas registradas y otras leyes de propiedad intelectual.
            </p>
            <p>
              Los datos que ingresas en el Servicio (información de clientes, ventas, etc.) siguen 
              siendo de tu propiedad, pero nos otorgas una licencia para procesarlos y almacenarlos 
              con el fin de proporcionar el Servicio.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              7. Privacidad
            </h2>
            <p>
              Tu uso del Servicio también está regido por nuestra{' '}
              <a 
                href="/privacy" 
                className="text-blue-600 hover:text-blue-800 underline"
              >
                Política de Privacidad
              </a>, 
              que se incorpora a estos Términos por referencia.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              8. Terminación
            </h2>
            <p>
              Podemos terminar o suspender tu cuenta inmediatamente, sin previo aviso o responsabilidad, 
              por cualquier razón, incluyendo sin limitación si incumples los Términos.
            </p>
            <p>
              Puedes terminar tu cuenta en cualquier momento siguiendo las instrucciones en nuestra{' '}
              <a 
                href="/data-deletion" 
                className="text-blue-600 hover:text-blue-800 underline"
              >
                página de eliminación de datos
              </a>.
            </p>
            <p>
              Tras la terminación, tu derecho a usar el Servicio cesará inmediatamente.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              9. Limitación de Responsabilidad
            </h2>
            <p>
              El Servicio se proporciona "tal cual" y "según disponibilidad". No garantizamos que:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>El Servicio cumplirá tus requisitos</li>
              <li>El Servicio será ininterrumpido, oportuno, seguro o libre de errores</li>
              <li>Los resultados obtenidos del uso del Servicio serán precisos o confiables</li>
            </ul>
            <p>
              En ningún caso ColumbiaCRM será responsable de daños indirectos, incidentales, especiales, 
              consecuentes o punitivos, incluyendo sin limitación, pérdida de beneficios, datos, uso u 
              otras pérdidas intangibles.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              10. Indemnización
            </h2>
            <p>
              Aceptas indemnizar, defender y eximir de responsabilidad a ColumbiaCRM y sus afiliados, 
              directores, empleados y agentes de cualquier reclamo, daño, obligación, pérdida, 
              responsabilidad, costo o deuda, y gastos que surjan de:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Tu uso del Servicio</li>
              <li>Tu violación de estos Términos</li>
              <li>Tu violación de derechos de terceros</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              11. Modificaciones al Servicio
            </h2>
            <p>
              Nos reservamos el derecho de modificar o discontinuar, temporal o permanentemente, 
              el Servicio (o cualquier parte del mismo) con o sin previo aviso.
            </p>
            <p>
              No seremos responsables ante ti o terceros por cualquier modificación, suspensión 
              o discontinuación del Servicio.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              12. Cambios a los Términos
            </h2>
            <p>
              Podemos revisar estos Términos de vez en cuando. La versión más actual regirá nuestro 
              procesamiento de tu información personal y siempre estará disponible en esta página.
            </p>
            <p>
              Si realizamos cambios que consideremos significativos, te notificaremos mediante correo 
              electrónico o mediante un aviso destacado en el Servicio.
            </p>
            <p>
              Al continuar accediendo o utilizando el Servicio después de que esas revisiones entren 
              en vigencia, aceptas estar sujeto a los términos revisados.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              13. Ley Aplicable
            </h2>
            <p>
              Estos Términos se regirán e interpretarán de acuerdo con las leyes aplicables, 
              sin tener en cuenta sus disposiciones sobre conflictos de leyes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              14. Contacto
            </h2>
            <p>
              Si tienes preguntas sobre estos Términos de Servicio, contáctanos:
            </p>
            <ul className="list-none space-y-2">
              <li>
                <strong>Email:</strong>{' '}
                <a 
                  href="mailto:info@columbastore.com"
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  info@columbastore.com
                </a>
              </li>
              <li>
                <strong>Sitio web:</strong>{' '}
                <a 
                  href="https://crm101-joerey101.vercel.app"
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  https://crm101-joerey101.vercel.app
                </a>
              </li>
            </ul>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 text-center">
            © {new Date().getFullYear()} ColumbiaCRM. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </div>
  );
}
