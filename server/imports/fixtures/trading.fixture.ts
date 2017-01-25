import { RecordCollection, 
  TraderCollection } from '../../../shared/collections/trading.collection';

export function loadRecords() {
  if (RecordCollection.find().cursor.count() === 0) {
    const records = [{
      id: 'https://www.last.fm/music/Killers/Hot+Fuss',
      owner: '7Su4M52AiTsaZPPHh',
      name: 'Hot Fuss',
      artist: 'Killers',
      image: 'https://lastfm-img2.akamaized.net/i/u/174s/371d5d596314430596130ef9ed5adb47.png',
      available: true
    },{
      id: 'https://www.last.fm/music/Killers/Sam%27s+Town',
      owner: '7Su4M52AiTsaZPPHh',
      name: 'Sam\'s Town',
      artist: 'Killers',
      image: 'https://lastfm-img2.akamaized.net/i/u/174s/efcde5a0bdb54b8f939db1eb7f0436d2.png',
      available: true
    },{
      id: 'https://www.last.fm/music/Coldplay/A+Rush+of+Blood+to+the+Head',
      owner: '7Su4M52AiTsaZPPHh',
      name: 'A Rush of Blood to the Head',
      artist: 'Coldplay',
      image: 'https://lastfm-img2.akamaized.net/i/u/174s/3d3d6d2b41544f42b8f750b6abdbd180.png',
      available: true
    },{
      id: 'https://www.last.fm/music/Coldplay/Parachutes',
      owner: '7Su4M52AiTsaZPPHh',
      name: 'Parachutes',
      artist: 'Coldplay',
      image: 'https://lastfm-img2.akamaized.net/i/u/174s/7c62af235dc74f30cf3125906932b842.png',
      available: true
    },{
      id: 'https://www.last.fm/music/Incubus/Morning+View',
      owner: '7Su4M52AiTsaZPPHh',
      name: 'Morning View',
      artist: 'Incubus',
      image: 'https://lastfm-img2.akamaized.net/i/u/174s/7f230186dc4b49fe8f914e18123627e0.png',
      available: true
    },{
      id: 'https://www.last.fm/music/Incubus/Live+in+Japan+2004',
      owner: '7Su4M52AiTsaZPPHh',
      name: 'Live in Japan 2004',
      artist: 'Incubus',
      image: 'https://lastfm-img2.akamaized.net/i/u/174s/f9af504fbc3b46549081c8b5206951a9.png',
      available: true
    },{
      id: 'https://www.last.fm/music/Ludovico+Einaudi/Divenire',
      owner: '7Su4M52AiTsaZPPHh',
      name: 'Divenire',
      artist: 'Ludovico Einaudi',
      image: 'https://lastfm-img2.akamaized.net/i/u/174s/ca60e9af8c66491bb40319f56e36b8f4.png',
      available: true
    },{
      id: 'https://www.last.fm/music/Ludovico+Einaudi/Una+Mattina',
      owner: '7Su4M52AiTsaZPPHh',
      name: 'Una Mattina',
      artist: 'Ludovico Einaudi',
      image: 'https://lastfm-img2.akamaized.net/i/u/174s/79815b826b1746ceb8838605b9d1b184.png',
      available: true
    },{
      id: 'https://www.last.fm/music/Billy+Joel/The+Stranger',
      owner: '7Su4M52AiTsaZPPHh',
      name: 'The Stranger',
      artist: 'Billy Joel',
      image: 'https://lastfm-img2.akamaized.net/i/u/174s/88bad96c61594960bbebaf96b0b3a517.png',
      available: true
    },{
      id: 'https://www.last.fm/music/Billy+Joel/The+Essential+Billy+Joel',
      owner: '7Su4M52AiTsaZPPHh',
      name: 'The Essential Billy Joel',
      artist: 'Billy Joel',
      image: 'https://lastfm-img2.akamaized.net/i/u/174s/02f6826242524a0abe9c2c8ebc05b4e5.png',
      available: true
    }];
 
    records.forEach((record) => RecordCollection.insert(record));
  }
}

export function loadTraders() {
  if (TraderCollection.find().cursor.count() === 0) {
    const traders = [{
      id: '7Su4M52AiTsaZPPHh'
    }];
 
    traders.forEach((trader) => TraderCollection.insert(trader));
  }
}