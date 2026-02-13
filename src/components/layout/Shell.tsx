export default function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[color:var(--bg)] min-h-dvh w-full">
      {/* Center + batas lebar biar saat minimize tetap rapi */}
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </div>
  );
}