import routes from 'src/router';

import Login from 'components/Login';

describe('router', () => {
  it('Login', () => {
    const routePath = routes.match('/login');

    expect(routePath.name)
      .to.equal('Login');

    expect(routePath.path)
      .to.equal('/login');

    expect(routePath.meta.auth)
      .to.equal(false);

    expect(routePath.matched[0].components.default)
      .to.equal(Login);
  });
});
