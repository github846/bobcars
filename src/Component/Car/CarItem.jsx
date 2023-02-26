import React, { useContext } from "react";
import MainContext from "../../Store/Main";
import classes from "../Layout/MyCard.module.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faList, faFilePen } from "@fortawesome/free-solid-svg-icons";

function CarItem(props)
{
    const context = useContext(MainContext);
    const updateCar = () =>
    {
        context.setCar(props.car);
        context.setAction("editCar");
    };

    return(
        <div className={classes.card}>
            <div >
                <img className={classes.card_img} src='https://www.enterprise.com/content/dam/global-vehicle-images/cars/FORD_FUSION_2020.png' />
            </div>
            <div>
                <p>Matricule: <span className={classes.card_value}>{props.car.registration}</span></p>
                <p>Couleur: <span className={classes.card_value}>{props.car.color}</span></p>
                <p>Marque: <span className={classes.card_value}>{props.car.brand}</span></p>
                <p>Carburant: <span className={classes.card_value}>{props.car.fuel}</span></p>
                <p>Puissance: <span className={classes.card_value}>{props.car.cylinder}</span></p>
                <p>Vitesse maxi: <span className={classes.card_value}>{props.car.maxSpeed}</span></p>
                <p>Kilométrage: <span className={classes.card_value}>{props.car.mileage}</span></p>
                <p>Mise en service: <span className={classes.card_value}>{props.car.firstUse}</span></p>
                <p className={props.car.inUse ? classes.valid : classes.invalid}>
                {props.car.inUse ? "Available" : "Not available"}
                </p>
            </div>
            <div className={classes.actions}>
                <div className={classes.delete_icon} onClick={() => props.onDelete(props.car.id)}>
                    <FontAwesomeIcon icon={faTrash} className={classes.delete_icon}></FontAwesomeIcon> Delete
                </div>
                <div className={classes.actions_icon}>
                <Link to={`/contracts/${props.car.id}`}>
                    <FontAwesomeIcon icon={faList} className={classes.actions_icon}>Contracts</FontAwesomeIcon>
                </Link>
                </div>
                <div className={classes.actions_icon} onClick={updateCar}>
                    <Link to="/newcar">
                        <FontAwesomeIcon icon={faFilePen} className={classes.actions_icon}></FontAwesomeIcon> Edit
                    </Link>
                </div>
            </div>
        </div>   
    );
}
export default CarItem;