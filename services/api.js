import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: "http://api.sovi.ai",
  headers: {
    "Content-type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${Cookies.get("access")}`,
  },
  "X-CSRFToken":
    "LfsCaagQn8VJUMc7hW5vqvxJiJm6AhDhfOCj7cv15Ad0n8ylCzvWsVApzsA6W2Ee",
});

export const LoginMember = (data) => api.post("/lead/member-login/", data);
export const GetAllEmployee = () => api.get("/QA/all-employees/");
export const GetAllAcceptedLeads = () => api.get("/QA/accepted-lead/");
export const GetAllRejectedLeads = () => api.get("/QA/rejected-lead/");
export const GetAllLeads = () => api.get("/QA/leads/");
export const UpdateLead = (id, data) => api.put(`/QA/lead-update/${id}`, data);

export default api;
