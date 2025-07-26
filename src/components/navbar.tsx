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
    <nav className="w-full pl-10 py-4 h-20 flex items-center z-20 relative">
      <ul className="flex gap-10 font-semibold text-white">
        {links.map((link, i) => (
          <li key={i}>
            <a href={link.url} className="capitalize">
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
