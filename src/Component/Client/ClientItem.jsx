import React from "react";
import classes from "./ClientItem.module.css";

function ClientItem(props)
{
    return (
            
            <div className={classes.client_info}>
                <h3>Client found!</h3>
                <p>Prénom: {props.client.fname}</p>
                <p>Nom: {props.client.surname}</p>
                <p>Adresse: {props.client.address}</p>
                <p>Date de naissance: {props.client.dob}</p>
                <p>Fidélité: {props.client.fidelity}</p>
            </div>
    );
}
export default ClientItem;