import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/dist/client/router";
import { bucketCount } from "../../services/api";

const Sidebar = () => {
  const router = useRouter();
  const [count, setCount] = useState(0);
  const path = router.pathname;
  const leadType = [
    { id: 1, title: "All Employees", goto: "/dashboard" },
    { id: 2, title: "Pending Leads", goto: "/leads/all" },
    { id: 3, title: "Accepted leads", goto: "/leads/accepted" },
    { id: 4, title: "Rejected leads", goto: "/leads/rejected" },
    { id: 5, title: "Make Bucket", goto: "/bucket/makebucket" },
    { id: 6, title: "Completed buckets", goto: "/bucket/mybucket" },
  ];
useEffect(()=>{
  (async()=>{
    try{
      const {data}=await bucketCount();
      setCount(data.bucket_count)
     }catch(error){
      console.log(error);
     }
  })();
})
  return (
    <div className="w-2/12 bg-white diff_lead sticky z-20 h-screen">
      <ul className="w-full">
        {leadType.map((Ele) => {
          return (
            <Link key={Ele.id} href={Ele.goto}>
              <li
                className={`cursor-pointer relative`}
              >
                <h3
                  className={` text-gray-500 ${
                    path === Ele.goto ? "bg-prime-red text-white" : ""
                  } `}
                >
                  {Ele.title}
                </h3>
                {Ele.id===5 && <div className=" absolute top-2 flex items-center justify-center font-semibold right-2 w-8 h-[65%] text-white rounded-full bg-[#5745B8]">{count}</div>}
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
