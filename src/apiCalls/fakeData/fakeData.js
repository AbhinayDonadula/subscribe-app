const fakeData = [
  {
    Status: 'A',
    Reserve: '',
    SubType: 'R',
    RecordKey: '00000000108017',
    BpSubPrice: '0000008990',
    AllowReorder: '1',
    ActionCode: '',
    FreeSku: '',
    NickName: '',
    IncPct: '00',
    AllowCancel: '1',
    Desc: 'TISSUE,FACIAL,PUFFS,BASIC,3PK',
    BundleId: '',
    NextDlvDt: '11/13/2018',
    SkuCount: '',
    AllowMod: '1',
    AllowSkip: '1',
    LstChgTmpStmp: '2018-09-13-14.36.43.313000',
    QtyOrd: '00001',
    WlrPct: '00',
    Freq: 'W',
    SKU: '0319997',
    isItem: true,
    itemDescription: 'TISSUE,FACIAL,PUFFS,BASIC,3PK',
    billingFrequency: 'W',
    quantity: '00001',
    status: 'A',
    sortDate: '11/13/2018'
  },
  {
    Status: 'A',
    Reserve: '',
    SubType: 'R',
    RecordKey: '00000000095175',
    BpSubPrice: '0000005475',
    AllowReorder: '1',
    ActionCode: '',
    FreeSku: '',
    NickName: '',
    IncPct: '50',
    AllowCancel: '1',
    Desc: 'FOLDER,LTR,1/3CUT,100BX,MANILA',
    BundleId: '',
    NextDlvDt: '11/06/2018',
    SkuCount: '',
    AllowMod: '1',
    AllowSkip: '1',
    LstChgTmpStmp: '2018-10-05-17.48.39.176000',
    QtyOrd: '00001',
    WlrPct: '00',
    Freq: 'M',
    SKU: '0315515',
    isItem: true,
    itemDescription: 'FOLDER,LTR,1/3CUT,100BX,MANILA',
    billingFrequency: 'M',
    quantity: '00001',
    status: 'A',
    sortDate: '11/06/2018'
  },
  {
    Status: 'A',
    Reserve: '',
    SubType: 'R',
    RecordKey: '00000000107786',
    BpSubPrice: '0000009855',
    AllowReorder: '1',
    ActionCode: '',
    FreeSku: '',
    NickName: '',
    IncPct: '10',
    AllowCancel: '1',
    Desc: 'FOLDER,LTR,1/3CUT,100BX,MANILA',
    BundleId: '',
    NextDlvDt: '10/15/2018',
    SkuCount: '',
    AllowMod: '1',
    AllowSkip: '1',
    LstChgTmpStmp: '2018-09-13-13.38.22.343000',
    QtyOrd: '00001',
    WlrPct: '00',
    Freq: 'M',
    SKU: '0315515',
    isItem: true,
    itemDescription: 'FOLDER,LTR,1/3CUT,100BX,MANILA',
    billingFrequency: 'M',
    quantity: '00001',
    status: 'A',
    sortDate: '10/15/2018'
  },
  {
    orderNumber: '404658727-001',
    contractId: '42590',
    startDate: '2018-10-05',
    endDate: '2020-10-04',
    closeDate: '',
    status: 'Active',
    loyaltyMember: '1931742397',
    versionNumber: '1',
    paymentDetails: {
      paymentType: 'PLCC',
      paymentCard: {
        expirationDate: '2049-03-01',
        cardType: 'PLCC',
        billingAddress: {
          fullName: 'FIRST SERVICE',
          fullAddress: '3515 BROOKSTONE DR,HAMILTON,CINCINNATI, OH 45209'
        }
      }
    },
    lineNumber: '1',
    lineTypeName: 'Subscription',
    itemName: '9760701',
    itemNumber: '9760701',
    unitOfMeasure: 'EA',
    quantity: '1',
    billingFrequency: 'MON',
    unitPrice: '23',
    serviceType: 'SS',
    currentBillingStartDate: '2018-10-05',
    currentBillingEndDate: '2018-11-04',
    nextBillingDate: '2018-11-05',
    itemDescription: 'Proactive PC Monitoring & Security Support ',
    vendorNumber: '01132448',
    fullName: 'FIRST SERVICE',
    reactKeyId: 1,
    sortDate: '10/05/2018'
  },
  {
    orderNumber: '404650828-001',
    contractId: '42542',
    startDate: '2018-10-05',
    endDate: '2019-10-04',
    closeDate: '',
    status: 'Active',
    loyaltyMember: '1931742397',
    versionNumber: '2',
    paymentDetails: {
      paymentType: 'CreditCard',
      paymentCard: {
        expirationDate: '2022-06-01',
        cardType: 'MASTERCARD',
        billingAddress: {
          fullName: 'FIRST SERVICE',
          fullAddress: '3515 BROOKSTONE DR,HAMILTON,CINCINNATI, OH 45209'
        }
      }
    },
    lineNumber: '1',
    lineTypeName: 'Subscription',
    itemName: '9204711',
    itemNumber: '9204711',
    unitOfMeasure: 'EA',
    quantity: '1',
    billingFrequency: 'MON',
    unitPrice: '15',
    serviceType: 'SS',
    currentBillingStartDate: '2018-10-05',
    currentBillingEndDate: '2018-11-04',
    nextBillingDate: '2018-11-05',
    itemDescription: 'Unlimited On Demand Technical Support & Tune Ups',
    vendorNumber: '01132448',
    fullName: 'FIRST SERVICE',
    reactKeyId: 12,
    sortDate: '10/05/2018'
  },
  {
    orderNumber: '404658718-001',
    contractId: '42588',
    startDate: '2018-10-05',
    endDate: '2019-10-04',
    closeDate: '',
    status: 'Active',
    loyaltyMember: '1931742397',
    versionNumber: '1',
    paymentDetails: {
      paymentType: 'PayPal',
      paymentCard: {
        expirationDate: '',
        cardType: '',
        billingAddress: {
          fullName: 'FIRST SERVICE',
          fullAddress: '3515 BROOKSTONE DR,HAMILTON,CINCINNATI, OH 45209'
        }
      }
    },
    lineNumber: '1',
    lineTypeName: 'Subscription',
    itemName: '267807',
    itemNumber: '267807',
    unitOfMeasure: 'EA',
    quantity: '1',
    billingFrequency: 'MON',
    unitPrice: '89',
    serviceType: 'SS',
    currentBillingStartDate: '2018-10-05',
    currentBillingEndDate: '2018-11-04',
    nextBillingDate: '2018-11-05',
    itemDescription: 'BASIC WEB SERVICES',
    vendorNumber: '01242135',
    fullName: 'FIRST SERVICE',
    reactKeyId: 3,
    sortDate: '10/05/2018'
  },
  {
    orderNumber: '404658196-001',
    contractId: '42587',
    startDate: '2018-10-05',
    endDate: '2019-10-04',
    closeDate: '',
    status: 'Active',
    loyaltyMember: '1931742397',
    versionNumber: '1',
    paymentDetails: {
      paymentType: 'CreditCard',
      paymentCard: {
        expirationDate: '2031-11-01',
        cardType: 'DISCOVER',
        billingAddress: {
          fullName: 'FIRST SERVICE',
          fullAddress: '3515 BROOKSTONE DR,HAMILTON,CINCINNATI, OH 45209'
        }
      }
    },
    lineNumber: '1',
    lineTypeName: 'Subscription',
    itemName: '5140191',
    itemNumber: '5140191',
    unitOfMeasure: 'EA',
    quantity: '1',
    billingFrequency: 'MON',
    unitPrice: '68',
    serviceType: 'SS',
    currentBillingStartDate: '2018-10-05',
    currentBillingEndDate: '2018-11-04',
    nextBillingDate: '2018-11-05',
    itemDescription: 'SHRDZ1 RECUR, 2CONTAIN, MTHLY',
    vendorNumber: '01306234',
    fullName: 'FIRST SERVICE',
    reactKeyId: 4,
    sortDate: '10/05/2018'
  },
  {
    orderNumber: '404657778-001',
    contractId: '42586',
    startDate: '2018-10-05',
    endDate: '2019-10-04',
    closeDate: '',
    status: 'Active',
    loyaltyMember: '1931742397',
    versionNumber: '1',
    paymentDetails: {
      paymentType: 'CreditCard',
      paymentCard: {
        expirationDate: '2031-02-01',
        cardType: 'MASTERCARD',
        billingAddress: {
          fullName: 'FIRST SERVICE',
          fullAddress: '3515 BROOKSTONE DR,HAMILTON,CINCINNATI, OH 45209'
        }
      }
    },
    lineNumber: '1',
    lineTypeName: 'Subscription',
    itemName: '9990378',
    itemNumber: '9990378',
    unitOfMeasure: 'EA',
    quantity: '1',
    billingFrequency: 'YR',
    unitPrice: '149.99',
    serviceType: 'SS',
    currentBillingStartDate: '2018-10-05',
    currentBillingEndDate: '2019-10-04',
    nextBillingDate: '2019-10-05',
    itemDescription: 'Platinum Setup & Protection',
    vendorNumber: '01285689',
    fullName: 'FIRST SERVICE',
    reactKeyId: 5,
    sortDate: '10/05/2018'
  },
  {
    orderNumber: '404655838-001',
    contractId: '42585',
    startDate: '2018-10-05',
    endDate: '2019-10-04',
    closeDate: '',
    status: 'Active',
    loyaltyMember: '1931742397',
    versionNumber: '1',
    paymentDetails: {
      paymentType: 'CreditCard',
      paymentCard: {
        expirationDate: '2032-02-01',
        cardType: 'VISA',
        billingAddress: {
          fullName: 'FIRST SERVICE',
          fullAddress: '3515 BROOKSTONE DR,HAMILTON,CINCINNATI, OH 45209'
        }
      }
    },
    lineNumber: '1',
    lineTypeName: 'Subscription',
    itemName: '9204711',
    itemNumber: '9204711',
    unitOfMeasure: 'EA',
    quantity: '1',
    billingFrequency: 'MON',
    unitPrice: '15',
    serviceType: 'SS',
    currentBillingStartDate: '2018-10-05',
    currentBillingEndDate: '2018-11-04',
    nextBillingDate: '2018-11-05',
    itemDescription: 'Unlimited On Demand Technical Support & Tune Ups',
    vendorNumber: '01132448',
    fullName: 'FIRST SERVICE',
    reactKeyId: 6,
    sortDate: '10/05/2018'
  },
  {
    orderNumber: '404650886-001',
    contractId: '42547',
    startDate: '2018-10-05',
    endDate: '2019-10-04',
    closeDate: '',
    status: 'Active',
    loyaltyMember: '1931742397',
    versionNumber: '1',
    paymentDetails: {
      paymentType: 'PayPal',
      paymentCard: {
        expirationDate: '',
        cardType: '',
        billingAddress: {
          fullName: 'FIRST SERVICE',
          fullAddress: '3515 BROOKSTONE DR,HAMILTON,CINCINNATI, OH 45209'
        }
      }
    },
    lineNumber: '1',
    lineTypeName: 'Subscription',
    itemName: '5140191',
    itemNumber: '5140191',
    unitOfMeasure: 'EA',
    quantity: '1',
    billingFrequency: 'MON',
    unitPrice: '68',
    serviceType: 'SS',
    currentBillingStartDate: '2018-10-05',
    currentBillingEndDate: '2018-11-04',
    nextBillingDate: '2018-11-05',
    itemDescription: 'SHRDZ1 RECUR, 2CONTAIN, MTHLY',
    vendorNumber: '01306234',
    fullName: 'FIRST SERVICE',
    reactKeyId: 7,
    sortDate: '10/05/2018'
  },
  {
    orderNumber: '404650877-001',
    contractId: '42546',
    startDate: '2018-10-05',
    endDate: '2019-01-04',
    closeDate: '',
    status: 'Active',
    loyaltyMember: '1931742397',
    versionNumber: '2',
    paymentDetails: {
      paymentType: 'CreditCard',
      paymentCard: {
        expirationDate: '2022-06-01',
        cardType: 'AMEX',
        billingAddress: {
          fullName: 'FIRST SERVICE',
          fullAddress: '3515 BROOKSTONE DR,HAMILTON,CINCINNATI, OH 45209'
        }
      }
    },
    lineNumber: '1',
    lineTypeName: 'Subscription',
    itemName: '285557',
    itemNumber: '285557',
    unitOfMeasure: 'EA',
    quantity: '1',
    billingFrequency: 'MON',
    unitPrice: '299',
    serviceType: 'SS',
    currentBillingStartDate: '2018-10-05',
    currentBillingEndDate: '2018-11-04',
    nextBillingDate: '2018-11-05',
    itemDescription: 'SOCIAL MEDIA PROMOTE 3 MO',
    vendorNumber: '01242135',
    fullName: 'FIRST SERVICE',
    reactKeyId: 8,
    sortDate: '10/05/2018'
  },
  {
    orderNumber: '404650872-001',
    contractId: '42545',
    startDate: '2018-10-05',
    endDate: '2019-01-04',
    closeDate: '',
    status: 'Draft',
    loyaltyMember: '1931742397',
    versionNumber: '1',
    paymentDetails: {
      paymentCard: {
        expirationDate: '',
        cardType: '',
        billingAddress: {
          fullName: 'FIRST SERVICE',
          fullAddress: '3515 BROOKSTONE DR,HAMILTON,CINCINNATI, OH 45209'
        }
      }
    },
    lineNumber: '1',
    lineTypeName: 'Subscription',
    itemName: '285557',
    itemNumber: '285557',
    unitOfMeasure: 'EA',
    quantity: '1',
    billingFrequency: 'MON',
    unitPrice: '299',
    serviceType: 'SS',
    currentBillingStartDate: '2018-10-05',
    currentBillingEndDate: '2018-11-04',
    nextBillingDate: '2018-11-05',
    itemDescription: 'SOCIAL MEDIA PROMOTE 3 MO',
    vendorNumber: '01242135',
    fullName: 'FIRST SERVICE',
    reactKeyId: 9,
    sortDate: '10/05/2018'
  },
  {
    orderNumber: '404650866-001',
    contractId: '42544',
    startDate: '2018-10-05',
    endDate: '2019-10-04',
    closeDate: '',
    status: 'Active',
    loyaltyMember: '1931742397',
    versionNumber: '1',
    paymentDetails: {
      paymentType: 'PayPal',
      paymentCard: {
        expirationDate: '',
        cardType: '',
        billingAddress: {
          fullName: 'FIRST SERVICE',
          fullAddress: '3515 BROOKSTONE DR,HAMILTON,CINCINNATI, OH 45209'
        }
      }
    },
    lineNumber: '1',
    lineTypeName: 'Subscription',
    itemName: '9204711',
    itemNumber: '9204711',
    unitOfMeasure: 'EA',
    quantity: '1',
    billingFrequency: 'MON',
    unitPrice: '15',
    serviceType: 'SS',
    currentBillingStartDate: '2018-10-05',
    currentBillingEndDate: '2018-11-04',
    nextBillingDate: '2018-11-05',
    itemDescription: 'Unlimited On Demand Technical Support & Tune Ups',
    vendorNumber: '01132448',
    fullName: 'FIRST SERVICE',
    reactKeyId: 10,
    sortDate: '10/05/2018'
  },
  {
    orderNumber: '404650847-001',
    contractId: '42543',
    startDate: '2018-10-05',
    endDate: '2019-01-04',
    closeDate: '',
    status: 'Active',
    loyaltyMember: '1931742397',
    versionNumber: '1',
    paymentDetails: {
      paymentType: 'PayPal',
      paymentCard: {
        expirationDate: '',
        cardType: '',
        billingAddress: {
          fullName: 'FIRST SERVICE',
          fullAddress: '3515 BROOKSTONE DR,HAMILTON,CINCINNATI, OH 45209'
        }
      }
    },
    lineNumber: '1',
    lineTypeName: 'Subscription',
    itemName: '543518',
    itemNumber: '543518',
    unitOfMeasure: 'EA',
    quantity: '1',
    billingFrequency: 'MON',
    unitPrice: '99',
    serviceType: 'SS',
    currentBillingStartDate: '2018-10-05',
    currentBillingEndDate: '2018-11-04',
    nextBillingDate: '2018-11-05',
    itemDescription: 'SOCIAL MEDIA BASIC 3 MOS',
    vendorNumber: '01242135',
    fullName: 'FIRST SERVICE',
    reactKeyId: 11,
    sortDate: '10/05/2018'
  },
  {
    orderNumber: '404658722-001',
    contractId: '42589',
    startDate: '2018-10-05',
    endDate: '2019-10-04',
    closeDate: '',
    status: 'Active',
    loyaltyMember: '1931742397',
    versionNumber: '1',
    paymentDetails: {
      paymentType: 'CreditCard',
      paymentCard: {
        expirationDate: '2033-01-01',
        cardType: 'AMEX',
        billingAddress: {
          fullName: 'FIRST SERVICE',
          fullAddress: '3515 BROOKSTONE DR,HAMILTON,CINCINNATI, OH 45209'
        }
      }
    },
    lineNumber: '1',
    lineTypeName: 'Subscription',
    itemName: '267807',
    itemNumber: '267807',
    unitOfMeasure: 'EA',
    quantity: '1',
    billingFrequency: 'MON',
    unitPrice: '89',
    serviceType: 'SS',
    currentBillingStartDate: '2018-10-05',
    currentBillingEndDate: '2018-11-04',
    nextBillingDate: '2018-11-05',
    itemDescription: 'BASIC WEB SERVICES',
    vendorNumber: '01242135',
    fullName: 'FIRST SERVICE',
    reactKeyId: 2,
    sortDate: '10/05/2018'
  },
  {
    orderNumber: '404643065-001',
    contractId: '42482',
    startDate: '2018-10-04',
    endDate: '2019-10-03',
    closeDate: '',
    status: 'Active',
    loyaltyMember: '1931742397',
    versionNumber: '2',
    paymentDetails: {
      paymentType: 'CreditCard',
      paymentCard: {
        expirationDate: '2028-10-01',
        cardType: 'VISA',
        billingAddress: {
          fullName: 'FIRST SERVICE',
          fullAddress: '3515 BROOKSTONE DR,HAMILTON,CINCINNATI, OH 45209'
        }
      }
    },
    lineNumber: '1',
    lineTypeName: 'Subscription',
    itemName: '9204711',
    itemNumber: '9204711',
    unitOfMeasure: 'EA',
    quantity: '1',
    billingFrequency: 'MON',
    unitPrice: '15',
    serviceType: 'SS',
    currentBillingStartDate: '2018-10-04',
    currentBillingEndDate: '2018-11-03',
    nextBillingDate: '2018-11-04',
    itemDescription: 'Unlimited On Demand Technical Support & Tune Ups',
    vendorNumber: '01132448',
    fullName: 'FIRST SERVICE',
    reactKeyId: 13,
    sortDate: '10/04/2018'
  },
  {
    orderNumber: '404643011-001',
    contractId: '42479',
    startDate: '2018-10-04',
    endDate: '2019-10-03',
    closeDate: '',
    status: 'Active',
    loyaltyMember: '1931742397',
    versionNumber: '1',
    paymentDetails: {
      paymentType: 'CreditCard',
      paymentCard: {
        expirationDate: '2027-09-01',
        cardType: 'VISA',
        billingAddress: {
          fullName: 'FIRST SERVICE',
          fullAddress: '3515 BROOKSTONE DR,HAMILTON,CINCINNATI, OH 45209'
        }
      }
    },
    lineNumber: '1',
    lineTypeName: 'Subscription',
    itemName: '267807',
    itemNumber: '267807',
    unitOfMeasure: 'EA',
    quantity: '1',
    billingFrequency: 'MON',
    unitPrice: '89',
    serviceType: 'SS',
    currentBillingStartDate: '2018-10-04',
    currentBillingEndDate: '2018-11-03',
    nextBillingDate: '2018-11-04',
    itemDescription: 'BASIC WEB SERVICES',
    vendorNumber: '01242135',
    fullName: 'FIRST SERVICE',
    reactKeyId: 14,
    sortDate: '10/04/2018'
  },
  {
    orderNumber: '404642946-001',
    contractId: '42478',
    startDate: '2018-10-04',
    endDate: '2019-10-03',
    closeDate: '',
    status: 'Active',
    loyaltyMember: '1931742397',
    versionNumber: '1',
    paymentDetails: {
      paymentType: 'PayPal',
      paymentCard: {
        expirationDate: '',
        cardType: '',
        billingAddress: {
          fullName: 'FIRST SERVICE',
          fullAddress: '3515 BROOKSTONE DR,HAMILTON,CINCINNATI, OH 45209'
        }
      }
    },
    lineNumber: '1',
    lineTypeName: 'Subscription',
    itemName: '9204711',
    itemNumber: '9204711',
    unitOfMeasure: 'EA',
    quantity: '1',
    billingFrequency: 'MON',
    unitPrice: '15',
    serviceType: 'SS',
    currentBillingStartDate: '2018-10-04',
    currentBillingEndDate: '2018-11-03',
    nextBillingDate: '2018-11-04',
    itemDescription: 'Unlimited On Demand Technical Support & Tune Ups',
    vendorNumber: '01132448',
    fullName: 'FIRST SERVICE',
    reactKeyId: 15,
    sortDate: '10/04/2018'
  },
  {
    orderNumber: '404642881-001',
    contractId: '42475',
    startDate: '2018-10-04',
    endDate: '2019-10-03',
    closeDate: '',
    status: 'Active',
    loyaltyMember: '1931742397',
    versionNumber: '1',
    paymentDetails: {
      paymentType: 'CreditCard',
      paymentCard: {
        expirationDate: '2018-12-01',
        cardType: 'VISA',
        billingAddress: {
          fullName: 'FIRST SERVICE',
          fullAddress: '3515 BROOKSTONE DR,HAMILTON,CINCINNATI, OH 45209'
        }
      }
    },
    lineNumber: '1',
    lineTypeName: 'Subscription',
    itemName: '9204711',
    itemNumber: '9204711',
    unitOfMeasure: 'EA',
    quantity: '1',
    billingFrequency: 'MON',
    unitPrice: '15',
    serviceType: 'SS',
    currentBillingStartDate: '2018-10-04',
    currentBillingEndDate: '2018-11-03',
    nextBillingDate: '2018-11-04',
    itemDescription: 'Unlimited On Demand Technical Support & Tune Ups',
    vendorNumber: '01132448',
    fullName: 'FIRST SERVICE',
    reactKeyId: 16,
    sortDate: '10/04/2018'
  },
  {
    orderNumber: '404642837-001',
    contractId: '42473',
    startDate: '2018-10-04',
    endDate: '2020-10-03',
    closeDate: '',
    status: 'Active',
    loyaltyMember: '1931742397',
    versionNumber: '2',
    paymentDetails: {
      paymentType: 'CreditCard',
      paymentCard: {
        expirationDate: '2022-06-01',
        cardType: 'VISA',
        billingAddress: {
          fullName: 'FIRST SERVICE',
          fullAddress: '3515 BROOKSTONE DR,HAMILTON,CINCINNATI, OH 45209'
        }
      }
    },
    lineNumber: '1',
    lineTypeName: 'Subscription',
    itemName: '9760701',
    itemNumber: '9760701',
    unitOfMeasure: 'EA',
    quantity: '1',
    billingFrequency: 'MON',
    unitPrice: '23',
    serviceType: 'SS',
    currentBillingStartDate: '2018-10-04',
    currentBillingEndDate: '2018-11-03',
    nextBillingDate: '2018-11-04',
    itemDescription: 'Proactive PC Monitoring & Security Support ',
    vendorNumber: '01132448',
    fullName: 'FIRST SERVICE',
    reactKeyId: 17,
    sortDate: '10/04/2018'
  },
  {
    orderNumber: '404635042-001',
    contractId: '42466',
    startDate: '2018-10-04',
    endDate: '2019-10-03',
    closeDate: '',
    status: 'Active',
    loyaltyMember: '1931742397',
    versionNumber: '2',
    paymentDetails: {
      paymentType: 'CreditCard',
      paymentCard: {
        expirationDate: '2022-05-01',
        cardType: 'VISA',
        billingAddress: {
          fullName: 'FIRST SERVICE',
          fullAddress: '3515 BROOKSTONE DR,HAMILTON,CINCINNATI, OH 45209'
        }
      }
    },
    lineNumber: '1',
    lineTypeName: 'Subscription',
    itemName: '9204711',
    itemNumber: '9204711',
    unitOfMeasure: 'EA',
    quantity: '1',
    billingFrequency: 'MON',
    unitPrice: '15',
    serviceType: 'SS',
    currentBillingStartDate: '2018-10-04',
    currentBillingEndDate: '2018-11-03',
    nextBillingDate: '2018-11-04',
    itemDescription: 'Unlimited On Demand Technical Support & Tune Ups',
    vendorNumber: '01132448',
    fullName: 'FIRST SERVICE',
    reactKeyId: 18,
    sortDate: '10/04/2018'
  },
  {
    orderNumber: '404599264-001',
    contractId: '42418',
    startDate: '2018-10-03',
    endDate: '2019-10-02',
    closeDate: '',
    status: 'Active',
    loyaltyMember: '1931742397',
    versionNumber: '1',
    paymentDetails: {
      paymentType: 'CreditCard',
      paymentCard: {
        expirationDate: '2018-12-01',
        cardType: 'VISA',
        billingAddress: {
          fullName: 'FIRST SERVICE',
          fullAddress: '3515 BROOKSTONE DR,HAMILTON,CINCINNATI, OH 45209'
        }
      }
    },
    lineNumber: '1',
    lineTypeName: 'Subscription',
    itemName: '9204711',
    itemNumber: '9204711',
    unitOfMeasure: 'EA',
    quantity: '1',
    billingFrequency: 'MON',
    unitPrice: '15',
    serviceType: 'SS',
    currentBillingStartDate: '2018-10-03',
    currentBillingEndDate: '2018-11-02',
    nextBillingDate: '2018-11-03',
    itemDescription: 'Unlimited On Demand Technical Support & Tune Ups',
    vendorNumber: '01132448',
    fullName: 'FIRST SERVICE',
    reactKeyId: 19,
    sortDate: '10/03/2018'
  },
  {
    orderNumber: '404533718-001',
    contractId: '42320',
    startDate: '2018-10-02',
    endDate: '2019-10-01',
    closeDate: '',
    status: 'Active',
    loyaltyMember: '1931742397',
    versionNumber: '2',
    paymentDetails: {
      paymentType: 'CreditCard',
      paymentCard: {
        expirationDate: '2023-05-01',
        cardType: 'VISA',
        billingAddress: {
          fullName: 'FIRST SERVICE',
          fullAddress: '3515 BROOKSTONE DR,HAMILTON,CINCINNATI, OH 45209'
        }
      }
    },
    lineNumber: '1',
    lineTypeName: 'Subscription',
    itemName: '9204711',
    itemNumber: '9204711',
    unitOfMeasure: 'EA',
    quantity: '1',
    billingFrequency: 'MON',
    unitPrice: '15',
    serviceType: 'SS',
    currentBillingStartDate: '2018-10-02',
    currentBillingEndDate: '2018-11-01',
    nextBillingDate: '2018-11-02',
    itemDescription: 'Unlimited On Demand Technical Support & Tune Ups',
    vendorNumber: '01132448',
    fullName: 'FIRST SERVICE',
    reactKeyId: 20,
    sortDate: '10/02/2018'
  },
  {
    orderNumber: '404513332-001',
    contractId: '42303',
    startDate: '2018-10-01',
    endDate: '2019-09-30',
    closeDate: '',
    status: 'Draft',
    loyaltyMember: '1931742397',
    versionNumber: '1',
    paymentDetails: {
      paymentCard: {
        expirationDate: '',
        cardType: '',
        billingAddress: {
          fullName: 'FIRST SERVICE',
          fullAddress: '3515 BROOKSTONE DR,HAMILTON,CINCINNATI, OH 45209'
        }
      }
    },
    lineNumber: '1',
    lineTypeName: 'Subscription',
    itemName: '9204711',
    itemNumber: '9204711',
    unitOfMeasure: 'EA',
    quantity: '1',
    billingFrequency: 'MON',
    unitPrice: '15',
    serviceType: 'SS',
    currentBillingStartDate: '2018-10-01',
    currentBillingEndDate: '2018-10-31',
    nextBillingDate: '2018-11-01',
    itemDescription: 'Unlimited On Demand Technical Support & Tune Ups',
    vendorNumber: '01132448',
    fullName: 'FIRST SERVICE',
    reactKeyId: 21,
    sortDate: '10/01/2018'
  },
  {
    orderNumber: '404506315-001',
    contractId: '42299',
    startDate: '2018-10-01',
    endDate: '2019-09-30',
    closeDate: '',
    status: 'Active',
    loyaltyMember: '1931742397',
    versionNumber: '1',
    paymentDetails: {
      paymentType: 'CreditCard',
      paymentCard: {
        expirationDate: '2018-12-01',
        cardType: 'VISA',
        billingAddress: {
          fullName: 'FIRST SERVICE',
          fullAddress: '3515 BROOKSTONE DR,HAMILTON,CINCINNATI, OH 45209'
        }
      }
    },
    lineNumber: '1',
    lineTypeName: 'Subscription',
    itemName: '869265',
    itemNumber: '869265',
    unitOfMeasure: 'EA',
    quantity: '1',
    billingFrequency: 'MON',
    unitPrice: '1500',
    serviceType: 'SS',
    currentBillingStartDate: '2018-10-01',
    currentBillingEndDate: '2018-10-31',
    nextBillingDate: '2018-11-01',
    itemDescription: 'PAYPERCLICK FEE $1500 SPE',
    vendorNumber: '01242135',
    fullName: 'FIRST SERVICE',
    reactKeyId: 22,
    sortDate: '10/01/2018'
  },
  {
    orderNumber: '404506315-001',
    contractId: '42299',
    startDate: '2018-10-01',
    endDate: '2019-09-30',
    closeDate: '',
    status: 'Active',
    loyaltyMember: '1931742397',
    versionNumber: '1',
    paymentDetails: {
      paymentType: 'CreditCard',
      paymentCard: {
        expirationDate: '2018-12-01',
        cardType: 'VISA',
        billingAddress: {
          fullName: 'FIRST SERVICE',
          fullAddress: '3515 BROOKSTONE DR,HAMILTON,CINCINNATI, OH 45209'
        }
      }
    },
    lineNumber: '2',
    lineTypeName: 'Subscription',
    itemName: '9796665',
    itemNumber: '9796665',
    unitOfMeasure: 'EA',
    quantity: '1',
    billingFrequency: 'YR',
    unitPrice: '9.99',
    serviceType: 'SS',
    currentBillingStartDate: '2018-10-01',
    currentBillingEndDate: '2019-09-30',
    nextBillingDate: '2019-10-01',
    itemDescription: 'FAX TO EMAIL 300',
    vendorNumber: '01242135',
    fullName: 'FIRST SERVICE',
    reactKeyId: 22,
    sortDate: '10/01/2018'
  },
  {
    Status: 'C',
    Reserve: '',
    SubType: 'R',
    RecordKey: '00000000107120',
    BpSubPrice: '0000010950',
    AllowReorder: '0',
    ActionCode: '',
    FreeSku: '',
    NickName: '',
    IncPct: '00',
    AllowCancel: '0',
    Desc: 'FOLDER,LTR,1/3CUT,100BX,MANILA',
    BundleId: '',
    NextDlvDt: '09/28/2018',
    SkuCount: '',
    AllowMod: '0',
    AllowSkip: '0',
    LstChgTmpStmp: '2018-09-06-13.22.29.853000',
    QtyOrd: '00001',
    WlrPct: '00',
    Freq: 'M',
    SKU: '0315515',
    isItem: true,
    itemDescription: 'FOLDER,LTR,1/3CUT,100BX,MANILA',
    billingFrequency: 'M',
    quantity: '00001',
    status: 'C',
    sortDate: '09/28/2018'
  },
  {
    orderNumber: '404431877-001',
    contractId: '40332',
    startDate: '2018-09-27',
    endDate: '2019-09-26',
    closeDate: '',
    status: 'Active',
    loyaltyMember: '1931742397',
    versionNumber: '2',
    paymentDetails: {
      paymentType: 'CreditCard',
      paymentCard: {
        expirationDate: '2023-07-01',
        cardType: 'AMEX',
        billingAddress: {
          fullName: 'FIRST SERVICE',
          fullAddress: '3515 BROOKSTONE DR,HAMILTON,CINCINNATI, OH 45209'
        }
      }
    },
    lineNumber: '1',
    lineTypeName: 'Subscription',
    itemName: '9204711',
    itemNumber: '9204711',
    unitOfMeasure: 'EA',
    quantity: '1',
    billingFrequency: 'MON',
    unitPrice: '15',
    serviceType: 'SS',
    currentBillingStartDate: '2018-09-27',
    currentBillingEndDate: '2018-10-26',
    nextBillingDate: '2018-10-27',
    itemDescription: 'Unlimited On Demand Technical Support & Tune Ups',
    vendorNumber: '01132448',
    fullName: 'FIRST SERVICE',
    reactKeyId: 23,
    sortDate: '09/27/2018'
  },
  {
    orderNumber: '404431361-001',
    contractId: '40324',
    startDate: '2018-09-27',
    endDate: '2019-09-26',
    closeDate: '',
    status: 'Active',
    loyaltyMember: '1931742397',
    versionNumber: '2',
    paymentDetails: {
      paymentType: 'CreditCard',
      paymentCard: {
        expirationDate: '2024-05-01',
        cardType: 'AMEX',
        billingAddress: {
          fullName: 'FIRST SERVICE',
          fullAddress: '3515 BROOKSTONE DR,HAMILTON,CINCINNATI, OH 45209'
        }
      }
    },
    lineNumber: '1',
    lineTypeName: 'Subscription',
    itemName: '9204711',
    itemNumber: '9204711',
    unitOfMeasure: 'EA',
    quantity: '1',
    billingFrequency: 'MON',
    unitPrice: '15',
    serviceType: 'SS',
    currentBillingStartDate: '2018-09-27',
    currentBillingEndDate: '2018-10-26',
    nextBillingDate: '2018-10-27',
    itemDescription: 'Unlimited On Demand Technical Support & Tune Ups',
    vendorNumber: '01132448',
    fullName: 'FIRST SERVICE',
    reactKeyId: 24,
    sortDate: '09/27/2018'
  },
  {
    orderNumber: '404393339-001',
    contractId: '39396',
    startDate: '2018-09-26',
    endDate: '2019-09-25',
    closeDate: '',
    status: 'Active',
    loyaltyMember: '1931742397',
    versionNumber: '2',
    paymentDetails: {
      paymentType: 'PayPal',
      paymentCard: {
        expirationDate: '',
        cardType: '',
        billingAddress: {
          fullName: 'FIRST SERVICE',
          fullAddress: '3515 BROOKSTONE DR,HAMILTON,CINCINNATI, OH 45209'
        }
      }
    },
    lineNumber: '1',
    lineTypeName: 'Subscription',
    itemName: '9204711',
    itemNumber: '9204711',
    unitOfMeasure: 'EA',
    quantity: '1',
    billingFrequency: 'MON',
    unitPrice: '15',
    serviceType: 'SS',
    currentBillingStartDate: '2018-09-26',
    currentBillingEndDate: '2018-10-25',
    nextBillingDate: '2018-10-26',
    itemDescription: 'Unlimited On Demand Technical Support & Tune Ups',
    vendorNumber: '01132448',
    fullName: 'FIRST SERVICE',
    reactKeyId: 25,
    sortDate: '09/26/2018'
  },
  {
    orderNumber: '404393339-001',
    contractId: '39396',
    startDate: '2018-09-26',
    endDate: '2020-09-25',
    closeDate: '',
    status: 'Active',
    loyaltyMember: '1931742397',
    versionNumber: '2',
    paymentDetails: {
      paymentType: 'PayPal',
      paymentCard: {
        expirationDate: '',
        cardType: '',
        billingAddress: {
          fullName: 'FIRST SERVICE',
          fullAddress: '3515 BROOKSTONE DR,HAMILTON,CINCINNATI, OH 45209'
        }
      }
    },
    lineNumber: '2',
    lineTypeName: 'Subscription',
    itemName: '9760701',
    itemNumber: '9760701',
    unitOfMeasure: 'EA',
    quantity: '1',
    billingFrequency: 'MON',
    unitPrice: '23',
    serviceType: 'SS',
    currentBillingStartDate: '2018-09-26',
    currentBillingEndDate: '2018-10-25',
    nextBillingDate: '2018-10-26',
    itemDescription: 'Proactive PC Monitoring & Security Support ',
    vendorNumber: '01132448',
    fullName: 'FIRST SERVICE',
    reactKeyId: 25,
    sortDate: '09/26/2018'
  },
  {
    orderNumber: '404393189-001',
    contractId: '39395',
    startDate: '2018-09-26',
    endDate: '2019-09-25',
    closeDate: '',
    status: 'Active',
    loyaltyMember: '1931742397',
    versionNumber: '2',
    paymentDetails: {
      paymentType: 'PayPal',
      paymentCard: {
        expirationDate: '',
        cardType: '',
        billingAddress: {
          fullName: 'FIRST SERVICE',
          fullAddress: '3515 BROOKSTONE DR,HAMILTON,CINCINNATI, OH 45209'
        }
      }
    },
    lineNumber: '1',
    lineTypeName: 'Subscription',
    itemName: '4275744',
    itemNumber: '4275744',
    unitOfMeasure: 'EA',
    quantity: '1',
    billingFrequency: 'MON',
    unitPrice: '271',
    serviceType: 'SS',
    currentBillingStartDate: '2018-09-26',
    currentBillingEndDate: '2018-10-25',
    nextBillingDate: '2018-10-26',
    itemDescription: 'SHRDZ1 RECUR 2CONTAIN, WKLY',
    vendorNumber: '01306234',
    fullName: 'FIRST SERVICE',
    reactKeyId: 26,
    sortDate: '09/26/2018'
  },
  {
    orderNumber: '404393102-001',
    contractId: '39394',
    startDate: '2018-09-26',
    endDate: '2019-09-25',
    closeDate: '',
    status: 'Active',
    loyaltyMember: '1931742397',
    versionNumber: '2',
    paymentDetails: {
      paymentType: 'PayPal',
      paymentCard: {
        expirationDate: '',
        cardType: '',
        billingAddress: {
          fullName: 'FIRST SERVICE',
          fullAddress: '3515 BROOKSTONE DR,HAMILTON,CINCINNATI, OH 45209'
        }
      }
    },
    lineNumber: '1',
    lineTypeName: 'Subscription',
    itemName: '8044512',
    itemNumber: '8044512',
    unitOfMeasure: 'EA',
    quantity: '1',
    billingFrequency: 'MON',
    unitPrice: '256',
    serviceType: 'SS',
    currentBillingStartDate: '2018-09-26',
    currentBillingEndDate: '2018-10-25',
    nextBillingDate: '2018-10-26',
    itemDescription: 'SHRDZ1 RECUR, 6CONTAIN, BIWK',
    vendorNumber: '01306234',
    fullName: 'FIRST SERVICE',
    reactKeyId: 27,
    sortDate: '09/26/2018'
  },
  {
    orderNumber: '404392992-001',
    contractId: '39393',
    startDate: '2018-09-26',
    endDate: '2019-09-25',
    closeDate: '',
    status: 'Active',
    loyaltyMember: '1931742397',
    versionNumber: '2',
    paymentDetails: {
      paymentType: 'PayPal',
      paymentCard: {
        expirationDate: '',
        cardType: '',
        billingAddress: {
          fullName: 'FIRST SERVICE',
          fullAddress: '3515 BROOKSTONE DR,HAMILTON,CINCINNATI, OH 45209'
        }
      }
    },
    lineNumber: '1',
    lineTypeName: 'Subscription',
    itemName: '8801975',
    itemNumber: '8801975',
    unitOfMeasure: 'EA',
    quantity: '1',
    billingFrequency: 'MON',
    unitPrice: '128',
    serviceType: 'SS',
    currentBillingStartDate: '2018-09-26',
    currentBillingEndDate: '2018-10-25',
    nextBillingDate: '2018-10-26',
    itemDescription: 'SHRDZ1 RECUR, 6CONTAIN, MTHLY',
    vendorNumber: '01306234',
    fullName: 'FIRST SERVICE',
    reactKeyId: 28,
    sortDate: '09/26/2018'
  },
  {
    orderNumber: '404392886-001',
    contractId: '39392',
    startDate: '2018-09-26',
    endDate: '2019-09-25',
    closeDate: '',
    status: 'Active',
    loyaltyMember: '1931742397',
    versionNumber: '3',
    paymentDetails: {
      paymentType: 'PayPal',
      paymentCard: {
        expirationDate: '',
        cardType: '',
        billingAddress: {
          fullName: 'FIRST SERVICE',
          fullAddress: '3515 BROOKSTONE DR,HAMILTON,CINCINNATI, OH 45209'
        }
      }
    },
    lineNumber: '1',
    lineTypeName: 'Subscription',
    itemName: '9893301',
    itemNumber: '9893301',
    unitOfMeasure: 'EA',
    quantity: '1',
    billingFrequency: 'YR',
    unitPrice: '19.99',
    serviceType: 'SS',
    currentBillingStartDate: '2018-09-26',
    currentBillingEndDate: '2019-09-25',
    nextBillingDate: '2019-09-26',
    itemDescription: 'FAX TO EMAIL 500',
    vendorNumber: '01242135',
    fullName: 'FIRST SERVICE',
    reactKeyId: 29,
    sortDate: '09/26/2018'
  },
  {
    orderNumber: '404392805-001',
    contractId: '39391',
    startDate: '2018-09-26',
    endDate: '2018-12-25',
    closeDate: '',
    status: 'Active',
    loyaltyMember: '1931742397',
    versionNumber: '2',
    paymentDetails: {
      paymentType: 'PayPal',
      paymentCard: {
        expirationDate: '',
        cardType: '',
        billingAddress: {
          fullName: 'FIRST SERVICE',
          fullAddress: '3515 BROOKSTONE DR,HAMILTON,CINCINNATI, OH 45209'
        }
      }
    },
    lineNumber: '1',
    lineTypeName: 'Subscription',
    itemName: '543518',
    itemNumber: '543518',
    unitOfMeasure: 'EA',
    quantity: '1',
    billingFrequency: 'MON',
    unitPrice: '99',
    serviceType: 'SS',
    currentBillingStartDate: '2018-09-26',
    currentBillingEndDate: '2018-10-25',
    nextBillingDate: '2018-10-26',
    itemDescription: 'SOCIAL MEDIA BASIC 3 MOS',
    vendorNumber: '01242135',
    fullName: 'FIRST SERVICE',
    reactKeyId: 30,
    sortDate: '09/26/2018'
  },
  {
    orderNumber: '404392710-001',
    contractId: '39390',
    startDate: '2018-09-26',
    endDate: '2019-09-25',
    closeDate: '',
    status: 'Active',
    loyaltyMember: '1931742397',
    versionNumber: '1',
    paymentDetails: {
      paymentType: 'CreditCard',
      paymentCard: {
        expirationDate: '2022-05-01',
        cardType: 'VISA',
        billingAddress: {
          fullName: 'FIRST SERVICE',
          fullAddress: '3515 BROOKSTONE DR,HAMILTON,CINCINNATI, OH 45209'
        }
      }
    },
    lineNumber: '1',
    lineTypeName: 'Subscription',
    itemName: '9789048',
    itemNumber: '9789048',
    unitOfMeasure: 'EA',
    quantity: '1',
    billingFrequency: 'YR',
    unitPrice: '17.99',
    serviceType: 'SS',
    currentBillingStartDate: '2018-09-26',
    currentBillingEndDate: '2019-09-25',
    nextBillingDate: '2019-09-26',
    itemDescription: '.INFO DOMAIN',
    vendorNumber: '01242135',
    fullName: 'FIRST SERVICE',
    reactKeyId: 31,
    sortDate: '09/26/2018'
  },
  {
    orderNumber: '404392688-001',
    contractId: '39389',
    startDate: '2018-09-26',
    endDate: '2019-09-25',
    closeDate: '',
    status: 'Active',
    loyaltyMember: '1931742397',
    versionNumber: '1',
    paymentDetails: {
      paymentType: 'CreditCard',
      paymentCard: {
        expirationDate: '2022-05-01',
        cardType: 'VISA',
        billingAddress: {
          fullName: 'FIRST SERVICE',
          fullAddress: '3515 BROOKSTONE DR,HAMILTON,CINCINNATI, OH 45209'
        }
      }
    },
    lineNumber: '1',
    lineTypeName: 'Subscription',
    itemName: '9990378',
    itemNumber: '9990378',
    unitOfMeasure: 'EA',
    quantity: '1',
    billingFrequency: 'YR',
    unitPrice: '149.99',
    serviceType: 'SS',
    currentBillingStartDate: '2018-09-26',
    currentBillingEndDate: '2019-09-25',
    nextBillingDate: '2019-09-26',
    itemDescription: 'Platinum Setup & Protection',
    vendorNumber: '01285689',
    fullName: 'FIRST SERVICE',
    reactKeyId: 32,
    sortDate: '09/26/2018'
  },
  {
    orderNumber: '404392682-001',
    contractId: '39388',
    startDate: '2018-09-26',
    endDate: '2020-09-25',
    closeDate: '',
    status: 'Active',
    loyaltyMember: '1931742397',
    versionNumber: '2',
    paymentDetails: {
      paymentType: 'PayPal',
      paymentCard: {
        expirationDate: '',
        cardType: '',
        billingAddress: {
          fullName: 'FIRST SERVICE',
          fullAddress: '3515 BROOKSTONE DR,HAMILTON,CINCINNATI, OH 45209'
        }
      }
    },
    lineNumber: '1',
    lineTypeName: 'Subscription',
    itemName: '9760701',
    itemNumber: '9760701',
    unitOfMeasure: 'EA',
    quantity: '1',
    billingFrequency: 'MON',
    unitPrice: '23',
    serviceType: 'SS',
    currentBillingStartDate: '2018-09-26',
    currentBillingEndDate: '2018-10-25',
    nextBillingDate: '2018-10-26',
    itemDescription: 'Proactive PC Monitoring & Security Support ',
    vendorNumber: '01132448',
    fullName: 'FIRST SERVICE',
    reactKeyId: 33,
    sortDate: '09/26/2018'
  },
  {
    orderNumber: '404392661-001',
    contractId: '39386',
    startDate: '2018-09-26',
    endDate: '2019-09-25',
    closeDate: '',
    status: 'Active',
    loyaltyMember: '1931742397',
    versionNumber: '1',
    paymentDetails: {
      paymentType: 'CreditCard',
      paymentCard: {
        expirationDate: '2022-05-01',
        cardType: 'VISA',
        billingAddress: {
          fullName: 'FIRST SERVICE',
          fullAddress: '3515 BROOKSTONE DR,HAMILTON,CINCINNATI, OH 45209'
        }
      }
    },
    lineNumber: '1',
    lineTypeName: 'Subscription',
    itemName: '9204711',
    itemNumber: '9204711',
    unitOfMeasure: 'EA',
    quantity: '1',
    billingFrequency: 'MON',
    unitPrice: '15',
    serviceType: 'SS',
    currentBillingStartDate: '2018-09-26',
    currentBillingEndDate: '2018-10-25',
    nextBillingDate: '2018-10-26',
    itemDescription: 'Unlimited On Demand Technical Support & Tune Ups',
    vendorNumber: '01132448',
    fullName: 'FIRST SERVICE',
    reactKeyId: 34,
    sortDate: '09/26/2018'
  },
  {
    orderNumber: '404392661-001',
    contractId: '39386',
    startDate: '2018-09-26',
    endDate: '2019-09-25',
    closeDate: '',
    status: 'Active',
    loyaltyMember: '1931742397',
    versionNumber: '1',
    paymentDetails: {
      paymentType: 'CreditCard',
      paymentCard: {
        expirationDate: '2022-05-01',
        cardType: 'VISA',
        billingAddress: {
          fullName: 'FIRST SERVICE',
          fullAddress: '3515 BROOKSTONE DR,HAMILTON,CINCINNATI, OH 45209'
        }
      }
    },
    lineNumber: '2',
    lineTypeName: 'Subscription',
    itemName: '9204711',
    itemNumber: '9204711',
    unitOfMeasure: 'EA',
    quantity: '1',
    billingFrequency: 'MON',
    unitPrice: '15',
    serviceType: 'SS',
    currentBillingStartDate: '2018-09-26',
    currentBillingEndDate: '2018-10-25',
    nextBillingDate: '2018-10-26',
    itemDescription: 'Unlimited On Demand Technical Support & Tune Ups',
    vendorNumber: '01132448',
    fullName: 'FIRST SERVICE',
    reactKeyId: 34,
    sortDate: '09/26/2018'
  },
  {
    orderNumber: '404324854-001',
    contractId: '34309',
    startDate: '2018-09-21',
    endDate: '2019-09-20',
    closeDate: '',
    status: 'Active',
    loyaltyMember: '1931742397',
    versionNumber: '2',
    paymentDetails: {
      paymentType: 'CreditCard',
      paymentCard: {
        expirationDate: '2020-05-01',
        cardType: 'MASTERCARD',
        billingAddress: {
          fullName: 'FIRST SERVICE',
          fullAddress: '3515 BROOKSTONE DR,HAMILTON,CINCINNATI, OH 45209'
        }
      }
    },
    lineNumber: '1',
    lineTypeName: 'Subscription',
    itemName: '9204711',
    itemNumber: '9204711',
    unitOfMeasure: 'EA',
    quantity: '1',
    billingFrequency: 'MON',
    unitPrice: '15',
    serviceType: 'SS',
    currentBillingStartDate: '2018-09-21',
    currentBillingEndDate: '2018-10-20',
    nextBillingDate: '2018-10-21',
    itemDescription: 'Unlimited On Demand Technical Support & Tune Ups',
    vendorNumber: '01132448',
    fullName: 'FIRST SERVICE',
    reactKeyId: 35,
    sortDate: '09/21/2018'
  },
  {
    orderNumber: '404324853-001',
    contractId: '34308',
    startDate: '2018-09-21',
    endDate: '2019-09-20',
    closeDate: '',
    status: 'Active',
    loyaltyMember: '1931742397',
    versionNumber: '2',
    paymentDetails: {
      paymentType: 'CreditCard',
      paymentCard: {
        expirationDate: '2021-05-01',
        cardType: 'DISCOVER',
        billingAddress: {
          fullName: 'FIRST SERVICE',
          fullAddress: '3515 BROOKSTONE DR,HAMILTON,CINCINNATI, OH 45209'
        }
      }
    },
    lineNumber: '1',
    lineTypeName: 'Subscription',
    itemName: '9204711',
    itemNumber: '9204711',
    unitOfMeasure: 'EA',
    quantity: '1',
    billingFrequency: 'MON',
    unitPrice: '15',
    serviceType: 'SS',
    currentBillingStartDate: '2018-09-21',
    currentBillingEndDate: '2018-10-20',
    nextBillingDate: '2018-10-21',
    itemDescription: 'Unlimited On Demand Technical Support & Tune Ups',
    vendorNumber: '01132448',
    fullName: 'FIRST SERVICE',
    reactKeyId: 36,
    sortDate: '09/21/2018'
  },
  {
    orderNumber: '404324853-001',
    contractId: '34308',
    startDate: '2018-09-21',
    endDate: '2019-09-20',
    closeDate: '',
    status: 'Active',
    loyaltyMember: '1931742397',
    versionNumber: '2',
    paymentDetails: {
      paymentType: 'CreditCard',
      paymentCard: {
        expirationDate: '2021-05-01',
        cardType: 'DISCOVER',
        billingAddress: {
          fullName: 'FIRST SERVICE',
          fullAddress: '3515 BROOKSTONE DR,HAMILTON,CINCINNATI, OH 45209'
        }
      }
    },
    lineNumber: '2',
    lineTypeName: 'Subscription',
    itemName: '9204711',
    itemNumber: '9204711',
    unitOfMeasure: 'EA',
    quantity: '1',
    billingFrequency: 'MON',
    unitPrice: '15',
    serviceType: 'SS',
    currentBillingStartDate: '2018-09-21',
    currentBillingEndDate: '2018-10-20',
    nextBillingDate: '2018-10-21',
    itemDescription: 'Unlimited On Demand Technical Support & Tune Ups',
    vendorNumber: '01132448',
    fullName: 'FIRST SERVICE',
    reactKeyId: 36,
    sortDate: '09/21/2018'
  },
  {
    orderNumber: '404324853-001',
    contractId: '34308',
    startDate: '2018-09-21',
    endDate: '2019-09-20',
    closeDate: '',
    status: 'Active',
    loyaltyMember: '1931742397',
    versionNumber: '2',
    paymentDetails: {
      paymentType: 'CreditCard',
      paymentCard: {
        expirationDate: '2021-05-01',
        cardType: 'DISCOVER',
        billingAddress: {
          fullName: 'FIRST SERVICE',
          fullAddress: '3515 BROOKSTONE DR,HAMILTON,CINCINNATI, OH 45209'
        }
      }
    },
    lineNumber: '3',
    lineTypeName: 'Subscription',
    itemName: '9204711',
    itemNumber: '9204711',
    unitOfMeasure: 'EA',
    quantity: '1',
    billingFrequency: 'MON',
    unitPrice: '15',
    serviceType: 'SS',
    currentBillingStartDate: '2018-09-21',
    currentBillingEndDate: '2018-10-20',
    nextBillingDate: '2018-10-21',
    itemDescription: 'Unlimited On Demand Technical Support & Tune Ups',
    vendorNumber: '01132448',
    fullName: 'FIRST SERVICE',
    reactKeyId: 36,
    sortDate: '09/21/2018'
  },
  {
    orderNumber: '404324851-001',
    contractId: '34307',
    startDate: '2018-09-21',
    endDate: '2019-09-20',
    closeDate: '',
    status: 'Active',
    loyaltyMember: '1931742397',
    versionNumber: '2',
    paymentDetails: {
      paymentType: 'PayPal',
      paymentCard: {
        expirationDate: '',
        cardType: '',
        billingAddress: {
          fullName: 'FIRST SERVICE',
          fullAddress: '3515 BROOKSTONE DR,HAMILTON,CINCINNATI, OH 45209'
        }
      }
    },
    lineNumber: '1',
    lineTypeName: 'Subscription',
    itemName: '9204711',
    itemNumber: '9204711',
    unitOfMeasure: 'EA',
    quantity: '1',
    billingFrequency: 'MON',
    unitPrice: '15',
    serviceType: 'SS',
    currentBillingStartDate: '2018-09-21',
    currentBillingEndDate: '2018-10-20',
    nextBillingDate: '2018-10-21',
    itemDescription: 'Unlimited On Demand Technical Support & Tune Ups',
    vendorNumber: '01132448',
    fullName: 'FIRST SERVICE',
    reactKeyId: 37,
    sortDate: '09/21/2018'
  },
  {
    orderNumber: '404324849-001',
    contractId: '34306',
    startDate: '2018-09-21',
    endDate: '2019-09-20',
    closeDate: '',
    status: 'Active',
    loyaltyMember: '1931742397',
    versionNumber: '2',
    paymentDetails: {
      paymentType: 'CreditCard',
      paymentCard: {
        expirationDate: '2022-05-01',
        cardType: 'VISA',
        billingAddress: {
          fullName: 'FIRST SERVICE',
          fullAddress: '3515 BROOKSTONE DR,HAMILTON,CINCINNATI, OH 45209'
        }
      }
    },
    lineNumber: '1',
    lineTypeName: 'Subscription',
    itemName: '9204711',
    itemNumber: '9204711',
    unitOfMeasure: 'EA',
    quantity: '1',
    billingFrequency: 'MON',
    unitPrice: '15',
    serviceType: 'SS',
    currentBillingStartDate: '2018-09-21',
    currentBillingEndDate: '2018-10-20',
    nextBillingDate: '2018-10-21',
    itemDescription: 'Unlimited On Demand Technical Support & Tune Ups',
    vendorNumber: '01132448',
    fullName: 'FIRST SERVICE',
    reactKeyId: 38,
    sortDate: '09/21/2018'
  },
  {
    orderNumber: '404324854-001',
    contractId: '34309',
    startDate: '2018-09-21',
    endDate: '2019-09-20',
    closeDate: '',
    status: 'Active',
    loyaltyMember: '1931742397',
    versionNumber: '2',
    paymentDetails: {
      paymentType: 'CreditCard',
      paymentCard: {
        expirationDate: '2020-05-01',
        cardType: 'MASTERCARD',
        billingAddress: {
          fullName: 'FIRST SERVICE',
          fullAddress: '3515 BROOKSTONE DR,HAMILTON,CINCINNATI, OH 45209'
        }
      }
    },
    lineNumber: '2',
    lineTypeName: 'Subscription',
    itemName: '9204711',
    itemNumber: '9204711',
    unitOfMeasure: 'EA',
    quantity: '1',
    billingFrequency: 'MON',
    unitPrice: '15',
    serviceType: 'SS',
    currentBillingStartDate: '2018-09-21',
    currentBillingEndDate: '2018-10-20',
    nextBillingDate: '2018-10-21',
    itemDescription: 'Unlimited On Demand Technical Support & Tune Ups',
    vendorNumber: '01132448',
    fullName: 'FIRST SERVICE',
    reactKeyId: 35,
    sortDate: '09/21/2018'
  },
  {
    orderNumber: '404250789-001',
    contractId: '29323',
    startDate: '2018-09-17',
    endDate: '2019-09-16',
    closeDate: '2018-09-20',
    status: 'Closed',
    loyaltyMember: '1931742397',
    versionNumber: '2',
    paymentDetails: {
      paymentType: 'CreditCard',
      paymentCard: {
        expirationDate: '2022-06-01',
        cardType: 'MASTERCARD',
        billingAddress: {
          fullName: 'FIRST SERVICE',
          fullAddress: '3515 BROOKSTONE DR,HAMILTON,CINCINNATI, OH 45209'
        }
      }
    },
    lineNumber: '1',
    lineTypeName: 'Subscription',
    itemName: '267807',
    itemNumber: '267807',
    unitOfMeasure: 'EA',
    quantity: '1',
    billingFrequency: 'MON',
    unitPrice: '89',
    serviceType: 'SS',
    currentBillingStartDate: '2018-09-17',
    currentBillingEndDate: '2018-10-16',
    nextBillingDate: '2018-10-17',
    itemDescription: 'BASIC WEB SERVICES',
    vendorNumber: '01242135',
    fullName: 'FIRST SERVICE',
    reactKeyId: 39,
    sortDate: '09/17/2018'
  },
  {
    orderNumber: '404095186-001',
    contractId: '24534',
    startDate: '2018-09-03',
    endDate: '2019-09-02',
    closeDate: '',
    status: 'Active',
    loyaltyMember: '1931742397',
    versionNumber: '3',
    paymentDetails: {
      paymentType: 'CreditCard',
      paymentCard: {
        expirationDate: '2022-02-01',
        cardType: 'DISCOVER',
        billingAddress: {
          fullName: 'FIRST SERVICE',
          fullAddress: '3515 BROOKSTONE DR,HAMILTON,CINCINNATI, OH 45209'
        }
      }
    },
    lineNumber: '1',
    lineTypeName: 'Subscription',
    itemName: '5140191',
    itemNumber: '5140191',
    unitOfMeasure: 'EA',
    quantity: '1',
    billingFrequency: 'MON',
    unitPrice: '68',
    serviceType: 'SS',
    currentBillingStartDate: '2018-10-03',
    currentBillingEndDate: '2018-11-02',
    nextBillingDate: '2018-11-03',
    itemDescription: 'SHRDZ1 RECUR, 2CONTAIN, MTHLY',
    vendorNumber: '01306234',
    fullName: 'FIRST SERVICE',
    reactKeyId: 40,
    sortDate: '09/03/2018'
  },
  {
    orderNumber: '404076355-001',
    contractId: '24475',
    startDate: '2018-08-31',
    endDate: '2019-08-30',
    closeDate: '',
    status: 'Active',
    loyaltyMember: '1931742397',
    versionNumber: '4',
    paymentDetails: {
      paymentType: 'CreditCard',
      paymentCard: {
        expirationDate: '2022-02-01',
        cardType: 'DISCOVER',
        billingAddress: {
          fullName: 'FIRST SERVICE',
          fullAddress: '3515 BROOKSTONE DR,HAMILTON,CINCINNATI, OH 45209'
        }
      }
    },
    lineNumber: '1',
    lineTypeName: 'Subscription',
    itemName: '4275744',
    itemNumber: '4275744',
    unitOfMeasure: 'EA',
    quantity: '1',
    billingFrequency: 'MON',
    unitPrice: '271',
    serviceType: 'SS',
    currentBillingStartDate: '2018-09-30',
    currentBillingEndDate: '2018-10-30',
    nextBillingDate: '2018-10-31',
    itemDescription: 'SHRDZ1 RECUR 2CONTAIN, WKLY',
    vendorNumber: '01306234',
    fullName: 'FIRST SERVICE',
    reactKeyId: 41,
    sortDate: '08/31/2018'
  },
  {
    orderNumber: '404076355-001',
    contractId: '24475',
    startDate: '2018-08-31',
    endDate: '2019-08-30',
    closeDate: '',
    status: 'Active',
    loyaltyMember: '1931742397',
    versionNumber: '4',
    paymentDetails: {
      paymentType: 'CreditCard',
      paymentCard: {
        expirationDate: '2022-02-01',
        cardType: 'DISCOVER',
        billingAddress: {
          fullName: 'FIRST SERVICE',
          fullAddress: '3515 BROOKSTONE DR,HAMILTON,CINCINNATI, OH 45209'
        }
      }
    },
    lineNumber: '2',
    lineTypeName: 'Subscription',
    itemName: '5519473',
    itemNumber: '5519473',
    unitOfMeasure: 'EA',
    quantity: '1',
    billingFrequency: 'MON',
    unitPrice: '85',
    serviceType: 'SS',
    currentBillingStartDate: '2018-09-30',
    currentBillingEndDate: '2018-10-30',
    nextBillingDate: '2018-10-31',
    itemDescription: 'SHRDZ1 RECUR, 3CONTAIN, MTHLY',
    vendorNumber: '01306234',
    fullName: 'FIRST SERVICE',
    reactKeyId: 41,
    sortDate: '08/31/2018'
  },
  {
    orderNumber: '404076348-001',
    contractId: '24474',
    startDate: '2018-08-31',
    endDate: '2019-08-30',
    closeDate: '',
    status: 'Active',
    loyaltyMember: '1931742397',
    versionNumber: '1',
    paymentDetails: {
      paymentType: 'PayPal',
      paymentCard: {
        expirationDate: '',
        cardType: '',
        billingAddress: {
          fullName: 'FIRST SERVICE',
          fullAddress: '3515 BROOKSTONE DR,HAMILTON,CINCINNATI, OH 45209'
        }
      }
    },
    lineNumber: '1',
    lineTypeName: 'Subscription',
    itemName: '9204711',
    itemNumber: '9204711',
    unitOfMeasure: 'EA',
    quantity: '1',
    billingFrequency: 'MON',
    unitPrice: '15',
    serviceType: 'SS',
    currentBillingStartDate: '2018-09-30',
    currentBillingEndDate: '2018-10-30',
    nextBillingDate: '2018-10-31',
    itemDescription: 'Unlimited On Demand Technical Support & Tune Ups',
    vendorNumber: '01132448',
    fullName: 'FIRST SERVICE',
    reactKeyId: 42,
    sortDate: '08/31/2018'
  },
  {
    orderNumber: '404075996-001',
    contractId: '24464',
    startDate: '2018-08-31',
    endDate: '2019-08-30',
    closeDate: '2018-09-26',
    status: 'Closed',
    loyaltyMember: '1931742397',
    versionNumber: '1',
    paymentDetails: {
      paymentType: 'PayPal',
      paymentCard: {
        expirationDate: '',
        cardType: '',
        billingAddress: {
          fullName: 'FIRST SERVICE',
          fullAddress: '3515 BROOKSTONE DR,HAMILTON,CINCINNATI, OH 45209'
        }
      }
    },
    lineNumber: '1',
    lineTypeName: 'Subscription',
    itemName: '9204711',
    itemNumber: '9204711',
    unitOfMeasure: 'EA',
    quantity: '1',
    billingFrequency: 'MON',
    unitPrice: '15',
    serviceType: 'SS',
    itemDescription: 'Unlimited On Demand Technical Support & Tune Ups',
    vendorNumber: '01132448',
    fullName: 'FIRST SERVICE',
    reactKeyId: 43,
    sortDate: '08/31/2018'
  },
  {
    orderNumber: '404048342-001',
    contractId: '24378',
    startDate: '2018-08-30',
    endDate: '2019-08-29',
    closeDate: '',
    status: 'Active',
    loyaltyMember: '1931742397',
    versionNumber: '1',
    paymentDetails: {
      paymentType: 'CreditCard',
      paymentCard: {
        expirationDate: '2019-03-01',
        cardType: 'VISA',
        billingAddress: {
          fullName: 'FIRST SERVICE',
          fullAddress: '3515 BROOKSTONE DR,HAMILTON,CINCINNATI, OH 45209'
        }
      }
    },
    lineNumber: '1',
    lineTypeName: 'Subscription',
    itemName: '9204711',
    itemNumber: '9204711',
    unitOfMeasure: 'EA',
    quantity: '1',
    billingFrequency: 'MON',
    unitPrice: '15',
    serviceType: 'SS',
    currentBillingStartDate: '2018-09-30',
    currentBillingEndDate: '2018-10-30',
    nextBillingDate: '2018-10-31',
    itemDescription: 'Unlimited On Demand Technical Support & Tune Ups',
    vendorNumber: '01132448',
    fullName: 'FIRST SERVICE',
    reactKeyId: 44,
    sortDate: '08/30/2018'
  },
  {
    orderNumber: '404048342-001',
    contractId: '24378',
    startDate: '2018-08-30',
    endDate: '2019-08-29',
    closeDate: '',
    status: 'Active',
    loyaltyMember: '1931742397',
    versionNumber: '1',
    paymentDetails: {
      paymentType: 'CreditCard',
      paymentCard: {
        expirationDate: '2019-03-01',
        cardType: 'VISA',
        billingAddress: {
          fullName: 'FIRST SERVICE',
          fullAddress: '3515 BROOKSTONE DR,HAMILTON,CINCINNATI, OH 45209'
        }
      }
    },
    lineNumber: '2',
    lineTypeName: 'Subscription',
    itemName: '9204711',
    itemNumber: '9204711',
    unitOfMeasure: 'EA',
    quantity: '1',
    billingFrequency: 'MON',
    unitPrice: '15',
    serviceType: 'SS',
    currentBillingStartDate: '2018-09-30',
    currentBillingEndDate: '2018-10-30',
    nextBillingDate: '2018-10-31',
    itemDescription: 'Unlimited On Demand Technical Support & Tune Ups',
    vendorNumber: '01132448',
    fullName: 'FIRST SERVICE',
    reactKeyId: 44,
    sortDate: '08/30/2018'
  },
  {
    orderNumber: '404048342-001',
    contractId: '24378',
    startDate: '2018-08-30',
    endDate: '2019-08-29',
    closeDate: '',
    status: 'Active',
    loyaltyMember: '1931742397',
    versionNumber: '1',
    paymentDetails: {
      paymentType: 'CreditCard',
      paymentCard: {
        expirationDate: '2019-03-01',
        cardType: 'VISA',
        billingAddress: {
          fullName: 'FIRST SERVICE',
          fullAddress: '3515 BROOKSTONE DR,HAMILTON,CINCINNATI, OH 45209'
        }
      }
    },
    lineNumber: '3',
    lineTypeName: 'Subscription',
    itemName: '9204711',
    itemNumber: '9204711',
    unitOfMeasure: 'EA',
    quantity: '1',
    billingFrequency: 'MON',
    unitPrice: '15',
    serviceType: 'SS',
    currentBillingStartDate: '2018-09-30',
    currentBillingEndDate: '2018-10-30',
    nextBillingDate: '2018-10-31',
    itemDescription: 'Unlimited On Demand Technical Support & Tune Ups',
    vendorNumber: '01132448',
    fullName: 'FIRST SERVICE',
    reactKeyId: 44,
    sortDate: '08/30/2018'
  },
  {
    orderNumber: '404048309-001',
    contractId: '24377',
    startDate: '2018-08-30',
    endDate: '2019-08-29',
    closeDate: '2018-09-26',
    status: 'Closed',
    loyaltyMember: '1931742397',
    versionNumber: '2',
    paymentDetails: {
      paymentType: 'CreditCard',
      paymentCard: {
        expirationDate: '2024-05-01',
        cardType: 'AMEX',
        billingAddress: {
          fullName: 'FIRST SERVICE',
          fullAddress: '3515 BROOKSTONE DR,HAMILTON,CINCINNATI, OH 45209'
        }
      }
    },
    lineNumber: '1',
    lineTypeName: 'Subscription',
    itemName: '9204711',
    itemNumber: '9204711',
    unitOfMeasure: 'EA',
    quantity: '1',
    billingFrequency: 'MON',
    unitPrice: '15',
    serviceType: 'SS',
    itemDescription: 'Unlimited On Demand Technical Support & Tune Ups',
    vendorNumber: '01132448',
    fullName: 'FIRST SERVICE',
    reactKeyId: 45,
    sortDate: '08/30/2018'
  }
];

export default fakeData;
