import './Content.css'

export default function Content({flowers}) {
  return (
    <div className='wrapper'>
        {flowers.map(flower => (
            <div key={flower.id} className='box'>
                <img src={flower.image}/>
                <h3>{flower.name}</h3>
                <p>{flower.color}</p>
            </div>
        ))}
    </div>
  )
}
