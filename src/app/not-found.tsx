import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4 bg-void relative z-10">
      <h1 className="text-6xl sm:text-8xl font-black text-toxic tracking-tighter drop-shadow-[0_0_30px_rgba(57,255,20,0.2)] mb-4">
        404
      </h1>
      <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-widest text-white mb-6">
        LOST IN THE VAULT
      </h2>
      <p className="text-zinc-400 max-w-md text-sm sm:text-base mb-8 uppercase tracking-wider leading-relaxed">
        The link you followed has been dragged into the dark corners of the grid. It does not exist or has been deleted.
      </p>
      <Link 
        href="/" 
        className="border border-toxic text-toxic font-bold tracking-widest uppercase text-xs sm:text-sm px-6 py-3 hover:bg-toxic hover:text-void transition-all duration-300 shadow-[0_0_15px_rgba(57,255,20,0.1)] hover:shadow-[0_0_25px_rgba(57,255,20,0.3)]"
      >
        Return To Main Hub
      </Link>
    </div>
  );
}