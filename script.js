export enum UserRole {
  ADMIN = 'admin',
  CREATOR = 'creator',
  USER = 'user'
}

export interface User {
  id: string;
  email: string;
  name: string;
  photoUrl: string;
  role: UserRole;
  password?: string; // In real app, this is hashed. keeping simple for mock
  bio?: string;
  address?: string;
}

export enum ContestStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  REJECTED = 'rejected'
}

export enum ContestCategory {
  DESIGN = 'Image Design',
  WRITING = 'Article Writing',
  BUSINESS = 'Business Idea',
  CODING = 'Coding',
  GAMING = 'Gaming Review'
}

export interface Contest {
  id: string;
  title: string;
  description: string;
  instruction: string;
  image: string;
  category: ContestCategory;
  price: number;
  prizeMoney: number;
  deadline: string; // ISO Date string
  creatorId: string;
  participantsCount: number;
  status: ContestStatus;
  winnerId?: string | null;
}

export interface Submission {
  id: string;
  contestId: string;
  userId: string;
  taskUrl: string; // or text content
  submittedAt: string;
  paymentStatus: 'paid';
}

export interface ContestPackage {
  id: string;
  name: string;
  price: number;
  limit: number;
}
