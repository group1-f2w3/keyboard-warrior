<template>
<div class="container text-center">
  <div class="row">
      <div class="col-md-6 mx-auto">
        <p class="lead">Type The Given Word Within
          <span class="text-success" id="seconds">5</span> Seconds:</p>
        <h2 class="display-2 mb-5" id="current-word">{{$store.state.currentWord}}</h2>

        <input type="text" v-on:keyup.enter="matchWords" v-model="typing" class="form-control form-control-lg" placeholder="Start typing..." id="word-input" autofocus>
        <h4 class="mt-3" id="message"></h4>

        <!-- Time & Score Columns -->
        <div class="row mt-5">
          <div class="col-md-6">
            <h3>Time Left:
              <span id="time">0</span>
            </h3>
          </div>
          <div class="col-md-6">
            <h3>Score:
              <span id="score">{{this.damage}}</span>
            </h3>
          </div>
          <br><br>
          <div class="col">
            <h3>High Score:
              <span id="highscore">0</span>
            </h3>
          </div>
        </div>

        <!-- Instructions -->
        <div class="row mt-5">
          <div class="col-md-12">
            <div class="card card-body bg-secondary text-white">
              <h5>Instructions</h5>
              <p>Type each word in the given amount of seconds to score. To play again, just type the current word. Your score
                will reset</p>
            </div>
          </div>
        </div>
      </div>
    </div>
</div>
</template>

<script>
export default {
  name:'Fight',
  data(){
    return{
      typing:'',
      damage:0
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
    }
  },
  created(){
    this.$store.dispatch('fetchWords')
  }
}
</script>

<style>


</style>