import React, {useRef, useContext} from "react";
import MainContext from "../../Store/Main";
import api from "../../API/carleasing";
import classes from "../Layout/MyForm.module.css";

function SearchCarForm(props)
{
    const context = useContext(MainContext);
    //const idInputRef = useRef("");
    const titleInputRef = useRef("");
    const submitHandler = async(event) =>
    {
        event.preventDefault();
        //const idValue = idInputRef.current.value;
        const titleValue = titleInputRef.current.value;

        try
        {
            const response = await api.get("options/title=" + /*idValue*/titleValue);
            if(response.data)
            {
                props.setOption(response.data);
                context.setOption(response.data);
            }
            console.log(response);
        }
        catch(error)
        {
            console.log(error);
            props.setOption(null);
            context.setOption(null);
        }
    }

    return(
        <div className={classes.form_container}>
            <form onSubmit={submitHandler}>
                <div className={classes.input_group}>
                    <label htmlFor="id">ID option </label>
                    <input type="text" name="id" id="id" required ref={/*idInputRef*/titleInputRef}/>
                </div>
                <div className={classes.submit_group}>
                    <input type="submit" name="submit" id="submit" value="Search" required />
                </div>
            </form>
        </div>
    )
}

export default SearchCarForm;