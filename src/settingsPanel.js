import Settings from './settings'

export default function Panel({ onReset }) {
  const onTimeChange = (e) => {
    const newTime = (+e.target.value)
    if (!isNaN(newTime)) Settings.time = newTime
  }

  const onSizeChange = (e) => {
    const newSize = (+e.target.value)
    if (!isNaN(newSize)) Settings.size = newSize
  }

  return <div>
    <p>Time:&nbsp; <input value={Settings.time} oninput={onTimeChange} /></p>
    <p>Size:&nbsp; <input value={Settings.size} oninput={onSizeChange} /></p>
    <p><button onclick={onReset} >↺</button></p>
  </div>
}
