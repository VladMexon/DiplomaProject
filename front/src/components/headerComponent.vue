<template>
  <div class="header">
    <div class="logo">
      <img alt="logo" src="../assets/logo.webp" v-if="!detectMob()">
      <button @click="leftMenuVisible" v-if="detectMob()" class="menuButton"> <img alt="menu" src="../assets/menu.png"> </button>
      <a href="/app">Система оповещения</a>
    </div>
    <div class="name" v-if="userName">
      <p>{{ userName }}</p>
      <button class="modalButton" @click="openModal"><img src="../assets/arrowDown.png" width="30" height="30"
          alt="submit" /></button>
    </div>
  </div>
  <div class="modal" v-if="isModalOpen">
    <div class="content">
      <button @click="logout"> Выйти </button>
    </div>
  </div>
</template>

<script>
//import { useCookies} from "vue3-cookies";
export default {
  name: 'headerComponent',
  data() {
    return {
      isModalOpen: false
    }
  },
  computed: {
    userName() {
      let user = this.$store.getters['user/getUser'];
      if (user) {
        if (user.middle_name == null)
          user.middle_name = "";
        return user.second_name + ' '
          + user.first_name + ' '
          + user.middle_name;
      }
      return null;
    }
  },
  methods: {
    async logout() {
      await this.$store.dispatch('user/logout');
      this.$store.commit('notifications/CLEAR_NOTIFICATIONS');
      this.$store.commit('commentsStore/CLEAR');
      this.$router.push({ name: "loginPage" });
      this.openModal()
    },
    openModal() {
      this.isModalOpen = !this.isModalOpen;
    },
    detectMob() {
      return ((window.innerWidth <= 800));
    },
    leftMenuVisible() {
      return this.$store.commit('leftMenu/SET_VISIBLE');
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header {
  display: flex;
  align-items: center;
  background-color: #DEDEDE;
  border-bottom: solid;
  justify-content: space-between;
  height: 50px;
  width: 100%;
}

.logo {
  display: flex;
  align-items: center;
}

.name {
  display: flex;
  align-items: center;
}

.logo a {
  margin-left: 10px;
  font-size: 1.3rem;
  font-weight: 400;
}

.logo img {
  height: 50px;
  width: 50px;
}

.modal {
  position: fixed;
  margin: auto;
  width: 100px;
  height: 100x;
  right: 0px;
  border: solid;
  border-top: none;
  border-right: none;
  padding: 10px;
  background-color: #DEDEDE;
}

.content {
  display: flex;
  justify-content: center;
  flex-direction: column;
  height: 100px;
  width: 100px;
}

.modalButton {
  width: 40px;
  height: 30px;
  border: 0;
  background: none;
}

.menuButton {
  margin-left: 0px;
  height: 50px;
  width: 50px;
  border: 0;
  background: none;
}

a {
  text-decoration: none;
  border: none;
}
</style>