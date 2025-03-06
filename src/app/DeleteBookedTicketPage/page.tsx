"use client";

import { useState, useEffect } from "react";
import React from "react";
import Button from "../components/Button";

interface DeleteBooked {
  ticketCode: string;
  ticketName: string;
  quantity: number;
  categoryName: string;
}

interface bookedTicketProps {
  ticketCode: string;
  ticketName: string;
  eventDate: string;
}

interface ticketCategoryProps {
  qtyProperty: number;
  categoryName: string;
  tickets: bookedTicketProps[];
}

const DeleteBookedTicketPage: React.FC = () => {
  const [bookedTicketId, setBookedTicketId] = useState<number | null>(null);
  const [deletedTickets, setDeletedTickets] = useState<DeleteBooked[]>([]);
  const [kodeTicket, setKodeTiket] = useState("");
  const [qty, setQty] = useState<number>(1);
  const [error, setError] = useState<string>("");
  const [ticketData, setTicketData] = useState<DeleteBooked | null>(null);
  const [loading, setLoading] = useState(false);
  const [ticketCategories, setTicketCategories] = useState<
    ticketCategoryProps[]
  >([]);
  const [showUpdated, setShowUpdated] = useState(false);

  useEffect(() => {
    if (deletedTickets.length > 0) {
      setShowUpdated(true);
      const timeout = setTimeout(() => setShowUpdated(false), 4000);
      return () => clearTimeout(timeout);
    }
  }, [deletedTickets]);

  useEffect(() => {
    setError("");
  }, [bookedTicketId]);

  const fetchBookedTicket = async () => {
    if (!bookedTicketId) {
      setError("Please enter a valid booked ticket ID.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setTicketCategories([]);
      setTicketData(null);

      const response = await fetch(
        `http://localhost:5202/api/v1/get-booked-ticked/${bookedTicketId}`
      );

      const data: ticketCategoryProps[] = await response.json();
      if (data.length === 0) {
        throw new Error("Booked Ticket Not Found");
      }
      setTicketCategories(data);

      if (data.length > 0 && data[0].tickets.length > 0) {
        const firstTicket = data[0].tickets[0];
        setTicketData({
          ticketCode: firstTicket.ticketCode,
          ticketName: firstTicket.ticketName,
          quantity: 1,
          categoryName: data[0].categoryName,
        });
        setKodeTiket(firstTicket.ticketCode);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBooked = async () => {
    if (!bookedTicketId || !kodeTicket || !qty) {
      setError("Please fill all the fields");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `http://localhost:5202/api/v1/revoke-ticket/${bookedTicketId}/${kodeTicket}/${qty}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const deleteData: DeleteBooked[] = await response.json();
      setDeletedTickets(deleteData);

      fetchBookedTicket();

      if (!response.ok) {
        throw new Error("Error Deleting Ticket");
      }
    } catch (err) {
      setLoading(false);
      setError(error);
    }
  };

  return (
    <div className="flex justify-center items-center mt-[50px]">
      <div className="flex flex-col justify-center items-center bg-white text-black mb-10">
        <div className="p-5 bg-white text-black">
          <h1 className="text-2xl font-bold mb-4 text-center">
            Input Booked Ticket ID
          </h1>
          {/* Input Booked Ticket ID */}
          <div className="flex w-[500px] h-[100px] flex-col gap-3">
            <input
              type="text"
              placeholder="Input here"
              value={bookedTicketId !== null ? bookedTicketId : ""}
              onChange={(e) => setBookedTicketId(Number(e.target.value))}
              className="p-2 border border-black rounded"
            />
            <div className="flex justify-center items-center mt-2">
              <Button label="Load Data" onClick={fetchBookedTicket} loading={loading}/>
            </div>
          </div>
        </div>

        {/* Pesan Error */}
        {error && <p className="text-red-700 mt-2 text-center">{error}</p>}

        {/* Data untuk di Delete */}
        {ticketCategories.length > 0 ? (
          <div className="p-3 border-2 border-black rounded w-96 bg-white text-black ml-4 mt-8">
            <h2 className="text-xl font-bold text-center">
              Booked Tickets Details
            </h2>
            {ticketCategories.map((category, index) => (
              <div key={index} className="mb-4">
                <h3 className="text-lg font-semibold">
                  Qty: {category.qtyProperty}
                </h3>
                <h3 className="text-lg font-semibold">
                  Category: {category.categoryName}
                </h3>
                <ul className="list-disc pl-5">
                  {category.tickets.map((ticket, idx) => (
                    <li key={idx} className="mb-2">
                      <strong>{ticket.ticketName}</strong> - {ticket.eventDate}{" "}
                      ({ticket.ticketCode})
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-red-700 mb-4 text-center font-bold">
            No tickets found
          </p>
        )}

        {ticketData && ticketCategories.length > 0 && (
          <div className="flex flex-col items-center mt-4 mb-5">
            <h1 className="text-2xl font-bold mb-4 mt-5">
              Delete Booked Ticket
            </h1>
            <input
              type="text"
              placeholder="Enter Booked Ticket ID"
              value={bookedTicketId !== null ? bookedTicketId : ""}
              onChange={(e) => setBookedTicketId(Number(e.target.value))}
              className="border border-black rounded p-2 mb-2"
            />
            <input
              type="text"
              placeholder="Enter Ticket Code"
              value={kodeTicket}
              onChange={(e) => setKodeTiket(e.target.value)}
              className="border border-black rounded p-2 mb-2"
            />
            <input
              type="text"
              placeholder="Enter Quantity"
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
              className="border border-black rounded p-2 mb-2"
            />
            {error && <p className="text-red-500">{error}</p>}
            <Button label="Delete" onClick={handleDeleteBooked} loading={loading} variant="danger" />
          </div>
        )}

        {showUpdated && deletedTickets.length > 0 && (
          <div className="mt-2 mb-6 p-4 border-2 rounded border-black">
            <h2 className="text-2xl font-bold mb-4 text-center">
              Remaining Tickets
            </h2>
            <p>
              <strong>TicketCode:</strong> {deletedTickets[0].ticketCode}
            </p>
            <p>
              <strong>Name:</strong> {deletedTickets[0].ticketName}
            </p>
            <p>
              <strong>Category:</strong> {deletedTickets[0].categoryName}
            </p>
            <p>
              <strong>Quantity:</strong> {deletedTickets[0].quantity}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeleteBookedTicketPage;
