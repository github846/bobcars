/*import React from "react";
import InvoiceItem from "./InvoiceItem";
import api from "../../API/carleasing";
import classes from "../Layout/MyList.module.css";

function InvoiceList(props)
{
    const deleteHandler = async (id) =>
    {
        try
        {
            await api.delete("/invoices/"+ id); // using api for request
            props.refresh();
        }
        catch(error)
        {
            console.log(error);
        }
    };

    return (
        <div className={classes.my_container}> 
            {props.invoices.map((invoice) => {
                return (
                    <InvoiceItem  key="{invoice}" invoice={invoice} onDelete={deleteHandler}/>
                );
            })}
        </div>
    )
}

export default InvoiceList;*/