import React from "react";
// import PropTypes from 'prop-types';

import { loadMockup } from "../../services/fetchService";
import "./Resume.scss";

const ResumeContent = React.forwardRef((props, ref) => {
    const dateFormatter = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short"
    });
    const [resume, setResume] = React.useState({});
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        loadMockup("resume").then(function (data) {
            setResume(data);
            setLoading(false);
        });
    }, []);

    return (
        <React.Fragment>
            {!loading ? (
                <div className="Resume-content" ref={ref}>
                    <header>
                        <h1 className="Resume-title">
                            {resume.basics.name.split(" ").map((e, i) => {
                                return (
                                    <span className={"shade-" + ((i % 2) + 1)} key={i}>
                                        {e}
                                    </span>
                                );
                            })}
                        </h1>
                        <div className="Resume-title-content">
                            <div>
                                <span>
                                    <a href={resume.basics.website}>{resume.basics.website}</a>
                                </span>
                            </div>
                            <div>
                                <span>
                                    <a href={"tel:" + resume.basics.phone}>{resume.basics.phone}</a>
                                </span>
                                <span>
                                    <a href={"mailto:" + resume.basics.email}>{resume.basics.email}</a>
                                </span>
                            </div>
                        </div>
                    </header>
                    <main>
                        <aside>
                            {/* My Education */}
                            {resume.education ? (
                                <section className="Resume-section">
                                    <h2 className="Resume-section-title">Education</h2>
                                    <ul className="Resume-section-list">
                                        {resume.education.map((item, index) => (
                                            <li key={index}>
                                                <h3 className="Resume-section-subtitle">
                                                    <a href={item.url ? item.url : "#"}>{item.institution}</a>
                                                </h3>
                                                {item.studyType || item.area ? (
                                                    <>
                                                        <h4 className="Resume-section-description">
                                                            {item.studyType} in {item.area}
                                                        </h4>
                                                    </>
                                                ) : (
                                                    <></>
                                                )}
                                                <p className="Resume-section-content"></p>
                                            </li>
                                        ))}
                                    </ul>
                                </section>
                            ) : (
                                <></>
                            )}
                            {/* My Links */}
                            {resume.basics.profiles ? (
                                <section className="Resume-section links">
                                    <h2 className="Resume-section-title">Links</h2>
                                    <ul className="Resume-section-list">
                                        {resume.basics.profiles.map((item, index) => (
                                            <li key={index}>
                                                <h3 className="Resume-section-subtitle">{item.network}</h3>
                                                <p className="Resume-section-description">
                                                    <a href={item.url} className={item.network.toLowerCase()}>
                                                        {item.username}
                                                    </a>
                                                </p>
                                            </li>
                                        ))}
                                    </ul>
                                </section>
                            ) : (
                                <></>
                            )}
                            {/* My Skills  */}
                            {resume.skills ? (
                                <section className="Resume-section skills">
                                    <h2 className="Resume-section-title">Skills</h2>
                                    <ul className="Resume-section-list">
                                        {[5, 4, 3, 2, 1].map((i, index) => (
                                            <React.Fragment key={index}>
                                                {resume.skills.filter((item) => item.rating === i).length === 0 ? (
                                                    ""
                                                ) : (
                                                    <li className={"Resume-section-rating-" + i} key={index}>
                                                        <h3 className="Resume-section-subtitle">
                                                            {resume.skills.filter((item) => item.rating === i)[0].level}
                                                        </h3>
                                                        {resume.skills
                                                            .filter((item) => item.rating === i)
                                                            .map((item, index) => (
                                                                <span className="Resume-section-skill" key={index}>
                                                                    {item.name}
                                                                </span>
                                                            ))}
                                                    </li>
                                                )}
                                            </React.Fragment>
                                        ))}
                                    </ul>
                                </section>
                            ) : (
                                <></>
                            )}
                        </aside>
                        <article>
                            {/* My Experience */}
                            {resume.work ? (
                                <section className="Resume-section experience">
                                    <h2 className="Resume-section-title">Experience</h2>
                                    <ul className="Resume-section-list">
                                        {resume.work.map((item, index) => (
                                            <li key={index}>
                                                <h3 className="Resume-section-subtitle">
                                                    <a href={item.url ? item.url : "#"}>{item.company}</a>
                                                </h3>
                                                <h4 className="Resume-section-description">{item.position}</h4>
                                                <div className="Resume-section-location">
                                                    <span>
                                                        {dateFormatter.format(new Date(item.startDate))} -{" "}
                                                        {item.isCurrentRole
                                                            ? "PRESENT"
                                                            : dateFormatter.format(new Date(item.endDate))}
                                                    </span>{" "}
                                                    | {item.location}
                                                </div>
                                                <p className="Resume-section-content">{item.summary}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </section>
                            ) : (
                                <></>
                            )}
                            {/* My Projects */}
                            {resume.projects ? (
                                <section className="Resume-section projects">
                                    <h2 className="Resume-section-title">Projects</h2>
                                    <ul className="Resume-section-list">
                                        {resume.projects.map((item, index) => (
                                            <li key={index}>
                                                <h3 className="Resume-section-subtitle">{item.name}</h3>
                                                <h4 className="Resume-section-description">{item.summary}</h4>
                                                <div className="Resume-section-location">
                                                    {item.startDate && item.endDate ? (
                                                        <>
                                                            <span>
                                                                {dateFormatter.format(new Date(item.startDate))} -{" "}
                                                                {dateFormatter.format(new Date(item.endDate))}
                                                            </span>{" "}
                                                            |
                                                        </>
                                                    ) : (
                                                        " "
                                                    )}
                                                    {item.primaryLanguage}
                                                </div>
                                                <p className="Resume-section-content">
                                                    <a href={item.repositoryUrl ? item.repositoryUrl : "#"}>
                                                        {item.repositoryUrl}
                                                    </a>
                                                </p>
                                            </li>
                                        ))}
                                    </ul>
                                </section>
                            ) : (
                                <></>
                            )}
                            {/* My Awards */}
                            {resume.awards ? <></> : <></>}
                            {/* My Publications */}
                            {resume.publications ? <></> : <></>}
                        </article>
                    </main>
                </div>
            ) : (
                "Loading the resume..."
            )}
        </React.Fragment>
    );
});

ResumeContent.propTypes = {};

export default ResumeContent;
