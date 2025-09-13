const div_base = document.querySelector(".textos_apoio")
const letra_a = document.querySelector(".a")
const letra_b = document.querySelector(".b")
const letra_c = document.querySelector(".c")
const letra_d = document.querySelector(".d")
const letra_e = document.querySelector(".e")
const botao_gabarito = document.querySelector(".gabarito")
const titulo = document.querySelector("#title")
const botao_proxima = document.querySelector(".proxima")
const botao_anterior = document.querySelector(".anterior")


const letras =  [letra_a,letra_b,letra_c,letra_d,letra_e]

let gabarito_atual = "d"

let numeroQuestao = 0

letras.forEach(letra => {
    letra.addEventListener("click", function(){
        escolher(letra)
    })
})



class Imagem_apoio{
    constructor(nome, fonte){
        this.nome = nome
        this.fonte = fonte
    }
}


class Texto_apoio{
    constructor(titulo, texto, fonte){
        this.titulo = titulo
        this.texto = texto
        this.fonte = fonte
    }
}

class Questao{
    constructor(enunciado, alternativas, textos_apoio, imagens_apoio, gabarito){
        this.enunciado = enunciado
        this.alternativas = alternativas
        this.textos_apoio = textos_apoio
        this.imagens_apoio = imagens_apoio
        this.gabarito = gabarito
    }
}

function escolher(letra){
    zerarEscolhas(letras)
    letra.classList.add("escolha")

}

function removerEscolha(letra){
    letra.classList.remove("escolha")
}


function removerGabarito(letra){
    letra.classList.remove("correta")
}

function eGabarito(letra){
    let lista_de_classes =  letra.classList
    for(let i = 0 ; i< lista_de_classes.length; i++){
        if(lista_de_classes[i]== "correta"){
            return true
        }
    }
    return false
}

function escolhida(letra){
    let lista_de_classes =  letra.classList
    for(let i = 0 ; i< lista_de_classes.length; i++){
        if(lista_de_classes[i]== "escolha"){
            return true
        }
    }
    return false
}

function zerarGabarito(letras){
    letras.forEach(letra =>{
            if(eGabarito(letra)){
                removerGabarito(letra)
            }
        })
}

function zerarEscolhas(letras){
    letras.forEach(letra =>{
            if(escolhida(letra)){
                removerEscolha(letra)
            }
        })
}


function adicionarFonte(fonte){
    let paragrafo = document.createElement("p")
    paragrafo.innerText = fonte
    paragrafo.classList.add("fonte")
    div_base.appendChild(paragrafo)
}

function adicionarImagem(imagem){
    let img = document.createElement("img")
    img.src = "/src/imagens/" + imagem.nome + ".png" // Caminho absoluto
    div_base.appendChild(img)
    adicionarFonte(imagem.fonte)
}

function adicionarEnunciado(enunciado){
    let paragrafo = document.createElement("p")
    paragrafo.innerText = enunciado
    div_base.appendChild(paragrafo)
}

function adicionarTextoApoio(texto_apoio){
    const h2 = document.createElement("h2")
    h2.innerText = texto_apoio.titulo
    h2.classList.add("titulo_texto_apoio")

    const p = document.createElement("p")
    p.innerText = texto_apoio.texto
    p.classList.add("texto_apoio")

    const fonte = document.createElement("p")
    fonte.innerText = texto_apoio.fonte
    fonte.classList.add("fonte")

    div_base.appendChild(h2)
    div_base.appendChild(p)
    div_base.appendChild(fonte)

}

function carregarAlternativas(alternativas){
    letra_a.innerText = alternativas[0]
    letra_b.innerText = alternativas[1]
    letra_c.innerText = alternativas[2]
    letra_d.innerText = alternativas[3]
    letra_e.innerText = alternativas[4]
}

function revelarGabarito(questao){
    gabarito_atual = questao.gabarito
    letras.forEach(letra =>{
        let classes = letra.classList
        for(let i = 0; i<classes.length;i++){
            if(classes[i] == gabarito_atual){
                letra.classList.add("correta")
                console.log(gabarito_atual)
            }
        }
    })
}

