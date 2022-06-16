<template>
  <h1>Quizbox Session</h1>
  <p>Question count: {{ count + "/" + totalOfQuestions }}</p>

  <p>{{ finalQuestions }}</p>
  <p>{{ finalQuestions[count - 1] }}</p>
  <button @click="nextQuestion">Next</button>
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
      finalQuestions: [],
      equalAmount: Number,
      totalOfQuestions: Number,
      restModulo: Number,
      count: 1,
      shuffledQuestions: [],
    };
  },

  async created() {
    this.checkedCategories = this.$route.query.selected.split(",");
    //  console.log("check Cat", this.checkedCategories);
    this.selectedCategory = topics.filter((topic, index) =>
      this.checkedCategories.includes(index.toString())
    );
    // console.log("selec Cat", this.selectedCategory);
    this.totalOfQuestions = this.$route.query.num;
    console.log(this.totalOfQuestions);

    await this.fetchQuestions();
    await this.numOfQuestionsPerTopic();
  },

  methods: {
    async fetchQuestions() {
      for (let i = 0; i < this.selectedCategory.length; i++) {
        //console.log(this.selectedCategory[i].value);
        const response = await fetch(
          `https://raw.githubusercontent.com/coding-bootcamps-eu/quizbox/main/questions/${this.selectedCategory[i].value}.json`
        );

        const { questions } = await response.json();
        this.questions.push(questions);
        for (let i = 0; i < this.questions.length; i++) {
          this.shuffledQuestions = this.shuffle(this.questions[i]);
        }
        console.log("huhu", this.questions);
      }
    },
    shuffle(a) {
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
    },

    async numOfQuestionsPerTopic() {
      this.equalAmount = Math.floor(
        this.totalOfQuestions / this.questions.length
      );
      this.restModulo = this.totalOfQuestions % this.questions.length;
      console.log("equal" + this.equalAmount);
      console.log("modulo" + this.restModulo);

      this.showOneQuestion();
    },
    showOneQuestion() {
      for (let i = 0; i < this.questions.length; i++) {
        for (let j = 0; j < this.equalAmount; j++) {
          this.finalQuestions.push(this.questions[i][j]);
        }
      }
      for (let i = 0; i < this.restModulo; i++) {
        this.finalQuestions.push(this.questions[0 + i][this.equalAmount]);
      }
      // return this.finalQuestions;
    },

    nextQuestion() {
      if (this.count < this.finalQuestions.length) {
        this.count++;
      } else {
        return (this.count = this.finalQuestions.length);
      }
    },
  },
};
</script>
