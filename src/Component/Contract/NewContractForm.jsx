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
    const dailyPriceInputRef = useRef(0);
    const clientInputRef = useRef(null);
    const carInputRef = useRef(null);

    const [selectedClientId, setSelectedClientId] = useState(null);
    const [selectedCarId, setSelectedCarId] = useState(null);
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
        const client_id = Number(clientInputRef.current.value);
        const car_id = Number(carInputRef.current.value);

        const newContract = 
        {
            signDate: signDateValue,
            contractStart: contractStartValue,
            contractEnd: contractEndValue,
            dailyPrice: dailyPriceValue,
            //carId: Number(selectedCarId),
            //clientId: Number(selectedClientId)
            client_id,
            car_id
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
                    console.log(response);
                }
                else// when accessed from menu
                {
                    response = await api.post("/contracts/", newContract);
                    console.log(response); // redirect to list
                }
                alert (`Contract added! ${typeof newContract.client_id} / ${newContract.client_id} and ${typeof newContract.car_id} / ${newContract.car_id}`)
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

    const handleClientChange = (e) => {
        setSelectedClientId(Number(e.target.value));
      };
    
      const handleCarChange = (e) => {
        setSelectedCarId(Number(e.target.value));
      };
    
    return(
        <div>
            <form className={classes.form_container} onSubmit={submitHandler}>
                <p>{`Car: ${selectedCarId} ${typeof(selectedCarId)} | Client: ${selectedClientId} ${typeof(selectedClientId)}`}</p>
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
                    <select required ref={clientInputRef} value={selectedClientId} onChange={handleClientChange}>
                        <option>No client selected</option>
                        {clients.map((client) => {
                            return(<option key={client.id} value={client.id}>{client.fname}</option>)
                        })}
                    </select>
                </div>
                <div className={classes.input_group}>
                    <label htmlFor="contractCar">Voiture </label>
                    <select required ref={carInputRef} value={selectedCarId} onChange={handleCarChange}>
                        <option>No car selected</option>
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