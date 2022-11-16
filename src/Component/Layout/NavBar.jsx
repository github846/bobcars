import classes from "./NavBar.module.css";
import React from "react";
import { Link } from "react-router-dom";
import DropdownMenu from "./DropdownMenu";

function Navbar()
{
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

    const invoiceMenu =
    {
        title: "Invoices",
        items:
        [
            {link: "/invoices", title: "List"},
            {link: "/newinvoice", title: "New"},
            {link: "/searchinvoice", title: "Search"}
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

    return(
        <div className={classes.container}>
            <header className={classes.my_header}>
                <div className={classes.logo}>Bob's cars</div>
                <ul className={classes.my_list}>
                    <li>
                        <Link to="/">Home</Link>
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
                        <DropdownMenu menu={invoiceMenu} />
                    </li>
                    <li>
                        <DropdownMenu menu={optionMenu} />
                    </li>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                </ul>
            </header>
        </div>
    )
}

export default Navbar;