import { issue } from "../../type";

export function MyIssueTable(params: { issues: issue[] }) {

    return (
        <div className="w-[330px] lg:w-[700px] my-4 relative overflow-x-auto rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right">
            <thead className="bg-white/50 text-xs text-gray-700 uppercase">
                <tr>
                    <th scope="col" className="px-6 py-3">
                        Issue name
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Status
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Result
                    </th>
                </tr>
            </thead>
            <tbody>
                {
                    params.issues.map((issue) => {
                        return (
                            <tr className="border-b bg-white/40">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                    {issue.name}
                                </th>
                                <td className="px-6 py-4">
                                    {issue.status}
                                </td>
                                <td className="px-6 py-4">
                                    {issue.result}
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    </div>
    )
}