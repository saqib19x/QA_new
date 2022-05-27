import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import Employee from '../../components/Employee';
import Sidebar from '../../components/Layout/Sidebar'
import { GetAllEmployee, GetAllLeads } from '../../services/api';
import Link from 'next/link';

const Dashboard = () => {

    const [activelead, setActivelead] = useState(0);

    const [detail, setDetails] = useState();
    const [cancel, setCancel] = useState(false);
    const [accpt, setAccpt] = useState(false);
    const [notes, setNote] = useState(false);
    const [leads, setLeads] = useState()

    const leadType = [
        { id: 1, title: "All Employees" },
        { id: 2, title: "All Leads" },
        { id: 3, title: "Rejected leads" },
        { id: 4, title: "Accepted leads" },
    ];

    const [empShow, setEmpShow] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await GetAllEmployee()
                setEmpShow(data)
                console.log(data)
            } catch (err) {
                console.log(err)
            }
        }

        fetchData()
    }, [])

    return (
        <div className="flex w-full mt-16 bg-gray-100 min-h-screen">
            <Sidebar />

            <div className="w-10/12 py-8 px-12 pr-16 ">
                <div className="w-full flex items-center justify-between mt-4">
                    <h1 className="text-lg font-semibold">
                        {activelead == 1
                            ? "All Employees"
                            : activelead == 2
                                ? "Leads"
                                : activelead == 3
                                    ? "Rejected Leads"
                                    : activelead == 4
                                        ? "Accepted Leads"
                                        : "All Employees"}
                    </h1>
                </div>

                <div className="w-full min-h-screen">
                    <div className=" grid grid-cols-5 w-full gap-12 gap-x-6 mt-4">
                        {empShow?.map((ele) => {
                            return (
                                <div className="w-full auto text-center" key={ele}>
                                    <div className="flex relative z-0 flex-col items-center justify-center py-4 bg-white rounded-lg shadow">
                                        <Image
                                            src="/images/emp_profile.svg"
                                            width={100}
                                            height={100}
                                            alt=""
                                        />
                                        <h1 className=" font-semibold text-lg"> {ele.first_name}</h1>
                                        <p className="pb-4 text-gray-400 text-[0.6rem]">
                                            Emp Id - {ele.id}
                                        </p>
                                    </div>
                                    <div>
                                        <Link href={`/dashboard/${ele.id}`}>
                                            <p
                                                className=" text-[0.7rem] cursor-pointer py-2"
                                            >
                                                VIEW PROFILE
                                                <span>
                                                    <i className="fa-solid fa-angle-right"></i>
                                                </span>
                                            </p>
                                        </Link>
                                        <button className=" w-full p-1 text-white bg-blue-900 rounded">
                                            LEADS
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

            </div>



        </div>
    )
}

export default Dashboard