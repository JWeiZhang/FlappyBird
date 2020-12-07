import ImageInfos from './ImageInfos'

const birdImages = ImageInfos.birds

class Bird {
  public positionX = 100
  public positionY = 280
  public isDead = false
  private speed = 0
  private updateFrame = 0

  public draw(ctx: CanvasRenderingContext2D, image: HTMLImageElement, frame: number) {
    const { x, y, width, height } = birdImages[Math.floor((frame / 120) % 2)]
    if (frame - this.updateFrame > 20) {
      this.setSpeed()
      this.updateFrame = frame
    }

    if (this.positionY + this.speed < 595) {
      this.positionY = this.positionY + this.speed
    } else {
      this.positionY = 595
      this.dead()
    }
    const angle = this.speed * 15
    ctx.save()
    ctx.translate(this.positionX, this.positionY)
    ctx.rotate(((angle < -30 ? -30 : angle) * Math.PI) / 180)
    ctx.drawImage(image, x, y, width, height, -25, -25, 50, 50)
    ctx.restore()
  }

  private setSpeed(speed?: number) {
    if (speed) {
      this.speed = speed
    } else if (this.speed < 6) {
      if (this.speed < 0) {
        this.speed = this.speed + 0.7
      } else {
        this.speed = this.speed + 0.8
      }
    }
  }

  public fly() {
    this.setSpeed(-6.5)
  }

  public dead() {
    this.isDead = true
    this.setSpeed(6)
  }
}

export default Bird
