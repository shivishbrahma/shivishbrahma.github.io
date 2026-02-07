import { useEffect, useRef } from "react";


export const useAudio = (src, { volume = 1, loop = false } = {}) => {
    const audio = useRef(new Audio(src));

    useEffect(() => {
        audio.current.volume = volume;
        audio.current.loop = loop;
    }, [volume, loop]);

    return {
        play: () => audio.current.play(),
        pause: () => audio.current.pause(),
        toggle: () => (audio.current.paused ? audio.current.play() : audio.current.pause()),
        setVolume: (volume) => (audio.current.volume = volume),
        setLoop: (loop) => (audio.current.loop = loop),
        isPlaying: () => !audio.current.paused,
        isPaused: () => audio.current.paused,
    };
};
