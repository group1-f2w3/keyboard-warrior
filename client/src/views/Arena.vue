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
            <!-- <h3 class="text-white">{{ playerStatus }}</h3> -->
            <div id="myProgress1">
              <div id="myBar1" :style="hp1"></div>
            </div>
          </div>
          <div v-if="playerStatus.length > 1" class="col-5">
            <h3 class="text-white">{{ playerStatus[1].username }}</h3>
            <!-- <h3 class="text-white">{{ playerStatus }}</h3> -->
            <div id="myProgress2">
              <div id="myBar2" :style="hp2"></div>
            </div>
          </div>
        </div>
        <!-- <div class="row">-->
        <!-- Buat characterr -->
        <div class="row d-flex mt-5">
          <img :src="knight" width="50%" alt="" srcset="" />
          <img
            v-if="playerStatus.length > 1"
            :src="knightEnemy"
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
          class="form-control form-control-lg"
          placeholder="Type To Attack.."
          id="word-input"
          autofocus
        />
      </h1>
    </div>
    <!-- </div> -->
  </section>
</template>

<script>
  import knight from '@/assets/knight-a-idle.gif'
  import knightEnemy from '@/assets/knight-b-idle.gif'
  import sword1 from '@/audio/steelsword.mp3'
  import sword2 from '@/audio/sword1.mp3'
  import backSound from '../audio/makai_symphony-dragon_castle-96kbps.mp3'
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
        knight,
        knightEnemy,
      }
    },
    methods: {
      matchWords() {
        if (this.typing == this.word) {
          this.typing = ''
          this.$socket.emit('sendAttack', { username: this.username })
          let soundEffect = new Audio(sound)
          soundEffect.play()
        } else {
          this.typing = ''
        }
      },
    },
    computed: {
      isPlaying() {
        return this.$store.state.isPlaying
      },
    },
    sockets: {
      isPlaying(payload) {
        this.$store.dispatch('setIsPlaying', payload)
      },

      fetchWord(word) {
        console.log('receiving new word:', word)
        this.word = word
        // kosongkan typing setiap menerima soal baru
        this.typing = ''
      },
      playerStatus(playerStatus) {
        // Kalo di server ga ada pemain, kosongkan localstorage, kembali ke login
        if (playerStatus.length === 0) {
          localStorage.clear()
          this.$router.replace('/welcome')
        }
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

      finish(playerStatus) {
        this.playerStatus = playerStatus
        localStorage.removeItem('username')

        this.$store.dispatch('stopBgm')

        // this.bgm.pause()
        // this.bgm.currentTime = 0

        // playerStatus.forEach((player) => {
        //   if (player.username === this.username) {
        //     if (player.hp <= 0) {
        //       this.$router.push('/lose')
        //     } else {
        //       this.$router.push('/win')
        //     }
        //   }
        // })
        // this.$router.push('/result')
        this.$router.push('/win')
      },
    },
    created() {
      console.log('created')
      this.$socket.emit('playerStatus')
      this.$socket.emit('fetchWord')
      this.username = localStorage.getItem('username')
      // console.log(localStorage.getItem('username'))
      console.log(this.username)

      // play background music
      let newBgm = new Audio(backSound)
      newBgm.volume = 0.45
      // bgm.play()
      this.$store.dispatch('setBgm', newBgm)
    },
    mounted() {
      // if (this.playerStatus.length === 0) {
      //   localStorage.removeItem('username')
      // }
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
