const getArray = key => {
  const data = JSON.parse(window.localStorage.getItem(key))
  return Array.isArray(data) ? data : []
}

const setArray = (key, data = []) => {
  window.localStorage.setItem(key, JSON.stringify(data))
  return data
}

export const objects = {
  get: () => getArray('objects'),
  set: data => setArray('objects', data.map(([w, h, title]) => ([w, h, title])))
}

export const comparing = {
  get: () => getArray('comparing'),
  set: data => setArray('comparing', data.map(([w, h, title]) => title))
}

export default { objects, comparing }
