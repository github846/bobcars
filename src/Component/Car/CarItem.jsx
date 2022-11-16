import React, { useContext } from "react";
import MainContext from "../../Store/Main";
import classes from "./CarItem.module.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faList, faHouseMedical, faFilePen } from "@fortawesome/free-solid-svg-icons";

function CarItem(props)
{
    const context = useContext(MainContext);
    const updateCar = () =>
    {
        context.setCar(props.car);
        context.setAction("editCar");
    };

    console.log(props.car);

    return(
        <div className={classes.card}>
            <div>
                <img src="https://www.sgvgreenway.org/img/managed/Image/76/file.png" />
            </div>
            <div>
                <p>Matricule: {props.car.registration}</p>
                <p>Couleur: {props.car.color}</p>
                <p>Marque: {props.car.brand}</p>
                <p>Carburant: {props.car.fuel}</p>
                <p>Puissance: {props.car.cylinder}</p>
                <p>Vitesse maxi: {props.car.maxSpeed}</p>
                <p>En cours d'utilisation: {props.car.inUse}</p>
                <p>Kilométrage: {props.car.mileage}</p>
                <p className={props.car.inUse ? classes["valid"] : classes["invalid"]}>
                    {props.car.inUse ? "Available" : "Not available"}
                </p>
                 <p>{props.car.firstUse}</p>
            </div>
            <div className={classes.cta}>
                <div className={classes["cta-item"]} onClick={() => props.onDelete(props.car.id)}>
                    <FontAwesomeIcon icon={faTrash} className={classes["cta-icon"]}></FontAwesomeIcon>
                </div>
                <div className={classes["cta-item"]}>
                    <FontAwesomeIcon icon={faList} className={classes["cta-icon"]}></FontAwesomeIcon>
                </div>
                <div className={classes["cta-item"]}>
                    <FontAwesomeIcon icon={faHouseMedical} className={classes["cta-icon"]}></FontAwesomeIcon>
                </div>
                <div className={classes["cta-item"]} onClick={updateCar}>
                    <Link to="/newcar">
                        <FontAwesomeIcon icon={faFilePen} className={classes["cta-icon"]}></FontAwesomeIcon>
                    </Link>
                </div>
            </div>
        </div>   
    );
}
export default CarItem;