import { wordpressService } from '../wordpressService';
import { Post, Tag, Picture } from '../../models/wordpressModel';
import { totalmem } from 'os';

export class wpPostService extends wordpressService {

    constructor() {
        super();
        this.options.uri = this.uri;
    }

    public getPosts(page?: number, category?: number, sticky?: boolean) {
        this.options.uri = this.uri + 'posts' + `?_embed`;

        if (page != null) {
            this.options.uri = this.options.uri + `&page=${page}`;
        }

        if (category != null) {
            this.options.uri = this.options.uri + `&categories=${category}`;
        }

        if (sticky != undefined) {
            this.options.uri = this.options.uri + `&sticky=${sticky}`;
        }

        this.options.resolveWithFullResponse = true;
        return this.request
            .get(this.options)
            .then(x => {
                let maxPages = x.headers['x-wp-totalpages'];
                let total = x.headers['x-wp-total'];
                let posts = new Array<Post>();
                x.body.forEach(element => {
                    let post = this.mapPost(element);
                    posts.push(post);
                });
                return {
                    maxPages: maxPages,
                    total: total,
                    posts: posts
                };
            });
    }

    public getPost(id) {
        this.options.uri = this.uri + 'posts/' + id + `?_embed`;
        return this.request
            .get(this.options)
            .then(element => {
                let post: Post = this.mapPost(element);
                return post;
            });
    }

    public getReports(page) {
        return this.getPosts(page, 6);
    }

    private mapPost(element: any) {
        let post: Post;
        let categories = new Array<Tag>();
        let tags = new Array<Tag>();
        element.content.rendered = this.responsiveImgs(element.content.rendered);
        element.picture = this.mapPicture(element._embedded['wp:featuredmedia'][0].media_details.sizes);
        element._embedded.term = element._embedded['wp:term'];
        element.author = this.getAuthor(element);
        element._embedded.term[0].forEach(el => {
            categories.push({
                id: el.id,
                name: el.name
            });
        });
        element._embedded.term[1].forEach(el => {
            tags.push({
                id: el.id,
                name: el.name
            });
        });
        post = {
            id: element.id,
            title: element.title.rendered,
            date: element.date_gmt,
            modified: element.modified_gmt,
            author: element.author,
            sticky: element.sticky,
            isNew: this.isPostNew(element.date_gmt),
            picture: element.picture,
            categories: categories,
            tags: tags,
            excerpt: element.excerpt.rendered,
            content: element.content.rendered
        };
        return post;
    }

    private mapPicture(element): Picture {
        let pic: Picture;
        let size;


        if (element.medium_large === undefined && element.medium === undefined && element.large != undefined) {
            size = element.large;
        } else if (element.medium_large != undefined) {
            size = element.medium_large;
        } else if (element.medium != undefined) {
            size = element.medium;
        } else if (element.small != undefined) {
            size = element.small;
        } else {
            size = element.thumbnail;
        }

        pic = {
            url: size.source_url,
            width: size.width,
            height: size.height,
            mime_type: size.mime_type
        }
        return pic;
    }

    private isPostNew(date: Date): boolean {
        const today = new Date();
        const last3Days = new Date();
        last3Days.setDate(today.getDate() - 4);
        const testDate = new Date(date);

        if (today >= testDate && last3Days <= testDate) {
            return true;
        }
        return false;
    }
}