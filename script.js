let inputTexto = document.querySelector(".input-texto")
let resultado = document.querySelector(".traducao")
let seletorIdioma = document.querySelector(".idioma")
let botaoTraduzir = document.querySelector("button:nth-of-type(1)") // primeiro botão
let botaoAudio = document.querySelector("button:nth-of-type(2)")    // segundo botão

async function traduzir() {
    let texto = inputTexto.value
    let idiomaSelecionado = seletorIdioma.value

    // mapeia o idioma selecionado para o código da API
    let codigoDestino = ""
    let codigoVoz = ""
    if (idiomaSelecionado === "Inglês") {
        codigoDestino = "en"
        codigoVoz = "en-US"
    } else if (idiomaSelecionado === "Alemão") {
        codigoDestino = "de"
        codigoVoz = "de-DE"
    } else if (idiomaSelecionado === "Japonês") {
        codigoDestino = "ja"
        codigoVoz = "ja-JP"
    }

    // monta o endereço da API
    let endereco = "https://api.mymemory.translated.net/get?q=" 
        + encodeURIComponent(texto) 
        + "&langpair=pt-BR|" + codigoDestino

    // faz a requisição
    let resposta = await fetch(endereco)
    let dados = await resposta.json()

    // coloca a tradução na tela
    resultado.textContent = dados.responseData.translatedText

    // guarda o idioma da voz para usar no áudio
    resultado.setAttribute("data-voz", codigoVoz)
}

// Função para falar o texto traduzido
function falarTexto() {
    let texto = resultado.textContent
    let idiomaVoz = resultado.getAttribute("data-voz") || "en-US"

    if (texto && texto !== "A tradução aparecerá aqui...") {
        let utterance = new SpeechSynthesisUtterance(texto)
        utterance.lang = idiomaVoz
        speechSynthesis.speak(utterance)
    }
}

// Ativa os botões
botaoTraduzir.addEventListener("click", traduzir)
botaoAudio.addEventListener("click", falarTexto)
