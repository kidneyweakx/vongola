import { IssueCreator } from "./IssueCreator"

export function CategoryList(params: {catagorySelector: {selected: "inComing" | "inProgress" | "ended" | "all", setSelected: React.Dispatch<React.SetStateAction<"inComing" | "inProgress" | "ended" | "all">>}}) {

    return (
        <div>
            <div className="w-full flex justify-between items-center">
                <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 rounded-lg md:flex-row md:items-center md:space-x-2 rtl:space-x-reverse md:mt-0 md:border-0">
                    <li>

                        {params.catagorySelector.selected == "all" ?
                        <div className="rounded-full border border-1 shadow-sm block py-2 px-4 bg-white text-cBlue">All</div>
                        :
                        <div onClick={() => {params.catagorySelector.setSelected("all")}} className="cursor-pointer	rounded-full border border-1 shadow-sm block py-2 px-4 bg-white text-black hover:shadow-inner hover:text-cBlue">All</div>
                        }
                    </li>
                    <li>
                        {params.catagorySelector.selected == "inComing" ?
                        <div className="rounded-full border border-1 shadow-sm block py-2 px-4 bg-white text-cBlue">In coming</div>
                        :
                        <div onClick={() => {params.catagorySelector.setSelected("inComing")}} className="cursor-pointer rounded-full border border-1 shadow-sm block py-2 px-4 bg-white text-black hover:shadow-inner hover:text-cBlue">In coming</div>
                        }                    
                    </li>
                    <li>
                        {params.catagorySelector.selected == "inProgress" ?
                        <div className="rounded-full border border-1 shadow-sm block py-2 px-4 bg-white text-cBlue">In progress</div>
                        :
                        <div onClick={() => {params.catagorySelector.setSelected("inProgress")}} className="cursor-pointer rounded-full border border-1 shadow-sm block py-2 px-4 bg-white text-black hover:shadow-inner hover:text-cBlue">In progress</div>
                        }                    
                    </li>
                    <li>
                        {params.catagorySelector.selected == "ended" ?
                        <div className="rounded-full border border-1 shadow-sm block py-2 px-4 bg-white text-cBlue">Ended</div>
                        :
                        <div onClick={() => {params.catagorySelector.setSelected("ended")}} className="cursor-pointer rounded-full border border-1 shadow-sm block py-2 px-4 bg-white text-black hover:shadow-inner hover:text-cBlue">Ended</div>
                        }                    
                    </li>
                </ul>

                <div>
                    <IssueCreator />
                </div>
            </div>
        </div>
    )
}