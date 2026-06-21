declare module "nanomorph" {
  /**
   * Diff two DOM trees and morph the old tree into the new one.
   *
   * nanomorph(oldTree, newTree) mutates `oldTree` in place so that it matches
   * the structure and content of `newTree`. It returns the patched tree.
   *
   * @param oldTree - The existing DOM node to be updated.
   * @param newTree - The desired DOM node to morph into.
   * @returns The updated DOM node (same reference as oldTree).
   */
  export default function nanomorph<T extends Node>(
    oldTree: T,
    newTree: T
  ): T;

  /**
   * Overload for HTMLElement trees.
   */
  export default function nanomorph(
    oldTree: HTMLElement,
    newTree: HTMLElement
  ): HTMLElement;

  /**
   * Overload for DocumentFragment trees.
   */
  export default function nanomorph(
    oldTree: DocumentFragment,
    newTree: DocumentFragment
  ): DocumentFragment;
}
