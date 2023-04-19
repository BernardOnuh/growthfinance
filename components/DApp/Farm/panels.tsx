import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { ConnectWallet, useContract, useContractWrite, Web3Button, useAddress, useTokenBalance, useContractRead } from '@thirdweb-dev/react'

const Panel = () => {
    const address = useAddress();
    const [usdtToStake, setUsdtToStake ] = useState('');
    const UsdtGwrcontractAddress ='0xb57db3aEaBCf8f61f6C69bF0e876755351E48923';
    const usdtTokenAddress = '0x0f1b8a30112f6ee46930a29a37f5ac604387bd96';
    const gwrTokenAddress = '0x3c38896342BB98E95c1BeEB6389729AefAa284a1';
    const { contract } = useContract( UsdtGwrcontractAddress );
    const { mutateAsync, isLoading, error} = useContractWrite( contract, 'approve');

    return (
        <div className='md:grid md:grid-cols-2 items-center justify-center gap-5'>
        <div className='justify-center items-center text-center bg-neutral-950 rounded-md py-5 '>
            <p className='text-neutral-800 py-2'>
                GWR Wallet Balance:
            </p>
            <input
            type='number'
            value={usdtToStake}
            onChange={(e) => setUsdtToStake(e.target.value)}
            className='w-[80%] text-white px-3 py-3 rounded-md bg-neutral-900 hover:shadow'
            placeholder='Enter amount to stake'>
            </input>
            <Web3Button
            contractAddress={usdtTokenAddress}
            action = { async (contract) => {
                await contract.call(
                    'approve',
                        [UsdtGwrcontractAddress, ethers.utils.parseEther(usdtToStake)]
                );
            }}
            className="w-[80%] py-2 px-2 font-medium text-white bg-[#7245FA] rounded transition duration-300"
            >Aprove</Web3Button>
            <Web3Button
            contractAddress='0x...'
            action={() =>{}}
            className="py-2 px-2 font-medium text-white bg-[#7245FA] rounded transition duration-300"
            >Stake</Web3Button>
            <p className='text-neutral-800 py-2'>
                Staked GWR Wallet Balance:
            </p>
            <input
            type='number'
            value={amountToStake}
            className='w-[80%] text-white px-3 py-3 rounded-md bg-neutral-900 hover:shadow'
            placeholder='Amount to Unstake'>
            </input>
            <Web3Button
            contractAddress='0x...'
            action={() =>{}}
            className="py-2 px-2 font-medium text-white bg-[#7245FA] rounded transition duration-300"
            >UnStake</Web3Button>
        </div>
        <div className='justify-center items-center pt-4 text-center bg-neutral-950 rounded-md py-5 '>
        <p className='text-neutral-800 py-2'>
            STK Wallet Balance:
        </p>
            <input
            type='number'
            value={amountToStake}
            className='w-[80%] text-white px-3 py-3 rounded-md bg-neutral-900 hover:shadow'
            placeholder='Amount to Withdraw'>
            </input>
            <Web3Button
            
            className="py-2 px-2 font-medium text-white bg-[#7245FA] rounded transition duration-300"
            >Claim</Web3Button>
            
            <Web3Button
            contractAddress='0x...'
            action={() =>{}}
            className="py-2 px-2 font-medium text-white bg-[#7245FA] rounded transition duration-300"
            >Withdraw</Web3Button>
        </div>
    </div>
    )
}