// ✏️ Everything personal lives here. Edit text, paths and colours in this one file.

const birthdayConfig = {
  friendName: 'Aayushi',
  nickname: 'Our Skyla',
  senderName: 'Dark',

  // Screen one
  introText: 'A little something for you...',
  subtitle: "You've got a special birthday letter.",
  tapHint: 'Tap the envelope to open your surprise 💌',

  // Screen two
  cardHeading: 'Happy Birthday, Aayushi! 🎂',
  cardSubheading: 'Our Skyla, today is YOUR day! 💗',

  // Each string is one paragraph.
  birthdayMessage: [
    'Happy Birthday! 🎂✨',
    'May this year bring you all the success you deserve. Dua hai ki tera gaming career ekdum zabardast chale aur jo bhi professional career tu choose kare, wo bhi super fast aur smoothly start ho jaye! Keep grinding and shining.',
    'Aur haan, itne saalon se itni acchi aur pyaari dost rehne ke liye Dil se Thank You! Hamesha aisi hi rehna. Have the best day! 🎉',
  ],
  signatureLead: '', // leave empty to show only the name line
  signatureName: '– Your Dark Bhai',

  wishMessage: 'May every beautiful wish of yours come true! 💗',
  additionalSurpriseMessage:
    'No matter how busy life gets, I hope you always find reasons to smile and moments that remind you how special you are. Stay happy, Aayushi! 🫶 — Dark',

  // Assets (files live in the public/ folder)
  friendPhotoPath: '/images/aayushi.jpg',
  photoAlt: 'Aayushi, smiling, in her birthday photo',
  musicPath: '/music/birthday-music.mp3',

  // Colours (applied as CSS variables at start-up)
  theme: {
    blush: '#F8DDE8',
    softPink: '#F3BFD2',
    cream: '#FFF9F2',
    lavender: '#E8DFF5',
    rose: '#C65D83',
    roseDeep: '#A8446A', // darker rose used for text/buttons so contrast stays readable
    brown: '#59444B',
  },
};

export default birthdayConfig;
