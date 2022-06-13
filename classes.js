class sprite {
  constructor({
    position,
    image,
    frames = { max: 1, hold: 10 },
    sprites,
    animate = false,
    isEnemy = false,
    rotation = 0,
    scale = 1
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

    this.animate = animate
    this.sprites = sprites
    this.opacity = 1
    this.health = 100 // vida dos personagens
    this.isEnemy = isEnemy

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
    if (!this.animate) return
    if (this.frames.max > 1){
      this.frames.elapsed++
    }
    if (this.frames.elapsed % this.frames.hold ===0){
if (this.frames.max - 1 > this.frames.val) this.frames.val++
else this.frames.val = 0
      
    }

  }


  
  //função para fazer u ataque normal batida simples
  attack({ attack, recipient }) {
    const tl = gsap.timeline()

    this.health -= attack.damage
    
    let movementDistance = 20
    if (this.isEnemy) movementDistance = -20

  let healthbar = '#enemyHealthBar'
    if (this.isEnemy) healthbar = '#playerHealthBar'
    
     tl.to(this.position, {
       x: this.position.x - movementDistance * 2
     })
       .to(this.position, {
       x: this.position.x + movementDistance * 2,
       duration: 0.1,
      //O que faz o inimigo apanhar
       onComplete: () => { 
       gsap.to(healthbar, {
  width: this.health - attack.damage + '%'
})
     //fim da função    
         gsap.to(recipient.position, {
           x: recipient.position.x + 20,
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
  }



