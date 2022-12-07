import React from "react";
import SearchContractForm from "../Component/Contract/SearchContractForm";
import ContractItem from "../Component/Contract/ContractItem";
import { useState } from "react";

function SearchContract()
{
    const [contract, setContract] = useState(null);

    const findContract = (foundContract) =>
    {
        setContract(foundContract);
    }

    return (

        <div>
          <h2>Chercher un contrat</h2>
            <SearchContractForm setContract={findContract} />
            {contract && <ContractItem contract={contract} />}
        </div>
      );

}
export default SearchContract;