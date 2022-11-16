import React, { useContext, useState, useRef } from "react";
import classes from "../Layout/MyForm.module.css";
import api from "../../API/carleasing";
import { Link, useNavigate } from "react-router-dom"; // for redirects
import MainContext from "../../Store/Main";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function NewInvoiceForm()
{
    let navigate = useNavigate();
    const context = useContext(MainContext);
    const invoice = context.invoice;
    const paymentDateInputRef = useRef(''); 
    const amountInputRef = useRef('');
    const addressInputRef = useRef('');
    const contractInputRef = useRef('');

    const submitHandler = async(e) =>
    {
        e.preventDefault();

        const paymentDateValue = paymentDateInputRef.current.value;
        const amountValue = amountInputRef.current.value;
        const addressValue = addressInputRef.current.value;
        const contractValue = contractInputRef.current.value;
        
        const newInvoice = // creating new object with input values
        {
            paymentDate: paymentDateValue,
            amount: amountValue,
            address: addressValue,
            contract: {id: contractValue}
        };

        try
        {
            let response;
            if (context.action === "editInvoice") // when accessed from existing object
            {
                response = await api.put("/invoices/" + invoice.id , newInvoice);
                context.setAction("");
                context.setInvoice(null);
            }
            else // when accessed from menu
            {
                response = await api.post("/invoices/", newInvoice);
                console.log(response);
            }
            navigate("/invoices"); // redirect to list
            console.log(response);
            
        }
        catch(error)
        {
            console.log(error);
        }
    }

    return(
        <div>
            <form onSubmit={submitHandler} className={classes.form_container}>
            <div className={classes['input_group']}>
                    <label htmlFor="paymentDate">Date de paiement</label>
                    <input type="date" name="paymentDate" id="paymentDate" required 
                    ref={paymentDateInputRef} defaultValue={context.action === "editInvoice" ? invoice.paymentDate : ""} />
                </div>
                <div className={classes['input_group']}>
                    <label htmlFor="amount">Montant</label>
                    <input type="number" name="amount" id="amount" required 
                    ref={amountInputRef} defaultValue={context.action === "editInvoice" ? invoice.amount : ""} />
                </div>
                <div className={classes['input_group']}>
                    <label htmlFor="address">Adresse</label>
                    <input type="text" name="address" id="address" 
                    ref={addressInputRef} defaultValue={invoice ? invoice.address : ""} required />
                </div>
                <div className={classes["input_group"]}>
                    <label htmlFor="contract">Contrat</label>
                    <div className={classes.cta}>
                        <input type="date" name="contract" id="contract" value={context.contract ? context.contract.signDate : ""} required ref={contractInputRef} />
                        <Link to="/searchcontract">
                            <button><FontAwesomeIcon icon={faMagnifyingGlass} className={classes["cta-icon"]}></FontAwesomeIcon> Find contract</button>
                        </Link>
                    </div>
                </div>
                <div className={classes['submit_group']}>
                    <input type="submit" name="submit" id="submit" value="Confirm save" required />
                </div>
            </form>
        </div>
    )
}

export default NewInvoiceForm;