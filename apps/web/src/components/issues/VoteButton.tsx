import { useEffect, useState } from 'react';
import { useWriteContract } from 'wagmi'
import { useAccount } from "wagmi";
import { addVoteCount } from '../../services/api';

const GrpVoteABI = [{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"groupId","type":"uint256"},{"indexed":false,"internalType":"string","name":"groupName","type":"string"}],"name":"GroupCreated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"groupId","type":"uint256"},{"indexed":false,"internalType":"string","name":"topic","type":"string"},{"indexed":false,"internalType":"uint256","name":"votes","type":"uint256"}],"name":"Voted","type":"event"},{"inputs":[{"internalType":"string","name":"_name","type":"string"}],"name":"createGroup","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_topic","type":"string"}],"name":"getTotalVotes","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_groupId","type":"uint256"},{"internalType":"string","name":"_topic","type":"string"}],"name":"getVotes","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"groupCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"","type":"string"}],"name":"groupId","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"groups","outputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"bool","name":"exists","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_groupId","type":"uint256"},{"internalType":"string","name":"_topic","type":"string"}],"name":"vote","outputs":[],"stateMutability":"nonpayable","type":"function"}]

const contracts: {chainId: number, address: `0x${string}`}[] =[
    {chainId: 59141, address: "0xe3a6b8Da8932354592E7F3f6199b82D6E2bdBDb2"},
    {chainId: 534351, address: "0xacCe510e129a9c9E07EC496c923D3beFBDF9E551"},
    {chainId: 6660001, address: "0xacCe510e129a9c9E07EC496c923D3beFBDF9E551"}
]

export function VoteButton(params: {voteId: string}) {
    const account = useAccount()

    const [contractAddress, setContractAddress] = useState<`0x${string}`>("0x")

    const { writeContract } = useWriteContract(
        {mutation: {
            onError: () => { alert("Something went wrong.")}, 
            onSuccess: () => { 
                alert("Good Good.")
                addVoteCount(account.address ? account.address : "", params.voteId)
            }}}
    )
    const randomNumber = Math.floor(Math.random() * 10);

    useEffect(() => {
        contracts.map(c => {
            if(c.chainId == account.chainId) {
                setContractAddress(c.address)
            }
        })
    })

    return (
        <button
            className="bg-cBlue p-3 text-white rounded-md"
            onClick={() => 
                writeContract({ 
                    abi: GrpVoteABI,
                    address: contractAddress,
                    functionName: 'vote',
                    args: [
                        randomNumber,
                        params.voteId
                    ],
                })   
            }
        >
          Vote
        </button>
      )
}