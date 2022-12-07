import React, { useContext, useRef, useState, useEffect } from "react";
import classes from "../Layout/MyForm.module.css";
import api from "../../API/carleasing";
import { useNavigate } from "react-router-dom";
import MainContext from "../../Store/Main";

function NewContractForm()
{
    const context = useContext(MainContext);
    const contract = context.contract;
    const [dateError, setDateError] = useState(false);
    // const [amountError, setAmountError] = useState(false);
    const signDateInputRef = useRef('');
    const contractStartInputRef = useRef('');
    const contractEndInputRef = useRef('');
    const dailyPriceInputRef = useRef('');
    /*const advanceInputRef = useRef('');
    const remainderInputRef = useRef('');
    const returnPlaceInputRef = useRef('');*/
    const carInputRef = useRef('');
    const clientInputRef = useRef('');
    // const invoiceInputRef = useRef('');
    let navigate = useNavigate();

    const [clients, setClients] = useState([]);
    const [cars, setCars] = useState([]);
    // const [invoices, setInvoices] = useState([]);

    useEffect(() =>
    {
        getClients();
        getCars();
        // getInvoices();
    }, []);

    const getClients = async () =>
    {
        try
        {
            const result = await api.get("/clients/");
            setClients(result.data);
        }
        catch(error)
        {
            console.log(error);
        }
    };
    const getCars = async () =>
    {
        try
        {
            const result = await api.get("/cars/");
            setCars(result.data);
        }
        catch(error)
        {
            console.log(error);
        }
    };

    /*const getInvoices = async () =>
    {
        try
        {
            const result = await api.get("/invoices/");
            setInvoices(result.data);
        }
        catch(error)
        {
            console.log(error);
        }
    };*/
        
    const submitHandler = async(e) =>
    {
        e.preventDefault();

        const signDateValue = signDateInputRef.current.value;
        const contractStartValue = contractStartInputRef.current.value;
        const contractEndValue = contractEndInputRef.current.value;
        const dailyPriceValue = dailyPriceInputRef.current.value;
        /*const advanceValue = advanceInputRef.current.value;
        const remainderValue = remainderInputRef.current.value;
        const returnPlaceValue = returnPlaceInputRef.current.value;*/
        const carValue = carInputRef.current.value;
        const clientValue = clientInputRef.current.value;
        // const invoiceValue = invoiceInputRef.current.value;

        const newContract = 
        {
            signDate: signDateValue,
            contractStart: contractStartValue,
            contractEnd: contractEndValue,
            dailyPrice: dailyPriceValue,
            /*advance: advanceValue,
            remainder: dailyPriceValue - advanceValue,
            returnPlace: returnPlaceValue,*/
            car: {id: carValue},
            client: {id: clientValue}
            // invoice: {paymentDate: invoiceValue}
        };
        
        if(contractStartValue > contractEndValue
             || contractEndValue < signDateValue
            || contractStartValue < signDateValue )
        {
            setDateError(true);
            return;
        }
        else
        {
            setDateError(false);
        }

        /*const amountValidation = (dailyPriceValue, advanceValue) =>
        {
            if (Number(dailyPriceValue) < Number(advanceValue))
            {
                setAmountError(true);
                return;
            }
            else
            {
                setAmountError(false);
            }
        };
    }*/

        // amountValidation(dailyPriceValue, advanceValue);

        try
        {
            let response;
            if (context.action === "editContract")
            {
                response = await api.put("/contracts/" + contract.id , newContract);
                context.setAction("");
                context.setContract(null);
            }
            else // when accessed from menu
            {
                response = await api.post("/contracts/", newContract);
                console.log(response);
            }
            navigate("/contracts"); // redirect to list
            console.log(response);
            
        }
        catch(error)
        {
            alert('nope');
            console.log(error);
        }
    }
    
    return(
        <div className={classes.form_container}>
            <form onSubmit={submitHandler}>
                <div className={classes.input_group}>
                    <label htmlFor="signDate">Signature</label>
                    <input type="date" name="signDate" id="signDate" required ref={signDateInputRef} defaultValue={context.action === "editContract" ? contract.signDate : ""}
                    className={dateError ? classes.invalid : ""} />
                </div>
                <div className={classes.input_group}>
                    <label htmlFor="contractStart">Début</label>
                    <input type="date" name="contractStart" id="contractStart" required ref={contractStartInputRef} defaultValue={context.action === "editContract" ? contract.signDate : ""}
                    className={dateError ? classes.invalid : ""}/>
                </div>
                <div className={classes.input_group}>
                    <label htmlFor="contractEnd">Fin</label>
                    <input type="date" name="contractEnd" id="contractEnd" required ref={contractEndInputRef} defaultValue={context.action === "editContract" ? contract.contractEnd : ""}
                    className={dateError ? classes.invalid : ""}/>
                </div>
                <div className={classes.input_group}>
                    <label htmlFor="dailyPrice">Prix journalier</label>
                    <input type="number" name="dailyPrice" id="dailyPrice" required ref={dailyPriceInputRef} defaultValue={context.action === "editContract" ? contract.dailyPrice : 0}
                    /*className={amountError ? classes.invalid : ""}*//>
                </div>
                <div className={classes.input_group}>
                    <label htmlFor="contractClient">Client</label>
                    <select required>
                        {clients.map((client) => {
                            return(<option ref={clientInputRef}>{client.fname}</option>)
                        })}
                    </select>
                </div>
                <div className={classes.input_group}>
                    <label htmlFor="contractCar">Voiture</label>
                    <select required>
                        {cars.map((car) => {
                            return(<option ref={carInputRef}>{car.registration}</option>)
                        })}
                    </select>
                </div>
                <div className={classes.submit_group}>
                    <input type="submit" name="submit" id="submit" value="Confirm save" />
                </div>
            </form>
        </div>
    )
}

export default NewContractForm;
/*<div className={classes.input_group}>
                    <label htmlFor="contractInvoice">Facture</label>
                    <select required ref={invoiceInputRef}>
                        {invoices.map((invoice) => {
                            return(<option>{invoice.paymentDate}</option>)
                        })}
                    </select>
                </div>
                                <div className={classes.input_group}>
                    <label htmlFor="advance">Paiement en avance</label>
                    <input type="number" name="advance" id="advance" required ref={advanceInputRef} defaultValue={context.action === "editContract" ? contract.advance : 0}
                    className={amountError ? classes.invalid : ""}/>
                </div>
                <div className={classes.input_group}>
                    <label htmlFor="remainder">Reste à payer</label>
                    <input type="number" name="remainder" id="remainder" readOnly ref={remainderInputRef} defaultValue={context.action === "editContract" ? contract.remainder : 0}
                    />
                </div>
                <div className={classes.input_group}>
                    <label htmlFor="returnPlace">Lieu de restitution</label>
                    <input type="text" name="returnPlace" id="returnPlace" required ref={returnPlaceInputRef} defaultValue={context.action === "editContract" ? contract.returnPlace : ""}/>
                </div>*/