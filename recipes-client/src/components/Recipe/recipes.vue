<template>
<div class='ui centered cards'>
  <div v-for='card in cards' class='ui card'>
    <div class='content'>
      <div class='header'>{{ card.title }}</div>
    </div>
    <div class='content'>
      <h4 class='ui sub header'>Ingredients</h4>
      <div class='ui small feed'>
        <div class='event'>
          <div class='content'>
            <div class='summary'>
              <div class='ui link list'>
                <div v-for='ing in card.ingredients' class='item'>{{ ing }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class='extra content'>
      <router-link class='ui button' v-bind:to='{ name: "detail", params: { id: card._id }}'>Receta completa</router-link>
    </div>
  </div>
</div>
</template>

<script>
import http from 'axios'
export default {
  name: 'recipe',
  data () {
    return {
      cards: []
    }
  },
  mounted () {
    this.getRecipes()
  },
  methods: {
    getRecipes () {
      return http({
        method: 'GET',
        url: `${process.env.API}recipes`,
        headers: {
          'Authorization': localStorage.getItem('token')
        }
      })
        .then(response => response.data)
        .then(data => {
          this.cards = data
          console.log(data)
        })
    }
  }
}
</script>

<style>

</style>
