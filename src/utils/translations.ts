import i18next from 'i18next';

// Translation helper function
export function getTranslation(namespace: string, key: string, variables?) {
  let result = null;
  if (variables) {
    result = i18next.t([`${namespace}.${key}`, 'notfound'], variables);
  } else {
    result = i18next.t([`${namespace}.${key}`, 'notfound']);
  }
  if (result === 'notfound') {
    return key;
  } else {
    return result;
  }
}
