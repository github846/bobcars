import React from "react";
import ContractList from "../Component/Contract/ContractList";
import api from "../API/carleasing.js";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function AllClientContracts()
{
    const [contracts, setContracts] = useState([]);
    const { client_id } = useParams();

    useEffect(() =>
    {
        getContracts();
    }, []);

    const getContracts = async () =>
    {
        try
        {
            const result = await api.get(`/contracts/client_id/${client_id}`);
            setContracts(result.data);
        }
        catch(error)
        {
            console.log(error);
        }
    };
    
    return(
        <div>
            <h2>Contrats</h2>
            <p>{contracts.length} contrats</p>
            <ContractList contracts={contracts} refresh={getContracts} />
        </div>
    )
    
}
export default AllClientContracts;