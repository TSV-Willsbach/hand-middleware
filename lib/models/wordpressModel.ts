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

export interface Posts {
    maxPages: number,
    total: number,
    posts: Post[]
}

interface Sponsor {
    url?: string,
    type?: string
}

export interface Sizes {
    thumbnail?: Picture,
    small?: Picture,
    medium?: Picture,
    large?: Picture
}

export interface Media extends wordPress, Picture {
    archived: boolean,
    alt_text: string,
    description: string,
    sizes?: Sizes,
    caption?: string,
    team?: string,
    sponsor?: Sponsor
}