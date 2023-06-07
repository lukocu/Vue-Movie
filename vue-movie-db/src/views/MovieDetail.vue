<template>
  <div class="movie-detail">
    <h2>{{ movie.Title }}</h2>
    <p>{{ movie.Year }}</p>
    <img :src="movie.Poster" alt="Movie Poster" class="featured-img" />
    <p>{{ movie.Plot }}</p>
    <div class="button-container">
      <button @click="addToFavorites(movie)" :disabled="isAddedToFavorites" class="favorite-button">
        {{ isAddedToFavorites ? 'Dodano do ulubionych' : 'Dodaj do ulubionych' }}
      </button>
      <p v-if="showSuccessMessage" class="success-message">Świetnie! Film został dodany do ulubionych.</p>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { getDocs } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { setDoc, updateDoc, doc } from 'firebase/firestore';
import { getFirestore, collection } from 'firebase/firestore';
import { useRoute } from 'vue-router';
import env from '@/env.js';

export default {
  setup() {
    const movie = ref({});
    const favoriteMovies = ref([]);
    const isAddedToFavorites = ref(false);
    const showSuccessMessage = ref(false);

    const addToFavorites = async (movie) => {
      try {
        const userId = getAuth().currentUser.uid;
        const userCollectionRef = collection(getFirestore(), 'users');
        const userDocRef = doc(userCollectionRef, userId);

        // Sprawdź, czy użytkownik jest już w kolekcji "users"
        const userDocSnap = await getDocs(userCollectionRef);
        if (userDocSnap.empty) {
          // Jeśli użytkownik nie istnieje, utwórz nowy dokument
          await setDoc(userDocRef, {
            favoriteMovies: { [movie.imdbID]: movie }, // Dodaj pierwszy film do obiektu
          });
        } else {
          // Jeśli użytkownik już istnieje, pobierz aktualny dokument użytkownika
          const userDoc = userDocSnap.docs[0];
          const userDocData = userDoc.data();
          const currentFavoriteMovies = userDocData.favoriteMovies || {};

          // Sprawdź, czy film o tym samym imdbID już istnieje
          if (!currentFavoriteMovies[movie.imdbID]) {
            // Jeśli film nie istnieje, dodaj go do obiektu favoriteMovies
            const updatedFavoriteMovies = {
              ...currentFavoriteMovies,
              [movie.imdbID]: movie,
            };
            await updateDoc(userDocRef, {
              favoriteMovies: updatedFavoriteMovies,
            });
            favoriteMovies.value.push(movie);
            isAddedToFavorites.value = true; // Ustaw flagę, że film został dodany do ulubionych
            showSuccessMessage.value = true; // Wyświetl komunikat o sukcesie
          }
        }
      } catch (error) {
        console.error('Błąd dodawania filmu do ulubionych', error);
      }
    };

    const route = useRoute();
    fetch(`http://www.omdbapi.com/?apikey=${env.apikey}&i=${route.params.id}&plot=full`)
      .then((response) => response.json())
      .then((data) => {
        movie.value = data;
      });

    return {
      movie,
      addToFavorites,
      favoriteMovies,
      isAddedToFavorites,
      showSuccessMessage,
    };
  },
};
</script>

<style lang="scss">
.movie-detail {
  padding: 16px;

  h2 {
    color: #fff;
    font-size: 28px;
    font-weight: 600;
    margin-bottom: 16px;
  }

  .featured-img {
    display: block;
    max-width: 200px;
    margin-bottom: 16px;
  }

  p {
    color: #fff;
    font-size: 18px;
    line-height: 1.4;
  }

  .button-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 16px;
  }

  .favorite-button {
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    background-color: #007bff;
    color: #fff;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
  }

  .favorite-button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  .success-message {
    color: green;
    font-weight: bold;
    margin-top: 16px;
  }
}
</style>