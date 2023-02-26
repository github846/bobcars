import { createContext, useState } from "react";

const MainContext = createContext( // global variables
    {
        client: null,
        car: null,
        contract: null,
        option: null,
        action: "",
        loggedIn: false,
        setClient: () => {},
        setCar: () => {},
        setContract: () => {},
        setOption: () => {},
        setAction: () => {}
    }
);

export function MainContextProvider(props) // works like props but scope is global
{
    const [client, setClient] = useState();
    const [car, setCar] = useState();
    const [contract, setContract] = useState();
    const [option, setOption] = useState();
    const [action, setAction] = useState();

    const context =
    {
        client: client,
        setClient: (client) =>
        {
            setClient(client);
        },

        car: car,
        setCar: (car) =>
        {
            setCar(car);
        },

        contract: contract,
        setContract: (contract) =>
        {
            setContract(contract);
        },

        option: option,
        setOption: (option) =>
        {
            setOption(option);
        },
        // mostly used to change between editing and adding 
        // in the form
        action: action,
        setAction: (action) =>
        {
            setAction(action);
        }

    };

    return(
        <MainContext.Provider value={context}>
            {props.children}
        </MainContext.Provider>
    );
}

export default MainContext;