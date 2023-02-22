import { AdRecord } from "../records/ad.record";
import { AdEntity, SimpleAdEntity } from "../types";
import { defaultAd } from "./ad-record.test";
import { v4 as uuid } from "uuid";

let newAd: AdRecord;

beforeAll(() => {
    newAd = new AdRecord(defaultAd)
});

// afterAll(async () => {
//     await pool.end();
// })

jest
    .spyOn(AdRecord, 'getOne')
    .mockImplementation(async (id: string): Promise<AdRecord> => {

        if ( id === 'bca' ) {
            return null
        }
        return new AdRecord({
            id,
            name: 'testowa',
            description: 'testowy opis',
            price: 99.99,
            url: 'https://test.test.pl',
            lat: 49.1553514,
            lon: 22.4681735,
        })
    });

jest
    .spyOn(AdRecord.prototype, 'insert')
    .mockImplementation(async (): Promise<string> => {
        return uuid()
    })


jest
    .spyOn(AdRecord, 'findAll')
    .mockImplementation(async (phrase: string): Promise<SimpleAdEntity[]> => {
        const dbMock: AdEntity[] = [
            {
                id: 'cvb',
                name: 'testowa',
                description: 'testowy opis',
                price: 99.99,
                url: 'test.test.pl',
                lat: 49.1553514,
                lon: 22.4681735,
            },
            {
                id: 'xyz',
                name: 'testowy anons',
                description: 'testowa zawartość',
                price: 33.99,
                url: 'test.test.pl',
                lat: 21.1553514,
                lon: 34.4681735,
            },
            {
                id: 'bnm',
                name: 'testowy',
                description: 'testowy opis opisu',
                price: 0,
                url: 'test.test.com',
                lat: 43.1553514,
                lon: 22.4681735,
            },
        ];

        const dbResult = dbMock.filter(ad => ad.name.includes(phrase))

        return dbResult.map(oneAd => {
            const { id, lat, lon } = oneAd;

            return {
                id,
                lat,
                lon,
            }

        })


    });

// getOne()

test('AdRecords.getOne returns data from db for single record', async () => {
    const ad = await AdRecord.getOne('abc');


    expect(ad).toBeDefined();
    expect(ad instanceof AdRecord).toBeTruthy()
    expect(ad.id).toBe('abc')
    expect(ad.name).toBe('testowa');
    expect(ad.description).toBe('testowy opis');
    expect(ad.price).toEqual(99.99);
    expect(ad.url).toEqual('https://test.test.pl');
    expect(ad.lat).toEqual(49.1553514);
    expect(ad.lon).toEqual(22.4681735)
});

test('AdRecord.getOne  returns null for unexciting record', async () => {
    const ad = await AdRecord.getOne('bca');

    expect(ad).toBeNull();
});

// findAll()

test('AdRecord.findAll returns matching records with simple structure', async () => {

    const ads = await AdRecord.findAll('a')

    expect(ads.length).toEqual(2);
    expect(ads[0]).toBeDefined();
    expect(ads[0].id).toBeDefined();
    expect(ads[0].lat).toBeDefined();
    expect(ads[0].lon).toBeDefined();
    expect((ads[0] as AdEntity).name).toBeUndefined();
    expect((ads[0] as AdEntity).description).toBeUndefined();
    expect((ads[0] as AdEntity).url).toBeUndefined();
    expect((ads[0] as AdEntity).price).toBeUndefined();
});

test('AdRecord.findAll returns all records with simple structure when argument = ""', async () => {

    const ads = await AdRecord.findAll('')

    expect(ads).not.toStrictEqual([]);
    expect(ads.length).toEqual(3)
    expect(ads[0].id).toBeDefined();
    expect(ads[0].lat).toBeDefined();
    expect(ads[0].lon).toBeDefined();
    expect((ads[0] as AdEntity).name).toBeUndefined();
    expect((ads[0] as AdEntity).description).toBeUndefined();
    expect((ads[0] as AdEntity).url).toBeUndefined();
    expect((ads[0] as AdEntity).price).toBeUndefined();
});

test('AdRecord.findAll returns empty array when did not find record', async () => {

    const ads = await AdRecord.findAll('nonexistent-name-fragment');

    expect(ads).toStrictEqual([]);
    expect(ads[0]).not.toBeDefined();
});

//insert()

test('AdRecord.insert returns id', async () => {

    const id = await newAd.insert();

    expect(id).toMatch(/^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i)
});


test('AdRecord.insert inserts record to db', async () => {

    await newAd.insert();
    const foundAd = await AdRecord.getOne(newAd.id);

    expect(foundAd).toBeDefined();
    expect(foundAd).not.toBeNull();
    expect(foundAd.id).toEqual(newAd.id);

});