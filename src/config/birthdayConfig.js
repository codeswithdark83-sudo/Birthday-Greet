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
    'Happy Birthday, Aayushi! 💖',
    'I hope your special day brings you a million reasons to smile and countless beautiful memories to cherish. Never stop being the amazing person you are. You deserve happiness, love, success, and all the little things that make life beautiful.',
    'Keep shining, keep smiling, and keep being our wonderful Skyla. May this new chapter of your life be filled with exciting adventures, unexpected blessings, and dreams coming true.',
    'Enjoy every little moment of your day. You deserve all the happiness in the world! 🎂✨',
  ],
  signatureLead: 'With lots of love and best wishes,',
  signatureName: 'Dark ❤️',

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
