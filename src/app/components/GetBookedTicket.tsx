"use client";

import { useEffect, useState } from "react";

interface GetBookedTicketProps {
  BookedTicketId: number;
}

interface bookedTicketProps {
  ticketCode: string;
  ticketName: string;
  eventDate: string;
}

interface ticketCategoryProps {
  qtyproperty: number;
  categoryName: string;
  tickets: bookedTicketProps[];
}

const BookedTicket: React.FC<GetBookedTicketProps>  = ({ BookedTicketId }) => {
  const [ticketCategories, setTicketCategories] = useState<ticketCategoryProps[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `http://localhost:5202/api/v1/get-booked-ticked/${BookedTicketId}`
        );

        if (!response.ok) throw new Error("Booked Ticket Not Found");

        const data: ticketCategoryProps[] = await response.json();
        console.log(data);
        setTicketCategories(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchTicket();
  }, [BookedTicketId]);
  
  if (loading) return <p className="text-blue-500">Loading tickets...</p>;
  if (error) return <p className="text-red-600 text-center">Error: {error}</p>;

  return (
    <div className="p-3 border border-gray-300 rounded-lg w-96 text-white ml-4 mt-3">
      <h2 className="text-xl font-bold text-center">Booked Tickets Details</h2>
      {ticketCategories.length > 0 ? (
        ticketCategories.map((category, index) => (
          <div key={index} className="mb-4">
            <h3 className="text-lg font-semibold">{category.categoryName}</h3>
            <ul className="list-disc pl-5">
              {category.tickets.map((tickets, idx) => (
                <li key={idx} className="mb-2">
                  <strong>{tickets.ticketName}</strong> - {tickets.eventDate} ({tickets.ticketCode})
                </li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <p>No tickets found.</p>
      )}
    </div>
  );
};

export default BookedTicket;
