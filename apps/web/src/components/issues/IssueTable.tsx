import { useEffect, useState } from "react";
import { issue } from "../../type";
import { CategoryList } from "./CategoryList";
import { IssueCard } from "./IssueCard";
import { getVotes } from "../../services/api";

export function Issuetable(params: {issues: issue[]}) {

    const [selected, setSelected] = useState<"inComing" | "inProgress" | "ended" | "all">("all")
    const [issuesDisplay, setIssuesDisplay] = useState<issue[]>(params.issues)

    useEffect(() => {
        init()
    }, [])

    async function init() {
        const t = await getVotes()
        console.log(t)
    }

    useEffect(() => {
        if(selected == "all") {
            setIssuesDisplay(params.issues)
        } else {
            setIssuesDisplay(
                params.issues.filter((_issue) => {
                    return _issue.status == selected
                })
            )
        }
    }, [selected])

    return (
        <div>
            <CategoryList catagorySelector={{selected: selected, setSelected: setSelected}}/>
            <div className="flex flex-wrap my-4">
                {issuesDisplay.map((_issue, index) => {
                    return <IssueCard key={`issueCard-${index}`} issus={_issue} />
                })}
            </div>
        </div>
    )
}