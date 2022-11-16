import React, {useRef, useContext} from "react";
import MainContext from "../../Store/Main";
import api from "../../API/carleasing";
import classes from "./SearchClientForm.module.css";

function SearchClientForm(props)
{
    const context = useContext(MainContext);
    const idInputRef = useRef("");
    const submitHandler = async(event) =>
    {
        event.preventDefault();
        const idValue = idInputRef.current.value;

        try
        {
            const response = await api.get("clients/" + idValue);
            if(response.data)
            {
                props.setClient(response.data);
                context.setClient(response.data);
            }
            console.log(response);
        }
        catch(error)
        {
            console.log(error);
            props.setClient(null);
            context.setClient(null);
        }
    };

    return(
        <div className={classes.form_container}>
            <form onSubmit={submitHandler}>
                <div className={classes['input_group']}>
                    <label htmlFor="id">ID client</label>
                    <input type="text" name="id" id="id" required ref={idInputRef}/>
                </div>
                <div className={classes['input_group']}>
                    <input type="submit" name="submit" id="submit" value="Search" required />
                </div>
            </form>
        </div>
    );
}

export default SearchClientForm;