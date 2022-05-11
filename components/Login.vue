<template>
  <div class='w-screen h-screen flex items-center justify-center'>
    <div class='container p-8 bg-white rounded-lg filter drop-shadow mx-auto md:w-1/3 text-primary' >
        <button class='w-full rounded-full py-2 text-secondary my-2 border border-gray-200 drop-shadow filter flex-row justify-center' @click='googleLogin'>
          <icons-google-icon class='h-6 inline mr-2'/> Login with Google
        </button>
    </div>
  </div>
</template>


<script lang="ts">
import Vue from "vue";
import { Component } from "nuxt-property-decorator";
import { GoogleAuthProvider } from "firebase/auth";
const googleProvider = new GoogleAuthProvider();

@Component
export default class IndexPage extends Vue {

  async mounted() {
    await this.$fire.auth.getRedirectResult()
  }

  async googleLogin() {
    await this.signInWithProvider()
    // await this.signInWithPassword('loic@nuom.co.uk', '123456');
    // this.$fire.auth.signInWithRedirect(googleProvider);
  }

  async signInWithPassword(email: string, password: string) {
    const result = await this.$fire.auth.signInWithEmailAndPassword(email, password);

    console.log(result)
    await this.$router.push('/times');
  }


  async signInWithProvider() {
    try {
      const result = await this.$fire.auth.signInWithPopup(googleProvider)

      console.log(result)

      if(!result.user) {
        throw new Error('User is not logged in')
      }

      const email = result.user.email;

      const domain = email?.split('@')[1];

      if(domain !== 'nuom.co.uk') {
        throw new Error('Only nuom users allowed')
      }
      await this.$store.dispatch('auth/userLoggedIn')
      await this.$router.push('/times');

    } catch (e: any) {
      if(e.code === 'auth/popup-blocked') {
        await this.$fire.auth.signInWithRedirect(googleProvider)
      } else {
        await this.$fire.auth.signOut()
        console.error(e)
      }
    }
  }

}
</script>
