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
    let n = new Date(props.contract.contractEnd);
    let u = new Date(props.contract.contractStart);
    let j = props.contract.dailyPrice;
    n = n.getTime();
    u = u.getTime();
    let z = (n - u)/(86400000)+1;
    let w = j*z

    return(
        <div className={classes.card}>
            <div>
                <p>Signature: {props.contract.signDate}</p>
                <p>Début: {props.contract.contractStart}</p>
                <p>Fin: {props.contract.contractEnd}</p>
                <p>Prix journalier: {props.contract.dailyPrice}</p>
                <p>Prix total: {w}</p>
                {console.log(n)}
                {console.log(u)}
                {console.log(z)}
                {console.log(j)}
                {console.log(w)}
            </div>
            <div className={classes.actions}>
                <div className={classes.actions_item} onClick={() => props.onDelete(props.contract.id)}>
                    <FontAwesomeIcon icon={faTrash} className={classes.actions_icon}></FontAwesomeIcon> Delete
                </div>
                <div className={classes.actions_item}>
                    <FontAwesomeIcon icon={faList} className={classes.actions_icon}></FontAwesomeIcon>
                </div>
                <div className={classes.actions_item}>
                    <FontAwesomeIcon icon={faHouseMedical} className={classes.actions_icon}></FontAwesomeIcon>
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