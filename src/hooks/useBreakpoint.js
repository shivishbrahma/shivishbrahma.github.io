import { useState, useEffect } from "react";

export const useBreakpoint = () => {
    const [breakpoint, setBreakpoint] = useState('desktop');

    const handleResize = () => {
        const isSmallScreen = window.innerWidth <= 768;
        const hasTouchScreen = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        const userAgent = navigator.userAgent || navigator.vendor || window.opera;
        const mobileRegex = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i;
        const isMobileUserAgent = mobileRegex.test(userAgent.toLowerCase());
        if ((hasTouchScreen && isSmallScreen) || isMobileUserAgent) {
            setBreakpoint('mobile');
        } else if (window.innerWidth < 1280) {
            setBreakpoint('tablet');
        } else {
            setBreakpoint('desktop');
        }
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return { breakpoint, isMobile: breakpoint === 'mobile', isTablet: breakpoint === 'tablet', isDesktop: breakpoint === 'desktop' };
};