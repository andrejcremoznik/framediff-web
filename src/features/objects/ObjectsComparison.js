import React, { useContext, useMemo, useState } from 'react'
import { StateContext } from '../../app/context'
import { randomColor } from '../../etc/utils'
import Autocomplete from '../../components/form/Autocomplete'
import { Button, ButtonRow } from '../../components/button/Button'
import { ReactComponent as IconMinus } from '../../assets/search-minus.svg'
import { ReactComponent as IconPlus } from '../../assets/search-plus.svg'
import { ReactComponent as IconTimes } from '../../assets/times.svg'

const GAP = 10

export default function ObjectsComparison () {
  const { localObjects, globalObjects } = useContext(StateContext)
  const [objectsBeingCompared, setObjectsBeingCompared] = useState([])
  const [canvasHeight, setCanvasHeight] = useState(30)

  const allObjects = useMemo(
    () => globalObjects
      .concat(localObjects)
      .filter((object, idx, self) => self.findIndex(o => o[2] === object[2]) === idx)
      .sort(),
    [globalObjects, localObjects]
  )

  const objectsForAutocomplete = useMemo(
    () => allObjects
      .filter(globalObject => objectsBeingCompared
        .findIndex(objectBeingCompared => objectBeingCompared[3] === globalObject[3]) < 0)
      .map(globalObject => ({ id: globalObject[3], text: globalObject[2] })),
    [allObjects, objectsBeingCompared]
  )

  const [viewBoxWidth, viewBoxHeight, xOffsets] = useMemo(
    () => objectsBeingCompared.reduce((acc, cur, idx) => ([
      acc[0] + cur[0] + GAP,
      Math.max(acc[1], cur[1] + GAP * 2),
      acc[2].concat([acc[2][idx] + cur[0] + GAP])
    ]), [GAP, GAP * 2, [GAP]]),
    [objectsBeingCompared]
  )

  const addObjectForComparison = id => {
    const objects = objectsBeingCompared.concat([[
      ...allObjects.find(obj => obj[3] === id),
      randomColor()
    ]])
    setObjectsBeingCompared(objects)
  }

  const removeObjectFromComparison = id => () => {
    const objects = objectsBeingCompared.filter(obj => obj[3] !== id)
    setObjectsBeingCompared(objects)
  }

  const randomizeColor = id => () => {
    const objects = objectsBeingCompared.map(obj => obj[3] === id ? [...obj.slice(0, 4), randomColor()] : obj)
    setObjectsBeingCompared(objects)
  }

  const resizeCanvas = direction => () => {
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
      <div className='objects-picker__input gutter-bottom--s'>
        <Autocomplete
          options={objectsForAutocomplete}
          onSelect={addObjectForComparison}
          label='Select objects for comparison'
        />
      </div>
      <div className='objects-picker__items gutter-bottom--s'>
        {!!objectsBeingCompared.length && objectsBeingCompared.map(([w, h, t, id, c]) => (
          <div key={id} className='objects-picker__item'>
            <div className='objects-picker__item-legend' style={{ backgroundColor: c }} onClick={randomizeColor(id)} />
            <div className='objects-picker__item-title'>{t}</div>
            <Button className='objects-picker__item-x' mods={['symbol', 'plain']} onClick={removeObjectFromComparison(id)} aria-label='Remove object'><IconTimes /></Button>
          </div>
        ))}
      </div>
      <div className='objects-canvas__controls gutter-bottom--s'>
        <ButtonRow>
          <Button mods={['symbol']} onClick={resizeCanvas('decrease')} aria-label='Zoom out'><IconMinus /></Button>
          <Button mods={['symbol']} onClick={resizeCanvas('increase')} aria-label='Zoom in'><IconPlus /></Button>
        </ButtonRow>
      </div>
      <div className='objects-canvas__panel responsive' style={{ paddingBottom: `${canvasHeight}%` }}>
        {!!objectsBeingCompared.length && (
          <svg xmlns='http://www.w3.org/2000/svg' className='objects-canvas__svg responsive__element' viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`} preserveAspectRatio='xMidYMid meet'>
            {objectsBeingCompared.map(([w, h, t, id, c], idx) => (
              <g key={id} transform={`translate(${xOffsets[idx]} ${GAP})`}>
                <rect className='objects-canvas__frame' x='0' y='0' width={w} height={h} stroke={c} />
              </g>
            ))}
          </svg>
        )}
      </div>
    </>
  )
}
