import { Controller, Route, Get, Tags, Request, Query, Path } from 'tsoa';
import { wpPostService } from '../services/wpPostService';
import express = require('express');

@Route('/wp')
@Tags('Wordpress')
export class WpController extends Controller {

    // private uri = 'https://wp.willsbach-handball.de/wp-json/wp/v2/';


    @Get('/posts/')
    public async getPosts(@Query() page?: number, @Query() category?: number) {
        return await new wpPostService().getPosts(page, category);
    }

    @Get('/posts/{id}')
    public async getPost(@Path('id') ID: string) {
        return await new wpPostService().getPost(ID);
    }

    @Get('/reports')
    public async getReports(@Query() page?: number) {
        return await new wpPostService().getReports(page);
    }
} 