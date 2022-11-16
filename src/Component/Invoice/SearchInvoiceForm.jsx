import React, {useRef, useContext} from "react";
import MainContext from "../../Store/Main";
import api from "../../API/carleasing";
import classes from "../Layout/MyForm.module.css";

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
            const response = await api.get("invoices/" + idValue);
            if(response.data)
            {
                props.setInvoice(response.data);
                context.setInvoice(response.data);
            }
            console.log(response);
        }
        catch(error)
        {
            console.log(error);
            props.setInvoice(null);
            context.setInvoice(null);
        }
    }

    return(
        <div className={classes["form_container"]}>
            <form onSubmit={submitHandler}>
                <div className={classes['input_group']}>
                    <label htmlFor="id">ID facture </label>
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