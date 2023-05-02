"use client";
import Link from "next/link";
import { Settings, User, Grid, Calendar } from "react-feather";
import { usePathname } from "next/navigation";
import { FC } from "react";
import clsx from "clsx";

const icons = { Settings, User, Grid, Calendar };

export interface SidebarkLinkProps {
  label: string;
  icon: keyof typeof icons;
  link: string;
}

interface SidebarLink {
  link: SidebarkLinkProps;
}

const SidebarLink: FC<SidebarLink> = ({ link }) => {
  const pathname = usePathname();
  let isActive = false;

  if (pathname === link.link) {
    isActive = true;
  }

  const Icon = icons[link.icon];

  return (
    <Link
      href={{ pathname: link.link }}
      className="w-full flex justify-center items-center"
    >
      <Icon
        size={40}
        className={clsx(
          "stroke-gray-400 hover:stroke-violet-600 transition duration-200 ease-in-out",
          isActive && "stroke-violet-600"
        )}
      />
    </Link>
  );
};

export default SidebarLink;
