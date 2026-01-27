import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Eliminación de Datos - ColumbiaCRM',
  description: 'Instrucciones para solicitar la eliminación de tus datos en ColumbiaCRM',
};

export default function DataDeletionPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Eliminación de Datos de Usuario
        </h1>
        
        <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
            <p className="text-blue-800 font-medium">
              Esta página explica cómo solicitar la eliminación de tus datos de ColumbiaCRM, 
              incluyendo datos asociados con tu cuenta de Facebook.
            </p>
          </div>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              Datos que Recopilamos
            </h2>
            <p>Cuando utilizas ColumbiaCRM con Facebook Login, almacenamos:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Nombre de usuario de Facebook</li>
              <li>Dirección de correo electrónico</li>
              <li>URL de foto de perfil</li>
              <li>ID de usuario de Facebook</li>
              <li>Datos de actividad en el CRM (clientes, ventas, notas)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              Cómo Solicitar la Eliminación de tus Datos
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  Opción 1: Desde tu Cuenta de Facebook
                </h3>
                <ol className="list-decimal pl-6 space-y-2">
                  <li>Ve a <strong>Configuración y Privacidad</strong> en Facebook</li>
                  <li>Selecciona <strong>Configuración</strong></li>
                  <li>Haz clic en <strong>Aplicaciones y sitios web</strong></li>
                  <li>Busca <strong>ColumbiaCRM</strong> en la lista</li>
                  <li>Haz clic en <strong>Eliminar</strong></li>
                  <li>Marca la casilla <strong>"Eliminar las publicaciones, fotos y otros datos que ColumbiaCRM tiene sobre tu actividad"</strong></li>
                  <li>Confirma la eliminación</li>
                </ol>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  Opción 2: Contactarnos Directamente
                </h3>
                <p>Envía un correo electrónico a:</p>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 my-4">
                  <p className="font-mono text-lg">
                    <a 
                      href="mailto:info@columbastore.com?subject=Solicitud de Eliminación de Datos"
                      className="text-blue-600 hover:text-blue-800 underline"
                    >
                      info@columbastore.com
                    </a>
                  </p>
                </div>
                <p>
                  <strong>Asunto:</strong> Solicitud de Eliminación de Datos
                </p>
                <p className="mt-2">
                  <strong>Incluye en tu correo:</strong>
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Tu nombre completo</li>
                  <li>Correo electrónico asociado a tu cuenta</li>
                  <li>Confirmación de que deseas eliminar todos tus datos</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  Opción 3: Desde tu Panel de Control (próximamente)
                </h3>
                <p>
                  Estamos trabajando en una función de auto-eliminación directamente desde tu panel de usuario. 
                  Mientras tanto, utiliza las opciones anteriores.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              ¿Qué Datos se Eliminarán?
            </h2>
            <p>
              Cuando solicites la eliminación de tus datos, eliminaremos permanentemente:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Tu perfil de usuario y credenciales de acceso</li>
              <li>Toda la información personal asociada (nombre, email, foto)</li>
              <li>Datos de clientes, ventas y actividades registradas en el CRM</li>
              <li>Registros de actividad y logs asociados a tu cuenta</li>
              <li>Cualquier preferencia o configuración personalizada</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              Tiempo de Procesamiento
            </h2>
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
              <p className="text-yellow-800">
                <strong>Procesaremos tu solicitud dentro de 30 días.</strong>
              </p>
              <p className="text-yellow-700 mt-2">
                Te enviaremos un correo de confirmación una vez que se complete la eliminación.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              Datos que Pueden Retenerse
            </h2>
            <p>
              Por motivos legales o de seguridad, podemos retener cierta información limitada durante un período adicional:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Registros de transacciones requeridos por ley (hasta 5 años)</li>
              <li>Datos necesarios para resolver disputas o hacer cumplir nuestros términos</li>
              <li>Información agregada o anónima que no te identifica personalmente</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              Revocar Acceso a Facebook
            </h2>
            <p>
              Además de eliminar tus datos de ColumbiaCRM, te recomendamos revocar el acceso de la aplicación 
              desde tu configuración de Facebook:
            </p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>Ve a Facebook → Configuración → Aplicaciones y sitios web</li>
              <li>Encuentra ColumbiaCRM</li>
              <li>Haz clic en "Eliminar"</li>
            </ol>
            <p className="mt-4">
              Esto impedirá que ColumbiaCRM acceda a cualquier información futura de tu cuenta de Facebook.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              Preguntas Frecuentes
            </h2>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900">
                  ¿Puedo recuperar mis datos después de eliminarlos?
                </h4>
                <p className="text-gray-700">
                  No. La eliminación de datos es permanente e irreversible. Asegúrate de descargar 
                  cualquier información importante antes de solicitar la eliminación.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900">
                  ¿Qué sucede si vuelvo a iniciar sesión después de eliminar mi cuenta?
                </h4>
                <p className="text-gray-700">
                  Se creará una nueva cuenta desde cero. No tendrás acceso a ningún dato anterior.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900">
                  ¿Se eliminarán también mis datos de Facebook?
                </h4>
                <p className="text-gray-700">
                  No. Solo eliminamos los datos almacenados en ColumbiaCRM. Tu perfil de Facebook 
                  permanece intacto. Para eliminar datos de Facebook, debes hacerlo directamente 
                  desde tu configuración de Facebook.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              Contacto
            </h2>
            <p>
              Si tienes preguntas sobre la eliminación de datos, contáctanos:
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
