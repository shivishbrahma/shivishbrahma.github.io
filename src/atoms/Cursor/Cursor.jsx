import React, { useState, useEffect } from "react";

import "./Cursor.scss";

export function MousePointer({ sizeX = 25, sizeY = 25, ...otherProps }) {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const mousePointerRef = React.useRef(null);

    const mousePointerSizeX = () => (isHovering ? sizeX : sizeX * 1.5);
    const mousePointerSizeY = () => (isHovering ? sizeY : sizeY * 1.5);

    function createParticle({ x, y }) {
        const particle = document.createElement("div");
        particle.classList.add("MousePointer__Particle");
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        particle.addEventListener("animationend", () => particle.remove());
        document.body.appendChild(particle);
        return particle;
    }

    useEffect(() => {
        const moveMouse = (e) => {
            // Create a new particle
            createParticle({ x: e.pageX, y: e.pageY });
            // Set mousePointer position
            setPosition({ x: e.clientX - mousePointerSizeX() / 2, y: e.clientY - mousePointerSizeY() / 2 });

            // Check if hovering over a link or button
            const links = document.querySelectorAll("a, button");
            let isHoveringLink = false;
            links.forEach((link) => {
                const rect = link.getBoundingClientRect();
                if (
                    rect.left <= e.clientX &&
                    rect.right >= e.clientX &&
                    rect.top <= e.clientY &&
                    rect.bottom >= e.clientY
                ) {
                    isHoveringLink = true;
                }
            });
            setIsHovering(isHoveringLink);
        };
        window.addEventListener("mousemove", moveMouse);
        return () => window.removeEventListener("mousemove", moveMouse);
    }, []);

    return (
        <div
            className={`MousePointer ${isHovering ? "active" : ""}`}
            style={{
                transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
                position: "fixed",
                top: 0,
                left: 0,
                pointerEvents: "none",
                zIndex: 9999,
                color: "var(--secondary)"
            }}
            ref={mousePointerRef}
        >
            <svg
                width={mousePointerSizeX()}
                height={mousePointerSizeY()}
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <circle cx="20" cy="20" r="2" fill="currentColor" />

                {isHovering && (
                    <>
                        <path d="M4 12V4H12" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
                        <path d="M28 4H36V12" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
                        <path d="M4 28V36H12" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
                        <path d="M28 36H36V28" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
                    </>
                )}

                <line x1="20" y1="10" x2="20" y2="14" stroke="currentColor" strokeWidth="1" />
                <line x1="20" y1="26" x2="20" y2="30" stroke="currentColor" strokeWidth="1" />
                <line x1="10" y1="20" x2="14" y2="20" stroke="currentColor" strokeWidth="1" />
                <line x1="26" y1="20" x2="30" y2="20" stroke="currentColor" strokeWidth="1" />
            </svg>
        </div>
    );
}
