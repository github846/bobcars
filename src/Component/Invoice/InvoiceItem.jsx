import React, { useContext } from "react";
import MainContext from "../../Store/Main";
import classes from "../Layout/MyCard.module.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faList, faHouseMedical, faFilePen } from "@fortawesome/free-solid-svg-icons";

function InvoiceItem(props)
{
    const context = useContext(MainContext);
    const updateInvoice = () =>
    {
        context.setInvoice(props.invoice);
        context.setAction("editInvoice");
    };

    console.log(props.invoice);

    return(
        <div className={classes.card}>
            <div>
                <img src="https://www.sgvgreenway.org/img/managed/Image/76/file.png" />
            </div>
            <div>
                <p>Date de paiement: {props.invoice.paymentDate}</p>
                <p>Montant: {props.invoice.amount}</p>
                <p>Adresse: {props.invoice.address}</p>
            </div>
            <div className={classes.cta}>
                <div className={classes["cta-item"]} onClick={() => props.onDelete(props.invoice.id)}>
                    <FontAwesomeIcon icon={faTrash} className={classes["cta-icon"]}></FontAwesomeIcon>
                </div>
                <div className={classes["cta-item"]}>
                    <FontAwesomeIcon icon={faList} className={classes["cta-icon"]}></FontAwesomeIcon>
                </div>
                <div className={classes["cta-item"]}>
                    <FontAwesomeIcon icon={faHouseMedical} className={classes["cta-icon"]}></FontAwesomeIcon>
                </div>
                <div className={classes["cta-item"]} onClick={updateInvoice}>
                    <Link to="/newinvoice">
                        <FontAwesomeIcon icon={faFilePen} className={classes["cta-icon"]}></FontAwesomeIcon>
                    </Link>
                </div>
            </div>
        </div>   
    );
}
export default InvoiceItem;