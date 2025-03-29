// AI generated function that gives the chip random location coordinates
export default function getRandomPosition(){
  const radius = 0.5
  const angle = Math.random() * 2 * Math.PI
  const r = Math.sqrt(Math.random()) * radius

  return {
    x: r * Math.cos(angle), // X coordinate
    y: r * Math.sin(angle) // Y coordinate
  }
}