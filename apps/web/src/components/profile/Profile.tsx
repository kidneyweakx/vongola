import { useAccount } from "wagmi";
import { issue, user } from "../../type";
import { MBTITable } from "./MBTITable";
import { MyIssueTable } from "./MyIssueTable";
import { useEffect, useState } from "react";
import { getUserInfo } from "../../services/api";

const issueExample: issue = {
    name: "ethTokyo",
    date: {start: "2024-08-24", end: "2024-08-25"},
    description: "This is an example.",
    creator: ["0xf3419771c2551f88a91Db61cB874347f05640172"],
    participants: ["0xf3419771c2551f88a91Db61cB874347f05640172"],
    status: "inComing",
    result: "Pass"
}

function Profile() {

    const _issues: issue[] = Array(30).fill(issueExample);

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
    }

    return (
        <div>
            <div className="my-4 grid grid-cols-3 gap-4 text-black">
                <div className="flex flex-col justify-between h-[200px] greenCardMain shadow rounded-lg p-8">
                    <div className="text-3xl font-medium">User Information</div>
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
                    <MyIssueTable issues={_issues}/>
                </div>
                    <div className="flex flex-col h-[350px] greenCard shadow rounded-lg p-8">
                        <div className="text-3xl font-medium">Voting Result</div>
                    </div>            
                </div>
        </div>
    )
}

export default Profile;