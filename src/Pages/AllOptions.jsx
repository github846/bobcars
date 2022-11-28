import React from "react";
import OptionList from "../Component/Option/OptionList";
import api from "../API/carleasing.js";
import { useState, useEffect } from "react";
import classes from "../Component/Layout/MyList.module.css"

function AllOptions()
{
    const [options, setOptions] = useState([]);

    useEffect(() =>
    {
        getOptions();
    }, []);

    const getOptions = async () =>
    {
        try
        {
            const result = await api.get("/options/");
            setOptions(result.data);
        }
        catch (error)
        {
            console.log(error);
        }
    };

    return (
        <div className={classes.my_container}><h2>All options</h2>
            <OptionList  options={options} refresh={getOptions} />
        </div>
    )

}
export default AllOptions;