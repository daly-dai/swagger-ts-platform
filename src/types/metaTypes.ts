export enum LayoutTypes {
  homeLayout = 'homeLayout',
  headerLayout = 'headerLayout',
  asideLayout = 'asideLayout',
}

export default interface MetaTypes {
  hideAside?: boolean;
  layout?: string;
  icon?: string;
  isOpen?: boolean;
  disable?: boolean;
  img?: HTMLImageElement;
}
