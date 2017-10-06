<template src="./template.html"></template>

<script>
  import Auth from '../../services/Auth';
  import IndexDB from '../../services/IndexDB';

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
          //Récupérer les messages dans le cache
          caches.match(this.apiURL).then((response) => {
            if (response) {
              response.json().then((data) => {
                console.log('Messages depuis le cache');

                //Récupérer les messages ajouté en offline et les ajouté à la liste des messages visibles
                IndexDB.getAllOfflineMessages((allOfflineMessages) => {
                  data = data.concat(allOfflineMessages);
                  this.messages = data.reverse();
                });
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

          this.$http.post(this.apiURL, params)
            .then(() => {
              this.getAllMessages();
              this.newMessage = '';
            })
            .catch(() => {
              IndexDB.saveMessageOffline(this.pseudo, newValue);

              navigator.serviceWorker.ready.then((swRegistration) => {
                console.log("register offline message sync")
                return swRegistration.sync.register('offlineMessage');
              });

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
