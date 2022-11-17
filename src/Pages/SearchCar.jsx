import React from "react";
import SearchCarForm from "../Component/Car/SearchCarForm";
import CarItem from "../Component/Car/CarItem";
import { useState } from "react";

function SearchCar()
{
    const [car, setCar] = useState(null);

    const findCar = (foundCar) =>
    {
        setCar(foundCar);
    }

    return (

        <div>
          <h2>Trouver une voiture</h2>
            <SearchCarForm setCar={findCar} />
            {car && <CarItem car={car} />}
        </div>
      );

}
export default SearchCar;