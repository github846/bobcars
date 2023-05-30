import React, { useContext, useState, useEffect } from "react";
import classes from "../Layout/MyForm.module.css";
import api from "../../API/carleasing";
import { useNavigate } from "react-router-dom"; // for redirects
import MainContext from "../../Store/Main";

function NewCarForm()
{
    const context = useContext(MainContext);
    const car = context.car;
    /*const registrationInputRef = useRef(''); 
    const brandInputRef = useRef('');
    const colorInputRef = useRef('');
    const fuelInputRef = useRef('');
    const cylinderInputRef = useRef('');
    const maxSpeedInputRef = useRef('');
    const mileageInputRef = useRef('');
    const inUseInputRef = useRef(false);
    const firstUseInputRef = useRef('');
    const optionsInputRef = useRef([]);
    const [inUse, setInUse] = useState(false);*/
    const [optns, setOptns] = useState([]);
    let navigate = useNavigate();

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

        /*const registrationValue = registrationInputRef.current.value;
        const brandValue = brandInputRef.current.value;
        const colorValue = colorInputRef.current.value;
        const fuelValue = fuelInputRef.current.value;
        const cylinderValue = cylinderInputRef.current.value;
        const maxSpeedValue = maxSpeedInputRef.current.value;
        const mileageValue = mileageInputRef.current.value;
        const inUseValue = inUseInputRef.current.value;
        const firstUseValue = firstUseInputRef.current.value;
        const optionsValue = optionsInputRef.current.value;*/
        const formData = new FormData(e.target);
        const newCar = {};
        for (let [key, value] of formData.entries()) {
            if (key === "optn") {
              if (!newCar.options) {
                newCar.options = [];
              }
              newCar[key] = { id: Number(value) };
              newCar.options.push(id);
            } else {
              newCar[key] = value;
            }
          }

        /*const newCar = // creating new object with input values
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
            option: {title: optionsValue}
        };*/

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
                    <label htmlFor="registration">Matricule </label>
                    <input type="text" name="registration" id="registration" required defaultValue={context.action === "editCar" ? car.registration : ""} />
                </div>
                <div className={classes.input_group}>
                    <label htmlFor="brand">Marque </label>
                    <input type="text" name="brand" id="brand" required defaultValue={context.action === "editCar" ? car.brand : ""} />
                </div>
                <div className={classes.input_group}>
                    <label htmlFor="color">Couleur </label>
                    <input type="text" name="color" id="color" defaultValue={car ? car.color : ""} required />
                </div>
                <div className={classes.input_group}>
                    <label htmlFor="fuel">Carburant </label>
                    <input type="text" name="fuel" id="fuel" defaultValue={car ? car.fuel : ""} required />
                </div>
                <div className={classes.input_group}>
                    <label htmlFor="cylinder">Puissance </label>
                    <input type="number" name="cylinder" id="cylinder" step="0.1" min={0} defaultValue={car ? car.cylinder : ""} required />
                </div>
                <div className={classes.input_group}>
                    <label htmlFor="maxSpeed">Vitesse max </label>
                    <input type="number" name="maxSpeed" id="maxSpeed" step="10" min={0} defaultValue={car ? car.maxSpeed : ""} required />
                </div>
                <div className={classes.input_group}>
                    <label htmlFor="mileage">Kilométrage </label>
                    <input type="number" name="mileage" id="mileage" step="100" min={0} defaultValue={car ? car.mileage : ""} required />
                </div>
                <div className={classes.input_group}>
                    <label htmlFor="inUse">En service </label>
                    <input type="checkbox" name="inUse" id="inUse" defaultValue={car ? car.inUse : false} />
                </div>
                <div className={classes.input_group}>
                    <label htmlFor="firstUse">Date de mise en service </label>
                    <input type="date" name="firstUse" id="firstUse" 
                     defaultValue={car ? car.firstUse : ""} required />
                </div>
                <div className={classes.input_group}>
                    <label htmlFor="carOption">Options </label>
                <div required name="options">
                    {optns.map((optn) => {return(<div key={optn.id}>{optn.title}<input type="checkbox" name="optn" value={optn.id}/></div>)})}
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