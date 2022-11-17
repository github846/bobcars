import React from "react";
import { useState, useEffect } from "react";
import api from "../API/carleasing.js";

function Home()
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
        <div>home</div>
    )
    
}
export default Home;