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
import { MousePointer } from "@/atoms/Cursor/Cursor";

import { useSelector, useDispatch } from "react-redux";
import { themes, setCSSVariables, toggleTheme } from "@/store/appSlice";

import "./App.scss";
import { AudioProvider } from "./AudioProvider";

function App() {
    const theme = useSelector((state) => state.app.theme);
    const dispatch = useDispatch();
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        setCSSVariables(themes[theme]);
    }, [theme]);

    React.useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2000);

        return () => {};
    }, []);

    return (
        <Router basename={import.meta.env.BASE_URL}>
            <AudioProvider>
                <div className="App">
                    {!loading && (
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
                    )}
                    {loading && <Loader loading />}
                    <MousePointer />
                </div>
            </AudioProvider>
        </Router>
    );
}

export default App;
