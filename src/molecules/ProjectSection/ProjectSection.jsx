import React from "react";

import PageSection from "@/atoms/PageSection/PageSection";
import Card from "@/atoms/Card/Card";
import Button from "@/atoms/Button/Button";
import Loader from "@/atoms/Loader/Loader";
import { loadMockup } from "@/services/fetchService";
import { useSelector, useDispatch } from "react-redux";
import { setProjects } from "@/store/appSlice";

import "./ProjectSection.scss";
import { PROJECTS_SECTION_TITLE } from "@/services/constService";

function ProjectSection({ ...otherProps }) {
    const projects = useSelector((state) => state.app.projects);
    const dispatch = useDispatch();
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        setLoading(true);
        loadMockup("projects")
            .then(function (data) {
                dispatch(setProjects(data.projects));
                setLoading(false);
            })
            .catch(function (error) {
                console.error(error);
            });
    }, []);

    const featuredProjects = projects.filter((project) => project.featured || false);

    if (loading || !projects) return <Loader loading />;

    return (
        <PageSection sectionTitle={PROJECTS_SECTION_TITLE} {...otherProps}>
            <div className="Card-list">
                {featuredProjects
                    ? featuredProjects.map((project) => {
                          return (
                              <Card
                                  key={project.name}
                                  cardImg={<img src={project.cover} alt={project.name + " Cover"} />}
                                  cardHoverContent={
                                      <>
                                          <div className="Project__hover__header">
                                              <h4 className="Project__title">{project.displayName}</h4>
                                              {project.languages && project.languages.length > 0 && (
                                                  <div className="Project__languages">
                                                      {project.languages.map((language) => {
                                                          return (
                                                              <span
                                                                  className={
                                                                      "Project__languages__tag " +
                                                                      (language === project.primaryLanguage
                                                                          ? "Project__languages__tag__primary"
                                                                          : "")
                                                                  }
                                                                  key={language}
                                                              >
                                                                  {language}
                                                              </span>
                                                          );
                                                      })}
                                                  </div>
                                              )}
                                          </div>
                                          <div className="Project_hover__content">
                                              &nbsp;
                                              <p className="Project__description">{project.description}</p>
                                          </div>
                                          <div className="Project__hover__footer">
                                              <div className="Project__buttons">
                                                  {project.githubUrl && (
                                                      <Button type="link" href={project.githubUrl} target="_blank">
                                                          View Code
                                                      </Button>
                                                  )}
                                                  {project.website && (
                                                      <Button type="link" href={project.website} target="_blank">
                                                          View Website
                                                      </Button>
                                                  )}
                                              </div>
                                          </div>
                                      </>
                                  }
                              >
                                  <h4 className="Project__display_name">{project.displayName}</h4>
                                  <p className="Project__summary">{project.summary}</p>
                              </Card>
                          );
                      })
                    : "There are currently no projects to show"}
            </div>
        </PageSection>
    );
}

export default ProjectSection;
