
interface Gymnasium {
    id: string,
    number: string,
    name?: string,
    street?: string,
    postal?: string,
    city?: string,
}

interface gameGoals {
    end: Teams,
    halfTime: Teams
}

interface Teams {
    home: number,
    guest: number
}

interface StatisticGameValues {
    amount: number,
    games: number,
    percentage?: number
}
interface StatisticGoalValues {
    goals: number,
    average?: number
}

export interface Statistic {
    gameWon: {
        home: StatisticGameValues,
        away: StatisticGameValues
    },
    goalsShot: {
        home: StatisticGoalValues,
        away: StatisticGoalValues
    },
    goalsGot: {
        home: StatisticGoalValues,
        away: StatisticGoalValues
    },
    highestWin: {
        home: string,
        away: string
    },
    highestLose: {
        home: string,
        away: string
    }
}
export interface Goals {
    shot: number,
    got: number
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
    goals: Goals,
    points: {
        plus: number,
        minus: number
    },
    statistics?: Statistic

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
    goals: gameGoals,
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