import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Layout/Sidebar";
import dynamic from "next/dist/shared/lib/dynamic";
import { GetAllRejectedLeads, UpdateRejectlead } from "../../services/api";
import { toast } from "react-hot-toast";
import Image from "next/dist/client/image";
import PropertyDetails from "../../components/PropertyDetails";
import { ProtectedPage } from "../../components/Layout/ProtectedPage";
import InfiniteScroll from "react-infinite-scroll-component";
const RejectedLeads = () => {
  const [detail, setDetail] = useState();
  const [leads, setLeads] = useState([]);
  const [page_no, setPage_no] = useState(1);
  const [more, setMore] = useState(true);
  const RejectLeadData = async () => {
    try {
      const { data } = await GetAllRejectedLeads(page_no);
      setLeads(data.records);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    RejectLeadData();
  }, []);
  //////////Handle Undo/////////////
  const handleUndo = async (id) => {
    try {
      const { data } = await UpdateRejectlead(id, { status: "Pending" });
      toast.success("Successfully Update");
      RejectLeadData();
    } catch (err) {
      console.log(err);
    }
  };
  ///Infinite Scroll/////////////////
  const fetchData = async () => {
    setPage_no((page_no += 1));
    try {
      const { data } = await GetAllRejectedLeads(1);
      setLeads(data.records);
    } catch (err) {
      console.log(err);
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
        {leads?.length === 0 && (
          <div className="w-full h-full flex items-center justify-center">
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
          <div className="w-full mt-4">
            <ul className="">
              {leads?.map((cur) => {
                return (
                  <li
                    className="w-full h-auto bg-white shadow-shad_prime rounded-lg mb-4 p-2 px-4"
                    key={cur}
                  >
                    <div className="flex w-full items-center justify-between">
                      <div className="w-4/12">
                        <div className="flex items-center gap-4">
                          <Image
                            src="/images/user_profile.svg"
                            width={40}
                            height={40}
                            alt=""
                          />
                          <div className="">
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
                        <div className="flex items-center">
                          <h1 className="text-sm mx-4 text-red-500 font-semibold">
                            Rejected
                          </h1>
                          <div className="w-40 h-10 border border-black rounded p-1 overflow-hidden text-xs">
                            {cur.qa_notes}
                          </div>
                          <div
                            className="tooltip tooltip-bottom"
                            data-tip="Undo"
                          >
                            <i
                              className="fa-solid fa-rotate-left text-lg cursor-pointer ml-2"
                              onClick={() => handleUndo(cur?.id)}
                            ></i>
                          </div>
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
                          Budget-
                          <span className="text-blue-700">
                            {cur.budget}
                          </span>{" "}
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

export default RejectedLeads;
export const getServerSideProps = ProtectedPage(async (_ctx) => {
  return {
    props: {},
  };
});
