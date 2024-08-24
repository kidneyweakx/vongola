import { issue } from "../../type";
import { Issuetable } from "./IssueTable";

const issueExample: issue = {
    name: "ethTokyo",
    date: {start: "2024-08-24", end: "2024-08-25"},
    description: "This is an example.",
    creator: ["0xf3419771c2551f88a91Db61cB874347f05640172"],
    participants: ["0xf3419771c2551f88a91Db61cB874347f05640172"],
    status: "inComing"
}

function Issues() {

    const _issues: issue[] = Array(30).fill(issueExample);

    return (
        <div className="">
            <Issuetable issues={_issues} />
        </div>
    )
}

export default Issues;