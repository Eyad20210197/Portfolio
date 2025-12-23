"use client";

import * as icons from "simple-icons";

type Props = {
  name?: string | null;
  size?: number;
};

export default function TechnologyIcon({ name, size = 24 }: Props) {
  if (!name) return null;

  const key =
    "si" + name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

  const icon = (icons as any)[key];

  if (!icon) return null;

  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill={`#${icon.hex}`}
    >
      <path d={icon.path} />
    </svg>
  );
}
