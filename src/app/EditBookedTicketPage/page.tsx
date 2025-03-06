"use client";

import { useState, useEffect } from "react";
import Button from "../components/Button"

interface EditBooked {
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

const EditBookedTicketPage: React.FC = () => {
  const [bookedTicketId, setBookedTicketId] = useState<number | null>(null);
  const [ticketData, setTicketData] = useState<EditBooked | null>(null);
  const [ticketCategories, setTicketCategories] = useState<
    ticketCategoryProps[]
  >([]);
  const [ticketCode, setTicketCode] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [updateTicket, setUpdateTicket] = useState<EditBooked[]>([]);
  const [error, setError] = useState<string>("");
  const [showUpdated, setShowUpdated] = useState(false);

  useEffect(() => {
    if (updateTicket.length > 0) {
      setShowUpdated(true);
      const timer = setTimeout(() => setShowUpdated(false), 8000);
      return () => clearTimeout(timer);
    }
  }, [updateTicket]);

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
        setTicketCode(firstTicket.ticketCode);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateBookedTicket = async () => {
    if (!bookedTicketId || !ticketCode || quantity < 1) {
      alert("Please enter valid booked ticket ID, ticket code, and quantity.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `http://localhost:5202/api/v1/edit-booked-ticket/${bookedTicketId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ticketCode,
            quantity,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update ticket");
      }

      const updatedData: EditBooked[] = await response.json();
      setUpdateTicket(updatedData);
      console.log(updatedData);
    } catch (error) {
      alert("Error updating ticket. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center mt-[50px]">
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
          <Button label="Load Data" onClick={fetchBookedTicket} loading={loading} />
          </div>
        </div>

        {/* Pesan Error */}
        {error && <p className="text-red-700 mt-2 text-center">{error}</p>}

        {/* Data untuk di Edit */}
        {ticketCategories.length > 0 ? (
          <div className="p-3 border-2 border-black rounded w-96 bg-white text-black ml-16 mt-12">
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
          <p className="text-red-700 mt-4 text-center font-bold">
            No tickets found
          </p>
        )}

        {/* Form untuk Update data */}
        {ticketData && ticketCategories.length > 0 && (
          <div className="bg-white text-black mt-5 mr-5 p-2 w-[500px]">
            <div className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="TicketCode"
                value={ticketCode}
                onChange={(e) => setTicketCode(e.target.value)}
                className="p-2 border border-black rounded mt-3"
              />
              <input
                type="text"
                placeholder="Enter Number"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="p-2 border border-black rounded mt-3 mb-3"
                min={1}
              />
              <div className="flex justify-center items-center">
              <Button label="Update Ticket" onClick={handleUpdateBookedTicket} loading={loading} variant="warning" />
              </div>
            </div>
          </div>
        )}

        {/* Show Updated Data */}
        {showUpdated && updateTicket.length > 0 && (
          <div className="mt-6 p-4 border-2 rounded border-black">
            <h2 className="text-2xl font-bold mb-4 text-center">
              Updated Ticket
            </h2>
            {updateTicket.map((ticket, index) => (
              <div key={index} className="mb-4">
                <p>
                  <strong>TicketCode:</strong> {ticket.ticketCode}
                </p>
                <p>
                  <strong>Name:</strong> {ticket.ticketName}
                </p>
                <p>
                  <strong>Category:</strong> {ticket.categoryName}
                </p>
                <p>
                  <strong>Quantity:</strong> {ticket.quantity}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EditBookedTicketPage;
