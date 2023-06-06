<template>
  <div>
    <h2 class="title">Ulubione Filmy</h2>
    <ul>
      <li v-for="movie in favoriteMovies" :key="movie.id">
        <h3 class="movie-title">Nazwa filmu: {{ movie.Title }}</h3>
        <p>Reżyser: <span class="director">{{ movie.Director }}</span></p>
        <p>Rok wydania: <span class="year">{{ movie.Year }}</span></p>
        <p>Kategoria: <span class="genre">{{ movie.Genre }}</span></p>
      </li>
    </ul>
  </div> 
</template>

<script>
import { ref, onMounted } from 'vue';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

export default {
  name: 'AuthorizedService',
  setup() {
    const favoriteMovies = ref([]);

    onMounted(async () => {
      try {
        const userId = getAuth().currentUser.uid;
        const userCollectionRef = collection(getFirestore(), 'users');

        // Pobierz dokument użytkownika
        const userDocSnap = await getDocs(userCollectionRef);
        userDocSnap.forEach((doc) => {
          if (doc.id === userId) {
            // Pobierz tablicę favoriteMovies z dokumentu użytkownika
            favoriteMovies.value = doc.data().favoriteMovies;
          }
        });
      } catch (error) {
        console.error('Błąd pobierania ulubionych filmów', error);
      }
    });

    return {
      favoriteMovies,
    };
  },
};
</script>

<style lang="scss">
.title {
  text-align: center;
  font-size: 24px;
  margin-top: 16px;
  color: #FF6347;
}

ul {
  padding: 0;
  margin: 16px 0;
}

li {
  list-style: none;
  margin-bottom: 16px;
}

.movie-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 8px;
  color: #4682B4;
}

p {
  font-size: 16px;
  margin: 4px 0;
}

.director {
  color: #008000;
}

.year {
  color: #FF8C00;
}

.genre {
  color: #4B0082;
}


</style>