"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu } from "./Menu";

// Shows the persistent "Enquire" button on mobile, hidden while the menu is open or on /contact.
// Kept inside the client boundary so the header stays a server component.
export function MenuHost() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Menu onOpenChange={setOpen} />
      {!open && (
        <Link
          href="/contact"
          className="inline-flex min-h-11 items-center rounded-full bg-marigold px-4 text-sm font-medium text-ink sm:hidden"
        >
          Enquire
        </Link>
      )}
    </>
  );
}
