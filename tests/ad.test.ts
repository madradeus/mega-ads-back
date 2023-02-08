import { AdRecord } from "../records/ad.record";
import { AdEntity } from "../types";

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
        } as AdEntity)
    })

test('AdRecords returns data from db for single record', async () => {
    const ad = await AdRecord.getOne('abc');

    expect(ad).toBeDefined();
    expect(ad.id).toBe('abc')
    expect(ad.name).toBe('testowa');
    expect(ad.description).toBe('testowy opis');
    expect(ad.price).toEqual(99.99);
    expect(ad.url).toEqual('test.test.pl');
    expect(ad.lat).toEqual(49.1553514);
    expect(ad.lon).toEqual(22.4681735)


})

test('AdRecord returns null for unexisting record', async () => {
    const ad = await AdRecord.getOne('bca');

    expect(ad).toBeNull()
})