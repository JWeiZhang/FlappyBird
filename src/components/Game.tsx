import React, { useState, useEffect } from 'react'
import spriteSheet from '../assets/spritesheet.png'

const canvasStyle = {
  border: '1px solid #000',
  width: '360px',
  height: '720px',
}

export function Game() {
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null)
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null)
  const [image, setImage] = useState<HTMLImageElement | null>(null)

  // 與 componentDidMount 和 componentDidUpdate 類似：
  useEffect(() => {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement
    setCanvas(canvas)
    setCtx(canvas.getContext('2d'))
    ctx?.clearRect(0, 0, 360, 720)
    const image = new Image()
    image.src = spriteSheet
    image.onload = () => {
      setImage(image)
    }
  }, [])

  useEffect(() => {
    drawBackground()
  }, [image])

  function drawBackground() {
    console.log(ctx, image)
    if (ctx && image) {
      ctx.drawImage(image, 0, 0, 145, 260, 0, 0, 300, 160)
      ctx.drawImage(image, 150, 10, 145, 40, 0, 125, 300, 50)
    }
  }

  return <canvas id="canvas" style={canvasStyle}></canvas>
}
