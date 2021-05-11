const samples = {
  advanced: `
    // f(x, y) = 2 * (x + y)
    val f = multiplication(const(2), addition)
    val result = f(10, 11)
    println("2 * (10 + 11) = $result")
  `,
  basic: `
    val result = addition(40, 2)
    println("40 + 2 = $result")
  `,
  exampleSubtraction: `
    // (x,y) -> x - y
    val sub = recursive { predecessor of recursionResult } withBaseCase firstBaseCaseArgument of { second and first }
    val result = sub(50, 8)
    println("50 - 8 = $result")
  `,
  exampleMultiplication: `
    // (x,y) -> x * y
    val mult = recursive(additionOf { recursionResult and firstRecursionArgument }) withBaseCase zero
    val result = mult(6, 7)
    println("6 * 7 = $result")
  `,
  exampleDivision: `
    // (x,y) -> x / y; if x / y is a natural number
    // (x,y) -> 0; else
    val div = run {
        // (n,x,y) -> (x - n * y) + (n * y - x)
        val g = additionOf {
            subtractionOf {
                second and multiplicationOf { first and third }
            } and subtractionOf {
                multiplication of { first and third } and second
            }
        }
        boundedMuOperatorOf(g) { first and first and second }
    }
    val result = div(84, 2)
    println("84 / 2 = $result")
  `,
  guideComposition: `
    val f = ...
    val g1 = ...
    ...
    val gn = ...
    val myComposition = f of { g1 and ... and gn }
    val myAltComp = f(g1, ..., gn)
  `,
  guideRecursion: `
    val addition = recursive { successor of recursionResult } withBaseCase firstBaseCaseArgument
    val predecessor = recursive(recursionParameter) withBaseCase zero
  `,
  guideUnaryComposition: `val myComposition = myFunction andThen myUnaryFunction`,
};

function trimIndent(indentedString) {
  return indentedString?.replaceAll(/\s\s+/g, '\n');
}

function createEditorContent(sample, useRecursion) {
  return `
    import eu.yeger.refunk.base.*
    import eu.yeger.refunk.exception.*
    import eu.yeger.refunk.${useRecursion !== null ? '' : 'non_'}recursive.*

    fun main() {
    //sampleStart
    ${sample}
    //sampleEnd
    }
  `;
}

class RefunkPlayground extends HTMLElement {
  connectedCallback() {
    KotlinPlayground('refunk-playground');

    this.setAttribute('highlight-on-fly', true.toString());
    this.setAttribute('theme', 'darcula');

    const useRecursion = this.getAttribute('use-recursion');
    const sampleName = this.getAttribute('sample');
    const sample = trimIndent(samples[sampleName]);

    if (this.getAttribute('data-highlight-only') !== null) {
      this.innerHTML = sample || this.innerHTML;
      return;
    }

    this.innerHTML = trimIndent(createEditorContent(sample || '// This is the REFUNK playground.', useRecursion));
  }
}

window.customElements.define('refunk-playground', RefunkPlayground);
