import React from "react";
import ProjectCreateform from "../../../components/ProjectCreateForm";
import { getProjectById } from "../../../actions/";
class EditProject extends React.Component {
  static getInitialProps({ query }) {
    return { query };
  }
  state = {
    project: {},
  };

  componentDidMount() {
    const { id } = this.props.query;
    getProjectById(id).then((project) => {
      this.setState({ project });
    });
  }
  render() {
    return (
      <div className="container">
        <h1>Edit the current project</h1>
        {JSON.stringify(this.state.project)}
        <ProjectCreateform />
      </div>
    );
  }
}

export default EditProject;
