import { site } from "@/src/content/site";

// Shown on every page while NEXT_PUBLIC_PROTOTYPE_BADGE=true. Remove before launch.
export function PrototypeBadge() {
  if (!site.prototypeBadge) return null;
  return (
    <div
      role="note"
      className="fixed bottom-3 left-3 z-50 rounded-full bg-ink/85 px-3 py-1 text-xs tracking-wide text-ivory-soft"
    >
      Prototype · placeholder media
    </div>
  );
}
