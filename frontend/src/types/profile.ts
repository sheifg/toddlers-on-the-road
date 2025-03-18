export interface PackList {
  _id?: string;
  name: string;
  items: string[];
}
 export interface IMilestone {
  images: string[];
  title: string;
  date: string;
  place: string;
  description?: string;
 }
 export interface IProfile {
  packLists?: PackList[];
  milestones?: IMilestone[];
 }