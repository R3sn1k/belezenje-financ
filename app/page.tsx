"use client";

import Link from "next/link";
import { Shirt, Euro, TrendingUp, Package } from "lucide-react";

export default function Home() {
  return (
    <>
      {/* HERO – isto temno ozadje kot prijava */}
      <section className="relative min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-50"></div>

        {/* Ozadje z ikonami dresov */}
        <div className="absolute inset-0 opacity-10">
          <div className="grid grid-cols-6 gap-8 h-full">
            {[...Array(24)].map((_, i) => (
              <Shirt key={i} className="w-24 h-24 text-white" />
            ))}
          </div>
        </div>

        {/* GUMB ZA ODJAVO */}
        <div className="absolute top-6 right-6 z-50">
          <button
            onClick={() => {
              localStorage.removeItem("isLoggedIn");
              localStorage.removeItem("user");
              window.location.href = "/login";
            }}
            className="bg-white text-blue-900 px-6 py-3 rounded-full font-bold hover:bg-yellow-400 transition-all shadow-lg"
          >
            Odjava
          </button>
        </div>

        <div className="relative z-10 text-center text-white px-6 max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight text-black">
            Dresovi<span className="text-yellow-400">.</span>Manager
          </h1>
          <p className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto font-light text-black">
            Profesionalno upravljanje zaloge in financ za prodajo športnih dresov. 
            Vse na enem mestu – pregledno, hitro in zanesljivo.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/zaloga">
              <button className="bg-white text-blue-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-yellow-400 transition-all transform hover:scale-105 shadow-2xl flex items-center gap-3">
                <Package className="w-6 h-6" />
                Preglej zalogo
              </button>
            </Link>
            <Link href="/finance">
              <button className="bg-yellow-400 text-blue-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-yellow-300 transition-all transform hover:scale-105 shadow-2xl flex items-center gap-3">
                <Euro className="w-6 h-6" />
                Finance in dobiček
              </button>
            </Link>
          </div>
        </div>

        {/* Valoviti prehod */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 220" className="w-full">
            <path fill="#1e293b" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L0,320Z"></path>
          </svg>
        </div>
      </section>

      {/* Funkcije */}
      <section className="py-20 bg-slate-800">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 text-white">
            Zakaj izbrati naš sistem?
          </h2>
          <div className="grid md:grid-cols-3 gap-10">
            <div className="bg-slate-900 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all border border-slate-700">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Package className="w-9 h-9 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Real-time zaloga</h3>
              <p className="text-gray-300">
                Takojšnje posodabljanje količin, opozorila za nizko zalogo in zgodovina sprememb.
              </p>
            </div>

            <div className="bg-slate-900 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all border border-slate-700">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <TrendingUp className="w-9 h-9 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Finančni pregled</h3>
              <p className="text-gray-300">
                Prihodki, stroški, dobiček, grafi prodaje in napovedi za prihodnje mesece.
              </p>
            </div>

            <div className="bg-slate-900 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all border border-slate-700">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Shirt className="w-9 h-9 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Podrobni podatki o dresih</h3>
              <p className="text-gray-300">
                Velikost, igralec, sezona, cena, nabavna cena, fotografije in več.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistika */}
      <section className="py-20 bg-blue-900 text-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-16">Trenutno stanje</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
            <div>
              <p className="text-5xl font-extrabold text-yellow-400">127</p>
              <p className="text-xl mt-2">Dresov na zalogi</p>
            </div>
            <div>
              <p className="text-5xl font-extrabold text-yellow-400">42</p>
              <p className="text-xl mt-2">Prodanih ta mesec</p>
            </div>
            <div>
              <p className="text-5xl font-extrabold text-yellow-400">€8.240</p>
              <p className="text-xl mt-2">Prihodki ta mesec</p>
            </div>
            <div>
              <p className="text-5xl font-extrabold text-yellow-400">68%</p>
              <p className="text-xl mt-2">Dobičkonosnost</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-2xl font-bold mb-4">Dresovi.Manager</p>
          <p className="text-gray-400">
            © 2025 Vse pravice pridržane. Izdelano z ❤ v Ljubljani.
          </p>
        </div>
      </footer>
    </>
  );
}