import { useState } from "react";
import { ModalL } from "../modal/ModalL";
import { issue } from "../../type";
import Tokyo from "../../assets/tokyo.png"
import { useAccount } from "wagmi";
import { VoteButton } from "./VoteButton";

export function IssueInfo(props: {showBow: boolean, close: () => void, issue: issue}) {

    const [isLoading] = useState<boolean>(false);
    const address = useAccount()

    return (
        <ModalL
            isLoading={isLoading}
            showBox={props.showBow}
            closed={props.close}
        >
            <div className="lg:flex lg:w-[800px] pb-8 px-3 lg:px-8">
                <div className='flex justify-center w-full lg:w-[350px]'>
                    <img src={Tokyo} className="shadow rounded w-[330px] h-[300px]"/>
                </div>
                <div className="text-black p-4">
                    <div>{props.issue.name}</div>
                    <div>{props.issue.description}</div>
                    <div>{props.issue.creator}</div>
                    <div>{props.issue.participants}</div>
                    <div>{props.issue.date.start}</div>
                    <div>{props.issue.date.end}</div>
                    <div>{props.issue.status}</div>
                </div>
            </div>
            <div className="flex pb-8 px-3 md:px-8 justify-end">
                {address.isConnected && props.issue.status == "inProgress" ? 
                <VoteButton voteId={props.issue.id} />:
                <button className="bg-cBlue/20 cursor-default p-3 text-white rounded-md">Vote</button>
                }
            </div>
        </ModalL>
    )
}