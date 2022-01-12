import Image from 'next/image'
import { server } from '../config'

const imageLoader = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality || 75}`
}

const Plant = ({ plants, index }) => {
  return (
    <div className="w-1/4 rounded overflow-hidden shadow-lg my-8  text-center">
      <Image loader={imageLoader} src={server + "/" + plants.photo} title={plants.title} alt={plants.title} width={300} height={300} layout="responsive" className='m-auto' priority />
      <div className="px-6 py-4">
        <h3 className="font-bold text-xl mb-2">Name: {plants.name}</h3>
        <small className="font-bold mb-2">Species: {plants.species}</small>
        <p className="text-gray-600 text-base">
          Instructions: {plants.instructions}
        </p>
      </div>
    </div>
  )
}

export default Plant