/*import React from "react";
import SearchInvoiceForm from "../Component/Invoice/SearchInvoiceForm";
import InvoiceItem from "../Component/Invoice/InvoiceItem";
import { useState } from "react";

function SearchInvoice()
{
    const [invoice, setInvoice] = useState(null);

    const findInvoice = (foundInvoice) =>
    {
        setInvoice(foundInvoice);
    }

    return (

        <div>
          <h2>Chercher une facture</h2>
            <SearchInvoiceForm setInvoice={findInvoice} />
            {invoice && <InvoiceItem invoice={invoice} />}
        </div>
      );

}
export default SearchInvoice*/