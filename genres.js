/*
  Edit this file to add genres or change songs.

  Each genre needs:
    id          - unique, lowercase, no spaces (used as the page anchor)
    label       - shown on the nav button
    eyebrow     - small line above the title, e.g. song count
    title       - big heading
    hindi       - decorative Hindi line under the title
    videoIds    - array of real YouTube video IDs (copy from a youtube.com/watch?v=THIS_PART url)
    songTitles  - array matching videoIds, same order, for the "now playing" label
    hasHorn     - true/false, adds a horn button
    hornLabel   - text on the horn button (only used if hasHorn is true)

  IMPORTANT: every item in videoIds and songTitles needs a comma after it,
  except the very last one before the closing bracket ]. A missing comma
  breaks the entire file and stops the whole site from working.

  To add a song: paste its YouTube video ID into videoIds and its
  "Song name — Singers" into songTitles, in the same position.

  To add a whole new genre: copy one of the blocks below, change every
  field, and add it to the GENRES array. It will appear automatically.
*/

const GENRES = [
  {
    id: 'truck',
    label: '🚚 Truck driver',
    eyebrow: '3 on the highway',
    title: 'ट्रक वाला — Truck Wala',
    hindi: 'बुरी नज़र वाले तेरा मुँह काला',
    videoIds: ['F8jufkW0SP8', 'gY_lYXY8P34', '5MIGQBpVeqs'],
    songTitles: [
      'Yeh Ladka Hai Deewana — Udit Narayan, Alka Yagnik',
      'Koi Mil Gaya — Udit Narayan, Alka Yagnik, Kavita Krishnamurthy',
      'Mujhse Mohabbat Ka'
    ],
    hasHorn: true,
    hornLabel: '🔊 Press horn'
  },
  {
    id: 'saloon',
    label: '💈 Saloon',
    eyebrow: '31 in the chair',
    title: 'उस्तरा — Ustara Beats',
    hindi: 'बाल कटवा लो, नयी फिल्मी धुन के साथ',
    videoIds: [],
    songTitles: [],
    playlistId: 'PLPLACEHOLDER_SALOON',
    hasHorn: true,
    hornLabel: '📣 Bhaiya, number aagya!'
  },
  {
    id: 'gym',
    label: '🏋 Gym',
    eyebrow: '1 for the last set',
    title: 'लोहा — Iron and Rhythm',
    hindi: 'एक और रेप, रुकना नहीं',
    videoIds: ['9a4izd3Rvdw'],
    songTitles: ['Challa — A.R. Rahman, Gulzar'],
    playlistId: 'PLPLACEHOLDER_GYM'
  },
  {
    id: 'romantic',
    label: '💗 Romantic',
    eyebrow: '24 for the quiet hours',
    title: 'करीब — Close and Slow',
    hindi: 'तेरे बिना ये रात अधूरी',
    videoIds: [],
    songTitles: [],
    playlistId: 'PLPLACEHOLDER_ROMANTIC'
  },
  {
    id: 'party',
    label: '🎉 Pop / Party',
    eyebrow: '67 for full volume',
    title: 'धमाल — No Brakes Tonight',
    hindi: 'नाचो सब, आज रुकना नहीं',
    videoIds: [],
    songTitles: [],
    playlistId: 'PLPLACEHOLDER_PARTY'
  },
  {
    id: 'dihadi',
    label: '🧱 Dihadi',
    eyebrow: '19 on site today',
    title: 'दिहाड़ी — Dihadi Beats',
    hindi: 'मेहनत की कमाई, हिम्मत की धुन',
    videoIds: [],
    songTitles: [],
    playlistId: 'PLPLACEHOLDER_DIHADI'
  }
];
