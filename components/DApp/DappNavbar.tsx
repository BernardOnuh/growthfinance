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
            <div className="sm:hidden flex flex-1 justify-end items-center">
                <img
                src={toggle ? '/close.svg':'/menu.svg'}
                alt='menu'
                className="w-[28px] h-[28px] object-contain"
                onClick={() => setToggle(!toggle)}
                />
                <div
                className={`${
                !toggle ?'hidden':'flex'
                } p-6 bg-black border-white border-2 absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}>
                    <ul className="list-none flex justify-end items-start flex-1 flex-col">
                        {dappnavLinks.map((nav,index) =>(
                            <li
                            key={nav.id}
                            className={`cursor-pointer text-[16px] ${
                                active === nav.title ? 'text-white': 'text-dimWhite'}
                                ${index === dappnavLinks.length -1? 'mb-0':'mb-4'}`}>
                                    <a href={`#${nav.id}`}>{nav.title}</a>
                            </li>
                        ))}
                        <li
                        className="p-5 w-124">
                            <ConnectWallet/>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default DappNavbar;
