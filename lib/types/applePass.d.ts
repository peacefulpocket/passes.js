import { DateTime } from '@types/luxon';
import { RGB } from './util';

export type AppleWalletPassFieldContent = {
  key: string,
  value: string | DateTime | number,
  label?: string,
  changeMessage?: string,
  attributedValue?: string | DateTime | number,
  currency?: string,
  dataDetectorTypes?: string[],
  dateStyle?: 'PKDateStyleNone', 'PKDateStyleShort', 'PKDateStyleMedium', 'PKDateStyleLong', 'PKDateStyleFull',
  ignoreTimeZone?: boolean,
  relativeDate?: boolean,
  numberStyle?: 'PKNumberStyleDecimal' | 'PKNumberStylePercent' | 'PKNumberStyleScientific' | 'PKNumberStyleSpellOut',
  textAlignment?: 'PKTextAlignmentLeft' | 'PKTextAlignmentCenter' | 'PKTextAlignmentRight' | 'PKTextAlignmentNatural',
  timeStyle?: 'PKDateStyleNone', 'PKDateStyleShort', 'PKDateStyleMedium', 'PKDateStyleLong', 'PKDateStyleFull'
  semantics?: AppleWalletSemantics,
};

export type AppleWalletAuxField = AppleWalletPassFieldContent & { row: number };

export type AppleWalletPassFields = {
  auxFields?: AppleWalletAuxField[],
  backFields?: AppleWalletPassFieldContent[],
  headerFields?: AppleWalletPassFieldContent[],
  primaryFields?: AppleWalletPassFieldContent[],
  secondaryFields?: AppleWalletPassFieldContent[],
};

export type AppleWalletBarcode = {
  message: string,
  format: 'PKBarcodeFormatQR' | 'PKBarcodeFormatPDF417' | 'PKBarcodeFormatAztec' | 'PKBarcodeFormatCode128',
  messageEncoding: string,
  altText?: string,
};

export type AppleWalletBeacon = {
  proximityUUID: string,
  relevantText?: string,
  major?: number,
  minor?: number,
};

export type AppleWalletLocation = {
  latitude?: number,
  longitude?: number,
  altitude: number,
  relevantText: string,
};

export type AppleWalletPersonalizationFields = 'PKPassPersonalizationFieldName' | 'PKPassPersonalizationFieldPostalCode' | 'PKPassPersonalizationFieldEmailAddress' | 'PKPassPersonalizationFieldPhoneNumber';

export type AppleWalletPersonalize = {
  description: string,
  requiredPersonalizationFields: AppleWalletPersonalizationFields[],
  termsAndConditions?: string,
};

export type AppleWalletGeneric = AppleWalletPassFields;

export type AppleWalletCoupon = AppleWalletPassFields;

export type AppleWalletBoardingPass = AppleWalletPassFields & { transitType: 'PKTransitTypeAir' | 'PKTransitTypeBoat' | 'PKTransitTypeBus' | 'PKTransitTypeGeneric' | 'PKTransitTypeTrain' };

export type AppleWalletEventTicket = AppleWalletPassFields;

export type AppleWalletStoreCard = AppleWalletPassFields;

export type AppleWalletPassTypes = 'boardingPass' | 'coupon' | 'eventTicket' | 'generic' | 'storeCard';

export type AppleWalletNfc = {
  encPublicKey: string,
  message: string,
  reqAuth?: boolean,
};

export type AppleWalletSemanticTagType = {
  currencyAmount?: {
    amount: string,
    currencyCode?: string,
  },
  location?: {
    latitude: number,
    longitude: number,
  },
  personName?: {
    familyName?: string,
    givenName: string,
    middleName?: string,
    namePrefix?: string,
    nameSuffix?: string,
    nickname?: string,
    phoneticRepresentation?: string,
  },
  seat?: {
    seatDescription?: string,
    seatIdentifier?: string,
    seatNumber?: string,
    seatRow?: string,
    seatSection?: string,
    seatType?: string,
  },
  wifiNetwork?: {
    password: string,
    ssid: string,
  },
};

