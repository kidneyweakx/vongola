function Profile() {
    return (
        <div>
            <div className="my-4 grid grid-cols-3 gap-4 text-black">
                <div className="h-[250px] bg-white shadow rounded-lg p-8">User Infromation</div>
                <div className="h-[250px] bg-white shadow rounded-lg p-8">Voting Count</div>
                <div className="h-[250px] bg-white shadow rounded-lg p-8">Rating Count</div>
            </div>
            <div className="my-4 grid grid-cols-3 gap-4 text-black">
                <div className="h-[250px] bg-white shadow rounded-lg p-8">MBTI</div>
                <div className="col-span-2 h-[250px] bg-white shadow rounded-lg p-8">1</div>
            </div>
            <div className="my-4 grid grid-cols-3 gap-4 text-black">
                <div className="col-span-2 h-[250px] bg-white shadow rounded-lg p-8">1</div>
                <div className="h-[250px] bg-white shadow rounded-lg p-8">Voting Result</div>
            </div>
        </div>
    )
}

export default Profile;