// CityShield AI — Citizen Cybercrime Categories, Verified Help Directory, and Synthetic Sample Incidents
// Designed for Cyber Samvad Hackathon 2026 (Adani University & Demmisto Technologies)

export const CYBERCRIME_CATEGORIES = [
  {
    id: 'financial_scam',
    title: 'Money Lost or Payment Scam',
    shortDesc: 'Unauthorized UPI transaction, fake banking call, lottery, or online investment fraud.',
    icon: 'CreditCard',
    severity: 'CRITICAL',
    urgencyText: 'Immediate Action Needed — Golden Hour window (first 2 hours) is critical to freeze transactions.',
    immediateSteps: [
      {
        title: 'Call the National Cyber Financial Helpline: 1930',
        detail: 'Dial 1930 immediately to report the transaction. They coordinate with the Citizen Financial Cyber Fraud Reporting System to freeze recipient bank accounts.',
        priority: 'CRITICAL',
        link: 'tel:1930'
      },
      {
        title: 'Block Card, UPI ID & Bank NetBanking',
        detail: 'Call your bank official emergency number (found on the back of your debit/credit card) to temporarily lock UPI and account transfers.',
        priority: 'HIGH'
      },
      {
        title: 'Save Transaction IDs, Screenshots & SMS',
        detail: 'Do not delete SMS alerts, UPI transaction reference (UTR) numbers, or chat messages with the fraudster.',
        priority: 'MEDIUM'
      }
    ]
  },
  {
    id: 'account_hack',
    title: 'Social Media or Email Account Hacked',
    shortDesc: 'Password changed, locked out of Instagram, WhatsApp, Gmail, or contacts receiving scam messages.',
    icon: 'Key',
    severity: 'HIGH',
    urgencyText: 'High Urgency — Secure linked accounts and alert your contacts to prevent impersonation.',
    immediateSteps: [
      {
        title: 'Use Platform Account Recovery Pages',
        detail: 'Go directly to the official recovery page (e.g. instagram.com/hacked or accounts.google.com/signin/recovery). Never use third-party "recovery agents".',
        priority: 'HIGH'
      },
      {
        title: 'Notify Your Friends & Contacts',
        detail: 'Inform close friends and family through an alternative phone call that your account is compromised and to ignore requests for money.',
        priority: 'HIGH'
      },
      {
        title: 'Change Passwords of Linked Email & Accounts',
        detail: 'If you reused the password across other services, change them immediately and enable Two-Factor Authentication (2FA) with an authenticator app.',
        priority: 'MEDIUM'
      }
    ]
  },
  {
    id: 'harassment_extortion',
    title: 'Threats, Harassment, or Blackmail',
    shortDesc: 'Sextortion, morphed images, stalking, abusive messages, or loan app blackmail.',
    icon: 'AlertOctagon',
    severity: 'CRITICAL',
    urgencyText: 'Life-Safety & Privacy Priority — Do not pay extortion money; preserve evidence safely.',
    immediateSteps: [
      {
        title: 'Do NOT Send Any Money or More Media',
        detail: 'Paying scammers never stops blackmail; it invites repeated, escalating demands. Stay calm and remember you are the victim, not at fault.',
        priority: 'CRITICAL'
      },
      {
        title: 'Take Full Screenshots Before Blocking',
        detail: 'Capture user handles, profile URLs, phone numbers, and timestamps. Do not delete the chat thread until screenshots are saved.',
        priority: 'HIGH'
      },
      {
        title: 'Report Non-Consensual Media to StopNCII.org',
        detail: 'If intimate photos are threatened, create digital hashes via StopNCII.org (industry-standard non-profit) to prevent them from being shared on major social networks.',
        priority: 'HIGH',
        externalLink: 'https://stopncii.org'
      }
    ]
  },
  {
    id: 'suspicious_message',
    title: 'Suspicious Message, Link, or Call',
    shortDesc: 'Electricity bill disconnection threat, parcel delivery SMS, fake APK download, or lottery call.',
    icon: 'MessageSquareWarning',
    severity: 'MEDIUM',
    urgencyText: 'Precautionary — Avoid clicking links or downloading remote access apps.',
    immediateSteps: [
      {
        title: 'Do NOT Click Links or Download APKs',
        detail: 'Scammers frequently send links ending in .apk or shortened URLs claiming your electricity or gas will be disconnected tonight.',
        priority: 'HIGH'
      },
      {
        title: 'Do NOT Install Screen Sharing Apps',
        detail: 'Never install AnyDesk, TeamViewer, RustDesk, or QuickSupport if requested by an unknown caller.',
        priority: 'HIGH'
      },
      {
        title: 'Verify With Official Utility or Service Numbers',
        detail: 'Call your electricity board or courier company directly using the phone number printed on your physical bill or official website.',
        priority: 'MEDIUM'
      }
    ]
  },
  {
    id: 'other_incident',
    title: 'Something Else / I am Not Sure',
    shortDesc: 'Device behaving strangely, suspicious software, identity theft, or general cyber safety concern.',
    icon: 'HelpCircle',
    severity: 'LOW',
    urgencyText: 'Guidance & Triage — Describe the symptoms and we will guide you step-by-step.',
    immediateSteps: [
      {
        title: 'Disconnect From the Internet (Wi-Fi & Cellular Data)',
        detail: 'If your device is exhibiting unexpected cursor movements, unexpected popups, or overheating, turning off Wi-Fi stops ongoing remote access.',
        priority: 'HIGH'
      },
      {
        title: 'Document Unfamiliar Symptoms',
        detail: 'Write down what software was installed recently and what pop-ups or warnings appeared.',
        priority: 'MEDIUM'
      }
    ]
  }
];

