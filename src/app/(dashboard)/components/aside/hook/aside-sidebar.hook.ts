"use client"
import { useState } from 'react'

interface UseAsideSidebarHookResult {
  sidebarActive: boolean;
  toggleSidebar: () => void;
  setSidebarActive:any;
}

export default function useAsideSidebarHook(): UseAsideSidebarHookResult {
  const [sidebarActive, setSidebarActive] = useState(false);

  const toggleSidebar = () => {
    setSidebarActive(!sidebarActive);
  };

  return {
    sidebarActive,
    toggleSidebar,
    setSidebarActive
    };
}
