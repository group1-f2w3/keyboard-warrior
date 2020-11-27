<template>
  <section class="arena-page">
    <div class="card card-arena">
      <!-- <div class="container" >
          <div class="row" >
         
            <div class="col" v-for="(user,i) in onlineUsers" :key="i">
                <h3>{{user.username}}</h3>
              <div>
                <div id="myBar1">{{sisaHp}}</div> -->
      <div class="container">
        <div class="row">
          <div v-if="playerStatus.length > 0" class="col-5">
            <h3 class="text-white">{{ playerStatus[0].username }}</h3>

            <div id="myProgress1">
              <div id="myBar1" :style="hp1"></div>
            </div>
          </div>
          <div v-if="playerStatus.length === 2" class="col-5">
            <h3 class="text-white">{{ playerStatus[1].username }}</h3>

            <div id="myProgress2">
              <div id="myBar2" :style="hp2"></div>
            </div>
          </div>
        </div>
        <!-- Buat characterr -->
        <div class="row d-flex mt-5">
          <img :src="knight1" width="50%" alt="" srcset="" />
          <img
            v-if="playerStatus.length === 2"
            :src="knight2"
            width="50%"
            alt=""
            srcset=""
          />
        </div>
      </div>
    </div>

    <div v-if="isPlaying" id="input-container">
      <div id="word">
        <h1>{{ word }}</h1>
      </div>

      <!-- TYPE CONTAINER -->
      <!-- <div id="input" class="card card-type p-3 mt-3"> -->
      <h1 v-if="isPlaying" class="display-5 ">
        <input
          type="text"
          v-model="typing"
          v-on:keyup.enter="matchWords"
          @input="sendAttack"
          class="form-control form-control-lg"
          placeholder="Type To Attack.."
          id="word-input"
          autofocus
          autocomplete="off"
        />
      </h1>
    </div>
    <!-- </div> -->
  </section>
</template>

