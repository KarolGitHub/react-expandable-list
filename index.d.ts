declare type TreeList = {
  children: TreeList[];
  key: string;
  name: string;
  type: 'radio' | 'checkbox';
};

declare type Action = {
  type: 'RADIO_EXPAND' | 'CHECKBOX_EXPAND';
  key: string;
};

declare type State = string[];
