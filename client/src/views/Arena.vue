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
          <div class="col">
            <h3 class="text-white">health bar player 1</h3>
            <div id="myProgress1">
              <div id="myBar1"></div>
            </div>
          </div>
          <div class="col">
            <h3 class="text-white">health bar player 2</h3>
            <div id="myProgress2">
              <div id="myBar2"></div>
            </div>
          </div>
        </div>
        <!-- <div class="row">-->
        <!-- Buat characterr -->
        <!-- <h5 class="display-4 mb-5 ml-5" id="current-word">{{$store.state.currentWord}}</h5> -->
        <div class="row d-flex mt-5">
          <img :src="knight" width="50%" alt="" srcset="" />
          <img :src="knightEnemy" width="50%" alt="" srcset="" />
        </div>
      </div>
    </div>

    <!-- TYPE CONTAINER -->
    <div class="card card-type p-3 mt-3">
      <h1 class="display-5 ">
        <input
          type="text"
          v-on:keyup.enter="matchWords"
          v-model="typing"
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
        typing: '',
        damage: 0,
        onlineUsers: [],
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
        if (this.typing == this.$store.state.currentWord) {
          this.$store.dispatch('fetchWords')
          this.typing = ''
          this.damage = +this.$store.state.currentWord.length

          let dps = {
            username: localStorage.getItem('username'),
            damage: +this.damage,
          }
          this.$socket.emit('sendAttack', dps)
        } else {
          this.typing = ''
        }
      },
    },
    sockets: {
      userLogin(playerStatus) {
        this.username = localStorage.getItem('username')
        this.hp = localStorage.getItem('hp')
        this.onlineUsers = playerStatus
      },
      sendAttack(damages) {
        this.damages = damages
        let sender
        let hit = 0
        for (let i = 0; i < this.damages.length; i++) {
          hit = Number(this.damages[this.damages.length - 1].damage)
          sender = this.damages[i].username
        }
        let healthbar = localStorage.getItem('hp')
        if (sender !== this.username) {
          healthbar -= hit
        }
        localStorage.setItem('hp', healthbar)
        this.sisaHp = localStorage.getItem('hp')

        console.log(hit, healthbar, 'tes client')
        let soundEffect = new Audio(this.sound)
        soundEffect.play()
      },
    },
    created() {
      this.$store.dispatch('fetchWords')
      this.bgm = new Audio(this.backSound)
      bgm.play()
    },
  }
</script>

<style></style>
