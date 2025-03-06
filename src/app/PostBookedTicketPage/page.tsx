"use client";

import { useState } from "react";
import Button from "../components/Button";

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

const PostBookedTicketPage = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [ticketCode, setTicketCode] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [bookingResult, setBookingResult] = useState<BookedResponse | null>(
    null
  );

  const resetDataTickets = () => {
    setTickets([]);
  };

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
      console.log(resultData);

      setTimeout(() => {
        setBookingResult(null);
      }, 5000);
    } catch (error) {
      alert("Error booking tickets. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center text-white mt-[50px]">
      <div className="max-w mx-auto p-4 border rounded bg-white">
        <h1 className="text-2xl font-bold mb-4 text-center text-black">
          Book Tickets
        </h1>
        <div className="space-y-2">
          <input
            type="text"
            placeholder="Input Ticket Code"
            value={ticketCode}
            onChange={(e) => setTicketCode(e.target.value)}
            className="border p-2 rounded w-full text-black border-black"
          />
          <input
            type="text"
            placeholder="Input Quantity"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="border p-2 rounded w-full text-black border-black"
            min={1}
          />
          <div className="flex justify-center items-center">
            <Button label="Add Ticket" onClick={addTicket} loading={loading} />
          </div>
        </div>

        <div className="mt-4">
          {tickets.length === 0 ? (
            <p className="text-red-700 font-bold text-center">
              No tickets added.
            </p>
          ) : (
            <table className="min-w-full border border-white">
              <thead>
                <tr className="border border-black bg-white text-black">
                  <th className="p-2 text-center">No</th>
                  <th className="p-2 text-center">Ticket Code</th>
                  <th className="p-2 text-center">Quantity</th>
                </tr>
              </thead>
              <tbody>
                {tickets.map((ticket, num) => (
                  <tr
                    key={num}
                    className="border border-black bg-white text-black"
                  >
                    <td className="p-2 text-center">{num + 1}</td>
                    <td className="p-2 text-center">{ticket.ticketCode}</td>
                    <td className="p-2 text-center">{ticket.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="flex justify-center items-center gap-5">
          <Button
            label="Book Tickets"
            onClick={bookTickets}
            loading={loading}
          />
          <Button
            label="Reset"
            onClick={resetDataTickets}
            loading={loading}
            variant="gray"
          />
        </div>

        {/* Hasil Book Ticket */}
        {bookingResult && (
          <div className="mt-6 border p-4 rounded bg-black text-white">
            <h2 className="text-lg font-semibold">Booking Summary</h2>
            <p>
              Total Price: Rp
              {bookingResult.priceSummary.toLocaleString("id-ID")}
            </p>
            {bookingResult.ticketsPerCategories.map((category, idx) => (
              <div key={idx} className="mt-3">
                <h3 className="font-normal">
                  Category Name: {category.categoryName}
                </h3>
                <p>
                  Summary Price: Rp{" "}
                  {category.summaryPrice.toLocaleString("id-ID")}
                </p>
                <ul>
                  {category.tickets.map((ticket, tIdx) => (
                    <li key={tIdx} className="text-sm">
                      {ticket.ticketCode} - {ticket.ticketName}: Rp{" "}
                      {ticket.price.toLocaleString("id-ID")}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PostBookedTicketPage;
