Feature: Listagem

 Como usuário, desejo acessar a listagem
 Para que possa visualizar meus dados de cadastros

 Scenario: Listagem sem registros
  Given que o site não possui registros
  When acessar a listagem
  Then devo visualizar a listagem vazia


 Scenario: Listagem com registros
  Given que o site possui varios registros
  When acessar a listagem com registros
  Then devo visualizar varios  registros
