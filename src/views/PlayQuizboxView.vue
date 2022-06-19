<template>
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
        :true-value="category"
      />
      <label :for="'checkbox' + index"
        >{{ category.text }} {{ category.length }}</label
      >
    </li>
  </ul>
  <button :disabled="isDisabled" @click="startQuiz">Start Quiz</button>
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
      selectedOption: 0,
      options: [
        { text: "questions", value: 10 },
        { text: "questions", value: 20 },
        { text: "questions", value: 30 },
      ],
      categories: topics,
      checkedItems: [],

      numOfQuestionsPerTopic: [],
    };
  },

  methods: {
    async fetchQuestions() {
      for (let i = 0; i < topics.length; i++) {
        const response = await fetch(
          `https://raw.githubusercontent.com/coding-bootcamps-eu/quizbox/main/questions/${this.categories[i].value}.json`
        );

        this.questions = await response.json();

        this.numOfQuestionsPerTopic.push(this.questions.questions.length);
        this.categories[i].length = this.questions.questions.length;
      }
    },

    startQuiz() {
      let parameters = [];
      for (let i = 0; i < Object.keys(this.checkedItems).length; i++) {
        if (Object.values(this.checkedItems)[i] !== false) {
          parameters.push(Object.keys(this.checkedItems)[i]);
        }
      }

      const query = {};
      if (parameters.length !== 0) {
        query.selected = parameters.join(",");
      }
      if (this.selectedOption.length !== 0) {
        query.num = this.selectedOption;
      }
      router.push({
        name: "quiz-session",
        query: query,
      });
    },
  },
  computed: {
    totalQuestionsCount() {
      let sum = 0;
      this.checkedItems.forEach((el) => {
        if (el) {
          sum += el.length;
        }
      });
      return sum;
    },

    isDisabled() {
      if (this.selectedOption === 0) {
        return true;
      }
      return !(this.totalQuestionsCount >= this.selectedOption);
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
