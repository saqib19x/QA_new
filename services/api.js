import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: "http://43.205.216.194:8000",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${Cookies.get("access")}`
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
  export const updatePendingStatus = (id,data) =>
  api.put(`/QA/lead-update/${id}`,data);
//////////////Bucket/////////////////
export const getBucket = (data) =>{
if(data){
  return api.get(`/QA/qa-get-bucket/?sort_by=${data}`);
}else{
  return api.get(`/QA/qa-get-bucket/`);
}
}
export const getBuketDetails = (data) =>{
   return api.get(`/QA/add-lead-list/1?campaign_name=None&range=None&location=None`);
  }
export const bucketCount=()=>api.get(`/QA/pending-bucket-count/`);
export default api;

export const acceptedBucketlead = (data) =>
  api.post(`/QA/add-to-bucket/`, data);

  ////////////Complete Bucket///////////
  export const completeBucketGet = (data) =>{
    if(data){
      return api.get(`/QA/my-buckets/?sort_by=${data}`);
    }else{
      return api.get(`/QA/my-buckets/`);
    }
    }
    export const getCompBucketDetail = (id) =>{
      return api.get(`/QA/get-completed-bucket-detail/${id}`);
     }