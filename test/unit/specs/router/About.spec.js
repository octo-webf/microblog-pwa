import routes from 'src/router';

import About from 'components/About';

describe('router', () => {
  it('About', () => {
    const routePath = routes.match('/about');

    expect(routePath.name)
      .to.equal('About');

    expect(routePath.path)
      .to.equal('/about');

    expect(routePath.meta.auth)
      .to.equal(true);

    expect(routePath.matched[0].components.default)
      .to.equal(About);
  });
});
