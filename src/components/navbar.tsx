import { useEffect, useState } from "react";
import client from "../contentfulClient";
import type { EntrySkeletonType } from "contentful";

type LinkItem = {
  fields: {
    label: string;
    url: string;
  };
};

type NavbarFields = {
  links: LinkItem[] | null;
};

type AboutSkeleton = EntrySkeletonType<NavbarFields, "navbar">;

export default function Navbar() {
  const [links, setLinks] = useState<{ label: string; url: string }[]>([]);
  const [isOpen, setIsOpen] = useState(false); // toggle mobile menu

  useEffect(() => {
    async function fetchNavbar() {
      try {
        const res = await client.getEntries<AboutSkeleton>({
          content_type: "navbar",
          include: 2,
        });

        const navbar = res.items[0];

        const navLinks = Array.isArray(navbar.fields.links)
          ? (navbar.fields.links as LinkItem[]).map((link) => ({
              label: link.fields.label,
              url: link.fields.url,
            }))
          : [];

        setLinks(navLinks);
      } catch (error) {
        console.error("Failed to fetch navbar from Contentful:", error);
      }
    }

    fetchNavbar();
  }, []);

  return (
    <nav className="w-full py-4 h-20 px-5 md:px-10 flex items-center justify-between z-20 relative">
      {/* Logo or brand */}
      <div className="text-white md:hidden font-bold text-xl">MySite</div>

      {/* Desktop nav */}
      <ul className="hidden md:flex md:gap-10 gap-5 font-semibold text-white">
        {links.map((link, i) => (
          <li key={i}>
            <a href={link.url} className="capitalize">
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      {/* Hamburger toggle (text-based icon) */}
      <div
        className="md:hidden flex justify-end text-white text-3xl cursor-pointer z-30"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "×" : "☰"}
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="absolute top-20 left-0 w-full px-5 py-4 z-20 md:hidden">
          <ul className="flex flex-col gap-4 font-semibold text-white">
            {links.map((link, i) => (
              <li key={i}>
                <a
                  href={link.url}
                  className="capitalize"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
