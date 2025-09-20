


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
var time_jogo = 0



// imagens
var dedo1, dedo2 
var dedoBot1, dedoBot2
let bg_x1 = 0, bg_y1 = 0, bg_d1 = 1
let bg_x2 = 0, bg_y2 = 0, bg_d2 = -1
var background_
var vinheta


// sons
var audioHabilitado = false
var sound



// mecanica de jogo
var estado_do_jogo = "escolha" // "escolha", "escolha do bot", "resultado"
var contador_de_dedos = 0
var numero_escolhido = 0
var numero_do_computador = 0
var total_de_dedos = 0
var bote_pode_jogar = false
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

var dedo_selecionado_bot1 = false 
var dedo_selecionado_bot2 = false
var dedo_selecionado_bot3 = false
var dedo_selecionado_bot4 = false
var dedo_selecionado_bot5 = false
var dedo_selecionado_bot6 = false
var dedo_selecionado_bot7 = false
var dedo_selecionado_bot8 = false
var dedo_selecionado_bot9 = false
var dedo_selecionado_bot10 = false




/// "loadImages" É uma função do p5.js não nativa do javascript, eu não cheguei a criar essas funções
function preload(){
  dedo1 = loadImage("assets/dedo.png")
  dedo2 = loadImage("assets/dedo2.png")
  dedoBot1 = loadImage("assets/dedoBot.png")
  dedoBot2 = loadImage("assets/dedoBot2.png")
  background_ = loadImage("assets/background_jogo_lop.png")
  vinheta = loadImage("assets/vinheta_lop.png")
  sound = loadSound("assets/Red Shift - The Grey Room _ Density & Time(modificado no audacity).mp3")
}


function setup() {
  // esse "getAudioContext()" é do p5.js não nativo do javascrip, eu não cheguei a criar essas funções, apenas chamei elas
  getAudioContext().suspend();
  createCanvas(tamanho_da_tela_x, tamanho_da_tela_y);

  /// esse ".setLoop()" é do p5.js não nativo do javascrip, eu não cheguei a criar essas funções, apenas chamei elas
  sound.play()
}


// apertar o mouse para iniciar o audio
function mousePressed() {
  userStartAudio();
}





