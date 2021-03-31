const fs = require('fs');

try {
  fs.rmSync('index.txt');
} catch {}

fs.closeSync(fs.openSync('index.txt', 'w'));

nouns = [
  ...new Set(
    require('nouns')
      .nouns.map((noun) => `${noun[0].toUpperCase()}${noun.slice(1)}`)
      .concat(eval('(()=>{' + fs.readFileSync('./8325491/nouns.js', 'utf8') + ';return nouns;})()'))
  ),
];

const adverbs = require('./adverbs');

adjectives = eval('(()=>{' + fs.readFileSync('./8325491/adjectives.js', 'utf8') + ';return adjectives;})()').map(
  (adjective) => `${adjective.charAt(0).toUpperCase()}${adjective.slice(1)}`
);

function randomGenListForJSList(listName, list) {
  return `$${listName}\n${list.join('\n')}`;
}

function filtererForLetter(letter) {
  return function (word) {
    return word.startsWith(letter);
  };
}

fs.writeFileSync('index.txt', `$name : NPM Expansions
$description : Generates random NPM expansions
$author : Yash Singh
$button : Expand!`)

function pushList(letter, partOfSpeech) {
  fs.writeFileSync(
    'index.txt',
    fs.readFileSync('index.txt', 'utf8') +
      '\n\n' +
      randomGenListForJSList(
        `${letter}${partOfSpeech}`,
        (partOfSpeech === 'noun' ? nouns : partOfSpeech === 'adverb' ? adverbs : adjectives).filter(filtererForLetter(letter.toUpperCase()))
      )
  );
}

pushList('n', 'noun');
pushList('n', 'adjective');
pushList('n', 'adverb');
pushList('p', 'noun');
pushList('p', 'adjective');
pushList('p', 'adverb');
pushList('m', 'noun');
pushList('m', 'adverb');

fs.writeFileSync(
  'index.txt',
  fs.readFileSync('index.txt', 'utf8') +
    `\n\n$phrase
[nnoun]: [padjective] [mnoun]
[nnoun]'s [padjective] [mnoun]
[nadjective] [padjective] [mnoun]
[nadjective] [pnoun] [madverb]
[nadverb] [padjective] [mnoun]
[nadjective] [padjective] [mnoun]
`
);

fs.writeFileSync('index.txt', fs.readFileSync('index.txt', 'utf8').trim() + '\n');
