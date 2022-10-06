import AppleWalletCreatePassObject from './AppleWallet';
import {
  AppleWalletBarcode, AppleWalletGeneric, AppleWalletPassTypes, AppleWalletStoreCard,
} from './types';

const pass = {
  orgName: 'testOrgName',
  passTypeId: 'pass.test.type.id',
  serialNumber: 'testSerialNumber0',
  teamId: 'TESTTEAMID0',
  description: 'Test Description',
  passType: 'generic' as AppleWalletPassTypes,
  barcode: [{
    message: 'testBarcode0',
    format: 'PKBarcodeFormatCode128',
    messageEncoding: 'utf-8',
    altText: 'test alt text0',
  }] as AppleWalletBarcode[],
  passInfo: {
    primaryFields: [{
      key: 'testKey0',
      value: 'Test Field 0',
      label: 'Test Label 0',
    }],
  } as AppleWalletGeneric,
};

describe('create pass objects', () => {
  test('creates a pass object with the minimum required information to show on apple devices', () => {
    expect(AppleWalletCreatePassObject({
      orgName: pass.orgName,
      passTypeId: pass.passTypeId,
      serialNumber: pass.serialNumber,
      teamId: pass.teamId,
      description: pass.description,
      passType: pass.passType,
      passInfo: {},
    })).toEqual({
      formatVersion: 1,
      organizationName: pass.orgName,
      passTypeIdentifier: pass.passTypeId,
      serialNumber: pass.serialNumber,
      teamIdentifier: pass.teamId,
      description: pass.description,
      [pass.passType]: {},
    });
  });
  test('creates a generic pass with barcode and test primary fields', () => {
    expect(AppleWalletCreatePassObject({
      orgName: pass.orgName,
      passTypeId: pass.passTypeId,
      serialNumber: pass.serialNumber,
      teamId: pass.teamId,
      description: pass.description,
      passType: pass.passType,
      barcode: pass.barcode,
      passInfo: pass.passInfo,
    })).toEqual({
      formatVersion: 1,
      organizationName: pass.orgName,
      passTypeIdentifier: pass.passTypeId,
      serialNumber: pass.serialNumber,
      teamIdentifier: pass.teamId,
      description: pass.description,
      barcodes: pass.barcode,
      [pass.passType]: pass.passInfo,
    });
  });
  test('creates a fully fledged pass', () => {
    expect(AppleWalletCreatePassObject({
      orgName: 'Virgin Australia',
      passTypeId: 'pass.com.velocityfrequentflyer.loyalty',
      serialNumber: '00000000002051920312',
      teamId: '8F53L4G5YL',
      description: 'Velocity Frequent Flyer',
      fgColour: 'rgb(255, 255, 255)',
      passType: 'storeCard',
      webServiceAuth: 'TESTDATADONOTUSE',
      webServiceURL: 'https://apps.virginaustralia.com/LoyaltyCardAppleWallet/',
      barcode: [{
        message: 'T1Test/Test MISS    VA 2051920312      RED180122LNG    ',
        format: 'PKBarcodeFormatAztec',
        messageEncoding: 'iso-8859-1',
        altText: '',
      }] as AppleWalletBarcode[],
      labelColour: 'rgb(255, 255, 255)',
      bgColour: 'rgb(214, 8, 59)',
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
    });
  });
});
