import React from "react";
import CarItem from "./CarItem";
import api from "../../API/carleasing";
import classes from '../Layout/MyList.module.css';

function CarList(props)
{
    const deleteHandler = async (id) =>
    {
        try
        {
            await api.delete("/cars/"+ id); // using api for request
            props.refresh();
        }
        catch(error)
        {
            console.log(error);
        }
    };

    return (
        <div className={classes.my_container}> 
            {props.cars.map((car) => {
                return (
                    <CarItem  key="{car}" car={car} onDelete={deleteHandler}/>
                );
            })}
        </div>
    )
}

export default CarList;