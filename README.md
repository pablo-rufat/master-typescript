É possivel que o comando `npm run typeorm migration:create -n CreateUsersTable` não funcione. Se for o caso, adiciona `--` antes do argumento `-n`:
`npm run typeorm migration:create -- -n CreateUsersTable`.

Mysql nao gosta de receber funções no atributo `DEFAULT`. Para poder usar a função `UUID()` devemos passar ela entre parentesis: `(UUID())`.