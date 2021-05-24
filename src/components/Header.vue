<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary shadow mb-5">
    <a class="navbar-brand" href="#">Auth İşlemleri</a>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <router-link class="nav-item" tag="li" to="/" >
          <a class="nav-link" href="javascript:;"> Anasayfa  </a>
        </router-link>

        <router-link class="nav-item" tag="li" to="/About" >
          <a class="nav-link" href="javascript:;"> Hakkımızda  </a>
        </router-link>
      </ul>
      <ul class="navbar-nav my-2 my-lg-0" :class="logoutClass">
        <li class="nav-item">
          
          <a @click.prevent="logout" class="nav-link" href="#">Çıkış Yap</a>
        </li> 
      </ul>
    </div>
  </nav>
</template>
<script>
  export default {
    methods: {
      logout() {
        this.$store.dispatch("logout");
        // this.$router.push("/auth");
      }
    },
    computed: {
      logoutClass() {
        return {
          //sistemde token var mı kontrol et. varsa gözük yoksa gözükme
          'd-none': !this.$store.getters.isAuthenticadet
        }
      }
    }
  }
</script>
