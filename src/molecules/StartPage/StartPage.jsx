import React from "react";
import Button from "@/atoms/Button/Button";

import "./StartPage.scss";

export default function StartPage({ onClose }) {
    return (
        <main>
            <div className="StartPage">
                <h1 className="StartPage__title">Purbayan Chowdhury</h1>
                <h2 className="StartPage__subtitle">Shivishbrahma</h2>
                <Button theme="primary" onClick={onClose}>Start</Button>
            </div>
        </main>
    );
}
