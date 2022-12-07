import React, { useContext } from "react";
import MainContext from "../../Store/Main";
import classes from "../Layout/MyCard.module.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faList, faHouseMedical, faFilePen } from "@fortawesome/free-solid-svg-icons";

function OptionItem(props)
{
    const context = useContext(MainContext);
    const updateOption = () =>
    {
        context.setOption(props.option);
        context.setAction("editOption");
    };

    console.log(props.option);

    return(
        <div className={classes.card}>
            <div>
                <img src="https://www.sgvgreenway.org/img/managed/Image/76/file.png" />
            </div>
            <div>
                <p>Nom: {props.option.title}</p>
                <p>Description: {props.option.description}</p>
            </div>
            <div className={classes.actions}>
                <div className={classes.actions_item} onClick={() => props.onDelete(props.option.id)}>
                    <FontAwesomeIcon icon={faTrash} className={classes.actions_icon}></FontAwesomeIcon> Delete
                </div>
                <div className={classes.actions_item}>
                    <FontAwesomeIcon icon={faList} className={classes.actions_icon}></FontAwesomeIcon>
                </div>
                <div className={classes.actions_item}>
                    <FontAwesomeIcon icon={faHouseMedical} className={classes.actions_icon}></FontAwesomeIcon>
                </div>
                <div className={classes.actions_item} onClick={updateOption}>
                    <Link to="/newoption">
                        <FontAwesomeIcon icon={faFilePen} className={classes.actions_icon}></FontAwesomeIcon> Edit
                    </Link>
                </div>
            </div>
        </div>   
    );
}
export default OptionItem;