import { useState } from 'react';
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import ProjectSidebar from "./components/ProjectsSidebar";
import ProjectDetails from "./components/ProjectDetails";

function App() {
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: [],
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


  function handleAddTask(taskText) {
    setProjectsState(prevState => {
        const newTask = {
          id: Math.random().toString(36).substring(2, 9),
          text: taskText,
          projectId: prevState.selectedProjectId,
        };

        return {
          ...prevState,
          tasks: [...prevState.tasks, newTask],
        };
     });    
  }

function handleDeleteTask(taskId) {
    setProjectsState(prevState => {
      return {
        ...prevState,
        tasks: prevState.tasks.filter(task => task.id !== taskId),
      };
    });
  }

  const selectedProject = projectsState.projects.find(project => project.id === projectsState.selectedProjectId);
  const projectTasks = projectsState.tasks.filter(task => task.projectId === projectsState.selectedProjectId);

  let content = <ProjectDetails 
                  project={selectedProject} 
                  onDelete={handleDeleteProject} 
                  onAddTask={handleAddTask} 
                  onDeleteTask={handleDeleteTask}
                  tasks={projectTasks}
                />;

  if (projectsState.selectedProjectId === null) {
    content = <NewProject onAdd={handleAddProject} onCancel={handleCancelProject} />;
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
        onSelectProject={handleSelectProject}
        selectedProjectId={projectsState.selectedProjectId}
      />
      {content}
    </main>
  );
}

export default App;
