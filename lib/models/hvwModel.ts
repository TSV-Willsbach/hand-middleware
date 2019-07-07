
interface Gymnasium {
    id: string,
    number: string,
    name?: string,
    street?: string,
    postal?: string,
    city?: string,
}

interface Goals {
    end: Teams,
    halfTime: Teams
}

interface Teams {
    home: number,
    guest: number
}

export interface Score {
    id: string,
    rank: number,
    name: string,
    live: boolean,
    games: {
        played: number,
        won: number,
        equal: number,
        lost: number
    },
    goals: {
        shot: number,
        got: number
    },
    points: {
        plus: number,
        minus: number
    }

}

export interface Game {
    id: string,
    live: boolean,
    date: Date,
    gymnasium: Gymnasium,
    team: {
        home: string,
        guest: string
    },
    goals: Goals,
    points: Teams,
    referees: string,
    comment?: string,
    sortText?: string,
    token?: string,
    appId?: string
}

export interface Ligue {
    id: string,
    name: string,
    shortName: string,
    comment?: string,
    headline1?: string,
    headline2?: string,
    actualized?: string,
    scores?: Score[],
    games: Game[]
}

export interface Club {
    id: string,
    name: string,
    shortName: string,
    headline1?: string,
    headline2?: string,
    actualized?: string,
    ligues?: Ligue[]
}