import Point from './Point'

interface ImageInfo extends Point {
  width: number
  height: number
}

const ImagePosition: {
  scoreImages: Array<ImageInfo>
} = {
  scoreImages: [
    {
      x: 288,
      y: 100,
      width: 7,
      height: 10,
    },
    {
      x: 290,
      y: 118,
      width: 7,
      height: 10,
    },
    {
      x: 289,
      y: 134,
      width: 7,
      height: 10,
    },
    {
      x: 289,
      y: 150,
      width: 7,
      height: 10,
    },
    {
      x: 287,
      y: 173,
      width: 7,
      height: 10,
    },
    {
      x: 287,
      y: 185,
      width: 7,
      height: 10,
    },
    {
      x: 284,
      y: 197,
      width: 6,
      height: 7,
    },
    {
      x: 292,
      y: 197,
      width: 6,
      height: 7,
    },
    {
      x: 284,
      y: 213,
      width: 6,
      height: 7,
    },
    {
      x: 292,
      y: 213,
      width: 6,
      height: 7,
    },
  ],
}

export default ImagePosition
