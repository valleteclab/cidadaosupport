export const DEFAULT_CATEGORIES = [
  {
    id: 'infrastructure',
    name: 'Infraestrutura',
    slug: 'infrastructure',
    description: 'Problemas relacionados à infraestrutura urbana',
    sla: 48,
    subcategories: [
      {
        id: 'roads',
        name: 'Vias Públicas',
        slug: 'roads',
        description: 'Manutenção e reparo de ruas e calçadas',
        sla: 72
      },
      {
        id: 'lighting',
        name: 'Iluminação',
        slug: 'lighting',
        description: 'Problemas com iluminação pública',
        sla: 24
      }
    ]
  },
  {
    id: 'public_services',
    name: 'Serviços Públicos',
    slug: 'public-services',
    description: 'Questões relacionadas a serviços públicos',
    sla: 24,
    subcategories: [
      {
        id: 'garbage',
        name: 'Coleta de Lixo',
        slug: 'garbage',
        description: 'Problemas com coleta de lixo e limpeza urbana',
        sla: 24
      },
      {
        id: 'water',
        name: 'Água e Esgoto',
        slug: 'water',
        description: 'Questões relacionadas ao abastecimento de água e rede de esgoto',
        sla: 12
      }
    ]
  }
] as const;