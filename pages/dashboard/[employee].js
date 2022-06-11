import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Layout/Sidebar";
import { GetAllEmployee, UpdateEmployee } from "../../services/api";
import { useRouter } from "next/dist/client/router";
import { useDispatch, useSelector } from "react-redux";
import { setEmps } from "../../redux/empSlice";
import toast from "react-hot-toast";

const Employee = () => {
  const { emp } = useSelector((state) => state.emp);
  const dispatch = useDispatch();
  const router = useRouter();
  const path = router.query.employee;
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [mobile, setMobile] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await GetAllEmployee();
        const result = data.find((e) => e.id == path);
        dispatch(setEmps(result));
        setFirstName(result.first_name);
        setLastName(result.last_name);
        setMobile(result.phone);
        console.log(result);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [path]);

  ////////Update Employee Details////////
  const HandleEmpDetails = async (id) => {
    try {
      const { data } = UpdateEmployee(id, {
        first_name: firstName,
        last_name: lastName,
        phone: mobile,
      });
      dispatch(setEmps(emp));
      toast.success("Successfully Update");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="flex w-full mt-16 bg-gray-100 min-h-screen">
      <Sidebar />

      <div className="w-10/12 py-8 px-12 pr-16 ">
        <div className=" w-full min-h-[100px] Em_Profile mt-4 rounded-xl relative">
          <div className=" absolute top bg-white rounded-full -bottom-12 left-8 p-3 shadow border">
            <img
              src="/images/emp_profile2.svg"
              alt=""
              className="object-contain w-16 h-16"
            />
            <div className=" absolute bottom-0 right-0 bg-white p-2 py-1 rounded-full shadow">
              <i className="fa-solid fa-pen text-xs"></i>
            </div>
          </div>
        </div>
        <div className=" w-full flex flex-col items-end">
          <div className="w-10/12">
            <div className=" flex justify-between items-start mt-2 pr-4">
              <div className="text-lg font-semibold capitalize">
                {emp?.first_name} {emp?.last_name}
                <h1 className="text-xs font-normal leading-3 text-gray-500">
                  Emp Id - {emp?.emp_id}
                </h1>
              </div>
            </div>

            {emp && (
              <div className="w-8/12 emp_profile mt-8">
                <div className="w-full my-4">
                  <p>First Name</p>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full"
                  />
                </div>
                <div className="w-full mb-4">
                  <p>Last Name</p>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full"
                  />
                </div>
                <div className="w-full mb-4">
                  <p>Phone Number</p>
                  <input
                    type="number"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    className="w-full"
                  />
                </div>
                <div className="w-full mb-4">
                  <p>Document</p>
                  <input type="file" name="" id="" className="w-full" />
                </div>
                <button
                  className=" bg-blue-700 font-semibold border-2 rounded-lg p-2 hover:bg-blue-500 text-white  px-6"
                  onClick={() => HandleEmpDetails(path)}
                >
                  Update
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Employee;
