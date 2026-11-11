export function mapAll(cheerioNodes, selector) {
    return cheerioNodes.toArray().map((_, index) => selector(cheerioNodes.eq(index)));
}
