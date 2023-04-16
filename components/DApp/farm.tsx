import React, {useState, useEffect} from 'react';
import { Collapse } from 'antd';
import styles from '@/styles/style';

const Farm = () =>{



return(
    <section className={`${styles.flexCenter} ${styles.paddingY}`}>
    <div className='bg-black border-gray-300 border-2 rounded-md w-2/3 min-h-[500px] md:grid md:grid-cols-3 gap-5  '> 
        <div className=''>
            
                Growth Finance
            
        </div>
        <div className='md:col-span-2'>
            love
        </div>
    </div>   
    </section>
)
}

export default Farm;