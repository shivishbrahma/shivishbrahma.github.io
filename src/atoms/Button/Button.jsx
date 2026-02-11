import React from "react";
import PropTypes from "prop-types";

import "./Button.scss";
import { useAudio } from "@/organisms/App/AudioProvider";

function Button({
    className,
    children,
    floating = false,
    floatingLocation = "bottom_right",
    theme = "default",
    type = "button",
    onClick,
    clickSound = "click",
    ...otherProps
}) {
    const buttonThemeClass = " Button__" + (theme ? theme : "primary"),
        floatingLocationClass = " Button__floating__" + (floatingLocation ? floatingLocation : "left");

    const { playSound } = useAudio();
    if (type === "link") {
        return (
            <a
                href="#btn"
                {...otherProps}
                className={
                    className +
                    " Button" +
                    buttonThemeClass +
                    floatingLocationClass +
                    (floating ? " Button__floating" : "")
                }
            >
                {children}
            </a>
        );
    }
    return (
        <button
            type={type}
            {...otherProps}
            className={
                className + " Button" + buttonThemeClass + floatingLocationClass + (floating ? " Button__floating" : "")
            }
            onClick={
                (evt)=>{
                    onClick(evt);
                    playSound(clickSound);
                }
            }
        >
            {children}
        </button>
    );
}

Button.propTypes = {
    type: PropTypes.string,
    floating: PropTypes.bool,
    children: PropTypes.node.isRequired,
    theme: PropTypes.oneOf([
        "default",
        "primary",
        "secondary",
        "success",
        "error",
        "warning",
        "info",
        "tertiary",
        "light",
        "dark"
    ]),
    floatingLocation: PropTypes.string
};

export default Button;
