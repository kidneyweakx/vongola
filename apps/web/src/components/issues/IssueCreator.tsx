
import { useEffect, useState } from "react";
import { ModalL } from "../modal/ModalL";
import { DatePickerSection } from "../modal/DatePicker";
import Tokyo from "../../assets/tokyo.png"
import { createIssue } from "../../services/api";

export function IssueCreator() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showBow, setShowBox] = useState<boolean>(false);
  const [taskName, setTaskName] = useState<string>("")
  const [taskDescription, setTaskDescription] = useState<string>("")
  const [dateSelectedStart, setDateSelectedStart] = useState<Date | undefined>();
  const [dateSelectedEnd, setDateSelectedEnd] = useState<Date | undefined>();

  useEffect(() => {
    setTaskDescription("")
    setDateSelectedStart(undefined)
    setDateSelectedEnd(undefined)
    setTaskDescription("")
  }, [])


  async function createTask() {
    setIsLoading(true)
    if(taskName == "" || dateSelectedStart == undefined || dateSelectedEnd == undefined || taskDescription == "") {
      alert("Fillfull all columns!")
      setIsLoading(false)
      return
    }

    const res = await createIssue(taskName, taskDescription)
    if(res) {
      alert("Good Good")
      setShowBox(false)
    } else {
      alert("Something went wrong")
    }
    setIsLoading(false)

  }

  return (
    <div>
      <button
        onClick={() => {
          setShowBox(true);
        }}
        className="mb-2 text-white bg-cBlue focus:ring-4 focus:outline-none focus:ring-white/40 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
      >
        Create Issue
      </button>
      <ModalL
        isLoading={isLoading}
        showBox={showBow}
        closed={() => {
          setShowBox(false);
        }}
      >
        <div className="lg:flex pb-8 px-3 lg:px-8">
          <div className='flex justify-center w-full lg:w-[350px]'>
            <img src={Tokyo} className="shadow rounded w-[330px] h-[300px]"/>
          </div>
          <div className="p-4">
            <input
              value={taskName}
              onChange={(e) => {setTaskName(e.target.value)}}
              placeholder="Issue Name"
              className="w-full text-4xl border-b-2 border-cBlue/50 text-cBlue bg-white/0 focus:outline-none"
            ></input>
            <DatePickerSection
              selectedStart={dateSelectedStart}
              onSelectStart={setDateSelectedStart}
              onSelectEnd={setDateSelectedEnd}
              selectedEnd={dateSelectedEnd}
            />
            <textarea
              value={taskDescription}
              onChange={(e) => {setTaskDescription(e.target.value)}}
              rows={6}
              className="text-cBlue bg-white/0 block w-full my-2 border-0 border-b-2 border-cBlue/50 focus:outline-0 focus:ring-0 focus:border-cBlue/50"
              placeholder="Write the issue description here..."
            ></textarea>
          </div>
        </div>
        <div className="flex pb-8 px-3 md:px-8 justify-end">
          <button onClick={createTask} className="bg-cBlue p-3 text-white rounded-md">Create</button>
        </div>
      </ModalL>
    </div>
  );
}