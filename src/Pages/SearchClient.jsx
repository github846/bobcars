import React from "react";
import SearchClientForm from "../Component/Client/SearchClientForm";
import ClientItem from "../Component/Client/ClientItem";
import { useState } from "react";

function SearchClient()
{
    const [client, setClient] = useState(null);

    const findClient = (foundClient) =>
    {
        setClient(foundClient);
    }

    return (

        <div>
          <h2>Trouver un client</h2>
          <SearchClientForm setClient={findClient} />
          {client && <ClientItem client={client} />}
        </div>
      );

}
export default SearchClient;