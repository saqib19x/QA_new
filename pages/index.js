import Image from "next/image";
import { useState } from "react";
import { LoginMember } from "../services/api";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { setAuth } from "../redux/authSlice";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

const Home = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [userId, setUserId] = useState();
  const [password, setPassword] = useState();
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { data } = await LoginMember({ email: userId, password });
      dispatch(setAuth(data));
      Cookies.set("access", data.access);
      Cookies.set("refresh", data.refresh);
      router.push("/dashboard");
      toast.success("Successfully LoggedIn 🎉");
    } catch (err) {
      toast.error(err?.response?.data[0]?.non_field_errors);
    }
  };

  return (
    <div>
      <div className="w-full h-screen flex relative">
        <div className="m-2 ml-8">
          <Image src="/images/sovi_black.svg" width={80} height={50} alt="" />
        </div>
        <div className="w-7/12 h-full bg-white p-20 flex flex-col justify-center">
          <div className=" flex justify-center">
            <Image
              src="/images/Profile_icon.svg"
              width={50}
              height={50}
              alt=""
            />
          </div>
          <h1 className=" text-4xl font-semiboldd text-center pt-2">
            Q/A Login
          </h1>

          <div className="text-left w-10/12 mx-auto">
            <form onSubmit={handleLogin}>
              <div className=" mt-12">
                <p className=" text-gray-500">Username </p>
                <input
                  type="text"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  className="w-full p-2 border-2 border-gray-300 focus:border-gray-300 rounded focus:outline-none"
                />
              </div>
              <div className="mt-4 relative">
                <p className=" text-gray-500">Password</p>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 border-2 border-gray-300 focus:border-gray-300 rounded focus:outline-none"
                />
              </div>
              <button className=" w-full bg-blue-700 hover:bg-blue-500 font-semibold text-lg text-white py-2 rounded mt-8">
                Log In
              </button>
            </form>
          </div>
        </div>
        <div className="w-5/12 h-full bg-login_bg  bg-cover bg-center bg-no-repeat"></div>
      </div>
    </div>
  );
};

export default Home;
