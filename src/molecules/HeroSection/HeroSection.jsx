import React from "react";

import Typewriter from "@/atoms/Typewriter/Typewriter";
import Animate from "@/atoms/Animate/Animate";
import { HERO_SECTION_TEXT } from "@/services/constService";

import "./HeroSection.scss";

function HeroSection({ ...otherProps }) {
    return (
        <div className="HeroSection" {...otherProps}>
            <div className="HeroSection__image"></div>
            <div className="HeroSection__content">
                <div className="HeroSection__title">
                    Hi! <Animate type="wobble">✋</Animate> <h5>I am,</h5>{" "}
                    <Animate element={"h2"} type="pulse" iteration={5}>
                        Purbayan Chowdhury
                    </Animate>
                </div>
                <Typewriter
                    text={HERO_SECTION_TEXT}
                    displayTextRenderer={(text) => <h4>{text}</h4>}
                    cursorRenderer={(cursor) => <h4>|</h4>}
                />
            </div>
        </div>
    );
}

export default HeroSection;
