<template>
  <section class="arena-page">
    <div class="card card-arena">
      <div class="container">
        <div class="row">
          <div class="col">
            <div v-for="(user, i) in onlineUsers" :key="i">
              <h3>{{ user.username }}</h3>
              <div id="myProgress1">
                <div id="myBar1">{{ user.hp }}</div>
              </div>
            </div>
            <h5 class="display-4 mb-5 ml-5 text-white" id="current-word">
              {{ $store.state.currentWord }}
            </h5>
          </div>
        </div>
        <div class="row mt-5 d-flex">
          <!-- Buat characterr -->
          <img :src="knight" width="50%" alt="" srcset="" />
          <img :src="knightEnemy" width="50%" alt="" srcset="" />
           <div class="d-flex justify-content-center">
        <button
          type="button"
          class="btn btn-danger"
          data-toggle="modal"
          data-target="#exampleModalCenter"
        >
          How to play
        </button>

        <div
          class="modal fade"
          id="exampleModalCenter"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">
                  How To Play Keyboard Warrior
                </h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">1. Ketik kata yang muncul pada arena di card yang telah disediakan <br>
              2. Ketika anda mengetik kata yang ada, anda akan menyerang musuh dengan damage sesuai dengan panjang kata <br>
              3. Pemenang akan di tentukan setelah salah satu pemain healthbar nya 0</div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
        </div>
        
      </div>
    </div>
    <!-- TYPE CONTAINER -->
    <div class="card card-type p-3 mt-3">
      <h1 class="display-5">
        <input
          type="text"
          v-on:keyup.enter="matchWords"
          v-model="typing"
          class="form-control form-control-lg"
          placeholder="Type To Attack.."
          id="word-input"
          autofocus
          autocomplete="off"
        />
      </h1>
    </div>
  </section>
</template>

<script>
import knight from "@/assets/knight-a-idle.gif";
import knightEnemy from "@/assets/knight-b-idle.gif";
export default {
  name: "Arena",
  data() {
    return {
      knight,
      knightEnemy,
      typing: "",
      damage: 0,
      onlineUsers: [],
      playerStatus: [],
    };
  },
  methods: {
    matchWords() {
      if (this.typing == this.$store.state.currentWord) {
        this.$store.dispatch("fetchWords");
        this.typing = "";
        this.damage = this.$store.state.currentWord.length;
        this.$socket.emit("sendAttack", { damage: this.damage });
      } else {
        this.typing = "";
      }
    },
  },
  sockets: {
    userLogin(onlineUsers) {
      console.log(onlineUsers);
      this.onlineUsers = onlineUsers;
    },
  },
  created() {
    this.$store.dispatch("fetchWords");
  },
};
</script>

<style>
</style>