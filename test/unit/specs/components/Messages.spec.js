import Vue from 'vue';
import Messages from 'components/Messages';

describe('components', () => {
  describe('Messages', () => {
    sinon.stub(Messages, 'data').returns({
      newMessage: "I'm the new message",
      pseudo: 'Plopauthor',
      apiURL: 'http://microblog-api.herokuapp.com/api/messages',
    });

    const Constructor = Vue.extend(Messages);
    const vm = new Constructor().$mount();

    it('should render correct contents', () => {
      expect(vm.$el.querySelector('.message-input input[type="text"]').getAttribute('placeholder'))
        .to.equal('What\'s new ?');
    });

    describe('getAllMessages()', () => {
      it('call api to get all created message', () => {
        const promiseCall = sinon.stub(Vue, 'http').returnsPromise();

        promiseCall.resolves();

        vm.getAllMessages();

        expect(promiseCall).to.have.been.called;
        expect(promiseCall).to.have.been.calledWith({
          method: 'get',
          url: 'http://microblog-api.herokuapp.com/api/messages',
        });

        Vue.http.restore();
      });
    });

    describe('postNewMessages()', () => {
      it('plop call post', () => {
        const promiseCall = sinon.stub(Vue, 'http').returnsPromise();
        promiseCall.resolves();

        vm.postNewMessages();

        expect(promiseCall).to.have.been.called;
        expect(promiseCall).to.have.been.calledWith({
          method: 'post',
          body: {
            author: 'Plopauthor',
            content: "I'm the new message",
          },
          url: 'http://microblog-api.herokuapp.com/api/messages',
        });

        Vue.http.restore();
      });
    });

    describe('locales', () => {
      const langages = Object.keys(Messages.locales);

      it('contains 2 langages', () => {
        expect(langages.length).to.equal(2);
        expect(langages).to.deep.equal(['fr', 'en']);
      });

      context('each langage', () => {
        describe('fr', () => {
          const locales = Object.keys(Messages.locales.fr);

          it('contains 1 locale', () => {
            expect(locales.length).to.equal(1);
            expect(locales).to.deep.equal(['message']);
          });
        });

        describe('en', () => {
          const locales = Object.keys(Messages.locales.en);

          it('contains 1 locale', () => {
            expect(locales.length).to.equal(1);
            expect(locales).to.deep.equal(['message']);
          });
        });
      });
    });
  });
});
