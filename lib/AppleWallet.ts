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
    beacons: passInfo.beacons,
    locations: passInfo.locations,
    maxDistance: passInfo.maxDistance,
    backgroundColor: passInfo.bgColor,
    foregroundColor: passInfo.fgColor,
    labelColor: passInfo.labelColor,
    sharingProhibited: passInfo.sharingProhib,
    suppressStripShine: passInfo.supressStripShine,
    voided: passInfo.void,
    appLaunchURL: passInfo.appUrl,
    associatedStoreIdentifiers: passInfo.associatedStoreId,
    webServiceURL: passInfo.webServiceURL,
    authenticationToken: passInfo.webServiceAuth,
    expirationDate: passInfo.expirationDate,
    relevantDate: passInfo.relevantDate,
    groupingIdentifier: passInfo.groupId,
    logoText: passInfo.logoText,
    userInfo: passInfo.userInfo,
    personalize: passInfo.personalize,
    nfc: passInfo.NFC,
    semantics: passInfo.semantics,
  };
  const filteredPass = Object.fromEntries(
    Object.entries(pass).filter(([, value]) => !!value),
  ) as AppleWalletPassObject;
  return filteredPass;
}
