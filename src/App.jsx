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

  const [error, setError] = useState("")


  // gestione input
  const handleChange = (e) => {

    let value = e.target.value

    // Se il campo è di tipo numero, converte il valore da stringa a numero
    if (e.target.type === "number") {
      value = parseInt(value)
    }

    else {
      value = e.target.value
    }

    // aggiorno il campo modificato
    setData(prev => ({  // qui wrappo la graffa con un tonda perché voglio che restituisca un oggetto, non che venga interpretato come il corpo della funzione.

      ...prev,  // copio lo stato precedente
      [e.target.name]: value // aggiorno solo il campo modificato
    }))
    /*
    [e.target.name]: value significa:
    Nell’oggetto, metti una chiave che si chiama come l’attributo name dell’input modificato, 
    e assegna a quella chiave il valore scritto dall’utente."
    */

    // validazione live

    if (value.lenght < 3) {
      setError("il nome deve avere almeno 3 caratteri")
    }
    else {
      setError("")
    }

  }



  const handleSubmit = (e) => {
    e.preventDefault()

    // controllo che tutti i campi abbiano valori validi
    if (
      !data.name.trim() ||
      !data.username.trim() ||
      !data.password.trim() ||
      !data.Specialization ||
      data.experienceYears <= 0 ||
      !data.description.trim()
    ) {
      alert("⚠️ Compila tutti i campi prima di inviare!");
      return;
    }

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
            minLength={3}
            value={data.name}
            name='name'  // name è necessario, altrimenti react non sa quale campo aggiornare, quindi se non c'è, i campi restano bloccati
            onChange={handleChange}
            placeholder='inserisci il tuo nome'
          />
        </section>

        {error && <span style={{ color: "red", fontSize: "0.9em" }}>{error}</span>}

        <section>
          <label htmlFor="userName">userName utente</label>
          <input type="text" id='userName'
            minLength={3}
            value={data.username}
            name='username'
            onChange={handleChange}
            placeholder='inserisci il tuo username'
          />
        </section>

        {error && <span style={{ color: "red", fontSize: "0.9em" }}>{error}</span>}

        <section>
          <label htmlFor="password"> password utente</label>
          <input type="password" id='password'
            minLength={3}
            value={data.password}
            name='password'
            onChange={handleChange}
            placeholder='inserisci la tua password'
          />
        </section>

        {error && <span style={{ color: "red", fontSize: "0.9em" }}>{error}</span>}

        <section>
          <label htmlFor="specialization">specializzazione utente </label>
          <select value={data.Specialization} onChange={handleChange} id='specialization' name='Specialization'>
            <option value=""> scegli la tua specializzazione</option>
            <option value="Full-Stack">Full-Stack</option>
            <option value="Front-end">Front-end</option>
            <option value="Back-end">Back-end</option>
          </select>
        </section>

        {error && <span style={{ color: "red", fontSize: "0.9em" }}>{error}</span>}

        <section>
          <label htmlFor="experieYears">anni di esperienza</label>
          <input type="number" id='experienceYears'
            min={1}
            minLength={1}
            value={data.experienceYears}
            name='experienceYears'
            onChange={handleChange}
            placeholder='inserisci i tuoi anni di esperienza'
          />
        </section>

        {error && <span style={{ color: "red", fontSize: "0.9em" }}>{error}</span>}

        <section>
          <label htmlFor="description">descrizione personale</label>
          <textarea id='description'
            minLength={10}
            value={data.description}
            name='description'
            onChange={handleChange}
            placeholder='inserisci una tua descrizione personale'
          >
          </textarea>

        </section>

        {error && <span style={{ color: "red", fontSize: "0.9em" }}>{error}</span>}

        <button type='submit'>
          invia
        </button>

      </form >





    </>
  )
}

export default App
