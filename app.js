let listaNumerosSorteados = [];
let numeroMaximo = 10
let numeroSecreto = gerarNumeroSecreto()
let tentativas = 1;
let titulo = "Jogo do número secreto"
let paragrafo = `Escolha um número entre 1 e ${numeroMaximo}`
let mensagemNumeroMaior = "Número maior que o secreto"
let mensagemNumeroMenor = "Número menor que o secreto"
let mensagemDeAcertou = "Parabéns!! Você acertou."

function exibirTextoNaTela(tag, texto) {
  let campo = document.querySelector(tag)
  campo.innerHTML = texto
  responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2})
}

function exibirTextoInicial(){
  exibirTextoNaTela("h1", titulo)
  exibirTextoNaTela("p", paragrafo)
}

function verificarChute() {
  let numeroDoChute = document.querySelector("input").value
  let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa'
  let mensagemDeAcertouParagrafo = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}`
   
  if (numeroDoChute == numeroSecreto) {
    exibirTextoNaTela("h1", mensagemDeAcertou)
    exibirTextoNaTela("p", mensagemDeAcertouParagrafo)
    document.getElementById('reiniciar').removeAttribute('disabled')
  } else {
    if (numeroDoChute > numeroSecreto) {
      exibirTextoNaTela("p", mensagemNumeroMaior)
    }else{
      exibirTextoNaTela("p", mensagemNumeroMenor)
    }
    tentativas++
    limparCampo()
  }
}

function limparCampo(){
  numeroDoChute = document.querySelector('input')
  numeroDoChute.value = ''
}

function reiniciarJogo(){
  tentativas = 1;
  limparCampo();
  exibirTextoInicial();
  gerarNumeroSecreto();
  document.getElementById('reiniciar').setAttribute('disabled', true)
}

function gerarNumeroSecreto() {
  let numeroEscolhido = parseInt(Math.random() * numeroMaximo + 1)
  let quantidadeDeElementos = listaNumerosSorteados.length

  if (quantidadeDeElementos == numeroMaximo){
    listaNumerosSorteados = [];
  }

  if (listaNumerosSorteados.includes(numeroEscolhido)){
    return gerarNumeroSecreto();
  }else {
    listaNumerosSorteados.push(numeroEscolhido)
    return numeroEscolhido
  }
}

exibirTextoInicial()