import { AdEntity } from "../types";
import { ValidationError } from "../utils/errors";

interface NewAdEntity extends Omit<AdEntity, "id"> {
    id?: string;
}

export class AdRecord implements AdEntity {
    public id: string;
    public name: string;
    public description: string;
    public price: number;
    public url: string;
    public lat: number;
    public lon: number;

    constructor(obj: NewAdEntity) {
        if ( !obj.name || obj.name.length > 100 ) {
            throw new ValidationError('Ad name should be between 1 and 100 characters long   ')
        }

        if ( obj.description.length > 1000 ) {
            throw new ValidationError('Ad description cannot be longer then 1000 characters')
        }

        if ( obj.price < 0 || obj.price > 9999999 ) {
            throw new ValidationError('Ad price should be between 0 - 999999 EUR')
        }

        //    @TODO Check if url is valid
        if ( !obj.url ) {
            throw new ValidationError('Link is obligatory')
        }

        if ( !obj.lat || !obj.lon ) {
            throw new ValidationError('We cannot locate the ad')
        }

        this.name = obj.name;
        this.description = obj.description;
        this.price = obj.price;
        this.url = obj.url;
        this.lat = obj.lat;
        this.lon = obj.lon;
    }

}