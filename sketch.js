

///definição de cores

const B = "#000"
const W = "#fff"

/// configuração de renderização

var tela_atual = "jogar"
var cor_do_background = B

const celula_de_desenho = 24 // bloco de 32x32 para cada tile

const aspect = (9/16)
const tamanho_da_tela_x = celula_de_desenho*32
const tamanho_da_tela_y = parseInt((aspect*tamanho_da_tela_x)/celula_de_desenho)*celula_de_desenho

const tamanho_de_text =  parseInt(celula_de_desenho/1.5)

var time = 0

let dedo1, dedo2 

function preload(){
  dedo1 = loadImage
}


function setup() {
  createCanvas(tamanho_da_tela_x, tamanho_da_tela_y);
}




function draw() {
  background(cor_do_background);
  
  
  
  
  
  switch(tela_atual){
    
      
      
    // tela do menu 
    case "menu":
      
      
      let x, y, w, h, text_, n /// utilizarei essa mesmas variaveis para todos os butões no menu
      
      
      // o butão de instruções
      n = 1
      x = tamanho_da_tela_x*0.5
      y = celula_de_desenho*(2+3*n)
      w = celula_de_desenho*8
      h = celula_de_desenho*2
      text_ = "instruções"
      
      
      fill(W)
      rect(x - w/2 -3, y-h/2 -3, w+6, h+6, celula_de_desenho/2)
      fill(B)
      rect(x - w/2 -1, y-h/2 -1, w+2, h+2, celula_de_desenho/2)  
      fill(W)
      rect(x - w/2, y-h/2, w, h, celula_de_desenho/2) 
      fill(B)
      textSize(tamanho_de_text)
      textAlign(CENTER)
      text(text_, x, y+celula_de_desenho/4)
      
      if (x-w/2 < mouseX && x+w/2 > mouseX && y-h/2 < mouseY && y+h/2 > mouseY){
        if (mouseIsPressed === true){
          tela_atual = text_
        }
      }
      
      // o butão de jogar
      n++
      x = tamanho_da_tela_x*0.5
      y = celula_de_desenho*(2+3*n)
      w = celula_de_desenho*8
      h = celula_de_desenho*2
      text_ = "jogar"
      
      fill(W)
      rect(x - w/2 -3, y-h/2 -3, w+6, h+6, celula_de_desenho/2)
      fill(B)
      rect(x - w/2 -1, y-h/2 -1, w+2, h+2, celula_de_desenho/2)  
      fill(W)
      rect(x - w/2, y-h/2, w, h, celula_de_desenho/2) 
      fill(B)
      textSize(tamanho_de_text)
      textAlign(CENTER)
      text(text_, x, y+celula_de_desenho/4)
      
      if (x-w/2 < mouseX && x+w/2 > mouseX && y-h/2 < mouseY && y+h/2 > mouseY){
        if (mouseIsPressed === true){
          tela_atual = text_
        }
      }
      
      
      
      // o butão de creditos
      n++
      x = tamanho_da_tela_x*0.5
      y = celula_de_desenho*(2+3*n)
      w = celula_de_desenho*8
      h = celula_de_desenho*2
      text_ = "creditos"
      
      fill(W)
      rect(x - w/2 -3, y-h/2 -3, w+6, h+6, celula_de_desenho/2)
      fill(B)
      rect(x - w/2 -1, y-h/2 -1, w+2, h+2, celula_de_desenho/2)  
      fill(W)
      rect(x - w/2, y-h/2, w, h, celula_de_desenho/2) 
      fill(B)
      textSize(tamanho_de_text)
      textAlign(CENTER)
      text(text_, x, y+celula_de_desenho/4)
      
      if (x-w/2 < mouseX && x+w/2 > mouseX && y-h/2 < mouseY && y+h/2 > mouseY){
        if (mouseIsPressed === true){
          tela_atual = text_
        }
      }
      
      break;
      
      
      
      
      
      
    
    case "instruções":
      
      
      break; 
      
      
      
      
      
      
      
      
      
      
    case "jogar":
      
      let x2, y2, w2, h2, text_2, n2
      n2=0
      x2 = tamanho_da_tela_x*0.5
      y2 = celula_de_desenho*(2+3*n2)
      w2 = celula_de_desenho*16
      h2 = celula_de_desenho*2
      text_2 = "selecione um numero de 1 a 10"
      
      
      fill(B)
      rect(x2 - w2/2 -3, y2-h2/2 -3, w2+6, h2+6, celula_de_desenho/2)
      fill(W)
      rect(x2 - w2/2 -2, y2-h2/2 -2, w2+4, h2+4, celula_de_desenho/2)  
      fill(B)
      rect(x2 - w2/2, y2-h2/2, w2, h2, celula_de_desenho/2) 
      
      fill(W)
      textSize(tamanho_de_text)
      textAlign(CENTER)
      text(text_2, x2, y2+celula_de_desenho/4)
      
      break;
    
    
    // caso não tenha uma tela definida, escolher o menu
    default: 
      console.log("modo indefinido")
      tela_atual = "menu";  
      
  }
  
  time++
}