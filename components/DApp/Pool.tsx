import React, {useState, useEffect } from 'react';
import Addpool from './Addpool';
import {Modal} from 'antd';
import styles from '@/styles/style';

const Pool = () =>{
    const [isOpen, setIsOpen] =useState(false)

    function openModal(){
        setIsOpen(true);
    }

    


    return(
        <section className={`${styles.flexCenter} ${styles.paddingY}`}>
        <>
        <Modal
        open={isOpen}
        footer={null}
        onCancel ={() => setIsOpen(false)}
        title = 'AddLiquidity'>
            <Addpool />
        </Modal>
         </>
            <div className='bg-black border-gray-300 border-2 rounded-md  flex flex-col    justify-center items-center '>
                <div className='lg:text-5xl md:text-4xl sm:text-3xl text-2xl pb-5  text-center font-bold justify-center'>
                    My Liquidity Positions
                    </div>
                <div className='bg-neutral-900 border-neutral-500 border-2 pb-5 rounded-md w-2/3 min-h-[200px] flex justify-center items-center'>
                    <div className='text-center lg:text-4xl md:text-3xl sm:text-2xl text-black'>
                        No liquidity was found
                    </div>
                    </div>
                <div className='flex item-center justify-between pt-5 '>
                    <div className= 'bg-white text-black font-bold rounded-[10px]  cursor-pointer py-[6px] px-4 mx-10 hover:text-white hover:bg-neutral-950'
                    onClick={() => openModal()} >
                        Add</div>
                    <div className= 'bg-white text-black font-bold rounded-[10px]  cursor-pointer py-[6px] px-4 mx-10 hover:text-white hover:bg-neutral-950'>
                        import</div>
                </div>
            </div>
        </section>
    )
}

export default Pool