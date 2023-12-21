import {
  arrayToTree,
  exactMatchTree,
  filterTree,
  fuzzyQueryTree,
  getNodePath,
  getTreeLeaf,
  getTreeMap,
  removeEmptyTreeNode,
  traverseTreeNodes,
} from '../tree';

describe('getTreeMap', () => {
  test('should return an empty array if tree is an empty array', () => {
    const result = getTreeMap({ tree: [] });
    expect(result).toEqual([]);
  });

  test('should return the tree nodes array without children property if hasChild is false', () => {
    const tree = [
      { id: 1, name: 'Node 1', children: [{ id: 2, name: 'Node 1.1' }] },
      { id: 3, name: 'Node 2', children: [{ id: 4, name: 'Node 2.1' }] },
    ];
    const result = getTreeMap({ tree, hasChild: false });
    expect(result).toEqual([
      { id: 1, name: 'Node 1' },
      { id: 2, name: 'Node 1.1' },
      { id: 3, name: 'Node 2' },
      { id: 4, name: 'Node 2.1' },
    ]);
  });

  test('should return the tree nodes array with children property if hasChild is true', () => {
    const tree = [
      { id: 1, name: 'Node 1', children: [{ id: 2, name: 'Node 1.1' }] },
      { id: 3, name: 'Node 2', children: [{ id: 4, name: 'Node 2.1' }] },
    ];
    const result = getTreeMap({ tree });
    expect(result).toEqual([
      { id: 1, name: 'Node 1', children: [{ id: 2, name: 'Node 1.1' }] },
      { id: 2, name: 'Node 1.1' },
      { id: 3, name: 'Node 2', children: [{ id: 4, name: 'Node 2.1' }] },
      { id: 4, name: 'Node 2.1' },
    ]);
  });

  test('should return the tree nodes array recursively if children property exists in tree', () => {
    const tree = [
      {
        id: 1,
        name: 'Node 1',
        children: [
          {
            id: 2,
            name: 'Node 1.1',
            children: [{ id: 3, name: 'Node 1.1.1' }],
          },
          { id: 4, name: 'Node 1.2' },
        ],
      },
      { id: 5, name: 'Node 2' },
    ];
    const result = getTreeMap({ tree, children: 'children' });
    expect(result).toEqual([
      {
        id: 1,
        name: 'Node 1',
        children: [
          {
            id: 2,
            name: 'Node 1.1',
            children: [{ id: 3, name: 'Node 1.1.1' }],
          },
          { id: 4, name: 'Node 1.2' },
        ],
      },
      {
        id: 2,
        name: 'Node 1.1',
        children: [{ id: 3, name: 'Node 1.1.1' }],
      },
      { id: 3, name: 'Node 1.1.1' },
      { id: 4, name: 'Node 1.2' },
      { id: 5, name: 'Node 2' },
    ]);
  });
});

