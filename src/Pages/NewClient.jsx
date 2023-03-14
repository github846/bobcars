import React from "react";
import NewClientForm from "../Component/Client/NewClientForm";

function NewClient()
{
    return (
        <div class="centered">
            <h2>Ajouter un nouveau client</h2>
            <NewClientForm/>
        </div>
    )
}

export default NewClient;