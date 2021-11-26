import { TWELVE_TONE_TO_NOTE_MAPPING } from './Constants';


// weird javascript modulo bug https://stackoverflow.com/questions/4467539/javascript-modulo-gives-a-negative-result-for-negative-numbers
export const mod = (n, m) => {
  return ((n % m) + m) % m;
}

export const calculateLinePoints = (triad, windowWidth, windowHeight) => {
  const v1 = mapVertex(triad[0], windowWidth, windowHeight);
  const v2 = mapVertex(triad[1], windowWidth, windowHeight);
  const v3 = mapVertex(triad[2], windowWidth, windowHeight);
  return [...v1, ...v2, ...v3, ...v1];
};

export const convertToNotationTriad = triad => {
  const notationArray = triad.map(note => TWELVE_TONE_TO_NOTE_MAPPING[note]);
  return notationArray.join('');

};

const mapVertex = (note, windowWidth, windowHeight) => {
  switch (note) {
    case 0:
      return [windowWidth/3, windowHeight/3 - 195];
    case 1:
      return [windowWidth/3 + 100, windowHeight/3 - 170];
    case 2: 
      return [windowWidth/3 + 170, windowHeight/3 - 100];
    case 3: 
      return [windowWidth/3 + 195, windowHeight/3];
    case 4: 
      return [windowWidth/3 + 170, windowHeight/3 + 100];
    case 5: 
      return [windowWidth/3 + 100, windowHeight/3 + 170];
    case 6: 
      return [windowWidth/3, windowHeight/3 + 195];
    case 7: 
      return [windowWidth/3 - 100, windowHeight/3 + 170];
    case 8: 
      return [windowWidth/3 - 170, windowHeight/3 + 100];
    case 9: 
      return [windowWidth/3 - 195, windowHeight/3];
    case 10: 
      return [windowWidth/3 - 170, windowHeight/3 - 100];
    case 11: 
      return [windowWidth/3 - 100, windowHeight/3 - 170];
  }
};
