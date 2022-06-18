<template>
  <div class="title-subtitle">
    <h2>PLAY QUIZBOX</h2>
    <p class="subtitle">Quiz time - test what you know</p>
  </div>
  <select v-model="selectedOption" class="dropdown" name="" id="topic">
    <option v-for="option in options" :key="option" :value="option.value">
      {{ option.value }} {{ option.text }}
    </option>
  </select>
  <section class="amount-questions">
    <span>Question areas:</span>
    <span>{{ categories.length }}</span>
  </section>
  <ul class="list">
    <li
      class="list-topics"
      v-for="(category, index) in categories"
      :key="category"
    >
      <input
        v-model="checkedItems[index]"
        type="checkbox"
        name="checkbox"
        class="checkbox"
        :id="'checkbox' + index"
        :checked="category.checked"
        :true-value="category"
      />
      <div class="label-div">
        <label class="label-topic" :for="'checkbox' + index"
          >{{ category.text }}
        </label>
        <label class="label-questions" :for="'checkbox' + index"
          >Questions {{ category.length }}</label
        >
      </div>
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

<style scoped>
.list {
  all: unset;
}
.list-topics {
  all: unset;
  display: flex;
  flex-direction: row;
  margin-left: 1rem;
  align-content: baseline;
}
.list .list-topics {
  margin-bottom: 1rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.87);
  gap: 1rem;
}

.label-div {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
}
.label-topic {
  font-weight: 600;
}

.label-questions {
  font-size: 0.8rem;
}
.checkbox {
  all: unset;
  border: #8849cf 1px solid;
  min-width: 1.2rem;
  max-height: 1.2rem;
  border-radius: 2px;
  margin-top: 0.5rem;
}

.checkbox:checked {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' aria-hidden='true' focusable='false' %3E%3Cpath fill='none' stroke='rgba(136, 73, 207, 1)' stroke-width='2.5' d='M1.73 12.91l6.37 6.37L22.79 4.59' /%3E%3C/svg%3E");
}
</style>
