'use client';

import { useState } from 'react';
import LeadCaptureModal from './LeadCaptureModal';

export default function LandingHero() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedInterest, setSelectedInterest] = useState('CRM Solution');

    const handleOpenModal = (interest: string) => {
        setSelectedInterest(interest);
        setIsModalOpen(true);
    };

    return (
        <section className="relative overflow-hidden bg-white dark:bg-black py-20 lg:py-32">
            {/* Background Gradient */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none opacity-40 dark:opacity-20">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
                <div className="absolute top-0 right-1/4 w-96 h-96 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-1/3 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
            </div>

            <div className="container mx-auto px-4 text-center relative z-10">
                <div className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wider text-indigo-600 bg-indigo-50 rounded-full dark:bg-indigo-900/30 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-800">
                    NUEVO CRM 101 v1.1
                </div>

                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">
                    Gestiona tus clientes <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
                        sin perder el control.
                    </span>
                </h1>

                <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-10 leading-relaxed">
                    La plataforma todo-en-uno para equipos de ventas modernos.
                    Centraliza WhatsApp, Email y Pipeline en un solo lugar.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button
                        onClick={() => handleOpenModal('Demo Gratuita')}
                        className="w-full sm:w-auto px-8 py-4 text-lg font-semibold text-white bg-gray-900 dark:bg-white dark:text-gray-900 rounded-full hover:bg-gray-800 dark:hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    >
                        Solicitar Demo
                    </button>
                    <button
                        onClick={() => handleOpenModal('Consulta General')}
                        className="w-full sm:w-auto px-8 py-4 text-lg font-semibold text-gray-900 dark:text-white bg-transparent border-2 border-gray-200 dark:border-zinc-800 rounded-full hover:border-gray-900 dark:hover:border-white transition-all"
                    >
                        Más Información
                    </button>
                </div>

                {/* Trust Badges */}
                <div className="mt-16 pt-8 border-t border-gray-100 dark:border-zinc-800">
                    <p className="text-sm font-medium text-gray-500 mb-4">CONFIADO POR EQUIPOS EN LATAM</p>
                    <div className="flex justify-center gap-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                        {/* Placeholders for logos */}
                        <div className="h-8 w-24 bg-gray-300 rounded"></div>
                        <div className="h-8 w-24 bg-gray-300 rounded"></div>
                        <div className="h-8 w-24 bg-gray-300 rounded"></div>
                    </div>
                </div>
            </div>

            {/* Modal */}
            <LeadCaptureModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                interest={selectedInterest}
            />
        </section>
    );
}
