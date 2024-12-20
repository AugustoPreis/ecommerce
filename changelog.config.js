/*
  Arquivo de configuração do git-cz
  Para mais informações, acesse: https://github.com/commitizen/cz-cli
*/

module.exports = {
  //Não é necessário adicionar espaço entre "emoji" e "subject"
  //o git-cz parece fazer isso automaticamente
  format: '[{type}] {emoji} {subject}',
  list: ['feat', 'fix', 'docs', 'test', 'build', 'perf', 'style', 'refactor', 'chore', 'raw', 'cleanup', 'remove'],
  questions: [
    'type', //tipo (feat, fix, ...)
    'subject', //mensagem curta
    'body', //mensagem detalhada
  ],
  types: {

    //git commit -m "[feat] ✨ adiciona funcionalidade X"
    feat: {
      value: 'feat',
      emoji: '✨',
      description: 'Inclusão de novos recursos',
    },

    //git commit -m "[fix] 🐛 corrige funcionalidade X"
    fix: {
      value: 'fix',
      emoji: '🐛',
      description: 'Correção de bugs',
    },

    //git commit -m "[docs] 📚 adiciona documentação X no README.md"
    docs: {
      value: 'docs',
      emoji: '📚',
      description: 'Mudanças na documentação',
    },

    //git commit -m "[test] 🧪 adiciona testes na funcionalidade X"
    test: {
      value: 'test',
      emoji: '🧪',
      description: 'Criação/Alteração de testes',
    },

    //git commit -m "[build] 📦 cria configuração do eslint"
    build: {
      value: 'build',
      emoji: '📦',
      description: 'Criação/Alteração em arquivos de build/dependências',
    },

    //git commit -m "[chore] 🚚 adiciona node_modules no .gitignore"
    chore: {
      value: 'chore',
      emoji: '🚚',
      description: 'Manutenções que não alterem o funcionamento do código-fonte',
    },

    //git commit -m "[perf] ⚡ revisa performance da funcionalidade X"
    perf: {
      value: 'perf',
      emoji: '⚡',
      description: 'Mudanças na performance',
    },

    //git commit -m "[style] 👌 formata código da funcionalidade X"
    style: {
      value: 'style',
      emoji: '👌',
      description: 'Formatações de código',
    },

    //git commit -m "[refactor] ♻️ refatora funcionalidade X"
    refactor: {
      value: 'refactor',
      emoji: '♻️',
      description: 'Refatorações que não alterem funcionalidades',
    },

    //git commit -m "[raw] 🗃️ adiciona arquivos de configurações"
    raw: {
      value: 'raw',
      emoji: '🗃️',
      description: 'Arquivos de configurações',
    },

    //git commit -m "[cleanup] 🧹 limpa código-fonte"
    cleanup: {
      value: 'cleanup',
      emoji: '🧹',
      description: 'Limpeza do código-fonte',
    },

    //git commit -m "[remove] 🗑️ remove funcionalidade X"
    remove: {
      value: 'remove',
      emoji: '🗑️',
      description: 'Exclusão de arquivos, diretórios ou funcionalidades',
    },
  },
  messages: {
    type: 'Selecione o tipo do commit:',
    subject: 'Escreva uma descrição curta e objetiva das alterações realizadas:',
    body: 'Descreva de forma detalhada as alterações realizadas:',
  },
}