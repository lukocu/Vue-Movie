<template>
  <div class="home">
    <div class="feature-card">
      <router-link to="/movie/tt0372784">
        <img src="https://fwcdn.pl/fpo/63/76/106376/7115941.3.jpg" alt="Batman Poster" class="featured-img" />
        <div class="detail">
          <h3>Batman</h3>
          <p>Batman ,Opowiada o dzieciństwie bohatera, jego pobycie na Dalekim Wschodzie oraz początkach działalności człowieka-nietoperza.</p>
        </div>
      </router-link>
    </div>

    <form @submit.prevent="SearchMovies()" class="search-box">
      <input type="text" placeholder="Jakiego filmu szukasz?" v-model="search" />
      <input type="submit" value="Szukaj" />
    </form>

    <div class="movies-list">
      <div class="movie" v-for="movie in movies" :key="movie.imdbID">
        <router-link :to="'/movie/' + movie.imdbID" class="movie-link">
          <div class="product-image">
            <img :src="movie.Poster" alt="Movie Poster" />
            <div class="type">{{ movie.Type }}</div>
          </div>
          <div class="detail">
            <p class="year">{{ movie.Year }}</p>
            <h3>{{ movie.Title }}</h3>
          </div>
        </router-link>
      </div>
    </div>

    <div class="suggested-movie">
      <h2>Co dziś obejrzeć?</h2>
      <div class="movie-container">
        <div class="movie" v-for="suggestedMovie in filteredSuggestedMovies" :key="suggestedMovie.imdbID">
          <router-link :to="'/movie/' + suggestedMovie.imdbID" class="movie-link">
            <div class="product-image">
              <img :src="suggestedMovie.Poster" alt="Movie Poster" />
              <div class="type">{{ suggestedMovie.Type }}</div>
            </div>
            <div class="detail">
              <p class="year">{{ suggestedMovie.Year }}</p>
              <h3>{{ suggestedMovie.Title }}</h3>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
  
  
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import env from '@/env.js';

export default {
  setup() {
    const search = ref("");
    const movies = ref([]);
    const suggestedMovies = ref([]);

    const SearchMovies = () => {
      if (search.value != "") {
        fetch(`http://www.omdbapi.com/?apikey=${env.apikey}&s=${search.value}`)
          .then(response => response.json())
          .then(data => {
            movies.value = data.Search;
            search.value = "";
          });
      }
    };

    const fetchSuggestedMovies = () => {
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth() + 1;
      const currentDay = currentDate.getDate();

      const formattedDate = `${currentYear}-${currentMonth}-${currentDay}`;

      fetch(`http://www.omdbapi.com/?apikey=${env.apikey}&s=popular&y=${formattedDate}`)
        .then(response => response.json())
        .then(data => {
          suggestedMovies.value = data.Search;
        });
    };

    const filteredSuggestedMovies = computed(() => {
      return suggestedMovies.value.slice(0, 3);
    });

    onMounted(fetchSuggestedMovies);

    return {
      search,
      movies,
      suggestedMovies,
      filteredSuggestedMovies,
      SearchMovies
    };
  }
};
</script>

<style lang="scss">
.home {
  .feature-card {
    position: relative;

    .featured-img {
      display: block;
      width: 100%;
      height: 300px;
      object-fit: cover;

      position: relative;
      z-index: 0;
    }

    .detail {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.6);
      padding: 16px;
      z-index: 1;

      h3 {
        color:#FFF;
        margin-bottom: 16px;
      }

      p {
        color: #FFF;
      }
    }
  }

  .search-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 16px;

    input {
      display: block;
      appearance: none;
      border: none;
      outline: none;
      background: none;

      &[type="text"] {
        width: 100%;
        color: #FFF;
        background-color: #496583;
        font-size: 20px;
        padding: 10px 16px;
        border-radius: 8px;
        margin-bottom: 15px;
        transition: 0.4s;

        &::placeholder {
          color: #f3f3f3;
        }

        &:focus {
          box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.2);
        }
      }

      &[type="submit"] {
        width: 100%;
        max-width: 300px;
        background-color: #42B883;
        padding: 16px;
        border-radius: 8px;
        color: #FFF;
        font-size: 20px;
        text-transform: uppercase;
        transition: 0.4s;

        &:active {
          background-color: #3B8070;
        }
      }
    }
  }
  .suggested-movie {
  margin-top: 32px;
}

.suggested-movie h2 {
  text-align: center;
  color: #FFF;
  font-size: 24px;
  margin-bottom: 16px;
}

.movie-container {
    display: flex;
    flex-wrap: wrap;
    margin-top: 16px;

    .movie {
      flex: 0 0 33.333%;
      max-width: 33.333%;
      padding: 0 8px;

      .movie-link {
        display: flex;
        flex-direction: column;
        height: 100%;

        .product-image {
          position: relative;
          display: block;

          img {
            display: block;
            width: 100%;
            height: 275px;
            object-fit: cover;
          }

          .type {
            position: absolute;
            padding: 8px 16px;
            background-color: #42B883;
            color: #FFF;
            bottom: 16px;
            left: 0px;
            text-transform: capitalize;
          }
        }

        .detail {
          background-color: #496583;
          padding: 16px 8px;
          flex: 1 1 100%;
          border-radius: 0px 0px 8px 8px;

          .year {
            color: #AAA;
            font-size: 14px;
          }

          h3 {
            color: #FFF;
            font-weight: 600;
            font-size: 18px;
          }
        }
      }
    }
  }
}
</style>