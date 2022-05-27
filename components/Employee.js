import React from "react";

const Employee = () => {
    return (
        <div className="w-full h-auto">
            <div className=" w-full min-h-[100px] Em_Profile mt-4 rounded-xl relative">
                <div className=" absolute top bg-white rounded-full -bottom-12 left-8 p-3 shadow border">
                    <img
                        src="/images/emp_profile2.svg"
                        alt=""
                        className="object-contain w-16 h-16"
                    />
                    <div className=" absolute bottom-0 right-0 bg-white p-2 py-1 rounded-full shadow">
                        <i className="fa-solid fa-pen text-xs"></i>
                    </div>
                </div>
            </div>
            <div className=" w-full flex flex-col items-end">
                <div className="w-10/12">
                    <div className=" flex justify-between items-start mt-2 pr-4">
                        <div className="text-lg font-semibold">
                            Rakesh Sharma
                            <h1 className="text-xs font-normal leading-3 text-gray-500">
                                Emp Id -EMP03347685
                            </h1>
                        </div>
                        <button className=" text-blue-700 font-semibold">
                            Edit Profile
                        </button>
                    </div>

                    <form action="" className="w-8/12 emp_profile mt-8">
                        <div className="w-full my-4">
                            <p>First Name</p>
                            <input type="text" name="" id="" className="w-full" />
                        </div>
                        <div className="w-full mb-4">
                            <p>Last Name</p>
                            <input type="text" name="" id="" className="w-full" />
                        </div>
                        <div className="w-full mb-4">
                            <p>Email Id</p>
                            <input type="text" name="" id="" className="w-full" />
                        </div>
                        <div className="w-full mb-4">
                            <p>Document</p>
                            <input type="file" name="" id="" className="w-full" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Employee;
