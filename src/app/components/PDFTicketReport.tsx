"use client"

import {useState} from "react";

const PDFTicketReport: React.FC = () => {
    const [loading, setLoading] = useState(false);

    const downloadPDF = async (event: React.MouseEvent) => {
        event.preventDefault();
        setLoading(true);

        try{
            const response = await fetch("http://localhost:5202/api/v1/download-pdf-ticket", {
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
            filename.download = "TicketReport.pdf";

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
        <div className="my-6">
            <button
            onClick={downloadPDF}
            className="bg-blue-500 text-white px-3 py-2 rounded-lg"
            disabled={loading}
            >   
            {loading ? "Downloading" : "Download Report"}
            </button>
        </div>
    )

}

export default PDFTicketReport;