import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-blue-600">Upravljanje Zaloge in Financ Dresov</h1>
        <p className="text-lg text-gray-700 mt-4">
          Dobrodošli v aplikaciji za sledenje zalogi dresov in finančnim podatkom o prodaji.
          Tukaj lahko upravljate inventar, spremljate prodajo in izračunavate dobičke.
        </p>
      </header>

      <main className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-2xl font-semibold mb-4">Zaloga Dresov</h2>
          <p className="text-gray-600 mb-6">
            Preglejte in upravljajte zalogo dresov: dodajte nove, odstranite prodane ali preverite količine.
          </p>
          <Link href="/zaloga">
            <button className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition-colors">
              Pojdi na Zalogo
            </button>
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-2xl font-semibold mb-4">Finance Prodaje</h2>
          <p className="text-gray-600 mb-6">
            Spremljajte prihodke, stroške in dobičke od prodaje dresov. Generirajte poročila in analize.
          </p>
          <Link href="/finance">
            <button className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600 transition-colors">
              Pojdi na Finance
            </button>
          </Link>
        </div>
      </main>

      <footer className="mt-12 text-gray-500">
        <p>© 2025 Tvoj Projekt. Vse pravice pridržane.</p>
      </footer>
    </div>
  );
}