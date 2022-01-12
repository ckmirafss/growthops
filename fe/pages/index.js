import Layout from "../components/Layout"
import PlantForm from "../components/PlantForm"

export default function Home() {

  return (
    <Layout>
      <section className="antialiased  text-gray-600 px-4">
        <div className="flex flex-col justify-center">
          <PlantForm />
        </div>
      </section>
    </Layout >
  )
}
