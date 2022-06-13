
const canvas = document.querySelector('canvas');//seleciona a tag canvas no html para adiconar as edições por meio do javascript
const c = canvas.getContext('2d');//tipo do canvas

document.querySelector('#userInterface').style.display = 'none'//linha para os campos de batalha não aparecer no mapa

//tamanho do canvas
canvas.width = 1024;
canvas.height = 576;
//método para adicionar a borda no mapa
const collisionsMap = []
for (let i = 0; i < collisions.length; i += 70){
collisionsMap.push(collisions.slice(i, 70 + i))
}

const battleZonesMap = []
for (let i = 0; i < battleZonesData.length; i += 70){
battleZonesMap.push(battleZonesData.slice(i, 70 + i))
}
console.log(battleZonesMap)
//tamanho da borda


const boundaries = []
const offset = {
  x: -495, 
  y: -850
}
class boundary {
  static width = 48
  static height = 48
  constructor({ position }) {
    this.position = position
    this.width = 48
    this.height = 48
  }

  draw() {
    c.fillStyle = 'rgba(255, 0, 0, 0.0)'
    c.fillRect(this.position.x, this.position.y, this.width, this.height)
  }
}
//local da borda
collisionsMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol === 1044)
      boundaries.push(
        new boundary({
          position: {
            x: j * boundary.width + offset.x,
            y: i * boundary.height + offset.y
          }
        })
      )
  })
})
const battleZones = []

battleZonesMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol === 1044)
      battleZones.push(
        new boundary({
          position: {
            x: j * boundary.width + offset.x,
            y: i * boundary.height + offset.y
          }
        })
      )
  })
})
console.log(battleZones)
//preenche o canvas com o mapa e o personagem
c.fillRect(0, 0, canvas.width, canvas.height);

const foregroundImage = new Image()
foregroundImage.src = './img/foregroundObjects.png';

const image = new Image()
image.src = './img/pallet town.png';//Chama a imagem do mapa de fundo
 
const playerDownImage = new Image()
playerDownImage.src = './img/playerDown.png';//Imagem do personagem andando de frente


const playerUpImage = new Image()
playerUpImage.src = './img/playerUp.png';//Imagem do personagem andando de trás

const playerLeftImage = new Image()
playerLeftImage.src = './img/playerLeft.png';//Imagem do personagem andando para esquerda

const playerRightImage = new Image()
playerRightImage.src = './img/playerRight.png';//Imagem do personagem andando para direita


const player = new sprite({
  position: {
    x: canvas.width / 2 - 192 / 4 /2,
    y: canvas.height / 2 - 68 / 2
  },
  image: playerDownImage,
  frames:{
    max: 4,
    hold: 10
  },
  sprites:{
    up: playerUpImage,
    left: playerLeftImage,
    right: playerRightImage,
    down: playerDownImage,
  }
})

//o que faz a tela mecher

const background = new sprite({
  position: {
   x:offset.x,
   y:offset.y
  },
  image: image
});

const foreground = new sprite({
  position: {
   x:offset.x,
   y:offset.y
  },
  image: foregroundImage
});

//movimentação tela e personagem 
const keys={
  w: {
    pressed: false
  }
  ,
  a: {
    pressed: false
  }
  ,
  s: {
    pressed: false
  }
  ,
  d: {
    pressed: false
  }
}


const movables = [background, ...boundaries, foreground, ...battleZones]
function rectangularCollision({rectangle1, rectangle2 }){
  return(
rectangle1.position.x + rectangle1.width >= rectangle2.position.x && 
rectangle1.position.x <= rectangle2.position.x + rectangle2.width && 
rectangle1.position.y <= rectangle2.position.y + rectangle2.height && 
rectangle1.position.y + rectangle1.height >= rectangle2.position.y
  )
}

