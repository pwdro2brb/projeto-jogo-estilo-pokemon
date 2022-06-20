const battleBackgroundImage = new Image()
battleBackgroundImage.src = './img/battleBackground.png'
const battleBackground = new sprite({
  position:{
  x:0,
  y:0
  },
  image: battleBackgroundImage,
})


let emby 
let draggle 
let renderedSprites
let queue
let battleAnimationId

function initBattle() {

document.querySelector('#userInterface').style.display = 'block'

document.querySelector('#dialogueBox').style.display = 'none'

document.querySelector('#enemyHealthBar').style.width = '100%'

document.querySelector('#playerHealthBar').style.width = '100%'

  
  document.querySelector
  draggle = new monster(monsters.draggle)
  emby = new monster(monsters.emby)
  renderedSprites = []
  queue = []
  battleBackground
  //o evento 'listeners' para os botões de ataque  básico
document.querySelectorAll('#a').forEach((button) => {
  button.addEventListener('click', () =>{
    
 const randomAttack = Math.floor((Math.random() * 4) + 1)
    
      emby.attack({ 
        attack: { 
      name:'Ataque fraco',
      damage: 10,
      type:'Normal'},
        recipient: draggle
      })
    
if (draggle.health <= 0) {
      queue.push(() => {
        draggle.faint()
      })
 queue.push(() => {
        //voltar ao mapa
        gsap.to('#overlappingDiv', {
          opacity: 1,
          onComplete: () => {
            cancelAnimationFrame(battleAnimationId)
            document.querySelector('#userInterface').style.display = 'none'//linha para os campos de batalha não aparecer no mapa
            animate()
            gsap.to('#overlappingDiv', {
              opacity: 0
            })
            battle.initiated = false
          }
        })
      })
      return
    }else if (emby.health <= 0) {
      queue.push(() => {
        emby.faint()
      })
      queue.push(() => {
        //voltar ao mapa
        gsap.to('#overlappingDiv', {
          opacity: 1,
          onComplete: () => {
            cancelAnimationFrame(battleAnimationId)
            document.querySelector('#userInterface').style.display = 'none'//linha para os campos de batalha não aparecer no mapa
            animate()
            gsap.to('#overlappingDiv', {
              opacity: 0
            })
             battle.initiated = false
          }
        })
      })
      return
     }
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
  button.addEventListener('mouseenter', () => {//dialogo explicando o que o ataque faz
    document.querySelector('#attackType').innerHTML = '<h1> Ataque do tipo normal </h1>' 
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
      type:'Fogo'},
        recipient: draggle
      })

 if (draggle.health <= 0) {
      queue.push(() => {
        draggle.faint()
      })
     queue.push(() => {
        //voltar ao mapa
        gsap.to('#overlappingDiv', {
          opacity: 1,
          onComplete: () => {
            cancelAnimationFrame(battleAnimationId)
            document.querySelector('#userInterface').style.display = 'none'//linha para os campos de batalha não aparecer no mapa
            animate()
            gsap.to('#overlappingDiv', {
              opacity: 0
            })
             battle.initiated = false
          }
        })
      })
     return 
 }else if (emby.health <= 0) {
      queue.push(() => {
        emby.faint()
      })
      queue.push(() => {
        //voltar ao mapa
        gsap.to('#overlappingDiv', {
          opacity: 1,
          onComplete: () => {
            cancelAnimationFrame(battleAnimationId)
            document.querySelector('#userInterface').style.display = 'none'//linha para os campos de batalha não aparecer no mapa
            animate()
            gsap.to('#overlappingDiv', {
              opacity: 0
            })
             battle.initiated = false
          }
        })
      })
      return
     }
    
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
      button.addEventListener('mouseenter', () => {//dialogo explicando o que o ataque faz
    document.querySelector('#attackType').innerHTML = '<h1> Ataque do tipo fogo </h1>'
  
  })
})

//o evento 'listeners' para o botão de ataque "Batidão"
document.querySelectorAll('#c').forEach((button) => {
  button.addEventListener('click', () =>{
    
 const randomAttack = Math.floor((Math.random() * 4) + 1)
    
      emby.attack2({ 
        attack2: { 
      name:'Ataque forte',
      damage: 20,
      type:'Forte'},
        recipient: draggle
      })

    if (draggle.health <= 0) {
      queue.push(() => {
        draggle.faint()
      })
      queue.push(() => {
        //voltar ao mapa
        gsap.to('#overlappingDiv', {
          opacity: 1,
          onComplete: () => {
            cancelAnimationFrame(battleAnimationId)
            document.querySelector('#userInterface').style.display = 'none'//linha para os campos de batalha não aparecer no mapa
            animate()
            gsap.to('#overlappingDiv', {
              opacity: 0
            })
             battle.initiated = false
          }
        })
      })
      return
    } else if (emby.health <= 0) {
      queue.push(() => {
        emby.faint()
      })
      queue.push(() => {
        //voltar ao mapa
        gsap.to('#overlappingDiv', {
          opacity: 1,
          onComplete: () => {
            cancelAnimationFrame(battleAnimationId)
            document.querySelector('#userInterface').style.display = 'none'//linha para os campos de batalha não aparecer no mapa
            animate()
            gsap.to('#overlappingDiv', {
              opacity: 0
            })
             battle.initiated = false
          }
        })
      })
      return
     }
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
      button.addEventListener('mouseenter', () => {//dialogo explicando o que o ataque faz
    document.querySelector('#attackType').innerHTML = '<h1>Ataque do tipo Forte </h1>'
    
  })
})

//o evento 'listeners' para o botão de ataque "especial"
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
    
if (draggle.health <= 0) {
      queue.push(() => {
        draggle.faint()
      })
      queue.push(() => {
        //voltar ao mapa
        gsap.to('#overlappingDiv', {
          opacity: 1,
          onComplete: () => {
            cancelAnimationFrame(battleAnimationId)
            document.querySelector('#userInterface').style.display = 'none'//linha para os campos de batalha não aparecer no mapa
            animate()
            gsap.to('#overlappingDiv', {
              opacity: 0
            })
             battle.initiated = false
          }
        })
      })
      return
    }else if (emby.health <= 0) {
      queue.push(() => {
        emby.faint()
      })
      queue.push(() => {
        //voltar ao mapa
        gsap.to('#overlappingDiv', {
          opacity: 1,
          onComplete: () => {
            cancelAnimationFrame(battleAnimationId)
            document.querySelector('#userInterface').style.display = 'none'//linha para os campos de batalha não aparecer no mapa
            animate()
            gsap.to('#overlappingDiv', {
              opacity: 0
            })
             battle.initiated = false
          }
        })
      })
      return
     }
    
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
      button.addEventListener('mouseenter', () => {//dialogo explicando o que o ataque faz
    document.querySelector('#attackType').innerHTML = '<h1> Ataque do tipo especial </h1>'
  
  })
})

}

function animateBattle(){
battleAnimationId = window.requestAnimationFrame(animateBattle)
  battleBackground.draw()
  
  draggle.draw()
  emby.draw()
  
  renderedSprites.forEach((sprite) =>{
    sprite.draw()
  })    
}
//initBattle()
//animateBattle()



//lógica abaixo para fazer o inimigo atacar
document.querySelector('#dialogueBox').addEventListener('click', (e) => {
  if (queue.length > 0) {
    queue[0]()
    queue.shift()
  } else e.currentTarget.style.display = 'none'

})