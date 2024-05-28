"use client"

import  { useState } from 'react'

export default function AsideSidebarHook() {
    const [isNavActive, setIsNavActive] = useState(false);

    const handleBurgerClick = () => {
      setIsNavActive(!isNavActive);
    };
  
    const handleNavItemClick = () => {
      setIsNavActive(false);
    };
  
    return {
        handleBurgerClick, isNavActive,
        handleNavItemClick
    }
}