function addNumberTittle(numero){
    console.log(numero)
    titulo.innerText = "Gerador de ENEM INGLES " + numero
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


let questaoAtual = null; // Adicione esta variável global

function gerarQuestao(questao){
    zerarGabarito(letras)
    questaoAtual = questao; // Atualize a questão atual
    if(questao.textos_apoio != false){
        questao.textos_apoio.forEach(element =>{
            adicionarTextoApoio(element)
        })
    }

    if(questao.imagens_apoio != false){
        questao.imagens_apoio.forEach(element => {
            adicionarImagem(element)
        });
    }
    adicionarEnunciado(questao.enunciado)
    carregarAlternativas(questao.alternativas)
}

botao_gabarito.addEventListener("click", function(){
    if (questaoAtual) {
        revelarGabarito(questaoAtual);
    }
});


function sortearQuestao(lista){
    numeroQuestao = getRandomIntInclusive(0,lista.length - 1)
    gerarQuestao(lista_de_questoes[numeroQuestao])
    addNumberTittle(numeroQuestao)
}

function zerarQuestao(){
    div_base.innerHTML = ""
}


function proximaQuestao(lista){
    if(numeroQuestao <= lista.length -2){
        numeroQuestao +=1
        zerarQuestao()
        gerarQuestao(lista[numeroQuestao])
        gabarito_atual = lista[numeroQuestao].gabarito
        addNumberTittle(numeroQuestao)
    }
}

function questaoAnterior(lista){
    if(numeroQuestao >= 1){
        numeroQuestao -=1
        zerarQuestao()
        gerarQuestao(lista[numeroQuestao])
        gabarito_atual = lista[numeroQuestao].gabarito
        addNumberTittle(numeroQuestao)
    }
}


///IMAGENS DE APOIO
imagem_apoio_0 = new Imagem_apoio("0","Disponível em: http://thumbpress.com. Acesso em: 28 out. 2013.")
imagem_apoio_1 = new Imagem_apoio("1","Disponível em: http://thumbpress.com. Acesso em: 28 out. 2013.")

///TEXTOS DE APOIO
texto_apoio_0 = new Texto_apoio("Holy War", "Oh, so we can hate each other and fear each other \
We can build these walls between each other \
Baby, blow by blow and brick by brick \
Keep yourself locked in, yourself locked in \
[…] \
Oh, maybe we should love somebody \
Oh, maybe we could care a little more \
So maybe we should love somebody \
Instead of polishing the bombs of holy war", "KEYS, A. Here. Estados Unidos: RCA Records, 2016.")

///QUESTOES
const questao_0 = new Questao("A relação entre as citações atribuídas ao físico Albert Einstein \
e ao cantor e compositor Bob Marley reside na crença de que \
é necessário", ["A dar oportunidade a pessoas que parecem necessitadas", 
    "B identificar contextos que podem representar perigo.",
"C tirar proveito de situações que podem ser adversas.",
"D evitar dificuldades que parecem ser intransponíveis",
"E contestar circunstâncias que parecem ser harmônicas."], false, [imagem_apoio_0,imagem_apoio_1],"c")

const questao_1 = new Questao("Nessa letra de canção, que aborda um contexto de ódio \
e intolerância, o marcador “instead of ” introduz a ideia de",["A mudança de comportamento.", "B panorama de conflitos.", 
    "C rotina de isolamento", "D perspectiva bélica", "E cenário religioso."],[texto_apoio_0],false,"a")


///LISTA PRINCIPAL

const lista_de_questoes = [questao_0, questao_1]

botao_proxima.addEventListener("click", function(){
    proximaQuestao(lista_de_questoes)
})

botao_anterior.addEventListener("click", function(){
    questaoAnterior(lista_de_questoes)
})




sortearQuestao(lista_de_questoes)
