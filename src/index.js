'use strict';

import { Tree } from './create-tree';
import { sortAndRemoveDuplicateFromArray, demoArr } from './array';

window.Tree = Tree;
window.sortAndRemoveDuplicateFromArray = sortAndRemoveDuplicateFromArray;
window.demoArr = demoArr;
window.myTree = new Tree(sortAndRemoveDuplicateFromArray(demoArr));
