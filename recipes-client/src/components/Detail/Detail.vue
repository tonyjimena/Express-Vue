<template>
  <div>
    <div class="ui centered">
      <router-link class="ui basic button" v-bind:to="{ name: 'home' }">
        <i class="chevron circle left icon"></i>
        Volver al inicio
      </router-link>
    </div>
    <div class="ui centered segment">
      <h1 class="ui header">{{ recipe.title }}</h1>
      <div class="ui container">
        <div class="ui equal width grid">
          <div class="column">
            <h2 class="ui sub header">Personas</h2>
            <span>{{ recipe.persons }}</span>
          </div>
          <div class="column">
            <h2 class="ui sub header">Tiempo</h2>
            <span>{{ recipe.time }} mins</span>
          </div>
          <div class="column">
            <h2 class="ui sub header">Dificultad</h2>
            <span>{{ recipe.difficulty }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="divider"></div>
    <div class="ui container">
      <div class="ui grid">
        <div class="six wide column">
          <h1 class="ui dividing header">Ingredientes</h1>
          <div class="ui link list">
            <div
              v-for="(ing, index) in recipe.ingredients"
              :key="{ index }"
              class="item"
            >
              {{ ing }}
            </div>
          </div>
        </div>
        <div class="ten wide column">
          <h1 class="ui dividing header">Receta</h1>
          <div>{{ recipe.description }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import http from 'axios'
export default {
  name: 'Detail',
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      recipe: {}
    }
  },
  mounted () {
    this.getRecipe()
  },
  methods: {
    getRecipe () {
      return http({
        method: 'GET',
        url: `${process.env.API}recipes/${this.id}`,
        headers: {
          'Authorization': localStorage.getItem('token')
        }
      })
        .then(response => response.data)
        .then(data => {
          this.recipe = data
          console.log(data)
        })
    }
  }
}
</script>

<style></style>
