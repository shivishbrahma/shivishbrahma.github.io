import React, { createContext, useState, useEffect, useRef, useContext } from "react";

const SOUND_ASSETS = {
    click: "/audio/click.aac",
    boot: "/audio/intro.aac",
    ambient: "/audio/ambient.aac"
};

const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
    const [isMuted, setIsMuted] = useState(false);
    const [isUnlocked, setIsUnlocked] = useState(false);
    const soundsRef = useRef({});

    // Initialize sounds once
    useEffect(() => {
        Object.entries(SOUND_ASSETS).forEach(([name, src]) => {
            const audio = new Audio(src);
            if (name === "ambient") audio.loop = true;
            soundsRef.current[name] = audio;
        });
    }, []);

    // Global play function with Autoplay handling
    const playSound = (name, volume = 0.5) => {
        if (isMuted || !soundsRef.current[name]) return;

        const sound = soundsRef.current[name];
        sound.volume = volume;

        // Reset playhead for short bleeps
        if (name !== "ambient") sound.currentTime = 0;

        const playPromise = sound.play();
        if (playPromise !== undefined) {
            playPromise.catch(() => {
                console.warn(`Audio "${name}" blocked. User interaction required.`);
            });
        }
    };

    const stopSound = (name) => {
        if (soundsRef.current[name]) {
            soundsRef.current[name].pause();
            soundsRef.current[name].currentTime = 0;
        }
    };

    // "Unlock" system for the browser policy
    const unlockAudio = () => {
        if (isUnlocked) return;
        // Play background music once unlocked
        // playSound("ambient", 0.25);
        setIsUnlocked(true);
    };

    return (
        <AudioContext.Provider value={{ playSound, stopSound, isMuted, setIsMuted, unlockAudio }}>
            {children}
        </AudioContext.Provider>
    );
};

export const useAudio = () => useContext(AudioContext);
