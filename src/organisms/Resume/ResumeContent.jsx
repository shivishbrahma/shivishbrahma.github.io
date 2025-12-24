import React from "react";

import Loader from "@/atoms/Loader/Loader";
import { loadMockup } from "@/services/fetchService";

import "./Resume.scss";
import DeddyResume from "./DeddyResume";

const ResumeContent = React.forwardRef((props, ref) => {
    const [resume, setResume] = React.useState({});
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        setLoading(true);
        loadMockup("resume").then(function (data) {
            setResume(data);
            setLoading(false);
        });
    }, []);

    if (loading || !resume) return <Loader loading />;

    return (
        <React.Fragment>
            {!loading ? (
                <div className="Resume-content" data-theme={props.theme} ref={ref}>
                    <DeddyResume resume={resume} />
                </div>
            ) : (
                "Loading the resume..."
            )}
        </React.Fragment>
    );
});

export default ResumeContent;
