import { AdEntity, NewAdEntity, SimpleAdEntity } from "../types";
import { ValidationError } from "../utils/errors";
import { pool } from "../db/db";
import { FieldPacket } from "mysql2";
import { v4 as uuid } from 'uuid';
import { isUri } from 'valid-url';


type AdRecordResult = [AdEntity[], FieldPacket[]];
type ManyAdRecordsResult = [SimpleAdEntity[], FieldPacket[]];

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
            throw new ValidationError('Ad name should be between 1 and 100 characters long')
        }

        if ( obj.description.length > 1000 ) {
            throw new ValidationError('Ad description cannot be longer then 1000 characters')
        }

        if ( obj.price < 0 || obj.price > 9999999 ) {
            throw new ValidationError('Ad price should be between 0 - 9999999 EUR')
        }

        if ( !obj.url ) {
            throw new ValidationError('Link is obligatory')
        }
        if ( !isUri(obj.url) ) {
            throw new ValidationError('Link address is not proper')
        }

        if ( !obj.lat || !obj.lon ) {
            throw new ValidationError('We cannot locate the ad')
        }

        this.id = obj.id ?? uuid();
        this.name = obj.name;
        this.description = obj.description;
        this.price = obj.price;
        this.url = obj.url;
        this.lat = obj.lat;
        this.lon = obj.lon;
    }

    static async getOne(id: string): Promise<AdRecord | null> {
        const [[oneAd]] = await pool.execute('SELECT * FROM `ads` WHERE `id` = :id', {
            id
        }) as AdRecordResult;

        return oneAd ? new AdRecord(oneAd) : null;
    }

    static async findAll(phrase: string): Promise<SimpleAdEntity[]> {
        const [found] = await pool.execute("SELECT `id`, `lat`, `lon` FROM `ads` WHERE `name` LIKE :phrase", {
            phrase: `%${phrase}%`
        }) as ManyAdRecordsResult;

        return found
    }

    async insert(): Promise<string> {
        await pool.execute("INSERT INTO `ads` VALUES (:id, :name, :description, :price, :url, :lat, :lon)", {
            id: this.id,
            name: this.name,
            description: this.description,
            price: this.price,
            url: this.url,
            lat: this.lat,
            lon: this.lon,
        });

        return this.id
    }
}
