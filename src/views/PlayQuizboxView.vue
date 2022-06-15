<template>
  <!-- <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
   // <HelloWorld msg="Welcome to Your Vue.js App" />
  </div> -->
  <div class="about">
    <h1>PLAY QUIZBOX</h1>
    <p>Quiz time - test what you know</p>
  </div>
  <select v-model="selectedOption" class="topic-selection" name="" id="topic">
    <option v-for="option in options" :key="option" :value="option.value">
      {{ option.value }} {{ option.text }}
    </option>
  </select>
  <p>Question areas:</p>
  <p>{{ categories.length }}</p>
  <ul>
    <li v-for="(category, index) in categories" :key="category">
      <input
        v-model="checkedItems[index]"
        type="checkbox"
        name="checkbox"
        :id="'checkbox' + index"
        :checked="category.checked"
        :true-value="category.value"
      />
      <label :for="'checkbox' + index">{{ index }} - {{ category.text }}</label>
    </li>
  </ul>
  {{ checkedItems }}
  {{ selectedOption }}
  <button @click="startQuiz">Start Quiz</button>
  <p></p>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from "@/components/HelloWorld.vue";
import { topics } from "./../topics";
import router from "@/router";

export default {
  name: "PlayQuizboxView",
  data() {
    return {
      questions: [],
      selectedOption: "",
      options: [
        { text: "questions", value: 10 },
        { text: "questions", value: 20 },
        { text: "questions", value: 30 },
      ],
      categories: topics,
      checkedItems: {},
    };
  },

  methods: {
    async fetchQuestions() {
      for (let i = 0; i < topics.length; i++) {
        //console.log(this.categories[i].value);
        const response = await fetch(
          `https://raw.githubusercontent.com/coding-bootcamps-eu/quizbox/main/questions/${this.categories[i].value}.json`
        );

        this.questions = await response.json();
        this.questions = this.questions.questions;
        // console.log(this.questions);
        // console.log(this.questions.length);
      }
    },

    startQuiz() {
      router.push({
        name: "quiz-session",
        query: {
          selected: Object.keys(this.checkedItems).join(","),
          num: this.selectedOption,
        },
      });
    },
  },

  async created() {
    await this.fetchQuestions();
  },
  // components: {
  //   HelloWorld,
  // },
};
</script>
