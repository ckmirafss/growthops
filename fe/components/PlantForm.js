import { useState, useEffect } from "react"
import axios from "axios";
import server from '../config'
import Plant from "../components/Plant"
const PlantForm = () => {
  const [state, setState] = useState({
    name: "",
    species: "",
    instructions: "",
    photo: null,
  });
  const [plant, setPlant] = useState([]);
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    fetch('http://127.0.0.1:8000/api/plants')
      .then(response => response.json())
      .then(data => {
        setPlant(data)
        setIsLoading(false)
        console.log(data);
      })
  }, [])

  useEffect(() => {

  }, [plant])


  // Handle changes
  const handleChange = () => (e) => {

    if (e.target.files) {
      setState({ ...state, [e.target.name]: e.target.files[0] });
    } else {
      setState({ ...state, [e.target.name]: e.target.value });
    }

  }

  const clearForm = () => {
    document.getElementById("form").reset();
    setState({
      name: "",
      species: "",
      instructions: "",
      photo: "",
    });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    if (!state["name"]) return

    let formData = new FormData();

    for (let [key, value] of Object.entries(state)) {
      formData.append(key, value);
    }
    setIsLoading(true)
    // Use fetch or axios to submit the form
    await axios
      .post(`http://127.0.0.1:8000/api/plants`, formData, {
        headers: {
          'accept': 'application/json',
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(({ data }) => {
        console.log(Array.isArray(data));
        if (!Array.isArray(data)) setPlant([...plant, data])

        setIsLoading(false)
        clearForm();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <section className="mt-8 flex flex-col items-center">
      <div className="flex">
        <div className="flex-col flex ml-auto mr-auto items-center w-full lg:w-2/3 md:w-3/5">
          <h1 className="font-semibold text-gray-800">Plant Tracker App</h1>
          <form onSubmit={handleSubmit} id="form">
            <div className="mt-2 flex flex-col">
              <div className="block  flex-wrap items-stretch w-full mb-4 relative h-15 items-center rounded mb-6 form-items">
                <label
                  htmlFor="name"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Plant Name
                </label>
                <input
                  onChange={handleChange()}
                  value={state.name}
                  type="text"

                  name="name"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="block  flex-wrap items-stretch w-full mb-4 relative h-15 items-center rounded mb-6 form-items">
                <label
                  htmlFor="species"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Species
                </label>
                <input
                  onChange={handleChange()}
                  value={state.species}
                  type="text"

                  name="species"
                  className=" shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="block flex-wrap items-stretch w-full mb-4 relative h-15 items-center rounded mb-6 form-items">
                <label
                  htmlFor="instruction"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Water Instructions
                </label>
                <input type="text"
                  onChange={handleChange()}
                  value={state.instructions}
                  id="instructions"
                  name="instructions"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className=" block flex-wrap items-stretch w-full mb-4 relative h-15 items-center rounded mb-6 form-items">
                <div className="mb-3 w-96">
                  <label htmlFor="formFile" className="block text-gray-700 text-sm font-bold mb-2">Upload Photo</label>
                  <input className=" shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="file" id="formFile" name="photo" accept="image/*" onChange={handleChange()} />
                </div>
              </div>
            </div>
            <button type="submit" className="bg-blue-400 py-4 text-center px-17 md:px-12 md:py-4 text-white rounded leading-tight text-xl md:text-base w-full mt-4 mb-20">
              Add Plant
            </button>
          </form>
        </div>
      </div >



      <div className="w-full max-none mx-auto bg-white shadow-lg rounded-sm ">
        <div className="p-3">
          <div className="flex flex-wrap gap-4 text-sm text-center justify-center rounded-lg">
            {

              isLoading ? <h2>Loading...</h2> :
                plant.length > 0 ? plant.map((item) => <Plant plants={item} key={item.id} />) : <h2>No plants to show</h2>
            }
          </div>
        </div>
      </div>

    </section >
  )
}

export default PlantForm