export const Host = "https://7195-140-119-164-32.ngrok-free.app"

export const getVotes = async () => {
    try {
        const res = await fetch(Host + "/get_votes", {
            method: "GET",
            headers: {
                "ngrok-skip-browser-warning": "69240"
            }
        });

        console.log(res)

        const _res = await fetch(Host + "/get_votes", {
            method: "GET",
            headers: {
                "ngrok-skip-browser-warning": "69240"
            }
        });

        const resData = await _res.json();
        return resData
    } catch (e) {
        console.log(e)
        return undefined
    }
};