import React, { useEffect, useState } from "react";
import Image from "next/image";
import { GetAllLeads, UpdateLead } from "../../services/api";
import Sidebar from "../../components/Layout/Sidebar";
import dynamic from "next/dist/shared/lib/dynamic";
import { useDispatch, useSelector } from "react-redux";
import { setLeads } from "../../redux/leadSlice";
import axios from "axios";
import toast from "react-hot-toast";
import InfiniteScroll from "react-infinite-scroll-component";
const Audio = dynamic(() => import("../../components/Audio/index"), {
  ssr: false,
});
import Cookies from "js-cookie";
import { ProtectedPage } from "../../components/Layout/ProtectedPage";
import PropertyDetails from "../../components/PropertyDetails";

function Allleads() {
  const dispatch = useDispatch();
  const { leads } = useSelector((state) => state.leads);
  const [detail, setDetails] = useState();
  const [accepted, setAccepted] = useState([]);
  const [rejected, setRejected] = useState([]);
  const [notes, setNote] = useState([]);
  const [message, setMessage] = useState();
  const [more, setMore] = useState(true);
  const [page_no, setPage_no] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await GetAllLeads(page_no);
        dispatch(setLeads(data.records));
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [dispatch]);
  const handleAccept = async (data) => {
    const payload = {
      lead_type: data.lead_type,
      status: "Accepted",
      notes: data.notes,
    };
    const id = data.id;
    try {
      const { data } = await axios.put(
        `http://api.sovi.ai/QA/lead-update/${id}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("access")}`,
            "Content-type": "application/json",
            Accept: "application/json",
          },
        }
      );
      dispatch(setLeads(data.records));
      toast.success("Accepted");
    } catch (err) {
      toast.error("Error Occured");
      console.log(err);
    }
  };

  const handleReject = async (id) => {
    const payload = {
      status: "Rejected",
      notes: message,
    };
    try {
      const { data } = await axios.put(
        `http://api.sovi.ai/QA/lead-update/${id}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("access")}`,
            "Content-type": "application/json",
            Accept: "application/json",
          },
        }
      );
      dispatch(setLeads(data.records));
      toast.success("Rejected");
    } catch (err) {
      console.log(err);
    }
  };
  const fetchData = async () => {
    setPage_no((page_no += 1));
    try {
      const { data } = await GetAllLeads(page_no);
      dispatch(setLeads(leads.concat(data.records)));
    } catch (error) {
      setMore(false);
    }
  };
  return (
    <div className="flex w-full bg-gray-100 h-screen">
      <Sidebar />
      <div
        className="w-10/12 py-8 px-12 pr-16 h-full overflow-auto"
        id="ScrollTarget"
      >
        {leads.length <= 0 && (
          <div className="w-full h-screen flex items-center justify-center">
            <div className=" text-gray-300">
              <i className="fa-solid fa-box fa-4x"></i> <p>No Data</p>
            </div>
          </div>
        )}
        <InfiniteScroll
          dataLength={leads?.length}
          next={fetchData}
          hasMore={more}
          loader={
            <div
              className={`w-full text-center ${
                leads?.length < 20 ? "hidden" : "block"
              }`}
            >
              <p className="text-lg">Loading...</p>
            </div>
          }
          scrollableTarget="ScrollTarget"
        >
          <div className="w-full h-full mt-4">
            <ul className="">
              {leads?.map((cur) => {
                return (
                  <li
                    className="w-full h-auto bg-white shadow-shad_prime rounded-lg mb-4 p-4 px-8"
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
                              <span className=" text-blue-500">
                                {" "}
                                {cur.rating}/5
                              </span>
                              <i className="fa-solid fa-star text-sm text-yellow-400"></i>
                            </p>
                            <p className=" leading-4 text-xs text-gray-700">
                              Lead ID- {cur.id}
                            </p>
                          </div>
                          <br />
                        </div>
                      </div>
                      <div className="flex items-center">
                        <audio src={cur.audio} controls></audio>

                        {accepted?.includes(cur) && (
                          <div className={`flex items-center ml-2 `}>
                            <h1 className="mr-2 font-semibold text-sm text-green-500">
                              Accepted
                            </h1>
                            <button
                              className="px-4 p-1 rounded bg-green-500 text-white text-sm mr-2"
                              onClick={() => {
                                handleAccept({
                                  id: cur.id,
                                  lead_type: "Hot",
                                });
                              }}
                            >
                              Hot
                            </button>
                            <button
                              className="px-2 p-1 rounded bg-orange-400 text-white text-sm mr-2"
                              onClick={() => {
                                handleAccept({
                                  id: cur.id,
                                  lead_type: "Premium",
                                });
                              }}
                            >
                              Premium
                            </button>
                            <button
                              className="px-2 p-1 rounded bg-[#E96E6E] text-white text-sm"
                              onClick={() => {
                                handleAccept({
                                  id: cur.id,
                                  lead_type: "Basic",
                                });
                              }}
                            >
                              Basic
                            </button>
                          </div>
                        )}

                        {rejected?.includes(cur) && (
                          <div className="flex items-center min-w-[192px] justify-around">
                            <span
                              className={`text-red-500 text-sm font-semibold`}
                            >
                              Rejected
                            </span>
                            <button
                              className={`p-2 py-1 border rounded border-black ${
                                notes?.includes(cur.id) ? "hidden" : "block"
                              }`}
                              onClick={() => setNote([cur.id, ...notes])}
                            >
                              Add Note
                            </button>
                            <div
                              className={`flex flex-col items-end ${
                                notes.includes(cur.id) ? "block" : "hidden"
                              }`}
                            >
                              <textarea
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
                              onClick={() =>
                                setRejected(
                                  rejected?.filter((e) => cur.id != e.id)
                                )
                              }
                            ></i>
                          </div>
                        )}

                        {accepted?.includes(cur) || rejected?.includes(cur) ? (
                          ""
                        ) : (
                          <div className="flex items-center cursor-pointer ">
                            <div
                              className="mx-4 flex items-center flex-col"
                              onClick={() => {
                                setAccepted([cur, ...accepted]);
                              }}
                            >
                              <i className="fa-solid fa-circle-check text-green-400 hover:text-green-500 text-[1.6rem]"></i>
                              <span className="text-sm text-gray-600">
                                Accept
                              </span>
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
                        )}
                      </div>
                    </div>
                    {detail == cur ? (
                      <div
                        className="text-blue-700 cursor-pointer flex justify-end items-center pt-1"
                        onClick={() => setDetails(!cur)}
                      >
                        View all details{" "}
                        <i
                          className={`fa-solid fa-angle-up ml-1
                      }`}
                        ></i>
                      </div>
                    ) : (
                      <div
                        className="text-blue-700 cursor-pointer flex justify-end items-center pt-1"
                        onClick={() => setDetails(cur)}
                      >
                        View all details{" "}
                        <i
                          className={`fa-solid fa-angle-down ml-1
                      }`}
                        ></i>
                      </div>
                    )}
                    {/* ////////View All Details/////////// */}
                    <div
                      className={` ${
                        detail === cur ? "block" : "hidden"
                      } w-full mt-1`}
                    >
                      <PropertyDetails
                        comm={cur?.commercial}
                        res={cur?.residential}
                        bhk={cur?.bhk_option}
                        other={cur?.other_property_type}
                        sqft={cur?.sqrft}
                      />
                      <div className="w-8/12 flex mt-4 text-sm">
                        <h1 className="text-base font-semibold mr-2">Note-</h1>
                        {cur.notes}
                      </div>
                      <div
                        className={`w-8/12 relative rounded flex-wrap overflow-hidden text-xs flex 
                            px-2 my-2 justify-items-start gap-y-1 p-1.5 bg-gray-700 text-white ${
                              cur?.aminities?.length <= 0 ? "hidden" : "block"
                            }
                   `}
                      >
                        {cur.aminities.map((e, index) => {
                          return (
                            <div
                              className="text-white flex items-center pr-4"
                              key={index}
                            >
                              <div>{e}</div>
                            </div>
                          );
                        })}
                        {cur?.aminities?.length == 0 ? "No Amenities" : ""}
                      </div>
                      <div className=" flex items-center justify-between mt-2">
                        <h1 className=" font-semibold">
                          Budget-{" "}
                          <span className="text-blue-700">{cur.budget}</span>{" "}
                        </h1>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </InfiniteScroll>
      </div>
    </div>
  );
}

export default Allleads;
export const getServerSideProps = ProtectedPage(async (_ctx) => {
  return {
    props: {},
  };
});
