import Image from "next/image";
import Link from "next/link";

const featuresSection = [
  {
    name: "twitter",
    icon: "https://img.icons8.com/?size=100&id=YfCbGWCWcuar&format=png&color=000000",
    className: "",
    href: "#",
  },
  {
    name: "youtube",
    icon: "https://img.icons8.com/?size=100&id=37326&format=png&color=000000",
    className: "",
    href: "#",
  },
  //   { name: "instagram", icon: "", className: "", href: "#" },
  //   { name: "linkedin", icon: "", className: "", href: "#" },
  //   { name: "facebook", icon: "", className: "", href: "#" },
];

export default function FeaturesSection() {
  return (
    <section className="relative w-full ">
      <div className="mt-16">
        {/* Features */}
        <div className="flex items-center justify-center flex-col">
          {/* heading */}
          <h1 className="text-2xl font-sans text-neutral-300 ">
            Everywhere. Everything. Effortlessly.
          </h1>

          <div className="flex items-center justify-center gap-6 mt-4 ">
            {featuresSection.map((item, index) => (
              <div key={index}>
                <Link href={item.href}>
                  <div className="w-full bg-gradient-to-br from-white from-0% via-50% via-white/40 to-90% to-neutral-950  p-2 rounded-md ">
                    <Image
                      src={item.icon}
                      alt={item.name}
                      width={24}
                      height={24}
                      className="object-contain "
                    />
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
