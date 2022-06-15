import { createRouter, createWebHistory } from "vue-router";
import PlayQuizboxView from "../views/PlayQuizboxView.vue";
import BrowseQuestionsView from "../views/BrowseQuestionsView.vue";
import QuizboxSessionView from "../views/QuizboxSessionView.vue";

const routes = [
  {
    path: "/",
    name: "quizbox",
    component: PlayQuizboxView,
  },
  {
    path: "/browse-questions",
    name: "browse-questions",
    component: BrowseQuestionsView,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () =>
    // import(/* webpackChunkName: "about" */../views/BrowseQuestionsView.vueue"),
  },
  {
    path: "/quizsession",
    name: "quiz-session",
    component: QuizboxSessionView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
