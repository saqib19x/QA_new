import React,{useState,useEffect} from 'react'
import Sidebar from '../../../components/Layout/Sidebar'
import Image from 'next/image'
import { completeBucketGet } from '../../../services/api';
import Link from 'next/link';
const Index = () => {
   const [bucketdata,setBucketdta]=useState([]);
   const FetchData =async(sortdata)=>{
      try{
         const {data}=await completeBucketGet(sortdata);
         console.log(data)
         setBucketdta(data)
        }catch(error){
         console.log(error);
        }
   }
   useEffect(()=>{
    FetchData();
   },[])
  return (
    <div className="flex w-full bg-gray-100 text-black">
      <Sidebar />
     <div className='w-9/12 mx-auto pt-8 h-screen'>
        <div className='flex items-center justify-between'>
            <h1 className=' text-lg font-semibold'>My buckets</h1>
            <div className='flex'><p className=' text-gray-500'>Sort by :</p>
            <select name="" id="" onChange={(e)=>FetchData(e.target.value)} className=' bg-transparent text-black focus:outline-none px-2'>
                {filterData.map(ele=>{
                  return <option value={ele.value} key={ele.id}>{ele.title}</option>
                })}
            </select>
                 </div>
        </div>
        {bucketdata.map((Ele, ind)=>{
         return (
             <div className='w-full  mt-4 bg-white border rounded' key={ind}>
        <div className='flex px-4 p-3 justify-between '>
         <div>
            <h3 className='text-lg font-bold'>{Ele.bucket_name}</h3>
            {Ele.buyed_at}
         </div>
         <div>
            <div className='flex items-start gap-2'><i className="fa-solid fa-user mt-1 text-[#1285C6]"></i>
            <div className=' text-base font-bold'>{Ele.bucket_size} leads
            <p className='text-sm font-normal text-gray-500'>Bucket Type</p>
            </div> 
            </div>
         </div>
         {/* ///// */}
         <div className='flex items-start gap-2'>
            <div className='mt-1'><Image src='/images/budget_icon.svg' width={18} height={18} className='mt-4' /></div>
            
            <div className=' text-base font-bold'>{Ele.range}
            <p className='text-sm font-normal text-gray-500'>Budget</p>
            </div> 
            </div>
            {/* ////// */}
            <div>
            <div className='flex items-start gap-2'><i className="fa-solid fa-location-dot mt-0 text-lg text-[#73D0F4]"></i>
            <div className=' text-base font-bold'>{Ele.location}
            <p className='text-sm font-normal text-gray-500'>Location</p>
            </div> 
            </div>
         </div>
          {/* ////// */}
          <div>
            <div className='flex items-start gap-2'><i className="fa-solid fa-house text-lg"></i>
            <div className=' text-base font-bold'>Apartments
            <p className='text-sm font-normal text-gray-500'>Status</p>
            </div> 
            </div>
         </div>
        <Link href={`/bucket/mybucket/${Ele.id}`}><div className='pt-4'>
            <button className=' text-prime_blue font-semibold '>View All<i className="fa-solid fa-chevron-right pl-1"></i></button>
         </div></Link> 
        </div>  
        <div className='flex border px-4 py-3 justify-between'>
          <h3>Total Paid - <span className=' font-bold text-prime_blue'>₹{Ele.amount}</span></h3>
          <h3>Transaction ID - <span className=' font-bold'>{Ele.razorpay_order_id}</span></h3>
         </div>
    </div>
         )
        })}
       
    </div>
    </div>
  )
}

export default Index;
const filterData= [{id:1,value:'NewtoOld',title:'New to Old'},
{id:2,value:'OldtoNew',title:'Old to New'},
{id:1,value:'A-Z',title:'A-Z'}]