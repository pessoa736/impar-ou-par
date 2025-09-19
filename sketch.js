


///definição de cores

const B = "#000"
const W = "#fff"

/// configuração de renderização

var tela_atual
var cor_do_background = W
const tile_size = 32
const aspect = (3/4)

var tamanho_da_tela_x = tile_size*24
var  tamanho_da_tela_y = parseInt((tamanho_da_tela_x*aspect)/tile_size)*tile_size
var  tamanho_de_text = parseInt(tile_size*0.75) 
var valor_antigo_do_mouse = false

// contador de tempo
var time = 0



// imagens
var dedo1, dedo2 
let bg_x1 = 0, bg_y1 = 0, bg_d1 = 1
let bg_x2 = 0, bg_y2 = 0, bg_d2 = -1
var background_
var vinheta 

// mecanica de jogo
var contador_de_dedos = 0
var numero_escolhido = 0
var numero_do_computador = 0
var total_de_dedos = 0
var escolha_par_ou_impar = ""

var dedo_selecionado1 = false
var dedo_selecionado2 = false
var dedo_selecionado3 = false
var dedo_selecionado4 = false
var dedo_selecionado5 = false
var dedo_selecionado6 = false
var dedo_selecionado7 = false
var dedo_selecionado8 = false
var dedo_selecionado9 = false
var dedo_selecionado10 = false


/// "loadImages" É uma função do p5.js não nativa do javascript
function preload(){
  dedo1 = loadImage("assets/dedo.png")
  dedo2 = loadImage("assets/dedo2.png")
  background_ = loadImage("assets/background_jogo_lop.png")
  vinheta = loadImage("assets/vinheta_lop.png")
}


function setup() {
  createCanvas(tamanho_da_tela_x, tamanho_da_tela_y);
}




