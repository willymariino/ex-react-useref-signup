import { useState } from 'react'


function App() {

  const [data, setData] = useState({
    name: "",
    username: "",
    password: "",
    Specialization: "",
    experienceYears: 0,
    description: ""

  })


  // gestione input
  const handleChange = (e) => {

    let value;

    // Se il campo è di tipo numero, converte il valore da stringa a numero
    if (e.target.type === "number") {
      value = parseInt(value)
    }

    else {
      value = e.target.value
    }

    // aggiorno il campo modificato
    setData(data => ({

      ...data,
      [e.target.name]: value
    }))


  }



  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(
      "nome:", data.name,
      "username:", data.username,
      "password:", data.password,
      "specializzazione:", data.Specialization,
      "anni di esperienza:", data.experienceYears,
      "descrizione personale", data.description
    )
  }



  return (
    <>

      <form onSubmit={handleSubmit}>

        <section>
          <label htmlFor="name">nome utente</label>
          <input type="text" id='name'
            value={data.name}
            onChange={handleChange}
            placeholder='inserisci il tuo nome'
          />
        </section>

        <section>
          <label htmlFor="userName">userName utente</label>
          <input type="text" id='userName'
            value={data.username}
            onChange={handleChange}
            placeholder='inserisci il tuo username'
          />
        </section>

        <section>
          <label htmlFor="password"> password utente</label>
          <input type="password" id='password'
            value={data.password}
            onChange={handleChange}
            placeholder='inserisci la tua password'
          />
        </section>


        <section>
          <label htmlFor="specialization">specializzazione utente </label>
          <select value={data.Specialization} onChange={handleChange} id='specialization'>
            <option value=""> scegli la tua specializzazione</option>
            <option value="Full-Stack">Full-Stack</option>
            <option value="Front-end">Front-end</option>
            <option value="Back-end">Back-end</option>
          </select>
        </section>

        <section>
          <label htmlFor="experieYears">anni di esperienza</label>
          <input type="number" id='experienceYears'
            value={data.experienceYears}
            onChange={handleChange}
            placeholder='inserisci i tuoi anni di esperienza'
          />
        </section>

        <section>
          <label htmlFor="description">descrizione personale</label>
          <input type="textarea" id='description'
            value={data.description}
            onChange={handleChange}
            placeholder='inserisci una tua descrizione personale'
          />

        </section>

        <button type='submit'>
          invia
        </button>

      </form>





    </>
  )
}

export default App
