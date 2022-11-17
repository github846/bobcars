import React from "react";
import ClientTable from "../Component/Client/ClientTable";
import api from "../API/carleasing.js";
import { useState, useEffect } from "react";

function AllClients()
{
    const [clients, setClients] = useState([]);

    useEffect(() =>
    {
        getClients();
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

    let clientsAmount = getClients.length;
    console.log(clientsAmount);
    
    return(
        <div>
            <h2>All clients</h2>
            <ClientTable clients={clients} refresh={getClients} />
        </div>
    )
    
}
export default AllClients;