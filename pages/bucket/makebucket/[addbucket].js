import React,{useState,useEffect} from 'react'
import Sidebar from '../../../components/Layout/Sidebar'
import InfiniteScroll from 'react-infinite-scroll-component'
import Cookies from "js-cookie";
import PropertyDetails from '../../../components/PropertyDetails';
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import { acceptedBucketlead, changeBucketStatus, GetAllLeads, getBuketDetails, updatePendingStatus } from '../../../services/api';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Addbucket = () => {

  const dispatch = useDispatch();
  const [isvisible,setVisible]=useState({
    detail:'',accept:'',reject:'', count:{}
  })
 const {detail,accept,reject,count}=isvisible;
  const [leads,setLeadData]=useState([]);
  const [complete,setComplete]=useState(false);
  const [more,setMore]=useState(true);
  const [addnote,setNote]=useState('')
  const {query,route}=useRouter();
  const [opt,setOpt]=useState({
    id:query.addbucket,
    camp_name:'None',range:'None',location:'None'
  })
  const {id,camp_name,range,location}=opt;

  const FetchData = async () => {
    try {
      const { data } = await getBuketDetails(id,camp_name,range,location);
      
      console.log("data===>", data);
      setVisible({...isvisible,count:data.response.count});
      setLeadData(data.response.records);
      
      

      const newRes= (data?.response.count?.filled).split("/");
      if( (parseInt(newRes[0]) / parseInt(newRes[1])) ==1){
        
        setComplete(true);
      }else{
        setComplete(false);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    FetchData();
  }, []);

  const handleAccept = async (lead_type,ID) => {
    const payload={
      bucket_id: count.bucket_id,
      status: "InBucket",
      lead_type: lead_type,
      lead:ID
    }
    try {
      const { data } = await acceptedBucketlead(payload)
      toast.success("Added to bucket");
      FetchData();
    } catch (err) {
      toast.error("Error Occured");
    }
  };

  const handleReject = async (id) => {
    const payload = {
      status: "Rejected",
      qa_notes: addnote,
    };
    try {
      const { data } = await updatePendingStatus(id,payload);
      toast.success("Rejected");
      FetchData();
    } catch (err) {
      console.log(err);
      toast.success("Error Occured");
    }
  };
  ///////////CompleteBucket//////////
  const handleComplete=async()=>{
    try {
      const { data } = await changeBucketStatus(id,{
        bucket_status: "Completed"
      });
      toast.success("Successfully Completed");
      route.replace('/bucket/makebucket');
    } catch (err) {
      console.log(err);
      toast.success("Error Occured by");
    }
  }
  return (
    <div className="flex w-full bg-gray-100 min-h-screen text-black">
      <Sidebar />
      <div className='w-9/12 mx-auto pt-8 min-h-screen'>
        {/* ////////Filter/////////////// */}
        <div className='flex justify-between items-end'>
          <div>
            <h1 className=' text-gray-500 text-base font-semibold'>Campaign Name</h1>
            <select name="" id="" className=' w-56 p-1 bg-transparent border-[1.5px] rounded mt-1' >
              op
            </select>
          </div>
          <div>
            <h1 className=' text-gray-500 text-base font-semibold'>Range</h1>
            <select name="" id="" className=' w-48 p-1 bg-transparent border-[1.5px] rounded mt-1' >
              op
            </select>
          </div>
          <div>
            <h1 className=' text-gray-500 text-base font-semibold'>Location</h1>
            <select name="" id="" className=' w-56 p-1 bg-transparent border-[1.5px] rounded mt-1' >
              op
            </select>
          </div>
          <div><button className=' bg-prime-red text-white px-6 rounded p-1'>Submit</button></div>
        </div>
        {/* /////////////////////// */}
        <div className=' w-full relative mt-12'>
        <Link href='/bucket/makebucket/'><i className="fa-solid fa-arrow-left-long absolute -left-8 text-lg top-0.5 cursor-pointer"></i></Link>
         <div className='flex items-center gap-4'>
          <h1 className=' text-lg font-semibold'>Leads </h1>
          <h3 className=' text-sm text-prime-red font-semibold'>{count?.filled} {console.log("count.filled",count.filled)} leads</h3>
         </div>
         <div className=' text-right'>12-October-2022</div>
        </div>
        <div
        className="w-full py-4 overflow-auto"
        id="ScrollTarget"
      >
        {leads.length <= 0 && (
          <div className="w-full h-[60vh] flex items-center justify-center">
            <div className=" text-gray-300">
              <i className="fa-solid fa-box fa-4x"></i> <p>No Data</p>
            </div>
          </div>
        )}
          <div className="w-full h-full mt-0">
            <ul className="">
              {leads?.map((cur,i) => {
                return (
                  <li
                    className="w-full h-auto bg-white shadow-shad_prime rounded-lg mb-4 p-4 px-8"
                    key={i}
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
                      </div>
                      {accept===cur.id && (
                          <div className={`flex items-center ml-2 `}>
                            <h1 className="mr-2 font-semibold text-sm text-green-500">
                              Accepted
                            </h1>
                            <button
                              className="px-4 p-1 rounded bg-green-500 text-white text-sm mr-2"
                              onClick={() =>handleAccept('Hot',cur.id)}
                            >
                              Hot
                            </button>
                            <button
                              className="px-2 p-1 rounded bg-orange-400 text-white text-sm mr-2"
                              onClick={() =>handleAccept('Premium',cur.id)}
                            >
                              Premium
                            </button>
                            <button
                              className="px-2 p-1 rounded bg-[#E96E6E] text-white text-sm"
                              onClick={() =>handleAccept('Basic',cur.id)}
                            >
                              Basic
                            </button>
                          </div>
                        )}

                        {reject===cur.id && (
                          <div className="flex items-center min-w-[192px] justify-around">
                            <span
                              className={`text-red-500 text-sm font-semibold`}
                            >
                              Rejected
                            </span>
                            <div
                              className={`flex flex-col items-end ${
                               reject ? "block" : "hidden"
                              }`}
                            >
                              <textarea
                                onChange={(e) => setNote(e.target.value)}
                                className="mt-10 h-10 ml-6 focus:outline-none border border-black rounded"
                              ></textarea>
                              <button
                                onClick={() => handleReject(cur.id)}
                                className="text-xs mt-4 font-semibold text-white bg-prime-red p-1 px-4 rounded-full"
                              >
                                Submit
                              </button>
                            </div>
                            <i
                              className="cursor-pointer fa-solid fa-xmark text-lg ml-2"
                              onClick={() =>setVisible({reject:!cur.id}) }
                            ></i>
                          </div>
                        )}

                        {accept===cur.id || reject===cur.id ? (
                          ""
                        ) : (
                          <div className="flex items-center cursor-pointer ">
                            <div
                              className="mx-4 flex items-center flex-col"
                              onClick={() => {setVisible({...isvisible, accept:cur.id})}}
                            >
                              <i className="fa-solid fa-circle-check text-green-400 hover:text-green-500 text-[1.6rem]"></i>
                              <span className="text-sm text-gray-600">
                                Accept
                              </span>
                            </div>
                            <div
                              className="flex flex-col items-center"
                              onClick={() => {setVisible({...isvisible,reject:cur.id})}}
                            >
                              <i className="fa-solid fa-circle-xmark text-[1.65rem] text-red-400 hover:text-red-500"></i>
                              <span className="text-sm text-gray-600 mb-1">
                                Reject
                              </span>
                            </div>
                          </div>
                        )}
                    </div>
                  <div className='flex justify-between pl-14'>
                    <h3 className=' font-semibold'>{cur.campaign_name}</h3>
                    {detail === cur.id ? <button className=' text-[#2D59F3]' onClick={()=>setVisible({...isvisible, detail:!cur.id})}>View Details <i className="fa-solid fa-chevron-up" ></i></button>
                    :<button className=' text-[#2D59F3]' onClick={()=>setVisible({...isvisible, detail:cur.id})}>View Details <i className="fa-solid fa-chevron-down"></i></button>}
                  </div>
                    {/* ////////View All Details/////////// */}
                    <div
                      className={` ${
                        detail === cur.id ? "block" : "hidden"
                      } w-full mt-2`}
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
                          <span className="text-blue-700">{cur.budget}</span>{" "}
                        </h1>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
      </div>
     {complete==true &&
      <div className=' text-center'>
         <button 
         className='px-4 p-0.5 pb-1 font-semibold rounded border-[1.5px] border-prime-red text-prime-red' 
         onClick={()=>setComplete(false)}>
          Cancel
          </button>
         <button 
         className='px-4 p-1 font-semibold ml-6 rounded bg-[#4F81FF] text-white' 
         onClick={handleComplete}>
          Complete Bucket
          </button>
      </div>
       } 
      
        </div>
    </div>

  )
}

export default Addbucket