describe('arrayToTree', () => {
  test('可以自定义父节点关联字段的key', () => {
    const tree = [
      { key: 1, parentKey: undefined, name: 'Item 1' },
      { key: 2, parentKey: 1, name: 'Item 1.1' },
      { key: 6, parentKey: undefined, name: 'Item 2' },
      { key: 7, parentKey: 6, name: 'Item 2.1' },
    ];

    const expected = [
      {
        key: 1,
        parentKey: undefined,
        name: 'Item 1',
        child: [{ key: 2, parentKey: 1, name: 'Item 1.1' }],
      },
      {
        key: 6,
        parentKey: undefined,
        name: 'Item 2',
        child: [{ key: 7, parentKey: 6, name: 'Item 2.1' }],
      },
    ];

    const result = arrayToTree({
      tree,
      nodeKey: 'key',
      parentKey: 'parentKey',
      children: 'child',
    });
    expect(result).toEqual(expected);
  });

  test('可以自定义唯一key的字段', () => {
    const tree = [
      { key: 1, parentId: undefined, name: 'Item 1' },
      { key: 2, parentId: 1, name: 'Item 1.1' },
      { key: 6, parentId: undefined, name: 'Item 2' },
      { key: 7, parentId: 6, name: 'Item 2.1' },
    ];

    const expected = [
      {
        key: 1,
        parentId: undefined,
        name: 'Item 1',
        child: [{ key: 2, parentId: 1, name: 'Item 1.1' }],
      },
      {
        key: 6,
        parentId: undefined,
        name: 'Item 2',
        child: [{ key: 7, parentId: 6, name: 'Item 2.1' }],
      },
    ];

    const result = arrayToTree({ tree, nodeKey: 'key', children: 'child' });
    expect(result).toEqual(expected);
  });

  test('可以自定义关联属性', () => {
    const tree = [
      { id: 1, parentId: undefined, name: 'Item 1' },
      { id: 2, parentId: 1, name: 'Item 1.1' },
      { id: 6, parentId: undefined, name: 'Item 2' },
      { id: 7, parentId: 6, name: 'Item 2.1' },
    ];

    const expected = [
      {
        id: 1,
        parentId: undefined,
        name: 'Item 1',
        child: [{ id: 2, parentId: 1, name: 'Item 1.1' }],
      },
      {
        id: 6,
        parentId: undefined,
        name: 'Item 2',
        child: [{ id: 7, parentId: 6, name: 'Item 2.1' }],
      },
    ];

    const result = arrayToTree({ tree, children: 'child' });
    expect(result).toEqual(expected);
  });
  test('should convert array to tree', () => {
    const input = [
      { id: 1, parentId: undefined, name: 'Item 1' },
      { id: 2, parentId: 1, name: 'Item 1.1' },
      { id: 3, parentId: 1, name: 'Item 1.2' },
      { id: 4, parentId: 3, name: 'Item 1.2.1' },
      { id: 5, parentId: 3, name: 'Item 1.2.2' },
      { id: 6, parentId: undefined, name: 'Item 2' },
      { id: 7, parentId: 6, name: 'Item 2.1' },
      { id: 8, parentId: 7, name: 'Item 2.1.1' },
    ];
    const expected = [
      {
        id: 1,
        parentId: undefined,
        name: 'Item 1',
        children: [
          { id: 2, parentId: 1, name: 'Item 1.1' },
          {
            id: 3,
            parentId: 1,
            name: 'Item 1.2',
            children: [
              { id: 4, parentId: 3, name: 'Item 1.2.1' },
              { id: 5, parentId: 3, name: 'Item 1.2.2' },
            ],
          },
        ],
      },
      {
        id: 6,
        parentId: undefined,
        name: 'Item 2',
        children: [
          {
            id: 7,
            parentId: 6,
            name: 'Item 2.1',
            children: [{ id: 8, parentId: 7, name: 'Item 2.1.1' }],
          },
        ],
      },
    ];
    const result = arrayToTree({ tree: input });
    expect(result).toEqual(expected);
  });
});

describe('getNodePath', () => {
  test('should return empty array if tree is not an array or is empty', () => {
    const tree: never[] = [];
    const key = 1;
    const nodeKey = 'id';
    const children = 'children';

    const result = getNodePath({ tree, key, nodeKey, children });

    expect(result).toEqual([]);
  });

  test('should return correct path to node', () => {
    const tree = [
      { id: 1, children: [{ id: 2 }, { id: 3 }] },
      { id: 2, children: [{ id: 4 }] },
    ];
    const key = 4;
    const nodeKey = 'id';
    const children = 'children';

    const result = getNodePath({ tree, key, nodeKey, children });

    expect(result).toEqual([2, 4]);
  });

  test('支持自定义nodeKey和children的字段', () => {
    const tree = [
      { key: 1, child: [{ key: 2 }, { key: 3 }] },
      { key: 2, child: [{ key: 4 }] },
      { key: 4, child: [{ key: 5 }, { key: 6 }] },
    ];
    const key = 6;
    const nodeKey = 'key';
    const children = 'child';

    const result = getNodePath({ tree, key, nodeKey, children });

    expect(result).toEqual([4, 6]);
  });
});

