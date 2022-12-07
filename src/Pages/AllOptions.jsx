import React from "react";
import OptionList from "../Component/Option/OptionList";
import api from "../API/carleasing.js";
import { useState, useEffect } from "react";

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
        <div>
            <h2>Options</h2>
            <OptionList options={options} refresh={getOptions} />
        </div>
    )

}
export default AllOptions;