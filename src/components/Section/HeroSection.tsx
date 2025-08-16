export default function HeroSection() {
  return (
    <section className="relative w-full">
      <div className="mt-16">
        {/* Heading Section */}
        <div className=" flex flex-col items-center justify-center space-y-4">
          <h1 className="text-9xl bg-clip-text bg-gradient-to-br from-white from-28% to-neutral-900 to-90% text-transparent font-sans">
            Boookiess
          </h1>
          <p className="text-4xl text-neutral-200 font-serif">
            Bring Your Bookmarks to Your Knowledge Corner
          </p>
          <p className="text-xl w-[900px] text-center text-neutral-300/90 tracking-wide">
            Save, organize, and instantly access your favorite bookmarks—turn
            scattered links into a personal, searchable knowledge hub.
          </p>
        </div>
      </div>
    </section>
  );
}
