import React, { useContext, useState, useRef } from "react";
import classes from "../Layout/MyForm.module.css";
import api from "../../API/carleasing";
import { Link, useNavigate } from "react-router-dom"; // for redirects
import MainContext from "../../Store/Main";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function NewCarForm()
{
    let navigate = useNavigate();
    const context = useContext(MainContext);
    const car = context.car;
    const registrationInputRef = useRef(''); 
    const brandInputRef = useRef('');
    const colorInputRef = useRef('');
    const fuelInputRef = useRef('');
    const cylinderInputRef = useRef('');
    const maxSpeedInputRef = useRef('');
    const mileageInputRef = useRef('');
    const firstUseInputRef = useRef('');
    const [inUse, setInUse] = useState(false);
    const optionInputRef = useRef('');
    const contractInputRef = useRef('');

    const submitHandler = async(e) =>
    {
        e.preventDefault();

        const registrationValue = registrationInputRef.current.value;
        const brandValue = brandInputRef.current.value;
        const colorValue = colorInputRef.current.value;
        const fuelValue = fuelInputRef.current.value;
        const cylinderValue = cylinderInputRef.current.value;
        const maxSpeedValue = maxSpeedInputRef.current.value;
        const mileageValue = mileageInputRef.current.value;
        const firstUseValue = firstUseInputRef.current.value;
        const optionValue = optionInputRef.current.value;
        const contractValue = contractInputRef.current.value;
        
        const newCar = // creating new object with input values
        {
            registration: registrationValue,
            brand: brandValue,
            color: colorValue,
            fuel: fuelValue,
            cylinder: cylinderValue,
            maxSpeed: maxSpeedValue,
            mileage: mileageValue,
            firstUse: firstUseValue,
            option: {id: optionValue},
            contract: {id: contractValue}
        };

        try
        {
            let response;
            if (context.action === "editCar") // when accessed from existing object
            {
                response = await api.put("/cars/" + car.id , newCar);
                context.setAction("");
                context.setCar(null);
            }
            else // when accessed from menu
            {
                response = await api.post("/cars/", newCar);
                console.log(response);
            }
            navigate("/cars"); // redirect to list
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
            <div className={classes.input_group}>
                    <label htmlFor="registration">Matricule</label>
                    <input type="text" name="registration" id="registration" required 
                    ref={registrationInputRef} defaultValue={context.action === "editCar" ? car.registration : ""} />
                </div>
                <div className={classes.input_group}>
                    <label htmlFor="brand">Marque</label>
                    <input type="text" name="brand" id="brand" required 
                    ref={brandInputRef} defaultValue={context.action === "editCar" ? car.brand : ""} />
                </div>
                <div className={classes.input_group}>
                    <label htmlFor="color">Couleur</label>
                    <input type="text" name="color" id="color" 
                    ref={colorInputRef} defaultValue={car ? car.color : ""} required />
                </div>
                <div className={classes.input_group}>
                    <label htmlFor="fuel">Carburant</label>
                    <input type="text" name="fuel" id="fuel" 
                    ref={fuelInputRef} defaultValue={car ? car.fuel : ""} required />
                </div>
                <div className={classes.input_group}>
                    <label htmlFor="cylinder">Puissance</label>
                    <input type="text" name="cylinder" id="cylinder" step="0.1"
                     ref={cylinderInputRef} defaultValue={car ? car.cylinder : ""} required />
                </div>
                <div className={classes.input_group}>
                    <label htmlFor="maxSpeed">Vitesse max</label>
                    <input type="number" name="maxSpeed" id="maxSpeed" step="10"
                     ref={maxSpeedInputRef} defaultValue={car ? car.maxSpeed : ""} required />
                </div>
                <div className={classes.input_group}>
                    <label htmlFor="inUse">En service</label>
                    <div className={classes.radio_group}>
                        <div className={classes.radio_item}>
                            <input type="radio" name="inUse" checked={car ? car.inUse : inUse === true} onChange={(e) => {setInUse(true);}}/>
                            <label>Oui</label>
                        </div>
                        <div className={classes.radio_item}>
                            <input type="radio" name="inUse" checked={car ? car.inUse : inUse === true} onChange={(e) => {setInUse(false);}}/>
                            <label>Non</label>
                        </div>
                    </div>
                </div>
                <div className={classes.input_group}>
                    <label htmlFor="mileage">Kilométrage</label>
                    <input type="number" name="mileage" id="mileage" step="100"
                     ref={mileageInputRef} defaultValue={car ? car.mileage : ""} required />
                </div>
                <div className={classes.input_group}>
                    <label htmlFor="firstUse">Date de mise en service</label>
                    <input type="date" name="firstUse" id="firstUse" 
                    ref={firstUseInputRef} defaultValue={car ? car.firstUse : ""} required />
                </div>
                <div className={classes.input_group}>
                    <label htmlFor="contract">Contract</label>
                    <div className={classes.cta}>
                        <input type="date" name="contract" id="contract" value={context.contract ? context.contract.signDate : ""} required ref={contractInputRef} />
                        <Link to="/searchcontract">
                            <button><FontAwesomeIcon icon={faMagnifyingGlass} className={classes.cta_icon}></FontAwesomeIcon> Find contract</button>
                        </Link>
                    </div>
                </div>
                <div className={classes.input_group}>
                    <label htmlFor="option">Option</label>
                    <div className={classes.cta}>
                        <input type="text" name="option" id="option" value={context.option ? context.option.id : ""} required ref={optionInputRef} />
                        <Link to="/searchoption">
                            <button><FontAwesomeIcon icon={faMagnifyingGlass} className={classes.cta_icon}></FontAwesomeIcon> Find option</button>
                        </Link>
                    </div>
                </div>
                <div className={classes.submit_group}>
                    <input type="submit" name="submit" id="submit" value="Confirm save" required />
                </div>
            </form>
        </div>
    )
}

export default NewCarForm;