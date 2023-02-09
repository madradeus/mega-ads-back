import { AdRecord } from "../records/ad.record";
import { pool } from "../db/db";
import { AdEntity } from "../types";

afterAll(async () => {
    await pool.end();
})

jest
    .spyOn(AdRecord, 'getOne')
    .mockImplementation(async (id: string) => {

        if ( id === 'bca' ) {
            return null
        }
        return new AdRecord({
            id,
            name: 'testowa',
            description: 'testowy opis',
            price: 99.99,
            url: 'test.test.pl',
            lat: 49.1553514,
            lon: 22.4681735,
        })
    });

test('AdRecords returns data from db for single record', async () => {
    const ad = await AdRecord.getOne('abc');

    expect(ad).toBeDefined();
    expect(ad instanceof AdRecord).toBeTruthy()
    expect(ad.id).toBe('abc')
    expect(ad.name).toBe('testowa');
    expect(ad.description).toBe('testowy opis');
    expect(ad.price).toEqual(99.99);
    expect(ad.url).toEqual('test.test.pl');
    expect(ad.lat).toEqual(49.1553514);
    expect(ad.lon).toEqual(22.4681735)
});

test('AdRecord returns null for unexciting record', async () => {
    const ad = await AdRecord.getOne('bca');

    expect(ad).toBeNull();
});

test('AdRecord find  matching records', async () => {

    const ads = await AdRecord.findAll('a')

    expect(ads.length).toBeGreaterThan(0);
    expect(ads[0]).toBeDefined();
    expect(ads[0].id).toBeDefined();
    expect(ads[0].lat).toBeDefined();
    expect(ads[0].lon).toBeDefined();
    expect((ads[0] as AdEntity).name).toBeUndefined();
    expect((ads[0] as AdEntity).description).toBeUndefined();
    expect((ads[0] as AdEntity).url).toBeUndefined();
    expect((ads[0] as AdEntity).price).toBeUndefined();
});

test('AdRecord find all records', async () => {

    const ads = await AdRecord.findAll('')

    expect(ads).not.toStrictEqual([]);
    expect(ads[0].id).toBeDefined();
    expect(ads[0].id).toBeDefined();
    expect(ads[0].lat).toBeDefined();
    expect(ads[0].lon).toBeDefined();
    expect((ads[0] as AdEntity).name).toBeUndefined();
    expect((ads[0] as AdEntity).description).toBeUndefined();
    expect((ads[0] as AdEntity).url).toBeUndefined();
    expect((ads[0] as AdEntity).price).toBeUndefined();
});

test('Ad record return empty array when did not find record', async () => {

    const ads = await AdRecord.findAll('bjfkasbfjbsbndabj');

    expect(ads).toStrictEqual([]);
    expect(ads[0]).not.toBeDefined();
});