"use client";

import { useState } from "react";

interface Ticket {
  ticketCode: string;
  quantity: number;
}

interface BookedResponse {
  priceSummary: number;
  ticketsPerCategories: {
    categoryName: string;
    summaryPrice: number;
    tickets: {
      ticketCode: string;
      ticketName: string;
      price: number;
    }[];
  }[];
}

const PostBookTicket: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [ticketCode, setTicketCode] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [bookingResult, setBookingResult] = useState<BookedResponse | null>(
    null
  );

  const addTicket = () => {
    if (!ticketCode) {
      alert("Ticket Code is required");
      return;
    }

    setTickets([...tickets, { ticketCode, quantity }]);
    setTicketCode("");
    setQuantity(1);
  };

  const bookTickets = async () => {
    if (tickets.length === 0) {
      alert("Please add at least one ticket before booking.");
      return;
    }
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5202/api/v1/book-ticket", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tickets }),
      });

      if (!response.ok) {
        throw new Error("Failed to book tickets");
      }

      const resultData: BookedResponse = await response.json();
      setBookingResult(resultData);
      setTickets([]);
    } catch (error) {
      alert("Error booking tickets. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w mx-auto p-4 border rounded bg-white">
      <h1 className="text-xl font-bold mb-4 text-center text-black">Book Tickets</h1>

      <div className="space-y-2">
        <input
          type="text"
          placeholder="Enter Ticket Code"
          value={ticketCode}
          onChange={(e) => setTicketCode(e.target.value)}
          className="border p-2 rounded w-full text-black border-black"
        />
        <input
          type="number"
          placeholder="Enter Quantity"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
          className="border p-2 rounded w-full text-black border-black"
          min={1}
        />
        <button
          onClick={addTicket}
          className="text-white bg-blue-500 px-4 py-2 rounded w-full"
        >
          Add Ticket
        </button>
      </div>

      <div className="mt-4">
        {tickets.length === 0 ? (
          <p className="text-black font-bold text-center">No tickets added.</p>
        ) : (
          <ul className="space-y-3">
            {tickets.map((ticket, num) => (
              <li key={num} className="border p-2 rounded text-black border-black">
                {ticket.ticketCode} - {ticket.quantity} pcs
              </li>
            ))}
          </ul>
        )}
      </div>

      <button
        onClick={bookTickets}
        className="text-white bg-blue-500 px-4 py-2 rounded w-full mt-5"
        disabled={loading}
      >
        {loading ? "Booking..." : "Book Tickets"}
      </button>

      {/* Hasil Book Ticket */}
      {bookingResult && (
        <div className="mt-6 border p-4 rounder bg-black text-white">
          <h2 className="text-lg font-semibold">Booking Summary</h2>
          <p>
            Total Price: Rp{bookingResult.priceSummary.toLocaleString("id-ID")}
          </p>
          {bookingResult.ticketsPerCategories.map((category, idx) => (
            <div key={idx} className="mt-3">
              <h3 className="font-normal">Category Name: {category.categoryName}</h3>
              <p>
                Summary Price: Rp {category.summaryPrice.toLocaleString("id-ID")}
              </p>
              <ul>
                {category.tickets.map((ticket, tIdx) => (
                  <li key={tIdx} className="text-sm">
                    {ticket.ticketCode} - {ticket.ticketName}: Rp {ticket.price.toLocaleString("id-ID")}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostBookTicket;
