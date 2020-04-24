<template>
<div class='ui two column centered grid'>
  <div class='column'>
    <form class='ui form' v-on:submit.prevent='onSubmit'>
      <div class='required field'>
        <label>Email</label>
        <input v-model='email' type='email' name='email' placeholder='tu@correo.com' required>
      </div>
      <button class='ui button' type='submit'>Acceder</button>
    </form>
  </div>
</div>
</template>

<script>
import http from 'axios'
export default {
  name: 'Login',
  data () {
    return {
      email: ''
    }
  },
  methods: {
    onSubmit () {
      return http({
        method: 'POST',
        url: `${process.env.API}auth`,
        data: {
          email: this.email
        }
      })
        .then(response => response.data)
        .then(data => {
          localStorage.setItem('token', `JWT ${data.token}`)
          setTimeout(() => {
            this.$router.push({name: 'home'})
          }, 1000)
        })
    }
  }
}
</script>

<style>

</style>
