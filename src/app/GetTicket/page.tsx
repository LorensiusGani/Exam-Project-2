import React from "react";
import Ticket from "../components/Ticket";
import PDFTicketReport from "../components/PDFTicketReport";


const TicketPage = () => {
    return(
        <div className="flex flex-col justify-center items-center  bg-gray-900 text-white">
            <h1 className="text-white text-3xl font-bold my-5">Ticket</h1> 
            <Ticket />
            <PDFTicketReport />
        </div>
    );
};

export default TicketPage;