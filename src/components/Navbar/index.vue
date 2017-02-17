<template src="./template.html"></template>

<script>
  export default {
    name: 'navbar',

    locales: {
      fr: {
        buttons: {
          home: 'Accueil',
          about: 'À propos',
        },
      },
      en: {
        buttons: {
          home: 'Home',
          about: 'About',
        },
      },
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="./style.css"></style>
