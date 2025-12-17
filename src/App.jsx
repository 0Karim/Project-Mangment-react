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

  function handleCancelProject(){
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId : undefined,
        projects: [...prevState.projects],
      };
    });    
  }

  function handleSelectProject(projectId){
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId : projectId,
        projects: [...prevState.projects],
      };
    });    
  }

  function handleDeleteProject(){
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId : undefined,
        projects: prevState.projects.filter(
          (project) => project.id !== prevState.selectedProjectId
        ),
      };
    });    
  }

  const selectedProject = projectsState.projects.find(project => project.id === projectsState.selectedProjectId);

  let content = <ProjectDetails project={selectedProject} onDelete={handleDeleteProject} />;

  if (projectsState.selectedProjectId === null) {
    content = <NewProject onAdd={handleAddProject} onCancel={handleCancelProject} />;
  } 
  else if (projectsState.selectedProjectId === undefined) {
    content = (
      <NoProjectSelected onStartAddProject={handleStartAddProject} />
    );
  } 
  // else{
  //   <ProjectDetails 
  //     project={projectsState.projects.find(
  //       (project) => project.id === projectsState.selectedProjectId
  //     )} 
  //   />;
  // }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectSidebar
        projects={projectsState.projects}
        onStartAddProject={handleStartAddProject}
        onSelectProject={handleSelectProject}
        selectedProjectId={projectsState.selectedProjectId}
      />
      {content}
    </main>
  );
}

export default App;