const battle = {
  initiated: false
}
//adiciona a tela e o personagem a borda e a zona de combate com o javascript
function animate(){
  const animationId = window.requestAnimationFrame(animate)
  background.draw()
  boundaries.forEach(boundary => {
  boundary.draw()

  })
  battleZones.forEach((battleZone) =>{
    battleZone.draw()
  })
  player.draw()
  foreground.draw()
  let moving = true
  player.animate  = false
  
if (battle.initiated) return
  
//ativa a batalha
  if(keys.w.pressed || keys.a.pressed || keys.s.pressed || keys.d.pressed){//condição para a zona de combate
    for (let i = 0; i < battleZones.length; i++) {
      const battleZone = battleZones[i]
      const overlappingArea = 
  (Math.min(
player.position.x + player.width, battleZone.position.x + battleZone.width)
- 
Math.max(player.position.x, battleZone.position.x)) 
* (Math.min(
player.position.y + player.height, battleZone.position.y + battleZone.height)) 
-    
Math.max(player.position.y, battleZone.position.y)
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: battleZone,
      
        }) &&
        overlappingArea > (player.width * player.height) / 2 && Math.random() < 0.006
      ) {
        console.log('activate battle');
//desativa o looping de animação  
        window.cancelAnimationFrame(animationId)
        gsap.to('#overlappingDiv', {
  opacity: 1,
  repeat: 3,
  yoyo: true,
  duration: 0.4,
          onComplete() {
            gsap.to('#overlappingDiv',{
            opacity: 1,
            duration:0.4,
              onComplete() {
              animateBattle()
              gsap.to('#overlappingDiv',{
                opacity: 0,
                duration: 0.4
              })
              }
          })

    window.cancelAnimationFrame(animationId)
          //ativa um novo loop  
            animateBattle()
    }

})
        battle.initiated = true
        moving = false
        break
      }
    }
  }
  



   //movimentação tela e personagem se uma dessas teclas forem apertadas 'w','a','s','d'
  
  if (keys.w.pressed && lastKey === 'w'){
  player.animate = true
    player.image = player.sprites.up
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i]
      if (//condicional para o personagem não passar da borda
        rectangularCollision({
          rectangle1: player,
          rectangle2: {
            ...boundary,
            position: {
              x: boundary.position.x,
              y: boundary.position.y + 3
            }
          }
        })
      ) {
        moving = false
        break
      }
    }

    
    if (moving)
      movables.forEach((movable) => {//quantidade de pixels que o boneco irá mover
        movable.position.y += 3
      })

  } else if(keys.a.pressed && lastKey === 'a'){
    player.animate = true
     player.image = player.sprites.left
         for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i]
      if (//condicional para o personagem não passar da borda
        rectangularCollision({
          rectangle1: player,
          rectangle2: {
            ...boundary,
            position: {
              x: boundary.position.x + 3,
              y: boundary.position.y
            }
          }
        })
      ) {
        moving = false
        break
      }
    }

    if (moving)
      movables.forEach((movable) => {
        movable.position.x += 3
      })
  }else if(keys.s.pressed && lastKey === 's'){
    player.animate = true
     player.image = player.sprites.down
  for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i]
      if (//condicional para o personagem não passar da borda
        rectangularCollision({
          rectangle1: player,
          rectangle2: {
            ...boundary,
            position: {
              x: boundary.position.x,
              y: boundary.position.y - 3
            }
          }
        })
      ) {
        moving = false
        break
      }
    }

    if (moving)
      movables.forEach((movable) => {
        movable.position.y -= 3
      })
}else if(keys.d.pressed && lastKey === 'd'){
    player.animate = true
    player.image = player.sprites.right
         for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i]
      if (//condicional para o personagem não passar da borda
        rectangularCollision({
          rectangle1: player,
          rectangle2: {
            ...boundary,
            position: {
              x: boundary.position.x - 3,
              y: boundary.position.y
            }
          }
        })
      ) {
        moving = false
        break
      }
    }

    if (moving)
      movables.forEach((movable) => {
        movable.position.x -= 3
      })
  }
}


//movimentação tela e personagem
let lastkey = ''
window.addEventListener('keydown', (e) => {
  switch (e.key) {
      case'w':
      keys.w.pressed = true
      lastKey = 'w'
      break
       case'a':
      keys.a.pressed = true
       lastKey = 'a'
      break
       case's':
      keys.s.pressed = true
      lastKey = 's'
      break
       case'd':
      keys.d.pressed = true
        lastKey = 'd'
      break
  }
  
})
//movimentação tela e personagem

window.addEventListener('keyup', (e) => {
  switch (e.key) {
    case 'w':
      keys.w.pressed = false
      break
    case 'a':
      keys.a.pressed = false
      break
    case 's':
      keys.s.pressed = false
      break
    case 'd':
      keys.d.pressed = false
      break
  }
})
animate();//ativa tudo

const battleBackgroundImage = new Image()
battleBackgroundImage.src = './img/battleBackground.png'
const battleBackground = new sprite({
  position:{
  x:0,
  y:0
  },
  image: battleBackgroundImage,
})

const embyImage = new Image()
embyImage.src = './img/embySprite.png'
const emby = new sprite({
  position: {
    x:280,
    y:325
  },
  image: embyImage,
  frames:{
    max: 4,
    hold: 30
  },
  animate: true
})

const draggleImage = new Image()
draggleImage.src = './img/draggleSprite.png'
const draggle = new sprite({
  position: {
    x:800,
    y:100
  },
  image: draggleImage,
  frames:{
    max: 4,
    hold: 30
  },
  animate: true,
  isEnemy: true
})

function animateBattle(){
  window.requestAnimationFrame(animateBattle)
  battleBackground.draw()
  document.querySelector('#userInterface').style.display = 'block' //linha para os campos de batalha aparecer quando a batalha começar
  draggle.draw()
  emby.draw()
 
}

document.querySelectorAll('button').forEach(button =>{
  button.addEventListener('click', () =>{
    emby.attack({ attack: {
      name:'ataque1',
      damage: 10,
      type:'normal'
    },
     recipient: draggle
   })
  })
})
