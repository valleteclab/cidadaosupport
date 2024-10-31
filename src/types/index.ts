export type User = {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'operator' | 'citizen';
  permissions: Permission[];
  department?: string;
  notificationPreferences: NotificationPreference[];
};

export type Permission = 
  | 'ticket.create'
  | 'ticket.edit'
  | 'ticket.delete'
  | 'ticket.assign'
  | 'ticket.view'
  | 'category.manage'
  | 'user.manage'
  | 'webhook.manage';

export type NotificationPreference = {
  type: 'email' | 'push' | 'sms';
  enabled: boolean;
  events: NotificationEvent[];
};

export type NotificationEvent = 
  | 'ticket.created'
  | 'ticket.updated'
  | 'ticket.assigned'
  | 'ticket.statusChanged'
  | 'ticket.commented';

export type TicketStatus = 'open' | 'in_progress' | 'resolved' | 'closed';

export type TicketPriority = 'low' | 'medium' | 'high' | 'urgent';

export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string;
  parentId?: string;
  departmentId?: string;
  sla?: number; // Time in hours
  autoAssignTo?: string[];
};

export type Ticket = {
  id: string;
  title: string;
  description: string;
  categoryId: string;
  status: TicketStatus;
  priority: TicketPriority;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  assignedTo?: string;
  dueDate?: Date;
  attachments?: Attachment[];
  history: TicketHistory[];
  comments: Comment[];
  metadata: Record<string, unknown>;
};

export type TicketHistory = {
  id: string;
  ticketId: string;
  userId: string;
  action: 'created' | 'updated' | 'statusChanged' | 'assigned' | 'commented';
  changes: {
    field: string;
    oldValue: any;
    newValue: any;
  }[];
  timestamp: Date;
};

export type Comment = {
  id: string;
  ticketId: string;
  userId: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  attachments?: Attachment[];
  isInternal: boolean;
};

export type Attachment = {
  id: string;
  filename: string;
  mimeType: string;
  size: number;
  url: string;
  uploadedAt: Date;
  uploadedBy: string;
};

export type Webhook = {
  id: string;
  name: string;
  url: string;
  secret: string;
  events: WebhookEvent[];
  isActive: boolean;
  createdAt: Date;
  lastTriggeredAt?: Date;
  errorCount: number;
};

export type WebhookEvent = 
  | 'ticket.created'
  | 'ticket.updated'
  | 'ticket.statusChanged'
  | 'ticket.assigned'
  | 'ticket.resolved'
  | 'ticket.closed';

export type NotificationMessage = {
  id: string;
  userId: string;
  type: NotificationPreference['type'];
  title: string;
  content: string;
  link?: string;
  read: boolean;
  createdAt: Date;
  readAt?: Date;
};