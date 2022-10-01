import { RGB } from './util';

export type AppleWalletPassFieldContent = {
  key: string,
  value: string | Date | number,
  label: string,
  changeMessage: string,
  attributedValue: string | Date | number,
  currency: string,
  dataDetectorTypes: string[],
  dateStyle: 'PKDateStyleNone', 'PKDateStyleShort', 'PKDateStyleMedium', 'PKDateStyleLong', 'PKDateStyleFull',
  ignoreTimeZone: boolean,
  relativeDate: boolean,
  numberStyle: 'PKNumberStyleDecimal' | 'PKNumberStylePercent' | 'PKNumberStyleScientific' | 'PKNumberStyleSpellOut',
  textAlignment: 'PKTextAlignmentLeft' | 'PKTextAlignmentCenter' | 'PKTextAlignmentRight' | 'PKTextAlignmentNatural',
  timeStyle: 'PKDateStyleNone', 'PKDateStyleShort', 'PKDateStyleMedium', 'PKDateStyleLong', 'PKDateStyleFull'
};

export type AppleWalletAuxField = AppleWalletPassFieldContent & { row: number };

export type AppleWalletPassFields = {
  auxFields: AppleWalletAuxField[],
  backFields: AppleWalletPassFieldContent[],
  HeaderFields: AppleWalletPassFieldContent[],
  primaryFields: AppleWalletPassFieldContent[],
  secondaryFields: AppleWalletPassFieldContent[],
};

export type AppleWalletBarcode = {
  message: string,
  format: 'PKBarcodeFormatQR' | 'PKBarcodeFormatPDF417' | 'PKBarcodeFormatAztec' | 'PKBarcodeFormatCode128',
  messageEncoding: string,
  altText: string,
};

export type AppleWalletBeacon = {
  proximityUUID: string,
  relevantText: string,
  major: number,
  minor: number,
};

export type AppleWalletLocation = {
  latitude: number,
  longitude: number,
  altitude: number,
  relevantText: string,
};

export type AppleWalletGeneric = AppleWalletPassFields;

export type AppleWalletCoupon = AppleWalletPassFields;

export type AppleWalletBoardingPass = AppleWalletPassFields & { transitType: 'PKTransitTypeAir' | 'PKTransitTypeBoat' | 'PKTransitTypeBus' | 'PKTransitTypeGeneric' | 'PKTransitTypeTrain' };

export type AppleWalletEventTicket = AppleWalletPassFields;

export type AppleWalletStoreCard = AppleWalletPassFields;

export type AppleWalletPass = {
  passTypeId: string,
  serialNumber: string,
  teamId: string,
  description: string,
  barcode: AppleWalletBarcode[],
  beacons: AppleWalletBeacon[],
  locations: AppleWalletLocation[],
  maxDistance: number,
  orgName: string,
  description: string,
  bgColour: RGB,
  fgColour: RGB,
  labelColour: RGB,
  sharingProhib: boolean,
  stripShine: boolean,
  void: boolean,
  appUrl: string,
  associatedStoreId: number[],
  webServiceURL: string,
  webServiceAuth: string,
  expirationDate: Date,
  relevantDate: Date,
  groupId: string,
  logoText: string,
  userInfo: object,
};
