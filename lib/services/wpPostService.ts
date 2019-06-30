import * as request from "request-promise-native";
import { proxyService } from "./proxyService";

export class wpPostService extends proxyService {

    private uri = 'https://wp.willsbach-handball.de/wp-json/wp/v2/';

    constructor() {
        super();
        this.options.uri = this.uri;
    }

    public getPosts(page, category) {
        this.options.uri = this.uri + 'posts/' + `?_embed`;

        if (page != null) {
            this.options.uri = this.options.uri + `&page=${page}`;
        }

        if (category != null) {
            this.options.uri = this.options.uri + `&categories=${category}`;
        }

        return request.get(this.options);
    }

    public getPost(id) {
        this.options.uri = this.uri + 'posts/' + id + `?_embed`;
        return request.get(this.options);
    }

    public getReports(page) {
        return this.getPosts(page, 6);
    }
}