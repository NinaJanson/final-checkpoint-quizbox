<template>
  <h1>Quizbox Session</h1>
  {{ $route.query.selected }}
</template>

<script>
import { topics } from "./../topics";
export default {
  name: "QuizboxSessionView",

  created() {
    const checkedCategories = this.$route.query.selected.split(",");
    console.log(checkedCategories);
    const filter = topics.filter((topic, index) =>
      checkedCategories.includes(index.toString())
    );
    console.log(filter);
    const totalOfQuestions = this.$route.query.num;
    console.log(totalOfQuestions);
  },
};
</script>
