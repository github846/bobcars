import React from "react";
import ContractItem from "./ContractItem";
import api from "../../API/carleasing";
import classes from "../Layout/MyList.module.css";

function ContractList(props)
{
    const deleteHandler = async (id) =>
    {
        try
        {
            await api.delete("/contracts/"+ id);
            props.refresh();
        }
        catch(error)
        {
            console.log(error);
        }
    };

    return (
        <div className={classes.my_container}>
            {props.contracts.map((contract) => {
                return (
                <div>
                    <ContractItem key={contract.id} contract={contract} onDelete={deleteHandler}/>
                </div>
                );
            })}
        </div>
    )
}

export default ContractList;