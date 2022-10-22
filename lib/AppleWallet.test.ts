import { DateTime } from 'luxon';
import {
  AppleWalletCreateManifest,
  AppleWalletCreatePass,
  AppleWalletCreatePassObject,
  AppleWalletSignManifest,
} from './AppleWallet';
import {
  AppleWalletBarcode,
  AppleWalletGeneric,
  AppleWalletPassInfo,
  AppleWalletPassObject,
  AppleWalletPassTypes,
  AppleWalletStoreCard,
} from './types';

const genericPass = {
  orgName: 'testOrgName',
  passTypeId: 'pass.test.type.id',
  serialNumber: 'testSerialNumber0',
  teamId: 'TESTTEAMID0',
  description: 'Test Description',
  passType: 'generic' as AppleWalletPassTypes,
  barcode: [{
    message: 'testBarcode0',
    format: 'PKBarcodeFormatCode128',
    messageEncoding: 'iso-8859-1',
    altText: 'test alt text0',
  }] as AppleWalletBarcode[],
  passInfo: {
    primaryFields: [{
      key: 'testKey0',
      value: 'Test Field 0',
      label: 'Test Label 0',
    }],
  } as AppleWalletGeneric,
} as AppleWalletPassInfo;

const eventPass = {
  orgName: 'Example Event',
  passTypeId: 'pass.com.example.event',
  serialNumber: '5241131612552251420',
  teamId: '8F53L4G5YL',
  description: 'Example Event Pass',
  passType: 'eventTicket' as AppleWalletPassTypes,
  barcode: [{
    message: '5241131612552251420211831545',
    format: 'PKBarcodeFormatPDF417',
    messageEncoding: 'iso-8859-1',
    altText: '',
  }, {
    message: '5241131612552251420211831545',
    format: 'PKBarcodeFormatAztec',
    messageEncoding: 'iso-8859-1',
    altText: '',
  }, {
    message: '5241131612552251420211831545',
    format: 'PKBarcodeFormatCode128',
    messageEncoding: 'iso-8859-1',
    altText: '',
  }] as AppleWalletBarcode[],
  NFC: {
    message: '5241131612552251420211831545',
    encPublicKey: 'MDkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDIgACwycsOC4KaZ2eIr39Cwpm3YxK/bMO8ZuIapalsH8qSs4=',
  },
  semantics: {
    duration: 14400,
    eventName: 'Example Event',
    eventType: 'PKEventTypeGeneric',
  },
  passInfo: {
    primaryFields: [{
      key: 'date',
      value: DateTime.fromISO('2035-12-31T23:59:00+11:00'),
      label: 'When:',
    }],
  },
  expirationDate: DateTime.fromISO('2036-01-01T00:00:00+11:00'),
  relevantDate: DateTime.fromISO('2035-12-31T23:59:00+11:00'),
} as AppleWalletPassInfo;

