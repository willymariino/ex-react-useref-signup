/*
💡 Premessa: Stai sviluppando un form di registrazione per una piattaforma dedicata ai giovani sviluppatori web. Gli utenti devono iscriversi indicando le loro competenze e specializzazioni.
📌 Milestone 1: Creare un Form con Campi Controllati
Crea un form di registrazione con i seguenti campi controllati (gestiti con useState):

✅ Nome completo (input di testo)

✅ Username (input di testo)

✅ Password (input di tipo password)

✅ Specializzazione (select con opzioni: "Full Stack", "Frontend", "Backend")

✅ Anni di esperienza (input di tipo number)

✅ Breve descrizione sullo sviluppatore (textarea)

Aggiungi una validazione al submit, verificando che:

Tutti i campi siano compilati
L'input Anni di esperienza sia un numero positivo
La Specializzazione sia selezionata

Al submit, se il form è valido, stampa in console i dati.

📌 Milestone 2: Validare in tempo reale
Aggiungere la validazione in tempo reale dei seguenti campi:

✅ Username: Deve contenere solo caratteri alfanumerici e almeno 6 caratteri (no spazi o simboli).

✅ Password: Deve contenere almeno 8 caratteri, 1 lettera, 1 numero e 1 simbolo.

✅ Descrizione: Deve contenere tra 100 e 1000 caratteri (senza spazi iniziali e finali).

Suggerimento: Per semplificare la validazione, puoi definire tre stringhe con i caratteri validi e usare .includes() per controllare se i caratteri appartengono a una di queste categorie:

const letters = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const symbols = "!@#$%^&*()-_=+[]{}|;:'\\",.<>?/`~";
Per ciascuno dei campi validati in tempo reale, mostrare un messaggio di errore (rosso) nel caso non siano validi, oppure un messaggio di conferma (verde) nel caso siano validi.

📌 Milestone 3: Convertire i Campi Non Controllati
Non tutti i campi del form necessitano di essere aggiornati a ogni carattere digitato. Alcuni di essi non influenzano direttamente l’interfaccia mentre l’utente li compila, quindi è possibile gestirli in modo più efficiente.

Analizza il form: Identifica quali campi devono rimanere controllati e quali invece possono essere non controllati senza impattare l’esperienza utente.
Converti i campi non controllati: Usa useRef() per gestirli e recuperare il loro valore solo al momento del submit.
Assicurati che la validazione continui a funzionare: Anche se un campo non è controllato, deve comunque essere validato correttamente quando l’utente invia il form.
*/

import { useState, useRef } from 'react'


