import React, { useState, useEffect } from 'react';
import { Input, Popover, Radio, Modal, message } from 'antd';
import { ArrowDownOutlined, DownOutlined, SettingOutlined } from '@ant-design/icons';
import tokenList from './tokenList.json';
import styles from '@/styles/style';

interface prices{
    ratio:number;
  }
const Swap = () =>{
    const [ slippage, setSlippage] = useState(2.5);
    const [ isOpen, setIsOpen ] = useState(false);
    const [ tokenOneAmount, setTokenOneAmount] =useState('')
    const [ tokenTwoAmount, setTokenTwoAmount] =useState('')
    const [tokenOne, setTokenOne]=useState(tokenList[0]);
    const [tokenTwo, setTokenTwo]=useState(tokenList[1]);
    const [changeToken, setChangeToken]=useState(1);
    const [prices, setPrices] = useState<prices| null>(null);

    function handleSlippageChange(e:any) {
       setSlippage(e.target.value); 
    }

    function changeAmount(e:any){
        setTokenOneAmount(e.target.value);
        if(e.target.value && prices?.ratio){
            setTokenTwoAmount(Number((e.target.value * prices.ratio)).toFixed(2))
        }else{
            setTokenTwoAmount('');
        }
    }

    function switchTokens() {
        setPrices(null);
        setTokenOneAmount('');
        setTokenTwoAmount('');
        const one = tokenOne;
        const two = tokenTwo;
        setTokenOne(two);
        setTokenTwo(one);
        fetchPrices(two.address, one.address);
    }

    function openModal(asset:any) {
        setChangeToken(asset);
        setIsOpen(true);
    }

    function modifyToken(i:any){
        setPrices(null);
        setTokenOneAmount('');
        setTokenTwoAmount('');
        if (changeToken ===1 ) {
            setTokenOne(tokenList[i]);
            fetchPrices(tokenList[i].address, tokenTwo.address)
        } else {
            setTokenTwo(tokenList[i]);
            fetchPrices(tokenOne.address, tokenList[i].address)
        }
        setIsOpen(false);
    }

    async function fetchPrices(
        one=tokenOne.address, 
        two=tokenTwo.address
        )
        {
        

    }

    useEffect(()=>{

        fetchPrices(tokenList[0].address, tokenList[1].address)
    }, [])

    const settings = (
        <>
         <div> Slippage Tolerance </div>
         <div>
         <Radio.Group value={slippage} onChange = {handleSlippageChange}>
            <Radio.Button value={0.5}>0.5%</Radio.Button>
            <Radio.Button value={2.5}>2.5%</Radio.Button>
            <Radio.Button value={5}>5.0%</Radio.Button>
         </Radio.Group>
         </div>
        </>
    );
    return(
        <section className={`${styles.flexCenter} ${styles.paddingY}`}>
         <Modal
         open={isOpen}
         footer={null}
         onCancel={() => setIsOpen(false)}
         title = 'Select a token'
         >
            <div className='flex flex-col gap-[10px] border-t-2 border-gray-950 mt-[20px]'>
                {tokenList?.map((e,i) =>{
                    return(
                        <div className='flex  justify-start item-center pl-[20px] py-[10px] hover:bg-black hover:cursor-pointer'
                            key={i}
                            onClick={() => modifyToken(i)}
                            >
                                <img
                                src={e.img}
                                alt={e.ticker}
                                className='h-[40px] w-[40px]'/>
                                <div className=''>
                                    <div className='ml-[10px] text-sm font-medium'>{e.name}</div>
                                    <div className='ml-[10px] text-xs font-light text-white'>{e.ticker}</div>
                                </div>
                        </div>
                    );
                })}
            </div>
         </Modal>
         <div className='bg-black border-gray-200 border-2 rounded-md justify-start flex flex-col item-start px-5 w-[400px] min-h-[300px]'>
            <div className='flex item-center justify-between w-[98%] py-3'>
                <h4 className='text-xl'>Swap</h4>
                <Popover 
                content={settings}
                title= 'Settings'
                trigger='click'
                placement='bottomRight'
                >
                    <SettingOutlined className='duration-100 text-white hover:rotate-90 hover:cursor-pointer'/>
                </Popover>
            </div>
            <div className='relative text-white'>
                <Input
                placeholder ='0'  
                value= {tokenOneAmount}
                onChange={changeAmount}
                disabled= {!prices}
                />
              <Input placeholder='0' value={tokenTwoAmount} disabled={true} />
              <div className='bg-black w-[25px] h-[25px] items-center justify-center flex rounded-md absolute top-[86px] left-[180px] text-sm duration-300 hover:text-white hover:cursor-pointer'>
              <ArrowDownOutlined className='font-bold text-white'/>
            </div>
            <div className='absolute min-w-[50px] h-[30px] bg-neutral-950 top-[36px] right-[20px] rounded-md flex justify-start items-center gap-[5px] font-bold text-sm pr-2 hover:cursor-pointer'
                onClick={() => openModal(1)}>
            <img src={tokenOne.img} alt='assetOneLogo' className='h-[22px] ml-2'/>
                {tokenOne.ticker}
                <DownOutlined className='font-bold text-white'/>
            </div>
            <div className='absolute min-w-[50px] h-[30px] bg-neutral-950 top-[135px] right-[20px]  rounded-md flex justify-start items-center gap-[5px] font-bold text-sm pr-2 hover:cursor-pointer'
                onClick={() => openModal(2)}>
            <img src={tokenTwo.img} alt='assetOneLogo' className='h-[22px] ml-2'/>
                {tokenTwo.ticker}
                <DownOutlined className='font-bold text-white' />
            </div>
            <div className='flex justify-center items-center bg-white w-[100%] h-[55px] text-xl rounded-md text-black font-bold my-5 duration-300 hover:bg-neutral-950 hover:text-white'>
                SWAP
            </div>
         </div>
         </div>
        </section>
    );
};

export default Swap;