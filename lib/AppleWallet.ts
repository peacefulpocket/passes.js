import {
  readdirSync,
  readFileSync,
  writeFileSync,
} from 'node:fs';
import { createHash } from 'node:crypto';
import * as forge from 'node-forge';
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
    const fileBuffer = readFileSync(`${folderPath}/${file}`);
    const sha1 = createHash('sha1');
    sha1.update(fileBuffer);
    const sha1Hash = sha1.digest('hex');
    manifestArray.push({ name: file, sha1: sha1Hash });
  });
  const manifest = manifestArray.reduce((acc, { name, sha1 }) => ({ ...acc, [name]: sha1 }), {});
  return manifest;
}

export function AppleWalletSignManifest(manifestPath: string, signCertPath: string) {
  const signBinary = readFileSync(signCertPath, 'binary');
  const signAsn1 = forge.asn1.fromDer(signBinary);
  const signP12 = forge.pkcs12.pkcs12FromAsn1(signAsn1);
  const signKeyBags = signP12.getBags({ bagType: forge.pki.oids.pkcs8ShroudedKeyBag });
  const signKeyBag = signKeyBags[forge.pki.oids.pkcs8ShroudedKeyBag]![0];
  const signCertBags = signP12.getBags({ bagType: forge.pki.oids.certBag });
  const signCertBag = signCertBags[forge.pki.oids.certBag]![0];
  const signKey = signKeyBag.key!;
  const signCert = signCertBag.cert!;
  const wwdrBinary = readFileSync('wwdr/wwdr.cer', 'binary');
  const wwdrAsn1 = forge.asn1.fromDer(wwdrBinary);
  const wwdr = forge.pki.certificateFromAsn1(wwdrAsn1);
  const pkcs7 = forge.pkcs7.createSignedData();
  pkcs7.content = readFileSync(`${manifestPath}/manifest.json`, 'utf8');
  pkcs7.addCertificate(signCert);
  pkcs7.addCertificate(wwdr);
  pkcs7.addSigner({
    key: signKey as forge.pki.rsa.PrivateKey,
    certificate: signCert,
    digestAlgorithm: forge.pki.oids.sha1,
    authenticatedAttributes: [
      {
        type: forge.pki.oids.contentType,
        value: forge.pki.oids.data,
      },
      {
        type: forge.pki.oids.messageDigest,
      },
      {
        type: forge.pki.oids.signingTime,
      },
    ],
  });
  pkcs7.sign({ detached: true });
  writeFileSync(`${manifestPath}/signature`, Buffer.from(forge.asn1.toDer(pkcs7.toAsn1()).getBytes(), 'binary'));
  return Buffer.from(forge.asn1.toDer(pkcs7.toAsn1()).getBytes(), 'binary');
}
