import LandingHero from '@/components/landing/LandingHero';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-black font-sans selection:bg-purple-500 selection:text-white">

      {/* Basic Nav */}
      <nav className="absolute top-0 w-full z-40 p-6 flex justify-between items-center max-w-7xl mx-auto left-0 right-0">
        <div className="text-xl font-bold tracking-tighter text-gray-900 dark:text-white">
          CRM 101
        </div>
        <div>
          <Link
            href="/login"
            className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
          >
            Iniciar Sesión
          </Link>
        </div>
      </nav>

      <main className="flex flex-col min-h-screen">
        <LandingHero />
        {/* We can add Features, Testimonials, Footer later */}
      </main>

    </div>
  );
}
