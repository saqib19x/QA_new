import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: "http://api.sovi.ai",
  headers: {
    Authorization: `Bearer ${Cookies.get("access")}`,
    "Content-type": "application/json",
    Accept: "application/json",
  },
  "X-CSRFToken":
    "LfsCaagQn8VJUMc7hW5vqvxJiJm6AhDhfOCj7cv15Ad0n8ylCzvWsVApzsA6W2Ee",
});

export const LoginMember = (data) => api.post("/lead/member-login/", data);
export const GetAllEmployee = () => api.get("/QA/all-employees/");
export const GetAllAcceptedLeads = () => api.get("/QA/accepted-lead/");
export const GetAllRejectedLeads = () => api.get("/QA/rejected-lead/");
export const GetAllLeads = () => api.get("/QA/leads/?page=1");
export const UpdateLead = (id, data) => api.put(`/QA/lead-update/${id}`, data);
export const UpdateEmployee = (id, data) =>
  api.put(`/QA/edit-empdetail/${id}`, data);

export default api;
