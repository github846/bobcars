import React, { useContext, useRef } from "react";
import classes from "../Layout/MyForm.module.css";
import api from "../../API/carleasing";
import { Link, useNavigate } from "react-router-dom"; // for redirects
import MainContext from "../../Store/Main";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function NewOptionForm()
{
    let navigate = useNavigate();
    const context = useContext(MainContext);
    const option = context.option;
    const titleInputRef = useRef(''); 
    const descriptionInputRef = useRef('');
    const carInputRef = useRef('');

    const submitHandler = async(e) =>
    {
        e.preventDefault();

        const titleValue = titleInputRef.current.value;
        const descriptionValue = descriptionInputRef.current.value;
        const carValue = carInputRef.current.value;
        
        const newOption = // creating new object with input values
        {
            title: titleValue,
            description: descriptionValue,
            car: {id: carValue}
        };

        try
        {
            let response;
            if (context.action === "editOption") // when accessed from existing object
            {
                response = await api.put("/options/" + option.id , newOption);
                context.setAction("");
                context.setOption(null);
            }
            else // when accessed from menu
            {
                response = await api.post("/options/", newOption);
                console.log(response);
            }
            navigate("/options"); // redirect to list
            console.log(response);
            
        }
        catch(error)
        {
            console.log(error);
        }
    }

    return(
        <div>
            <form onSubmit={submitHandler} className={classes.form_container}>
            <div className={classes['input_group']}>
                    <label htmlFor="title">Nom</label>
                    <input type="text" name="title" id="title" required 
                    ref={titleInputRef} defaultValue={context.action === "editOption" ? option.name : ""} />
                </div>
                <div className={classes['input_group']}>
                    <label htmlFor="description">Description</label>
                    <input type="text" name="description" id="description" required 
                    ref={descriptionInputRef} defaultValue={context.action === "editOption" ? option.description : ""} />
                </div>
                <div className={classes["input_group"]}>
                    <label htmlFor="car">Voiture</label>
                    <div className={classes.cta}>
                        <input type="text" name="car" id="car" value={context.car ? context.car.id : ""} required ref={carInputRef} />
                        <Link to="/searchcar">
                            <button><FontAwesomeIcon icon={faMagnifyingGlass} className={classes["cta-icon"]}></FontAwesomeIcon> Find car</button>
                        </Link>
                    </div>
                </div>
                <div className={classes['submit_group']}>
                    <input type="submit" name="submit" id="submit" value="Confirm save" required />
                </div>
            </form>
        </div>
    )
}

export default NewOptionForm;