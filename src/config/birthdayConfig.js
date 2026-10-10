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
  cardSubheading: 'Aayushi, today is YOUR day! 💗',

  // Each string is one paragraph.
  birthdayMessage: [
    'Happy Birthday! 🎂✨',
    'May this year bring you all the success you deserve. I truly hope your gaming career takes off like crazy, and whatever professional path you choose starts off smoothly and super fast! Keep grinding and shining.',
    'And yes, thank you from the bottom of my heart for being such a wonderful friend for all these years. Always stay the same. Have the absolute best day! 🎉',
  ],
  signatureLead: '', // optional line above the name; leave empty to hide
  signatureName: '– Your Dark Bhai',

  wishMessage: 'May every beautiful wish of yours come true! 💗',
  additionalSurpriseMessage:
    'No matter how busy life gets, I hope you always find reasons to smile and moments that remind you how special you are. Stay happy, Aayushi! 🫶 — Your Dark Bhai',

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
