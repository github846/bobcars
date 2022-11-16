import React from "react";
import InvoiceList from "../Component/Invoice/InvoiceList";
import api from "../API/carleasing.js";
import { useState, useEffect } from "react";

function AllInvoices() {
    const [invoices, setInvoices] = useState([]);

    useEffect(() => {
        getInvoices();
    }, []);

    const getInvoices = async () => {
        try {
            const result = await api.get("/invoices/");
            setInvoices(result.data);
        }
        catch (error) {
            console.log(error);
        }
    };

    return (
        <div><h2>All invoices</h2>
            <InvoiceList invoices={invoices} refresh={getInvoices} />
        </div>
    )

}
export default AllInvoices;