describe('fuzzyQueryTree', () => {
  it('should return an empty array if the tree is empty', () => {
    const tree: any[] = [];
    const value = 'example';
    const valueKey = 'name';
    const children = 'children';

    const result = fuzzyQueryTree({ tree, value, valueKey, children });

    expect(result).toEqual([]);
  });

  it('should return an array of elements whose valueKey includes the given value', () => {
    const tree: any[] = [
      { name: 'example', children: [] },
      { name: 'example1', children: [] },
      { name: 'example2', children: [] },
    ];
    const value = 'example';
    const valueKey = 'name';
    const children = 'children';

    const result = fuzzyQueryTree({ tree, value, valueKey, children });

    expect(result).toEqual([
      { name: 'example', children: [] },
      { name: 'example1', children: [] },
      { name: 'example2', children: [] },
    ]);
  });

  it('should return an array of elements whose valueKey includes the given value and their children', () => {
    const tree: any[] = [
      { name: 'parent1', children: [{ name: 'child1', children: [] }] },
      { name: 'parent2', children: [{ name: 'child2', children: [] }] },
      { name: 'parent3', children: [] },
    ];
    const value = 'child';
    const valueKey = 'name';
    const children = 'children';

    const result = fuzzyQueryTree({ tree, value, valueKey, children });

    expect(result).toEqual([
      { name: 'child1', children: [] },
      { name: 'child2', children: [] },
    ]);
  });

  it('should return an array of elements whose valueKey includes the given value and their children recursively', () => {
    const tree: any[] = [
      {
        name: 'parent1',
        children: [
          { name: 'child1', children: [] },
          {
            name: 'child2',
            children: [
              { name: 'grandchild1', children: [] },
              { name: 'grandchild2', children: [] },
            ],
          },
        ],
      },
      { name: 'parent2', children: [] },
      { name: 'parent3', children: [{ name: 'child3', children: [] }] },
    ];
    const value = 'child';
    const valueKey = 'name';
    const children = 'children';

    const result = fuzzyQueryTree({ tree, value, valueKey, children });

    expect(result).toEqual([
      { name: 'child1', children: [] },
      {
        name: 'child2',
        children: [
          { name: 'grandchild1', children: [] },
          { name: 'grandchild2', children: [] },
        ],
      },
      { name: 'child3', children: [] },
    ]);
  });
});

describe('exactMatchTree', () => {
  const tree: any[] = [
    {
      name: 'node1',
      children: [
        {
          name: 'node11',
          children: [
            {
              name: 'node111',
              children: [
                {
                  name: 'node1111',
                  children: [{ name: 'node11111' }, { name: 'node11112' }],
                },
                { name: 'node1112' },
              ],
            },
            { name: 'node112' },
          ],
        },
        { name: 'node12' },
      ],
    },
  ];

  it('should return null if tree is empty', () => {
    const result = exactMatchTree({ tree: [] as never[], value: 'node1111' });

    expect(result).toBeNull();
  });

  it('should return the node with exact match', () => {
    expect(exactMatchTree({ tree, value: 'node1111' })).toEqual({
      name: 'node1111',
      children: [{ name: 'node11111' }, { name: 'node11112' }],
    });
  });

  it('should return the node with recursive match', () => {
    expect(exactMatchTree({ tree, value: 'node112' })).toEqual({
      name: 'node112',
    });
  });

  it('should return null if no match is found', () => {
    expect(exactMatchTree({ tree, value: 'node1113' })).toBeNull();
  });
});

describe('traverseTreeNodes', () => {
  const tree = [
    {
      id: 1,
      name: 'A',
      children: [
        {
          id: 2,
          name: 'B',
          children: [
            { id: 3, name: 'C' },
            { id: 4, name: 'D' },
          ],
        },
        { id: 5, name: 'E' },
      ],
    },
    {
      id: 6,
      name: 'F',
    },
  ];

  const resultData = [
    {
      id: 1,
      name: 'A',
      key: 'A',
      children: [
        {
          id: 2,
          key: 'B',
          name: 'B',
          children: [
            { id: 3, key: 'C', name: 'C' },
            { id: 4, key: 'D', name: 'D' },
          ],
        },
        { id: 5, key: 'E', name: 'E' },
      ],
    },
    {
      id: 6,
      key: 'F',
      name: 'F',
    },
  ];

  const childrenProp = 'children';

  const callback = (item: any) => {
    item['key'] = item['name'];
  };

  it('should traverse tree nodes', () => {
    const result = traverseTreeNodes({
      tree,
      callback,
      children: childrenProp,
    });

    expect(result).toEqual(resultData);
  });
});

