/** BinaryTreeNode: node for a general tree. */

class BinaryTreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }

  /** minDepth(): return the minimum depth of the tree -- that is,
   * the length of the shortest path from the root to a leaf. */

  minDepth() {
    if (!this.root) return 0;

    function minDepthHelper(node) {
      if (node.left === null && node.right === null) return 1;
      if (node.left === null) return minDepthHelper(node.right) + 1;
      if (node.right === null) return minDepthHelper(node.left) + 1;
      return (
        Math.min(minDepthHelper(node.left), minDepthHelper(node.right)) + 1
      );
    }

    return minDepthHelper(this.root);
  }

  /** maxDepth(): return the maximum depth of the tree -- that is,
   * the length of the longest path from the root to a leaf. */

  maxDepth() {
    if (!this.root) return 0;

    function maxDepthHelper(node) {
      if (node.left === null && node.right === null) return 1;
      if (node.left === null) return maxDepthHelper(node.right) + 1;
      if (node.right === null) return maxDepthHelper(node.left) + 1;
      return (
        Math.max(maxDepthHelper(node.left), maxDepthHelper(node.right)) + 1
      );
    }

    return maxDepthHelper(this.root);
  }

  /** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
   * The path doesn't need to start at the root, but you can't visit a node more than once. */

  maxSum() {
    let result = 0;

    function maxSumHelper(node) {
      if (node === null) return 0;
      const leftSum = maxSumHelper(node.left);
      const rightSum = maxSumHelper(node.right);
      result = Math.max(result, node.val + leftSum + rightSum);
      return Math.max(0, leftSum + node.val, rightSum + node.val);
    }

    maxSumHelper(this.root);
    return result;
  }

  /** nextLarger(lowerBound): return the smallest value in the tree
   * which is larger than lowerBound. Return null if no such value exists. */

  nextLarger(lowerBound) {
    if (!this.root) return null;

    // let's use BFS for this!
    let queue = [this.root];
    let closest = null;

    while (queue.length) {
      let currentNode = queue.shift();
      let currentVal = currentNode.val;
      let higherThanLowerBound = currentVal > lowerBound;
      let shouldReassignClosest = currentVal < closest || closest === null;

      if (higherThanLowerBound && shouldReassignClosest) {
        closest = currentVal;
      }

      if (currentNode.left) queue.push(currentNode.left);
      if (currentNode.right) queue.push(currentNode.right);
    }

      return closest;
    }
  }


module.exports = { BinaryTree, BinaryTreeNode };
