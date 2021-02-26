const formatVolumeIconPath = require('../assets/scripts/main');

describe('formatVolumeIconPath', () => {
  const filePrefix = './assets/media/icons/'

  test('returns volume level 3 path when volume is above 66', () => {
    const filePath = formatVolumeIconPath(75);
    expect(filePath).toEqual(filePrefix + 'volume-level-3.svg')
  });
  test('returns volume level 2 path when volume is between 34 and 66', () => {
    const filePath = formatVolumeIconPath(45);
    expect(filePath).toEqual(filePrefix + 'volume-level-2.svg')
  });
  test('returns volume level 1 path when volume is between 1 and 33', () => {
    const filePath = formatVolumeIconPath(10);
    expect(filePath).toEqual(filePrefix + 'volume-level-1.svg')
  });
  test('returns volume level 0 path when volume is 0', () => {
    const filePath = formatVolumeIconPath(0);
    expect(filePath).toEqual(filePrefix + 'volume-level-0.svg')
  });
})