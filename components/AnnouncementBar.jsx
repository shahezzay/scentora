import { site } from "@/data/site";

export default function AnnouncementBar() {
  const items = Array.from({ length: 8 });
  return (
    <div className="overflow-hidden bg-ink py-2 text-xs text-white">
      <div className="flex w-max animate-marquee whitespace-nowrap">
        {[0, 1].map((half) => (
          <div key={half} className="flex shrink-0">
            {items.map((_, i) => (
              <span key={i} className="px-8">
                {site.announcement}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
