<template>
  <div>
    <div v-if="!isPlaying" class="countdown">Countdown: {{ countdown }}</div>
    <div v-else>
      <div class="word">{{ word }}</div>
      <input
        type="text"
        @input="checkInput"
        v-model="input"
        id="input"
        autofocus
      />
      <div class="score">Score: {{ score }}</div>
    </div>
  </div>
</template>

<script>
  const dictionary = [
    'node',
    'modules',
    'public',
    'assets',
    'components',
    'hello',
    'world',
    'router',
    'index',
    'store',
    'views',
    'about',
    'home',
    'main',
    'browser',
    'ignore',
    'babel',
    'config',
    'package',
    'lock',
    'read',
  ]
  export default {
    name: 'Typing',
    data() {
      return {
        countdown: 3,
        word: '',
        input: '',
        score: '',
        isPlaying: false,
      }
    },
    methods: {
      changeWord() {
        let randomIndex = Math.floor(Math.random() * dictionary.length)
        this.word = dictionary[randomIndex]
      },
      startCountdown() {
        if (this.countdown > 0) {
          this.countdown--
        } else {
          this.isPlaying = true
        }
      },

      isMatch() {
        console.log('ismatch', { word: this.word, input: this.input })
        return this.input === this.word ? true : false
      },
      checkInput() {
        if (this.isMatch()) {
          console.log('MATCH!!!')
          this.score++
          this.input = ''
          this.changeWord()
        }
      },
    },
    created() {
      this.changeWord()
      setInterval(this.startCountdown, 1000)
    },
  }
</script>

<style></style>
