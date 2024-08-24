import { useEffect, useState } from "react";
import { issue } from "../../type";
import { CategoryList } from "./CategoryList";
import { IssueCard } from "./IssueCard";

export function Issuetable(params: {issues: issue[]}) {

    const [selected, setSelected] = useState<"inComing" | "inProgress" | "ended" | "all">("all")
    const [issuesDisplay, setIssuesDisplay] = useState<issue[]>(params.issues)

    console.log(params.issues)

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