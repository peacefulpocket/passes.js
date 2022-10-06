import { AppleWalletPassInfo, AppleWalletPassObject } from './types/applePass';

export default function AppleWalletCreatePassObject(passInfo: AppleWalletPassInfo) {
  const pass: AppleWalletPassObject = {
    formatVersion: 1,
    organizationName: passInfo.orgName,
    passTypeIdentifier: passInfo.passTypeId,
    serialNumber: passInfo.serialNumber,
    teamIdentifier: passInfo.teamId,
    description: passInfo.description,
    [passInfo.passType]: passInfo.passInfo,
    barcodes: passInfo.barcode,
    authenticationToken: passInfo.webServiceAuth,
    webServiceURL: passInfo.webServiceURL,
  };
  return pass;
}
