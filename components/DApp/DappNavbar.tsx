import { useState } from "react";
import { dappnavLinks } from "../constants";
import { ConnectWallet } from "@thirdweb-dev/react";
import Link from 'next/link';

const DappNavbar = () => {
    const [active, setActive] = useState('Home');
    const [toggle, setToggle] = useState(false);

    return (
        <nav className="w-full  flex py-6 justify-between items-center navbar ">
            <img
            src='/logo.png'
            alt ='logo'
            className="w-[62px] h-[16]"
            />
            <ul className="list-none sm:flex hidden justify-end items-center flex-1">
                {dappnavLinks.map((nav,index) =>(
                    <li
                    key={nav.id}
                    className={`font-poppins font-normal cursor-pointer text-[16px] ${
                        active === nav.title ? 'text-white' : 'text-dimWhite'
                    } ${index === dappnavLinks.length -1 ? 'mr-0':'mr-10'}`}
                    onClick={() => setActive(nav.title)}
                    >
                        <Link href={nav.href}>
                            {nav.title}
                        </Link>
                    </li>
                ))}
                <li
                className='pl-5 w-124'>
                    <ConnectWallet/>
                </li>
            </ul>
        </nav>
    );
};

export default DappNavbar;