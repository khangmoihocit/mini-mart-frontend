import React from 'react';
import styles from './styles.module.scss';
import { BiChevronsLeft } from "react-icons/bi";
import { BiChevronsRight } from "react-icons/bi";

const Sidebar = () => {
    const {} = styles;

    return (
        <div>
            <div >
                <img src="" alt="" />
                <BiChevronsLeft />
                <BiChevronsRight />
            </div>

            <div>MAIN HOME</div>
            <div>
                <div></div>
            </div>
        </div>
    );
};

export default Sidebar;