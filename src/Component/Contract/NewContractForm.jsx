import React, { useContext, useRef, useState } from "react";
import classes from "../Layout/MyForm.module.css";
import api from "../../API/carleasing";
import { Link, useNavigate } from "react-router-dom";
import MainContext from "../../Store/Main";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, } from "@fortawesome/free-solid-svg-icons";

function NewContractForm()
{
    const context = useContext(MainContext);
    const contract = context.contract;
    const [dateError, setDateError] = useState(false);
    const [amountError, setAmountError] = useState(false);
    const signDateInputRef = useRef('');
    const contractStartInputRef = useRef('');
    const contractEndInputRef = useRef('');
    const totalPriceInputRef = useRef('');
    const advanceInputRef = useRef('');
    const remainderInputRef = useRef('');
    const returnPlaceInputRef = useRef('');
    const carInputRef = useRef('');
    const clientInputRef = useRef('');
    const invoiceInputRef = useRef('');
    let navigate = useNavigate();

    const submitHandler = async(e) =>
    {
        e.preventDefault();

        const signDateValue = signDateInputRef.current.value;
        const contractStartValue = contractStartInputRef.current.value;
        const contractEndValue = contractEndInputRef.current.value;
        const totalPriceValue = totalPriceInputRef.current.value;
        const advanceValue = advanceInputRef.current.value;
        const remainderValue = remainderInputRef.current.value;
        const returnPlaceValue = returnPlaceInputRef.current.value;
        const carValue = carInputRef.current.value;
        const clientValue = clientInputRef.current.value;
        const invoiceValue = invoiceInputRef.current.value;

        const newContract = 
        {
            signDate: signDateValue,
            contractStart: contractStartValue,
            contractEnd: contractEndValue,
            totalPrice: totalPriceValue,
            advance: advanceValue,
            remainder: totalPriceValue - advanceValue,
            returnPlace: returnPlaceValue,
            car: {id: carValue},
            client: {id: clientValue},
            invoice: {id: invoiceValue}
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

        const amountValidation = (totalPriceValue, advanceValue) =>
        {
            if (Number(totalPriceValue) < Number(advanceValue))
            {
                setAmountError(true);
                return;
            }
            else
            {
                setAmountError(false);
            }
        };

        amountValidation(totalPriceValue, advanceValue);

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
                    <label htmlFor="totalPrice">Prix total</label>
                    <input type="number" name="totalPrice" id="totalPrice" required ref={totalPriceInputRef} defaultValue={context.action === "editContract" ? contract.totalPrice : 0}
                    className={amountError ? classes.invalid : ""}/>
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
                </div>
                <div className={classes.input_group}>
                    <label htmlFor="car">Facture</label>
                    <div className={classes.cta}>
                        <input type="text" name="invoice" id="invoice" value={context.invoice ? context.invoice.id : ""} ref={invoiceInputRef} />
                        <Link to="/searchinvoice">
                            <button><FontAwesomeIcon icon={faMagnifyingGlass} className={classes.cta_icon}></FontAwesomeIcon> Find invoice</button>
                        </Link>
                    </div>
                </div>
                <div className={classes.input_group}>
                    <label htmlFor="car">Voiture</label>
                    <div className={classes.cta}>
                        <input type="text" name="car" id="car" value={context.car ? context.car.id : ""}  ref={carInputRef} />
                        <Link to="/searchcar">
                            <button><FontAwesomeIcon icon={faMagnifyingGlass} className={classes.cta_icon}></FontAwesomeIcon> Find car</button>
                        </Link>
                    </div>
                </div>
                <div className={classes.input_group}>
                    <label htmlFor="client">Client</label>
                    <input type="text" name="client" id="client"  value={context.client ? context.client.id : ""} ref={clientInputRef}/>
                    Nom complet: <input type="text" name="fullname" id="fullname" value={context.client ? context.client.fname + " " + context.client.surname: ""}/>
                    Date de naissance: <input type="date" name="dob" id="dob"  value={context.client ? context.client.dob : ""}/>
                </div>
                <div className={classes.cta}>
                    <Link to="/searchclient">
                        <button><FontAwesomeIcon icon={faMagnifyingGlass} className={classes.cta_icon}></FontAwesomeIcon> Find client</button>
                    </Link>
                </div>
                <div className={classes.submit_group}>
                    <input type="submit" name="submit" id="submit" value="Confirm save" />
                </div>
            </form>
        </div>
    )
}

export default NewContractForm;