import React, { useEffect, useState, useMemo } from "react";
import Sidebar from "../../components/Layout/Sidebar";
import Image from "next/dist/client/image";
import axios from "axios";
import Cookies from "js-cookie";
import { UpdateAccepted, GetAllAcceptedLeads } from "../../services/api";
import { setAcceptLead } from "../../redux/acceptSlice";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import OutsideClickHandler from "react-outside-click-handler";
import PropertyDetails from "../../components/PropertyDetails";
import { ProtectedPage } from "../../components/Layout/ProtectedPage";
import InfiniteScroll from "react-infinite-scroll-component";

const AcceptedLeads = () => {
  const { accptlead } = useSelector((state) => state.accptlead);
  const dispatch = useDispatch();
  const [opt, setOpt] = useState(false);
  const [detail, setDetail] = useState();
  const [page_no, setPage_no] = useState(1);
  const [more, setMore] = useState(true);
  useEffect(() => {
    const AcceptedData = async () => {
      try {
        const { data } = await GetAllAcceptedLeads(page_no);
        dispatch(setAcceptLead(data.records));
      } catch (err) {
        console.log(err);
      }
    };

    AcceptedData();
  }, []);

  ///////Update Status/////////////
  const HandleUpdate = async (data) => {
    const Id = data.id;
    const payload = {
      lead_type: data?.type,
      status: data?.state,
    };
    try {
      const { data } = await UpdateAccepted(Id, payload);
      toast.success("Successfully Update");
      try {
        const { data } = await GetAllAcceptedLeads(page_no);
        dispatch(setAcceptLead(data.records));
      } catch (err) {
        console.log(err);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const fetchData = async () => {
    setPage_no((page_no += 1));
    try {
      const { data } = await GetAllAcceptedLeads(page_no);
      dispatch(setAcceptLead(accptlead.concat(data.records)));
    } catch (error) {
      setMore(false);
    }
  };
  return (
    <div className="flex w-full bg-gray-100 h-screen ">
      <Sidebar />

      <div
        className="w-10/12 py-8 px-12 pr-16 h-full overflow-auto"
        id="ScrollTarget"
      >
        {accptlead.length === 0 && (
          <div className="w-full h-screen flex items-center justify-center">
            <div className=" text-gray-300">
              <i className="fa-solid fa-box fa-4x"></i> <p>No Data</p>
            </div>
          </div>
        )}
        <InfiniteScroll
          dataLength={accptlead?.length}
          next={fetchData}
          hasMore={more}
          loader={
            <div
              className={`w-full text-center ${
                accptlead?.length < 20 ? "hidden" : "block"
              }`}
            >
              <p className="text-lg">Loading...</p>
            </div>
          }
          scrollableTarget="ScrollTarget"
        >
          <div className="w-full  mt-4">
            <ul className="">
              {accptlead?.map((cur) => {
                return (
                  <li
                    className="w-full h-auto bg-white shadow-shad_prime rounded-lg mb-4 p-2 px-4"
                    key={cur.id}
                  >
                    <div className="flex w-full items-center justify-between">
                      <div className="w-4/12">
                        <div className="flex items-center gap-3">
                          <Image
                            src="/images/user_profile.svg"
                            width={40}
                            height={40}
                            alt=""
                          />{" "}
                          <div className="w-10/12">
                            <p>
                              {cur?.full_name}
                              <span className=" text-blue-500"> 4.6/5</span>
                              <i className="fa-solid fa-star text-sm text-yellow-400"></i>
                            </p>
                            <p className=" leading-4 text-xs text-gray-700">
                              Lead ID- {cur?.id}
                            </p>
                          </div>
                        </div>
                      </div>
                      {/* //////Audio/// */}
                      <div className="w-4/12">
                        <audio src={cur?.audio} controls></audio>
                      </div>
                      <div className="flex items-center relative w-3/12 justify-end ">
                        <h1 className="text-sm mx-4 text-green-400 font-semibold">
                          Accepted
                        </h1>
                        <div className="flex relative items-center">
                          <div className="relative">
                            <button
                              className={`px-2 p-1 rounded ${
                                cur?.lead_type === "Hot"
                                  ? "bg-green-500 text-white"
                                  : cur?.lead_type === "Premium"
                                  ? "bg-yellow-500 text-white"
                                  : "bg-red-400 text-white"
                              } text-sm`}
                            >
                              {cur?.lead_type}
                            </button>

                            <i
                              className="fa-solid fa-ellipsis-vertical cursor-pointer px-4 text-xl"
                              onClick={() => setOpt(cur.id)}
                            ></i>
                            <div className=" absolute h-40 bg-red-300"></div>
                          </div>
                        </div>
                        <OutsideClickHandler
                          onOutsideClick={() => setOpt(!cur.id)}
                        >
                          <div
                            className={`p-2 top-6 right-6 flex flex-col absolute items-start bg-white shadow z-10 rounded h-auto accept_Lead ${
                              opt === cur.id ? "block" : "hidden"
                            }`}
                          >
                            <div className="relative">
                              <button
                                onClick={() => {
                                  HandleUpdate({
                                    id: cur.id,
                                    type: cur.lead_type,
                                    state: "Pending",
                                  });
                                }}
                              >
                                Undo
                              </button>
                              <button
                                onClick={() => {
                                  HandleUpdate({
                                    id: cur.id,
                                    type: "Hot",
                                    state: "Accepted",
                                  });
                                }}
                              >
                                Change to Hot
                              </button>
                              <button
                                onClick={() => {
                                  HandleUpdate({
                                    id: cur.id,
                                    type: "Premium",
                                    state: "Accepted",
                                  });
                                }}
                              >
                                Change to Premium
                              </button>
                              <button
                                onClick={() => {
                                  HandleUpdate({
                                    id: cur.id,
                                    type: "Basic",
                                    state: "Accepted",
                                  });
                                }}
                              >
                                Change to Basic
                              </button>
                            </div>
                          </div>
                        </OutsideClickHandler>
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
};

export default AcceptedLeads;
export const getServerSideProps = ProtectedPage(async (_ctx) => {
  return {
    props: {},
  };
});
