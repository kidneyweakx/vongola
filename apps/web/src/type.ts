export type issue = {
    name: string
    date: { start: string, end: string }
    description: string
    creator: string[]
    status: "inComing" | "inProgress" | "ended"
    participants: string[]
    result: string
    id: string
}

export type user = {
    address: string
    did: string
    vote_count: number
    rate_count: number
    mbti: number[]
}