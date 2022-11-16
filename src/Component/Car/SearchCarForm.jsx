import React, {useRef, useContext} from "react";
import MainContext from "../../Store/Main";
import api from "../../API/carleasing";
import classes from "./SearchCarForm.module.css";

function SearchCarForm(props)
{
    const context = useContext(MainContext);
    const idInputRef = useRef("");
    const submitHandler = async(event) =>
    {
        event.preventDefault();
        const idValue = idInputRef.current.value;

        try
        {
            const response = await api.get("cars/" + idValue);
            if(response.data)
            {
                props.setCar(response.data);
                context.setCar(response.data);
            }
            console.log(response);
        }
        catch(error)
        {
            console.log(error);
            props.setCar(null);
            context.setCar(null);
        }
    }

    return(
        <div className={classes["form_container"]}>
            <form onSubmit={submitHandler}>
                <div className={classes['input_group']}>
                    <label htmlFor="id">ID voiture </label>
                    <input type="text" name="id" id="id" required ref={idInputRef}/>
                </div>
                <div className={classes['input_group']}>
                    <input type="submit" name="submit" id="submit" value="Search" required />
                </div>
            </form>
        </div>
    )
}

export default SearchCarForm;