class sprite {
  constructor({
    position,
    image,
    frames = { max: 1, hold: 10 },
    sprites,
    animate = false,
    rotation = 0,
    scale = 1,
  }) {
    this.position = position
    this.image = new Image()
    this.frames = { ...frames, val: 0, elapsed: 0 }
    
    this.image.onload = () => {
      this.width = (this.image.width / this.frames.max) * scale
      this.height = this.image.height * scale
    }
    this.moving = false
    this.image.src = image.src
    this.name = name
    this.animate = animate
    this.sprites = sprites
    this.opacity = 1

    this.rotation = rotation
    this.scale = scale
  }

  draw() {
    c.save()
    c.translate(
      this.position.x + this.width / 2,
      this.position.y + this.height / 2
    )
    c.rotate(this.rotation)
    c.translate(
      -this.position.x - this.width / 2,
      -this.position.y - this.height / 2
    )
    c.globalAlpha = this.opacity

    const crop = {
      position: {
        x: this.frames.val * (this.width / this.scale),
        y: 0
      },
      width: this.image.width / this.frames.max,
      height: this.image.height
    }

    const image = {
      position: {
        x: this.position.x,
        y: this.position.y
      },
      width: this.image.width / this.frames.max,
      height: this.image.height
    }

    c.drawImage(
      this.image,
      crop.position.x,
      crop.position.y,
      crop.width,
      crop.height,
      image.position.x,
      image.position.y,
      image.width * this.scale,
      image.height * this.scale
    )
      c.restore()
    if (!this.animate) return
    if (this.frames.max > 1){
      this.frames.elapsed++
    }
    
    if (this.frames.elapsed % this.frames.hold ==0){
if (this.frames.max - 1 > this.frames.val) this.frames.val++
else this.frames.val = 0  
    }
   }
 }

class monster extends sprite {
   constructor({
    position,
    image,
    frames = { max: 1, hold: 10 },
    sprites,
    animate = false,
    rotation = 0,
    scale = 1,
    isEnemy = false,
      name
   }) {
     super({
       position,
       image,
       frames,
       sprites,
       animate,
       rotation
     })
    this.health = 100 // vida dos personagens
    this.isEnemy = isEnemy
    this.name = name
     this.attacks = attacks
   }

  faint() {
    document.querySelector('#dialogueBox').innerHTML = this.name + " desmaiou!!!"
    gsap.to(this.position,{
      y: this.position.y + 20
    })
    gsap.to(this, {
      opacity: 0
    })
  }
  
