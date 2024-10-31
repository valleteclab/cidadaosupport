export const WEBHOOK_CONFIG = {
  maxRetries: 3,
  timeout: 5000,
  retryDelay: 1000,
  events: [
    'ticket.created',
    'ticket.updated',
    'ticket.statusChanged',
    'ticket.assigned',
    'ticket.resolved',
    'ticket.closed'
  ] as const,
  payloadVersion: '1.0'
} as const;

export const WEBHOOK_TEMPLATES = {
  'ticket.created': {
    title: 'Novo chamado criado',
    description: 'Um novo chamado foi aberto no sistema'
  },
  'ticket.updated': {
    title: 'Chamado atualizado',
    description: 'Um chamado existente foi atualizado'
  },
  'ticket.statusChanged': {
    title: 'Status do chamado alterado',
    description: 'O status de um chamado foi modificado'
  },
  'ticket.assigned': {
    title: 'Chamado atribuído',
    description: 'Um chamado foi atribuído a um operador'
  },
  'ticket.resolved': {
    title: 'Chamado resolvido',
    description: 'Um chamado foi marcado como resolvido'
  },
  'ticket.closed': {
    title: 'Chamado fechado',
    description: 'Um chamado foi fechado definitivamente'
  }
} as const;