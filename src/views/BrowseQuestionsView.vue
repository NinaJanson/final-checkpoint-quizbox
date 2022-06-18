<template>
  <div class="title-subtitle">
    <h2>BROWSE QUESTIONS</h2>
    <p class="subtitle">Choose a category with questions</p>
  </div>
  <select v-model="selectedOption" class="dropdown" name="" id="topic">
    <option value="" disabled selected hidden>Select topic...</option>
    <option v-for="option in options" :key="option" :value="option.value">
      {{ option.text }}
    </option>
  </select>
  <section class="chapter-amount-questions">
    <span>Questions from the chapter:</span>
    <span>{{ questions.length }}</span>
  </section>
  <ul id="list">
    <li id="list-entries" v-for="question in questions" :key="question">
      {{ question }}
    </li>
  </ul>
</template>

<script>
import { topics } from "./../topics";
export default {
  name: "BrowseQuestionsView",
  data() {
    return {
      questions: [],
      selectedOption: "",
      options: topics,
    };
  },

  watch: {
    async selectedOption(newVal) {
      const response = await fetch(
        "https://raw.githubusercontent.com/coding-bootcamps-eu/quizbox/main/questions/" +
          newVal +
          ".json"
      );

      this.questions = await response.json();
      this.questions = this.questions.questions;
    },
  },
};
</script>

<style scoped>
#list {
  all: unset;
  font-weight: bold;
}

#list-entries {
  all: unset;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  border-bottom: 1px solid rgba(0, 0, 0, 0.87);
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  padding-left: 2rem;
}
</style>