<script>
  import sword1 from '@/audio/steelsword.mp3'
  import sword2 from '@/audio/sword1.mp3'
  import bgmArena from '../audio/makai_symphony-dragon_castle-96kbps.mp3'
  import sfxSword1 from '../audio/steelsword.mp3'
  import sfxSword2 from '../audio/sword1.mp3'
  import animKnight1Attack from '../assets/knight1-attack.gif'
  import animKnight1Hurt from '../assets/knight-a-hurt.gif'
  import animKnight1Idle from '../assets/knight-a-idle.gif'
  import animKnight1Lose from '../assets/knight-a-lose.gif'
  import animKnight1Win from '../assets/knight1-win.gif'
  import animKnight1Run from '../assets/knight1-run.gif'
  import animKnight1Die from '../assets/knight1-die.png'
  import animKnight2Attack from '../assets/knight2-attack.gif'
  import animKnight2Hurt from '../assets/knight-b-hurt.gif'
  import animKnight2Idle from '../assets/knight-b-idle.gif'
  import animKnight2Lose from '../assets/knight2-lose.gif'
  import animKnight2Win from '../assets/knight2-win.gif'
  import animKnight2Run from '../assets/knight2-run.gif'
  import animKnight2Die from '../assets/knight2-die.png'

  export default {
    name: 'Arena',
    data() {
      return {
        word: '',
        typing: '',
        playerStatus: [],
        hp1: '',
        hp2: '',
        username: '',
        sound: {
          attack: [sfxSword1, sfxSword2],
          crowd: '',
        },
        knight1: animKnight1Idle,
        knight2: animKnight2Idle,
        animation: {
          knight1: {
            attack: animKnight1Attack,
            hurt: animKnight1Hurt,
            idle: animKnight1Idle,
            lose: animKnight1Lose,
            win: animKnight1Win,
            die: animKnight1Die,
          },
          knight2: {
            attack: animKnight2Attack,
            hurt: animKnight2Hurt,
            idle: animKnight2Idle,
            lose: animKnight2Lose,
            win: animKnight2Win,
            die: animKnight2Die,
          },
        },
      }
    },
    methods: {
      matchWords() {
        if (this.typing == this.word) {
          this.typing = ''
          this.$socket.emit('submitAnswer', { username: this.username })
        } else {
          this.typing = ''
        }
      },

      sendAttack() {
        this.$socket.emit('sendAttack', {
          username: localStorage.getItem('username'),
        })
      },

      attack(username, randomSound = false) {
        if (this.playerStatus[0].username === username) {
          if (this.knight1 == this.animation.knight1.idle) {
            this.knight1 = this.animation.knight1.attack
            setTimeout(() => {
              this.knight1 = this.animation.knight1.idle
            }, 3000)
          }
        } else {
          if (this.knight2 == this.animation.knight2.idle) {
            this.knight2 = this.animation.knight2.attack
            setTimeout(() => {
              this.knight2 = this.animation.knight2.idle
            }, 2000)
          }
        }

        let soundIndex = Math.floor(Math.random() * this.sound.attack.length)
        let sound = this.sound.attack[soundIndex]
        let sfx = new Audio(sound)
        sfx.volume = 0.1

        if (randomSound) {
          if (Math.random() > 0.5) {
            sfx.play()
          }
        } else {
          sfx.play()
        }
      },

      hurt(username) {
        if (this.playerStatus[0].username === username) {
          if (this.knight1 != this.animation.knight1.hurt) {
            this.knight1 = this.animation.knight1.hurt
            setTimeout(() => {
              this.knight1 = this.animation.knight1.idle
            }, 2000)
          }
        } else {
          if (this.knight2 != this.animation.knight2.hurt) {
            this.knight2 = this.animation.knight2.hurt
            setTimeout(() => {
              this.knight2 = this.animation.knight2.idle
            }, 2000)
          }
        }
      },
      lose(username) {
        if (this.playerStatus[0].username === username) {
          // update health bar
          this.hp1 = 'width: 0'
          // update animation
          if (this.knight1 != this.animation.knight1.lose) {
            this.knight1 = this.animation.knight1.lose
          }
        } else {
          this.hp2 = 'width: 100%'
          if (this.knight2 != this.animation.knight2.lose) {
            this.knight2 = this.animation.knight2.lose
          }
        }
        if (localStorage.getItem('username') === username) {
          console.log('You lose')
          // this.$router.push('/lose')
        }
      },
      win(username) {
        if (this.playerStatus[0].username === username) {
          if (this.knight1 != this.animation.knight1.win) {
            this.knight1 = this.animation.knight1.win
            setTimeout(() => {
              this.knight1 = this.animation.knight1.win
            }, 2000)
            setTimeout(() => {
              this.knight1 = this.animation.knight1.win
            }, 2000)
          }
        } else {
          if (this.knight2 != this.animation.knight2.win) {
            this.knight2 = this.animation.knight2.win
            setTimeout(() => {
              this.knight2 = this.animation.knight2.win
            }, 2000)
            setTimeout(() => {
              this.knight2 = this.animation.knight2.win
            }, 2000)
          }
        }

        if (localStorage.getItem('username') === username) {
          console.log('You win')
          // this.$router.push('/win')
        }
      },
    },
    watch: {
      knight1() {
        console.log(this.knight1, '<<< knight1 anim')
      },
      knight2() {
        console.log(this.knight2, '<<< knight2 anim')
      },
    },
    computed: {
      currentVolume() {
        return this.$store.state.bgm.volume
      },
      isPlaying() {
        return this.$store.state.isPlaying
      },
    },
    sockets: {
      logout() {
        this.$store.dispatch('setIsPlaying', false)
        localStorage.clear()
        this.$router.replace('/welcome')
      },
      isPlaying(payload) {
        console.log('isplaying:', payload)
        this.$store.dispatch('setIsPlaying', payload)
      },

      updateAnimation({ username, animation }) {
        switch (animation) {
          case 'attack':
            this.attack(username)
            break
          case 'hurt':
            this.hurt(username)
            break
          case 'win':
            this.win(username)
            break
          case 'lose':
            this.lose(username)
            break
        }
      },

      attack() {
        this.attack()
      },

      hurt() {
        this.hurt()
      },

      win() {
        this.win()
      },

      lose() {
        this.lose()
      },

      fetchWord(word) {
        console.log('receiving new word:', word)
        this.word = word
        // kosongkan typing setiap menerima soal baru
        this.typing = ''
      },
      playerStatus(playerStatus) {
        // Kalo di server ga ada pemain, kosongkan localStorage, kembali ke login
        if (playerStatus.length === 0) {
          console.log('no player in the arena')
          localStorage.clear()
          this.$router.replace('/welcome')
        }

        // update health bar
        this.playerStatus = playerStatus
        if (this.playerStatus[0]) {
          let hp1 = (100 * this.playerStatus[0].hp) / this.playerStatus[0].maxHp
          this.hp1 = `width:${hp1}%`
        }
        if (this.playerStatus[1]) {
          let hp2 =
            100 - (100 * this.playerStatus[1].hp) / this.playerStatus[1].maxHp
          this.hp2 = `width:${hp2}%`
        }
        console.log(playerStatus, '<<< playerStatus')
      },

      finish(result) {
        console.log('finish')

        this.$store.dispatch('setIsPlaying', false)

        this.$store.dispatch('setResult', {
          winner: result.winner,
          loser: result.loser,
        })

        console.log('WIN:', result.winner, 'LOSE:', result.loser)

        this.$store.dispatch('stopBgm')

        if (this.username === result.winner) {
          this.$router.push('/win')
        } else {
          this.$router.push('/lose')
        }
        localStorage.clear()
      },
    },
    created() {
      console.log('created')
      this.$socket.emit('playerStatus')
      this.$socket.emit('fetchWord')
      this.username = localStorage.getItem('username')
      console.log(this.username)

      let sound = this.sound.attack[0]
      let sfx = new Audio(sound)
      sfx.play()

      // play background music
      let newBgm = new Audio(bgmArena)
      newBgm.volume = 0.25

      setTimeout(() => {
        this.$store.dispatch('setBgm', newBgm)
      }, 5000)
    },
  }
</script>

<style>
  section.arena-page {
    padding-bottom: 0;
  }

  #input-container {
    position: relative;
    top: -130px;
  }

  #word {
    /* position: absolute; */
    top: 500px;
    color: white;
    font-size: 3rem;
    text-decoration: underline;
    text-underline-offset: 2em;
    /* border-bottom: 5px solid white; */
  }
</style>