function App() {

  const [data, setData] = useState({
    name: "",
    username: "",
    password: "",
    // Specialization: "", li commento per gestirli tramite useRef
    //  experienceYears: 0,
    //   description: ""

  })

  const [error, setError] = useState({})

  const SpecializationRef = useRef()
  const DescriptionRef = useRef()
  const ExperienceRef = useRef()



  // gestione input
  const handleChange = (e) => {

    // let value = e.target.value - versione senza destructuring

    let { name, value, type } = e.target; // estraggo i valori con destrutturazione


    // Se il campo è di tipo numero, converte il valore da stringa a numero
    if (type === "number") { // non ho più bisogno di scrivere e.target.type, perchè l'ho già destrutturata
      value = parseInt(value)
    }

    else {
      value = e.target.value
    }

    // aggiorno il campo modificato
    setData(prev => ({  // qui wrappo la graffa con un tonda perché voglio che restituisca un oggetto, non che venga interpretato come il corpo della funzione.

      ...prev,  // copio lo stato precedente
      [name]: value // aggiorno solo il campo modificato
    }))
    /*
    [e.target.name]: value  o [name]: value se destrutturato, significa:
    Nell’oggetto, metti una chiave che si chiama come l’attributo name dell’input modificato, 
    e assegna a quella chiave il valore scritto dall’utente."
    */

    // validazione live

    setError(prev => {

      let message = ""

      if ((type === "text" || type === "textarea") && value.trim().length < 3) {
        message = "almeno 3 caratteri richiesti"
      }
      else if ((type === "password") && value.trim().length < 6) {
        message = "almeno 6 caratteri richiesti"
      }
      else if (type === "number" && value <= 0) {
        message = "inserisci un numero maggiore di 0"
      }
      else if (type === "select-one" && value === "") {
        message = "seleziona una opzione"
      }

      return {
        ...prev,
        [name]: message
      }

    })


  }



  const handleSubmit = (e) => {
    e.preventDefault()

    // controllo che tutti i campi abbiano siano stati compilati con valori validi (validazione al submit)
    const spec = SpecializationRef.current.value
    const exp = ExperienceRef.current.value
    const desc = DescriptionRef.current.value
    const descLength = desc.trim().length

    if (
      !data.name.trim() ||
      !data.username.trim() ||
      !data.password.trim() ||
      !exp ||
      exp <= 0 ||
      !spec ||
      descLength > 100 || descLength < 100
      // !data.Specialization ||
      // data.experienceYears <= 0 ||
      // !data.description.trim()
    ) {
      alert("⚠️ Compila tutti i campi prima di inviare!");
      return;
    }

    console.log(
      "nome:", data.name,
      "username:", data.username,
      "password:", data.password,
      "specializzazione:", SpecializationRef.current.value,
      "anni di esperienza:", ExperienceRef.current.value,
      "descrizione personale", DescriptionRef.current.value
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
            name='name'  //name è necessario, altrimenti react non sa quale campo aggiornare, quindi se non c'è, i campi restano bloccati
            onChange={handleChange}
            placeholder='inserisci il tuo nome'
          />
          {error.name && <span style={{ color: "red", fontSize: "0.9em" }}>{error.name}</span>}
        </section>



        <section>
          <label htmlFor="userName">userName utente</label>
          <input type="text" id='userName'
            minLength={3}
            value={data.username}
            name='username'
            onChange={handleChange}
            placeholder='inserisci il tuo username'
          />
          {error.username && <span style={{ color: "red", fontSize: "0.9em" }}>{error.username}</span>}
        </section>



        <section>
          <label htmlFor="password"> password utente</label>
          <input type="password" id='password'
            minLength={6}
            value={data.password}
            name='password'
            onChange={handleChange}
            placeholder='inserisci la tua password'
          />
          {error.password && <span style={{ color: "red", fontSize: "0.9em" }}>{error.password}</span>}
        </section>



        <section>
          <label htmlFor="specialization">specializzazione utente </label>
          <select
            // value={data.Specialization} passando da un input controllato tramite state, ad uno non controllato con useRef, non mi servono più
            // onChange={handleChange}
            //  name='Specialization'
            id='specialization'
            ref={SpecializationRef}
          >
            <option value=""> scegli la tua specializzazione</option>
            <option value="Full-Stack">Full-Stack</option>
            <option value="Front-end">Front-end</option>
            <option value="Back-end">Back-end</option>
          </select>
        </section>



        <section>
          <label htmlFor="experieYears">anni di esperienza</label>
          <input type="number" id='experienceYears'
            min={1}
            minLength={1}
            ref={ExperienceRef}
            //  value={data.experienceYears}
            //  name='experienceYears'
            //  onChange={handleChange}
            placeholder='inserisci i tuoi anni di esperienza'
          />
        </section>



        <section>
          <label htmlFor="description">descrizione personale</label>
          <textarea id='description'
            minLength={100}
            maxLength={1000}
            ref={DescriptionRef}
            //  value={data.description}
            //  name='description'
            // onChange={handleChange}
            placeholder='inserisci una tua descrizione personale'
          >
          </textarea>

        </section>

        <button type='submit'>
          invia
        </button>

      </form >





    </>
  )
}

export default App
