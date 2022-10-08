import { readdirSync, readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { AppleWalletPassInfo, AppleWalletPassObject } from './types/applePass';

export function AppleWalletCreatePassObject(passInfo: AppleWalletPassInfo) {
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

export function AppleWalletCreateManifest(folderPath: string) {
  const manifestArray: { name: string, sha1: string }[] = [];
  const files = readdirSync(folderPath);
  files.forEach((file) => {
    const fileBuffer = readFileSync(`/mnt/c/Users/Lucy/Downloads/woolworths/${file}`);
    const sha1 = createHash('sha1');
    sha1.update(fileBuffer);
    const sha1Hash = sha1.digest('hex');
    manifestArray.push({ name: file, sha1: sha1Hash });
  });
  const manifest = manifestArray.reduce((acc, { name, sha1 }) => ({ ...acc, [name]: sha1 }), {});
  return manifest;
}
