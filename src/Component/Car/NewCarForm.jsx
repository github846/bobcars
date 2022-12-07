import React, { useContext, useState, useRef, useEffect } from "react";
import classes from "../Layout/MyForm.module.css";
import api from "../../API/carleasing";
import { useNavigate } from "react-router-dom"; // for redirects
import MainContext from "../../Store/Main";

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
    const inUseInputRef = useRef(false);
    const firstUseInputRef = useRef('');
    const optionInputRef = useRef([]);
    // const contractInputRef = useRef('');
    const [inUse, setInUse] = useState(false);
    const [optns, setOptns] = useState([]);

    useEffect(() =>
    {
        getOptns();
    }, []);

    const getOptns = async () =>
    {
        try
        {
            const result = await api.get("/options/");
            setOptns(result.data);
        }
        catch(error)
        {
            console.log(error);
        }
    };

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
        const inUseValue = inUseInputRef.current.value;
        const firstUseValue = firstUseInputRef.current.value;
        const optionValue = optionInputRef.current.value;
        // const contractValue = contractInputRef.current.value;
        
        const newCar = // creating new object with input values
        {
            registration: registrationValue,
            brand: brandValue,
            color: colorValue,
            fuel: fuelValue,
            cylinder: cylinderValue,
            maxSpeed: maxSpeedValue,
            mileage: mileageValue,
            inUse: inUseValue,
            firstUse: firstUseValue,
            option: {title: optionValue}
            // contract: {id: contractValue}
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
            navigate("/cars/"); // redirect to list
            console.log(response);
            
        }
        catch(error)
        {
            alert('nope');
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
                    <input type="number" name="cylinder" id="cylinder" step="0.1"
                     ref={cylinderInputRef} defaultValue={car ? car.cylinder : ""} required />
                </div>
                <div className={classes.input_group}>
                    <label htmlFor="maxSpeed">Vitesse max</label>
                    <input type="number" name="maxSpeed" id="maxSpeed" step="10"
                     ref={maxSpeedInputRef} defaultValue={car ? car.maxSpeed : ""} required />
                </div>
                <div className={classes.input_group}>
                    <label htmlFor="inUse">En service</label>
                    <input type="checkbox" name="inUse" id="inUse" ref={inUseInputRef} defaultValue={car ? car.inUse : inUse === false} onClick={() => {setInUse(!inUse);}}/>
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
                    <label htmlFor="carOption">Option </label>
                <div ref={optionInputRef}>
                    {optns.map((optn) => {
                        return(<div>{optn.title}<input type="checkbox" /></div>)
                    })}
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