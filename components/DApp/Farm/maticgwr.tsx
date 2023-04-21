import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { ConnectWallet, useContract, useContractWrite, Web3Button, useAddress, useTokenBalance, useContractRead } from '@thirdweb-dev/react'

const Mgwr = () => {
    const address = useAddress();
    const [maticToStake, setMaticToStake ] = useState('');
    const [maticToUnstake, setMaticToUnstake] = useState('');
    const [ transactionSuccessful, setTransactionSuccessful ] = useState(false);
    const [amountToStake, setAmountToStake] = useState('')
    const MaticGwrcontractAddress ='0x2916174A2515058bA91f68da91EE99A7400E391C';
    const maticTokenAddress = "0x39d48205B0bFd3dD1C1CEb6F248D52D26aBaFE6a";
    const gwrTokenAddress = '0x3c38896342BB98E95c1BeEB6389729AefAa284a1';
    const { contract } = useContract( MaticGwrcontractAddress );
    const handleSuccess = (result: any) => {
        console.log('Transaction successful',result);
        setTransactionSuccessful(true);
    };
    const { contract:maticToken, isLoading:ismaticTokenLoading} = useContract(maticTokenAddress);
    const { contract:gwrToken, isLoading:isgwrTokenLoading} = useContract(gwrTokenAddress);
    const { data: maticTokenBalance, refetch: refetchusdtTokenBalance } = useTokenBalance(maticToken, address);
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
                    {maticTokenBalance?.displayValue}
                </span>
            </p>
            <input
            type='number'
            value={maticToStake}
            onChange={(e) => setMaticToStake(e.target.value)}
            className='w-[80%] text-white px-3 py-3 rounded-md bg-neutral-900 hover:shadow'
            placeholder='Enter amount to stake'>
            </input>
            <div  
            className='py-2'>
             {transactionSuccessful ? (
                <Web3Button
                contractAddress={MaticGwrcontractAddress}
                action = {(contract) => {
                    contract.call(
                        'stake',
                        [ethers.utils.parseEther(maticToStake)]
                )
                }}
                onError={(error) => alert('Something went wrong!')}
                >
                    Stake
                </Web3Button>
             ):(   
            <Web3Button
            contractAddress={maticTokenAddress}
            action = {(contract) => {
                contract.call(
                    'approve',
                    [MaticGwrcontractAddress, ethers.utils.parseEther(maticToStake)]
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
            value={maticToUnstake}
            className='w-[80%] text-white px-3 py-3 rounded-md bg-neutral-900 hover:shadow'
            onChange={(e) => setMaticToUnstake(e.target.value)}
            placeholder='Amount to Unstake'>
            </input>
            <Web3Button
            contractAddress={MaticGwrcontractAddress}
                action = {async(contract) => {
                    contract.call(
                        'unstake',
                        [ethers.utils.parseEther(maticToUnstake)]
                )
                }}
                onError={(error) => alert('Something went wrong!')}
            >UnStake</Web3Button>
        </div>
        <div className='justify-center items-center pt-4 text-center bg-neutral-950 rounded-md py-5 '>
        <p className='text-neutral-800 py-2'>
            GWR Earned Balance:
            <span id='balance'>
                    {earnedinfo && ethers.utils.formatEther(earnedinfo .toString())}
                </span>
        </p>
            <Web3Button
              contractAddress={MaticGwrcontractAddress}
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
           contractAddress={MaticGwrcontractAddress}
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

export default Mgwr;