function draw() {
  background(cor_do_background);
  
  if (parseInt(bg_x1) == tile_size*2) {
    bg_d1 = -1
  }else if (parseInt(bg_x1) == 0) {
    bg_d1 = 1
  }
  if (parseInt(bg_y2) == tile_size*2) {
    bg_d2 = -1
  }else if (parseInt(bg_y2) == 0) {
    bg_d2 = 1
  }

  bg_x1 += bg_d1*0.2
  bg_y2 += bg_d2*0.3

  image(background_, -tile_size*4 + bg_x1, -tile_size*4 + bg_y1, tamanho_da_tela_x+tile_size*8, tamanho_da_tela_y+tile_size*8);
  rotate(0.01)
  image(background_, -tile_size*4 + bg_x2, -tile_size*4 + bg_y2, tamanho_da_tela_x+tile_size*8, tamanho_da_tela_y+tile_size*8);
  rotate(-0.01)
  fill("rgba(255, 255, 255, 0.1)")  
  rect(0,0,tamanho_da_tela_x,tamanho_da_tela_y)
  
  switch(tela_atual){
    
      
      
    // tela do menu 
    case "menu":
      
      
      let x, y, w, h, text_, n /// utilizarei essa mesmas variaveis para todos os butões no menu
      
      
      // o butão de instruções
      n = 1
      x = tamanho_da_tela_x*0.5
      y = tile_size*(2+3*n)
      w = tile_size*8
      h = tile_size*2
      text_ = "instruções"
      
      
      fill(W)
      rect(x - w/2 -3, y-h/2 -3, w+6, h+6, tile_size/2)
      fill(B)
      rect(x - w/2 -1, y-h/2 -1, w+2, h+2, tile_size/2)  
      fill(W)
      rect(x - w/2, y-h/2, w, h, tile_size/2) 
      fill(B)
      textSize(tamanho_de_text)
      textAlign(CENTER)
      text(text_, x, y+tile_size/4)

      if (x-w/2 < mouseX && x+w/2 > mouseX && y-h/2 < mouseY && y+h/2 > mouseY){
        if (mouseIsPressed === true){
          tela_atual = text_
        }
      }
      
      // o butão de jogar
      n++
      x = tamanho_da_tela_x*0.5
      y = tile_size*(2+3*n)
      w = tile_size*8
      h = tile_size*2
      text_ = "jogar"
      
      fill(W)
      rect(x - w/2 -3, y-h/2 -3, w+6, h+6, tile_size/2)
      fill(B)
      rect(x - w/2 -1, y-h/2 -1, w+2, h+2, tile_size/2)  
      fill(W)
      rect(x - w/2, y-h/2, w, h, tile_size/2) 
      fill(B)
      textSize(tamanho_de_text)
      textAlign(CENTER)
      text(text_, x, y+tile_size/4)
      
      if (x-w/2 < mouseX && x+w/2 > mouseX && y-h/2 < mouseY && y+h/2 > mouseY){
        if (mouseIsPressed === true){
          tela_atual = text_
        }
      }
      
      
      
      // o butão de creditos
      n++
      x = tamanho_da_tela_x*0.5
      y = tile_size*(2+3*n)
      w = tile_size*8
      h = tile_size*2
      text_ = "creditos"
      
      fill(W)
      rect(x - w/2 -3, y-h/2 -3, w+6, h+6, tile_size/2)
      fill(B)
      rect(x - w/2 -1, y-h/2 -1, w+2, h+2, tile_size/2)  
      fill(W)
      rect(x - w/2, y-h/2, w, h, tile_size/2) 
      fill(B)
      textSize(tamanho_de_text)
      textAlign(CENTER)
      text(text_, x, y+tile_size/4)
      
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
      x2 = tamanho_da_tela_x*0.5
      y2 = tile_size*2
      w2 = tile_size*17
      h2 = tile_size*2
      text_2 = "selecione os dedos para fazer o numero desejado"
      
      
      fill(B)
      rect(x2 - w2/2 -3, y2-h2/2 -3, w2+6, h2+6, tile_size/2)
      fill(W)
      rect(x2 - w2/2 -2, y2-h2/2 -2, w2+4, h2+4, tile_size/2)  
      fill(B)
      rect(x2 - w2/2, y2-h2/2, w2, h2, tile_size/2) 

      fill(W)
      textSize(tamanho_de_text)
      textAlign(CENTER)
      text(text_2, x2, y2+tile_size/4)

      // dedo 1
      n2 = 0
      x2 = tamanho_da_tela_x*(n2*0.1 + 0.05)
      y2 = tamanho_da_tela_y*0.9
      w2 = tile_size*2
      h2 = tile_size*5
      
      if (x2-w2/2 < mouseX && x2+w2/2 > mouseX && y2-h2/2 < mouseY && y2+h2/2 > mouseY){
        if (mouseIsPressed === true && valor_antigo_do_mouse !== mouseIsPressed){
          contador_de_dedos++
          dedo_selecionado1 = !dedo_selecionado1
        }
      }
      if (dedo_selecionado1 === true){
        image(dedo1, x2 - w2/2, y2 - h2/2, w2, h2)
      }else{
        image(dedo2, x2 - w2/2, y2 - h2/2, w2, h2)
      }
      
      // dedo 2
      n2++
      x2 = tamanho_da_tela_x*(n2*0.1 + 0.05)
      y2 = tamanho_da_tela_y*0.9
      w2 = tile_size*2
      h2 = tile_size*5
      
      if (x2-w2/2 < mouseX && x2+w2/2 > mouseX && y2-h2/2 < mouseY && y2+h2/2 > mouseY){
        if (mouseIsPressed === true && valor_antigo_do_mouse !== mouseIsPressed ){
          contador_de_dedos++
          dedo_selecionado2 = !dedo_selecionado2
        }
      }
      if (dedo_selecionado2 === true){
        image(dedo1, x2 - w2/2, y2 - h2/2, w2, h2)
      }else{
        image(dedo2, x2 - w2/2, y2 - h2/2, w2, h2)
      }

      // dedo 3
      n2++
      x2 = tamanho_da_tela_x*(n2*0.1 + 0.05)
      y2 = tamanho_da_tela_y*0.9
      w2 = tile_size*2
      h2 = tile_size*5
      
      if (x2-w2/2 < mouseX && x2+w2/2 > mouseX && y2-h2/2 < mouseY && y2+h2/2 > mouseY){
        if (mouseIsPressed === true && valor_antigo_do_mouse !== mouseIsPressed){
          contador_de_dedos++
          dedo_selecionado3 = !dedo_selecionado3
        }
      }
      if (dedo_selecionado3 === true){
        image(dedo1, x2 - w2/2, y2 - h2/2, w2, h2)
      }else{
        image(dedo2, x2 - w2/2, y2 - h2/2, w2, h2)
      }
      
      // dedo 4
      n2++
      x2 = tamanho_da_tela_x*(n2*0.1 + 0.05)
      y2 = tamanho_da_tela_y*0.9
      w2 = tile_size*2
      h2 = tile_size*5
      
      if (x2-w2/2 < mouseX && x2+w2/2 > mouseX && y2-h2/2 < mouseY && y2+h2/2 > mouseY){
        if (mouseIsPressed === true && valor_antigo_do_mouse !== mouseIsPressed){
          contador_de_dedos++
          dedo_selecionado4 = !dedo_selecionado4
        }
      }
      if (dedo_selecionado4 === true){
        image(dedo1, x2 - w2/2, y2 - h2/2, w2, h2)
      }else{
        image(dedo2, x2 - w2/2, y2 - h2/2, w2, h2)
      }

      // dedo 5
      n2++
      x2 = tamanho_da_tela_x*(n2*0.1 + 0.05)
      y2 = tamanho_da_tela_y*0.9
      w2 = tile_size*2
      h2 = tile_size*5
      
      if (x2-w2/2 < mouseX && x2+w2/2 > mouseX && y2-h2/2 < mouseY && y2+h2/2 > mouseY){
        if (mouseIsPressed === true && valor_antigo_do_mouse !== mouseIsPressed){
          contador_de_dedos++
          dedo_selecionado5 = !dedo_selecionado5
        }
      }
      if (dedo_selecionado5 === true){
        image(dedo1, x2 - w2/2, y2 - h2/2, w2, h2)
      }else{
        image(dedo2, x2 - w2/2, y2 - h2/2, w2, h2)
      }

      // dedo 6
      n2++
      x2 = tamanho_da_tela_x*(n2*0.1 + 0.05)
      y2 = tamanho_da_tela_y*0.9
      w2 = tile_size*2
      h2 = tile_size*5
      
      if (x2-w2/2 < mouseX && x2+w2/2 > mouseX && y2-h2/2 < mouseY && y2+h2/2 > mouseY){
        if (mouseIsPressed === true && valor_antigo_do_mouse !== mouseIsPressed){
          contador_de_dedos++
          dedo_selecionado6 = !dedo_selecionado6
        }
      }
      if (dedo_selecionado6 === true){
        image(dedo1, x2 - w2/2, y2 - h2/2, w2, h2)
      }else{
        image(dedo2, x2 - w2/2, y2 - h2/2, w2, h2)
      }

      // dedo 7
      n2++
      x2 = tamanho_da_tela_x*(n2*0.1 + 0.05)
      y2 = tamanho_da_tela_y*0.9
      w2 = tile_size*2
      h2 = tile_size*5
      
      if (x2-w2/2 < mouseX && x2+w2/2 > mouseX && y2-h2/2 < mouseY && y2+h2/2 > mouseY){
        if (mouseIsPressed === true && valor_antigo_do_mouse !== mouseIsPressed){
          contador_de_dedos++
          dedo_selecionado7 = !dedo_selecionado7
        }
      }
      if (dedo_selecionado7 === true){
        image(dedo1, x2 - w2/2, y2 - h2/2, w2, h2)
      }else{
        image(dedo2, x2 - w2/2, y2 - h2/2, w2, h2)
      }
      
      // dedo 8
      n2++
      x2 = tamanho_da_tela_x*(n2*0.1 + 0.05)
      y2 = tamanho_da_tela_y*0.9
      w2 = tile_size*2
      h2 = tile_size*5
      
      if (x2-w2/2 < mouseX && x2+w2/2 > mouseX && y2-h2/2 < mouseY && y2+h2/2 > mouseY){
        if (mouseIsPressed === true && valor_antigo_do_mouse !== mouseIsPressed){
          contador_de_dedos++
          dedo_selecionado8 = !dedo_selecionado8
        }
      }
      if (dedo_selecionado8 === true){
        image(dedo1, x2 - w2/2, y2 - h2/2, w2, h2)
      }else{
        image(dedo2, x2 - w2/2, y2 - h2/2, w2, h2)
      }

      // dedo 9
      n2++
      x2 = tamanho_da_tela_x*(n2*0.1 + 0.05)
      y2 = tamanho_da_tela_y*0.9
      w2 = tile_size*2
      h2 = tile_size*5
      
      if (x2-w2/2 < mouseX && x2+w2/2 > mouseX && y2-h2/2 < mouseY && y2+h2/2 > mouseY){
        if (mouseIsPressed === true && valor_antigo_do_mouse !== mouseIsPressed){
          contador_de_dedos++
          dedo_selecionado9 = !dedo_selecionado9
        }
      }
      if (dedo_selecionado9 === true){
        image(dedo1, x2 - w2/2, y2 - h2/2, w2, h2)
      }else{
        image(dedo2, x2 - w2/2, y2 - h2/2, w2, h2)
      }

      // dedo 10
      n2++
      x2 = tamanho_da_tela_x*(n2*0.1 + 0.05)
      y2 = tamanho_da_tela_y*0.9
      w2 = tile_size*2
      h2 = tile_size*5
      
      if (x2-w2/2 < mouseX && x2+w2/2 > mouseX && y2-h2/2 < mouseY && y2+h2/2 > mouseY){
        if (mouseIsPressed === true && valor_antigo_do_mouse !== mouseIsPressed){
          contador_de_dedos++
          dedo_selecionado10 = !dedo_selecionado10
        }
      }
      if (dedo_selecionado10 === true){
        image(dedo1, x2 - w2/2, y2 - h2/2, w2, h2)
      }else{
        image(dedo2, x2 - w2/2, y2 - h2/2, w2, h2)
      }

      
      
      valor_antigo_do_mouse = mouseIsPressed
      
      break;
    
    
    // caso não tenha uma tela definida, escolher o menu
    default: 
      console.log("modo indefinido")
      tela_atual = "menu";  
      
  }
  image(vinheta, 0, 0, tamanho_da_tela_x, tamanho_da_tela_y);
  time++
}