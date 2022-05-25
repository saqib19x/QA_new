import Image from "next/image";
import { useState } from "react";

export default function Home() {

  const [userId, setUserId] = useState()
  const [password, setPassword] = useState()

  const handleLogin = (e) => {
    e.preventDefault()
  }

  return (
    <div className="w-full h-screen bg-first_linear bg-cover bg-center bg-no-repeat">
      <div className="flex p-2">
        <Image src="/images/sovi_logo.svg" width={100} height={30} alt="" />
      </div>
      <div className="w-4/12 mx-auto text-center mt-8">
        <Image src="/images/user_icon.svg" width={100} height={50} alt="" />
        <h1 className=" text-4xl text-white">Member Login</h1>

        <form onSubmit={handleLogin}>
          <div className="w-full text-left my-3">
            <label htmlFor="user" className=" text-white">
              Username*
            </label>
            <br />
            <input
              type="text"
              required
              className="w-full p-2 rounded focus:outline-none"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
          </div>
          <div className="w-full text-left mb-3">
            <label htmlFor="user" className=" text-white">
              Password*
            </label>{" "}
            <br />
            <input
              type="password"
              className="w-full p-2 rounded focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className=" w-full bg-[#FF7948] rounded py-2 text-white mt-4">
            LOGIN
          </button>
          <div className="text-white mt-2 cursor-pointer">
            Forget password ?
          </div>
        </form>
      </div>
    </div>
  );
}