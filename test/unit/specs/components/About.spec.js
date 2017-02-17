import Vue from 'vue';
import About from 'components/About';

describe('components', () => {
  describe('About', () => {
    const Constructor = Vue.extend(About);
    const vm = new Constructor().$mount();

    it('should render correct contents', () => {
      expect(vm.$el.querySelector('#about h2').textContent)
        .to.equal('We are everywhere ...');
    });

    describe('locales', () => {
      const langages = Object.keys(About.locales);

      it('contains 2 langages', () => {
        expect(langages.length).to.equal(2);
        expect(langages).to.deep.equal(['fr', 'en']);
      });

      context('each langage', () => {
        describe('fr', () => {
          const locales = Object.keys(About.locales.fr);

          it('contains 1 locale', () => {
            expect(locales.length).to.equal(1);
            expect(locales).to.deep.equal(['message']);
          });
        });

        describe('en', () => {
          const locales = Object.keys(About.locales.en);

          it('contains 1 locale', () => {
            expect(locales.length).to.equal(1);
            expect(locales).to.deep.equal(['message']);
          });
        });
      });
    });
  });
});
