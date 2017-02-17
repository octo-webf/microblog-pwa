import Auth from 'services/Auth';

describe('services', () => {
  describe('Auth', () => {
    describe('pseudo()', () => {
      context('when user is logout', () => {
        it('should return an empty string', () => {
          expect(Auth.pseudo()).to.equal('');
        });
      });

      context('when user is login', () => {
        const pseudo = 'Plop24';

        before(() => {
          sinon.stub(Auth, 'ready').returns(true);
          sinon.stub(localStorage, 'getItem').withArgs('user').returns(JSON.stringify({ name: pseudo }));
        });
        after(() => {
          sinon.restore(Auth);
        });

        it('should return \'Pseudo\'', () => {
          expect(Auth.pseudo()).to.equal(pseudo);
        });
      });
    });

    describe('login()', () => {
      before(() => {
        sinon.spy(localStorage, 'setItem');
      });

      after(() => {
        Auth.logout();
      });

      it('set user item', () => {
        Auth.login('test');

        sinon.assert.calledWithExactly(localStorage.setItem, 'user', JSON.stringify({ name: 'test' }));
      });
    });

    describe('logout()', () => {
      before(() => {
        sinon.spy(localStorage, 'removeItem');
      });

      it('remove user item', () => {
        Auth.logout();
        sinon.assert.calledWithExactly(localStorage.removeItem, 'user');
      });
    });

    describe('ready()', () => {
      context('when user is login', () => {
        before(() => {
          Auth.login('test');
        });

        it('return true', () => {
          expect(Auth.ready()).to.equal(true);
        });
      });

      context('when user is logout', () => {
        before(() => {
          Auth.logout();
        });

        it('return false', () => {
          expect(Auth.ready()).to.equal(false);
        });
      });
    });
  });
});
