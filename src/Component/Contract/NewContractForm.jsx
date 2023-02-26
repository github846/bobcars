import React, { useContext, useRef, useState, useEffect } from "react";
import classes from "../Layout/MyForm.module.css";
import api from "../../API/carleasing";
import { useNavigate } from "react-router-dom";
import MainContext from "../../Store/Main";

function NewContractForm()
{
    const context = useContext(MainContext);
    const contract = context.contract;
    const [dateError, setDateError] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const signDateInputRef = useRef('');
    const contractStartInputRef = useRef('');
    const contractEndInputRef = useRef('');
    const dailyPriceInputRef = useRef('');
    const clientInputRef = useRef(0);
    const carInputRef = useRef(0);
    const [clients, setClients] = useState([]);
    const [cars, setCars] = useState([]);
    let navigate = useNavigate();

    useEffect(() =>
    {
        getClients();
        getCars();
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
        
    const submitHandler = async(e) =>
    {
        e.preventDefault();

        const signDateValue = signDateInputRef.current.value;
        const contractStartValue = contractStartInputRef.current.value;
        const contractEndValue = contractEndInputRef.current.value;
        const dailyPriceValue = dailyPriceInputRef.current.value;
        const clientValue = clientInputRef.current.value;
        const carValue = carInputRef.current.value;

        const newContract = 
        {
            signDate: signDateValue,
            contractStart: contractStartValue,
            contractEnd: contractEndValue,
            dailyPrice: dailyPriceValue,
            client: {id: clientValue},
            car: {id: carValue}
        };
        
        if (contractStartValue > contractEndValue){setErrorMessage("Contract can't start after it ends!")}
        else if (contractEndValue < signDateValue){setErrorMessage("Can't sign contract after it ends!")}
        else if (contractStartValue < signDateValue){setErrorMessage("Can't start contract before it's signed!")}
        else
        {   
            try
            {
                let response;
                setDateError(false);
                if (context.action === "editContract")
                {
                    response = await api.put("/contracts/" + contract.id , newContract);
                    context.setAction("");
                    context.setContract(null);
                }
                else// when accessed from menu
                {
                    response = await api.post("/contracts/", newContract);
                    console.log(response); // redirect to list
                }
                alert ("Contract added!")
                console.log(response);
                navigate("/contracts");
            }
            catch(error)
            {
                alert('nope');
                console.log(error);
            }
        }
    }
    
    return(
        <div className={classes.form_container}>
            <form onSubmit={submitHandler}>
                <p className="error">{errorMessage}</p>
                <div className={classes.input_group}>
                    <label htmlFor="signDate">Signature</label>
                    <input type="date" name="signDate" id="signDate" required ref={signDateInputRef} defaultValue={context.action === "editContract" ? contract.signDate : ""}
                    className={dateError ? classes.invalid : ""} />
                </div>
                <div className={classes.input_group}>
                    <label htmlFor="contractStart">Début </label>
                    <input type="date" name="contractStart" id="contractStart" required ref={contractStartInputRef} defaultValue={context.action === "editContract" ? contract.signDate : ""}
                    className={dateError ? classes.invalid : ""}/>
                </div>
                <div className={classes.input_group}>
                    <label htmlFor="contractEnd">Fin </label>
                    <input type="date" name="contractEnd" id="contractEnd" required ref={contractEndInputRef} defaultValue={context.action === "editContract" ? contract.contractEnd : ""}
                    className={dateError ? classes.invalid : ""}/>
                </div>
                <div className={classes.input_group}>
                    <label htmlFor="dailyPrice">Prix journalier </label>
                    <input type="number" name="dailyPrice" id="dailyPrice" required ref={dailyPriceInputRef} min={0} defaultValue={context.action === "editContract" ? contract.dailyPrice : 0}/>
                </div>
                <div className={classes.input_group}>
                    <label htmlFor="contractClient">Client </label>
                    <select required>
                        {clients.map((client) => {
                            return(<option ref={clientInputRef} value={client.id}>{client.fname}</option>)
                        })}
                    </select>
                </div>
                <div className={classes.input_group}>
                    <label htmlFor="contractCar">Voiture </label>
                    <select required>
                        {cars.map((car) => {
                            return(<option ref={carInputRef} value={car.id}>{car.registration}</option>)
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