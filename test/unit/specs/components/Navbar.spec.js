import Vue from 'vue';
import Navbar from 'components/Navbar';
import router from 'router';

describe('components', () => {
  describe('Navbar', () => {
    const Constructor = Vue.extend(Navbar);
    const vm = new Constructor({ router }).$mount();

    it('should render correct contents', () => {
      expect(vm.$el.querySelector('#navbar #navbar_home .navigation-bar__link-label').textContent)
        .to.equal('Home');

      expect(vm.$el.querySelector('#navbar #navbar_about .navigation-bar__link-label').textContent)
        .to.equal('About');

      expect(vm.$el.querySelector('#navbar #navbar_home a').getAttribute('href'))
        .to.equal('#/');

      expect(vm.$el.querySelector('#navbar #navbar_about a').getAttribute('href'))
        .to.equal('#/about');
    });

    describe('locales', () => {
      const langages = Object.keys(Navbar.locales);

      it('contains 2 langages', () => {
        expect(langages.length).to.equal(2);
        expect(langages).to.deep.equal(['fr', 'en']);
      });

      context('each langage', () => {
        describe('fr', () => {
          const locales = Object.keys(Navbar.locales.fr);

          it('contains 1 locale', () => {
            expect(locales.length).to.equal(1);
            expect(locales).to.deep.equal(['buttons']);
          });
        });

        describe('en', () => {
          const locales = Object.keys(Navbar.locales.en);

          it('contains 1 locale', () => {
            expect(locales.length).to.equal(1);
            expect(locales).to.deep.equal(['buttons']);
          });
        });
      });
    });
  });
});
