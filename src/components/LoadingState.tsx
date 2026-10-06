export default function LoadingState({ label = "Loading workouts…" }: { label?: string }) {
  return (
    <div className="grid min-h-[55vh] place-items-center">
      <div className="text-center">
        <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-2 border-[#2a342d] border-t-[#ccff00]" />
        <p className="text-xs font-black uppercase tracking-[0.16em] text-[#9ca59e]">{label}</p>
      </div>
    </div>
  );
}
