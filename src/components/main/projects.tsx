/* eslint-disable no-unused-vars */
import { useMemo } from "react";
import { useUser } from "../../context/userCtx";
import { ListerProject } from "../../models/listers";
import Project from "./project";

// import icons needed for the logic

interface ProjectsPropType {
  // eslint-disable-next-line no-unused-vars
  status: "active" | "pending" | "draft" | "rejected";
}

const Projects = ({ status }: ProjectsPropType) => {
  const {
    state: { projects },
  } = useUser();

  const onSelectProject = (project: ListerProject) => {
    console.warn(project);
  };

  const getProject: ListerProject[] = useMemo(() => {
    if (!projects || !projects.length) return [];
    if (status === "active") {
      return projects.filter((project) => project.archived);
    }
    if (status === "pending") {
      return projects.filter(
        (project) => !project.archived && !project.IsDraft
      );
    }
    if (status === "draft") {
      return projects.filter((project) => project.IsDraft);
    }
    return projects.filter((project) => !project.IsDraft && project.archived);
  }, [projects, status]);

  return (
    <div className="flex gap-2 flex-wrap">
      {!!getProject.length &&
        getProject.map((proj) => (
          <Project
            key={proj.projectId}
            project={proj}
            selectProject={onSelectProject}
          />
        ))}

      {!getProject.length && <p className="text-center m-auto mt-10 opacity-80 text-base">No projects available &#x1F61E;</p>}
    </div>
  );
};
export default Projects;
