import axios from "axios";
import Notification from "../components/Notification";

const baseUrl = "http://localhost:3001/persons";

const getAllPerson = () => {
  return axios.get(baseUrl).then((response) => response.data);
};

const createPerson = (newObject) => {
  return axios.post(baseUrl, newObject).then((response) => response.data);
};

const deletePerson = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
};

const updatePerson = (id, updatedObject) => {
    return axios.put(`${baseUrl}/${id}`, updatedObject).then(response => response.data)
}

export default {
  getAllPerson,
  createPerson,
  deletePerson,
  updatePerson
};
