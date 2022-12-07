import React from "react";
import api from "../API/carleasing.js";
import { useState, useEffect } from "react";
import classes from '../Component/Layout/Home.module.css';
import { Link } from "react-router-dom";
import { useContext } from "react";
import MainContext from "../Store/Main.jsx";

function Home()
{
    const [cars, setCars] = useState([]);
    const [clients, setClients] = useState([]);
    const [contracts, setContracts] = useState([]);
    const context = useContext(MainContext);

    useEffect(() =>{ getCars();}, []);

    const getCars = async () =>
    {
        try
        {
            const result = await api.get("/cars/");
            setCars(result.data);
        }
        catch (error)
        {
            console.log(error);
        }
    };

    useEffect(() => { getClients(); }, []);

    const getClients = async () =>
    {
        try
        {
            const result = await api.get("/clients/");
            setClients(result.data);
        }
        catch (error)
        {
            console.log(error);
        }
    };

    useEffect(() => { getContracts(); }, []);

    const getContracts = async () =>
    {
        try
        {
            const result = await api.get("/contracts/");
            setContracts(result.data);
        }
        catch (error)
        {
            console.log(error);
        }
    };

    console.log('login test: ' + context.loggedIn);

    return(
        <div refresh={[getCars, getClients, getContracts]}>
            Welcome!
            <div className={classes.home_container}>
                <div className={classes.home_item}><img className={classes.my_img} src='https://www.enterprise.com/content/dam/global-vehicle-images/cars/FORD_FUSION_2020.png'/>
                Cars 
                <Link to="/cars"><span className={classes.info_amount}>{cars.length}</span></Link></div>
                <div className={classes.home_item}><img className={classes.my_img} src='https://logodix.com/logo/825378.png' />
                Clients
                <Link to="/clients"><span className={classes.info_amount}>{clients.length}</span></Link></div>
                <div className={classes.home_item}><img className={classes.my_img} src='https://cdn1.iconfinder.com/data/icons/business-rounded-vol-1/512/Contract-1024.png' />
                Contracts
                <Link to="/contracts"><span className={classes.info_amount}>{contracts.length}</span></Link></div>
            </div>           
        </div>
    )
    
}
export default Home;