export type AppleWalletSemantics = {
  airlineCode?: string,
  artistIDs?: string[],
  awayTeamAbbreviation?: string,
  awayTeamLocation?: string,
  awayTeamName?: string,
  balance?: AppleWalletSemanticTagType.currencyAmount,
  boardingGroup?: string,
  boardingSequenceNumber?: string,
  carNumber?: string,
  confirmationNumber?: string,
  currentArrivalDate?: DateTime,
  currentBoardingDate?: DateTime,
  currentDepartureDate?: DateTime,
  departureAirportCode?: string,
  departureAirportName?: string,
  departureGate?: string,
  departureLocation?: AppleWalletSemanticTagType.location,
  departureLocationDescription?: string,
  departurePlatform?: string,
  departureStationName?: string,
  departireTerminal?: string,
  destinationAirportCode?: string,
  destinationAirportName?: string,
  destinationGate?: string,
  destinationLocation?: AppleWalletSemanticTagType.location,
  destinationLocationDescription?: string,
  destinationPlatform?: string,
  destinationStationName?: string,
  destinationTerminal?: string,
  duration?: number,
  eventEndDate?: DateTime,
  eventName?: string,
  eventStartDate?: string,
  eventType?: 'PKEventTypeGeneric' | 'PKEventTypeLivePerformance' | 'PKEventTypeMovie' | 'PKEventTypeSports' | 'PKEventTypeConference' | 'PKEventTypeConvention' | 'PKEventTypeWorkshop' | 'PKEventTypeSocialGathering',
  flightCode?: string,
  flightNumber?: number,
  genre?: string,
  homeTeamAbbreviation?: string,
  homeTeamLocation?: string,
  homeTeamName?: string,
  leagueAbbriviation?: string,
  leagueName?: string,
  membershipProgramName?: string,
  membershipProgramNumber?: string,
  originalArrivalDate?: DateTime,
  originalBoardingDate?: DateTime,
  originalDepartureDate?: DateTime,
  passengerName?: AppleWalletSemanticTagType.personName,
  performerNames?: string[],
  priorityStatus?: string,
  seats?: AppleWalletSemanticTagType.seat[],
  securityScreening?: string,
  silenceRequested?: boolean,
  sportName?: string,
  totalPrice?: AppleWalletSemanticTagType.currencyAmount,
  transitProvider?: string,
  transitStatus?: string,
  transitStatusReason?: string,
  vehicleName?: string,
  vehicleNumber?: string,
  vehicleType?: string,
  venueEntrance?: string,
  venueLocation?: AppleWalletSemanticTagType.location,
  venueName?: string,
  venuePhoneNumber?: string,
  venueRoom?: string,
  wifiAccess?: AppleWalletSemanticTagType.wifiNetwork[],
};

export type AppleWalletPassInfo = {
  passTypeId: string,
  serialNumber: string,
  teamId: string,
  description: string,
  orgName: string,
  barcode?: AppleWalletBarcode[],
  beacons?: AppleWalletBeacon[],
  locations?: AppleWalletLocation[],
  maxDistance?: number,
  bgColor?: RGB,
  fgColor?: RGB,
  labelColor?: RGB,
  sharingProhib?: boolean,
  supressStripShine?: boolean,
  void?: boolean,
  appUrl?: string,
  associatedStoreId?: number[],
  webServiceURL?: string,
  webServiceAuth?: string,
  expirationDate?: DateTime,
  relevantDate?: DateTime,
  groupId?: string,
  logoText?: string,
  userInfo?: object,
  personalize?: AppleWalletPersonalize,
  passType: AppleWalletPassTypes,
  passInfo: AppleWalletBoardingPass | AppleWalletCoupon |
  AppleWalletEventTicket | AppleWalletGeneric | AppleWalletStoreCard,
  NFC?: AppleWalletNfc,
  semantics?: AppleWalletSemantics,
};

export type AppleWalletPassObject = {
  formatVersion: number,
  organizationName: AppleWalletPassInfo.orgName,
  passTypeIdentifier: AppleWalletPassInfo.passTypeId,
  serialNumber: AppleWalletPassInfo.serialNumber,
  teamIdentifier: AppleWalletPassInfo.teamId,
  description: AppleWalletPassInfo.description,
  barcodes?: AppleWalletBarcode[],
  beacons?: AppleWalletBeacon[],
  locations?: AppleWalletLocation[],
  maxDistance?: number,
  backgroundColor?: RGB,
  foregroundColor?: RGB,
  labelColor?: RGB,
  sharingProhibited?: boolean,
  suppressStripShine?: boolean,
  voided?: boolean,
  appLaunchURL?: string,
  associatedStoreIdentifiers?: number[],
  webServiceURL?: string,
  authenticationToken?: string,
  expirationDate?: DateTime,
  relevantDate?: DateTime,
  groupingIdentifier?: string,
  logoText?: string,
  userInfo?: object,
  personalize?: AppleWalletPersonalize,
  nfc?: AppleWalletNfc,
  semantics?: AppleWalletSemantics,
};
