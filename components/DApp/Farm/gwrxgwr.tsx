import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { ConnectWallet, useContract, useContractWrite, Web3Button, useAddress, useTokenBalance, useContractRead } from '@thirdweb-dev/react'

const Gxgwr = () => {
    const address = useAddress();
    const [gwrToStake, setGwrToStake ] = useState('');
    const [xgwrToUnstake, setXgwrToUnstake] = useState('');
    const [ transactionSuccessful, setTransactionSuccessful ] = useState(false);
    const [amountToStake, setAmountToStake] = useState('')
    const GwrXgwrcontractAddress ='0x0234060d497574D2aE1D5B2CBbbEAaa290e256e9';
    const xgwrTokenAddress = "0xb67cFbaa405861D4eF3832Ef56eB95D0e338433d";
    const gwrTokenAddress = '0x3c38896342BB98E95c1BeEB6389729AefAa284a1';
    const { contract } = useContract( GwrXgwrcontractAddress );
    const handleSuccess = (result: any) => {
        console.log('Transaction successful',result);
        setTransactionSuccessful(true);
    };
    const { contract:xgwrToken, isLoading:isxgwrTokenLoading} = useContract(xgwrTokenAddress);
    const { contract:gwrToken, isLoading:isgwrTokenLoading} = useContract(gwrTokenAddress);
    const { data: xgwrTokenBalance, refetch: refetchusdtTokenBalance } = useTokenBalance(xgwrToken, address);
    const { data: gwrTokenBalance, refetch: refetchgwrTokenBalance } = useTokenBalance(gwrToken, address);
    const {
        data:balanceinfo,
        refetch: refetchBalanceInfo,
        isLoading: isBalanceLoading,
    } = useContractRead( contract, 'balanceOf', [address]);
    const {
        data:earnedinfo,
        refetch: refetchEarnedInfo,
        isLoading: isEarnedInfoLoading,
    } = useContractRead( contract, 'earned', [address]);

    useEffect(() => {
        setInterval(() => {
          refetchData();
        }, 10000);
      }, []);

     const refetchData = () => {
        refetchusdtTokenBalance();
        refetchgwrTokenBalance();
        refetchBalanceInfo();
        refetchEarnedInfo();

     }; 


    return (
        <div className='md:grid md:grid-cols-2 items-center justify-center gap-5'>
        <div className='justify-center items-center text-center bg-neutral-950 rounded-md py-5 '>
            <p className='text-neutral-800 py-2'>
                GWR Wallet Balance: 
                <span id='balance'>
                    {gwrTokenBalance?.displayValue}
                </span>
            </p>
            <input
            type='number'
            value={gwrToStake}
            onChange={(e) => setGwrToStake(e.target.value)}
            className='w-[80%] text-white px-3 py-3 rounded-md bg-neutral-900 hover:shadow'
            placeholder='Enter amount to stake'>
            </input>
            <div  
            className='py-2'>
             {transactionSuccessful ? (
                <Web3Button
                contractAddress={GwrXgwrcontractAddress}
                action = {(contract) => {
                    contract.call(
                        'stake',
                        [ethers.utils.parseEther(gwrToStake)]
                )
                }}
                onError={(error) => alert('Something went wrong!')}
                >
                    Stake
                </Web3Button>
             ):(   
            <Web3Button
            contractAddress={gwrTokenAddress}
            action = {(contract) => {
                contract.call(
                    'approve',
                    [GwrXgwrcontractAddress, ethers.utils.parseEther(gwrToStake)]
            )
            }}
            onError={(error) => alert('Something went wrong!')}
            onSuccess = {handleSuccess}
            >Aprove
            </Web3Button>
            )}
            </div>
            <p className='text-neutral-800 py-2'>
                Staked GWR Wallet Balance:
                <span id='balance'>
                    {balanceinfo && ethers.utils.formatEther(balanceinfo.toString())}
                </span>
            </p>
            <input
            type='number'
            value={xgwrToUnstake}
            className='w-[80%] text-white px-3 py-3 rounded-md bg-neutral-900 hover:shadow'
            onChange={(e) => setXgwrToUnstake(e.target.value)}
            placeholder='Amount to Unstake'>
            </input>
            <Web3Button
            contractAddress={GwrXgwrcontractAddress}
                action = {async(contract) => {
                    contract.call(
                        'unstake',
                        [ethers.utils.parseEther(xgwrToUnstake)]
                )
                }}
                onError={(error) => alert('Something went wrong!')}
            >UnStake</Web3Button>
        </div>
        <div className='justify-center items-center pt-4 text-center bg-neutral-950 rounded-md py-5 '>
        <p className='text-neutral-800 py-2'>
            XGWR Earned Balance:
            <span id='balance'>
                    {earnedinfo && ethers.utils.formatEther(earnedinfo .toString())}
                </span>
        </p>
            <Web3Button
              contractAddress={GwrXgwrcontractAddress}
                action = {async(contract) => {
                    contract.call(
                        'claim'
                )
                }}
                onError={(error) => alert('Something went wrong!')}
            className="py-2 px-2 font-medium text-white bg-[#7245FA] rounded transition duration-300"
            >Claim</Web3Button>
            
            <p className='text-neutral-800 py-2'>
            XGWR Wallet Balance:
            <span id='balance'>
                    {xgwrTokenBalance?.displayValue}
                </span>
            </p>
           <Web3Button
           contractAddress={GwrXgwrcontractAddress}
                action = {async(contract) => {
                    contract.call(
                        'exit'
                )
                }}
                onError={(error) => alert('Something went wrong!')}
        >Withdraw All</Web3Button>
        </div>
    </div>
    )
}

export default Gxgwr;