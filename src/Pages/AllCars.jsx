import React from "react";
import CarList from "../Component/Car/CarList";
import api from "../API/carleasing.js";
import { useState, useEffect } from "react";

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
        <div>
            <h2>Voitures</h2>
            <p>{cars.length} voitures</p>
            <CarList cars={cars} refresh={getCars} />
        </div>
    )

}
export default AllCars;