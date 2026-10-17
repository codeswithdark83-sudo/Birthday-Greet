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
  cardHeading: 'Dear Skyla, my OG Reyna ❤️🎂',
  cardSubheading: 'Happy Birthday! 🎉🥳',

  // Each string is one paragraph.
  birthdayMessage: [
    "Honestly, it feels crazy to think that it’s already been three years since we first met in a random CODM lobby. Who knew that one random match would turn into such a special friendship? 😂❤️",
    "To everyone else, you’re Skyla, the talented content creator who’s growing, achieving new milestones, and making everyone proud. But for me, you’ll always be my OG Reyna, the same person I teamed up with on Day 1. And no matter how much things change, that’ll never change. 🫶🏻",
    "Over these three years, we’ve seen so much together. People came and went, some old friends drifted away, and we met so many amazing new people along the way. Somehow, that random CODM connection turned into a whole family across Discord, Instagram, and YouTube. We’ve had different people, different vibes, and plenty of changes, but I’m genuinely glad that our bond is still here. ❤️‍🩹✨",
    "And seriously, thank you for trusting me with the role of Admin. Being a part of your journey, helping manage our little community, and supporting you behind the scenes means more to me than you probably realize. I’m happy I get to be a part of something you’ve worked so hard to build. ❤️",
    "I hope this new year of your life brings you even more success on YouTube, crazy growth, unforgettable gaming moments, countless clutch wins, and, most importantly, genuine happiness. May you achieve everything you’ve been working towards and keep becoming the person you dream of being. 🥹💗",
    "No matter how much the community grows or how many things change, I’ll always be grateful that one random CODM match brought us together. Here’s to more years of friendship, more memories, more laughs, and many more Ws together! 🥂🎮",
    "Enjoy your special day to the fullest, Skyla. You deserve all the love and happiness coming your way. ❤️",
    "Once again, Happy Birthday to my Skyla, my OG Reyna! 🎂🎈✨",
  ],
  signatureLead: 'With love and respect,',
  signatureName: '— Dark 🖤',

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
