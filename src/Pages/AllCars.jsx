import React from "react";
import CarList from "../Component/Car/CarList";
import api from "../API/carleasing.js";
import { useState, useEffect } from "react";
import classes from "../Component/Layout/MyList.module.css";

function AllCars()
{
    const [cars, setCars] = useState([]);

    useEffect(() =>
    {
        getCars();
    }, 
        []);

    const getCars = async () =>
    {
        try
        {
            const result = await api.get("/cars/");
            setCars(result.data);
        }
        catch (error)
        {
            console.log(error);
        }
    };

    return (
        <div >
            <h2>All cars</h2>
            <CarList className={classes.my_container} cars={cars} refresh={getCars} />
        </div>
    )

}
export default AllCars;