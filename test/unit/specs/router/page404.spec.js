import routes from 'src/router';

import page404 from 'components/page404';

describe('router', () => {
  it('Messages', () => {
    const routePath = routes.match('/plop');

    expect(routePath.name)
      .to.equal('PageNotFound');

    expect(routePath.path)
      .to.equal('/plop');

    expect(routePath.meta.auth)
      .to.equal(undefined);

    expect(routePath.matched[0].components.default)
      .to.equal(page404);
  });
});
