import { useRouter } from "next/router";
import { getProjectById, deleteProject } from "../../../actions";

const Project = (props) => {
  const router = useRouter();
  const { id } = router.query;
  const { Project } = props;

  const handleDeleteProject = (id) => {
    deleteProject(id).then(() => {
      router.push("/");
    });
  };

  return (
    <div className="container">
      <div className="jumbotron">
        <h1 className="display-4">{Project.name}</h1>
        <p className="lead">{Project.description}</p>
        <hr className="my-4" />
        <p>{Project.genre}</p>
        <button className="btn btn-primary btn-lg mr-1" href="#" role="button">
          Learn more
        </button>
        <button
          onClick={() => handleDeleteProject(id)}
          className="btn btn-danger btn-lg"
          href="#"
          role="button"
        >
          Delete
        </button>
      </div>
      <p className="desc-text">{Project.longDesc}</p>
      <style jsx>
        {`
          .desc-text {
            font-size: 21px;
          }
        `}
      </style>
    </div>
  );
};

Project.getInitialProps = async ({ query }) => {
  const Project = await getProjectById(query.id);

  return { Project };
};

export default Project;
