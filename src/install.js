import makeMixin from './mixin';
import makeDirective from './directive';
import defaultOptions from './config';
import Validator from './core/validator';
import { warn, assign } from './core/utils';

let Vue;

function install (_Vue, options = {}) {
  if (Vue) {
    warn('already installed, Vue.use(VeeValidate) should only be called once.');
    return;
  }

  Vue = _Vue;
  const config = assign({}, defaultOptions, options);
  if (config.dictionary) {
    Validator.updateDictionary(config.dictionary);
  }

  if (options) {
    if (options.locale) {
      Validator.locale = options.locale;
    }

    if (options.strict) {
      Validator.setStrictMode(config.strict);
    }
  }

  Vue.mixin(makeMixin(Vue, config));
  Vue.directive('validate', makeDirective(config));
};

export default install;
