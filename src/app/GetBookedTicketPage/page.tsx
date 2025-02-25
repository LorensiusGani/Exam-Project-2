"use client"

import React from "react";
import BookedTicket from "../components/GetBookedTicket";

const BookedTicketPage: React.FC = () => {
    const [bookedTicketId, setBookedTicketId] = React.useState<number | null>(null);

    return (
        <div className="flex flex-col justify-center items-center h-screen bg-gray-900 text-white">
          <h1 className="text-2xl font-bold mb-2">Search Booked Ticket</h1>
          <input
            type="text"
            placeholder="Enter BookedTicketID"
            className="border p-2 rounded-md mb-4 text-black"
            onChange={(e) => setBookedTicketId(Number(e.target.value))}
          />
          {bookedTicketId !== null && bookedTicketId > 0 && (
            <div>
                <h2 className="text-2xl flex justify-center items-center">
                  Booked Ticket For {bookedTicketId}
                </h2>
                <BookedTicket BookedTicketId={bookedTicketId} />
            </div>
          )}
        </div>
      );
};

export default BookedTicketPage;