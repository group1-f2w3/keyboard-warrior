<template>
  <section class="arena-page">
      <div class="card card-arena">
        <div class="container">
          <div class="row">
            <div class="col">
              <div v-for="(user,i) in onlineUsers" :key="i">
                <h3>{{user.username}}</h3> 
                <div id="myProgress1">
                  <div id="myBar1">{{user.hp}}</div>
                </div>
              </div>
              <h5 class="display-4 mb-5 ml-5" id="current-word">{{$store.state.currentWord}}</h5>
            </div>
          </div>
          <div class="row mt-5 d-flex">
            <!-- Buat characterr -->
              <img :src="knight" width="50%" alt="" srcset="">
              <img :src="knightEnemy" width="50%" alt="" srcset="">
          </div>
         </div>
      </div>
      <!-- TYPE CONTAINER -->
      <div class="card card-type p-3 mt-3">
        <h1 class="display-5 ">
          <input type="text" v-on:keyup.enter="matchWords" v-model="typing" class="form-control form-control-lg" placeholder="Type To Attack.." id="word-input" autofocus>
        </h1>
      </div>
    </section>
</template>

<script>
import knight from '@/assets/knight-a-idle.gif'
import knightEnemy from '@/assets/knight-b-idle.gif'
export default {
  name: 'Arena',
  data(){
    return{
      knight,
      knightEnemy,
      typing:'',
      damage:0,
      onlineUsers:[],
      playerStatus:[]

    }
  },
  methods:{
    matchWords(){
      if(this.typing == this.$store.state.currentWord){
        this.$store.dispatch('fetchWords')
        this.typing = ''
        this.damage = this.$store.state.currentWord.length
        this.$socket.emit('sendAttack',{damage:this.damage})
      }else{
        this.typing =''
      }
    },
  },
  sockets:{
      userLogin(onlineUsers){
        console.log(onlineUsers)
        this.onlineUsers = onlineUsers
 
      }
    },
  created(){
    this.$store.dispatch('fetchWords')
  }
}
</script>

<style>

</style>