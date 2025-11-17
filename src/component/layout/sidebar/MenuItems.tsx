"use client";

import {
  IconClipboardList,
  IconFileText,
  IconLayoutDashboard,
  IconUsers,
  IconUsersPlus,
} from "@tabler/icons-react";
import React from "react";

import { uniqueId } from "lodash";
import { useTranslations } from "next-intl";

// Icon mapping from string to component
const iconMap: Record<string, React.ElementType> = {
  IconLayoutDashboard,
  IconUsersPlus,
  IconUsers,
  IconFileText,
  IconClipboardList,
};

export interface MenuItem {
  navlabel?: boolean;
  subheader?: string;
  id?: string;
  title?: string;
  icon?: React.ElementType;
  href?: string;
}

const useMenuItems = (): MenuItem[] => {
  const t = useTranslations("component.layout.sidebar");
  const menuData = t.raw("menu") as any[] | undefined;

  if (!menuData || !Array.isArray(menuData)) {
    return [];
  }

  return menuData.map(item => {
    if (item.navlabel) {
      return {
        navlabel: true,
        subheader: item.subheader,
      };
    }

    const Icon =
      item.icon && iconMap[item.icon]
        ? iconMap[item.icon]
        : IconLayoutDashboard;

    return {
      id: item.id || uniqueId(),
      title: item.title,
      icon: Icon,
      href: item.href,
    };
  });
};

export default useMenuItems;
