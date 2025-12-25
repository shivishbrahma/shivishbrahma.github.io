import React from "react";
import { useReactToPrint } from "react-to-print";
import { FaPrint } from "react-icons/fa";

import Button from "@/atoms/Button/Button";
import ResumeContent from "./ResumeContent";

function Resume(props) {
    const printableComponentRef = React.useRef(null);
    const [currentResumeTheme, setCurrentResumeTheme] = React.useState("deddy");
    const handlePrint = useReactToPrint({
        content: () => printableComponentRef.current
    });

    const handleThemeChange = (theme) => {
        setCurrentResumeTheme(theme);
        window.location.hash = `#/resume/${theme}`;
    };

    React.useEffect(() => {
        const theme = window.location.hash.replace("#/resume", "").replace("/", "") || "deddy";
        handleThemeChange(theme);
    }, []);

    const resumeThemes = ["deddy", "jake"];

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
