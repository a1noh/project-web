const next = require("next");
const express = require("express");
const bodyParser = require("body-parser");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const filePath = "./data.json";
const fs = require("fs");
const path = require("path");
const ProjectsData = require(filePath);

app.prepare().then(() => {
  const server = express();
  server.use(bodyParser.json());

  server.get("/api/v1/Projects", (req, res) => {
    return res.json(ProjectsData);
  });

  server.get("/api/v1/Projects/:id", (req, res) => {
    const { id } = req.params;
    const Project = ProjectsData.find((m) => m.id === id);

    return res.json(Project);
  });

  server.post("/api/v1/Projects", (req, res) => {
    const Project = req.body;
    ProjectsData.push(Project);

    const pathToFile = path.join(__dirname, filePath);
    const stringifiedData = JSON.stringify(ProjectsData, null, 2);

    fs.writeFile(pathToFile, stringifiedData, (err) => {
      if (err) {
        return res.status(422).send(err);
      }

      return res.json("Project has been succesfuly added!");
    });
  });

  server.delete("/api/v1/Projects/:id", (req, res) => {
    const { id } = req.params;
    const ProjectIndex = ProjectsData.findIndex((m) => m.id === id);
    ProjectsData.splice(ProjectIndex, 1);

    const pathToFile = path.join(__dirname, filePath);
    const stringifiedData = JSON.stringify(ProjectsData, null, 2);

    fs.writeFile(pathToFile, stringifiedData, (err) => {
      if (err) {
        return res.status(422).send(err);
      }

      return res.json("Project has been succesfuly added!");
    });
  });

  server.patch("/api/v1/Projects/:id", (req, res) => {
    const { id } = req.params;
    const Project = req.body;
    const ProjectIndex = ProjectsData.findIndex((m) => m.id === id);

    ProjectsData[ProjectIndex] = Project;

    const pathToFile = path.join(__dirname, filePath);
    const stringifiedData = JSON.stringify(ProjectsData, null, 2);

    fs.writeFile(pathToFile, stringifiedData, (err) => {
      if (err) {
        return res.status(422).send(err);
      }

      return res.json(Project);
    });
  });

  // server.get('/faq', (req, res) => {
  //   res.send(`
  //     <html>
  //       <head></head>
  //       <body><h1>Hello World!</h1>
  //       </body>
  //     </html>
  //   `)
  // })

  // we are handling all of the request comming to our server
  // server.get("*", (req, res) => {
  //   // next.js is handling requests and providing pages where we are navigating to
  //   return handle(req, res);
  // });

  // server.post("*", (req, res) => {
  //   // next.js is handling requests and providing pages where we are navigating to
  //   return handle(req, res);
  // });
  const PORT = process.env.PORT || 3000;

  server.use(handle).listen(PORT, (err) => {
    if (err) throw err;
    console.log("> Ready on port " + PORT);
  });
});
