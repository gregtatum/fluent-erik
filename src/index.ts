import './index.css';

import { DOMLocalization } from '@fluent/dom';
import { FluentBundle, FluentResource } from '@fluent/bundle';

console.log('Inside of src/index.ts');

async function* generateBundles() {
  const resource = new FluentResource(`
-brand-name = Platform Intl
welcome = Welcome, {$name}, to {-brand-name}!
`);

  const bundle = new FluentBundle('en-US');
  const errors = bundle.addResource(resource);
  if (errors.length) {
    throw errors;
  }
  yield bundle;
}

const l10n = new DOMLocalization(['main.ftl'], generateBundles);
// console.log('what 2');
// window.l10n = l10n;

l10n.connectRoot(document.documentElement);
l10n.translateRoots();

const h1 = document.querySelector('h1');
if (!h1) {
  throw new Error('Could not find the h1');
}

// Sets `data-l10n-id` and `data-l10n-args` which triggers
// the `MutationObserver` from `DOMLocalization` and translates the
// element.
l10n.setAttributes(h1, 'welcome', { name: 'Anna' });
