const embyImage = new Image()//Imagem do EMBY
embyImage.src = './img/embySprite.png'

const draggleImage = new Image()//imagem do DRAGGLE
draggleImage.src = './img/draggleSprite.png'

const monsters = {
  emby: {
    position: {
    x:280,
    y:325
  },
  image: embyImage,
  frames:{
    max: 4,
    hold: 30
  },
  animate: true,
  name: 'Emby'
  },
  draggle: {
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
  isEnemy: true,
  name: 'Dragle'
  }
}