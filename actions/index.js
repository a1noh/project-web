import axios from "axios";

const BASE_URL = "http://localhost:3000";

const Project_DATA = [];

const CATEGORY_DATA = [
  { id: "c-1", name: "drama" },
  { id: "c-2", name: "action" },
  { id: "c-3", name: "adventeru" },
  { id: "c-4", name: "historical" },
];

// 1. getCategories function
// 2. get categories in index page
// 3. provide categories to sidemenu
// 4. in sidemenu iterate categories and display them

export const getCategories = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(CATEGORY_DATA);
      // reject('Cannot fetch data!')
    }, 50);
  });
};

export const getProjects = () => {
  return axios.get(`${BASE_URL}/api/v1/Projects`).then((res) => res.data);
};

export const createProject = (Project) => {
  Project.id = Math.random().toString(36).substr(2, 5);
  return axios
    .post(`${BASE_URL}/api/v1/Projects`, Project)
    .then((res) => res.data);
};

export const getProjectById = (id) => {
  return axios.get(`${BASE_URL}/api/v1/Projects/${id}`).then((res) => res.data);
};

export const deleteProject = (id) => {
  return axios
    .delete(`${BASE_URL}/api/v1/Projects/${id}`)
    .then((res) => res.data);
};
