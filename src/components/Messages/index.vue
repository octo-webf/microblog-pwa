<template src="./template.html"></template>

<script>
  import Auth from '../../services/Auth';

  export default {
    name: 'message',

    data() {
      return {
        messages: null,
        pseudo: Auth.pseudo(),
        newMessage: '',
        apiURL: 'https://microblog-api.herokuapp.com/api/messages',
      };
    },

    created() {
      this.getAllMessages();
    },

    methods: {
      getAllMessages() {
        if ('caches' in window) {
          caches.match(this.apiURL).then((response) => {
            if (response) {
              response.json().then((data) => {
                console.log('Messages depuis le cache');
                this.messages = data.reverse();
              });
            }
          });
        }
        fetch(this.apiURL)
          .then(response => response.json())
          .then((data) => {
            this.messages = data.reverse();
          })
          .catch(console.error);
      },

      postNewMessages() {
        const newValue = this.newMessage && this.newMessage.trim();

        if (newValue) {
          const params = {
            author: this.pseudo,
            content: newValue,
          };

          this.$http.post(this.apiURL, params).then(() => {
            this.getAllMessages();
            this.newMessage = '';
          });
        }
      },
    },

    locales: {
      fr: {
        message: {
          whatsNew: 'Quoi de neuf ?',
          welcome: 'Bienvenue ',
        },
      },
      en: {
        message: {
          whatsNew: 'What\'s new ?',
          welcome: 'Welcome ',
        },
      },
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="./style.css"></style>
