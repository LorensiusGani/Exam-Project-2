import React from "react";
import Link from "next/link";
import { IoRocketOutline, IoPricetagOutline } from "react-icons/io5";
import { LuTicket } from "react-icons/lu";
import Image from "next/image";

const Information = () => {
  return (
    <>
      <div className="mt-5 text-center px-4">
        <h2 className="text-white font-bold text-3xl">Why Choose Acceloka</h2>
        <p className="text-neutral-200 font-semibold text-xl mt-2">
          Acceloka help you find and booking the best tickets easily and
          quickly.
        </p>
        <div className="flex gap-5 justify-center items-center mt-5">
          <button className="bg-white p-3 rounded text-[18px] font-bold w-20 hover:bg-black hover:text-white">
            <Link href="/PostBookedTicketPage">Book</Link>
          </button>
        </div>
      </div>

      {/* Card Fitur Unggulan */}
      <div className="mt-10 flex flex-wrap gap-10 justify-center mb-6">
        <div className="bg-white p-6 rounded-lg shadow-md w-72 text-center">
          <div>
            <h2 className="text-xl font-bold">
              <IoRocketOutline size={20} /> Fast and Easy Booking
            </h2>
            <Image
              src="/Assets/info-1.jpg"
              alt="Happy"
              height={160}
              width={300}
              className="mt-3 rounded"
            />
            <p className="mt-5 text-center text-[16px] font-medium">
              Our user-friendly system makes booking tickets easy simply select
              your event
            </p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md w-72 text-center">
          <div>
            <h2 className="text-xl font-bold">
              <IoPricetagOutline size={20} /> Best Deals for Price
            </h2>
            <Image
              src="/Assets/info-2.jpg"
              alt="Happier"
              height={160}
              width={300}
              className="mt-3 rounded"
            />
            <p className="mt-3 text-center text-[16px] font-medium">
              Our commitment ensures you access the best deals and exclusive
              promotions
            </p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md w-72 text-center">
          <div>
            <h2 className="text-xl font-bold">
              <LuTicket size={20} /> Wide Range of Tickets
            </h2>
            <Image
              src="/Assets/info-3.jpg"
              alt="Excited"
              height={160}
              width={300}
              className="mt-3 rounded"
            />
            <p className="mt-3 text-center text-[16px] font-medium">
              Our tickets cover a wide range of events for everyone
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Information;
