import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { ConnectWallet, useContract, useContractWrite, Web3Button, useAddress, useTokenBalance, useContractRead } from '@thirdweb-dev/react'

const FPanel = () => {
    const address = useAddress();
    const [usdtToStake, setUsdtToStake ] = useState('');
    const [usdtToUnstake, setUsdtToUnstake] = useState('');
    const [ transactionSuccessful, setTransactionSuccessful ] = useState(false);
    const [amountToStake, setAmountToStake] = useState('')
    const UsdtGwrcontractAddress ='0xb57db3aEaBCf8f61f6C69bF0e876755351E48923';
    const usdtTokenAddress = '0x0f1b8a30112f6ee46930a29a37f5ac604387bd96';
    const gwrTokenAddress = '0x3c38896342BB98E95c1BeEB6389729AefAa284a1';
    const { contract } = useContract( UsdtGwrcontractAddress );
    const handleSuccess = (result: any) => {
        console.log('Transaction successful',result);
        setTransactionSuccessful(true);
    };
    const { contract:usdtToken, isLoading:isusdtTokenLoading} = useContract(usdtTokenAddress);
    const { contract:gwrToken, isLoading:isgwrTokenLoading} = useContract(gwrTokenAddress);
    const { data: usdtTokenBalance, refetch: refetchusdtTokenBalance } = useTokenBalance(usdtToken, address);
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
                    {usdtTokenBalance?.displayValue}
                </span>
            </p>
            <input
            type='number'
            value={usdtToStake}
            onChange={(e) => setUsdtToStake(e.target.value)}
            className='w-[80%] text-white px-3 py-3 rounded-md bg-neutral-900 hover:shadow'
            placeholder='Enter amount to stake'>
            </input>
            <div  
            className="w-[80%] py-2 px-2 font-medium text-white bg-white rounded transition duration-300 items-center justify-center">
             {transactionSuccessful ? (
                <Web3Button
                contractAddress={UsdtGwrcontractAddress}
                action = {(contract) => {
                    contract.call(
                        'stake',
                        [ethers.utils.parseEther(usdtToStake)]
                )
                }}
                onError={(error) => alert('Something went wrong!')}
                >
                    Stake
                </Web3Button>
             ):(   
            <Web3Button
            contractAddress={usdtTokenAddress}
            action = {(contract) => {
                contract.call(
                    'approve',
                    [ethers.utils.parseEther(usdtToStake)]
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
                    {balanceinfo?.displayValue}
                </span>
            </p>
            <input
            type='number'
            value={usdtToUnstake}
            className='w-[80%] text-white px-3 py-3 rounded-md bg-neutral-900 hover:shadow'
            onChange={(e) => setUsdtToUnstake(e.target.value)}
            placeholder='Amount to Unstake'>
            </input>
            <Web3Button
            contractAddress={UsdtGwrcontractAddress}
                action = {async(contract) => {
                    contract.call(
                        'unstake',
                        [ethers.utils.parseEther(usdtToUnstake)]
                )
                }}
                onError={(error) => alert('Something went wrong!')}
            >UnStake</Web3Button>
        </div>
        <div className='justify-center items-center pt-4 text-center bg-neutral-950 rounded-md py-5 '>
        <p className='text-neutral-800 py-2'>
            GWR Earned Balance:
            <span id='balance'>
                    {earnedinfo?.displayValue}
                </span>
        </p>
            <Web3Button
              contractAddress={UsdtGwrcontractAddress}
                action = {async(contract) => {
                    contract.call(
                        'claim'
                )
                }}
                onError={(error) => alert('Something went wrong!')}
            className="py-2 px-2 font-medium text-white bg-[#7245FA] rounded transition duration-300"
            >Claim</Web3Button>
            
            <p className='text-neutral-800 py-2'>
            GWR Wallet Balance:
            <span id='balance'>
                    {gwrTokenBalance?.displayValue}
                </span>
            </p>
           <Web3Button
           contractAddress={UsdtGwrcontractAddress}
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

export default FPanel;