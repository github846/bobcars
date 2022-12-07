import React from "react";
import OptionItem from "./OptionItem";
import api from "../../API/carleasing";
import classes from "../Layout/MyList.module.css";

function OptionList(props)
{
    const deleteHandler = async (id) =>
    {
        try
        {
            await api.delete("/options/"+ id); // using api for request
            props.refresh();
        }
        catch(error)
        {
            console.log(error);
        }
    };

    return (
        <div className={classes.my_container}> 
            {props.options.map((option) => {
                return (
                    <OptionItem  key={option.id} option={option} onDelete={deleteHandler}/>
                );
            })}
        </div>
    )
}

export default OptionList;