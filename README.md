# Barbearia Will - App de Agendamento

Este é um aplicativo mobile para gestão de agendamentos de uma barbearia, desenvolvido em React Native com Expo. O app permite visualizar, criar e gerenciar agendamentos de clientes, além de acompanhar relatórios de atendimento e faturamento.

## Funcionalidades Principais

- **Calendário de Agendamentos:**
  - Visualização mensal dos dias com agendamentos (marcados com ponto laranja).
  - Ao clicar em um dia, exibe um modal com todos os serviços agendados para aquela data.
  - Navegação entre meses.

- **Listagem de Agendamentos:**
  - Tela inicial mostra os próximos agendamentos, com opções para finalizar, cancelar ou bloquear um atendimento.

- **Relatórios:**
  - Relatórios diários, semanais e mensais de faturamento e clientes atendidos.
  - Lista de clientes e serviços realizados em cada período.

- **Interface Moderna:**
  - Layout escuro, responsivo e com destaques em azul e laranja.
  - Ícones intuitivos e navegação por abas.

## Estrutura das Telas

- **Agenda:**
  - Exibe um calendário mensal.
  - Dias com agendamento possuem um marcador laranja no canto superior direito.
  - Modal detalha os serviços do dia selecionado.

- **Início:**
  - Lista de próximos agendamentos.
  - Ações rápidas para cada agendamento.

- **Relatórios:**
  - Faturamento e clientes atendidos por período.
  - Lista detalhada dos atendimentos.

## Tecnologias Utilizadas

- **React Native**: Framework principal para desenvolvimento mobile.
- **Expo**: Ferramenta para facilitar o desenvolvimento, build e testes.
- **TypeScript**: Tipagem estática para maior segurança e produtividade.
- **React Navigation / Expo Router**: Navegação entre telas e abas.
- **React Native Elements**: Componentes visuais prontos e customizáveis.
- **Styled Components / StyleSheet**: Estilização dos componentes.

## Estrutura de Pastas

- `app/` - Telas principais do app (agenda, início, relatórios)
- `components/` - Componentes reutilizáveis
- `assets/` - Imagens e ícones
- `constants/` - Cores, temas e configurações globais

## Como rodar o projeto

1. **Pré-requisitos:**
   - Node.js >= 18
   - Expo CLI (`npm install -g expo-cli`)

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Inicie o projeto:**
   ```bash
   npm start
   ```
   Ou use:
   ```bash
   expo start
   ```

4. **Abra no seu dispositivo:**
   - Use o app Expo Go (Android/iOS) para escanear o QR Code.
   - Ou rode em um emulador Android/iOS.

## Personalização

- Para adicionar serviços/agendamentos de exemplo, edite o array `SERVICES` em `app/(tabs)/appointments.tsx`.
- Para alterar cores e temas, edite os arquivos em `constants/` ou os objetos de estilos nas telas.

## Observações

- O app é apenas um protótipo e pode ser expandido para incluir autenticação, integração com backend, notificações, etc.
- O calendário é totalmente funcional e pode ser adaptado para outros tipos de negócio.

## Licença

MIT
