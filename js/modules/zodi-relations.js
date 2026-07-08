/* Shared relation tables for the two-zodiac system. One source of
   truth used by the build-time renderer (match computation) and the
   runtime Bond Test. Keep bond verdict COPY out of here; this module
   is facts and scoring only. */

export const WEST_DATES = { Aries:[3,21,4,19], Taurus:[4,20,5,20], Gemini:[5,21,6,21], Cancer:[6,22,7,22],
  Leo:[7,23,8,22], Virgo:[8,23,9,22], Libra:[9,23,10,23], Scorpio:[10,24,11,21],
  Sagittarius:[11,22,12,21], Capricorn:[12,22,1,19], Aquarius:[1,20,2,18], Pisces:[2,19,3,20] };
export const WEST_EL = { Aries:'Fire', Leo:'Fire', Sagittarius:'Fire', Taurus:'Earth', Virgo:'Earth', Capricorn:'Earth',
  Gemini:'Air', Libra:'Air', Aquarius:'Air', Cancer:'Water', Scorpio:'Water', Pisces:'Water' };
export const GLYPH = { Aries:'♈',Taurus:'♉',Gemini:'♊',Cancer:'♋',Leo:'♌',Virgo:'♍',Libra:'♎',Scorpio:'♏',Sagittarius:'♐',Capricorn:'♑',Aquarius:'♒',Pisces:'♓' };
export const HANZI = { Rat:'鼠',Ox:'牛',Tiger:'虎',Rabbit:'兔',Dragon:'龙',Snake:'蛇',Horse:'马',Goat:'羊',Monkey:'猴',Rooster:'鸡',Dog:'狗',Pig:'猪' };
export const EAST_REL = { Rat:{trine:['Dragon','Monkey'],secret:'Ox',clash:'Horse',harm:'Goat'},
  Ox:{trine:['Snake','Rooster'],secret:'Rat',clash:'Goat',harm:'Horse'},
  Tiger:{trine:['Horse','Dog'],secret:'Pig',clash:'Monkey',harm:'Snake'},
  Rabbit:{trine:['Goat','Pig'],secret:'Dog',clash:'Rooster',harm:'Dragon'},
  Dragon:{trine:['Rat','Monkey'],secret:'Rooster',clash:'Dog',harm:'Rabbit'},
  Snake:{trine:['Ox','Rooster'],secret:'Monkey',clash:'Pig',harm:'Tiger'},
  Horse:{trine:['Tiger','Dog'],secret:'Goat',clash:'Rat',harm:'Ox'},
  Goat:{trine:['Rabbit','Pig'],secret:'Horse',clash:'Ox',harm:'Rat'},
  Monkey:{trine:['Rat','Dragon'],secret:'Snake',clash:'Tiger',harm:'Pig'},
  Rooster:{trine:['Ox','Snake'],secret:'Dragon',clash:'Rabbit',harm:'Dog'},
  Dog:{trine:['Tiger','Horse'],secret:'Rabbit',clash:'Dragon',harm:'Rooster'},
  Pig:{trine:['Rabbit','Goat'],secret:'Tiger',clash:'Snake',harm:'Monkey'} };
export const TRINES = [['Rat','Dragon','Monkey'],['Ox','Snake','Rooster'],['Tiger','Horse','Dog'],['Rabbit','Goat','Pig']];
export const FIXED_EL = { Rat:'Water', Pig:'Water', Ox:'Earth', Dragon:'Earth', Goat:'Earth', Dog:'Earth',
  Tiger:'Wood', Rabbit:'Wood', Snake:'Fire', Horse:'Fire', Monkey:'Metal', Rooster:'Metal' };