export const SYNTHETIC_SAMPLE_INCIDENTS = [
  {
    id: 'SAMPLE-01-ELEC-SMS',
    category: 'suspicious_message',
    title: 'Electricity Bill Disconnection Threat SMS',
    platform: 'SMS / Text Message',
    date: '2026-10-17',
    summary: 'Received an urgent SMS claiming my power supply will be cut off tonight at 9:30 PM due to unpaid previous month bill, directing me to call 98765-XXXXX or click a link.',
    messageText: 'Dear Consumer, Your Electricity power will be disconnected tonight at 9:30 PM from electricity office because your previous month bill was not updated. Please immediately contact our electricity officer on 98765-XXXXX. Thank you.',
    amountLost: '0',
    accountCompromised: 'No',
    riskScore: 42,
    urgency: 'MEDIUM',
    sampleEvidenceName: 'electricity_scam_screenshot.png'
  },
  {
    id: 'SAMPLE-02-UPI-FRAUD',
    category: 'financial_scam',
    title: 'OLX Marketplace Fake QR Code UPI Scam',
    platform: 'PhonePe / GPay / OLX',
    date: '2026-10-17',
    summary: 'Buyer on OLX agreed to buy furniture and sent a "QR code to receive money". Scanning it debited Rs. 24,500 from my savings account instead of crediting it.',
    messageText: 'Sir, I am sending you a merchant QR code for advance payment. Please scan this and enter your UPI PIN to receive the Rs. 24,500 into your account.',
    amountLost: '₹24,500 ($295)',
    accountCompromised: 'UPI PIN entered once',
    riskScore: 92,
    urgency: 'CRITICAL',
    sampleEvidenceName: 'upi_debit_alert_sms.png'
  },
  {
    id: 'SAMPLE-03-INSTA-EXTORTION',
    category: 'account_hack',
    title: 'Compromised Instagram Account with Impersonation',
    platform: 'Instagram',
    date: '2026-10-16',
    summary: 'Received a fake copyright infringement link from a friend account. Entered login info, and within 10 minutes my password and 2FA phone number were altered. The hacker is messaging followers asking for emergency loans.',
    messageText: 'Your account will be deleted within 24 hours due to copyright violation. Please fill this form to appeal: http://insta-help-copyright-review.cc',
    amountLost: '0 (Friends targeted)',
    accountCompromised: 'Instagram handle & registered email',
    riskScore: 84,
    urgency: 'HIGH',
    sampleEvidenceName: 'phishing_dm_screenshot.png'
  }
];

