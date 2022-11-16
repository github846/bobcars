import React, { useContext } from "react";
import MainContext from "../../Store/Main";
import classes from "../Layout/MyCard.module.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faList, faHouseMedical, faFilePen } from "@fortawesome/free-solid-svg-icons";

function ContractItem(props)
{
    const context = useContext(MainContext);
    const updateContract = () =>
    {
        context.setContract(props.contract);
        context.setAction("editContract");
    };

    console.log(props.contract);

    return(
        <div className={classes.card}>
            <div className="image-container">
                <img src="" />
            </div>
            <div className="contract-info">
                <p>Signature: {props.contract.signDate}</p>
                <p>Début: {props.contract.contractStart}</p>
                <p>Fin: {props.contract.contractEnd}</p>
                <p>Prix total: {props.contract.totalPrice}</p>
                <p>Avance: {props.contract.advance}</p>
                <p>Reste à payer: {props.contract.remainder}</p>
                <p>Lieu de restitution: {props.contract.returnPlace}</p>
            </div>
            <div className={classes.cta}>
                <div className={classes["cta-item"]} onClick={() => props.onDelete(props.contract.id)}>
                    <FontAwesomeIcon icon={faTrash} className={classes["cta-icon"]}></FontAwesomeIcon>
                </div>
                <div className={classes["cta-item"]}>
                    <FontAwesomeIcon icon={faList} className={classes["cta-icon"]}></FontAwesomeIcon>
                </div>
                <div className={classes["cta-item"]}>
                    <FontAwesomeIcon icon={faHouseMedical} className={classes["cta-icon"]}></FontAwesomeIcon>
                </div>
                <div className={classes["cta-item"]} onClick={updateContract}>
                    <Link to="/newcontract">
                        <FontAwesomeIcon icon={faFilePen} className={classes["cta-icon"]}></FontAwesomeIcon>
                    </Link>
                </div>
            </div>
        </div>   
    );
}
export default ContractItem;