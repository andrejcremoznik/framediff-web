import React, { useContext } from 'react'
import { StateContext } from '../../app/context'

const GAP = 10

export default function ObjectsPicker () {
  const { objectsBeingCompared } = useContext(StateContext)

  const [viewBoxWidth, viewBoxHeight, xOffsets] =
    objectsBeingCompared.reduce((acc, cur, idx) => ([
      acc[0] + cur[0] + GAP,
      Math.max(acc[1], cur[1] + GAP * 2),
      acc[2].concat([acc[2][idx] + cur[0] + GAP])
    ]), [GAP, GAP * 2, [GAP]])

  return (
    <div className='objects-canvas responsive'>
      {!!objectsBeingCompared.length && (
        <svg xmlns='http://www.w3.org/2000/svg' className='objects-canvas__svg responsive__element' viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`} preserveAspectRatio='xMidYMid meet'>
          {objectsBeingCompared.map(([width, height, title, key, color], idx) => (
            <g key={key} transform={`translate(${xOffsets[idx]} 10)`}>
              <rect className='objects-canvas__frame' x='0' y='0' width={width} height={height} stroke={color} />
            </g>
          ))}
        </svg>
      )}
    </div>
  )
}
