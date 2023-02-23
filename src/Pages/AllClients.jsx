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
    
    return(
        <div>
            <h2>Clients</h2>
            <p>{clients.length} clients</p>
            <ClientTable clients={clients} refresh={getClients} />
        </div>
    )
    
}
export default AllClients;