import React from "react";

// Molecular Components
import Navbar from "@/molecules/Navbar/Navbar";
import Footer from "@/molecules/Footer/Footer";
import { Routes, Route, HashRouter as Router } from "react-router-dom";
import Home from "@/organisms/Home/Home";
import Resume from "@/organisms/Resume/Resume";
import Error from "@/organisms/Error/Error";
import Tools from "@/organisms/Tools/Tools";
import Blogs from "@/organisms/Blogs/Blogs";
import Loader from "@/atoms/Loader/Loader";
import { MousePointer } from "@/atoms/MousePointer/MousePointer";
import StartPage from "@/molecules/StartPage/StartPage";

import { useSelector, useDispatch } from "react-redux";
import { themes, setCSSVariables, toggleTheme } from "@/store/appSlice";

import "./App.scss";
import { AudioProvider, useAudio } from "./AudioProvider";

function AppContent() {
    const theme = useSelector((state) => state.app.theme);
    const dispatch = useDispatch();
    const [showStartPage, setShowStartPage] = React.useState(true);
    const [loading, setLoading] = React.useState(true);
    const { unlockAudio, playSound } = useAudio();

    React.useEffect(() => {
        setCSSVariables(themes[theme]);
    }, [theme]);

    const handleBoot = () => {
        unlockAudio(); // Unlocks browser audio context
        playSound("boot"); // Immediate feedback
        setShowStartPage(false);
        setTimeout(() => {
            setLoading(false);
            // Play background music once unlocked
        }, 2000);
    };

    const mainElement = () => {
        if (showStartPage) {
            return <StartPage onClose={handleBoot} />;
        }

        if (loading) {
            return <Loader loading />;
        }

        return (
            <>
                <header className="App-header">
                    <Navbar />
                </header>
                <main className="App-main">
                    <Routes>
                        <Route path="/" exact element={<Home />} />
                        <Route path="/resume/*" exact element={<Resume />} />
                        <Route path="/blogs" exact element={<Blogs />} />
                        <Route path="/tools/*" element={<Tools />} />
                        <Route path="*" element={<Error />} />
                    </Routes>
                </main>
                <footer className="App-footer">
                    <Footer darkModeToggler={() => dispatch(toggleTheme())} isDark={theme === "dark"} />
                </footer>
            </>
        );
    };

    return (
        <div className="App">
            {mainElement()}
            <MousePointer />
        </div>
    );
}

function App() {
    return (
        <Router basename={import.meta.env.BASE_URL}>
            <AudioProvider>
                <AppContent />
            </AudioProvider>
        </Router>
    );
}

export default App;
