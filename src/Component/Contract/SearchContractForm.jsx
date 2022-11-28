import React, {useRef, useContext} from "react";
import MainContext from "../../Store/Main";
import api from "../../API/carleasing";
import classes from "../Layout/MyForm.module.css";

function SearchContractForm(props)
{
    const context = useContext(MainContext);
    const signDateInputRef = useRef("");
    const submitHandler = async(event) =>
    {
        event.preventDefault();
        const signDateValue = signDateInputRef.current.value;
        // const signDateJSON = {signDate:signDateValue};

        try
        {
            const response = await api.get("contracts/signDate/" + signDateValue/*signDateJSON.toString()*/);
            if(response.data)
            {
                props.setContract(response.data);
                context.setContract(response.data);
            }
            console.log(response);
        }
        catch(error)
        {
            console.log(error);
            props.setContract(null);
            context.setContract(null);
        }
    }

    return(
        <div className={classes.form_container}>
            <form onSubmit={submitHandler}>
                <div className={classes.input_group}>
                    <label htmlFor="signDate">ID contrat </label>
                    <input type="date" name="signDate" id="signDate" required ref={signDateInputRef}/>
                </div>
                <div className={classes.submit_group}>
                    <input type="submit" name="submit" id="submit" value="Search" required />
                </div>
            </form>
        </div>
    )
}

export default SearchContractForm;