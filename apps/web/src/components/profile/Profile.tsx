import { useAccount } from "wagmi";
import { issue, user } from "../../type";
import { MBTITable } from "./MBTITable";
import { MyIssueTable } from "./MyIssueTable";
import { useEffect, useState } from "react";
import { getUserInfo, getVotes } from "../../services/api";
import { InviteQRCode } from "./InviteQrcode";

function Profile() {

    const [issues, setIssues] = useState<issue[]>([])
    const [userInfo, setUserInfo] = useState<user>()
    const address = useAccount()

    useEffect(() => {
        if(address.isConnected && address.address) {
            init(address.address)
        }
    }, [address.isConnected])

    async function init(address: string) {
        const userInfo = await getUserInfo(address)
        console.log(userInfo)
        setUserInfo(userInfo)
        const t = await getVotes()
        console.log(t)
        const r = t.map(vote => {
            const v: issue = {
                name: vote.name,
                date: {start: "", end: ""},
                description: vote.description,
                creator: [""],
                participants: [""],
                status: "inProgress",
                result: "Unknown",
                id: vote.id
            }
            return v
        })
        console.log(r)
        setIssues(r)
    }

    return (
        <div>
            <div className="my-4 grid grid-cols-3 gap-4 text-black">
                <div className="flex justify-between h-[200px] greenCardMain shadow rounded-lg p-8">
                    <div className="text-lg">Your QRCode</div>
                    <InviteQRCode />
                </div>
                <div className="flex flex-col justify-between h-[200px] greenCardMain shadow rounded-lg p-8">
                    <div className="text-3xl font-medium">Voting Count</div>
                    <div className="text-8xl font-medium">{userInfo?.vote_count}</div>
                </div>
                <div className="flex flex-col justify-between h-[200px] greenCardMain shadow rounded-lg p-8">
                    <div className="text-3xl font-medium">Rating Count</div>
                    <div className="text-8xl font-medium">{userInfo?.rate_count}</div>
                </div>
            </div>
            <div className="my-4 grid grid-cols-3 gap-4 text-black">
                <div className="flex flex-col justify-between h-[350px] greenCard shadow rounded-lg p-8">
                    <div className="text-3xl font-medium">Your MBTI</div>
                    <div className="text-black/60 text-md font-medium">The MBTI is based on your responses and others' evaluations. Use them as a tool for self-reflection and enjoy exploring your personality.</div>
                </div>
                <div className="col-span-2 h-[350px] bg-white shadow rounded-lg p-8">
                    <MBTITable mbti={userInfo ? userInfo.mbti as number[] : [10, 20, 30, 40, 50]}/>
                </div>
            </div>
            <div className="my-4 grid grid-cols-3 gap-4 text-black">
                <div className="col-span-2 h-[350px] bg-white shadow rounded-lg px-4 overflow-scroll">
                    <MyIssueTable issues={issues}/>
                </div>
                    <div className="flex flex-col h-[350px] greenCard shadow rounded-lg p-8">
                        <div className="text-3xl font-medium">Voting Result</div>
                    </div>            
                </div>
        </div>
    )
}

export default Profile;