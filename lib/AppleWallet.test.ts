import AppleWalletCreatePassObject from './AppleWallet';
import { AppleWalletBarcode, AppleWalletGeneric, AppleWalletPassTypes } from './types';

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

describe('create minimum viable pass object', () => {
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
});

describe('create pass with barcode and primary fields', () => {
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
});
