interface wordPress {
    id: string,
    date: Date,
    modified?: Date,
    title: string,
    author: string
}

export interface Picture {
    url: string,
    width?: number,
    height?: number,
    mime_type?: string
}
export interface Tag {
    id: number,
    name?: string
}

export interface Post extends wordPress {
    excerpt: string,
    content: string,

    categories?: Tag[],
    tags?: Tag[],
    isNew?: boolean,
    sticky?: boolean,
    picture?: Picture
}

interface Sponsor {
    url?: string,
    type?: string
}

export interface Media extends wordPress, Picture {
    archived: boolean,
    alt_text: string,
    description: string,
    sizes?: Picture[],
    caption?: string,
    team?: string,
    sponsor?: Sponsor
}