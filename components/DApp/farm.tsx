import React, {useState, useEffect} from 'react';
import { Collapse, theme } from 'antd';
import styles from '@/styles/style';
import Link from 'next/link';
import FPanel from './Farm/panels';
import Mgwr from './Farm/maticgwr';
import Gmatic from './Farm/gwrmatic';


const Farm = () =>{
    const { Panel } = Collapse;
    const { token } = theme.useToken();

    const panelStyle = {
        borderRadius:token.borderRadiusLG,
    }

    const accordion1 = (
        <>
        <div className='grid grid-cols-4 gap-4 items-center justify-center text-center text-white font-medium text-base'>
            <div className=''>
                <img src='/usdtg.png' width={40} height={40}/>
            </div>
            <div
            >
                $1090600</div>
            <div className='sm:flex hidden '>
                <img src='/usdtg.png' width={40} height={40} className='inline'/>
                <span className='py-2 ml-2'>250GWR/Day</span>
                </div>
            <div>100%</div>
        </div>
        </>
    );

    const accordion2 = (
        <>
        <div className='grid grid-cols-4 gap-4 items-center justify-center text-center text-white font-medium text-base'>
            <div className=''>
                <img src='/mgwr.png' width={40} height={40}/>
            </div>
            <div
            >
                $1000</div>
            <div className='sm:flex hidden '>
                <img src='/mgwr.png' width={40} height={40} className='inline'/>
                <span className='py-2 ml-2'>500GWR/Day</span>
                </div>
            <div>100%</div>
        </div>
        </>
    );

    const accordion3 = (
        <>
        <div className='grid grid-cols-4 gap-4 items-center justify-center text-center text-white font-medium text-base'>
            <div className=''>
                <img src='/gmatic.png' width={40} height={40}/>
            </div>
            <div
            >
                $15690</div>
            <div className='sm:flex hidden '>
                <img src='/gmatic.png' width={40} height={40} className='inline'/>
                <span className='py-2 ml-2'>50Matic/Day</span>
                </div>
            <div>100%</div>
        </div>
        </>
    );


return(
    <section className={`${styles.flexCenter} ${styles.paddingY}`}>
    <div className='bg-black border-gray-300 border-2 rounded-md md:w-[80%] w-[90%] min-h-fit md:grid md:grid-cols-3 gap-10 p-5'> 
        <div className='justify-center items-center bg-neutral-900 text-center rounded-md'>
            <div className='py-3 text-4xl font-bold'>
                Growth Finance
            </div>
            <p className='py-3 text-xl font-semibold'>Farm TVL:$1,000,000</p>
            <Link href='/'>
                View Vault
            </Link>
        </div>
        <div className='md:col-span-2 py-5 px-3'>
            <div className='grid grid-cols-4 gap-5 md:gap-4 text-center'>
                <div className='sm:font-bold font-medium text-xl cursor-pointer'>Stake</div>
                <div className='sm:font-bold font-medium text-xl cursor-pointer'>TVL</div>
                <div className='sm:font-bold font-medium text-xl cursor-pointer sm:flex hidden'>Allocation</div>
                <div className='sm:font-bold font-medium text-xl cursor-pointer'>APR</div>
            </div>
            <div>
                <Collapse
                bordered={false}
                defaultActiveKey={['1']}
                >
                    <Panel key={'1'} 
                    showArrow={false} 
                    header={accordion1} 
                    className={`${styles.collapse}`}
                    style={panelStyle}>
                        <FPanel/>
                    </Panel>
                    <Panel key={'2'} 
                    showArrow={false} 
                    header={accordion2} 
                    className={`${styles.collapse}`}
                    style={panelStyle}>
                        <Mgwr/>
                    </Panel>
                    <Panel key={'3'} 
                    showArrow={false} 
                    header={accordion3} 
                    className={`${styles.collapse}`}
                    style={panelStyle}>
                        <Gmatic/>
                    </Panel>
                </Collapse>
            </div>
        </div>
    </div>   
    </section>
)
}

export default Farm;