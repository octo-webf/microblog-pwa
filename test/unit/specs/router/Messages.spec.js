import routes from 'src/router';

import Messages from 'components/Messages';

describe('router', () => {
  it('Messages', () => {
    const routePath = routes.match('/');

    expect(routePath.name)
      .to.equal('Messages');

    expect(routePath.path)
      .to.equal('/');

    expect(routePath.meta.auth)
      .to.equal(true);

    expect(routePath.matched[0].components.default)
      .to.equal(Messages);
  });
});
