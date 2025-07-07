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
import { useSelector, useDispatch } from "react-redux";
import { themes, setCSSVariables, toggleTheme } from "@/store/appSlice";

import "./App.scss";

function App() {
    const theme = useSelector((state) => state.app.theme);
    const dispatch = useDispatch();

    React.useEffect(() => {
        setCSSVariables(themes[theme]);

        window.document.addEventListener("mousemove", (e) => {
            const particle = document.createElement("div");
            particle.classList.add("particle");
            document.body.appendChild(particle);

            // Set the position of the particle
            particle.style.left = `${e.pageX}px`;
            particle.style.top = `${e.pageY}px`;

            // Remove the particle after the animation ends
            particle.addEventListener("animationend", () => {
                particle.remove();
            });
        });
    });

    return (
        <Router basename={import.meta.env.BASE_URL}>
            <div className="App">
                <header className="App-header">
                    <Navbar />
                </header>
                <main className="App-main">
                    <Routes>
                        <Route path="/" exact element={<Home />} />
                        <Route path="/resume" exact element={<Resume />} />
                        <Route path="/blogs" exact element={<Blogs />} />
                        <Route path="/tools/*" element={<Tools />} />
                        <Route path="*" element={<Error />} />
                    </Routes>
                </main>
                <footer className="App-footer">
                    <Footer darkModeToggler={() => dispatch(toggleTheme())} isDark={theme === "dark"} />
                </footer>
            </div>
        </Router>
    );
}

export default App;
