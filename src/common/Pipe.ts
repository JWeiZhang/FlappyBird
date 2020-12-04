import Bird from './Bird'
import Point from './Point'

const upPipeImage: Point = { x: 302, y: 0 }
const downPipeImage: Point = { x: 330, y: 0 }
class Pipe {
  public upPosition: Point
  public downPosition: Point
  public hasSkipped: boolean = false
  public hasScored: boolean = false
  private centerYPosition: number

  constructor(upYPosition: number) {
    this.upPosition = { x: 400, y: upYPosition - 338 }
    this.downPosition = { x: 400, y: upYPosition + 150 }
    this.centerYPosition = upYPosition
  }

  get nowXCoordinate() {
    return this.upPosition.x
  }

  setPosition(offset: number) {
    this.upPosition.x = this.upPosition.x - offset
    this.downPosition.x = this.downPosition.x - offset
  }

  public draw(ctx: CanvasRenderingContext2D, image: HTMLImageElement, offset: number) {
    // up pipe
    ctx.drawImage(
      image,
      upPipeImage.x,
      upPipeImage.y,
      26,
      135,
      this.upPosition.x,
      this.upPosition.y,
      70,
      338,
    )

    // down pipe
    ctx.drawImage(
      image,
      downPipeImage.x,
      downPipeImage.y,
      26,
      122,
      this.downPosition.x,
      this.downPosition.y,
      70,
      620 - this.downPosition.y,
    )
    this.setPosition(offset)
  }

  public isHit(bird: Bird) {
    if (
      bird.positionX + 20 >= this.upPosition.x &&
      bird.positionX <= this.upPosition.x + 95 &&
      (bird.positionY <= this.centerYPosition + 20 || bird.positionY >= this.centerYPosition + 150)
    ) {
      bird.dead()
    }
  }

  public isSkipped(): number {
    if (this.upPosition.x < 30) {
      this.hasSkipped = true
    }
    if (!this.hasScored && this.hasSkipped) {
      this.hasScored = true
      return 1
    } else {
      return 0
    }
  }
}

export default Pipe
