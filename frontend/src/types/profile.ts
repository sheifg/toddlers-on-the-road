export interface PackList {
  _id?: string;
  name: string;
  items: string[];
}
 export interface IMilestone {
  _id?: string;
  images: string[];
  title: string;
  date: string;
  place: string;
  description?: string;
  isExample?: boolean;
 }

 export interface IProfile {
  packLists?: PackList[];
  milestones?: IMilestone[];
 }