  //função para fazer o ataque normal batida simples
  attack({ attack, recipient }) {
   document.querySelector('#dialogueBox').style.display = 'block'
    document.querySelector('#dialogueBox').innerHTML = this.name + " usou um " + attack.name
    
    let healthbar = '#enemyHealthBar'
    if (this.isEnemy) healthbar = '#playerHealthBar'
    
    const tl = gsap.timeline()

    recipient.health -= attack.damage
    
    let movementDistance = 20
    if (this.isEnemy) movementDistance = -20

 
    
     tl.to(this.position, {
       x: this.position.x - movementDistance * 2
     })
       .to(this.position, {
       x: this.position.x + movementDistance * 2,
       duration: 0.1,
      //O que faz o inimigo apanhar
       onComplete: () => { 
       gsap.to(healthbar, {
  width: recipient.health - attack.damage + '%'
})
         
         gsap.to(recipient.position, {
           x: recipient.position.x + 10,
           yoyo: true,
           repeat: 3,
           duration: 0.08
         })
         gsap.to(recipient, {
           opacity: 0,
           repeat: 5,
           yoyo: true,
           duration: 0.08
         })
       }
     }).to(this.position, {
       x: this.position.x 
     })
    }
  
//função para fazer o ataque da bola de fogo
  attack1({ attack1, recipient}) {

document.querySelector('#dialogueBox').style.display = 'block'
    document.querySelector('#dialogueBox').innerHTML = this.name + " usou uma " + attack1.name
    
    let healthbar = '#enemyHealthBar'
    if (this.isEnemy) healthbar = '#playerHealthBar'

recipient.health -= attack1.damage

    const fireballImage = new Image()//constante para chamar a bola de fogo
    fireballImage.src = './img/fireball.png'
    const fireball = new sprite({//constante que anima e bota a bola de fogo
      position : {
        x: this.position.x,
        y: this.position.y
      },
      image: fireballImage,
      frames: {
        max: 4,
        hold: 10
      },
      animate: true,
      rotation: 1
    })
   renderedSprites.splice(1, 0, fireball)//faz a bola de fogo funcionar

     gsap.to(fireball.position, {
      x: recipient.position.x,
      y: recipient.position.y,
      onComplete: () => { 
        //O que faz o inimigo apanhar
        gsap.to(healthbar, {
  width: recipient.health - attack1.damage + '%'
})
       
         gsap.to(recipient.position, {
           x: recipient.position.x + 2,
           yoyo: true,
           repeat: 3,
           duration: 0.08
          
         })
         gsap.to(recipient, {
           opacity: 0,
           repeat: 5,
           yoyo: true,
           duration: 0.08
         })
           renderedSprites.pop()
      }
    })
       const tl = gsap.timeline()

    
    
    let movementDistance = 1
    if (this.isEnemy) movementDistance = 1

    
     tl.to(this.position, {
       x: this.position.x - movementDistance * 1
     })
       .to(this.position, {
       x: this.position.x + movementDistance * 1,
       duration: 0.8,
     
     }).to(this.position, {
       x: this.position.x 
     })

  }
//função para fazer o ataque forte
  attack2({ attack2, recipient }) {

document.querySelector('#dialogueBox').style.display = 'block'
    document.querySelector('#dialogueBox').innerHTML = this.name + " usou um " + attack2.name
    
    let healthbar = '#enemyHealthBar'
    if (this.isEnemy) healthbar = '#playerHealthBar'

        recipient.health -= attack2.damage

    const tl = gsap.timeline()
    
    let movementDistance = 200
    if (this.isEnemy) movementDistance = -200

    
    
     tl.to(this.position, {
       x: this.position.x - movementDistance * 2
     })
       .to(this.position, {
       x: this.position.x + movementDistance * 2,
       duration: 0.1,
      //O que faz o inimigo apanhar
       onComplete: () => { 
       gsap.to(healthbar, {
  width: recipient.health - attack2.damage + '%'
})
       
         gsap.to(recipient.position, {
           x: recipient.position.x + 15,
           yoyo: true,
           repeat: 3,
           duration: 0.08
         })
         gsap.to(recipient, {
           opacity: 0,
           repeat: 5,
           yoyo: true,
           duration: 0.08
         })
       }
     }).to(this.position, {
       x: this.position.x 
     })
    }
  
//função para fazer o ataque special
  attack3({ attack3, recipient, renderedSprites }) {

document.querySelector('#dialogueBox').style.display = 'block'
    document.querySelector('#dialogueBox').innerHTML = this.name + " usou um " + attack3.name
    
        let healthbar = '#enemyHealthBar'
    if (this.isEnemy) healthbar = '#playerHealthBar'

    recipient.health -= attack3.damage
    
const specialImage = new Image()//constante para chamar a imagem da bola de fogo
    specialImage.src = './img/Special attack1.png'
    const special = new sprite({//constante que anima e bota a bola de fogo
      position : {
        x: recipient.position.x,
      y: recipient.position.y
        
      },
      image: specialImage,
      frames: {
        max: 30,
        hold: 2
      },
      animate: true,
     
    })

   renderedSprites.push(special)//faz o ataque especial funcionar

    
    gsap.to(special.position, {
         
      onComplete: () => { 
          
        //O que faz o inimigo apanhar
        gsap.to(healthbar, {
  width: recipient.health - attack3.damage + '%'
})

         gsap.to(recipient.position, {
           x: recipient.position.x + 28,
           yoyo: true,
           repeat: 3,
           duration: 0.08
          
         })
         gsap.to(recipient, {
           opacity: 0,
           repeat: 5,
           yoyo: true,
           duration: 0.08
         })
 renderedSprites.pop()
      }
      
    })
     
    const tl = gsap.timeline()

    
    
    let movementDistance = 0
    if (this.isEnemy) movementDistance = 0

    
     tl.to(this.position, {
       x: this.position.x - movementDistance * 0
     })
       .to(this.position, {
       x: this.position.x + movementDistance * 0,
       duration: 0.8,
     
     }).to(this.position, {
       x: this.position.x 
     })
       
    }
  
}
         