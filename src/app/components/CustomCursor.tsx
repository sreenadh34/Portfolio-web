"use client";
import React, { useEffect, useRef } from "react";

const CustomCursor: React.FC = () => {
  const cursorDotRef = useRef<HTMLDivElement | null>(null);
  const cursorOutlineRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const cursorDot = cursorDotRef.current;
    const cursorOutline = cursorOutlineRef.current;

    if (cursorDot && cursorOutline) {
      let posX = 0;
      let posY = 0;
      let outlineX = 0;
      let outlineY = 0;

      // Adjust this factor to control the trailing speed
      const trailingFactor = 0.1; // Lower value = faster follow, higher value = slower follow

      const handleMouseMove = (e: MouseEvent) => {
        posX = e.clientX;
        posY = e.clientY;
      };

      const animateCursor = () => {
        outlineX += (posX - outlineX) * trailingFactor; // Smooth follow effect
        outlineY += (posY - outlineY) * trailingFactor;

        if (cursorDot) {
          cursorDot.style.left = `${posX}px`;
          cursorDot.style.top = `${posY}px`;
        }

        if (cursorOutline) {
          cursorOutline.style.left = `${outlineX}px`;
          cursorOutline.style.top = `${outlineY}px`;
        }

        requestAnimationFrame(animateCursor); // Continue the animation loop
      };

      window.addEventListener("mousemove", handleMouseMove);
      requestAnimationFrame(animateCursor);

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
      };
    }
  }, []);

  return (
    <>
      <div data-cursor-dot ref={cursorDotRef} className="cursor-dot"></div>
      <div ref={cursorOutlineRef} className="cursor-outline"></div>
    </>
  );
};

export default CustomCursor;
