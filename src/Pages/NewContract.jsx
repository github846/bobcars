import React from "react";
import NewContractForm from "../Component/Contract/NewContractForm";

function NewContract()
{
    return (
        <div class="centered">
            <h2>Ajouter un nouveau contrat</h2>
            <NewContractForm/>
        </div>
    )
}

export default NewContract;