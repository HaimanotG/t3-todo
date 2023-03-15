/* eslint-disable @next/next/no-img-element */
import { signIn, signOut, useSession } from "next-auth/react";

const NavBar = () => {
  const { data: sessionData } = useSession();

  return (
    <div className="navbar bg-base-100 mx-auto">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">
          Todo
        </a>
      </div>
      <div className="flex-none gap-2">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              {sessionData?.user.image && (
                <img
                  width="40"
                  height="40"
                  src={sessionData?.user.image}
                  alt="avatar"
                />
              )}
            </div>
          </label>
          <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
            <li>
              <a className="justify-between">
                Profile
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <button
                className=""
                onClick={sessionData ? () => void signOut() : () => void signIn()}
              >
                {sessionData ? "Sign out" : "Sign in"}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default NavBar;