import { Post } from './../models/wordpressModel';
import { Controller, Route, Get, Tags, Query, Path } from 'tsoa';
import { wpPostService } from '../services/wpPostService';

@Route('/wp')
@Tags('Wordpress')
export class WpController extends Controller {

    // private uri = 'https://wp.willsbach-handball.de/wp-json/wp/v2/';


    @Get('/posts/')
    public async getPosts(@Query() page?: number, @Query() category?: number, @Query() sticky?: boolean): Promise<Post[]> {
        return await new wpPostService().getPosts(page, category, sticky);
    }

    @Get('/posts/{id}')
    public async getPost(@Path('id') ID: string): Promise<Post> {
        return await new wpPostService().getPost(ID);
    }

    @Get('/reports')
    public async getReports(@Query() page?: number): Promise<Post[]> {
        return await new wpPostService().getReports(page);
    }

    @Get('/media/teams')
    public async getTeamPhotos(@Query() archived?: boolean) {
        return await new wpPostService().getTeamPhotos(archived);
    }
} 