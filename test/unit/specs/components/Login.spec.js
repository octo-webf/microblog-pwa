import Vue from 'vue';
import router from 'src/router';
import Login from 'components/Login';
import Auth from 'services/Auth';

describe('components', () => {
  describe('Login', () => {
    const Constructor = Vue.extend(Login);
    const vm = new Constructor({ router }).$mount();

    it('should render correct contents', () => {
      expect(vm.$el.querySelector('#login h1').textContent)
        .to.equal('Login');
    });

    describe('login()', () => {
      beforeEach(() => {
        sinon.spy(Auth, 'login');
      });
      it('should use Auth service to login the user', () => {
        vm.login();
        sinon.assert.calledOnce(Auth.login);
      });
    });

    describe('locales', () => {
      const langages = Object.keys(Login.locales);

      it('contains 2 langages', () => {
        expect(langages.length).to.equal(2);
        expect(langages).to.deep.equal(['fr', 'en']);
      });

      context('each langage', () => {
        describe('fr', () => {
          const locales = Object.keys(Login.locales.fr);

          it('contains 1 locale', () => {
            expect(locales.length).to.equal(1);
            expect(locales).to.deep.equal(['login']);
          });
        });

        describe('en', () => {
          const locales = Object.keys(Login.locales.en);

          it('contains 1 locale', () => {
            expect(locales.length).to.equal(1);
            expect(locales).to.deep.equal(['login']);
          });
        });
      });
    });
  });
});
