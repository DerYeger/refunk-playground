class RefunkPlayground extends HTMLElement {
  connectedCallback() {
    const useRecursion = this.getAttribute('use-recursion')
    this.innerHTML =
      'import eu.yeger.refunk.base.*\n' +
      'import eu.yeger.refunk.exception.*\n' +
      `import eu.yeger.refunk.${useRecursion ? '' : 'non_'}recursive.*\n` +
      '\n' +
      'fun main() {\n' +
      '//sampleStart\n' +
      'println(addition(40, 2))\n' +
      '//sampleEnd\n' +
      '}'

    KotlinPlayground('refunk-playground')
  }
}

window.customElements.define('refunk-playground', RefunkPlayground)
