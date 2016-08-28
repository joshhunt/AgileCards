/* eslint-disable */
const nsg = require('node-sprite-generator');
const fs = require('fs');

const emojisJson = require('emojione/emoji.json');
const _ = require('lodash');

const emojiByUnicode = _.keyBy(emojisJson, 'unicode');
const emojisList = _.filter(emojisJson, ({ category }) => category === 'people');

const SOURCE_SIZE = 512;

const sources = emojisList.map((emoji) => {
    return require.resolve(`emojione/assets/png_${SOURCE_SIZE}x${SOURCE_SIZE}/${emoji.unicode}.png`);
});

console.log('Generating spritesheet for', sources.length, 'emojis');

nsg({
  src: sources,
  layout: 'packed',
  spritePath: 'people-emoji-sprite.png',
  stylesheetPath: 'spriteData.json',
  stylesheet: (layout, stylesheetPath, spritePath, options, callback) => {
    console.log();

    // Assumes all images are square and the same size
    const emojiSize = layout.images[0].width;

    const data = _(layout.images)
      .map((image) => {
        const posX = image.x / emojiSize;
        const posY = image.y / emojiSize;
        const unicode = image.path.match(/\/([\w-]+)\.png$/)[1];
        return _.merge({ posX, posY }, emojiByUnicode[unicode]);
      })
      .keyBy(({ shortname }) => shortname.match(/:(\w+):/)[1])
      .value();

    fs.writeFile(stylesheetPath, JSON.stringify(data), callback);
  }
}, function (err) {
  console.log(err);
  console.log('Sprite generated!');
});