import React from "react";
import Router from "next/router";
import ProjectCreateForm from "../../../components/ProjectCreateForm";
import { getProjectById, updateProject } from "../../../actions";

class EditProject extends React.Component {
  static async getInitialProps({ query }) {
    const Project = await getProjectById(query.id);

    return { Project };
  }

  handleUpdateProject = (Project) => {
    updateProject(Project).then((updatedProject) => {
      // router.push('/')
      Router.push(`/Projects/${Project.id}`);
    });
  };

  render() {
    const { Project } = this.props;
    return (
      <div className="container">
        <h1>Edit the Project</h1>
        <ProjectCreateForm
          submitButton="Update"
          initialData={Project}
          handleFormSubmit={this.handleUpdateProject}
        />
      </div>
    );
  }
}

export default EditProject;