export const VERIFIED_CYBER_DIRECTORY = [
  {
    state: 'National (All India)',
    cities: [
      {
        name: 'National Helpline & Portal',
        helpline: '1930',
        portalUrl: 'https://cybercrime.gov.in',
        portalName: 'National Cyber Crime Reporting Portal (MHA)',
        address: 'Indian Cyber Crime Coordination Centre (I4C), Ministry of Home Affairs, New Delhi',
        verificationDate: 'Verified Official Govt Portal — October 2026',
        sourceUrl: 'https://cybercrime.gov.in',
        isVerifiedLocal: true,
        notes: 'Citizen Financial Cyber Fraud Reporting System operates 24/7 on helpline 1930.'
      }
    ]
  },
  {
    state: 'Gujarat',
    cities: [
      {
        name: 'Ahmedabad (Cyber Samvad Host City)',
        helpline: '1930 / 079-25633333',
        portalUrl: 'https://cybercrime.gov.in',
        portalName: 'Ahmedabad City Cyber Crime Police Station',
        address: 'Cyber Crime Police Station, Police Commissioner Office Campus, Shahibaug, Ahmedabad, Gujarat 380004',
        verificationDate: 'Verified Official Police Source — October 2026',
        sourceUrl: 'https://ahmedabadcitypolice.org',
        isVerifiedLocal: true,
        notes: 'Covers Ahmedabad metropolitan district; specializes in digital arrest scams and financial cyber fraud.'
      },
      {
        name: 'Gandhinagar',
        helpline: '1930 / 079-23210930',
        portalUrl: 'https://cybercrime.gov.in',
        portalName: 'CID Crime Cyber Police Station Gujarat',
        address: 'CID Crime Cyber Police Station, Sector 18, Gandhinagar, Gujarat 382018',
        verificationDate: 'Verified Official Police Source — October 2026',
        sourceUrl: 'https://cidcrime.gujarat.gov.in',
        isVerifiedLocal: true,
        notes: 'State-level cyber investigation headquarters for Gujarat CID.'
      },
      {
        name: 'Surat',
        helpline: '1930 / 0261-2463939',
        portalUrl: 'https://cybercrime.gov.in',
        portalName: 'Surat City Cyber Police Station',
        address: 'Old Police Commissioner Office, Chowk Bazaar, Surat, Gujarat 395003',
        verificationDate: 'Verified Official Police Source — October 2026',
        sourceUrl: 'https://suratcitypolice.gujarat.gov.in',
        isVerifiedLocal: true,
        notes: 'Local cybercrime investigation division for diamond & textile trading corridors.'
      }
    ]
  },
  {
    state: 'Maharashtra',
    cities: [
      {
        name: 'Mumbai',
        helpline: '1930 / 022-26504008',
        portalUrl: 'https://cybercrime.gov.in',
        portalName: 'Mumbai Cyber Police Station (BKC)',
        address: 'Bandra-Kurla Complex (BKC), Bandra East, Mumbai, Maharashtra 400051',
        verificationDate: 'Verified Official Police Source — October 2026',
        sourceUrl: 'https://mumbaipolice.gov.in',
        isVerifiedLocal: true,
        notes: 'Centralized cyber investigation cell for Mumbai Metropolitan Region.'
      },
      {
        name: 'Pune',
        helpline: '1930 / 020-29710097',
        portalUrl: 'https://cybercrime.gov.in',
        portalName: 'Pune City Cyber Police Station',
        address: 'Police Commissioner Office, Camp, Pune, Maharashtra 411001',
        verificationDate: 'Verified Official Police Source — October 2026',
        sourceUrl: 'https://punepolice.gov.in',
        isVerifiedLocal: true,
        notes: 'Local cybercrime cell specializing in tech-hub IT scams.'
      }
    ]
  },
  {
    state: 'Delhi (NCT)',
    cities: [
      {
        name: 'New Delhi / Central Delhi',
        helpline: '1930 / 011-20892606',
        portalUrl: 'https://cybercrime.gov.in',
        portalName: 'Delhi Police IFSO (Special Cell)',
        address: 'Intelligence Fusion & Strategic Operations (IFSO), Sector 16-C, Dwarka, New Delhi 110078',
        verificationDate: 'Verified Official Police Source — October 2026',
        sourceUrl: 'https://delhipolice.gov.in',
        isVerifiedLocal: true,
        notes: 'Specialized unit investigating complex cybercrimes across national capital territory.'
      }
    ]
  },
  {
    state: 'Karnataka',
    cities: [
      {
        name: 'Bengaluru',
        helpline: '1930 / 080-22201021',
        portalUrl: 'https://cybercrime.gov.in',
        portalName: 'Bengaluru City Cyber Crime Police Station (CEN)',
        address: 'Infantry Road, Near Police Commissioner Office, Bengaluru, Karnataka 560001',
        verificationDate: 'Verified Official Police Source — October 2026',
        sourceUrl: 'https://bengalurucitypolice.gov.in',
        isVerifiedLocal: true,
        notes: 'Cyber, Economics, and Narcotics (CEN) police station for IT corridor.'
      }
    ]
  }
];
