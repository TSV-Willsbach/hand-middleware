import { wpMediaService } from './../services/wordPress/wpMediaService';
import { Post, Media, Posts } from './../models/wordpressModel';
import { Controller, Route, Get, Tags, Query, Path } from 'tsoa';
import { wpPostService } from '../services/wordPress/wpPostService';

@Route('/wp')
@Tags('Wordpress')
export class WpController extends Controller {

    @Get('/posts/')
    public async getPosts(@Query() page?: number, @Query() category?: number, @Query() sticky?: boolean): Promise<Posts> {
        return await new wpPostService().getPosts(page, category, sticky);
    }

    @Get('/posts/{id}')
    public async getPost(@Path('id') ID: string): Promise<Post> {
        return await new wpPostService().getPost(ID);
    }

    @Get('/reports')
    public async getReports(@Query() page?: number): Promise<Posts> {
        return await new wpPostService().getReports(page);
    }

    @Get('/media/all')
    public async getMedia(@Query() archived?: boolean, @Query() search?: string): Promise<Media[]> {
        return await new wpMediaService().getMedia(archived, search);
    }

    @Get('/media/all/{id}')
    public async getSingleMedia(@Path('id') id: string): Promise<Media> {
        return await new wpMediaService().getSingleMedia(id);
    }

    @Get('/media/teams')
    public async getTeamPhotos(@Query() archived?: boolean, @Query() teamId?: string): Promise<Media[]> {
        return await new wpMediaService().getTeamPhotos(archived, teamId);
    }

    @Get('/media/sponsors')
    public async getSponsors(@Query() archived?: boolean): Promise<Media[]> {
        return await new wpMediaService().getSponsors(archived);
    }


} 