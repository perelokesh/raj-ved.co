"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

// Footer navigation in two short columns to keep the footer low. The current page is olive (AA on ivory);
// hovering a link underlines it in olive.
export function FooterLinks() {
  const pathname = usePathname();
  return (
    <nav aria-label="Footer">
      <ul className="grid w-fit grid-cols-2 gap-x-10 text-base lg:gap-x-6">
        {links.map((l) => {
          const active = pathname === l.href;
          return (
            <li key={l.href}>
              <Link
                href={l.href}
                aria-current={active ? "page" : undefined}
                className={`inline-flex min-h-11 items-center underline-offset-4 transition-colors duration-400 hover:text-olive hover:underline ${
                  active ? "font-medium text-olive" : ""
                }`}
              >
                {l.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
