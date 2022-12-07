import React from "react";
import ClientRow from "./ClientRow";
import classes from "./ClientTable.module.css";
import api from "../../API/carleasing";

function ClientTable(props)
{
    const deleteHandler = async (id) =>
    {
        try
        {
            await api.delete("/clients/"+ id);
            props.refresh();
        }
        catch(error)
        {
            console.log(error);
        }
    };

    return (
        <div>
            <table className={classes.table}>
                <thead className={classes.thead}>
                    <tr className={classes.tr}>
                        <th>Prénom</th>
                        <th>Nom</th>
                        <th>Adresse</th>
                        <th>Date de naissance</th>
                        <th>Fidélité</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {props.clients.map((client) => {
                            return (
                                <ClientRow client={client} onDelete={deleteHandler} />
                            );
                        })}
                </tbody>
            </table>
        </div>
    )
}

export default ClientTable;