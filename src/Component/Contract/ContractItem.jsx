import React, { useContext } from "react";
import MainContext from "../../Store/Main";
import classes from "../Layout/MyCard.module.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faFilePen } from "@fortawesome/free-solid-svg-icons";

function ContractItem(props)
{
    const context = useContext(MainContext);
    const updateContract = () =>
    {
        context.setContract(props.contract);
        context.setAction("editContract");
    };

    let contractEnd = new Date(props.contract.contractEnd);
    let contractStart = new Date(props.contract.contractStart);
    let dailyPrice = props.contract.dailyPrice;
    contractEnd = contractEnd.getTime();
    contractStart = contractStart.getTime();
    let contractDuration = (contractEnd - contractStart)/(86400000)+1;
    let totalPrice = dailyPrice*contractDuration;

    return(
        <div className={classes.card}>
            <div>
                <p>Client: {props.contract.client.id}</p>
                <p>Voiture: {props.contract.car.id}</p>
                <p>Signature: <span className={classes.card_value}>{props.contract.signDate}</span></p>
                <p>Début: <span className={classes.card_value}>{props.contract.contractStart}</span></p>
                <p>Fin: <span className={classes.card_value}>{props.contract.contractEnd}</span></p>
                <p>Prix journalier: <span className={classes.card_value}>{props.contract.dailyPrice}</span></p>
                <p>Prix total: <span className={classes.card_value}>{totalPrice}</span></p>
            </div>
            <div className={classes.actions}>
                <div className={classes.delete_icon} onClick={() => props.onDelete(props.contract.id)}>
                    <FontAwesomeIcon icon={faTrash} className={classes.delete_icon}></FontAwesomeIcon> Delete
                </div>
                <div className={classes.actions_item} onClick={updateContract}>
                    <Link to="/newcontract">
                        <FontAwesomeIcon icon={faFilePen} className={classes.actions_icon}></FontAwesomeIcon> Edit
                    </Link>
                </div>
            </div>
        </div>   
    );
}
export default ContractItem;