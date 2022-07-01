import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const [show, setShow] = useState(false);
  const router = useRouter();

  const LogOut = () => {
    Cookies.remove("access");
    Cookies.remove("refresh");
    router.push("/");
  };

  return (
    <div>
      <div className="w-full h-16 flex items-center  justify-between px-20 p-1.5 bg-[#383A49]">
        <Image alt="" src="/images/sovi_main.svg" width={50} height={30} />
        <div className="flex items-center">
          <h3 className=" font-semibold cursor-pointer text-sm mr-2 text-white">
            {user?.emp_id}
          </h3>
          <div
            className="flex items-center relative"
            id="lead_profile"
            onMouseEnter={() => setShow(true)}
          >
            <Image
              alt=""
              src="/images/user_profile.svg"
              width={25}
              height={25}
            />
            <div
              className={`w-40 bg-white shadow rounded z-10 h-auto p-4 py-2 absolute top-8 right-0 ${
                show == true ? "block" : "hidden"
              }`}
              onMouseLeave={() => setShow(false)}
            >
              <p className=" cursor-pointer" onClick={LogOut}>
                Logout
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
