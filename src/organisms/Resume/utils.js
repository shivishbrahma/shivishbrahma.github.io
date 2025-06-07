import { marked } from "marked";
import React from "react";

export function parseHighlights (highlights, keywords) {
    if (Array.isArray(highlights)) {
        return highlights.map((ele) => {
            return parseHighlights(ele, keywords);
        });
    } else if (typeof highlights === "string") {
        return highlights.replace(
            new RegExp(`(${keywords.join("|")})`, "gi"),
            "_**$1**_"
        );
    }
    return highlights;
 }

export function formatHighlights (highlights) {
    if (Array.isArray(highlights)) {
        return React.createElement(
            "ul",
            null,
            highlights.map((ele, ind) => {
                if (Array.isArray(ele)) {
                    return React.createElement(
                        "ul",
                        { key: ind },
                        ele.map((e) =>
                            React.createElement("li", {
                                key: e,
                                dangerouslySetInnerHTML: { __html: marked.parseInline(e) }
                            })
                        )
                    );
                }
                return React.createElement("li", {
                    key: ele,
                    dangerouslySetInnerHTML: { __html: marked.parseInline(ele) }
                });
            })
        );
    } else if (typeof highlights === "string") {
        return React.createElement(React.Fragment, {
            dangerouslySetInnerHTML: { __html: highlights }
        });
    }
}
