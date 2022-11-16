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
        <div> 
            {props.options.map((option) => {
                return (
                    <OptionItem className={classes.my_container} key="{option}" option={option} onDelete={deleteHandler}/>
                );
            })}
        </div>
    )
}

export default OptionList;