describe('removeEmptyTreeNode', () => {
  it('should not remove non-empty tree nodes', () => {
    const tree = [
      {
        id: 1,
        name: 'Node 1',
        children: [
          {
            id: 2,
            name: 'Node 1.1',
            children: [
              {
                id: 3,
                name: 'Node 1.1.1',
                children: [],
              },
            ],
          },
          {
            id: 4,
            name: 'Node 1.2',
            children: [],
          },
        ],
      },
    ];

    const expectedTree = [
      {
        id: 1,
        name: 'Node 1',
        children: [
          {
            id: 2,
            name: 'Node 1.1',
            children: [
              {
                id: 3,
                name: 'Node 1.1.1',
              },
            ],
          },
          {
            id: 4,
            name: 'Node 1.2',
          },
        ],
      },
    ];

    const result = removeEmptyTreeNode(tree);

    expect(result).toEqual(expectedTree);
  });
});

describe('getTreeLeaf', () => {
  it('should return an array of tree leaves', () => {
    const tree = [
      { value: 'A' },
      {
        value: 'B',
        children: [{ value: 'C1' }, { value: 'C2' }, { value: 'C3' }],
      },
      {
        value: 'D',
        children: [
          {
            value: 'E1',
            children: [{ value: 'F1' }, { value: 'F2' }],
          },
          {
            value: 'E2',
            children: [{ value: 'F3' }, { value: 'F4' }],
          },
          {
            value: 'E3',
            children: [{ value: 'F5' }, { value: 'F6' }],
          },
        ],
      },
    ];

    const result = getTreeLeaf(tree);

    expect(result).toHaveLength(10);
    expect(result[0]).toEqual({ value: 'A' });
    expect(result[1]).toEqual({ value: 'C1' });
    expect(result[2]).toEqual({ value: 'C2' });
    expect(result[3]).toEqual({ value: 'C3' });
    expect(result[4]).toEqual({ value: 'F1' });
    expect(result[5]).toEqual({ value: 'F2' });
    expect(result[6]).toEqual({ value: 'F3' });
  });
});

describe('filterTree', () => {
  it('should return null if tree is null', () => {
    const result = filterTree({ tree: null, filterFn: jest.fn() });
    expect(result).toBeNull();
  });

  it('should return an empty array if tree is an empty array', () => {
    const result = filterTree({ tree: [], filterFn: jest.fn() });
    expect(result).toEqual([]);
  });

  it('should correctly filter the tree nodes', () => {
    const tree = {
      id: 1,
      name: 'Node 1',
      children: [
        {
          id: 2,
          name: 'Node 1.1',
          children: [{ id: 3, name: 'Node 1.1.1' }],
        },
        {
          id: 4,
          name: 'Node 1.2',
          children: [{ id: 5, name: 'Node 1.2.1' }],
        },
      ],
    };

    const filterFn = (node: { name: string | string[] }) =>
      node.name.includes('1.1');

    const expected = [
      {
        id: 1,
        name: 'Node 1',
        children: [
          {
            id: 2,
            name: 'Node 1.1',
            children: [{ id: 3, name: 'Node 1.1.1', children: [] }],
          },
        ],
      },
    ];

    const result = filterTree({ tree, filterFn });

    expect(result).toEqual(expected);
  });

  it('should correctly filter the tree nodes with optional children prop', () => {
    const tree = {
      id: 1,
      name: 'Node 1',
      children: [
        {
          id: 2,
          name: 'Node 1.1',
          children: [{ id: 3, name: 'Node 1.1.1' }],
        },
        {
          id: 4,
          name: 'Node 1.2',
          children: [{ id: 5, name: 'Node 1.2.1' }],
        },
      ],
    };

    const filterFn = (node: { name: string | string[] }) =>
      node.name.includes('1.2');

    const expected = [
      {
        id: 1,
        name: 'Node 1',
        children: [
          {
            id: 4,
            name: 'Node 1.2',
            children: [{ id: 5, name: 'Node 1.2.1', children: [] }],
          },
        ],
      },
    ];

    const result = filterTree({ tree, filterFn, children: 'children' });
    expect(result).toEqual(expected);
  });
});
