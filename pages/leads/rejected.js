import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/Layout/Sidebar'
import dynamic from "next/dist/shared/lib/dynamic";
import { GetAllRejectedLeads } from '../../services/api';
const Audio = dynamic(() => import("../../components/Audio/index"), { ssr: false });
import Image from 'next/dist/client/image';
import Cookies from 'js-cookie'
import axios from 'axios';

const RejectedLeads = () => {

    const [opt, setOpt] = useState(false);
    const [cnfbox, setCnfbox] = useState(false);
    const [detail, setDetail] = useState();
    const [leads, setLeads] = useState()


    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get("http://api.sovi.ai/QA/rejected-lead/", {
                    headers: {
                        'Content-type': 'application/json',
                        'Accept': 'application/json',
                        Authorization: `Bearer ${Cookies.get("access")}`,
                    }
                })
                setLeads(data.records)
                console.log(data)
            } catch (err) {
                console.log(err)
            }
        }

        fetchData()
    }, [])

    console.log(leads)

    return (
        <div className="flex w-full mt-16 bg-gray-100 min-h-screen">
            <Sidebar />
            <div className="w-10/12 py-8 px-12 pr-16 ">
                <div className="w-full min-h-screen mt-4">
                    <div className="w-full h-auto">
                        <ul className="">
                            {leads?.length === 0 ? <>
                                <h1>No  Rejected Leads</h1>
                            </> : leads?.map((cur) => {
                                return (
                                    <li
                                        className="w-full h-auto bg-white shadow-shad_prime rounded-lg mb-4 p-2 px-4"
                                        key={cur}
                                    >
                                        <div className="flex w-full items-center justify-between">
                                            <div>
                                                <div className="flex items-center">
                                                    <Image
                                                        src="/images/user_profile.svg"
                                                        width={40}
                                                        height={40}
                                                        alt=""
                                                    />{" "}
                                                    <div className="ml-4">
                                                        <p>
                                                            {cur.full_name}
                                                            <span className=" text-blue-500"> {cur.rating}/5</span>
                                                            <i className="fa-solid fa-star text-sm text-yellow-400"></i>
                                                        </p>
                                                        <p>98765********</p>
                                                    </div>
                                                    <br />
                                                </div>
                                                <p className=" leading-4 text-xs text-gray-700">
                                                    Lead ID- {cur.id}
                                                </p>
                                            </div>
                                            <div className="flex items-center">
                                                <div className=" min-w-[250px] rounded h-10 border border-blue-700 mr-16">
                                                    <Audio />
                                                </div>
                                                <div className="flex items-center">
                                                    <h1 className="text-sm mx-4 text-red-500 font-semibold">
                                                        Rejected
                                                    </h1>
                                                    <div className="w-40 h-10 border border-black rounded p-1 overflow-hidden text-xs">
                                                        {cur.notes}
                                                    </div>
                                                    <i className="fa-solid fa-rotate-left text-lg cursor-pointer ml-2"></i>
                                                </div>
                                            </div>
                                        </div>
                                        {detail == cur ? (
                                            <div
                                                className="text-blue-700 cursor-pointer flex justify-end items-center"
                                                onClick={() => setDetail(!cur)}
                                            >
                                                View all details{" "}
                                                <i
                                                    className={`fa-solid fa-angle-up ml-1
                      }`}
                                                ></i>
                                            </div>
                                        ) : (
                                            <div
                                                className="text-blue-700 cursor-pointer flex justify-end items-center"
                                                onClick={() => setDetail(cur)}
                                            >
                                                View all details{" "}
                                                <i
                                                    className={`fa-solid fa-angle-down ml-1
                      }`}
                                                ></i>
                                            </div>
                                        )}
                                        {/* ////////////Dropdown///////////active////////////// */}
                                        <div
                                            className={`  w-full mt-1 ${detail === cur ? "block" : "hidden"
                                                } `}
                                        >
                                            <div className="flex items-center">
                                                <div className="p-1 px-4 bg-white border-[1.3px] rounded-full mr-4 border-violet-500">
                                                    7 or 8th floor
                                                </div>
                                                <div className="p-1 px-4 bg-white border-[1.3px] rounded-full mr-4 border-violet-500">
                                                    To buy
                                                </div>
                                                <div className="p-1 px-4 bg-white border-[1.3px] rounded-full mr-4 border-violet-500">
                                                    Society with children park
                                                </div>
                                                <div className="p-1 px-4 bg-white border-[1.3px] rounded-full mr-4 border-violet-500">
                                                    Parking space
                                                </div>
                                                <div className="p-1 px-4 bg-white border-[1.3px] rounded-full mr-4 border-violet-500">
                                                    3 BHK
                                                </div>
                                            </div>
                                            <div className="w-8/12 flex mt-4 text-sm">
                                                <h1 className="text-base font-semibold mr-2">Note-</h1>
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                                Pellentesque sed varius ipsum, est. Aenean ultrices
                                                ullamcorper dolor pharetra. In lorem et eros, maecenas
                                                vestibulum, in interdum.
                                            </div>
                                            <div className=" flex items-center justify-between mt-2">
                                                <h1 className=" font-semibold">
                                                    Budget- <span className="text-blue-700">50-70 lakhs</span>{" "}
                                                </h1>
                                            </div>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RejectedLeads