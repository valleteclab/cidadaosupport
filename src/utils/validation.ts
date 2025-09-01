// Validation utilities for forms and data

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  if (password.length < 8) {
    errors.push('A senha deve ter pelo menos 8 caracteres');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('A senha deve conter pelo menos uma letra maiúscula');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('A senha deve conter pelo menos uma letra minúscula');
  }
  
  if (!/\d/.test(password)) {
    errors.push('A senha deve conter pelo menos um número');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validateTicketForm = (data: {
  title: string;
  description: string;
  category: string;
  priority: string;
}): ValidationResult => {
  const errors: Record<string, string> = {};
  
  if (!data.title.trim()) {
    errors.title = 'O título é obrigatório';
  } else if (data.title.length < 5) {
    errors.title = 'O título deve ter pelo menos 5 caracteres';
  } else if (data.title.length > 100) {
    errors.title = 'O título deve ter no máximo 100 caracteres';
  }
  
  if (!data.description.trim()) {
    errors.description = 'A descrição é obrigatória';
  } else if (data.description.length < 10) {
    errors.description = 'A descrição deve ter pelo menos 10 caracteres';
  } else if (data.description.length > 1000) {
    errors.description = 'A descrição deve ter no máximo 1000 caracteres';
  }
  
  if (!data.category) {
    errors.category = 'A categoria é obrigatória';
  }
  
  if (!data.priority) {
    errors.priority = 'A prioridade é obrigatória';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const validateLoginForm = (data: {
  email: string;
  password: string;
}): ValidationResult => {
  const errors: Record<string, string> = {};
  
  if (!data.email.trim()) {
    errors.email = 'O email é obrigatório';
  } else if (!validateEmail(data.email)) {
    errors.email = 'Por favor, insira um email válido';
  }
  
  if (!data.password.trim()) {
    errors.password = 'A senha é obrigatória';
  } else if (data.password.length < 6) {
    errors.password = 'A senha deve ter pelo menos 6 caracteres';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Sanitization utilities
export const sanitizeHtml = (input: string): string => {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};

export const sanitizeInput = (input: string): string => {
  return input.trim().replace(/\s+/g, ' ');
};

// File validation
export const validateFile = (file: File): { isValid: boolean; error?: string } => {
  const maxSize = 10 * 1024 * 1024; // 10MB
  const allowedTypes = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'application/pdf',
    'text/plain',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ];
  
  if (file.size > maxSize) {
    return {
      isValid: false,
      error: 'O arquivo deve ter no máximo 10MB'
    };
  }
  
  if (!allowedTypes.includes(file.type)) {
    return {
      isValid: false,
      error: 'Tipo de arquivo não permitido'
    };
  }
  
  return { isValid: true };
};