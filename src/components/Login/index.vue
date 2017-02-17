<template src="./template.html"></template>

<script>
  import Auth from '../../services/Auth';

  export default {
    name: 'login',

    data() {
      return {
        newPseudo: '',
      };
    },

    methods: {
      login() {
        Auth.login(this.newPseudo);
        this.$router.push('/');
      },
    },

    locales: {
      fr: {
        login: {
          title: 'Identification',
          placeholder: 'Pseudo',
        },
      },
      en: {
        login: {
          title: 'Login',
          placeholder: 'Pseudo',
        },
      },
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="./style.css"></style>
