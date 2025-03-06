"use client";

import { useEffect, useState } from "react";

interface TicketResponseModel {
  tickets: TicketModel[];
  totalTickets: number;
}

interface TicketModel {
  eventDate: string;
  quota: number;
  ticketCode: string;
  ticketName: string;
  categoryName: string;
  price: number;
}

const TicketPage = () => {
  const [tickets, setTickets] = useState<TicketModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [orderBy, setOrderBy] = useState("ticketCode");
  const [orderState, setOrderState] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `http://localhost:5202/api/v1/get-available-ticket?orderBy=${orderBy}&orderState=${orderState}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Tickets Not Found");
        }

        const data: TicketResponseModel = await response.json();
        setTickets(data.tickets);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, [orderBy, orderState]);

  if (loading) {
    return <p className="text-blue-500">Loading tickets...</p>;
  }
  if (error) {
    return <p className="text-red-600 text-center">Error: {error}</p>;
  }

  return (
    <div className="flex flex-col justify-center items-center w-full text-white">
      <h1 className="text-white text-3xl font-bold my-4">Ticket Available</h1>
      <div className="flex flex-col justify-center items-center w-full font-semibold">
        <div className="container mx-auto p-4">
          {tickets.length > 0 ? (
            <>
              <table className="min-w-full border border-white">
                <thead>
                  <tr className="border border-black bg-white text-black">
                    <th className="p-2 text-center">No</th>
                    <th className="p-2 text-center">Ticket Code</th>
                    <th className="p-2 text-center">Ticket Name</th>
                    <th className="p-2 text-center">Event Date</th>
                    <th className="p-2 text-center">Category</th>
                    <th className="p-2 text-center">Price</th>
                    <th className="p-2 text-center">Quota</th>
                  </tr>
                </thead>
                <tbody>
                  {tickets.map((ticket, index) => (
                    <tr
                      key={index}
                      className="border border-black bg-white text-black"
                    >
                      <td className="p-2 text-center">{index + 1}</td>
                      <td className="p-2 text-center">{ticket.ticketCode}</td>
                      <td className="p-2 text-center">{ticket.ticketName}</td>
                      <td className="p-2 text-center">{ticket.eventDate}</td>
                      <td className="p-2 text-center">{ticket.categoryName}</td>
                      <td className="p-2 text-center">{ticket.price}</td>
                      <td className="p-2 text-center">{ticket.quota}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="mt-4 text-center text-[24px] font-bold">
                Total Ticket {tickets.length}
              </p>
            </>
          ) : (
            <p className="text-red-600 text-center">No tickets available</p>
          )}

          <div className="flex justify-center items-center gap-5 mt-5">
            <h1 className="text-xl font-bold">Sort By</h1>
            <select
              value={orderBy}
              onChange={(e) => setOrderBy(e.target.value)}
              className="p-2 text-black font-semibold"
            >
              <option value="ticketCode">TicketCode</option>
              <option value="ticketName">TicketName</option>
              <option value="categoryName">Category</option>
              <option value="price">Price</option>
              <option value="eventDate">Event Date</option>
            </select>
            <select
              value={orderState}
              onChange={(e) => setOrderState(e.target.value as "asc" | "desc")}
              className="p-2 text-black font-semibold"
            >
              <option value="asc">Ascending</option>
              <option value="desc"> Descending</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketPage;
