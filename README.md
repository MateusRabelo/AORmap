# AORmap - Mapa de Recursos para Albion Online

Um aplicativo web para marcar e compartilhar localizações de recursos no mundo de Albion Online.

## Funcionalidades

- Mapa interativo para visualização e marcação de recursos
- Filtros por tipo de recurso e tier
- Adição de marcadores personalizados
- Sistema de autenticação para salvar marcações privadas
- Compartilhamento de marcações públicas com outros jogadores

## Tecnologias Utilizadas

- React com TypeScript
- Leaflet para mapas interativos
- TailwindCSS para estilização
- Firebase Authentication para autenticação
- Firestore Database para armazenamento de dados

## Como Iniciar o Projeto

1. Clone o repositório
2. Instale as dependências:
   ```
   npm install
   ```
3. Configure o Firebase:
   - Crie um projeto no [Firebase Console](https://console.firebase.google.com/)
   - Ative a Autenticação por e-mail e senha
   - Crie um banco de dados Firestore
   - Copie as credenciais para o arquivo `src/firebase.ts`

4. Inicie o servidor de desenvolvimento:
   ```
   npm run dev
   ```

## Roadmap de Funcionalidades Futuras

- Implementar imagens de mapa personalizadas do Albion Online
- Adicionar suporte para markers diferentes por tipo de recurso
- Implementar sistema de upvotes para confirmar localizações
- Adicionar sistema de comentários para cada marcação
- Implementar exportação/importação de dados

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

## Licença

MIT License 