function draw() {
  // apenas ajeitando o fundo
  background(cor_do_background);



  /// animação de background
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
  rotate(0.05)
  image(background_, -tile_size*4 + bg_x2, -tile_size*4 + bg_y2, tamanho_da_tela_x+tile_size*8, tamanho_da_tela_y+tile_size*8);
  rotate(-0.05)
  fill("rgba(255, 255, 255, 0.1)")  
  rect(0,0,tamanho_da_tela_x,tamanho_da_tela_y)
  


  
  /// as telas
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

      // dedo 1
      n2 = 0
      x2 = tamanho_da_tela_x*(n2*0.1 + 0.05)
      y2 = tamanho_da_tela_y*0.9
      w2 = tile_size*2
      h2 = tile_size*5
      
      if (x2-w2/2 < mouseX && x2+w2/2 > mouseX && y2-h2/2 < mouseY && y2+h2/2 > mouseY){
        if (mouseIsPressed === true && valor_antigo_do_mouse !== mouseIsPressed){
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
          dedo_selecionado10 = !dedo_selecionado10
        }
      }
      if (dedo_selecionado10 === true){
        image(dedo1, x2 - w2/2, y2 - h2/2, w2, h2)
      }else{
        image(dedo2, x2 - w2/2, y2 - h2/2, w2, h2)
      }
      
      translate(tamanho_da_tela_x, tamanho_da_tela_y)
      rotate(PI)



      // dedo do bot 1
      n2 = 0
      x2 = tamanho_da_tela_x*(n2*0.1 + 0.05)
      y2 = tamanho_da_tela_y*0.9
      w2 = tile_size*2
      h2 = tile_size*5

      if (bote_pode_jogar === true && time_jogo > 60){
        dedo_selecionado_bot1 = random(0, 1) === 1
      }
      
      if (dedo_selecionado_bot1 === true){
        image(dedoBot1, x2 - w2/2, y2 - h2/2, w2, h2)
      }else{
        image(dedoBot2, x2 - w2/2, y2 - h2/2, w2, h2)
      }
      
      // dedo do bot 2
      n2++
      x2 = tamanho_da_tela_x*(n2*0.1 + 0.05)
      y2 = tamanho_da_tela_y*0.9
      w2 = tile_size*2
      h2 = tile_size*5

      if (bote_pode_jogar === true && time_jogo > 60){
        dedo_selecionado_bot2 = random(0, 2) === 1
      }
      
      if (dedo_selecionado_bot2 === true){
        image(dedoBot1, x2 - w2/2, y2 - h2/2, w2, h2)
      }else{
        image(dedoBot2, x2 - w2/2, y2 - h2/2, w2, h2)
      }

      // dedo do bot 3
      n2++
      x2 = tamanho_da_tela_x*(n2*0.1 + 0.05)
      y2 = tamanho_da_tela_y*0.9
      w2 = tile_size*2
      h2 = tile_size*5
      
      if (bote_pode_jogar === true && time_jogo > 60){
        dedo_selecionado_bot3 = random(0, 3) === 1
      }

      if (dedo_selecionado_bot3 === true){
        image(dedoBot1, x2 - w2/2, y2 - h2/2, w2, h2)
      }else{
        image(dedoBot2, x2 - w2/2, y2 - h2/2, w2, h2)
      }
      
      // dedo do bot 4
      n2++
      x2 = tamanho_da_tela_x*(n2*0.1 + 0.05)
      y2 = tamanho_da_tela_y*0.9
      w2 = tile_size*2
      h2 = tile_size*5

      if (bote_pode_jogar === true && time_jogo > 60){
        dedo_selecionado_bot4 = random(0, 4) === 1
      }

      if (dedo_selecionado_bot4 === true){
        image(dedoBot1, x2 - w2/2, y2 - h2/2, w2, h2)
      }else{
        image(dedoBot2, x2 - w2/2, y2 - h2/2, w2, h2)
      }

      // dedo do bot 5
      n2++
      x2 = tamanho_da_tela_x*(n2*0.1 + 0.05)
      y2 = tamanho_da_tela_y*0.9
      w2 = tile_size*2
      h2 = tile_size*5
      
      if (bote_pode_jogar === true && time_jogo > 60){
        dedo_selecionado_bot5 = random(0, 5) === 1
      }

      if (dedo_selecionado_bot5 === true){
        image(dedoBot1, x2 - w2/2, y2 - h2/2, w2, h2)
      }else{
        image(dedoBot2, x2 - w2/2, y2 - h2/2, w2, h2)
      }

      // dedo do bot 6
      n2++
      x2 = tamanho_da_tela_x*(n2*0.1 + 0.05)
      y2 = tamanho_da_tela_y*0.9
      w2 = tile_size*2
      h2 = tile_size*5
      
      if (bote_pode_jogar === true && time_jogo > 60){
        dedo_selecionado_bot6 = random(0, 6) === 1
      }

      if (dedo_selecionado_bot6 === true){
        image(dedoBot1, x2 - w2/2, y2 - h2/2, w2, h2)
      }else{
        image(dedoBot2, x2 - w2/2, y2 - h2/2, w2, h2)
      }

      // dedo do bot7
      n2++
      x2 = tamanho_da_tela_x*(n2*0.1 + 0.05)
      y2 = tamanho_da_tela_y*0.9
      w2 = tile_size*2
      h2 = tile_size*5
      
      if (bote_pode_jogar === true && time_jogo > 60){
        dedo_selecionado_bot7 = random(0, 7) === 1
      }

      if (dedo_selecionado_bot7 === true){
        image(dedoBot1, x2 - w2/2, y2 - h2/2, w2, h2)
      }else{
        image(dedoBot2, x2 - w2/2, y2 - h2/2, w2, h2)
      }
      
      // dedo do bot 8
      n2++
      x2 = tamanho_da_tela_x*(n2*0.1 + 0.05)
      y2 = tamanho_da_tela_y*0.9
      w2 = tile_size*2
      h2 = tile_size*5
      
      if (bote_pode_jogar === true && time_jogo > 60){
        dedo_selecionado_bot8 = random(0, 8) === 1
      }

      if (dedo_selecionado_bot8 === true){
        image(dedoBot1, x2 - w2/2, y2 - h2/2, w2, h2)
      }else{
        image(dedoBot2, x2 - w2/2, y2 - h2/2, w2, h2)
      }

      // dedo do bot 9
      n2++
      x2 = tamanho_da_tela_x*(n2*0.1 + 0.05)
      y2 = tamanho_da_tela_y*0.9
      w2 = tile_size*2
      h2 = tile_size*5
      
      if (bote_pode_jogar === true && time_jogo > 60){
        dedo_selecionado_bot9 = random(0, 9) === 1
      }

      if (dedo_selecionado_bot9 === true){
        image(dedoBot1, x2 - w2/2, y2 - h2/2, w2, h2)
      }else{
        image(dedoBot2, x2 - w2/2, y2 - h2/2, w2, h2)
      }

      // dedo do bot 10
      n2++
      x2 = tamanho_da_tela_x*(n2*0.1 + 0.05)
      y2 = tamanho_da_tela_y*0.9
      w2 = tile_size*2
      h2 = tile_size*5
      
      if (bote_pode_jogar === true && time_jogo > 60){
        dedo_selecionado_bot10 = random(0, 10) === 1
      }

      if (dedo_selecionado_bot10 === true){
        image(dedoBot1, x2 - w2/2, y2 - h2/2, w2, h2)
      }else{
        image(dedoBot2, x2 - w2/2, y2 - h2/2, w2, h2)
      }


      rotate(-PI)
      translate(-tamanho_da_tela_x, -tamanho_da_tela_y)
      
      if (estado_do_jogo === "escolha"){
        x2 = tamanho_da_tela_x*0.5
        y2 = tamanho_da_tela_y*0.15
        w2 = tile_size*9
        h2 = tile_size*2
        text_2 = "Dedos selecionados: " + contador_de_dedos
        
        fill(B)
        rect(x2 - w2/2, y2-h2/2, w2, h2, tile_size/2)
        fill(W)
        textSize(tamanho_de_text)
        textAlign(CENTER)
        text(text_2, x2, y2+tile_size/4)

        x2 = tamanho_da_tela_x*0.4
        y2 = tamanho_da_tela_y*0.3
        w2 = tile_size*3
        h2 = tile_size*2
        text_2 = "impar" 

        if (escolha_par_ou_impar === text_2){
          fill(W)
          rect(x2 - w2/2 -3, y2-h2/2 -3, w2+6, h2+6, tile_size/2)
          fill(B)
          rect(x2 - w2/2 -1, y2-h2/2 -1, w2+2, h2+2, tile_size/2)  
          fill(W)
          rect(x2 - w2/2, y2-h2/2, w2, h2, tile_size/2)
          fill(B)
          textSize(tamanho_de_text)
          textAlign(CENTER)
          text(text_2, x2, y2+tile_size/4)
        }else{
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
        }

        if (mouseX > x2 - w2/2 && mouseX < x2 + w2/2 && mouseY > y2 - h2/2 && mouseY < y2 + h2/2){
          if (mouseIsPressed === true && valor_antigo_do_mouse !== mouseIsPressed){
            escolha_par_ou_impar = text_2
          }
        }

        x2 = tamanho_da_tela_x*0.6
        y2 = tamanho_da_tela_y*0.3
        w2 = tile_size*3
        h2 = tile_size*2
        text_2 = "par"

        if (escolha_par_ou_impar === text_2){
          fill(W)
          rect(x2 - w2/2 -3, y2-h2/2 -3, w2+6, h2+6, tile_size/2)
          fill(B)
          rect(x2 - w2/2 -1, y2-h2/2 -1, w2+2, h2+2, tile_size/2)  
          fill(W)
          rect(x2 - w2/2, y2-h2/2, w2, h2, tile_size/2)
          fill(B)
          textSize(tamanho_de_text)
          textAlign(CENTER)
          text(text_2, x2, y2+tile_size/4)
        }else{
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
        }

        if (mouseX > x2 - w2/2 && mouseX < x2 + w2/2 && mouseY > y2 - h2/2 && mouseY < y2 + h2/2){
          if (mouseIsPressed === true && valor_antigo_do_mouse !== mouseIsPressed){
            escolha_par_ou_impar = text_2
          }
        }

        x2 = tamanho_da_tela_x*0.5
        y2 = tamanho_da_tela_y*0.5
        w2 = tile_size*8
        h2 = tile_size*2
        text_2 = "jogar"

        fill(W)
        rect(x2 - w2/2 -2, y2 - h2/2 -2, w2+4, h2+4, tile_size/2)
        fill(B)
        rect(x2 - w2/2, y2-h2/2, w2, h2, tile_size/2)
        fill(W)
        textSize(tamanho_de_text)
        textAlign(CENTER)
        text(text_2, x2, y2+tile_size/4)

        if (x2-w2/2 < mouseX && x2+w2/2 > mouseX && y2-h2/2 < mouseY && y2+h2/2 > mouseY){
          if (mouseIsPressed === true && valor_antigo_do_mouse !== mouseIsPressed && contador_de_dedos > 0 && escolha_par_ou_impar !== ""){
            estado_do_jogo = "escolha do bot"
            bote_pode_jogar = true
            time_jogo = 0
          }
        }
      }else if (estado_do_jogo === "escolha do bot"){
        time_jogo++
        if (time_jogo > 60){
          estado_do_jogo = "resultado"
          time_jogo = 0
        }
      }

      contador_de_dedos = 0
      if (dedo_selecionado1) contador_de_dedos++
      if (dedo_selecionado2) contador_de_dedos++
      if (dedo_selecionado3) contador_de_dedos++
      if (dedo_selecionado4) contador_de_dedos++
      if (dedo_selecionado5) contador_de_dedos++
      if (dedo_selecionado6) contador_de_dedos++
      if (dedo_selecionado7) contador_de_dedos++
      if (dedo_selecionado8) contador_de_dedos++
      if (dedo_selecionado9) contador_de_dedos++
      if (dedo_selecionado10) contador_de_dedos++
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