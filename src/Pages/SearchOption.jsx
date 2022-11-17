import React from "react";
import SearchOptionForm from "../Component/Option/SearchOptionForm";
import OptionItem from "../Component/Option/OptionItem";
import { useState } from "react";

function SearchOption()
{
    const [option, setOption] = useState(null);

    const findOption = (foundOption) =>
    {
        setOption(foundOption);
    }

    return (

        <div>
          <h2>Trouver une option</h2>
            <SearchOptionForm setOption={findOption} />
            {option && <OptionItem option={option} />}
        </div>
      );

}
export default SearchOption;