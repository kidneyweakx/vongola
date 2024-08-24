import { useEffect, useState } from "react";
import { issue } from "../../type";
import { Issuetable } from "./IssueTable";
import { getVotes } from "../../services/api";

function Issues() {

    const [issues, setIssues] = useState<issue[]>([])

    useEffect(() => {
        init()
    }, [])

    async function init() {
        const t = await getVotes()
        const r = t.map(vote => {
            const v: issue = {
                name: vote.name,
                date: {start: "", end: ""},
                description: vote.description,
                creator: [""],
                participants: [""],
                status: "inProgress",
                result: "Pass",
                id: vote.id
            }
            return v
        })
        console.log(r)
        setIssues(r)
    }

    return (
        <div className="">
            <Issuetable issues={issues} />
        </div>
    )
}

export default Issues;