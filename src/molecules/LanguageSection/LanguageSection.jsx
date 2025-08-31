import React from "react";
// import Globe3D from "@/atoms/Globe3D/Globe3D";
import PageSection from "@/atoms/PageSection/PageSection";
import PropTypes from "prop-types";
import { TagCloud } from "@frank-mayer/react-tag-cloud";
import { useSelector, useDispatch } from "react-redux";
import Loader from "@/atoms/Loader/Loader";

import "./LanguageSection.scss";
import { setProgLang } from "@/store/appSlice";
import { LANGUAGES_SECTION_TITLE } from "@/services/constService";

function CloudList({ items, ...otherProps }) {
    const dispatch = useDispatch();

    const progLang = useSelector((state) => state.app.progLang);

    if (!items.length) {
        return <Loader loading />;
    }

    return (
        <TagCloud
            options={(w) => ({
                radius: Math.min(500, w.innerWidth, w.innerHeight) / 2,
                maxSpeed: "normal",
                itemClass: "TagCloud__item",
                containerClass: "TagCloud__container"
            })}
            onClick={(tag, evt) => dispatch(setProgLang(tag))}
            onClickOptions={{ passive: true }}
        >
            {items.map((item) => item.text)}
        </TagCloud>
    );
}

function LanguageSection({ ...otherProps }) {
    const projects = useSelector((state) => state.app.projects);
    const languages = projects.reduce((acc, project) => {
        return [...acc, ...project.languages.filter((lang) => !acc.includes(lang))];
    }, []);
    const elems = languages.map((lang) => {
        return { text: lang, weight: 1 };
    });

    return (
        <PageSection sectionTitle={LANGUAGES_SECTION_TITLE} {...otherProps}>
            <CloudList items={elems} />

            {/* <Globe3D tags={elems} radius={150} /> */}
        </PageSection>
    );
}

LanguageSection.propTypes = {};

CloudList.propTypes = {
    items: PropTypes.array.isRequired
};

export default LanguageSection;
