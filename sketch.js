


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
var gap_dos_dedos = 0.1



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
var vinheta_x = 0, vinheta_y = 0


// posição e colisão do butão voltar
var voltar_x, voltar_y, voltar_w, voltar_h, text_voltar

voltar_x = tamanho_da_tela_x*0.1
voltar_y = tile_size*1
voltar_w = tile_size*4
voltar_h = tile_size*1.5
text_voltar = "VOLTAR"


// sons
var audioHabilitado = false
var sound



// mecanica de jogo
var estado_do_jogo = "escolha" // "escolha",  "resultado"
var jogador_atual = 1 // 1 para jogador 1, 2 para jogador 2
var contador_de_dedos = 0
var numero_escolhido = 0
var numero_do_computador = 0
var total_de_dedos = 0
var bote_pode_jogar = false
var escolha_par_ou_impar = "par"


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

  // animação da vinheta com movimento suave (sem Math)
  var ciclo_x = (time * 0.015) % (3.14159 * 2)
  var ciclo_y = (time * 0.012) % (3.14159 * 2)
  
  // aproximação simples de seno/cosseno usando interpolação
  if (ciclo_x <= 3.14159) {
    vinheta_x = (ciclo_x / 3.14159) * 4 - 2
  } else {
    vinheta_x = ((ciclo_x - 3.14159) / 3.14159) * -4 + 2
  }
  
  if (ciclo_y <= 3.14159) {
    vinheta_y = (ciclo_y / 3.14159) * 3 - 1.5
  } else {
    vinheta_y = ((ciclo_y - 3.14159) / 3.14159) * -3 + 1.5
  }

  image(background_, -tile_size*4 + bg_x1, -tile_size*4 + bg_y1, tamanho_da_tela_x+tile_size*8, tamanho_da_tela_y+tile_size*8);
  image(background_, -tile_size*4 + bg_x2, -tile_size*4 + bg_y2, tamanho_da_tela_x+tile_size*8, tamanho_da_tela_y+tile_size*8);
  fill("rgba(255, 255, 255, 0.1)")  
  rect(0,0,tamanho_da_tela_x,tamanho_da_tela_y)
  image(vinheta, 0, 0 , tamanho_da_tela_x, tamanho_da_tela_y);
  
  

  
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
          tela_atual = "jogador1"
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
      
      // Botão voltar
      fill(W)
      rect(voltar_x - voltar_w/2 -3, voltar_y - voltar_h/2 -3, voltar_w+6, voltar_h+6, tile_size/2)
      fill(B)
      rect(voltar_x - voltar_w/2 -1, voltar_y - voltar_h/2 -1, voltar_w+2, voltar_h+2, tile_size/2)
      fill(W)
      rect(voltar_x - voltar_w/2, voltar_y - voltar_h/2, voltar_w, voltar_h, tile_size/2)
      fill(B)
      textSize(tamanho_de_text)
      textAlign(CENTER)
      text(text_voltar, voltar_x, voltar_y+tile_size/4)

      if (voltar_x-voltar_w/2 < mouseX && voltar_x+voltar_w/2 > mouseX && voltar_y-voltar_h/2 < mouseY && voltar_y+voltar_h/2 > mouseY){
        if (mouseIsPressed === true && valor_antigo_do_mouse !== mouseIsPressed){
          tela_atual = "menu"
        }
      }
      // atualiza o estado do clique para permitir detecção por borda
      valor_antigo_do_mouse = mouseIsPressed
      
      break; 
      
      
      
      
      
      
      
      
      
      
    case "creditos":
      
      // Botão voltar (usando diretamente voltar_*)
      fill(W)
      rect(voltar_x - voltar_w/2 -3, voltar_y - voltar_h/2 -3, voltar_w+6, voltar_h+6, tile_size/2)
      fill(B)
      rect(voltar_x - voltar_w/2 -1, voltar_y - voltar_h/2 -1, voltar_w+2, voltar_h+2, tile_size/2)
      fill(W)
      rect(voltar_x - voltar_w/2, voltar_y - voltar_h/2, voltar_w, voltar_h, tile_size/2)
      fill(B)
      textSize(tamanho_de_text)
      textAlign(CENTER)
      text(text_voltar, voltar_x, voltar_y+tile_size/4)

      if (voltar_x-voltar_w/2 < mouseX && voltar_x+voltar_w/2 > mouseX && voltar_y-voltar_h/2 < mouseY && voltar_y+voltar_h/2 > mouseY){
        if (mouseIsPressed === true && valor_antigo_do_mouse !== mouseIsPressed){
          tela_atual = "menu"
        }
      }
      // atualiza o estado do clique para permitir detecção por borda
      valor_antigo_do_mouse = mouseIsPressed
      
      break;
      
      
      
      
      
      
    case "jogador1":
      let x2, y2, w2, h2, text_2, n2
      let todosDedosx = 0; let todosDedosy = tamanho_da_tela_y*0.75


      // mouse normal (sem rotação)
      const mx = mouseX 
      const my = mouseY



      // Título indicando que é a vez do Jogador 1
      fill(B)
      rect(0, 0, tamanho_da_tela_x, tile_size*2)
      fill(W)
      textSize(tamanho_de_text * 1.25)
      textAlign(CENTER)
      text("JOGADOR 1 - ESCOLHA SEUS DEDOS", tamanho_da_tela_x*0.6, tile_size*1.25)


      
      // dedo 1
      n2 = 0
      x2 = tamanho_da_tela_x*(n2*gap_dos_dedos + gap_dos_dedos/2)+todosDedosx
      y2 = todosDedosy
      w2 = tile_size*2
      h2 = tile_size*5

      
      if (dedo_selecionado1 === true){
        image(dedo1, x2 - w2/2, y2 - h2/2, w2, h2)
      }else{
        image(dedo2, x2 - w2/2, y2 - h2/2, w2, h2)
      }

      

      if (x2-w2/2 < mx && x2+w2/2 > mx && y2-h2/2 < my && y2+h2/2 > my){
        if (mouseIsPressed === true && valor_antigo_do_mouse !== mouseIsPressed){
          dedo_selecionado1 = !dedo_selecionado1
        }
      }
      
      
      
      // dedo 2
      n2++
      x2 = tamanho_da_tela_x*(n2*gap_dos_dedos + gap_dos_dedos/2)+todosDedosx
      y2 = todosDedosy
      w2 = tile_size*2
      h2 = tile_size*5

      if (x2-w2/2 < mx && x2+w2/2 > mx && y2-h2/2 < my && y2+h2/2 > my){
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
      x2 = tamanho_da_tela_x*(n2*gap_dos_dedos + gap_dos_dedos/2)+todosDedosx
      y2 = todosDedosy
      w2 = tile_size*2
      h2 = tile_size*5

      if (x2-w2/2 < mx && x2+w2/2 > mx && y2-h2/2 < my && y2+h2/2 > my){
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
      x2 = tamanho_da_tela_x*(n2*gap_dos_dedos + gap_dos_dedos/2)+todosDedosx
      y2 = todosDedosy
      w2 = tile_size*2
      h2 = tile_size*5

      if (x2-w2/2 < mx && x2+w2/2 > mx && y2-h2/2 < my && y2+h2/2 > my){
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
      x2 = tamanho_da_tela_x*(n2*gap_dos_dedos + gap_dos_dedos/2)+todosDedosx
      y2 = todosDedosy
      w2 = tile_size*2
      h2 = tile_size*5

      if (x2-w2/2 < mx && x2+w2/2 > mx && y2-h2/2 < my && y2+h2/2 > my){
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
      x2 = tamanho_da_tela_x*(n2*gap_dos_dedos + gap_dos_dedos/2)+todosDedosx
      y2 = todosDedosy
      w2 = tile_size*2
      h2 = tile_size*5

      if (x2-w2/2 < mx && x2+w2/2 > mx && y2-h2/2 < my && y2+h2/2 > my){
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
      x2 = tamanho_da_tela_x*(n2*gap_dos_dedos + gap_dos_dedos/2)+todosDedosx
      y2 = todosDedosy
      w2 = tile_size*2
      h2 = tile_size*5

      if (x2-w2/2 < mx && x2+w2/2 > mx && y2-h2/2 < my && y2+h2/2 > my){
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
      x2 = tamanho_da_tela_x*(n2*gap_dos_dedos + gap_dos_dedos/2)+todosDedosx
      y2 = todosDedosy
      w2 = tile_size*2
      h2 = tile_size*5
      
      if (x2-w2/2 < mx && x2+w2/2 > mx && y2-h2/2 < my && y2+h2/2 > my){
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
      x2 = tamanho_da_tela_x*(n2*gap_dos_dedos + gap_dos_dedos/2)+todosDedosx
      y2 = todosDedosy
      w2 = tile_size*2
      h2 = tile_size*5
      
      if (x2-w2/2 < mx && x2+w2/2 > mx && y2-h2/2 < my && y2+h2/2 > my){
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
      x2 = tamanho_da_tela_x*(n2*gap_dos_dedos + gap_dos_dedos/2)+todosDedosx
      y2 = todosDedosy
      w2 = tile_size*2
      h2 = tile_size*5
      
      if (x2-w2/2 < mx && x2+w2/2 > mx && y2-h2/2 < my && y2+h2/2 > my){
        if (mouseIsPressed === true && valor_antigo_do_mouse !== mouseIsPressed){
          dedo_selecionado10 = !dedo_selecionado10
        }
      }
      if (dedo_selecionado10 === true){
        image(dedo1, x2 - w2/2, y2 - h2/2, w2, h2)
      }else{
        image(dedo2, x2 - w2/2, y2 - h2/2, w2, h2)
      }
      
      
      // Mostrar quantidade de dedos selecionados
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

      fill(B)
      rect(0, tamanho_da_tela_y-tile_size*2, tamanho_da_tela_x, tile_size*2)
      fill(W)
      textSize(tamanho_de_text)
      textAlign(CENTER)
      text("Dedos selecionados: " + contador_de_dedos, tamanho_da_tela_x*0.175, tamanho_da_tela_y-tile_size*3/4)

      // alavanca Par ou Ímpar
      // lado Ímpar
      x2 = tamanho_da_tela_x*0.8
      y2 = tamanho_da_tela_y - tile_size
      w2 = tile_size*3
      h2 = tile_size*1.5
      text_2 = "ÍMPAR"

    
      fill(W)
      rect(x2 - w2/2 -3, y2-h2/2 -3, w2+tamanho_da_tela_x*0.125+6, h2+6, tile_size/2)
      fill(B)
      rect(x2 - w2/2 -1, y2-h2/2 -1, w2+tamanho_da_tela_x*0.125+2, h2+2, tile_size/2)  
      if (escolha_par_ou_impar === "impar"){
        fill(W)
        rect(x2 - w2/2, y2-h2/2, w2, h2, tile_size/2)
        fill(B)
      }else{
        fill(B)
        rect(x2 - w2/2, y2-h2/2, w2, h2, tile_size/2)
        fill(W)
      }
      textSize(tamanho_de_text)
      textAlign(CENTER)
      text(text_2, x2, y2+tile_size/4)

      if (mouseX > x2 - (w2+tamanho_da_tela_x*0.125)/2 && mouseX < x2 + (w2+tamanho_da_tela_x*0.125)/2 && mouseY > y2 - h2/2 && mouseY < y2 + h2/2){
        if (mouseIsPressed === true && valor_antigo_do_mouse !== mouseIsPressed){
          if (escolha_par_ou_impar === "impar") escolha_par_ou_impar = "par"
          else escolha_par_ou_impar = "impar"
        }
      }

      // lado Par
      x2 += tamanho_da_tela_x*0.125

      text_2 = "PAR"

      if (escolha_par_ou_impar === "par"){
        fill(W)
        rect(x2 - w2/2, y2-h2/2, w2, h2, tile_size/2)
        fill(B)
      }else{
        fill(B)
        rect(x2 - w2/2, y2-h2/2, w2, h2, tile_size/2)
        fill(W)
      }

      textSize(tamanho_de_text)
      textAlign(CENTER)
      text(text_2, x2, y2+tile_size/4)


      // Botão para próximo jogador
      x2 = tamanho_da_tela_x*0.8
      y2 = tamanho_da_tela_y*0.2
      w2 = tile_size*8
      h2 = tile_size*2
      text_2 = "PRÓXIMO JOGADOR"

      fill(B)
      rect(x2 - w2/2 -2, y2 - h2/2 -2, w2+4, h2+4, tile_size/2)
      fill(W)
      rect(x2 - w2/2, y2-h2/2, w2, h2, tile_size/2)
      fill(B)
      textSize(tamanho_de_text)
      textAlign(CENTER)
      text(text_2, x2, y2+tile_size/4)

      if (x2-w2/2 < mouseX && x2+w2/2 > mouseX && y2-h2/2 < mouseY && y2+h2/2 > mouseY){
        if (mouseIsPressed === true && valor_antigo_do_mouse !== mouseIsPressed && escolha_par_ou_impar !== ""){
          tela_atual = "jogador2"
        }
      }

  // Botão voltar (usando diretamente voltar_*)

      fill(W)
      rect(voltar_x - voltar_w/2 -3, voltar_y - voltar_h/2 -3, voltar_w+6, voltar_h+6, tile_size/2)
      fill(B)
      rect(voltar_x - voltar_w/2 -1, voltar_y - voltar_h/2 -1, voltar_w+2, voltar_h+2, tile_size/2)
      fill(W)
      rect(voltar_x - voltar_w/2, voltar_y - voltar_h/2, voltar_w, voltar_h, tile_size/2)
      fill(B)
      textSize(tamanho_de_text)
      textAlign(CENTER)
      text(text_voltar, voltar_x, voltar_y+tile_size/4)

      if (voltar_x-voltar_w/2 < mouseX && voltar_x+voltar_w/2 > mouseX && voltar_y-voltar_h/2 < mouseY && voltar_y+voltar_h/2 > mouseY){
        if (mouseIsPressed === true && valor_antigo_do_mouse !== mouseIsPressed){
          tela_atual = "menu"
        }
      }

      valor_antigo_do_mouse = mouseIsPressed
      break;
    
    case "jogador2":
      let x3, y3, w3, h3, text_3, n3
      let todosDedosx2 = 0; let todosDedosy2 = tamanho_da_tela_y*0.75

      // mouse normal (sem rotação)
      const mx3 = mouseX 
      const my3 = mouseY

  // Título indicando que é a vez do Jogador 2 (replicando estilo do jogador1)
  fill(B)
  rect(0, 0, tamanho_da_tela_x, tile_size*2)
  fill(W)
  textSize(tamanho_de_text * 1.25)
  textAlign(CENTER)
  text("JOGADOR 2 - ESCOLHA SEUS DEDOS", tamanho_da_tela_x*0.6, tile_size*1.25)

      // Dedos do Jogador 2 (usando as variáveis bot)
      // dedo 1
      n3 = 0
      x3 = tamanho_da_tela_x*(n3*gap_dos_dedos + gap_dos_dedos/2)+todosDedosx2
      y3 = todosDedosy2
      w3 = tile_size*2
      h3 = tile_size*5

      if (x3-w3/2 < mx3 && x3+w3/2 > mx3 && y3-h3/2 < my3 && y3+h3/2 > my3){
        if (mouseIsPressed === true && valor_antigo_do_mouse !== mouseIsPressed){
          dedo_selecionado_bot1 = !dedo_selecionado_bot1
        }
      }
      
      if (dedo_selecionado_bot1 === true){
        image(dedo1, x3 - w3/2, y3 - h3/2, w3, h3)
      }else{
        image(dedo2, x3 - w3/2, y3 - h3/2, w3, h3)
      }
      
      // dedo 2
      n3++
      x3 = tamanho_da_tela_x*(n3*gap_dos_dedos + gap_dos_dedos/2)+todosDedosx2
      y3 = todosDedosy2
      w3 = tile_size*2
      h3 = tile_size*5

      if (x3-w3/2 < mx3 && x3+w3/2 > mx3 && y3-h3/2 < my3 && y3+h3/2 > my3){
        if (mouseIsPressed === true && valor_antigo_do_mouse !== mouseIsPressed ){
          dedo_selecionado_bot2 = !dedo_selecionado_bot2
        }
      }
      
      if (dedo_selecionado_bot2 === true){
        image(dedo1, x3 - w3/2, y3 - h3/2, w3, h3)
      }else{
        image(dedo2, x3 - w3/2, y3 - h3/2, w3, h3)
      }

      // dedo 3
      n3++
      x3 = tamanho_da_tela_x*(n3*gap_dos_dedos + gap_dos_dedos/2)+todosDedosx2
      y3 = todosDedosy2
      w3 = tile_size*2
      h3 = tile_size*5
      
      if (x3-w3/2 < mx3 && x3+w3/2 > mx3 && y3-h3/2 < my3 && y3+h3/2 > my3){
        if (mouseIsPressed === true && valor_antigo_do_mouse !== mouseIsPressed){
          dedo_selecionado_bot3 = !dedo_selecionado_bot3
        }
      }

      if (dedo_selecionado_bot3 === true){
        image(dedo1, x3 - w3/2, y3 - h3/2, w3, h3)
      }else{
        image(dedo2, x3 - w3/2, y3 - h3/2, w3, h3)
      }
      
      // dedo 4
      n3++
      x3 = tamanho_da_tela_x*(n3*gap_dos_dedos + gap_dos_dedos/2)+todosDedosx2
      y3 = todosDedosy2
      w3 = tile_size*2
      h3 = tile_size*5

      if (x3-w3/2 < mx3 && x3+w3/2 > mx3 && y3-h3/2 < my3 && y3+h3/2 > my3){
        if (mouseIsPressed === true && valor_antigo_do_mouse !== mouseIsPressed){
          dedo_selecionado_bot4 = !dedo_selecionado_bot4
        }
      }

      if (dedo_selecionado_bot4 === true){
        image(dedo1, x3 - w3/2, y3 - h3/2, w3, h3)
      }else{
        image(dedo2, x3 - w3/2, y3 - h3/2, w3, h3)
      }

      // dedo 5
      n3++
      x3 = tamanho_da_tela_x*(n3*gap_dos_dedos + gap_dos_dedos/2)+todosDedosx2
      y3 = todosDedosy2
      w3 = tile_size*2
      h3 = tile_size*5
      
      if (x3-w3/2 < mx3 && x3+w3/2 > mx3 && y3-h3/2 < my3 && y3+h3/2 > my3){
        if (mouseIsPressed === true && valor_antigo_do_mouse !== mouseIsPressed){
          dedo_selecionado_bot5 = !dedo_selecionado_bot5
        }
      }

      if (dedo_selecionado_bot5 === true){
        image(dedo1, x3 - w3/2, y3 - h3/2, w3, h3)
      }else{
        image(dedo2, x3 - w3/2, y3 - h3/2, w3, h3)
      }

      // dedo 6
      n3++
      x3 = tamanho_da_tela_x*(n3*gap_dos_dedos + gap_dos_dedos/2)+todosDedosx2
      y3 = todosDedosy2
      w3 = tile_size*2
      h3 = tile_size*5
      
      if (x3-w3/2 < mx3 && x3+w3/2 > mx3 && y3-h3/2 < my3 && y3+h3/2 > my3){
        if (mouseIsPressed === true && valor_antigo_do_mouse !== mouseIsPressed){
          dedo_selecionado_bot6 = !dedo_selecionado_bot6
        }
      }

      if (dedo_selecionado_bot6 === true){
        image(dedo1, x3 - w3/2, y3 - h3/2, w3, h3)
      }else{
        image(dedo2, x3 - w3/2, y3 - h3/2, w3, h3)
      }

      // dedo 7
      n3++
      x3 = tamanho_da_tela_x*(n3*gap_dos_dedos + gap_dos_dedos/2)+todosDedosx2
      y3 = todosDedosy2
      w3 = tile_size*2
      h3 = tile_size*5
      
      if (x3-w3/2 < mx3 && x3+w3/2 > mx3 && y3-h3/2 < my3 && y3+h3/2 > my3){
        if (mouseIsPressed === true && valor_antigo_do_mouse !== mouseIsPressed){
          dedo_selecionado_bot7 = !dedo_selecionado_bot7
        }
      }

      if (dedo_selecionado_bot7 === true){
        image(dedo1, x3 - w3/2, y3 - h3/2, w3, h3)
      }else{
        image(dedo2, x3 - w3/2, y3 - h3/2, w3, h3)
      }
      
      // dedo 8
      n3++
      x3 = tamanho_da_tela_x*(n3*gap_dos_dedos + gap_dos_dedos/2)+todosDedosx2
      y3 = todosDedosy2
      w3 = tile_size*2
      h3 = tile_size*5
      
      if (x3-w3/2 < mx3 && x3+w3/2 > mx3 && y3-h3/2 < my3 && y3+h3/2 > my3){
        if (mouseIsPressed === true && valor_antigo_do_mouse !== mouseIsPressed){
          dedo_selecionado_bot8 = !dedo_selecionado_bot8
        }
      }

      if (dedo_selecionado_bot8 === true){
        image(dedo1, x3 - w3/2, y3 - h3/2, w3, h3)
      }else{
        image(dedo2, x3 - w3/2, y3 - h3/2, w3, h3)
      }

      // dedo 9
      n3++
      x3 = tamanho_da_tela_x*(n3*gap_dos_dedos + gap_dos_dedos/2)+todosDedosx2
      y3 = todosDedosy2
      w3 = tile_size*2
      h3 = tile_size*5
      
      if (x3-w3/2 < mx3 && x3+w3/2 > mx3 && y3-h3/2 < my3 && y3+h3/2 > my3){
        if (mouseIsPressed === true && valor_antigo_do_mouse !== mouseIsPressed){
          dedo_selecionado_bot9 = !dedo_selecionado_bot9
        }
      }

      if (dedo_selecionado_bot9 === true){
        image(dedo1, x3 - w3/2, y3 - h3/2, w3, h3)
      }else{
        image(dedo2, x3 - w3/2, y3 - h3/2, w3, h3)
      }

      // dedo 10
      n3++
      x3 = tamanho_da_tela_x*(n3*gap_dos_dedos + gap_dos_dedos/2)+todosDedosx2
      y3 = todosDedosy2
      w3 = tile_size*2
      h3 = tile_size*5
      
      if (x3-w3/2 < mx3 && x3+w3/2 > mx3 && y3-h3/2 < my3 && y3+h3/2 > my3){
        if (mouseIsPressed === true && valor_antigo_do_mouse !== mouseIsPressed){
          dedo_selecionado_bot10 = !dedo_selecionado_bot10
        }
      }

      if (dedo_selecionado_bot10 === true){
        image(dedo1, x3 - w3/2, y3 - h3/2, w3, h3)
      }else{
        image(dedo2, x3 - w3/2, y3 - h3/2, w3, h3)
      }

      // Mostrar quantidade de dedos selecionados do jogador 2
      var contador_dedos_jogador2 = 0
      if (dedo_selecionado_bot1) contador_dedos_jogador2++
      if (dedo_selecionado_bot2) contador_dedos_jogador2++
      if (dedo_selecionado_bot3) contador_dedos_jogador2++
      if (dedo_selecionado_bot4) contador_dedos_jogador2++
      if (dedo_selecionado_bot5) contador_dedos_jogador2++
      if (dedo_selecionado_bot6) contador_dedos_jogador2++
      if (dedo_selecionado_bot7) contador_dedos_jogador2++
      if (dedo_selecionado_bot8) contador_dedos_jogador2++
      if (dedo_selecionado_bot9) contador_dedos_jogador2++
      if (dedo_selecionado_bot10) contador_dedos_jogador2++
      
      fill(B)
      rect(0, tamanho_da_tela_y-tile_size*2, tamanho_da_tela_x, tile_size*2)
      fill(W)
      textSize(tamanho_de_text)
      textAlign(CENTER)
      text("Dedos selecionados: " + contador_dedos_jogador2, tamanho_da_tela_x*0.175, tamanho_da_tela_y-tile_size*3/4)

     
      // Botão para começar o jogo
      x3 = tamanho_da_tela_x*0.8
      y3 = tamanho_da_tela_y*0.2
      w3 = tile_size*8
      h3 = tile_size*2
      text_3 = "JOGAR"

      fill(B)
      rect(x3 - w3/2 -2, y3 - h3/2 -2, w3+4, h3+4, tile_size/2)
      fill(W)
      rect(x3 - w3/2, y3-h3/2, w3, h3, tile_size/2)
      fill(B)
      textSize(tamanho_de_text)
      textAlign(CENTER)
      text(text_3, x3, y3+tile_size/4)

      if (x3-w3/2 < mouseX && x3+w3/2 > mouseX && y3-h3/2 < mouseY && y3+h3/2 > mouseY){
        if (mouseIsPressed === true && valor_antigo_do_mouse !== mouseIsPressed){
          estado_do_jogo = "escolha do bot"
          bote_pode_jogar = true
          time_jogo = 0
          tela_atual = "resultado"
        }
      }

  // Botão voltar 

      fill(W)
      rect(voltar_x - voltar_w/2 -3, voltar_y - voltar_h/2 -3, voltar_w+6, voltar_h+6, tile_size/2)
      fill(B)
      rect(voltar_x - voltar_w/2 -1, voltar_y - voltar_h/2 -1, voltar_w+2, voltar_h+2, tile_size/2)
      fill(W)
      rect(voltar_x - voltar_w/2, voltar_y - voltar_h/2, voltar_w, voltar_h, tile_size/2)
      fill(B)
      textSize(tamanho_de_text)
      textAlign(CENTER)
      text(text_voltar, voltar_x, voltar_y+tile_size/4)

      if (voltar_x-voltar_w/2 < mouseX && voltar_x+voltar_w/2 > mouseX && voltar_y-voltar_h/2 < mouseY && voltar_y+voltar_h/2 > mouseY){
        if (mouseIsPressed === true && valor_antigo_do_mouse !== mouseIsPressed){
          tela_atual = "jogador1"
        }
      }

      valor_antigo_do_mouse = mouseIsPressed
      break;
    
    case "resultado":
      // Implementar tela de resultado

      fill("#000000bb")
      rect(tamanho_da_tela_x*0.1, tamanho_da_tela_y*0.1, tamanho_da_tela_x*0.8, tamanho_da_tela_y*0.7, tile_size/2)
      
      fill(W)
      textSize(tamanho_de_text * 1.5)
      textAlign(CENTER)
      text("RESULTADO DO JOGO", tamanho_da_tela_x*0.5, tile_size*3)
      
      // Calcular resultado
      total_de_dedos = contador_de_dedos
      if (dedo_selecionado_bot1) total_de_dedos++
      if (dedo_selecionado_bot2) total_de_dedos++
      if (dedo_selecionado_bot3) total_de_dedos++
      if (dedo_selecionado_bot4) total_de_dedos++
      if (dedo_selecionado_bot5) total_de_dedos++
      if (dedo_selecionado_bot6) total_de_dedos++
      if (dedo_selecionado_bot7) total_de_dedos++
      if (dedo_selecionado_bot8) total_de_dedos++
      if (dedo_selecionado_bot9) total_de_dedos++
      if (dedo_selecionado_bot10) total_de_dedos++
      
      fill(W)
      textSize(tamanho_de_text)
      text("Jogador 1: " + contador_de_dedos + " dedos", tamanho_da_tela_x*0.5, tile_size*4)
      
      var contador_dedos_jogador2_resultado = 0
      if (dedo_selecionado_bot1) contador_dedos_jogador2_resultado++
      if (dedo_selecionado_bot2) contador_dedos_jogador2_resultado++
      if (dedo_selecionado_bot3) contador_dedos_jogador2_resultado++
      if (dedo_selecionado_bot4) contador_dedos_jogador2_resultado++
      if (dedo_selecionado_bot5) contador_dedos_jogador2_resultado++
      if (dedo_selecionado_bot6) contador_dedos_jogador2_resultado++
      if (dedo_selecionado_bot7) contador_dedos_jogador2_resultado++
      if (dedo_selecionado_bot8) contador_dedos_jogador2_resultado++
      if (dedo_selecionado_bot9) contador_dedos_jogador2_resultado++
      if (dedo_selecionado_bot10) contador_dedos_jogador2_resultado++
      
      text("Jogador 2: " + contador_dedos_jogador2_resultado + " dedos", tamanho_da_tela_x*0.5, tile_size*5)
      text("Total: " + total_de_dedos + " dedos", tamanho_da_tela_x*0.5, tile_size*6)
      
      var resultado_eh_par = (total_de_dedos % 2 === 0)
      var jogador1_ganhou = false
      
      if (escolha_par_ou_impar === "par" && resultado_eh_par) {
        jogador1_ganhou = true
      } else if (escolha_par_ou_impar === "impar" && !resultado_eh_par) {
        jogador1_ganhou = true
      }
      
      if (resultado_eh_par) {
        text("Resultado: PAR", tamanho_da_tela_x*0.5, tile_size*7)
      } else {
        text("Resultado: ÍMPAR", tamanho_da_tela_x*0.5, tile_size*7)
      }
      text("Jogador 1 escolheu: " + escolha_par_ou_impar, tamanho_da_tela_x*0.5, tile_size*8)
      
      if (jogador1_ganhou) {
        fill("green")
      } else {
        fill("red")
      }
      textSize(tamanho_de_text * 1.2)
      if (jogador1_ganhou) {
        text("JOGADOR 1 GANHOU!", tamanho_da_tela_x*0.5, tile_size*10)
      } else {
        text("JOGADOR 2 GANHOU!", tamanho_da_tela_x*0.5, tile_size*10)
      }
      
      // Botão voltar ao menu
      fill(W)
      rect(tamanho_da_tela_x*0.5 - tile_size*4, tile_size*12, tile_size*8, tile_size*2, tile_size/2)
      fill(B)
      textSize(tamanho_de_text)
      text("VOLTAR AO MENU", tamanho_da_tela_x*0.5, tile_size*13.25)
      
      if (mouseX > tamanho_da_tela_x*0.5 - tile_size*3 && mouseX < tamanho_da_tela_x*0.5 + tile_size*3 && 
          mouseY > tile_size*12 && mouseY < tile_size*14){
        if (mouseIsPressed === true && valor_antigo_do_mouse !== mouseIsPressed){
          // Reset do jogo
          dedo_selecionado1 = false
          dedo_selecionado2 = false
          dedo_selecionado3 = false
          dedo_selecionado4 = false
          dedo_selecionado5 = false
          dedo_selecionado6 = false
          dedo_selecionado7 = false
          dedo_selecionado8 = false
          dedo_selecionado9 = false
          dedo_selecionado10 = false
          
          dedo_selecionado_bot1 = false
          dedo_selecionado_bot2 = false
          dedo_selecionado_bot3 = false
          dedo_selecionado_bot4 = false
          dedo_selecionado_bot5 = false
          dedo_selecionado_bot6 = false
          dedo_selecionado_bot7 = false
          dedo_selecionado_bot8 = false
          dedo_selecionado_bot9 = false
          dedo_selecionado_bot10 = false
          
          escolha_par_ou_impar = "impar"
          estado_do_jogo = "escolha"
          tela_atual = "menu"
        }
      }


      valor_antigo_do_mouse = mouseIsPressed

      break;
    
    
    // caso não tenha uma tela definida, escolher o menu
    default: 
      tela_atual = "menu";  
      
  }
  let zoom = 1.75
  image(vinheta, vinheta_x*12-tamanho_da_tela_x*zoom/4, vinheta_y*12-tamanho_da_tela_y*zoom/4, tamanho_da_tela_x*zoom, tamanho_da_tela_y*zoom);
  time++
}