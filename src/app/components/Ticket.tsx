"use client"

import { useEffect, useState } from "react";

interface TicketResponseModel{
    tickets: TicketModel[];
    totalTickets: number;
}

interface TicketModel{
    eventDate: string;
    quota : number;
    ticketCode : string;
    ticketName : string;
    categoryName : string;
    price : number;
}

const Ticket: React.FC = () => {
    const [tickets, setTickets] = useState<TicketModel[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await fetch(
                    `http://localhost:5202/api/v1/get-available-ticket`
                );

                if (!response.ok) throw new Error("Tickets Not Found");

                const data: TicketResponseModel = await response.json();
                console.log(data);
                setTickets(data.tickets);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Unknown error occurred");
            } finally {
                setLoading(false);
            }
        };

        fetchTickets();
    }, []);

    if (loading) return <p className="text-blue-500">Loading tickets...</p>;
    if (error) return <p className="text-red-600 text-center">Error: {error}</p>;

    return (
        <div className="p-3 border border-gray-300 rounded-lg w-96 text-white ml-4 mt-3">
            {tickets.length > 0 ? (
                tickets.map((ticket, index) => (
                    <div key={index} className="border border-gray-300 rounded-lg p-3 mt-3">
                        <h3 className="text-xl font-bold">{ticket.ticketName}</h3>
                        <p>Event Date: {ticket.eventDate}</p>
                        <p>Category: {ticket.categoryName}</p>
                        <p>Price: {ticket.price}</p>
                        <p>Quota: {ticket.quota}</p>

                    </div>
                ))
            ) : (
                <p className="text-red-600 text-center">No tickets available</p>
            )}
            <h2 className="mt-3 font-semibold text-xl">Total Tickets : {tickets.length}</h2>
        </div>
    );
}

export default Ticket;