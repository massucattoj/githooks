import React, { useState, useEffect } from 'react';

export default function App() {

  /*
  // Estatico
  const [repositories, setRepositories] = useState([
    {id: 1, name: 'repo-1'},
    {id: 1, name: 'repo-2'},
    {id: 1, name: 'repo-3'},
  ])

  function handleAddRepository() {
    setRepositories([
      ...repositories,
      { id: Math.random(), name: 'Novo-repo'}
    ]);
  }
  */

  const [repositories, setRepositories] = useState([]);

  // Dinamico
  // Acontece somente uma vez
  useEffect(async () => {
    const response = await fetch('https://api.github.com/users/massucattoj/repos');
    const data = await response.json();
    setRepositories(data)
  }, [])

  // Acontece toda vez que a variavel eh alterada
  useEffect(() => {
    const filtered = repositories.filter(repo => repo.favorite)
    document.title = `${filtered.length} Favoritos`
    
  }, [repositories])


  function handleFavorite(id) {
    const newRepositories = repositories.map(repo => {
      return repo.id === id ? { ...repo, favorite: !repo.favorite} : repo
    });

    setRepositories(newRepositories);
  }
  
  //Utilizar funções retira a necessidade de utilizar o metodo render()
  return (
    <>
      <ul>
        {repositories.map(repo => (
          <li key={repo.id}>
            {repo.name}
            {repo.favorite && <span>(★)</span>}
            <button onClick={() => handleFavorite(repo.id)}>Favoritar</button>
          </li>
        ))}
      </ul>
    </>
  );
}

/**
 * Os React Hooks compõe a nova maneira de escrevermos componentes dentro do 
 * React. Com eles podemos evitar a verbosidade das classes e garantir a 
 * performance de componentes funcionais.
 * 
 * 
 * Utilizar Hooks basicamente descarta a necessidade de usar classes, ou seja 
 * retorna o componente como uma função.
 * 
 *    Ex: class App extends Component {} => export default function App()
 * 
 * A partir do momento que se utiliza function ao inves de classes, nao podemos 
 * mais declarar as properties dentro da funcao, ex: state = {} e utilizar metodos
 * como this.setState... utilizamos o Hook useState
 * 
 * useState -> retorna um vetor com 2 indices
 *  -> 1 indice: valor do estado
 *  -> 2 indice: funcao que permite atualizar o valor do estado
 * 
 * Toda vez que a variavel atualizar o render da pagina ira executar automaticamente
 * da mesma forma quando se utilizava o estado dentro da classe
 * 
 * useEffect -> Equivalente a utilizar componentDidMount, DidUpdate e WillUnmount
 * useEffect recebe dois principais parametros
 * 1 - a funcao que sera executada (corpo da funcao ex: componentDidUpdate)
 * 2 - em quais circunstancias a funcao deve ser executada
 * 
 * 
 * Ciclos de vida de um componente
 *    componentDidMount -> useEffect com [] lista vazia indicando que sera executado uma vez quando a pagia for carregada
 *    componentDidUpdate -> useEffect com [variavel_que_ta_sendo_atualizada]
 *    componentWillUnmount -> Criar um componente willunMount para cada useEffect colocando um return na funcao que executa assim que a funcao deixa de existir 
 */