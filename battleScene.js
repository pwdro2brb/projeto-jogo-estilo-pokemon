




const battleBackgroundImage = new Image()
battleBackgroundImage.src = './img/battleBackground.png'
const battleBackground = new sprite({
  position:{
  x:0,
  y:0
  },
  image: battleBackgroundImage,
})


const emby = new monster(monsters.emby)
const draggle = new monster(monsters.draggle)

const renderedSprites = []
function animateBattle(){
  window.requestAnimationFrame(animateBattle)
  battleBackground.draw()
document.querySelector('#userInterface').style.display = 'block' //linha para os campos de batalha aparecer quando a batalha começar
  draggle.draw()
  emby.draw()
  renderedSprites.forEach((sprite) =>{
    sprite.draw()
  })    
}

animateBattle()

const queue = []
//o evento 'listeners' para os botões de ataque  básico

document.querySelectorAll('#a').forEach((button) => {
  button.addEventListener('click', () =>{
    
 const randomAttack = Math.floor((Math.random() * 4) + 1)
    
      emby.attack({ 
        attack: { 
      name:'Ataque fraco',
      damage: 10,
      type:'normal'},
        recipient: draggle
      })
   
    if (randomAttack == 1){
    //o que o inimigo faz após o ataque
    queue.push(() => {
      draggle.attack({
        attack: { 
      name:'Ataque fraco',
      damage: 10,
      type:'normal'},
        recipient: emby
      })
    })
} else if(randomAttack == 2){
     //o que o inimigo faz após o ataque
queue.push(() => {
      draggle.attack1({
        attack1: { 
      name:'Bola de fogo',
      damage: 15,
      type:'fire'},
        recipient: emby,
        renderedSprites
      })
    }) 
} else if(randomAttack == 3){
    //o que o inimigo faz após o ataque
queue.push(() => {
      draggle.attack2({
         attack2: { 
      name:'Ataque forte',
      damage: 20,
      type:'big'},
        recipient: emby
      })
    })   
}else if(randomAttack == 4){
   queue.push(() => {
      draggle.attack3({
        attack3: { 
      name:'Ataque especial',
      damage: 25,
      type:'special'},
        recipient: emby,
        renderedSprites
      })
    })     
}
    
  })
})

//o evento 'listeners' para o botão de ataque "bola de fogo"
document.querySelectorAll('#b').forEach((button) => {
  button.addEventListener('click', () =>{
    
 const randomAttack = Math.floor((Math.random() * 4) + 1)
    
      emby.attack1({ 
      attack1: { 
      name:'Bola de fogo',
      damage: 15,
      type:'fire'},
        recipient: draggle
      })
    if (randomAttack == 1){
    //o que o inimigo faz após o ataque
    queue.push(() => {
      draggle.attack({
        attack: { 
      name:'Ataque fraco',
      damage: 10,
      type:'normal'},
        recipient: emby
      })
    })
} else if(randomAttack == 2){
     //o que o inimigo faz após o ataque
queue.push(() => {
      draggle.attack1({
        attack1: { 
      name:'Bola de fogo',
      damage: 15,
      type:'fire'},
        recipient: emby,
        renderedSprites
      })
    }) 
} else if(randomAttack == 3){
    //o que o inimigo faz após o ataque
queue.push(() => {
      draggle.attack2({
         attack2: { 
      name:'Ataque forte',
      damage: 20,
      type:'big'},
        recipient: emby
      })
    })   
}else if(randomAttack == 4){
   queue.push(() => {
      draggle.attack3({
        attack3: { 
      name:'Ataque especial',
      damage: 25,
      type:'special'},
        recipient: emby,
        renderedSprites
      })
    })     
}
  })
})
document.querySelectorAll('#c').forEach((button) => {
  button.addEventListener('click', () =>{
    
 const randomAttack = Math.floor((Math.random() * 4) + 1)
    
      emby.attack2({ 
        attack2: { 
      name:'Ataque forte',
      damage: 20,
      type:'big'},
        recipient: draggle
      })
    if (randomAttack == 1){
    //o que o inimigo faz após o ataque
    queue.push(() => {
      draggle.attack({
        attack: { 
      name:'Ataque fraco',
      damage: 10,
      type:'normal'},
        recipient: emby
      })
    })
} else if(randomAttack == 2){
     //o que o inimigo faz após o ataque
queue.push(() => {
      draggle.attack1({
        attack1: { 
      name:'Bola de fogo',
      damage: 15,
      type:'fire'},
        recipient: emby,
        renderedSprites
      })
    }) 
} else if(randomAttack == 3){
    //o que o inimigo faz após o ataque
queue.push(() => {
      draggle.attack2({
         attack2: { 
      name:'Ataque forte',
      damage: 20,
      type:'big'},
        recipient: emby
      })
    })   
}else if(randomAttack == 4){
   queue.push(() => {
      draggle.attack3({
        attack3: { 
      name:'Ataque especial',
      damage: 25,
      type:'special'},
        recipient: emby,
        renderedSprites
      })
    })     
}
  })
})
document.querySelectorAll('#d').forEach((button) => {
  button.addEventListener('click', () =>{
    
 const randomAttack = Math.floor((Math.random() * 4) + 1)
    
      emby.attack3({ 
        attack3: { 
      name:'Ataque especial',
      damage: 25,
      type:'special'},
        recipient: draggle,
        renderedSprites
      })
    if (randomAttack == 1){
    //o que o inimigo faz após o ataque
    queue.push(() => {
      draggle.attack({
        attack: { 
      name:'Ataque fraco',
      damage: 10,
      type:'normal'},
        recipient: emby
      })
    })
} else if(randomAttack == 2){
     //o que o inimigo faz após o ataque
queue.push(() => {
      draggle.attack1({
        attack1: { 
      name:'Bola de fogo',
      damage: 15,
      type:'fire'},
        recipient: emby,
        renderedSprites
      })
    }) 
} else if(randomAttack == 3){
    //o que o inimigo faz após o ataque
queue.push(() => {
      draggle.attack2({
         attack2: { 
      name:'Ataque forte',
      damage: 20,
      type:'big'},
        recipient: emby
      })
    })   
}else if(randomAttack == 4){
   queue.push(() => {
      draggle.attack3({
        attack3: { 
      name:'Ataque especial',
      damage: 25,
      type:'special'},
        recipient: emby,
        renderedSprites
      })
    })     
}
  })
})
//lógica abaixo para fazer o inimigo atacar
document.querySelector('#dialogueBox').addEventListener('click', (e) => {
  if (queue.length > 0) {
    queue[0]()
    queue.shift()
  } else e.currentTarget.style.display = 'none'

})