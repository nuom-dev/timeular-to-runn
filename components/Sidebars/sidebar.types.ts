export interface SidebarItemModel {
  label: string;
  icon: string;
  active?: boolean;
  subActive?: boolean;
  order?: number;
  link: string;
  isBottom?: boolean;
  color?: string;
  hideOnMobile?: boolean;
  hideOnDesktop?: boolean;
  organisationRestrictions?: string[];
  count?: number | null;
  subItems?: SidebarItemModel[];
}
