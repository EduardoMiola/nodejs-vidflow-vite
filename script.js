import axios from "axios";

const containerVideos = document.querySelector(".videos__container");

async function buscarEMostrarVideos() {
  const urlVideos = import.meta.env.VITE_URL_VIDEOS;

  try {
    const { data: videos } = await axios.get(urlVideos);

    videos.forEach((video) => {
      containerVideos.innerHTML += `
                <li class="videos__item">
                    <iframe src="${video.url}" title="${video.titulo}" frameborder="0" allowfullscreen></iframe>
                    <div class="descricao-video">
                        <img class="img-canal" src="${video.imagem} alt="Imagem do canal">
                        <h3 class="titulo-video">${video.titulo}</h3>
                        <p class="titulo-canal">${video.descricao}</p>
                        <p class="categoria" hidden>${video.categoria}</p>
                    </div>
                </li>
            `;
    });
  } catch (error) {
    containerVideos.innerHTML = `<p style="color: red;">Erro ao buscar os vídeos ${error}</p>`;
  } finally {
    console.log("Busca finalizada");
  }
}

buscarEMostrarVideos();

const barraDePesquisa = document.querySelector(".pesquisar__input");

barraDePesquisa.addEventListener("input", filtrarPesquisa);

function filtrarPesquisa(event) {
  const videos = document.querySelectorAll(".videos__item");
  const valorFiltro = barraDePesquisa.value.toLowerCase();
  if (!valorFiltro == "") {
    videos.forEach((video) => {
      const titulo = video
        .querySelector(".titulo-video")
        .textContent.toLowerCase();

      if (!titulo.includes(valorFiltro)) {
        video.style.display = "none";
      } else {
        video.style.display = "block";
      }
    });
  } else {
    videos.forEach((video) => {
      video.style.display = "block";
    });
  }
}

const botaoCategoria = document.querySelectorAll(".superior__item");

botaoCategoria.forEach((botao) => {
  let nomeCategoria = botao.getAttribute("name");
  botao.addEventListener("click", () => filtrarPorCategoria(nomeCategoria));
});

function filtrarPorCategoria(filtro) {
  const videos = document.querySelectorAll(".videos__item");

  videos.forEach((video) => {
    let categoria = video.querySelector(".categoria").textContent.toLowerCase();
    let valorFiltro = filtro.toLowerCase();

    if (!categoria.includes(valorFiltro) && valorFiltro != "tudo") {
      video.style.display = "none";
    } else {
      video.style.display = "block";
    }
  });
}
