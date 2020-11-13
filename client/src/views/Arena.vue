<template>
  <section class="arena-page">
      <div class="card card-arena">
        <div class="container">
          <div class="row">
            <div class="col">
              <h3 v-for="(user,i) in onlineUsers" :key="i">{{user}}</h3>
              <div id="myProgress1">
                <div id="myBar1"></div>
              </div>
            </div>
            <div class="col">
              <h3>{{user}}</h3>
              <div id="myProgress2">
                <div id="myBar2"></div>
              </div>
            </div>
          </div>
          <div class="row">
            <!-- Buat characterr -->
            <h5 class="display-4 mb-5 ml-5" id="current-word">{{$store.state.currentWord}}</h5>
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
export default {
  name: 'Arena',
  data(){
    return{
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
    sockets:{
      userLogin({onlineUsers,playerStatus}){
        console.log(onlineUsers,playerStatus)
        this.onlineUsers = onlineUsers
        this.playerStatus = playerStatus
      }
    }
  },
  created(){
    this.$store.dispatch('fetchWords')
  }
}
</script>

<style>

</style>