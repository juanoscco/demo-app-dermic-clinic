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
      // const navItems = document.querySelectorAll(".display-block");

      // const navIntoItems = document.querySelectorAll(".display-into-block")
      
      // navIntoItems.forEach((into) => {
      //   into.addEventListener("click", handleNavItemClick);
      // })

      // navItems.forEach((item) => {
      //   item.addEventListener("click", handleNavItemClick);
      // });
  
      // return () => {
      //   navItems.forEach((item) => {
      //     item.removeEventListener("click", handleNavItemClick);
      //   });
      //   navIntoItems.forEach((into) => {
      //     into.removeEventListener("click", handleNavItemClick);
      //   })
      // };
      const handleClick = (event: Event) => {
        handleNavItemClick();
      };
  
      const navItems = document.querySelectorAll(".display-block");
      const navIntoItems = document.querySelectorAll(".display-into-block");
  
      navItems.forEach((item) => {
        item.addEventListener("click", handleClick);
      });
  
      navIntoItems.forEach((item) => {
        item.addEventListener("click", handleClick);
      });
  
      return () => {
        navItems.forEach((item) => {
          item.removeEventListener("click", handleClick);
        });
        navIntoItems.forEach((item) => {
          item.removeEventListener("click", handleClick);
        });
      };

    }, []);

    return {
        handleBurgerClick, isNavActive,
        handleNavItemClick
    }
}