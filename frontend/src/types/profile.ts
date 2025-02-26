export interface Profile {
    userId: string | null;
    packLists:{ 
        packList:{
            name: string;
            items: string[];
        }
    }
  }