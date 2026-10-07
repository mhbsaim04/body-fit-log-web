import Link from "next/link";

const NotFound = () => {
  return (
    <main className="grid min-h-[70vh] place-items-center px-6 py-16">
      <div className="max-w-lg text-center">
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#ccff00]">404</p>
        <h1 className="display-font mt-3 text-6xl uppercase leading-[0.9] text-white">Route Not Found</h1>
        <p className="mt-5 text-sm leading-7 text-[#8f9891]">The page you are looking for does not exist or the workout ID is invalid.</p>
        <Link href="/" className="mt-7 inline-flex rounded-full bg-[#ccff00] px-6 py-3 text-xs font-black uppercase tracking-[0.12em] text-[#0b0d0c]">Back Home</Link>
      </div>
    </main>
  );
}

export default NotFound;