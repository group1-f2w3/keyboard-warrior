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
              <div id="myBar1">{{ playerStatus[0].hp }}</div>
            </div>
          </div>
          <div v-if="playerStatus.length > 1" class="col-5">
            <h3 class="text-white">{{ playerStatus[1].username }}</h3>
            <!-- <h3 class="text-white">{{ playerStatus }}</h3> -->
            <div id="myProgress2">
              <div id="myBar2">{{ playerStatus[1].hp }}</div>
            </div>
          </div>
        </div>
        <!-- <div class="row">-->
        <!-- Buat characterr -->
        <!-- <h5 class="display-4 mb-5 ml-5" id="current-word">{{$store.state.currentWord}}</h5> -->
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

    <div id="word">
      <h1>{{ word }}</h1>
    </div>

    <!-- TYPE CONTAINER -->
    <div class="card card-type p-3 mt-3">
      <h1 class="display-5 ">
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
  </section>
</template>

<script>
  import knight from '@/assets/knight-a-idle.gif'
  import knightEnemy from '@/assets/knight-b-idle.gif'
  import sound from '@/audio/steelsword.mp3'
  import backSound from '@/audio/09_-_00_-_Return_to_Prontera.mp3'
  export default {
    name: 'Arena',
    data() {
      return {
        word: '',
        typing: '',
        // damage: 0,
        playerStatus: [],
        username: '',
        hp: '',
        damages: [],
        healthbar: 100,
        sisaHp: 100,
        knight,
        knightEnemy,
        sound,
        backSound,
        bgm,
      }
    },
    methods: {
      matchWords() {
        if (this.typing == this.word) {
          // this.$store.dispatch('fetchWords')
          // this.$socket.emit('fetchWords')
          this.typing = ''
          let damage = this.word.length
          this.$socket.emit('sendAttack', { username: this.username, damage })

          // console.log(hit, healthbar, 'tes client')
          let soundEffect = new Audio(this.sound)
          soundEffect.play()

          // let dps = {
          //   username: localStorage.getItem('username'),
          //   damage: +this.damage,
          // }
        } else {
          this.typing = ''
        }
      },
    },
    sockets: {
      fetchWord(word) {
        console.log('receiving new word:', word)
        this.word = word
      },
      playerStatus(playerStatus) {
        // this.hp = localStorage.getItem('hp')
        this.playerStatus = playerStatus
        console.log(playerStatus, '<<< playerStatus')
      },

      finish(playerStatus) {
        this.playerStatus = playerStatus
        localStorage.removeItem('username')
        // playerStatus.forEach((player) => {
        //   if (player.username === this.username) {
        //     if (player.hp <= 0) {
        //       this.$router.push('/lose')
        //     } else {
        //       this.$router.push('/win')
        //     }
        //   }
        // })
        this.$router.push('/result')
      },
      // sendAttack(damages) {
      //   this.damages = damages
      //   let sender
      //   let hit = 0
      //   for (let i = 0; i < this.damages.length; i++) {
      //     hit = Number(this.damages[this.damages.length - 1].damage)
      //     sender = this.damages[i].username
      //   }
      //   let healthbar = localStorage.getItem('hp')
      //   if (sender !== this.username) {
      //     healthbar -= hit
      //   }
      //   localStorage.setItem('hp', healthbar)
      //   this.sisaHp = localStorage.getItem('hp')

      //   console.log(hit, healthbar, 'tes client')
      // },
    },
    created() {
      // this.$store.dispatch('fetchWords')
      console.log('created')
      this.$socket.emit('playerStatus')
      this.$socket.emit('fetchWord')
      this.username = localStorage.getItem('username')
      // console.log(localStorage.getItem('username'))
      console.log(this.username)
      this.bgm = new Audio(this.backSound)
      bgm.play()
    },
    mounted() {
      if (this.playerStatus.length === 0) {
        localStorage.removeItem('username')
        // this.$router.push('/welcome')
      }
    },
  }
</script>

<style>
  #word {
    position: absolute;
    top: 500px;
    color: white;
    font-size: 3rem;
    border-bottom: 5px solid white;
  }
</style>
