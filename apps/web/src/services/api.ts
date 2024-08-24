import { user } from "../type";

export const Host = "http://localhost:8000"

export const getVotes = async (): Promise<{id: string, count: number, name: string, description: string}[]> => {
    try {
        const _res = await fetch(Host + "/get_votes", {
            method: "GET",
            headers: {
                "ngrok-skip-browser-warning": "69240"
            }
        });

        const resData = await _res.json();
        return resData.votes
    } catch (e) {
        console.log(e)
        return []
    }
};

export async function addVoteCount(address: string, voteID: string) {
    try {
        const res = await fetch(Host + `/add_vote_count?user=${address}&vote_id=${voteID}`, {
            method: "GET",
            headers: {
                "ngrok-skip-browser-warning": "69240"
            }
        });
        console.log(res)
    } catch (e) {
        console.log(e)
    }
}

export async function createIssue(name: string, description: string): Promise<boolean> {
    const randomNumber = Math.floor(Math.random() * (100000 - 1000 + 1)) + 1000;

    try {
        const _res = await fetch(Host + `/create_vote?vote_id=${randomNumber}&name=${name}&description=${description}`, {
            method: "POST",
            headers: {
                "ngrok-skip-browser-warning": "69240"
            }
        });

        const resData = await _res.json();
        if(resData.vote_id) {
            return true
        } else {
            return false
        }
    } catch (e) {
        console.log(e)
        return false
    }
}

export async function getUserInfo(address: string): Promise<user> {
    const _user: user = {
        address: address,
        did: "",
        vote_count: 0,
        rate_count: 0,
        mbti: [50, 50, 50, 50, 50]
    }

    try {
        const res = await fetch(Host + `/get_user_did?user=${address}`, {
            method: "GET",
            headers: {
                "ngrok-skip-browser-warning": "69240"
            }
        });

        const resData = await res.json();
        const _mbti = await getUserMBTI(address)
        const _static = await userStatic(address)

        _user.did = resData.did
        _user.mbti = _mbti
        _user.vote_count = _static.voteCount
        _user.rate_count = _static.rateCount

        return _user
    } catch (e) {
        console.log(e)
        const r = await userRegister(address)
        if(r) {
            const _user = await getUserInfo(address)

            return _user
        } else {
            return _user
        }
    }
}

export async function getUserMBTI(address: string): Promise<number[]> {
    try {
        const res = await fetch(Host + `/get_rating?user=${address}`, {
            method: "GET",
            headers: {
                "ngrok-skip-browser-warning": "69240"
            }
        });

        const resData = await res.json();
        const numArray: number[] = JSON.parse(resData.rating);
        return numArray
    } catch (e) {
        console.log(e)
        return [50, 50, 50, 50, 50]
    }
}

export async function userRegister(address: string): Promise<boolean> {
    try {
        const res = await fetch(Host + `/create_peer_did?user=${address}`, {
            method: "GET",
            headers: {
                "ngrok-skip-browser-warning": "69240"
            }
        });

        const resData = await res.json();
        if(resData.did) {
            return true
        } else {
            return false
        }
    } catch (e) {
        console.log(e)
        return false
    }
}

export async function userStatic(address: string): Promise<{ voteCount: number, rateCount: number }> {
    try {
        const res0 = await fetch(Host + `/get_vote_count?user=${address}`, {
            method: "GET",
            headers: {
                "ngrok-skip-browser-warning": "69240"
            }
        });
        const res1 = await fetch(Host + `/get_rating_count?user=${address}`, {
            method: "GET",
            headers: {
                "ngrok-skip-browser-warning": "69240"
            }
        });

        const resData0 = await res0.json();
        const resData1 = await res1.json();

        return { voteCount: resData0.voting_count, rateCount: resData1.rating_count }
    } catch (e) {
        console.log(e)
        return { voteCount: 0, rateCount: 0 }
    }
}