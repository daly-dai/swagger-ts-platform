export type LayoutTypes =
  | 'headFooterLayout'
  | 'headAsideLayout'
  | 'headLayout'
  | 'asideLayout'
  | 'empty';

export default interface MetaTypes {
  hideAside?: boolean;
  layout?: LayoutTypes;
  icon?: string;
  isOpen?: boolean;
  disable?: boolean;
  img?: HTMLImageElement;
}
