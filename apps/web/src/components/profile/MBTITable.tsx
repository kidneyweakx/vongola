export function MBTITable(params: {mbti: number[]}) {

    return (
        <div className="">
            <div className="my-6 flex justify-between">
                <div className="w-[100px] text-lg">Extraverted</div>
                <input type="range" value={params.mbti[0]} max="100" min="0" className="verticalInput"/>
                <div className="w-[100px] text-lg">Introverted</div>
            </div>
            <div className="my-6 flex justify-between">
                <div className="w-[100px] text-lg">Intuitive</div>
                <input type="range" value={params.mbti[1]} max="100" min="0" className="verticalInput"/>
                <div className="w-[100px] text-lg">Observant</div>
            </div>
            <div className="my-6 flex justify-between">
                <div className="w-[100px] text-lg">Thinking</div>
                <input type="range" value={params.mbti[2]} max="100" min="0" className="verticalInput"/>
                <div className="w-[100px] text-lg">Feeling</div>
            </div>
            <div className="my-6 flex justify-between">
                <div className="w-[100px] text-lg">Judging</div>
                <input type="range" value={params.mbti[3]} max="100" min="0" className="verticalInput"/>
                <div className="w-[100px] text-lg">Prospecting</div>
            </div>
            <div className="my-6 flex justify-between">
                <div className="w-[100px] text-lg">Assertive</div>
                <input type="range" value={params.mbti[4]} max="100" min="0" className="verticalInput"/>
                <div className="w-[100px] text-lg">Turbluent</div>
            </div>
        </div>
    )
}