export interface UserProfile {
  uid: string;
  email: string;
  role: 'admin' | 'worker' | 'user';
  name?: string;
  phoneNumber?: string;
  phone?: string;
  Munci?: string;
  ward?: number;
  createdAt?: string;
}

export interface Worker extends UserProfile {
  department?: string;
  specialization?: string;
  assignedIssues?: string[];
  completedIssues?: number;
}

export interface Issue {
  id: string;
  title: string;
  category: 'road' | 'water' | 'electricity' | 'sanitation' | 'other';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  description: string;
  reportedBy: {
    userId: string;
    email: string;
    name?: string;
  };
  assignedTo?: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  address?: string;
  images?: string[];
  createdAt: string;
  updatedAt?: string;
}

export interface Report {
  id: string;
  userEmail: string;
  issueId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Analytics {
  totalIssues: number;
  openIssues: number;
  inProgressIssues: number;
  resolvedIssues: number;
  closedIssues: number;
  issuesByCategory: {
    [key: string]: number;
  };
  issuesByPriority: {
    [key: string]: number;
  };
}