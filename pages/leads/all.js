import React, { useEffect, useState } from "react";
import Image from "next/image";
import { GetAllLeads, UpdateLead } from "../../services/api";
import Sidebar from "../../components/Layout/Sidebar";
import dynamic from "next/dist/shared/lib/dynamic";
const Audio = dynamic(() => import("../../components/Audio/index"), { ssr: false });

function Allleads({ dum }) {
    const [detail, setDetails] = useState();
    const [cancel, setCancel] = useState(false);
    const [accepted, setAccepted] = useState([]);
    const [rejected, setRejected] = useState([]);
    const [notes, setNote] = useState([]);
    const [leads, setLeads] = useState()
    const [leadType, setLeadType] = useState()
    const [message, setMessage] = useState()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await GetAllLeads()
                setLeads(data.records)
                console.log(data)
            } catch (err) {
                console.log(err)
            }
        }

        fetchData()
    }, [])

    const handleAccept = async (data) => {

        const payload = {
            lead_type: data.lead_type,
            status: "Accepted",
            "notes": "string"
        }

        console.log(data.id)
        const id = data.id;

        try {
            const { data } = await UpdateLead(id)
            console.log(data)
        } catch (err) {
            console.log(err)
        }
    }

    const handleReject = async (id) => {

        const payload = {
            status: "Rejected",
            "notes": message
        }

        try {
            const { data } = await UpdateLead(id, payload)
            console.log(data)
        } catch (err) {
            console.log(err)
        }
    }

    console.log(accepted)

    return (
        <div className="flex w-full mt-16 bg-gray-100 min-h-screen">
            <Sidebar />
            <div className="w-10/12 py-8 px-12 pr-16 ">
                <div className="w-full min-h-screen mt-4">
                    <div className="w-full h-auto">
                        <ul className="">
                            {leads?.map((cur) => {
                                return (
                                    <li
                                        className="w-full h-auto bg-white shadow-shad_prime rounded-lg mb-4 p-2 px-4"
                                        key={cur.id}
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
                                                            <span className=" text-blue-500"> 4.6/5</span>
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
                                                <div className=" min-w-[250px] rounded h-10 border border-blue-700 mr-6">
                                                    <Audio />
                                                </div>

                                                {

                                                    accepted?.includes(cur) && <div className={`flex items-center ml-2 `}>
                                                        <h1 className="mr-2 font-semibold text-sm text-green-500">
                                                            Accepted
                                                        </h1>
                                                        <button className="px-4 p-1 rounded bg-green-500 text-white text-sm mr-2" onClick={() => {
                                                            handleAccept({ id: cur.id, lead_type: 'Hot' })
                                                        }}>
                                                            Hot
                                                        </button>
                                                        <button className="px-2 p-1 rounded bg-orange-400 text-white text-sm mr-2" onClick={() => {
                                                            handleAccept({ id: cur.id, lead_type: 'Premium' })
                                                        }}>
                                                            Premium
                                                        </button>
                                                        <button className="px-2 p-1 rounded bg-[#E96E6E] text-white text-sm">
                                                            Basic
                                                        </button>
                                                    </div>

                                                }

                                                {
                                                    rejected.includes(cur) && <div className=" flex items-center min-w-[192px] justify-around">
                                                        <span
                                                            className={`text-red-500 text-sm font-semibold`}
                                                        >
                                                            Rejected
                                                        </span>
                                                        <button
                                                            className={`p-2 py-1 border rounded border-black ${notes.includes(cur.id) ? "hidden" : "block"
                                                                }`}
                                                            onClick={() => setNote([cur.id, ...notes])}
                                                        >
                                                            Add Note
                                                        </button>
                                                        <div
                                                            className={`flex flex-col items-end ${notes.includes(cur.id) ? "block" : "hidden"
                                                                }`}
                                                        >
                                                            <textarea
                                                                value={message}
                                                                onChange={(e) => setMessage(e.target.value)}
                                                                className="mt-10 h-9 ml-6 focus:outline-none border border-black rounded"
                                                            ></textarea>{" "}
                                                            <button
                                                                onClick={() => handleReject(cur.id)}
                                                                className="text-xs mt-4 font-semibold text-white bg-prime-red p-1 px-4 rounded-full"
                                                            >
                                                                Submit
                                                            </button>
                                                        </div>
                                                        <i
                                                            className="cursor-pointer fa-solid fa-xmark text-lg ml-2"
                                                            onClick={() => {
                                                                setCancel(false);
                                                                setNote(false);
                                                            }}
                                                        ></i>
                                                    </div>
                                                }

                                                {
                                                    accepted?.includes(cur) || rejected?.includes(cur) ? "" : <div className="flex items-center cursor-pointer ">
                                                        <div
                                                            className="mx-4 flex items-center flex-col"
                                                            onClick={() => {
                                                                setAccepted([cur, ...accepted])
                                                            }}
                                                        >
                                                            <i className="fa-solid fa-circle-check text-green-400 hover:text-green-500 text-[1.6rem]"></i>
                                                            <span className="text-sm text-gray-600">Accept</span>
                                                        </div>
                                                        <div
                                                            className="flex flex-col items-center"
                                                            onClick={() => setRejected([cur, ...rejected])}
                                                        >
                                                            <i className="fa-solid fa-circle-xmark text-[1.65rem] text-red-400 hover:text-red-500"></i>
                                                            <span className="text-sm text-gray-600 mb-1">
                                                                Reject
                                                            </span>
                                                        </div>
                                                    </div>
                                                }


                                            </div>
                                        </div>
                                        {/* ///details start/// */}

                                        {/* ////////View All Details/////////// */}
                                        <div
                                            className={` ${detail === cur ? "block" : "hidden"
                                                } w-full mt-4`}
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
    );
}

export default Allleads;
