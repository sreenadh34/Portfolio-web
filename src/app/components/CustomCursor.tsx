"use client"
import React from "react";
import { useEffect } from "react";

const CustomCursor = () => {
  useEffect(() => {
    const cursorDot = document.querySelector("[data-cursor-dot]") as HTMLElement;
    const cursorOutline = document.querySelector(".cursor-outline");

    if (cursorDot && cursorOutline) {
      const handleMouseMove = (e: MouseEvent) => {
        const posX = e.clientX;
        const posY = e.clientY;

        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        cursorOutline.animate({
          left: `${posX}px`,
          top:`${posY}px`
        }, { duration: 500, fill: "forwards"});
      };

      window.addEventListener("mousemove", handleMouseMove);

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
      };
    }
  }, []);
     
  return (
    <>
    <div data-cursor-dot className="cursor-dot"></div>
    <div className="cursor-outline"></div>
    </>
  )
};

export default CustomCursor;