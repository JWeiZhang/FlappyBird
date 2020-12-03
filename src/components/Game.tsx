import React, { useState, useEffect, useRef } from 'react'
import spriteSheet from '../assets/spritesheet.png'

import Pipe from '../common/Pipe'

const canvasStyle = {
  border: '1px solid #000',
}

const moveSpeed = 3
const birdImagePosition = [60, 86]

function createPipe(pipes: Pipe[], frame: number) {
  pipes.push(new Pipe(280 + Math.sin(frame) * 30))
}

export function Game() {
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null)
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null)
  const [image, setImage] = useState<HTMLImageElement | null>(null)
  const [timer, setTimer] = useState<number>(0)
  const [frame, setFrame] = useState<number>(0)
  const [gameState, setGameState] = useState<'ready' | 'playing' | 'dead'>('ready')
  const [grassPosition, setGrassPosition] = useState<Array<number>>([-50, 380])
  const [pipes, setPipes] = useState<Array<Pipe>>([])
  const requestRef = useRef(0)
  const previousTimeRef = useRef(0)
  const previousFrameRef = useRef(0)

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

    // 取得裝置 devicePixelRatio
    const devicePixelRatio = window.devicePixelRatio || 1

    // 取得各瀏覽器 backingStoreRatio
    const backingStoreRatio =
      // @ts-ignore
      ctx?.webkitBackingStorePixelRatio ||
      // @ts-ignore
      ctx?.mozBackingStorePixelRatio ||
      // @ts-ignore
      ctx?.msBackingStorePixelRatio ||
      // @ts-ignore
      ctx?.oBackingStorePixelRatio ||
      // @ts-ignore
      ctx?.backingStorePixelRatio ||
      1

    // 計算比例
    const ratio = devicePixelRatio / backingStoreRatio

    // 取得預設我們想要呈現的 canvas 大小
    const canvasWidth = canvas.width
    const canvasHeight = canvas.height

    // 將"畫布寬高"依照比例放大
    canvas.width = canvasWidth * ratio
    canvas.height = canvasHeight * ratio

    // 將"畫布樣式寬高", 設為我們想要呈現的寬高
    canvas.style.width = `${canvasWidth}px`
    canvas.style.height = `${canvasHeight}px`

    // 將內容依照比例放大
    ctx?.scale(ratio, ratio)
  }, [])

  const animate = (time: number) => {
    if (previousTimeRef.current !== undefined) {
      const deltaTime = time - previousTimeRef.current
      const deltaFrame = time - previousFrameRef.current
      if (deltaTime > 1000) {
        setTimer(prevCount => prevCount + 1)
        previousTimeRef.current = time
      }
      setFrame(prevCount => prevCount + deltaFrame / 600)
    }

    previousFrameRef.current = time
    requestRef.current = requestAnimationFrame(animate)
  }

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(requestRef.current)
  }, [image])

  useEffect(() => {
    ctx?.clearRect(0, 0, 360, 720)
    drawBackground()
    drawGrass()
    drawTitle()
    drawStartButton()
    drawPipe()
  }, [frame])

  useEffect(() => {
    if (gameState === 'playing' && Math.floor(timer % 2) === 0) {
      createPipe(pipes, frame)
    }
  }, [timer])

  function drawBackground() {
    if (ctx && image) {
      ctx.drawImage(image, 0, 0, 144, 255, 0, 0, 360, 780)
      ctx.drawImage(image, 150, 10, 145, 40, 0, 620, 360, 100)
    }
  }

  function drawGrass() {
    if (ctx && image) {
      setGrassPosition(grassPosition.map(x => (x - moveSpeed < -510 ? 380 : x - moveSpeed)))
      ctx.drawImage(image, 146, 0, 153, 7, grassPosition[0] - moveSpeed, 620, 460, 10)
      ctx.drawImage(image, 146, 0, 153, 7, grassPosition[1] - moveSpeed, 620, 460, 10)
    }
  }

  function drawTitle() {
    if (ctx && image && gameState === 'ready') {
      const birdImageY = birdImagePosition[Math.floor((frame * 5) % 2)]
      ctx.drawImage(image, 145, 172, 98, 25, 35, 200 - Math.sin(frame * 2) * 10, 250, 62.5)
      ctx.drawImage(image, 262, birdImageY, 20, 20, 290, 200 - Math.sin(frame * 2) * 10, 50, 50)
    }
  }

  function drawStartButton() {
    if (ctx && image && gameState === 'ready') {
      ctx.drawImage(image, 242, 213, 40, 14, 130, 500, 100, 35)
    }
  }

  function drawPipe() {
    if (ctx && image && gameState === 'playing') {
      setPipes(pipes.filter(pipe => pipe.nowXCoordinate > -100))
      pipes.forEach(pipe => {
        pipe.draw(ctx, image, moveSpeed)
      })
    }
  }

  function handleClick(e: MouseEvent) {
    const { offsetX, offsetY } = e
    if (gameState === 'ready') {
      if (offsetX >= 130 && offsetX <= 230 && offsetY >= 500 && offsetY <= 535) {
        setGameState('playing')
      }
    }
  }

  return (
    <canvas
      id="canvas"
      style={canvasStyle}
      onClick={e => {
        handleClick(e.nativeEvent)
      }}
      width="360"
      height="720"
    ></canvas>
  )
}
