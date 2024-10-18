// Atribui a constante o container que receberá as linhas de código dos vídeos
const containerVideos = document.querySelector('.videos__container');
// Função async: 
async function buscarEMostrarVideos() {
    try {
        // Buscando os dados da API
        const busca = await fetch("http://localhost:3000/videos");
        // Recebendo Json e tranfosrmando num object javascript
        const videos = await busca.json();
        // Varredura dos vídeos, levando em consideração possiveis erros, como por exemplo se a categoria não estiver indicada
        videos.forEach((video) => {
            if (video.categoria == "") {
                throw new Error('Vídeo não tem categoria');
            }
            // Adiciona ao html uma lista contendo os vídeos dos quais os atributos são retirados da api 
            containerVideos.innerHTML += `
            <li class="videos__item">
                <iframe src="${video.url}" title="${video.titulo}" frameborder="0" allowfullscreen></iframe>
                <div class="descricao-video">
                    <img class="img-canal" src="${video.imagem}" alt="Logo do canal">
                    <h3 class="titulo-video">${video.titulo}</h3>
                    <p class="titulo-canal">${video.descricao}</p>
                    <p class="categoria" hidden>${video.categoria}</p>
                </div>
            </li>
            `;
        })
        // Espera qualquer erro e retorna o mesmo ao usuário caso seja encontrado
    } catch (error) {
        containerVideos.innerHTML = `<p> Houve um erro ao carregar os vídeos: ${error} </p>`
    }
}

buscarEMostrarVideos();


// Criar a const barraPesquisa para receber o que for digitado no input do site.
const barraDePesquisa = document.querySelector(".pesquisar__input");
// Observamos o input nessa constante pelo método addEventListener
barraDePesquisa.addEventListener("input", filtrarPesquisa);
// Criamos a função que será executada quando o evento for engatilhado/"escutado"
function filtrarPesquisa() {
    // Recebe os vídeos introduzidos na página por meio do api
    const videos = document.querySelectorAll('.videos__item');
    // Se o valor da barra for diferente de vazio, fazemos a busca
    if (barraDePesquisa.value != "") {
        // "Varremos" cada video dentro dos videos selecionados, recebemos seu titulo e transformamos em minúsculas, para podermos comparar com o valor da barra
        // sem problemas. Se o valor do título não incluir o valor da barra, mudamos seu display para none. fazendo com que desapareça da tela.
        // caso contrário, o display recebe block e o vídeo é incluido na pagina
        videos.forEach((video) => {
            const titulo = video.querySelector('.titulo-video').textContent.toLowerCase();
            const valorFiltro = barraDePesquisa.value.toLowerCase();
            video.style.display = valorFiltro ? titulo.includes(valorFiltro) ? 'block' : 'none' : 'block';
        });
    }
}

// Similar como feito acima, onde varremos os itens da lista de videos baseado no input e no titulo do video,
// agora varremos baseado nas categorias dos objetos gerados pela biblioteca JSON

const botaoCategoria = document.querySelectorAll('.superior__item');
// Ao clicar o botão, lemos a categoria indicada no atributo nome
botaoCategoria.forEach((botao) => {
    let nomeCategoria = botao.getAttribute('name');
    botao.addEventListener('click', () => filtrarPorCategoria(nomeCategoria));
})
// Varremos os items da lista e observamos cada categoria indicada, se é correspondente ao valor indicado pelo filtro, o item se manterá na tela
function filtrarPorCategoria(filtro){
    const videos = document.querySelectorAll('.videos__item');
    for(let video of videos){
        let categoria = video.querySelector('.categoria').textContent.toLowerCase();
        let valorFiltro = filtro.toLowerCase();

        if(!categoria.includes(valorFiltro) && valorFiltro != 'tudo'){
            video.style.display = 'none';
        } else {
            video.style.display = 'block';
        }
    }
}