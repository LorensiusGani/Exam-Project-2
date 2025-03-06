"use client";

import {useState } from "react";
import PDFTicketReport from "../components/DownloadBookedTicketById";
import Button from "../components/Button"; 

interface BookedTicketProps {
  ticketCode: string;
  ticketName: string;
  eventDate: string;
}

interface TicketCategoryProps {
  qtyProperty: number;
  categoryName: string;
  tickets: BookedTicketProps[];
}

const BookedTicketPage: React.FC = () => {
  const [bookedTicketId, setBookedTicketId] = useState<number | null>(null);
  const [searchTicket, setSearchTicket] = useState(false);
  const [ticketCategories, setTicketCategories] = useState<TicketCategoryProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const fetchTicket = async (bookedTicketId: number) => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `http://localhost:5202/api/v1/get-booked-ticked/${bookedTicketId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Booked Ticket Not Found");
      }

      const data: any[] = await response.json();

      const formattedData: TicketCategoryProps[] = data.map((category) => ({
        qtyProperty: category.qtyProperty ?? 0,
        categoryName: category.categoryName ?? "Unknown Category",
        tickets: Array.isArray(category.tickets) ? category.tickets : [],
      }));

      setTicketCategories(formattedData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (bookedTicketId !== null && bookedTicketId > 0) {
      setSearchTicket(true);
      fetchTicket(bookedTicketId);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center mt-[80px] bg-white p-4 w-[600px] ml-[250px]">
      <h1 className="text-2xl font-bold mb-4">Search Booked Ticket</h1>
      <div className="flex flex-col">
        <input
          type="text"
          placeholder="Input BookedTicketID"
          className="border p-2 rounded-md mb-4 text-black"
          onChange={(e) => {
            const value = e.target.value.trim();
            const numValue = Number(value);
            setBookedTicketId(!isNaN(numValue) && numValue > 0 ? numValue : null);
            setSearchTicket(false);
          }}
        />
       <Button label="Search" onClick={handleSearch} loading={loading}
        />
      </div>
      
      {loading && <p className="text-center text-gray-500">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      
      {searchTicket && bookedTicketId !== null && bookedTicketId > 0 && (
        <div className="mt-3 border-4 border-black p-4 w-full">
          <h2 className="text-2xl font-bold text-center">Booked Ticket For {bookedTicketId}</h2>
          <div className="p-4 border-2 border-white bg-white text-black">
            <h2 className="text-xl font-bold text-center mb-3">Booked Tickets Details</h2>
            {ticketCategories.length > 0 ? (
              ticketCategories.map((category, index) => (
                <div key={index} className="mb-8">
                  <h3 className="text-lg font-semibold">Qty: {category.qtyProperty}</h3>
                  <h3 className="text-lg font-semibold">Category: {category.categoryName}</h3>
                  <ul className="list-disc pl-5">
                    {category.tickets.map((ticket, idx) => (
                      <li key={idx} className="mb-2">
                        <strong>{ticket.ticketName}</strong> - {ticket.eventDate} ({ticket.ticketCode})
                      </li>
                    ))}
                  </ul>
                </div>
              ))
            ) : (
              <p className="text-center">No tickets found.</p>
            )}
          </div>

          <div className="flex justify-center mb-4">
            <PDFTicketReport bookedTicketId={bookedTicketId} />
          </div>
        </div>
      )}
    </div>
  );
};

export default BookedTicketPage;
