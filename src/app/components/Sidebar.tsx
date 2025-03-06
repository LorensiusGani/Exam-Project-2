"use client";

import { useState } from "react";
import {
  FiMenu,
  FiX,
  FiFileText,
  FiChevronDown,
  FiChevronUp,
} from "react-icons/fi";
import { FaHome } from "react-icons/fa";
import { LuTicketCheck } from "react-icons/lu";
import Link from "next/link";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <>
      {/* Mobile */}
      <button
        className="fixed top-5 right-5 z-50 p-2 bg-gray-700 rounded-md md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <FiX size={20} color="black" />
        ) : (
          <FiMenu size={20} color="#fff" />
        )}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-black text-white transform transition-transform duration-300 z-50 ${
          isOpen ? "translate-x-0" : "-translate-x-64"
        } md:translate-x-0 md:w-64`}
      >
        <div>
          <h1 className="p-5 mr-[20px] text-3xl font-bold text-center cursor-pointer"
          >
            Acceloka
          </h1>
        </div>
        <nav>
          <ul>
            <li>
              <Link
                href="/"
                className="flex items-center gap-3 p-3 text-[16px] font-semibold"
                onClick={() => setIsOpen(false)}
              >
                <FaHome size={18} />
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/GetTicketPage"
                className="flex items-center gap-3 p-3 text-[16px] font-semibold"
                onClick={() => setIsOpen(false)}
              >
                <FiFileText size={18} />
                Ticket Available
              </Link>
            </li>
            {/* Dropdown */}
            <li>
              <button
                className="flex items-center justify-between w-full p-3"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <h2 className="flex items-center gap-3 text-[16px] font-semibold">
                  <FiFileText size={18} /> Booking
                </h2>
                {isDropdownOpen ? (
                  <FiChevronDown size={18} />
                ) : (
                  <FiChevronUp size={18} />
                )}
              </button>

              {isDropdownOpen && (
                <ul>
                  <li>
                    <Link
                      href="/GetAllBookedTicketPage"
                      className="flex items-center gap-3 p-3 pl-8 font-semibold"
                      onClick={() => setIsOpen(false)}
                    >
                      <LuTicketCheck size={18} /> All Booking Ticket
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/GetBookedTicketPage"
                      className="flex items-center gap-3 p-3 pl-8 font-semibold"
                      onClick={() => setIsOpen(false)}
                    >
                      <LuTicketCheck size={18} /> Cek Booking Ticket
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/PostBookedTicketPage"
                      className="flex items-center gap-3 p-3 pl-8 font-semibold"
                      onClick={() => setIsOpen(false)}
                    >
                      <LuTicketCheck size={18} /> Booking Ticket
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/EditBookedTicketPage"
                      className="flex items-center gap-3 p-3 pl-8 font-semibold"
                      onClick={() => setIsOpen(false)}
                    >
                      <LuTicketCheck size={18} /> Edit Booking Ticket
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/DeleteBookedTicketPage"
                      className="flex items-center gap-3 p-3 pl-8 font-semibold"
                      onClick={() => setIsOpen(false)}
                    >
                      <LuTicketCheck size={18} /> Delete Booking Ticket
                    </Link>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </nav>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
