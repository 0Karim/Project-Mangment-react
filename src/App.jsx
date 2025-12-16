import { useState } from 'react';
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import ProjectSidebar from "./components/ProjectsSidebar";
import ProjectDetails from "./components/ProjectDetails";

function App() {
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: []
  });

  function handleStartAddProject() {
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: null,
      };
    });
  }

  function handleAddProject(newProject) {
    setProjectsState(prevState => {

      const newProjectWithId = {
        ...newProject,
        id: Math.random().toString(36).substring(2, 9),
      };

      return {
        // selectedProjectId: newProjectWithId.id,
        // projects: [...prevState.projects, newProjectWithId],

        ...prevState,
        selectedProjectId : undefined,
        projects: [...prevState.projects, newProjectWithId],
      };
    });
  }

  console.log(projectsState);


  let content;

  if (projectsState.selectedProjectId === null) {
    content = <NewProject onAdd={handleAddProject} />;
  } 
  else if (projectsState.selectedProjectId === undefined) {
    content = (
      <NoProjectSelected onStartAddProject={handleStartAddProject} />
    );
  } 

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectSidebar
        projects={projectsState.projects}
        onStartAddProject={handleStartAddProject}
      />
      {content}
    </main>
  );
}

export default App;
