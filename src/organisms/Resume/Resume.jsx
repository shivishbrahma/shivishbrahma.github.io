import React from "react";
import { useReactToPrint } from "react-to-print";
import { FaPrint } from "react-icons/fa";

import Button from "@/atoms/Button/Button";
import ResumeContent from "./ResumeContent";

function Resume(props) {
    const printableComponentRef = React.useRef(null);
    const resumeThemes = ["deddy", "jake"];
    const [currentResumeTheme, setCurrentResumeTheme] = React.useState("deddy");
    
    const handlePrint = useReactToPrint({
        content: () => printableComponentRef.current
    });

    const getThemeFromHash = () => {
        const themeFromHash = window.location.hash.split('/')[2] || 'deddy';
        // Ensure the theme from the URL is a valid one.
        return resumeThemes.includes(themeFromHash) ? themeFromHash : 'deddy';
    };

    const handleThemeChange = (theme) => {
        setCurrentResumeTheme(theme);
        window.location.hash = `#/resume/${theme}`;
    };

    React.useEffect(() => {
        setCurrentResumeTheme(getThemeFromHash());
    }, []);


    React.useEffect(() => {
        const handleHashChange = () => {
            setCurrentResumeTheme(getThemeFromHash());
        };

        window.addEventListener("hashchange", handleHashChange);

        return () => {
            window.removeEventListener("hashchange", handleHashChange);
        };
    }, [resumeThemes]);


    return (
        <section className="Resume" {...props}>
            <div className="Resume-container">
                <ResumeContent theme={currentResumeTheme} ref={printableComponentRef} />
            </div>

            <div className="Resume-floating-container">
                <select className="Select" value={currentResumeTheme} onChange={(e) => handleThemeChange(e.target.value)}>
                    {resumeThemes.map((theme) => (
                        <option key={theme} value={theme}>
                            {theme.at(0).toUpperCase() + theme.slice(1)} Resume
                        </option>
                    ))}
                </select>
                <Button theme="primary" onClick={handlePrint}>
                    <FaPrint /> Print Resume
                </Button>
            </div>
        </section>
    );
}

Resume.propTypes = {};

export default Resume;
