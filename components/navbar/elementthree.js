import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import MedicationLiquidIcon from "@mui/icons-material/MedicationLiquid";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import MicrowaveIcon from "@mui/icons-material/Microwave";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import ComputerIcon from "@mui/icons-material/Computer";
import CableIcon from "@mui/icons-material/Cable";
import DiamondIcon from "@mui/icons-material/Diamond";
import ChildFriendlyIcon from "@mui/icons-material/ChildFriendly";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import DownhillSkiingIcon from "@mui/icons-material/DownhillSkiing";
import CategoryIcon from "@mui/icons-material/Category";

import MenuIcon from "@mui/icons-material/Menu";
import SidebarMenuItem from "../header/SidebarMenuItem";
import { useSession, signIn, signOut } from "next-auth/react";
import { Cookies } from "react-cookie";
import Link from "next/link";
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Elementthree() {
  const router = useRouter();
  const { data: session } = useSession();
  const cookie = new Cookies();
  const userId = cookie.get("userId");
  const [user, setUser] = useState(null);
  const [click, setClick] = useState(false);

  useEffect(() => {
    if (!userId) return;

    const fetchUser = async () => {
      try {
        const response = await fetch(`/api/users/${userId}`);

        if (!response.ok) {
          const errorData = await response.json();
          return;
        }

        const data = await response.json();
        setUser(data);
        console.log(data);
        // console.log(data);
      } catch (err) {
        console.error("Error fetching user:", err);
        setError("Error fetching user");
      }
    };

    fetchUser();
  }, []);
  return (
    <>
      <div className="dropdown dropdown-bottom cursor-pointer md:hidden">
        <label tabIndex={0} className="  m-1">
          <MenuIcon
            className="my-auto ml-1 mt-3"
            onClick={() => setClick(true)}
          />
        </label>
        <div
          tabIndex={0}
          className={
            click
              ? "dropdown-content hidden h-[101vh] mt-[-2.3rem] p-2 shadow bg-base-100 rounded-box w-52"
              : "dropdown-content  h-[101vh] mt-[-2.3rem] p-2 shadow bg-base-100 rounded-box w-52"
          }
        >
          <div className="items-start mt-0 w-[15rem] bg-white p-2 mx-2 h-[100%] ">
            <div className=" md:inline ">
              {user !== null ? (
                <div>
                  <h3
                    className="my-auto mb-3 mt-3 cursor-pointer "
                    onClick={() => router.push("/profile")}
                  >
                    HI, {user?.name || user?.email}
                  </h3>
                </div>
              ) : (
                <a
                  href="/login"
                  // onClick={signIn}
                  className=" text-primary border px-4  py-2 rounded-lg hover:text-white hover:bg-primary border-primary "
                >
                  LOGIN / SIGN UP
                </a>
              )}
            </div>

            {user && (
              <div className="mt-5  text-red-500 text-xl my-2">
                <CableIcon />
                <Link href="/upload" className="ml-2">
                  upload a product
                </Link>
              </div>
            )}

            <div
              onClick={() => setClick(false)}
              className="border-y-2 py-3 w-[80%] mt-10"
            >
              <SidebarMenuItem
                link="services"
                text="Services"
                Icon={MicrowaveIcon}
              />

              <SidebarMenuItem
                link="property"
                text="land and property"
                Icon={HomeWorkIcon}
              />
              <SidebarMenuItem
                link="electronics"
                text="electronics"
                Icon={PhoneAndroidIcon}
              />

              <SidebarMenuItem
                link="fashion"
                text="Fashion"
                Icon={DiamondIcon}
              />

              <SidebarMenuItem
                link="beauty"
                text="Health & Beauty"
                Icon={MedicationLiquidIcon}
              />

              <SidebarMenuItem
                link="sports"
                text="Sporting Goods"
                Icon={DownhillSkiingIcon}
              />
              <SidebarMenuItem
                link="others"
                text="Other Categories"
                Icon={CategoryIcon}
              />
            </div>

            <div className="mt-10 w-[90%] text-center md:inline ">
              {user !== null && (
                <h3
                  href="/login"
                  onClick={signOut}
                  className=" text-primary border px-4 py-2 rounded-lg hover:text-white hover:bg-primary border-primary "
                >
                  <h3>LOGOUT </h3>
                </h3>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
