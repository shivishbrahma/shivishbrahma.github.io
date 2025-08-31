import React from "react";

import GithubCalendar from "@/atoms/GithubCalendar/GithubCalendar";
import { createCalendarTheme } from "@/atoms/GithubCalendar/util";
import PageSection from "@/atoms/PageSection/PageSection";
import { GITHUB_SECTION_TITLE } from "@/services/constService";

import "./GithubSection.scss";

function GithubSection(props) {
    const calendarTheme = createCalendarTheme("#6f00ff", "#f2e5ff");

    return (
        <PageSection sectionTitle={GITHUB_SECTION_TITLE}>
            <GithubCalendar username="shivishbrahma" theme={calendarTheme} showTooltip />
        </PageSection>
    );
}

GithubSection.propTypes = {};

export default GithubSection;
