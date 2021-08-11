declare type TreeList = {
  children: TreeList[];
  key: string;
  name: string;
  type: 'radio' | 'checkbox';
};
