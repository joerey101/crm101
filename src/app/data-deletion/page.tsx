import React from 'react';

export default function DataDeletion() {
    return (
        <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 font-sans">
            <h1 className="text-3xl font-bold mb-8 text-gray-900">Instrucciones de Eliminación de Datos - CRM101</h1>
            <p className="mb-8 text-gray-600">De acuerdo con las normativas de Meta, proporcionamos las instrucciones para solicitar la eliminación de sus datos personales de nuestra plataforma.</p>

            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Pasos para solicitar la eliminación de datos:</h2>
                <ol className="list-decimal ml-6 text-gray-700 space-y-4">
                    <li>
                        Envíe un correo electrónico a nuestro equipo de soporte indicando en el asunto <strong>"Solicitud de Eliminación de Datos de CRM101"</strong>.
                    </li>
                    <li>
                        Incluya en el cuerpo del mensaje su <strong>Nombre Completo</strong> y el <strong>Número de Teléfono</strong> de WhatsApp que desea desvincular.
                    </li>
                    <li>
                        Nuestro equipo procesará la solicitud en un plazo máximo de 72 horas hábiles y le enviará una confirmación una vez que sus datos hayan sido eliminados de nuestra base de datos activa.
                    </li>
                </ol>
            </div>

            <p className="mt-8 text-sm text-gray-500 italic">
                Nota: Esta aplicación es una herramienta de gestión interna. No utilizamos sus datos para fines publicitarios externos ni los compartimos con terceros.
            </p>
        </div>
    );
}
