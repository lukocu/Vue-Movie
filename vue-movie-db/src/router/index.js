import { createRouter, createWebHistory } from 'vue-router'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import HomeMain from '../views/HomeMain.vue'
import MovieDetail from '../views/MovieDetail.vue'
import LoginService from '../views/LoginService.vue'
import AuthorizedService from '../views/AuthorizedService.vue'
import RegisterService from '../views/RegisterService.vue'


const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeMain
  },
 
  {
    path: '/movie/:id',
    name: 'Movie Detail',
    component: MovieDetail
  },
  {
    path: '/login',
    name: 'Login Service',
    component: LoginService
  },
  {
    path: '/register',
    name: 'Register Service',
    component: RegisterService
  },
  {
    path: '/authorized',
    name: 'Authorized Service',
    component: AuthorizedService,
    meta: {
      requiresAuth: true,
    }
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener();
        resolve(user);
      },
      reject
    );
  });
};

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (await getCurrentUser()) {
      next();
    } else {
      alert("Nie masz dostępu");
      next("/");
    }
  } else {
    next();
  }
});

export default router;