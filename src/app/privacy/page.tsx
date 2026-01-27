import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Política de Privacidad - ColumbiaCRM',
    description: 'Política de privacidad de ColumbiaCRM',
};

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-8">
                    Política de Privacidad
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
                            1. Información que Recopilamos
                        </h2>
                        <p>
                            ColumbiaCRM recopila información cuando te registras y utilizas nuestro servicio, incluyendo:
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>
                                <strong>Información de perfil de Facebook:</strong> Cuando te registras usando Facebook Login,
                                recopilamos tu nombre, correo electrónico y foto de perfil pública según los permisos que otorgues.
                            </li>
                            <li>
                                <strong>Información de uso:</strong> Datos sobre cómo utilizas nuestro CRM, incluyendo
                                interacciones con clientes, ventas y actividades registradas.
                            </li>
                            <li>
                                <strong>Información técnica:</strong> Dirección IP, tipo de navegador, sistema operativo
                                y datos de cookies para mejorar tu experiencia.
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
                            2. Cómo Usamos tu Información
                        </h2>
                        <p>Utilizamos la información recopilada para:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Proporcionar y mantener nuestro servicio de CRM</li>
                            <li>Personalizar tu experiencia en la plataforma</li>
                            <li>Comunicarnos contigo sobre actualizaciones y cambios del servicio</li>
                            <li>Mejorar nuestros servicios mediante análisis de uso</li>
                            <li>Proteger la seguridad e integridad de nuestra plataforma</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
                            3. Compartir Información
                        </h2>
                        <p>
                            No vendemos ni compartimos tu información personal con terceros, excepto en los siguientes casos:
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Con tu consentimiento explícito</li>
                            <li>Para cumplir con obligaciones legales</li>
                            <li>Para proteger nuestros derechos, propiedad o seguridad</li>
                            <li>Con proveedores de servicios que nos ayudan a operar la plataforma (bajo acuerdos de confidencialidad)</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
                            4. Integración con Facebook
                        </h2>
                        <p>
                            Cuando utilizas Facebook Login, estás sujeto también a la{' '}
                            <a
                                href="https://www.facebook.com/privacy/explanation"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-800 underline"
                            >
                                Política de Privacidad de Facebook
                            </a>.
                        </p>
                        <p>
                            Solo solicitamos acceso a la información básica de tu perfil (nombre, correo electrónico y foto).
                            Puedes revocar este acceso en cualquier momento desde la configuración de tu cuenta de Facebook.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
                            5. Seguridad de los Datos
                        </h2>
                        <p>
                            Implementamos medidas de seguridad técnicas y organizativas apropiadas para proteger tu información,
                            incluyendo:
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Cifrado de datos en tránsito mediante HTTPS</li>
                            <li>Almacenamiento seguro de contraseñas mediante hashing</li>
                            <li>Acceso restringido a información personal solo a personal autorizado</li>
                            <li>Auditorías de seguridad regulares</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
                            6. Tus Derechos
                        </h2>
                        <p>Tienes derecho a:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Acceder a tu información personal</li>
                            <li>Corregir datos inexactos</li>
                            <li>Solicitar la eliminación de tus datos</li>
                            <li>Exportar tus datos en formato portable</li>
                            <li>Revocar el acceso a tu cuenta de Facebook</li>
                        </ul>
                        <p>
                            Para ejercer estos derechos, visita nuestra{' '}
                            <a
                                href="/data-deletion"
                                className="text-blue-600 hover:text-blue-800 underline"
                            >
                                página de eliminación de datos
                            </a>
                            {' '}o contáctanos en{' '}
                            <a
                                href="mailto:info@columbastore.com"
                                className="text-blue-600 hover:text-blue-800 underline"
                            >
                                info@columbastore.com
                            </a>.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
                            7. Retención de Datos
                        </h2>
                        <p>
                            Conservamos tu información mientras tu cuenta esté activa o según sea necesario para
                            proporcionar nuestros servicios. Puedes solicitar la eliminación de tu cuenta y datos
                            asociados en cualquier momento.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
                            8. Cookies
                        </h2>
                        <p>
                            Utilizamos cookies y tecnologías similares para mantener tu sesión activa, recordar
                            tus preferencias y analizar el uso de nuestro servicio. Puedes controlar las cookies
                            desde la configuración de tu navegador.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
                            9. Cambios a esta Política
                        </h2>
                        <p>
                            Podemos actualizar esta política de privacidad ocasionalmente. Te notificaremos sobre
                            cambios significativos mediante correo electrónico o un aviso destacado en nuestro servicio.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
                            10. Contacto
                        </h2>
                        <p>
                            Si tienes preguntas sobre esta Política de Privacidad, contáctanos:
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
                                    href="https://crm101.vercel.app"
                                    className="text-blue-600 hover:text-blue-800 underline"
                                >
                                    https://crm101.vercel.app
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
