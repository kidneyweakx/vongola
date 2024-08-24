import { issue } from "../../type";
import Tokyo from "../../assets/tokyo.png"
import { IssueInfo } from "./IssueInfo";
import { useState } from "react";

export function IssueCard(params: {issus: issue}) {

    const [showBow, setShowBox] = useState<boolean>(false)

    return (
        <div onClick={() => {setShowBox(true)}} className="flex flex-col items-center shadow m-4 w-[240px] h-[300px] cursor-pointer bg-white p-4 rounded-md hover:shadow-inner text-black">
            <img src={Tokyo} className="rounded w-[220px] h-[180px]"/>
            <div className="m-1 w-full">
                <div className="text-2xl font-medium">{params.issus.name}</div>
                <div>{params.issus.status}</div>
                <div>{params.issus.status == "inComing" ? params.issus.date.start : params.issus.date.end}</div>
            </div>
            <IssueInfo issue={params.issus} showBow={showBow} close={() => {setShowBox(false)}}/>
        </div>
    )
}