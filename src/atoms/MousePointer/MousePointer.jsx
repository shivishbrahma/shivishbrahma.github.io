import React, { useState, useEffect } from "react";

import "./MousePointer.scss";
import { animate } from "animejs";
import { getProperty } from "@/services/animateService";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { getBoundedClientVisibleRect } from "@/services/animateService";

export function MousePointer({ sizeX = 32, sizeY = 32, borderWidth = 2, showDefaultCursor = false, ...otherProps }) {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const mousePointerRef = React.useRef(null);
    const mousePtrCornersRef = React.useRef(null);
    const { isMobile } = useBreakpoint();
    const [showPointer, setShowPointer] = useState(false);

    const mousePointerSizeX = () => (isHovering ? sizeX : sizeX * 1.5);
    const mousePointerSizeY = () => (isHovering ? sizeY : sizeY * 1.5);

    // function createParticle({ x, y, size = 8 }) {
    //     const particle = document.createElement("span");
    //     particle.classList.add("MousePointer__Particle");
    //     particle.style.width = `${size}px`;
    //     particle.style.height = `${size}px`;
    //     particle.style.left = `${x}px`;
    //     particle.style.top = `${y}px`;
    //     particle.addEventListener("animationend", () => particle.remove());
    //     document.body.appendChild(particle);
    //     return particle;
    // }

    useEffect(() => {
        if (isMobile || !mousePointerRef.current) return;

        const mousePointer = mousePointerRef.current;
        mousePtrCornersRef.current = mousePointerRef.current.querySelectorAll(".MousePointer__corner");

        const originalCursor = document.body.style.cursor;
        if (!showDefaultCursor) {
            document.body.style.cursor = "none";
        }

        const moveMouse = (e) => {
            setShowPointer(e.pointerType === "mouse");

            // Create a new particle
            // createParticle({ x: e.pageX, y: e.pageY, size: 2});

            // Set mousePointer position
            setPosition({ x: e.clientX - mousePointerSizeX() / 2, y: e.clientY - mousePointerSizeY() / 2 });

            // Check if hovering over a link or button
            const hoverables = Array.from(document.querySelectorAll("a, button"));
            let currentHoverableItem = null;
            hoverables.some((hoverable) => {
                const rect = getBoundedClientVisibleRect(hoverable);
                if (
                    rect.left <= e.clientX &&
                    rect.right >= e.clientX &&
                    rect.top <= e.clientY &&
                    rect.bottom >= e.clientY
                ) {
                    currentHoverableItem = hoverable;
                    return true;
                }
                return false;
            });

            setIsHovering(currentHoverableItem !== null);

            // Updating the cursor corner location
            const corners = Array.from(mousePtrCornersRef.current);
            if (!currentHoverableItem) {
                corners.forEach((corner) => {
                    corner.style.visibility = "hidden";
                });
                return;
            }

            const rect = getBoundedClientVisibleRect(currentHoverableItem);
            let targetCornerPos = [
                { x: rect.left, y: rect.top },
                { x: rect.right, y: rect.top },
                { x: rect.right, y: rect.bottom },
                { x: rect.left, y: rect.bottom }
            ];

            corners.forEach((corner, index) => {
                const newX =
                        targetCornerPos[index].x -
                        getProperty(mousePointer, "x") +
                        getProperty(corner, "width") * (index == 0 || index == 3 ? 1 : -1),
                    newY =
                        targetCornerPos[index].y -
                        getProperty(mousePointer, "y") +
                        getProperty(corner, "height") * (index < 2 ? 1 : -1);
                animate(corner, {
                    left: newX + "px",
                    top: newY + "px",
                    duration: 300,
                    easing: "easeInOutQuad"
                });
                corner.style.visibility = "visible";
            });
        };
        window.addEventListener("pointermove", moveMouse);
        return () => window.removeEventListener("pointermove", moveMouse);
    }, [mousePointerRef]);

    return (
        <div
            className={["MousePointer", isHovering && "active", !showPointer && "hidden"].filter(Boolean).join(" ")}
            style={{
                transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
                position: "fixed",
                top: 0,
                left: 0,
                pointerEvents: "none",
                zIndex: 9999,
                color: "var(--cursor-color)"
            }}
            ref={mousePointerRef}
        >
            <svg width={sizeX} height={sizeY} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle className="inner" cx="20" cy="20" r="3" fill="currentColor" />
                <circle cx="20" cy="20" r="6" fill="none" strokeWidth={borderWidth} stroke="currentColor" />

                <line x1="20" y1="6" x2="20" y2="14" stroke="currentColor" strokeWidth={borderWidth} />
                <line x1="20" y1="26" x2="20" y2="34" stroke="currentColor" strokeWidth={borderWidth} />
                <line x1="6" y1="20" x2="14" y2="20" stroke="currentColor" strokeWidth={borderWidth} />
                <line x1="26" y1="20" x2="34" y2="20" stroke="currentColor" strokeWidth={borderWidth} />
            </svg>

            <div className="MousePointer__corner corner__tl" />
            <div className="MousePointer__corner corner__tr" />
            <div className="MousePointer__corner corner__br" />
            <div className="MousePointer__corner corner__bl" />
        </div>
    );
}
