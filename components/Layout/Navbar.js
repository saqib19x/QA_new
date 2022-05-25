import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

const Navbar = () => {

    const [show, setShow] = useState(false);
    const router = useRouter();

    const LogOut = () => {
        Cookies.set("access", "");
        Cookies.set("refresh", "");
        router.push("/login");
    };

    return (
        <div>
            <div className="fixed w-full h-16 flex items-center  justify-between px-20 p-1.5 bg-[#383A49]">
                <Image alt="" src="/images/sovi_main.svg" width={50} height={30} />
                <div className="flex items-center">
                    <Link href="/myleads">
                        <h3 className="text-white mr-4 cursor-pointer">My Leads</h3>
                    </Link>
                    <h3 className=" font-semibold cursor-pointer text-sm mr-2 text-white">
                        efwerge
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
                            className={`w-40 bg-white shadow rounded z-10 h-auto p-4 absolute top-8 right-0 ${show == true ? "block" : "hidden"
                                }`}
                            onMouseLeave={() => setShow(false)}
                        >
                            <p className=" cursor-pointer">Change Password</p>
                            <p className=" cursor-pointer mt-2" onClick={LogOut}>
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