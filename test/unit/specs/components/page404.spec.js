import Vue from 'vue';
import page404 from 'components/page404';

describe('components', () => {
  describe('page404', () => {
    const Constructor = Vue.extend(page404);
    const vm = new Constructor().$mount();

    it('should render correct contents', () => {
      expect(vm.$el.querySelector('#page404 .warning-message').textContent)
        .to.equal('Page not found');
    });

    describe('locales', () => {
      const langages = Object.keys(page404.locales);

      it('contains 2 langages', () => {
        expect(langages.length).to.equal(2);
        expect(langages).to.deep.equal(['fr', 'en']);
      });

      context('each langage', () => {
        describe('fr', () => {
          const locales = Object.keys(page404.locales.fr);

          it('contains 1 locale', () => {
            expect(locales.length).to.equal(1);
            expect(locales).to.deep.equal(['message']);
          });
        });

        describe('en', () => {
          const locales = Object.keys(page404.locales.en);

          it('contains 1 locale', () => {
            expect(locales.length).to.equal(1);
            expect(locales).to.deep.equal(['message']);
          });
        });
      });
    });
  });
});
