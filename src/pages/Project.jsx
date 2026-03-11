import React from "react";
import ProjectCard from "../components/ProjectCard";

function Project(){

    const projects = [
        { id: 1, title: 'TaskMate AI', key: 'TMAI', manager: 'John Doe', status: 'Active', description: 'Advanced task management with AI suggestions.' },
        { id: 2, title: 'E-commerce Redesign', key: 'ECOM', manager: 'Jane Smith', status: 'Pending', description: 'Complete overhaul of the mobile shopping experience.' },
        { id: 3, title: 'PMS System', key: 'PMSS', manager: 'Mike Johnson', status: 'Active', description: 'Internal property management system for residents.' },
        { id: 4, title: 'Marketing Website', key: 'MKTW', manager: 'Sarah Williams', status: 'Active', description: 'Corporate landing page and blog integration.' },
    ];

    return (
        <div className="project-dashboard">
           <div>
            <h1>Projects</h1>
           </div>
           <div>
              {projects.map(project => (
                <ProjectCard key={project.id} project={project}/>
              ))}
           </div>
        </div>
    )
}

export default Project;