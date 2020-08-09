import React, { useContext, useState } from 'react'
import { StateContext } from '../../app/context'
import { Button, ButtonRow } from '../../components/button/Button'
import { ReactComponent as Plus } from '../../assets/search-plus.svg'
import { ReactComponent as Minus } from '../../assets/search-minus.svg'

const GAP = 10

export default function ObjectsPicker () {
  const { objectsBeingCompared } = useContext(StateContext)
  const [canvasHeight, setCanvasHeight] = useState(30)

  const [viewBoxWidth, viewBoxHeight, xOffsets] =
    objectsBeingCompared.reduce((acc, cur, idx) => ([
      acc[0] + cur[0] + GAP,
      Math.max(acc[1], cur[1] + GAP * 2),
      acc[2].concat([acc[2][idx] + cur[0] + GAP])
    ]), [GAP, GAP * 2, [GAP]])

  const resize = direction => () => {
    switch (direction) {
      case 'increase':
        setCanvasHeight(Math.min(canvasHeight + 10, 80))
        break
      case 'decrease':
        setCanvasHeight(Math.max(canvasHeight - 10, 20))
        break
      default:
    }
  }

  return (
    <>
      <div className='objects-canvas-controls gutter-top--s gutter-bottom--s'>
        <ButtonRow>
          <Button mods={['symbol']} onClick={resize('decrease')} aria-label='Zoom out'><Minus /></Button>
          <Button mods={['symbol']} onClick={resize('increase')} aria-label='Zoom in'><Plus /></Button>
        </ButtonRow>
      </div>
      <div className='objects-canvas responsive' style={{ paddingBottom: `${canvasHeight}%` }}>
        {!!objectsBeingCompared.length && (
          <svg xmlns='http://www.w3.org/2000/svg' className='objects-canvas__svg responsive__element' viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`} preserveAspectRatio='xMidYMid meet'>
            {objectsBeingCompared.map(([width, height, title, key, color], idx) => (
              <g key={key} transform={`translate(${xOffsets[idx]} ${GAP})`}>
                <rect className='objects-canvas__frame' x='0' y='0' width={width} height={height} stroke={color} />
              </g>
            ))}
          </svg>
        )}
      </div>
    </>
  )
}
