bool isBinarySearchTree(root: Node):                    
// Здесь root — корень заданного двоичного дерева.

  bool check(v : Node, min: T, max: T):                
	// min и max — минимально и максимально допустимые значения в вершинах поддерева.
    if v == null                    return true
    if v.key <= min or max <= v.key return false
    return check(v.left, min, v.key) and check(v.right, v.key, max)

  return check(root, −∞
, ∞
)