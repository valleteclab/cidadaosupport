#!/bin/bash

echo "🚀 Iniciando CidadãoSupport em modo de desenvolvimento..."
echo ""
echo "📋 Verificações pré-execução:"

# Verificar se as dependências estão instaladas
if [ ! -d "node_modules" ]; then
    echo "📦 Instalando dependências..."
    npm install
fi

# Executar lint
echo "🔍 Verificando código..."
npm run lint

if [ $? -eq 0 ]; then
    echo "✅ Código verificado com sucesso!"
else
    echo "⚠️  Avisos encontrados no código (não críticos)"
fi

echo ""
echo "🌐 Iniciando servidor de desenvolvimento..."
echo "📱 A aplicação estará disponível em: http://localhost:5173"
echo ""
echo "🔑 Para testar o login, use qualquer email/senha:"
echo "   - Email com 'admin' = usuário admin"
echo "   - Outros emails = usuário cidadão"
echo ""

npm run dev