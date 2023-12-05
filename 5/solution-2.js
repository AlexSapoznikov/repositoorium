const input = require('./input').trim();

// const input = `
// seeds: 79 14 55 13

// seed-to-soil map:
// 50 98 2
// 52 50 48

// soil-to-fertilizer map:
// 0 15 37
// 37 52 2
// 39 0 15

// fertilizer-to-water map:
// 49 53 8
// 0 11 42
// 42 0 7
// 57 7 4

// water-to-light map:
// 88 18 7
// 18 25 70

// light-to-temperature map:
// 45 77 23
// 81 45 19
// 68 64 13

// temperature-to-humidity map:
// 0 69 1
// 1 0 69

// humidity-to-location map:
// 60 56 37
// 56 93 4
// `.trim();

const inputLines = input.trim().split('\n');

const [
  seedsStr,
  seedToSoilStr,
  soilToFertilizerStr,
  fertilizerToWaterStr,
  waterToLightStr,
  lightToTemperatureStr,
  temperatureToHumidityStr,
  humidityToLocationStr,
] = input.trim().split('\n\n')

const parse = (lineStr) => {
  return lineStr.split('\n').slice(1).reduce((arr, line) => {
    arr.push(line.split(' ').filter(e => !!(e.trim())).map(e => +e));
  
    return arr;
  }, []);
}

const toMap = (mapArr, _from, _to) => {
  // [min, max, applier]
  return mapArr.reduce((map, [destRangeStart, srcRangeStart, rangeLen]) => {
    const min = srcRangeStart;
    const max = srcRangeStart + rangeLen - 1;

    map.push({
      min,
      max,
      // The algorithm: https://youtu.be/3M_5oYU-IsU?si=W2z3t6soOhMd39_n&t=63
      getSrc: (seed) => destRangeStart + (seed - srcRangeStart),
    })

    return map;
  }, []);
};

const getFromMap = (map, seed) => {
  const range = map.find(range => range.min <= seed && seed <= range.max);
  
  return range?.getSrc?.(seed) || seed;
}

const seeds = seedsStr.split(':')[1].split(' ').filter(e => !!(e.trim())).map(e => +e);
const seedToSoil = toMap(parse(seedToSoilStr));
const soilToFertilizer = toMap(parse(soilToFertilizerStr));
const fertilizerToWater = toMap(parse(fertilizerToWaterStr));
const waterToLight = toMap(parse(waterToLightStr));
const lightToTemperature = toMap(parse(lightToTemperatureStr));
const temperatureToHumidity = toMap(parse(temperatureToHumidityStr));
const humidityToLocation = toMap(parse(humidityToLocationStr));

const seedRange = seeds.reduce((seedsArr, seed, index) => {
  if ((index + 1) % 2 === 0) {
    seedsArr.push([seeds[index - 1], seed])
  }

  return seedsArr;
}, []);

let min;
for (let i = 0; i < seedRange.length; i++) {
  const [seedStart, range] = seedRange[i];
  console.log('SET', i, 'of', seedRange.length);
  
  for (let seed = seedStart; seed < (seedStart + range); seed++) {
    const soil = getFromMap(seedToSoil, seed);
    const fertilizer = getFromMap(soilToFertilizer, soil);
    const water = getFromMap(fertilizerToWater, fertilizer);
    const light = getFromMap(waterToLight, water);
    const temperature = getFromMap(lightToTemperature, light);
    const humidity = getFromMap(temperatureToHumidity, temperature);
    const location = getFromMap(humidityToLocation, humidity);
  
    if (min === undefined) {
      min = location;
    }

    min = location < min ? location : min;
  } 
}

// THIS PILE OF SHIT RUNS OUT OF MEMORY BECAUSE OF ARRAY(X).FILL. I SHALL REMEMBER THIS DAY! I HAVE LEARNED...
// const result = seedRange.reduce((min, [seedStart, range]) => {
//   const submin = Array(range).fill(0).map((_, i) => seedStart + i).reduce((submin, seed) => {
//     const soil = getFromMap(seedToSoil, seed);
//     const fertilizer = getFromMap(soilToFertilizer, soil);
//     const water = getFromMap(fertilizerToWater, fertilizer);
//     const light = getFromMap(waterToLight, water);
//     const temperature = getFromMap(lightToTemperature, light);
//     const humidity = getFromMap(temperatureToHumidity, temperature);
//     const location = getFromMap(humidityToLocation, humidity);

//     return location < submin ? location : submin;
//   }, Number.MAX_SAFE_INTEGER);

//   return submin < min ? submin : min;
// }, Number.MAX_SAFE_INTEGER);

console.log('min', min);

