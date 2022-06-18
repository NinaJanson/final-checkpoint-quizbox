<template>
  <div class="title-subtitle">
    <h2>Quizbox Session</h2>
    <span class="subtitle">{{ subTitleOne }}</span>
    <span class="subtitle">{{ subTitleTwo }}</span>
  </div>
  <div v-if="this.count < this.totalNumber">
    <p class="question">{{ finalQuestions[count] }}</p>

    <button @click="nextQuestion">Next Question</button>
  </div>
  <div v-else>
    <p class="question">
      Congratulations! <br />
      You finished the Quizbox session.
    </p>
    <button @click="backToHomePage">Finished</button>
  </div>
</template>

<script>
import { topics } from "./../topics";
import router from "@/router";
export default {
  name: "QuizboxSessionView",
  data() {
    return {
      questions: [],
      checkedCategories: [],
      selectedCategory: [],
      finalQuestions: [],
      equalAmount: Number,
      totalNumber: Number,
      restModulo: Number,
      count: 0,
      shuffledQuestions: [],
      // buttonText: "Next",
      subTitleOne: "",
      subTitleTwo: "",
      text: "",
    };
  },

  async created() {
    this.checkedCategories = this.$route.query.selected.split(",");

    this.selectedCategory = topics.filter((topic, index) =>
      this.checkedCategories.includes(index.toString())
    );

    this.totalNumber = this.$route.query.num;

    this.subTitleOne = "Question count: ";
    this.subTitleTwo = this.count + 1 + "/" + this.totalNumber;
    await this.fetchQuestions();
    await this.numOfQuestionsPerTopic();
  },

  methods: {
    async fetchQuestions() {
      for (let i = 0; i < this.selectedCategory.length; i++) {
        const response = await fetch(
          `https://raw.githubusercontent.com/coding-bootcamps-eu/quizbox/main/questions/${this.selectedCategory[i].value}.json`
        );

        const { questions } = await response.json();
        this.questions.push(questions);
        for (let i = 0; i < this.questions.length; i++) {
          this.shuffledQuestions = this.shuffle(this.questions[i]);
        }
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
      this.equalAmount = Math.floor(this.totalNumber / this.questions.length);
      this.restModulo = Math.min(this.totalNumber) % this.questions.length;

      this.createQuestionsArray();
    },
    createQuestionsArray() {
      for (let i = 0; i < this.questions.length; i++) {
        for (let j = 0; j < this.equalAmount; j++) {
          this.finalQuestions.push(this.questions[i][j]);
        }
      }
      for (let i = 0; i < this.restModulo; i++) {
        this.finalQuestions.push(this.questions[0 + i][this.equalAmount]);
      }
      // this.text = this.finalQuestions[this.count - 1];
      // return this.finalQuestions;
    },

    nextQuestion() {
      if (this.count < this.totalNumber - 1) {
        this.count++;
        this.buttonText = "Next";
        this.subTitleOne = "Question count:";
        this.subTitleTwo = this.count + 1 + "/" + this.finalQuestions.length;
        this.text = this.finalQuestions[this.count - 1];
      } else {
        this.count = this.totalNumber;
        this.subTitleOne = "Session finished";
        this.subTitleTwo = "";
        //this.text = "Congratulations! You finished the Quizbox Session";
      }
      this.finishText();
    },

    finishText() {
      console.log("arraylength " + this.finalQuestions);
      console.log("total num " + this.totalNumber);
      for (let i = 0; i < this.finalQuestions.length; i++) {
        console.log("finQues i" + this.finalQuestions[i]);
        if (this.finalQuestions.indexOf[i] < this.totalNumber) {
          this.text = this.finalQuestions[this.count - 1];
        } else {
          this.text = "Congratulations! You finished the Quizbox Session";
        }
      }
    },
    backToHomePage() {
      router.push({
        name: "quizbox",
      });
    },
  },
};
</script>

<style scoped>
span + span {
  margin: 2rem;
}
.question {
  font-weight: bold;
  font-size: 1.3rem;
  text-align: center;
  height: 7rem;
  margin: 5rem 0 0 0;
  align-content: center;
  justify-content: center;
}
</style>
