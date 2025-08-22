import { useState } from 'react'


function App() {

  const [name, setName] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [Specialization, setSpecialization] = useState("")
  const [experienceYears, setExperienceYears] = useState(0)
  const [description, setDescription] = useState("")

  // gestione input
  const handleChange = (e) => {
    const value = e.target.value
    setName(value)
    setUsername(value)
    setPassword(value)
    setSpecialization(value)
    setExperienceYears(value)
    setDescription(value)


  }

  // if (e.target.type === "number") {
  //   value = parseInt(value)
  // }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(
      "nome:", name,
      "username:", username,
      "password:", password,
      "specializzazione:", Specialization,
      "anni di esperienza:", experienceYears,
      "descrizione personale", description
    )
  }



  return (
    <>

      <form onSubmit={handleSubmit}>

        <section>
          <input type="text"
            value={name}
            onChange={handleChange}
            placeholder='inserisci il tuo nome'
          />
        </section>

        <section>
          <input type="text"
            value={username}
            onChange={handleChange}
            placeholder='inserisci il tuo username'
          />
        </section>

        <section>
          <input type="password"
            value={password}
            onChange={handleChange}
            placeholder='inserisci la tua password'
          />
        </section>


        <section>
          <select value={Specialization} onChange={handleChange}>
            <option value=""> scegli la tua specializzazione</option>
            <option value="Full-Stack">Full-Stack</option>
            <option value="Front-end">Front-end</option>
            <option value="Back-end">Back-end</option>
          </select>
        </section>

        <input type="number"
          value={experienceYears}
          onChange={handleChange}
          placeholder='inserisci la tua password'
        />

        <button type='submit'>

        </button>

      </form>





    </>
  )
}

export default App
