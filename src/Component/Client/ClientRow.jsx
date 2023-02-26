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
    const client_id  = props.client.id;

    return(
            <tr className={classes.client_info}>
                <td>{props.client.fname}</td>
                <td>{props.client.surname}</td>
                <td>{props.client.address}</td>
                <td>{props.client.dob}</td>
                <td><button className={classes.delete} onClick={() => props.onDelete(props.client.id)}>Delete</button></td>
                <td>
                    <Link to="/newclient">
                        <button onClick={updateClient}>Edit</button>
                    </Link>
                </td>
                <td key={client_id}>
                    <Link to={`/contracts/client_id/${client_id}`}>
                        <button>{props.client.fname}'s contracts</button>
                    </Link>
                </td>
            </tr>
        );
}
export default ClientRow;