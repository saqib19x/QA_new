import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: "http://api.sovi.ai",
  headers: {
    "Content-type": "application/json",
    Authorization: `Bearer ${Cookies.get("access")}`,
    Accept: "application/json",
    "X-CSRFToken":
      "LfsCaagQn8VJUMc7hW5vqvxJiJm6AhDhfOCj7cv15Ad0n8ylCzvWsVApzsA6W2Ee",
  },
});

export const GetAllEmployee = () => api.get("/QA/all-employees/");
export const GetAllAcceptedLeads = (value) =>
  api.get(`/QA/accepted-lead/?page=${value}`);
export const GetAllRejectedLeads = (value) =>
  api.get(`/QA/rejected-lead/?page=${value}`);
export const GetAllLeads = (value) => api.get(`/QA/leads/?page=${value}`);
export const UpdateLead = (id, data) =>
  api.put(`/QA/edit-empdetail/${id}`, data);
export const UpdateAccepted = (id, data) =>
  api.put(`/QA/update-accepted-lead/${id}`, data);
export const UpdateRejectlead = (id, data) =>
  api.put(`/QA/update-rejected-lead/${id}`, data);

export default api;
