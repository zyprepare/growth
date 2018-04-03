export default function log(...args) {
  if (__ENV__ !== 'production') { // eslint-disable-line no-undef
    console.log(...args); // eslint-disable-line no-console
  }
}
