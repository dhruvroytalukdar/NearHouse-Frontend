import { useAppContext } from "./auth";
import { getAuth, signOut } from "firebase/auth";
import { FaSignOutAlt, FaUser } from "react-icons/fa";
import { useState } from "react";
import ActiveLink from "./ActiveLink";
import { useRouter } from "next/router";

export default function Navbar() {
  const authuser = useAppContext();
  const auth = getAuth();
  const router = useRouter();
  const [display, setDisplay] = useState("hidden");

  function getFirstName(name) {
    return name.split(" ")[0];
  }

  return (
    <div className="w-screen h-16 bg-black text-white">
      <div className="w-11/12 lg:w-8/12 h-full mx-auto flex justify-between items-center">
        <div className="w-1/5 mr-4 text-3xl font-bold">
          Near<span className="text-green-400">House</span>
        </div>

        <button onClick={() => setDisplay("absolute")}>
          <img className="w-8 h-8 white-filter lg:hidden" src="/svg/menu.svg" />
        </button>

        <div
          className={`${display} nav-links lg:w-3/5 lg:flex lg:justify-between`}
        >
          <button onClick={() => setDisplay("hidden")}>
            <img
              className="w-6 h-6 white-filter lg:hidden my-3"
              src="/svg/x.svg"
            />
          </button>
          <ActiveLink href="/">
            <p className="text-xl font-semibold">Home</p>
          </ActiveLink>
          <ActiveLink href="/rental">
            <p className="text-xl font-semibold">Rental</p>
          </ActiveLink>
          <ActiveLink href="/sale">
            <p className="text-xl font-semibold">Sale</p>
          </ActiveLink>
          {authuser ? (
            <div className="flex space-x-2 mr-3">
              <img className="w-8 h-8 rounded-full" src={authuser.imageURL} />
              <div className="text-xl font-semibold">
                {getFirstName(authuser.name)}
              </div>
              <button
                className="px-2 py-1 hover:bg-gray-600 rounded-md hover:border-2"
                onClick={() => signOut(auth)}
              >
                <FaSignOutAlt />
              </button>
            </div>
          ) : (
            <div className="py-0.5 mr-3">
              <button
                className="flex space-x-2"
                onClick={() => router.push("/login")}
              >
                <p className="text-lg font-semibold mb-0.5">LogIn</p>
                <div className="mt-0.5 p-1 hover:bg-gray-600 rounded-md hover:border-2">
                  <FaUser />
                </div>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
