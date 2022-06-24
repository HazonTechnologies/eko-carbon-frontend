/* eslint-disable no-unused-vars */
import { useEffect, useMemo, useState } from "react";
import useSWR from "swr";
import { useUser } from "../../context/userCtx";
import { ProjectsUrl } from "../../lib/common/endpoints";
import { ListerProject } from "../../models/listers";
import Project from "./project";

// import icons needed for the logic

interface ProjectsPropType {
  // eslint-disable-next-line no-unused-vars
  status: "active" | "pending" | "draft" | "rejected";
}

const Projects = ({ status }: ProjectsPropType) => {
  const { data } = useSWR(ProjectsUrl);

  const [projects, setProjects] = useState<ListerProject[]>([]);

  useEffect(() => {
    if (data && data.data) {
      setProjects(data.data);
    }
  }, [data]);
  const onSelectProject = (project: ListerProject) => {
    console.warn(project);
  };

  const getProject: ListerProject[] = useMemo(() => {
    if (status === "active") {
      return projects.filter((project) => project.approved);
    }
    if (status === "pending") {
      return projects.filter(
        (project) => !project.archived && !project.drafted && !project.approved
      );
    }
    if (status === "draft") {
      return projects.filter((project) => project.drafted);
    }
    return projects.filter((project) => project.archived);
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

      {!getProject.length && (
        <p className="text-center m-auto mt-10 opacity-80 text-base">
          No projects available &#x1F61E;
        </p>
      )}
    </div>
  );
};
export default Projects;
