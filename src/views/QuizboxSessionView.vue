<template>
  <h1>Quizbox Session</h1>
  {{ $route.query.selected }}
  {{ questions }}
</template>

<script>
import { topics } from "./../topics";
export default {
  name: "QuizboxSessionView",
  data() {
    return {
      questions: [],
      checkedCategories: [],
      selectedCategory: [],
    };
  },

  async created() {
    this.checkedCategories = this.$route.query.selected.split(",");
    console.log("check Cat", this.checkedCategories);
    this.selectedCategory = topics.filter((topic, index) =>
      this.checkedCategories.includes(index.toString())
    );
    console.log("selec Cat", this.selectedCategory);
    const totalOfQuestions = this.$route.query.num;
    console.log(totalOfQuestions);

    await this.fetchQuestions();
  },

  methods: {
    async fetchQuestions() {
      console.log("halllooo");
      for (let i = 0; i < this.selectedCategory.length; i++) {
        console.log(this.selectedCategory[i].value);
        const response = await fetch(
          `https://raw.githubusercontent.com/coding-bootcamps-eu/quizbox/main/questions/${this.selectedCategory[i].value}.json`
        );

        const { questions } = await response.json();
        this.questions.push(questions);
        console.log(this.questions);
        // console.log(this.questions.length);
      }
    },
  },
};
</script>
