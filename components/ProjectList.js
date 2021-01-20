import React from "react";
import Link from "next/link";

class ProjectList extends React.Component {
  shorten = (text, maxLength) => {
    if (text && text.length > maxLength) {
      return text.substr(0, maxLength) + "...";
    }

    return text;
  };

  renderProjects(Projects) {
    return Projects.map((Project) => (
      <div key={Project.id} className="col-lg-4 col-md-6 mb-4">
        <div className="card h-100">
          <Link href="/Projects/[id]" as={`/Projects/${Project.id}`}>
            <a>
              <img className="card-img-top" src={Project.image} alt="" />
            </a>
          </Link>
          <div className="card-body">
            <h4 className="card-title">
              <Link href="/Projects/[id]" as={`/Projects/${Project.id}`}>
                <a>{Project.name}</a>
              </Link>
            </h4>
            <div>{Project.genre}</div>
            <p className="card-text">
              {this.shorten(Project.description, 100)}
            </p>
          </div>
          <div className="card-footer">
            <small className="text-muted">{Project.rating}</small>
          </div>
        </div>
      </div>
    ));
  }

  render() {
    const { Projects } = this.props;

    return <React.Fragment>{this.renderProjects(Projects)}</React.Fragment>;
  }
}

export default ProjectList;
