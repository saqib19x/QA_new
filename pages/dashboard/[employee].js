import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Layout/Sidebar";
import { GetAllEmployee } from "../../services/api";
import { useRouter } from "next/dist/client/router";

const Employee = () => {

    const router = useRouter()
    const [empShow, setEmpShow] = useState([]);
    const path = router.query.employee

    const [firstName, setFirstName] = useState(empShow && empShow.first_name)
    const [lastName, setLastName] = useState(empShow && empShow.last_name)
    const [email, setEmail] = useState(empShow && empShow.email)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await GetAllEmployee()
                setEmpShow(data.find(e => e.id == path))
            } catch (err) {
                console.log(err)
            }
        }
        fetchData()
    }, [path])

    console.log(empShow)
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
                                {empShow?.first_name} {empShow?.last_name}
                                <h1 className="text-xs font-normal leading-3 text-gray-500">
                                    Emp Id - {empShow?.emp_id}
                                </h1>
                            </div>
                        </div>

                        {
                            empShow && <form action="" className="w-8/12 emp_profile mt-8">
                                <div className="w-full my-4">
                                    <p>First Name</p>
                                    <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="w-full" />
                                </div>
                                <div className="w-full mb-4">
                                    <p>Last Name</p>
                                    <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} className="w-full" />
                                </div>
                                <div className="w-full mb-4">
                                    <p>Email Id</p>
                                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full" />
                                </div>
                                <div className="w-full mb-4">
                                    <p>Document</p>
                                    <input type="file" name="" id="" className="w-full" />
                                </div>
                                <button className=" bg-blue-700 font-semibold border-2 rounded-lg p-2 border-black text-white  px-6">
                                    Save
                                </button>
                            </form>
                        }

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Employee;
