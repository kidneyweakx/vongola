import { useState } from "react";
import { DayPicker, SelectSingleEventHandler } from "react-day-picker";
import { ModalXs } from "./ModalXS";

export function DatePickerSection(props: {
  onSelectStart: SelectSingleEventHandler | undefined;
  selectedStart: Date | undefined;
  onSelectEnd: SelectSingleEventHandler | undefined;
  selectedEnd: Date | undefined;
}) {
  const [showPickerStart, setShowPickerStart] = useState<boolean>(false);
  const [showPickerEnd, setShowPickerEnd] = useState<boolean>(false);
  const [isLoading] = useState<boolean>(false)

  return (
    <div className="border-b-2 border-cBlue/50">
      <div className="my-3 text-cBlue">
        <div className="flex items-center">
          <div className="">
            <span className="flex w-3 h-3 me-3 bg-cBlue rounded-full"></span>
            <span className="flex w-[3px] h-7 my-1 mx-[4.5px] me-3 bg-cBlue rounded-full"></span>
            <span className="flex w-3 h-3 me-3 border-2 border-cBlue bg-cBlue/0 rounded-full"></span>
          </div>
          <div className="rounded-2xl w-[240px]">
            <div className="flex justify-between rounded-md">
              <div className="text-lg py-[10px]">Start</div>
              <div>
                <div
                  className="text-lg py-[10px]"
                  onClick={() => {
                    setShowPickerStart(true);
                  }}
                >
                  {props.selectedStart
                    ? `${props.selectedStart.toLocaleString("default", { year: "numeric" })}${props.selectedStart.toLocaleString("default", { month: "long" })}${props.selectedStart.toLocaleString("default", { day: "numeric" })}`
                    : "Start Date"}
                </div>
              </div>
            </div>
            <div className="flex justify-between rounded-md">
              <div className="text-lg py-[10px]">End</div>
              <div>
                <div
                  className="text-lg py-[10px]"
                  onClick={() => {
                    setShowPickerEnd(true);
                  }}
                >
                  {props.selectedEnd
                    ? `${props.selectedEnd.toLocaleString("default", { year: "numeric" })}${props.selectedEnd.toLocaleString("default", { month: "long" })}${props.selectedEnd.toLocaleString("default", { day: "numeric" })}`
                    : "End Date"}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div></div>
      </div>
      <ModalXs isLoading={isLoading} showBox={showPickerStart} closed={() => {setShowPickerStart(false)}}>
        <div className="mt-2">
          <DayPicker
            onDayClick={() => {
              setShowPickerStart(false);
            }}
            modifiersStyles={{
              selected: {
                backgroundColor: "#7D938A",
                color: "white",
                borderRadius: "24px",
              },
            }}
            className="flex justify-center items-center text-cBlue border-2 border-cBlue rounded-lg"
            mode="single"
            selected={props.selectedStart}
            onSelect={props.onSelectStart}
            styles={{
              root: { width: "280px", height: "300px", padding: "10px" },
              head_cell: { height: "25px" },
              cell: { height: "30px" },
              head: { height: "30px", width: "250px" },
              table: { width: "250px" },
              day: { width: "28px", height: "28px" },
              caption: {
                height: "40px",
                width: "250px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                fontWeight: "bold",
                fontSize: "18px",
              },
              nav_button_next: { margin: "15px" },
            }}
            required
          />
        </div>
      </ModalXs>
      <ModalXs isLoading={isLoading} showBox={showPickerEnd} closed={() => {setShowPickerEnd(false)}}>
        <div className="mt-2">
          <DayPicker
            onDayClick={() => {
              setShowPickerEnd(false);
            }}
            fromDate={props.selectedStart}
            modifiersStyles={{
              selected: {
                backgroundColor: "#7D938A",
                color: "white",
                borderRadius: "24px",
              },
            }}
            className="flex justify-center items-center text-cBlue border-2 border-cBlue rounded-lg"
            mode="single"
            selected={props.selectedEnd}
            onSelect={props.onSelectEnd}
            styles={{
              root: { width: "280px", height: "300px", padding: "10px" },
              head_cell: { height: "25px" },
              cell: { height: "30px" },
              head: { height: "30px", width: "250px" },
              table: { width: "250px" },
              day: { width: "28px", height: "28px" },
              caption: {
                height: "40px",
                width: "250px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                fontWeight: "bold",
                fontSize: "18px",
              },
              nav_button_next: { margin: "15px" },
            }}
            required
          />
        </div>
      </ModalXs>
    </div>
  );
}