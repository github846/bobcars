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
            <div className={classes.cta}>
                <div className={classes["cta-item"]} onClick={() => props.onDelete(props.option.id)}>
                    <FontAwesomeIcon icon={faTrash} className={classes["cta-icon"]}></FontAwesomeIcon>
                </div>
                <div className={classes["cta-item"]}>
                    <FontAwesomeIcon icon={faList} className={classes["cta-icon"]}></FontAwesomeIcon>
                </div>
                <div className={classes["cta-item"]}>
                    <FontAwesomeIcon icon={faHouseMedical} className={classes["cta-icon"]}></FontAwesomeIcon>
                </div>
                <div className={classes["cta-item"]} onClick={updateOption}>
                    <Link to="/newoption">
                        <FontAwesomeIcon icon={faFilePen} className={classes["cta-icon"]}></FontAwesomeIcon>
                    </Link>
                </div>
            </div>
        </div>   
    );
}
export default OptionItem;