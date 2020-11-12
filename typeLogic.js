window.addEventListener('load', init);
let levels={
  easy:20,
  medium:10,
  hard:5
}

//change level
const currentLevel = levels.easy

//globals variable nanti diletakkin di state store
let time = currentLevel
let score = 0
let highScore = 0
let isPlaying

//dom element,,,masih pake dom
const wordInput = document.querySelector('#word-input');
const currentWord = document.querySelector('#current-word');
const scoreDisplay = document.querySelector('#score');
const timeDisplay = document.querySelector('#time');
const message = document.querySelector('#message');
const seconds = document.querySelector('#seconds');
const highscoreDisplay = document.querySelector('#highscore');


//kalo bisa di fetch pakai api
const words = [
  'abap',
  'able',
  'abset',
  'absys',
  'acs',
  'actionscript',
  'admin',
  'aldor',
  'alef',
  'algol',
  'afterAll',
  'algorithm',
  'atlas',
  'array',
  'autocoder',
  'apple',
  'axios',
  'basic',
  'bootstrap',
  'beanshell',
  'beforeCreate',
  'bcrypt',
  'bcryptjs',
  'boxx',
  'borland',
  'bodyparser',
  'bpel',
  'bugsys',
  'csharp',
  'chrome',
  'cshell',
  'chain',
  'chapel',
  'cobol',
  'coffeescript',
  'comparesync',
  'cms',
  'cobra',
  'comal',
  'common',
  'cors',
  'cue',
  'dasl',
  'darkbasic',
  'delphi',
  'decode',
  'debug',
  'dialec',
  'dbase',
  'dbeaver',
  'dreammaker',
  'dotenv',
  'easy',
  'exec',
  'escapade',
  'factor',
  'flow',
  'flash',
  'focus',
  'function',
  'forth',
  'fortran',
  'foxpro',
  'fscript',
  'firebase',
  'frontier',
  'generic',
  'golang',
  'godiva',
  'gotran',
  'groovy',
  'google',
  'graphtalk',
  'hals',
  'hascript',
  'hashSync',
  'hdl',
  'html',
  'hotbasic',
  'hypertalk',
  'ibm',
  'icon',
  'imp',
  'inform',
  'intercal',
  'init',
  'iptscrae',
  'io',
  'javascript',
  'java',
  'janus',
  'j2ee',
  'jsp',
  'jsonwebtoken',
  'jscript',
  'jquery',
  'korn',
  'kiev',
  'krypton',
  'krc',
  'labview',
  'legoscript',
  'leopard',
  'lfyre',
  'lingo',
  'linter',
  'lisaac',
  'lucid',
  'lush',
  'lyapas',
  'mad',
  'madcap',
  'meta',
  'mapbasic',
  'magma',
  'mapper',
  'matlab',
  'matematica',
  'mercury',
  'method',
  'methods',
  'mindscript',
  'modcap',
  'modular',
  'netflix',
  'netbean',
  'netscape',
  'newtonscript',
  'nice',
  'nusaptel',
  'net',
  'oberon',
  'obliq',
  'object',
  'objectoriented',
  'octave',
  'open',
  'orm',
  'oxygene',
  'oz',
  'phyton',
  'pascal',
  'palindrome',
  'pentagram',
  'parser',
  'perl',
  'php',
  'pilot',
  'portran',
  'processing',
  'prolog',
  'props',
  'progressivewebapp',
  'port',
  'postscript',
  'quakec',
  'quickcomp',
  'repl',
  'ruby',
  'react',
  'rust',
  'response',
  'request',
  'shadow',
  'small',
  'scar',
  'script',
  'socket',
  'spice',
  'slice',
  'splice',
  'string',
  'sass',
  'sequelize',
  'singlepageapllication',
  'scala',
  'snobol',
  'supertest',
  'tempo',
  'teco',
  'tie',
  'turbopascal',
  'torquescript',
  'telcomp',
  'telkom',
  'tutorial',
  'thead',
  'tbody',
  'table',
  'tag',
  'this',
  'this.',
  'unicorn',
  'unique',
  'unity',
  'unix',
  'unrealscript',
  'use',
  'urlencoded',
  'vue',
  'vetur',
  'visualcode',
  'visualbasic',
  'vbscript',
  'viewengine',
  'where',
  'whitespace',
  'xquery',
  'xpl',
  'xharbour',
  'xslt',
  'yellow',
  'yorick',
  'yacc',
  'zuq',
  'zzt',
  'zsh',
  'zonnon'
]

// //load words secara acak
function init(){
  //show number of second on ui
  seconds.innerHTML = currentLevel
  showWord(words)

  //matching word input with given word
  wordInput.addEventListener('input',startMatch)

  //countdown
  setInterval(countdown,1000)

  //check game status
  setInterval(checkStatus,50)
}

//start match
function startMatch(){
  if(matchWords()){
    isPlaying = true
    time = currentLevel+1
    showWord(words)
    wordInput.value = ''
    score++
  }
  //if score -1 to display 0
  if(score == -1){
    scoreDisplay.innerHTML = 0
  }else{
    scoreDisplay.innerHTML = score
  }
}

//match input words with currentWord
function matchWords(){
  if(wordInput.value === currentWord.innerHTML){
    message.innerHTML = 'Correct!'
    return true
  }else{
    message.innerHTML=''
    return false
  } 
}


function showWord(words){
  //generate random array index
  const randomWordsIndex = Math.floor(Math.random() * words.length)
  currentWord.innerHTML = words[randomWordsIndex]
}

//countdown timer
function countdown (){
  if(time > 0){
    time --
  }else if (time === 0){
    isPlaying = false
  }
  //show time
  timeDisplay.innerHTML = time
}

//check game status
function checkStatus(){
  if(!isPlaying && time === 0){
    message.innerHTML = 'Game Over !!!'
    score = -1
    console.log(highScore, score)
    if(score > highScore){
      highscoreDisplay.innerHTML = score
    }else{
      highscoreDisplay.innerHTML = highScore
    }
  }
}

