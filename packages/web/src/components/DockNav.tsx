'use client';

import Dock from '@/components/Dock';
import { NAV_ITEMS } from '@/config/navigation';
import { useRouter } from 'next/navigation';

// Icons
import {
  VscHome,
  VscProject,
  VscBook,
  VscAccount,
  VscTools,
  VscMail,
} from 'react-icons/vsc';

const ICON_MAP: Record<string, JSX.Element> = {
  Home: <VscHome size={18} />,
  Projects: <VscProject size={18} />,
  Blog: <VscBook size={18} />,
  About: <VscAccount size={18} />,
  "How it's Built": <VscTools size={18} />,
  Contact: <VscMail size={18} />,
};

export default function DockNav() {
  const router = useRouter();

  const dockItems = NAV_ITEMS.map(item => ({
    icon: ICON_MAP[item.label],
    label: item.label,
    onClick: () => router.push(item.href),
  }));

  return (
    <Dock
      items={dockItems}
      panelHeight={68}
      baseItemSize={50}
      magnification={70}
    />
  );
}
