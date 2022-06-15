<template>
  <div class="about">
    <h1>BROWSE QUESTIONS</h1>
    <p>Choose a category with questions</p>
  </div>
  <select v-model="selectedOption" class="topic-selection" name="" id="topic">
    <option value="" disabled selected hidden>Select topic...</option>
    <option v-for="option in options" :key="option" :value="option.value">
      {{ option.text }}
    </option>
  </select>
  <p>Questions from the chapter</p>

  <ul>
    <li v-for="question in questions" :key="question">{{ question }}</li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      questions: [],
      selectedOption: "",
      options: [
        { text: "HTML and CSS Basics", value: "basics-html-css" },
        { text: "HTML and CSS Advanced", value: "advanced-html-css" },
        { text: "JavaScrips Basics", value: "basics-js" },
        { text: "First JavaScrips Web App", value: "first-js-web-app" },
        { text: "Terminal and Shell", value: "terminal-and-shell" },
      ],
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
      console.log(this.questions.questions);
    },

    //   showQuestion() {
    //     console.log("hallo");
    //     if (this.selected === "basics-html-css") {
    //       return this.questions;
    //     }
    //   },
    // },

    // async created() {
    //   await this.fetchQuestions();
    // },
  },
};
</script>

//export default // export default { name: "BrowseQuestionsView", };
