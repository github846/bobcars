import React, { useContext } from "react";
import MainContext from "../../Store/Main";
import { Link } from "react-router-dom";
import classes from "./ClientRow.module.css";

function ClientRow(props)
{
    const context = useContext(MainContext);
    const updateClient = () =>
    {
        context.setClient(props.client);
        context.setAction("editClient");
    };

    return(
            <tr className={classes.client_info}>
                <td>{props.client.fname}</td>
                <td>{props.client.surname}</td>
                <td>{props.client.address}</td>
                <td>{props.client.dob}</td>
                <td>{props.client.fidelity}</td>
                <td><button onClick={() => props.onDelete(props.client.id)}>Delete</button></td>
                <td>
                    <Link to="/newclient">
                        <button onClick={updateClient}>Edit</button>
                    </Link>
                </td>
            </tr>
        );
}
export default ClientRow;