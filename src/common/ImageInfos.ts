import Point from './Point'

interface ImageInfo extends Point {
  width: number
  height: number
}

const ImagePosition: {
  scoreImages: Array<ImageInfo>
  background: ImageInfo
  ground: ImageInfo
  grass: ImageInfo
  title: ImageInfo
  gameOver: ImageInfo
  startButton: ImageInfo
  okButton: ImageInfo
  board: ImageInfo
  birds: Array<ImageInfo>
} = {
  scoreImages: [
    { x: 288, y: 100, width: 7, height: 10 },
    { x: 290, y: 118, width: 7, height: 10 },
    { x: 289, y: 134, width: 7, height: 10 },
    { x: 289, y: 150, width: 7, height: 10 },
    { x: 287, y: 173, width: 7, height: 10 },
    { x: 287, y: 185, width: 7, height: 10 },
    { x: 284, y: 197, width: 6, height: 7 },
    { x: 292, y: 197, width: 6, height: 7 },
    { x: 284, y: 213, width: 6, height: 7 },
    { x: 292, y: 213, width: 6, height: 7 },
  ],
  background: { x: 0, y: 0, width: 144, height: 255 },
  ground: { x: 150, y: 10, width: 145, height: 40 },
  grass: { x: 146, y: 0, width: 153, height: 7 },
  startButton: { x: 242, y: 213, width: 40, height: 14 },
  okButton: { x: 246, y: 134, width: 40, height: 14 },
  title: { x: 145, y: 172, width: 98, height: 25 },
  gameOver: { x: 146, y: 199, width: 94, height: 19 },
  board: { x: 146, y: 58, width: 113, height: 58 },
  birds: [
    { x: 262, y: 60, width: 20, height: 20 },
    { x: 262, y: 86, width: 20, height: 20 },
  ],
}

export default ImagePosition
