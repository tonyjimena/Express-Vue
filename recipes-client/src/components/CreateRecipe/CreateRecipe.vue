<template>
<div>
  <div class='ui centered'>
    <router-link class='ui basic button' v-bind:to='{ name: "home"}'>
      <i class="chevron circle left icon"></i>
      Volver al inicio
    </router-link>
  </div>
  <div v-show='success' v-bind:class='{ "fadeIn": success, "fadeOut": !success }' class='animated ui icon message green'>
    <i class='check circle icon'></i>
    <div class='content'>
      <div class='header'>
        Receta almacenada con exito!
      </div>
      <p>Su receta ha sido almacenada con éxito, puede verla ahora, en el listado de recetas</p>
    </div>
  </div>
  <div class="divider"></div>
  <form class='ui form' v-on:submit.prevent='onSubmit'>
    <div class='required field'>
      <label>Título</label>
      <input v-model='title' type='text' name='title' placeholder='Título' required>
    </div>
    <div class='three fields'>
      <div class='required field'>
        <label>Personas</label>
        <input v-model='persons' type='number' placeholder='Personas' required>
      </div>
      <div class='required field'>
        <label>Tiemo (mins)</label>
        <input v-model='time' type='number' placeholder='Tiempo' required>
      </div>
      <div class='required field'>
        <label>Nivel</label>
        <select v-model='difficulty' class='ui fluid dropdown selection' tabindex='-1' required>
          <option value='easy'>Facil</option>
          <option value='medium'>Medio</option>
          <option value='difficult'>Dificil</option>
        </select>
      </div>
    </div>
    <div class='required field'>
      <label>Ingredientes</label>
      <textarea v-model='ingredients'></textarea>
    </div>
    <div class='required field'>
      <label>Receta</label>
      <textarea v-model='description'></textarea>
    </div>
    <button class='ui button' type='submit'>Submit</button>
  </form>
</div>
</template>

<script>
import http from 'axios'
export default {
  name: 'CreateRecipe',
  data () {
    return {
      title: '',
      persons: 0,
      time: 0,
      difficulty: 'easy',
      ingredients: '',
      description: '',
      success: false
    }
  },
  methods: {
    parseIngredients () {
      return this.ingredients.split('\n')
    },
    onSubmit () {
      const ingredients = this.parseIngredients()
      return http({
        method: 'POST',
        url: `${process.env.API}recipes`,
        headers: {
          'Authorization': localStorage.getItem('token')
        },
        data: {
          title: this.title,
          persons: this.persons,
          time: this.time,
          difficulty: this.difficulty,
          ingredients: ingredients,
          description: this.description
        }
      })
        .then(response => response.data)
        .then(data => {
          this.success = true

          setTimeout(() => {
            this.title = ''
            this.persons = 0
            this.time = 0
            this.difficulty = 'easy'
            this.ingredients = ''
            this.description = ''
            this.success = false
          }, 2000)
        })
    }
  }
}
</script>

<style>

</style>
