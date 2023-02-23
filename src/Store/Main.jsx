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
        setAction: () => {},
        setLoggedIn: () => {}
    }
);

export function MainContextProvider(props) // works like props but scope is global
{
    const [client, setClient] = useState();
    const [car, setCar] = useState();
    const [contract, setContract] = useState();
    const [option, setOption] = useState();
    const [action, setAction] = useState();
    const [loggedIn, setLoggedIn] = useState();

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

        action: action,
        setAction: (action) =>
        {
            setAction(action);
        },

        loggedIn: loggedIn,
        setLoggedIn: (loggedIn) =>
        {
            setLoggedIn(loggedIn);
        }
    };

    return(
        <MainContext.Provider value={context}>
            {props.children}
        </MainContext.Provider>
    );
}

export default MainContext;