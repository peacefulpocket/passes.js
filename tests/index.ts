import { AppleWalletCreatePassObject } from '../lib';
import { AppleWalletPassTypes } from '../lib/types/applePass';

const pass = {
  orgName: 'bingBong',
  passTypeId: 'bingBong',
  serialNumber: 'bingBong1',
  teamId: 'bingBong',
  description: 'bingBong',
  passType: 'StoreCard' as AppleWalletPassTypes,
  passInfo: {},
};

console.log(AppleWalletCreatePassObject(pass));
