import React from "react";
import ContractList from "../Component/Contract/ContractList";
import api from "../API/carleasing.js";
import { useState, useEffect } from "react";
import classes from "../Component/Layout/MyList.module.css"

function AllContracts()
{
    const [contracts, setContracts] = useState([]);

    useEffect(() =>
    {
        getContracts();
    }, []);

    const getContracts = async () =>
    {
        try
        {
            const result = await api.get("/contracts/");
            setContracts(result.data);
        }
        catch(error)
        {
            console.log(error);
        }
    };
    
    return(
        <div>
            <h2>All contracts</h2>
            <ContractList className={classes.my_container} contracts={contracts} refresh={getContracts} />
        </div>
    )
    
}
export default AllContracts;