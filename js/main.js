const recursivePlaceholder =
  'val result = addition(40, 2)\n' +
  'println("40 + 2 = $result")\n';

const nonRecursivePlaceholder =
  '// f(x, y) = 2 * (x + y)\n' +
  'val f = multiplication(const(2), addition)\n' +
  'val result = f(10, 11)\n' +
  'println("2 * (10 + 11) = $result")\n';

class RefunkPlayground extends HTMLElement {
  connectedCallback() {
    KotlinPlayground('refunk-playground');

    this.setAttribute('highlight-on-fly', true.toString());
    this.setAttribute('theme', 'darcula');

    if (this.getAttribute('data-highlight-only') !== null) {
      return;
    }

    const useRecursion = this.getAttribute('use-recursion') === 'true';
    const sample = useRecursion ? recursivePlaceholder : nonRecursivePlaceholder;

    this.innerHTML =
      'import eu.yeger.refunk.base.*\n' +
      'import eu.yeger.refunk.exception.*\n' +
      `import eu.yeger.refunk.${useRecursion ? '' : 'non_'}recursive.*\n` +
      '\n' +
      'fun main() {\n' +
      '//sampleStart\n' +
      sample +
      '\n' +
      '\n' +
      '\n' +
      '//sampleEnd\n' +
      '}';
  }
}

window.customElements.define('refunk-playground', RefunkPlayground);
