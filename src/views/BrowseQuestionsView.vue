<template>
  <div class="title-subtitle">
    <h2>BROWSE QUESTIONS</h2>
    <p class="subtitle">Choose a category with questions</p>
  </div>
  <div class="dropdown-container">
    <select v-model="selectedOption" class="dropdown" name="" id="topic">
      <option value="" disabled selected hidden>Select topic...</option>
      <option v-for="option in options" :key="option" :value="option.value">
        {{ option.text }}
      </option>
    </select>

    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      class="bi bi-chevron-compact-down dropdown-arrow"
      viewBox="0 0 16 16"
    >
      <path
        fill-rule="evenodd"
        d="M1.553 6.776a.5.5 0 0 1 .67-.223L8 9.44l5.776-2.888a.5.5 0 1 1 .448.894l-6 3a.5.5 0 0 1-.448 0l-6-3a.5.5 0 0 1-.223-.67z"
      />
    </svg>
  </div>
  <section class="amount-questions">
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
