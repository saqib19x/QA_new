import React,{useState,useEffect} from 'react'
import Sidebar from '../../../components/Layout/Sidebar';
import Link from 'next/link';
import Image from 'next/image';
import Tiledetais from '../../../components/bucket/mybucket/Tiledetais';
import toast from 'react-hot-toast';
import { getCompBucketDetail } from '../../../services/api';
import { useRouter } from 'next/router';
const Details = () => {
   const [viewDetail,setView]=useState()
   const [Data,setData]=useState({
      bucket_data:{},
      bucket_leads:[]
   });
   const {bucket_leads,bucket_data}=Data;
   const {query}=useRouter()
   const id = query.details;
   useEffect(()=>{
      if(id){
            (async()=>{
      try {
         const { data } = await getCompBucketDetail(id)
         setData({bucket_data:data.bucket_data,bucket_leads:data.bucket_leads});
       } catch (err) {
         toast.error("Error Occured");
       }
   })();
      }

   },[id])
   console.log(Data)
  return (
    <div className="flex w-full bg-gray-100 text-black">
      <Sidebar />
     <div className='w-9/12 mx-auto pt-8 pb-8 relative'>
        <div className='w-full relative'>
        <Link href='/bucket/mybucket/'><i className="fa-solid fa-arrow-left-long absolute -left-8 text-lg top-0.5 cursor-pointer"></i></Link>
        </div>
        <h1 className=' text-xl font-semibold'>My buckets </h1>
        <div className=' text-right'> Bought on - <span className=' font-semibold'>{bucket_data?.buyed_at}</span> </div>
        {/* //////////////// */}
        <div className='w-full bg-white mt-2'>
        <div className='px-6 p-4'>
        <div className='flex justify-between'>
          <h3 className=' text-lg font-semibold'>{bucket_data.bucket_name}</h3>
          <h3>Transaction ID - <span className=' font-bold'>{bucket_data?.razorpay_order_id}</span></h3>
         </div> 
         <div className='flex items-center gap-4 mt-2'>
            <h3>{bucket_data?.bucket_size} leads</h3>
            <h3>Paid - <span className=' font-bold text-prime_blue'>₹ {bucket_data?.amount}</span></h3>
         </div>
        </div>
        {/* /////////////////DAta Show/////////// */}
        <div className='px-12 border p-8 h-[70vh] overflow-y-auto'>
         {bucket_leads.map(Ele=>{
            return (
                  <div className='w-full bg-white shadow border rounded'>
        <div className='flex  justify-between px-6 p-3'>
        <div className="flex gap-3">
                          <Image
                            src="/images/user_profile.svg"
                            width={40}
                            height={40}
                            alt=""
                          />
                          <div className="w-10/12 mt-1 leading-4">
                            <p className=' font-semibold'>{Ele.full_name}</p>
                            <div className=" text-blue-500 text-sm font-semibold"> {Ele.rating}/5 <i className="fa-solid fa-star text-sm text-yellow-400"></i></div>
                          </div>
                        </div>
         <div>
            <div className='flex items-start gap-2'><i className="fa-solid fa-user mt-1 text-[#1285C6]"></i>
            <div className=' text-base font-bold'>Premium 
            <p className='text-sm font-normal text-gray-500'>lead Type</p>
            </div> 
            </div>
         </div>
         {/* ///// */}
         <div className='flex items-start gap-2'>
            <div className='mt-1'><Image src='/images/budget_icon.svg' width={18} height={18} className='mt-4' /></div>
            
            <div className=' text-base font-bold'>{Ele.budget}
            <p className='text-sm font-normal text-gray-500'>Budget</p>
            </div> 
            </div>
            {/* ////// */}
            <div>
            <div className='flex items-start gap-2'><i className="fa-solid fa-location-dot mt-0 text-lg text-[#73D0F4]"></i>
            <div className=' text-base font-bold'>{Ele.address}
            <p className='text-sm font-normal text-gray-500'>Location</p>
            </div> 
            </div>
         </div>
         <div>
            {viewDetail==Ele.id ? <button className='mt-2' onClick={()=>setView(!Ele.id)}><i class="fa-solid fa-chevron-down"></i></button>:
            <button className='mt-2' onClick={()=>setView(Ele.id)}><i class="fa-solid fa-chevron-right"></i></button>}
            </div>
        </div>
        {viewDetail===Ele.id && <Tiledetais Ele={Ele}/>}
        
        </div>
            )
         })}
         
        </div>
        </div>
     </div>
     </div>
  )
}

export default Details