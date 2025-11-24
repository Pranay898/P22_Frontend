export interface User {
  id: number;
  email: string;
  fullName: string;
  profilePic?: string;
  roles: string[];
  accountType?: 'PERSONAL' | 'BUSINESS';
  websiteUrl?: string;
}

export interface Pin {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  createdAt: string;
  user?: User;
  board?: Board;
  isSponsored?: boolean;
  promotionUrl?: string;
}

export interface Board {
  id: number;
  name: string;
  description: string;
  user?: User;
  pins?: Pin[];
}

export interface AuthResponse {
  token: string;
  type: string;
  id: number;
  email: string;
  fullName: string;
  profilePic: string;
  roles: string[];
}
