export const ROLE_PERMISSIONS = {
  admin: [
    'ticket.create',
    'ticket.edit',
    'ticket.delete',
    'ticket.assign',
    'ticket.view',
    'category.manage',
    'user.manage',
    'webhook.manage'
  ],
  operator: [
    'ticket.create',
    'ticket.edit',
    'ticket.assign',
    'ticket.view'
  ],
  citizen: [
    'ticket.create',
    'ticket.view'
  ]
} as const;

export const DEFAULT_NOTIFICATION_PREFERENCES = {
  admin: [
    { type: 'email', enabled: true, events: ['ticket.created', 'ticket.assigned'] },
    { type: 'push', enabled: true, events: ['ticket.updated', 'ticket.statusChanged'] }
  ],
  operator: [
    { type: 'email', enabled: true, events: ['ticket.assigned'] },
    { type: 'push', enabled: true, events: ['ticket.updated', 'ticket.commented'] }
  ],
  citizen: [
    { type: 'email', enabled: true, events: ['ticket.statusChanged', 'ticket.commented'] }
  ]
} as const;