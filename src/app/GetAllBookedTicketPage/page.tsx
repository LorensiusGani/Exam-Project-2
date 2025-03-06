"use client";

import { useEffect, useState } from "react";

interface bookedTicketModel {
  qty: number;
  categoryName: string;
  bookTicketId: number;
  ticketCode: string;
  ticketName: string;
  price: number;
}

const AllBookedPage = () => {
  const [booktickets, setBookTickets] = useState<bookedTicketModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchBookTicket = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `http://localhost:5202/api/v1/get-All-Booked-Ticket`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Bookedtickets Not Found");
        }

        const data = await response.json();
        setBookTickets(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error occurred");
      } finally {
        setLoading(false);
      }
    };
    fetchBookTicket();
  }, []);

  if (loading) {
    return <p className="text-blue-500">Loading tickets...</p>;
  }
  if (error) {
    return <p className="text-red-600 text-center">Error: {error}</p>;
  }

  return (
    <div className="flex flex-col justify-center items-center w-full text-white">
      <h1 className="text-white text-3xl font-bold my-4">Booked Ticket</h1>
      <div className="flex flex-col justify-center items-center w-full font-semibold">
        <div className="container mx-auto p-4">
          {booktickets.length > 0 ? (
            <>
              <table className="min-w-full border border-white">
                <thead>
                  <tr className="border border-black bg-white text-black">
                    <th className="p-2 text-center">No</th>
                    <th className="p-2 text-center">BookedTicketID</th>
                    <th className="p-2 text-center">Ticket Code</th>
                    <th className="p-2 text-center">Ticket Name</th>
                    <th className="p-2 text-center">Category</th>
                    <th className="p-2 text-center">Price</th>
                    <th className="p-2 text-center">Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {booktickets.map((book, index) => (
                    <tr
                      key={index}
                      className="border border-black bg-white text-black"
                    >
                      <td className="p-2 text-center">{index + 1}</td>
                      <td className="p-2 text-center">{book.bookTicketId}</td>
                      <td className="p-2 text-center">{book.ticketCode}</td>
                      <td className="p-2 text-center">{book.ticketName}</td>
                      <td className="p-2 text-center">{book.categoryName}</td>
                      <td className="p-2 text-center">{book.price}</td>
                      <td className="p-2 text-center">{book.qty}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="mt-4 text-center text-[24px] font-bold">
                Total Ticket {booktickets.length}
              </p>
            </>
          ) : (
            <p className="text-red-600 text-center">No tickets available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllBookedPage;
