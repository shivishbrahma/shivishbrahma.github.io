import React from "react";
import { marked } from "marked";
import { formatHighlights, parseHighlights } from "./utils";

import "./ResumeJake.scss";

const ResumeJake = ({ resume }) => {
    const dateFormatter = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short"
    });

    return (
        <>
            <header>
                <h1 className="Resume-title">{resume.basics.name}</h1>
                <div className="Resume-title-content">
                    <div>
                        <span>
                            <a href={resume.basics.website}>{resume.basics.website}</a>
                        </span>
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
                <article>
                    {/* My Summary */}
                    {resume.basics.summary ? (
                        <section className="Resume-section summary">
                            <h2 className="Resume-section-title">Summary</h2>
                            <div className="Resume-section-content">
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: marked(resume.basics.summary)
                                    }}
                                />
                            </div>
                        </section>
                    ) : (
                        <></>
                    )}
                    {/* My Education */}
                    {resume.education ? (
                        <section className="Resume-section">
                            <h2 className="Resume-section-title">Education</h2>
                            <ul className="Resume-subheading-list">
                                {resume.education.map((item, index) => (
                                    <li className="Resume-subheading" key={index}>
                                        <div className="Resume-subheading-item">
                                            <strong>
                                                <a href={item.url ? item.url : "#"}>{item.institution}</a>
                                            </strong>
                                            <span>{item.location}</span>
                                        </div>
                                        <div className="Resume-subheading-item">
                                            <small>
                                                <em>
                                                    {item.studyType} in {item.area}
                                                </em>
                                                {item.score ? (
                                                    <>
                                                        |
                                                        <em>
                                                            {item.score < 10
                                                                ? "GPA: " + item.score + "/10"
                                                                : "Percent: " + item.score + "%"}
                                                        </em>
                                                    </>
                                                ) : (
                                                    <></>
                                                )}
                                            </small>
                                            <small>
                                                <em>
                                                    {dateFormatter.format(new Date(item.startDate))} -{" "}
                                                    {item.isCurrentRole
                                                        ? "PRESENT"
                                                        : dateFormatter.format(new Date(item.endDate))}
                                                </em>
                                            </small>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    ) : (
                        <></>
                    )}

                    {/* My Experience */}
                    {resume.work ? (
                        <section className="Resume-section experience">
                            <h2 className="Resume-section-title">Experience</h2>
                            <ul className="Resume-subheading-list">
                                {resume.work.map((item) => (
                                    <li className="Resume-subheading" key={item.company}>
                                        <div className="Resume-subheading-item">
                                            <strong>
                                                <a href={item.url ? item.url : "#"}>{item.company}</a>
                                            </strong>
                                            <span>{item.location}</span>
                                        </div>
                                        <div className="Resume-subheading-item">
                                            <small>
                                                <em>{item.position}</em>
                                            </small>
                                            <small>
                                                <em>
                                                    {dateFormatter.format(new Date(item.startDate))} -{" "}
                                                    {item.isCurrentRole
                                                        ? "PRESENT"
                                                        : dateFormatter.format(new Date(item.endDate))}
                                                </em>
                                            </small>
                                        </div>
                                        <div className="Resume-subheading-item">
                                            {item.highlights ? (
                                                <>{formatHighlights(parseHighlights(item.highlights, item.keywords))}</>
                                            ) : (
                                                <>{item.summary}</>
                                            )}
                                        </div>
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
                            <ul className="Resume-subheading-list">
                                {resume.projects.map((item) => (
                                    <li className="Resume-subheading" key={item.name}>
                                        <div className="Resume-subheading-item">
                                            <span>
                                                <strong>
                                                    <a href={item.repositoryUrl ? item.repositoryUrl : "#"}>
                                                        {item.name}
                                                    </a>
                                                </strong>{" "}
                                                {" | "}
                                                <em>{item.languages.join(", ")}</em>
                                            </span>
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
                                        </div>
                                        <div className="Resume-subheading-item">
                                            {item.highlights ? (
                                                <>{formatHighlights(parseHighlights(item.highlights, item.keywords))}</>
                                            ) : (
                                                <>{item.summary}</>
                                            )}
                                        </div>
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
                            <h2 className="Resume-section-title">Technical Skills</h2>
                            <ul className="Resume-subheading-list">
                                {resume.skills.map((item) => (
                                    <li className="Resume-subheading nopadding" key={item.name}>
                                        <strong>{item.name}</strong> {" : "}
                                        {item.keywords.join(", ")}
                                    </li>
                                ))}
                            </ul>
                        </section>
                    ) : (
                        <></>
                    )}

                    {/* My Certificates */}
                    {resume.certificates ? (
                        <section className="Resume-section certificates">
                            <h2 className="Resume-section-title">Certificates</h2>
                            <ul className="Resume-subheading-list">
                                {resume.certificates.map((certificate) => (
                                    <li className="Resume-subheading" key={certificate.id}>
                                        <div className="Resume-subheading-item">
                                            <strong>
                                                <a href={certificate.url ?? "#"}>{certificate.name}</a>
                                            </strong>
                                            <em>
                                                {dateFormatter.format(
                                                    new Date(
                                                        certificate.fullDate.year,
                                                        certificate.fullDate.month - 1,
                                                        certificate.fullDate.day
                                                    )
                                                )}{" "}
                                                |{" "}
                                                {certificate.expiryDate
                                                    ? dateFormatter.format(
                                                          new Date(
                                                              certificate.expiryDate.year,
                                                              certificate.expiryDate.month - 1,
                                                              certificate.expiryDate.day
                                                          )
                                                      )
                                                    : "Never expires"}
                                            </em>
                                        </div>
                                        <div className="Resume-subheading-item">
                                            <em>
                                                {certificate.issuer} | Credential ID: {certificate.id}
                                            </em>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    ) : (
                        <></>
                    )}
                </article>
            </main>
        </>
    );
};

export default ResumeJake;
