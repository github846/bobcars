import { React, useState } from "react";
import classes from "./DropdownMenu.module.css";
import { Link } from "react-router-dom";

function DropdownMenu(props)
{
    const [isActive, setIsactive] = useState(false);
    const toggleActiveHandler = () =>
    {
        setIsactive(!isActive);
    };

    return (
        <div onClick={toggleActiveHandler}>    
            <div className={classes["my_dropdown"]}>
                {props.menu.title}
            </div>    
            {isActive &&
            (
            <div className={classes["my_dropdown_container"]}>
                {props.menu.items.map((menu) =>
                {
                return (
                    <div className={classes["my_dropdown_item"]}>
                        <Link to={menu.link}>{menu.title}</Link>
                    </div>
                    );
                }
                )
                }
            </div>
            )
            }
        </div>
    );
}

export default DropdownMenu;