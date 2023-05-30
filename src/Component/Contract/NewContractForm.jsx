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
        const formData = new FormData(e.target);
        const newContract = {};
        for (let [key, value] of formData.entries()) {
            if (key === 'client' || key === 'car') {
              newContract[key] = {id: Number(value)};
            } else {
              newContract[key] = value;
            }
          }
        
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
                    response = await api.put("/contracts/" + contract.id, JSON.stringify(newContract));
                    context.setAction("");
                    context.setContract(null);
                    console.log(response);
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
        <div>
            <form className={classes.form_container} onSubmit={submitHandler}>
                <p className="error">{errorMessage}</p>
                <div className={classes.input_group}>
                    <label htmlFor="signDate">Signature</label>
                    <input type="date" name="signDate" id="signDate" ref={signDateInputRef} required defaultValue={context.action === "editContract" ? contract.signDate : ""}
                    className={dateError ? classes.invalid : ""} />
                </div>
                <div className={classes.input_group}>
                    <label htmlFor="contractStart">Début </label>
                    <input type="date" name="contractStart" id="contractStart" ref={contractStartInputRef} required defaultValue={context.action === "editContract" ? contract.signDate : ""}
                    className={dateError ? classes.invalid : ""}/>
                </div>
                <div className={classes.input_group}>
                    <label htmlFor="contractEnd">Fin </label>
                    <input type="date" name="contractEnd" id="contractEnd" ref={contractEndInputRef} required defaultValue={context.action === "editContract" ? contract.contractEnd : ""}
                    className={dateError ? classes.invalid : ""}/>
                </div>
                <div className={classes.input_group}>
                    <label htmlFor="dailyPrice">Prix journalier </label>
                    <input type="number" name="dailyPrice" id="dailyPrice" required min={0} defaultValue={context.action === "editContract" ? contract.dailyPrice : 0}/>
                </div>
                <div className={classes.input_group}>
                    <label htmlFor="contractClient">Client </label>
                    <select required name="client">
                        <option value="">No client selected</option>
                        {clients.map((client) => {
                            return(<option key={client.id} value={client.id}>{client.fname}</option>)
                        })}
                    </select>
                </div>
                <div className={classes.input_group}>
                    <label htmlFor="contractCar">Voiture </label>
                    <select required name="car">
                        <option value="">No car selected</option>
                        {cars.map((car) => {
                            return (<option key={car.id} value={car.id}>{car.registration}</option>)
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