describe('create pass objects', () => {
  test('creates a pass object with the minimum required information to show on apple devices', () => {
    expect(AppleWalletCreatePassObject({
      orgName: genericPass.orgName,
      passTypeId: genericPass.passTypeId,
      serialNumber: genericPass.serialNumber,
      teamId: genericPass.teamId,
      description: genericPass.description,
      passType: genericPass.passType,
      passInfo: {},
    })).toEqual({
      formatVersion: 1,
      organizationName: genericPass.orgName,
      passTypeIdentifier: genericPass.passTypeId,
      serialNumber: genericPass.serialNumber,
      teamIdentifier: genericPass.teamId,
      description: genericPass.description,
      [genericPass.passType]: {},
    } as AppleWalletPassObject);
  });
  test('creates a generic pass object with barcode and test primary fields', () => {
    expect(AppleWalletCreatePassObject({
      orgName: genericPass.orgName,
      passTypeId: genericPass.passTypeId,
      serialNumber: genericPass.serialNumber,
      teamId: genericPass.teamId,
      description: genericPass.description,
      passType: genericPass.passType,
      barcode: genericPass.barcode,
      passInfo: genericPass.passInfo,
    })).toEqual({
      formatVersion: 1,
      organizationName: genericPass.orgName,
      passTypeIdentifier: genericPass.passTypeId,
      serialNumber: genericPass.serialNumber,
      teamIdentifier: genericPass.teamId,
      description: genericPass.description,
      barcodes: genericPass.barcode,
      [genericPass.passType]: genericPass.passInfo,
    } as AppleWalletPassObject);
  });
  test('creates a full store pass object', () => {
    expect(AppleWalletCreatePassObject({
      orgName: 'Virgin Australia',
      passTypeId: 'pass.com.velocityfrequentflyer.loyalty',
      serialNumber: '00000000002051920312',
      teamId: '8F53L4G5YL',
      description: 'Velocity Frequent Flyer',
      fgColor: 'rgb(255, 255, 255)',
      passType: 'storeCard',
      webServiceAuth: 'TESTDATADONOTUSE',
      webServiceURL: 'https://apps.virginaustralia.com/LoyaltyCardAppleWallet/',
      barcode: [{
        message: 'T1Test/Test MISS    VA 2051920312      RED180122LNG    ',
        format: 'PKBarcodeFormatAztec',
        messageEncoding: 'iso-8859-1',
        altText: '',
      }] as AppleWalletBarcode[],
      labelColor: 'rgb(255, 255, 255)',
      bgColor: 'rgb(214, 8, 59)',
      passInfo: {
        primaryFields: [{
          key: 'memberName',
          label: '2051 920 312',
          value: 'MISS TEST TEST       ',
        }],
        secondaryFields: [{
          key: 'pointsBalance',
          label: 'POINTS BALANCE',
          value: '2,051,920',
        }],
        backFields: [{
          key: 'contactUs',
          label: 'Contact Us',
          value: "Australia <a href='tel:+61 13 18 75'>+61 13 18 75</a>\nNew Zealand <a href='tel:0800 230 875'>0800 230 875</a>\nInternational <a href='tel:+61 2 8667 5924'>+61 2 8667 5924</a>",
        }],
      } as AppleWalletStoreCard,
    })).toEqual({
      description: 'Velocity Frequent Flyer',
      backgroundColor: 'rgb(214, 8, 59)',
      labelColor: 'rgb(255, 255, 255)',
      foregroundColor: 'rgb(255, 255, 255)',
      formatVersion: 1,
      organizationName: 'Virgin Australia',
      teamIdentifier: '8F53L4G5YL',
      passTypeIdentifier: 'pass.com.velocityfrequentflyer.loyalty',
      serialNumber: '00000000002051920312',
      authenticationToken: 'TESTDATADONOTUSE',
      webServiceURL: 'https://apps.virginaustralia.com/LoyaltyCardAppleWallet/',
      barcodes: [{
        message: 'T1Test/Test MISS    VA 2051920312      RED180122LNG    ',
        format: 'PKBarcodeFormatAztec',
        messageEncoding: 'iso-8859-1',
        altText: '',
      }],
      storeCard: {
        primaryFields: [
          {
            key: 'memberName',
            label: '2051 920 312',
            value: 'MISS TEST TEST       ',
          },
        ],
        secondaryFields: [
          {
            key: 'pointsBalance',
            label: 'POINTS BALANCE',
            value: '2,051,920',
          },
        ],
        backFields: [
          {
            key: 'contactUs',
            label: 'Contact Us',
            value: "Australia <a href='tel:+61 13 18 75'>+61 13 18 75</a>\nNew Zealand <a href='tel:0800 230 875'>0800 230 875</a>\nInternational <a href='tel:+61 2 8667 5924'>+61 2 8667 5924</a>",
          },
        ],
      },
    } as AppleWalletPassObject);
  });
  test('creates an event pass object', () => {
    expect(AppleWalletCreatePassObject(eventPass)).toEqual({
      description: eventPass.description,
      formatVersion: 1,
      organizationName: eventPass.orgName,
      teamIdentifier: eventPass.teamId,
      passTypeIdentifier: eventPass.passTypeId,
      serialNumber: eventPass.serialNumber,
      barcodes: eventPass.barcode,
      nfc: eventPass.NFC,
      expirationDate: eventPass.expirationDate,
      eventTicket: eventPass.passInfo,
      relevantDate: eventPass.relevantDate,
      semantics: {
        duration: 14400,
        eventName: 'Example Event',
        eventType: 'PKEventTypeGeneric',
      },
    } as AppleWalletPassObject);
  });
});

describe('create manifests', () => {
  test('make example manifest', () => {
    expect(AppleWalletCreateManifest('Example.pass')).toEqual({
      'icon.png': '16c5221213209c2a018aaef468299bd699bc1d60',
      'icon@2x.png': 'bd015e30f9f4b501c0279fc23d1a59dd57a963e5',
      'icon@3x.png': 'b03808e6e0966fc99a6ff7b41775fb61ba59cc3a',
      'logo.png': '78e3bf7bd255783b1923d3f5391f9d55b81865da',
      'logo@2x.png': '1ac4d20fbd844dae93f496164cb2c19a5bb2fa3e',
      'pass.json': '37e4aeac91a4584c94e6b7900a1b6c7f18e47284',
    });
  });
});

describe('sign manifest', () => {
  test('sign manifest for example pass', () => {
    AppleWalletSignManifest('ManifestedExample.pass', 'priv/keys/pass-generic.p12');
  });
});

describe('generate full pass', () => {
  test('create a generic pass from a template', () => {
    AppleWalletCreatePass({
      orgName: genericPass.orgName,
      passTypeId: genericPass.passTypeId,
      serialNumber: genericPass.serialNumber,
      teamId: genericPass.teamId,
      description: genericPass.description,
      passType: genericPass.passType,
      passInfo: {},
    }, 'priv/keys/pass-generic.p12', 'Example.pass');
  });
  test('create a boarding pass from a template', () => {
    AppleWalletCreatePass({
      orgName: genericPass.orgName,
      passTypeId: genericPass.passTypeId,
      serialNumber: genericPass.serialNumber,
      teamId: genericPass.teamId,
      description: genericPass.description,
      passType: 'boardingPass' as AppleWalletPassTypes,
      passInfo: genericPass.passInfo,
    }, 'priv/keys/pass-generic.p12', 'Example.pass');
  });
  test('test that errors throw correctly', () => {
    expect(() => {
      AppleWalletCreatePass({
        orgName: genericPass.orgName,
        passTypeId: genericPass.passTypeId,
        serialNumber: genericPass.serialNumber,
        teamId: genericPass.teamId,
        description: genericPass.description,
        passType: genericPass.passType,
        passInfo: {},
      }, 'priv/keys/pass-generic.p12', './');
    }).toThrow();
  });
});
