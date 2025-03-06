"use client"

import {useState} from "react";

interface PDFTicketReportProps {
    bookedTicketId: number;
  }

const PDFTicketReport: React.FC<PDFTicketReportProps> = ({ bookedTicketId }) => {
    const [loading, setLoading] = useState(false);

    const downloadPDF = async (event: React.MouseEvent) => {
        event.preventDefault();
        setLoading(true);

        try{
            const response = await fetch(`http://localhost:5202/api/v1/download-pdf-booked-ticket/${bookedTicketId}`, {
                method: "GET",
                headers: {
                    "Accept": "application/pdf" 
                }
            });
            
            if(!response.ok){
                throw new Error("Can't downnload PDF");
            }

            const dataBlob = await response.blob();
            const downloadUrl = URL.createObjectURL(dataBlob);

            const filename = document.createElement("a");
            filename.href = downloadUrl;
            filename.download = `BookedTicket_${bookedTicketId}.pdf`;

            document.body.appendChild(filename);
            filename.click();
            window.URL.revokeObjectURL(downloadUrl);    
            document.body.removeChild(filename);

        }
        catch(err){
            console.log("Terjadi kesalahan:",err);
        }finally{
            setLoading(false);
        }
    };

    return (
        <div className="my-3">
            <button
            onClick={downloadPDF}
            className="bg-black text-white font-bold px-3 py-2 rounded-lg hover:bg-gray-700"
            disabled={loading}
            >   
            {loading ? "Downloading" : "Download Ticket"}
            </button>
        </div>
    )

}

export default PDFTicketReport;