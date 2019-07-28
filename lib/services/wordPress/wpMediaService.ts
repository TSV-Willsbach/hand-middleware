import { wordpressService } from '../wordpressService';
import { Media } from '../../models/wordpressModel';

export class wpMediaService extends wordpressService {

    constructor() {
        super();
        this.options.uri = this.uri;
    }

    public getMedia(archived: boolean, search: string) {
        this.options.uri = this.uri + 'media?_embed&per_page=50';

        if (search != undefined) {
            this.options.uri = this.options.uri + `&search=${search}`
        }

        return this.request
            .get(this.options)
            .then(response => {
                let media = new Array<Media>();
                response.forEach(element => {
                    let singleMedia = this.mapMedia(element);
                    if (singleMedia.archived === archived || archived === undefined) {
                        media.push(singleMedia);
                    }

                });

                return media;
            });
    }

    public getSingleMedia(id) {
        this.options.uri = this.uri + `media/${id}?_embed`;
        return this.request
            .get(this.options)
            .then(response => {
                let media: Media = this.mapMedia(response);
                return media;
            });
    }

    public getTeamPhotos(archived: boolean) {
        return this.getMedia(archived, 'teams');
    }

    public getSponsors(archived: boolean) {
        return this.getMedia(archived, 'sponsors');
    }

    private mapMedia(element: any) {
        let media: Media;
        media = {
            id: element.id,
            title: element.title.rendered,
            alt_text: element.alt_text,
            author: this.getAuthor(element),
            date: element.date_gmt,
            modified: element.modified_gmt,
            url: element.source_url,
            height: element.media_details.height,
            width: element.media_details.width,
            caption: element.caption.rendered,
            mime_type: element.mime_type,
            archived: element.acf.archive,
            team: element.acf.team,
            sponsor: {
                url: element.acf.sponsorUrl,
                type: element.acf.sponsorType
            },
            description: element.description.rendered,
        };
        return media;
    }
}