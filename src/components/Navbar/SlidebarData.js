import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as HiIcons from "react-icons/hi";
import * as IoIcons from "react-icons/io";

export const SlidebarData = [
  {
    title: "Home",
    path: "/home",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
  },
  {
    title: "Academic Year",
    path: "/newacademicyear",
    icon: <FaIcons.FaRegCalendarAlt />,
    cName: "nav-text",
  },
  {
    title: "Committees",
    path: "/publicview",
    icon: <IoIcons.IoIosPeople />,
    cName: "nav-text",
  },
  {
    title: "Report",
    path: "/reports",
    icon: <HiIcons.HiOutlineDocumentReport />,
    cName: "nav-text",
  },
  {
    title: "Signout",
    path: "/",
    icon: <FaIcons.FaSignOutAlt />,
    cName: "nav-text",
  },
];
