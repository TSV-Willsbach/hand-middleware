import { Controller, Route, Get } from 'tsoa';

@Route('/wp')
export class WpController extends Controller {

    // private uri = 'https://wp.willsbach-handball.de/wp-json/wp/v2/';

    @Get('/')
    public async getPosts() {
        // let path = this.uri + 'posts/' + `?_embed`;
        await 'test';

    }
} 