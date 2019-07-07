import { Picture, Post, Tag, Media } from "../models/wordpressModel";
import { proxyService } from "./proxyService";

export class wordpressService extends proxyService {
    protected uri = 'https://wp.willsbach-handball.de/wp-json/wp/v2/';
    protected Picture;
    protected Post;
    protected Tag;
    protected Media;

    constructor() {
        super();
        this.options.uri = this.uri;
    }

    protected responsiveImgs(content: string): string {
        // Make all images responsive
        return content.replace(new RegExp('<img', 'g'), '<img class="img-fluid"');
    }

    protected getAuthor(element: any): string {
        return element._embedded['author'][0].name;
    }
}