import React, { useEffect, useState } from "react";

function validateEmail(email) {
  const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(email);
}

function validateDate(dob) {
  const today = new Date();
  const birthDate = new Date(dob);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
  }
  return age >= 18;
}

function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [color, setColor] = useState('');
  const [news, setNews] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [hobbies, setHobbies] = useState([]);
  const [isValid, setIsValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    setIsValid(true);
    setErrorMessage('');

    if (name.length < 2) {
      setIsValid(false);
      setErrorMessage('Name must be at least 2 characters long. ')
    }

    if (!validateEmail(email)) {
      setIsValid(false);
      setErrorMessage('Enter a valid email. ');
    }

    if (!validateDate(dob)) {
      setIsValid(false);
      setErrorMessage('You must be at least 18 years old. ')
    }

    console.log(name, email, dob, color, news, hobbies);
  }

  useEffect(() => {
    setShowResult(isValid)
  }, [isValid])

  return (
    <div>
      <h3>Interactive Forms</h3>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div>
          <label htmlFor="dob">Date of Birth</label>
          <input id="dob" type="date" value={dob} onChange={(e) => setDob(e.target.value)} />
        </div>

        <div>
          <label htmlFor="color">Favourite color</label>
          <select id="color" value={color} onChange={(e) => setColor(e.target.value)}>
            <option></option>
            <option value="red">Red</option>
            <option value="green">Green</option>
            <option value="blue">Blue</option>
          </select>
        </div>

        <div>
          <label htmlFor="news">Subscribe to our newsletter</label>
          <input id="news" type="checkbox" checked={news} onChange={(e) => setNews(e.target.checked)} />
        </div>

        <div>
          <h4>Hobbies</h4>
          <button type="button" onClick={() => setHobbies(prev => {
            const newHobbies = [...prev]
            newHobbies.push('');
            return newHobbies;
          })}>Add Hobby</button>
          {hobbies.map((hobby, i) => (
            <>
              <input
                key={i}
                type="text"
                value={hobby}
                onChange={(e => setHobbies(prev => {
                  const newHobbies = [...prev]
                  newHobbies[i] = e.target.value
                  return newHobbies
                }))} />
              <button onClick={() => setHobbies(prev => prev.filter(hobby => hobby !== hobbies[i]))}>Remove</button>
            </>
          ))}
        </div>

        <div>
          <input type="submit" />
        </div>
      </form>

      {showResult && <div>
        Name: {name}, Email: {email}, Color: {color}, Hobbies: {hobbies.join(', ')}
      </div>}
      {errorMessage && <div>{errorMessage}</div>}
    </div>
  );
}

export default App;
