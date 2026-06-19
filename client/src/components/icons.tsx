import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const defaults = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "none" as const,
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true as const
};

export function IconDashboard(props: IconProps) {
  return (
    <svg {...defaults} {...props}>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </svg>
  );
}

export function IconTasks(props: IconProps) {
  return (
    <svg {...defaults} {...props}>
      <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
      <rect x="9" y="3" width="6" height="4" rx="1" />
      <path d="M9 12h6M9 16h4" />
    </svg>
  );
}

export function IconPlus(props: IconProps) {
  return (
    <svg {...defaults} {...props}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export function IconPencil(props: IconProps) {
  return (
    <svg {...defaults} {...props}>
      <path d="M12 20h9" />
      <path d="M16.5 3.5l2 2L7 17l-4 1 1-4L16.5 3.5z" />
    </svg>
  );
}

export function IconSearch(props: IconProps) {
  return (
    <svg {...defaults} {...props}>
      <circle cx="11" cy="11" r="6" />
      <path d="M20 20l-3-3" />
    </svg>
  );
}

export function IconFilter(props: IconProps) {
  return (
    <svg {...defaults} {...props}>
      <path d="M4 6h16M7 12h10M10 18h4" />
    </svg>
  );
}

export function IconArrowRight(props: IconProps) {
  return (
    <svg {...defaults} {...props}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function IconCheck(props: IconProps) {
  return (
    <svg {...defaults} {...props}>
      <path d="M5 12l4 4L19 7" />
    </svg>
  );
}

export function IconCircleDashed(props: IconProps) {
  return (
    <svg {...defaults} {...props}>
      <path d="M12 3a9 9 0 019 9M12 21a9 9 0 01-9-9M3 12h.01M21 12h.01" strokeDasharray="3 3" />
    </svg>
  );
}

export function IconLoader(props: IconProps) {
  return (
    <svg {...defaults} {...props}>
      <path d="M12 3a9 9 0 109 9" />
    </svg>
  );
}

export function IconCheckCircle(props: IconProps) {
  return (
    <svg {...defaults} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M8 12l2.5 2.5L16 9" />
    </svg>
  );
}

export function IconLayers(props: IconProps) {
  return (
    <svg {...defaults} {...props}>
      <path d="M12 3L3 8l9 5 9-5-9-5zM3 12l9 5 9-5M3 16l9 5 9-5" />
    </svg>
  );
}

export function IconCalendarAlert(props: IconProps) {
  return (
    <svg {...defaults} {...props}>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M16 3v4M8 3v4M3 11h18M12 15v2" />
    </svg>
  );
}

export function IconBolt(props: IconProps) {
  return (
    <svg {...defaults} {...props}>
      <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" />
    </svg>
  );
}

export function IconBarsLow(props: IconProps) {
  return (
    <svg {...defaults} {...props}>
      <path d="M5 18h14M5 12h8" />
    </svg>
  );
}

export function IconBarsMed(props: IconProps) {
  return (
    <svg {...defaults} {...props}>
      <path d="M5 18h14M5 12h14M5 6h10" />
    </svg>
  );
}
