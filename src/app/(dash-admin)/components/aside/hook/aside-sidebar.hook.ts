"use client"
import { useState, useEffect } from 'react'
import { decodeToken } from '@/app/(dash-admin)/utils';

interface DecodedToken {
  // Define aquí la estructura de tu token decodificado
  [key: string]: any;
}

interface UseAsideSidebarHookResult {
  handleBurgerClick: () => void;
  isNavActive: boolean;
  handleNavItemClick: () => void;
  decoded: DecodedToken | null;
}

export default function useAsideSidebarHook(): UseAsideSidebarHookResult {
  const [isNavActive, setIsNavActive] = useState(false);
  const [decoded, setDecoded] = useState<DecodedToken | null>(null);

  useEffect(() => {
    const token = {}; // Reemplaza esto con tu token real
    const decodedToken = decodeToken(token);
    setDecoded(decodedToken);
  }, []);

  const handleBurgerClick = () => {
    setIsNavActive(!isNavActive);
  };

  const handleNavItemClick = () => {
    setIsNavActive(false);
  };

  return {
    handleBurgerClick,
    isNavActive,
    handleNavItemClick,
    decoded
  };
}
