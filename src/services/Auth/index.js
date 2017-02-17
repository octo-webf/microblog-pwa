export default {
  name: 'auth',

  login(name) {
    localStorage.setItem('user', JSON.stringify({ name }));
  },

  logout() {
    localStorage.removeItem('user');
  },

  pseudo() {
    if (!this.ready()) {
      return '';
    }

    const local = JSON.parse(localStorage.getItem('user'));

    return local.name;
  },

  ready() {
    if (localStorage.user) {
      return true;
    }
    return false;
  },
};
