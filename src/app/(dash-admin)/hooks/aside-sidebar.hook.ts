"use client"

import  { useState, useEffect} from 'react'

export default function AsideSidebarHook() {
    const [isNavActive, setIsNavActive] = useState(false);

    const handleBurgerClick = () => {
      setIsNavActive(!isNavActive);
    };
  
    const handleNavItemClick = () => {
      setIsNavActive(false);
    };
  
    useEffect(() => {
      const navItems = document.querySelectorAll(".aside-content ul li a");
  
      navItems.forEach((item) => {
        item.addEventListener("click", handleNavItemClick);
      });
  
      return () => {
        navItems.forEach((item) => {
          item.removeEventListener("click", handleNavItemClick);
        });
      };
    }, []);

    return {
        handleBurgerClick, isNavActive,
        handleNavItemClick
    }
}