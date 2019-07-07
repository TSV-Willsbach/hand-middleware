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

export interface Post {
    id: string,
    title: string,
    excerpt: string,
    content: string,
    author: string,
    date: Date,
    categories?: Tag[],
    tags?: Tag[],
    isNew?: boolean,
    modified?: Date,
    sticky?: boolean,
    picture?: Picture
}
