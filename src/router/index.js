import { createRouter, createWebHistory } from "vue-router";
import PlayQuizboxView from "../views/PlayQuizboxView.vue";
import BrowseQuestionsView from "../views/BrowseQuestionsView.vue";
import QuizboxSessionView from "../views/QuizboxSessionView.vue";

const routes = [
  {
    path: "/play-quizbox",
    name: "quizbox",
    component: PlayQuizboxView,
  },
  {
    path: "/browse-questions",
    name: "browse-questions",
    component: BrowseQuestionsView,
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
