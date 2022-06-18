<template>
  <header id="header">
    <div class="header_bottom">
      <svg
        class="svg-arrow1"
        width="100%"
        height="100%"
        fill="currentColor"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <polygon points="0,0 50,100 100,0"></polygon>
      </svg>
      <svg
        class="svg-arrow2"
        width="100%"
        height="100%"
        fill="currentColor"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <polygon points="0,0 50,100 100,0"></polygon>
      </svg>
    </div>
    <h1 id="title">QUIZBOX</h1>
    <nav>
      <router-link :to="{ name: 'quizbox' }">Quizbox</router-link>
      <router-link :to="{ name: 'browse-questions' }"
        >Browse Questions</router-link
      >
      <!-- <router-link :to="{ name: 'quiz-session' }"></router-link> -->
    </nav>
  </header>
  <main>
    <router-view />
  </main>
</template>

<style>
*,
::before,
::after {
  box-sizing: border-box;
}

html,
body {
  height: 100vh;
}

html {
  font-family: "Source Sans Pro", sans-serif;
  --font-family-Montserrat: "Montserrat", sans-serif;
  --color-violet: #6a1cc3;
  --color-violet2: #8849cf;
}

body {
  margin: 0;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #000000 87%;
  margin: 0rem auto;
}

#header {
  position: relative;
  padding: 30px;
  background-color: #6a1cc3;
}

.header_bottom {
  position: absolute;
  width: 100%;
  height: 1.2rem;
  background-color: white;
  bottom: 0;
  left: 0;
}

.svg-arrow1 {
  color: var(--color-violet);
  background-color: var(--color-violet2);
}

.svg-arrow2 {
  position: absolute;
  left: 0;
  color: var(--color-violet2);
  background-color: var(--color-white);
  transform: translateY(100%);
}

main {
  max-width: 35ch;
  _margin: 1.5em;
  padding-bottom: 5rem;
  padding-left: 0.8rem;
  margin: 1.5rem auto;
}

#title {
  color: white;
  text-align: center;
}

nav a {
  font-weight: bold;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}

nav a.router-link-exact-active {
  color: var(--color-violet2);
}
h2 {
  color: var(--color-violet);
  font-family: var(--font-family-Montserrat);
  font-weight: bold;
  font-size: 1.2rem;
  margin-top: 3rem;
  margin-bottom: 0;
}
.subtitle {
  font-size: 0.8rem;
  font-family: var(--font-family-Montserrat);
  font-weight: bold;
  margin-top: 0;
  margin-bottom: 1.5rem;
}

.dropdown {
  all: unset;
  display: inline-block;
  border: #6a1cc3 solid 1.78px;
  border-radius: 2px;
  font-weight: bold;
  width: 90%;
  flex-grow: 2;
  padding: 0.3rem 0.8rem;
}
.amount-questions {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-weight: bold;
  margin: 3rem 0;
}

button {
  all: unset;
  font-weight: 600;
  color: var(--color-violet);
  background-color: #fbfbfb;
  border: var(--color-violet) 1.75px solid;
  box-shadow: 2px 3.5px var(--color-violet);
  padding: 0.4rem 0.8rem;
  margin: 2.5rem auto;
  display: block;
}

button:hover {
  color: #fbfbfb;
  background-color: var(--color-violet);
  box-shadow: 0 0 #fbfbfb;
}

button:disabled {
  color: grey;
  background-color: lightgrey;
  box-shadow: 0 0 grey;
  border: grey 1.75px solid;
}
</style>
