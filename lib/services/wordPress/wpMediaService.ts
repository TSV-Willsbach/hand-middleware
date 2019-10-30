import { Picture, Sizes } from './../../models/wordpressModel';
import { wordpressService } from '../wordpressService';
import { Media } from '../../models/wordpressModel';

export class wpMediaService extends wordpressService {

    constructor() {
        super();
        this.options.uri = this.uri;
    }

    public getMedia(archived: boolean, search: string, teamId?: string, sponsorType?: string) {
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
                        if (singleMedia.team === teamId) {
                            media.push(singleMedia);
                        } else if (singleMedia.sponsor.type === sponsorType) {
                            media.push(singleMedia);
                        } else if (sponsorType === undefined && teamId === undefined) {
                            media.push(singleMedia);
                        }

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

    public getTeamPhotos(archived: boolean, teamId: string) {
        return this.getMedia(archived, 'teams', teamId);
    }

    public getSponsors(archived: boolean, type: string) {
        return this.getMedia(archived, 'sponsors', undefined, type);
    }

    private mapMedia(element: any): Media {
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
        media.sizes = this.getSizes(element);
        return media;
    }

    private getSizes(element: any): Sizes {
        let sizes: Sizes;
        let elementSizes = element.media_details.sizes;
        sizes = {
            thumbnail: this.wp2Picture(elementSizes.thumbnail),
            small: this.wp2Picture(elementSizes.medium),
            medium: this.wp2Picture(elementSizes.medium_large),
            large: this.wp2Picture(elementSizes.large)
        };
        return sizes;
    }

    private wp2Picture(wpPicture: any): Picture {
        if (wpPicture === undefined) {
            return null;
        }
        return {
            url: wpPicture.source_url,
            height: wpPicture.height,
            width: wpPicture.width,
            mime_type: wpPicture.mime_type
        };
    }
}