export const GENERATES = { Wood:'Fire', Fire:'Earth', Earth:'Metal', Metal:'Water', Water:'Wood' };
export const CONTROLS = { Wood:'Earth', Earth:'Water', Water:'Fire', Fire:'Metal', Metal:'Wood' };
export const EL_HANZI = { Wood:'木', Fire:'火', Earth:'土', Metal:'金', Water:'水' };
export const EL_COLOR = { Wood:'#5aa876', Fire:'#d94436', Earth:'#d6a13c', Metal:'#b8bcc2', Water:'#4b89a8' };
export const EL_PALETTE = { Wood:'living greens', Fire:'ember reds and ambers', Earth:'warm umbers and golds', Metal:'moonlit grays and ivories', Water:'deep blues and blacks' };
export const YEAR_EL_BY_DIGIT = ['Metal','Metal','Water','Water','Wood','Wood','Fire','Fire','Earth','Earth'];
export const CNY = {1940:[2,8],1941:[1,27],1942:[2,15],1943:[2,5],1944:[1,25],1945:[2,13],1946:[2,2],1947:[1,22],
1948:[2,10],1949:[1,29],1950:[2,17],1951:[2,6],1952:[1,27],1953:[2,14],1954:[2,3],1955:[1,24],
1956:[2,12],1957:[1,31],1958:[2,18],1959:[2,8],1960:[1,28],1961:[2,15],1962:[2,5],1963:[1,25],
1964:[2,13],1965:[2,2],1966:[1,21],1967:[2,9],1968:[1,30],1969:[2,17],1970:[2,6],1971:[1,27],
1972:[2,15],1973:[2,3],1974:[1,23],1975:[2,11],1976:[1,31],1977:[2,18],1978:[2,7],1979:[1,28],
1980:[2,16],1981:[2,5],1982:[1,25],1983:[2,13],1984:[2,2],1985:[2,20],1986:[2,9],1987:[1,29],
1988:[2,17],1989:[2,6],1990:[1,27],1991:[2,15],1992:[2,4],1993:[1,23],1994:[2,10],1995:[1,31],
1996:[2,19],1997:[2,7],1998:[1,28],1999:[2,16],2000:[2,5],2001:[1,24],2002:[2,12],2003:[2,1],
2004:[1,22],2005:[2,9],2006:[1,29],2007:[2,18],2008:[2,7],2009:[1,26],2010:[2,14],2011:[2,3],
2012:[1,23],2013:[2,10],2014:[1,31],2015:[2,19],2016:[2,8],2017:[1,28],2018:[2,16],2019:[2,5],
2020:[1,25],2021:[2,12],2022:[2,1],2023:[1,22],2024:[2,10],2025:[1,29],2026:[2,17],2027:[2,6],
2028:[1,26],2029:[2,13],2030:[2,3],2031:[1,23],2032:[2,11]};

/* East relation kind between two year animals. */
export function eastKind(a, b) {
  if (a === b) return 'same';
  const r = EAST_REL[a];
  if (r.secret === b) return 'secret';
  if (r.trine.includes(b)) return 'trine';
  if (r.clash === b) return 'clash';
  if (r.harm === b) return 'harm';
  return 'neutral';
}

/* Wu Xing relation from A's perspective toward B (fixed elements). */
export function wuKind(a, b) {
  const A = FIXED_EL[a], B = FIXED_EL[b];
  if (A === B) return 'same';
  if (GENERATES[A] === B) return 'feeds';
  if (GENERATES[B] === A) return 'fed';
  if (CONTROLS[A] === B) return 'controls';
  return 'controlled';
}

/* Western element blend kind. */
export function westKind(a, b) {
  const A = WEST_EL[a], B = WEST_EL[b];
  if (A === B) return 'same';
  const pair = [A, B].sort().join('+');
  if (pair === 'Air+Fire' || pair === 'Earth+Water') return 'harmony';
  if (pair === 'Fire+Water') return 'opposed';
  return 'mixed';
}

/* Romance-weighted match score between the page's animal and a candidate.
   Secret friends and trines lead; being FED by their element outranks
   feeding them; shared or harmonious suns help. */
export function romanceScore(selfSign, selfAnimal, sign, animal) {
  const E = { secret: 3, trine: 2.5, same: 1, neutral: 0, harm: -2, clash: -3 }[eastKind(selfAnimal, animal)];
  const W = { fed: 1.5, feeds: 1, same: 1, controls: -1, controlled: -1 }[wuKind(selfAnimal, animal)];
  const S = { same: 1, harmony: 1, mixed: 0, opposed: -0.5 }[westKind(selfSign, sign)];
  return E + W + S;
}
