import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { projectsData } from "../data";
import "./ProjectsSection.css";

function ProjectsSection({ showButton = true }) {
  const projects = Object.entries(projectsData).map(([key, project]) => ({
    ...project,
    id: key,
  }));

  // If showButton is true, slice the array; otherwise, show all projects.
  const projectsToShow = showButton ? projects.slice(0, 3) : projects;

  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="projects-section">
      <div className="section-header">
        <h1>Our Projects</h1>
        <p>Explore some of our latest work.</p>
      </div>

      <div className="projects-grid">
        {projectsToShow.map((project) => (
          <Link key={project.id} to={`/projects/${project.id}`} className="project-card">
            <div className="project-image-container">
              <img
                src={isDesktop ? project.desktopImage : project.heroImage}
                alt={project.name}
                className="project-image"
                loading="lazy" // ✅ Defers loading for offscreen images
                width="400" // ✅ Set explicit width
                height="250" // ✅ Set explicit height
              />
            </div>
            <div className="project-info">
              <h2 className="project-title">{project.name}</h2>
              <p className="project-description">{project.description}</p>
            </div>
          </Link>
        ))}
      </div>

      {showButton && (
        <div className="button-container">
          <Link to="/projects" className="project-section-button">
            View All Projects
          </Link>
        </div>
      )}
    </section>
  );
}

export default ProjectsSection;