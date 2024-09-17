import { useRef, useState } from "react";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import SideBar from "./components/SideBar";
import ProjectDetail from "./components/ProjectDetail";

function App() {
  const [projectsState, setprojectsState] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: [],
  });

  function handleAddTask(text) {
    setprojectsState((prev) => {
      const taskId = Math.random();
      const newTask = {
        text: text,
        id: taskId,
        projectId: prev.selectedProjectId,
      };
      return {
        ...prev,
        tasks: [newTask, ...prev.tasks],
      };
    });
  }

  function handleDeleteTask(id) {
    setprojectsState((prev) => {
      return {
        ...prev,
        tasks: prev.tasks.filter((task) => {
          return task.id !== id;
        }),
      };
    });
  }

  function handleStartAddProject() {
    setprojectsState((prev) => {
      return {
        ...prev,
        selectedProjectId: null,
      };
    });
  }

  function handleAddProject(projectData) {
    setprojectsState((prev) => {
      return {
        ...prev,
        projects: [...prev.projects, { ...projectData }],
        selectedProjectId: projectData.id,
      };
    });
  }

  function handleSelectProject(id) {
    setprojectsState((prev) => {
      return {
        ...prev,
        selectedProjectId: id,
      };
    });
  }

  function handleDeleteProject() {
    setprojectsState((prev) => {
      return {
        ...prev,
        selectedProjectId: undefined,
        projects: prev.projects.filter((project) => {
          return project.id !== prev.selectedProjectId;
        }),
      };
    });
  }

  function handleCancel() {
    setprojectsState((prev) => {
      return {
        ...prev,
        selectedProjectId: undefined,
      };
    });
  }

  let content = (
    <ProjectDetail
      projectDetail={projectsState.projects.find((project) => {
        return project.id === projectsState.selectedProjectId;
      })}
      onDelete={handleDeleteProject}
      onAddTask={handleAddTask}
      onDeleteTask={handleDeleteTask}
      tasks={projectsState.tasks.filter((task) => task.projectId === projectsState.selectedProjectId)}
    ></ProjectDetail>
  );

  if (projectsState.selectedProjectId === null) {
    content = <NewProject onSave={handleAddProject} onCancel={handleCancel} />;
  } else if (projectsState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />;
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <SideBar
        onStartAddProject={handleStartAddProject}
        projects={projectsState.projects}
        onSelectProject={handleSelectProject}
        selectedProjectId={projectsState.selectedProjectId}
      />
      {content}
    </main>
  );
}

export default App;
