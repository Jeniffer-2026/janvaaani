
export enum Department {
  KSEB = 'KSEB (Electricity)',
  WATER_AUTHORITY = 'Water Authority',
  CORPORATION = 'Corporation / Municipality',
  WASTE_MANAGEMENT = 'Waste Management',
  POLICE = 'Police / Law Enforcement',
  HEALTH = 'Health Department',
  OTHERS = 'Other / General'
}

export enum Priority {
  CRITICAL = 'Critical',
  HIGH = 'High',
  MEDIUM = 'Medium',
  LOW = 'Low'
}

export enum ComplaintStatus {
  PENDING = 'Pending Approval',
  REJECTED = 'Rejected (Invalid)',
  ASSIGNED = 'Staff Assigned',
  ESCALATED = 'Escalated to Higher Authority',
  RESOLVED = 'Resolved'
}

export interface User {
  name: string;
  aadhaar: string;
}

export interface Location {
  lat: number;
  lng: number;
  address?: string;
}

export interface Complaint {
  id: string;
  description: string;
  department: Department;
  priority: Priority;
  status: ComplaintStatus;
  createdAt: number;
  slaDeadline: number;
  citizenName: string;
  aadhaar: string;
  summary: string;
  isValid: boolean;
  rejectionReason?: string;
  staffAssigned?: string;
  location?: Location;
  feedback?: string;
}
