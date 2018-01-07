//Array.
var anos = [];
//Variável.
var dados;


//Função que faz load do ficheiro de excel antes do programa arrancar.
function preload() {
    dados = loadTable("assets/dados.csv", "csv", "header");
}


//Função que cria as condições para a função draw funcionar.
function setup() {
    //"createCanvas" syntax que cria o espaço para que o desenho aconteça (Neste caso, toda a largura e altura do ecrã).
    createCanvas(windowWidth, windowHeight);
    drawBackground();


    factor_ = 2;
    //print(dados.getRowCount());
    //print(dados.getColumnCount());
    //print(dados.getColumn("Km"));

    //Para a variável linha=0 quando o valor de linha é menor que o rowcount acrescenta mais 1 valor.
    for (var linha = 0; linha < dados.getRowCount(); linha++) {
        //Para os dois "for" anteriormente referidos.
        //A variável "x" contem a largura do ecrã a dividir por o rowcount vezes o valor de "linha".
        var x = (width / dados.getRowCount()) * linha + 20;

        //A variável "y" contem metade da altura do ecrã.
        var y = height / 2;
        /*
        * Como sabemos exatamente o numero de colunas e o que elas representam n precisamos de outro ciclo
        */
        //A variável ano irá retirar uma string do valor de linha na coluna 0.
        var frequencia = dados.getString(linha, 0);
        //A variável amplitude irá retirar um valor do valor de linha na coluna 1.
        var amplitude = dados.getNum(linha, 1);
        //A variável tempo irá retirar um valor do valor de linha na coluna 2.
        var tempo = dados.getNum(linha, 2);

        //Array "anos" consoante o valor de linha irá guardar no array "Frequencia" o valor atual das seguites variáveis.
        anos[linha] = new Frequencia(x, y, frequencia, amplitude, tempo, factor_, 15);
        //print(ano+" - "+amplitude+" - "+tempo);
    }
}


//Função que irá desenhar no canvas.
function draw() {
    //Para a variável "i" que é igual a "0", quando "i" é menor que o rowcount atual acrescenta +1.
    for (var linha = 0; linha < dados.getRowCount(); linha++) {
        anos[linha].desenha();
    }
    //Não repetir o draw.
    noLoop();
}

function drawBackground(){
    background(12,14,15);

    //Desenhar as linhas de fundo
    for (var i = 0; i < 100; i++) {
        //da esquerda para a direita
        line(0, 0, width - i * 20, height);
        //da direita para a esquerda
        line(width, 0, i*20, height);
    }

    //Cor de fundo para o titulo
    fill(200, 200, 200);
    textAlign(CENTER);
    textSize(24);
    text("AMPLITUDE E TEMPO DA FREQUENCIA", width / 2, 50);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

class Frequencia {
    /*
     * A classe frequencia representa o objecto responsavel pelas barras no ecrã
     */
    constructor(x_, y_, frequencia_, amplitude_, tempo_, factor_, largura_, distancia_vertical_) {
        this.x = x_;
        this.y = y_;
        this.ano = frequencia_;
        this.amplitude = amplitude_;
        this.tempo = tempo_;
        this.factor = factor_;
        this.largura = largura_;
        this.distancia_vertical = distancia_vertical_;
    }

    //funcao que desenha o objecto frequencia no ecra
    desenha() {
        // print(this.ano+" - "+this.amplitude+" - "+this.tempo);

        noFill();

        var distanciaDoFundo = 30;

        //Desenhar a amplitude
        fill(221,44,0);
        var alturaAmplitude = this.amplitude / this.factor;
        var alturaAmplitudeFinal = height - alturaAmplitude - distanciaDoFundo;
        //quad (x1, y1, x2, y2, x3, y3, x4, y4)
        quad(this.x, alturaAmplitudeFinal, this.x + this.largura, alturaAmplitudeFinal, this.x + this.largura, height - distanciaDoFundo, this.x, height - distanciaDoFundo);

        //desenhar a altura
        fill(0,184,212);
        //ellipse(this.x, this.y, this.tempo / this.factor);
        var alturaTempo = this.tempo / this.factor;
        var alturaTempoFinal = height - alturaTempo - distanciaDoFundo;
        //usamos largura*2 para ficar ao lado da amplitude
        quad(this.x + this.largura, alturaTempoFinal, this.x + this.largura * 2, alturaTempoFinal, this.x + this.largura*2, height - distanciaDoFundo, this.x + this.largura, height - distanciaDoFundo);

        //label da frequencia
        fill(200, 200, 200);
        textSize(12);
        text(this.ano, this.x + this.largura, height - 15);
    }
}

