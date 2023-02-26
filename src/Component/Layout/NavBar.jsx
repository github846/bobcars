import classes from "./NavBar.module.css";
import React  from "react";
import { Link, useNavigate } from "react-router-dom";
import DropdownMenu from "./DropdownMenu";

function Navbar()
{
    let navigate = useNavigate();

    const carMenu =
    {
        title: "Cars",
        items:
        [
            {link: "/cars", title: "List"},
            {link: "/newcar", title: "New"},
            {link: "/searchcar", title: "Search"}
        ]
    };

    const clientMenu =
    {
        title: "Clients",
        items:
        [
            {link: "/clients", title: "List"},
            {link: "/newclient", title: "New"},
            {link: "/searchclient", title: "Search"}
        ]
    };

    const contractMenu =
    {
        title: "Contracts",
        items:
        [
            {link: "/contracts", title: "List"},
            {link: "/newcontract", title: "New"},
            {link: "/searchcontract", title: "Search"}
        ]
    };

    const optionMenu =
    {
        title: "Options",
        items:
        [
            {link: "/options", title: "List"},
            {link: "/newoption", title: "New"},
            {link: "/searchoption", title: "Search"}
        ]
    };

    const logout = () => {
        localStorage.setItem("loggedIn", "");
        navigate("/");
        window.location.reload();
    }

    return(
        <div className={classes.container}>
            <header className={classes.my_header}>
                <div className={classes.logo}>
                    <img src="https://www.sgvgreenway.org/img/managed/Image/76/file.png" width={100} height={100}/>
                    Bob's cars
                </div>
                <ul className={classes.my_list}>
                    <li>
                        <Link to="/home">Home</Link>
                    </li>
                    <li>
                        <DropdownMenu menu={carMenu} />
                    </li>
                    <li>
                        <DropdownMenu menu={clientMenu} />
                    </li>
                    <li>
                        <DropdownMenu menu={contractMenu} />
                    </li>
                    <li>
                        <DropdownMenu menu={optionMenu} />
                    </li>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                    <li className={classes.logout} onClick={logout}>
                        Logout
                    </li>
                </ul>
            </header>
        </div>
    )
}

export default Navbar;
