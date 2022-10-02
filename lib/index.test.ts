import AppleWalletCreatePassObject from './AppleWallet';
import { AppleWalletPassTypes } from './types';

const pass = {
  orgName: 'testOrgName',
  passTypeId: 'pass.test.type.id',
  serialNumber: 'testSerialNumber0',
  teamId: 'TESTTEAMID0',
  description: 'Test Description',
  passType: 'generic' as AppleWalletPassTypes,
  passInfo: {},
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
      passInfo: pass.passInfo,
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
