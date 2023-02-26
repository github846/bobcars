import React, { useContext, useRef } from "react";
import classes from "../Layout/MyForm.module.css";
import api from "../../API/carleasing";
import { useNavigate } from "react-router-dom";
import MainContext from "../../Store/Main";

function NewClientForm()
{
    const fNameInputRef = useRef('');
    const surnameInputRef = useRef('');
    const addressInputRef = useRef('');
    const dobInputRef = useRef('');
    // const fidelityInputRef = useRef('');
    let navigate = useNavigate();
    const context = useContext(MainContext);
    const client = context.client;
    // const contractInputRef = useRef('');

    const submitHandler = async(e) =>
    {
        e.preventDefault();

        const fNameValue = fNameInputRef.current.value;
        const surnameValue = surnameInputRef.current.value;
        const addressValue = addressInputRef.current.value;
        const dobValue = dobInputRef.current.value;
        /*const fidelityValue = fidelityInputRef.current.value;
         const contractValue = contractInputRef.current.value;*/

        const newClient = 
        {
            fname: fNameValue,
            surname: surnameValue,
            address: addressValue,
            dob: dobValue,
            /* fidelity: fidelityValue,
             contract: {id: contractValue}*/
        };

        try
        {
            let response;
            if (context.action === "editClient")
            {
                response = await api.put("clients/" + client.id , newClient);
                context.setAction("");
                context.setCar(null);
            }
            else
            {
                response = await api.post("clients/", newClient);
                console.log(response);
            }
            navigate("/clients");
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
                    <label htmlFor="fname">Prénom</label>
                    <input type="text" name="fname" id="fname"
                     required ref={fNameInputRef} defaultValue={context.action === "editClient" ? client.fname : ""}/>
                </div>
                <div className={classes.input_group}>
                    <label htmlFor="surname">Nom</label>
                    <input type="text" name="surname" id="surname"
                     required ref={surnameInputRef} defaultValue={context.action === "editClient" ? client.surname : ""}/>
                </div>
                <div className={classes.input_group}>
                    <label htmlFor="address">Adresse</label>
                    <input type="text" name="address" id="address"
                     required ref={addressInputRef} defaultValue={context.action === "editClient" ? client.address : ""}/>
                </div>
                <div className={classes.input_group}>
                    <label htmlFor="dob">Date de naissance</label>
                    <input type="date" name="dob" id="dob" 
                    required ref={dobInputRef} defaultValue={context.action === "editClient" ? client.dob : ""}/>
                </div>                
                <div className={classes.submit_group}>
                    <input type="submit" name="submit" id="submit" value="Confirm save" required />
                </div>
            </form>
        </div>
    )
}

export default NewClientForm;

/*<div className={classes.input_group}>
                    <label htmlFor="fidelity">Fidélité</label>
                    <input type="number" name="fidelity" id="fidelity" 
                    required ref={fidelityInputRef} defaultValue={context.action === "editClient" ? client.fidelity : ""}/>
                </div>*/