"use client";

import { createContext, useContext } from "react";

interface SidebarContextType {
  paddingLeft: number;
  isCollapsed: boolean;
  isDesktop: boolean;
}

export const SidebarContext = createContext<SidebarContextType>({
  paddingLeft: 0,
  isCollapsed: false,
  isDesktop: false,
});

export const useSidebarContext = () => useContext(SidebarContext);
