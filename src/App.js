
import './App.css';
import Header from './components/Header/Header';
import { BrowserRouter } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import { Routes , Route } from 'react-router-dom';
import Home from './Page/Home/Home';
import Quiz from './Page/Quiz/Quiz';
import Result from './Page/Result/Result';
import { useState } from 'react';
import axios from 'axios';

function App() {
  const [questions, setQuestions] = useState();
  const [name, setName] = useState();
  const [score, setScore] = useState(0);

  const fetchQuestions = async (category = "", difficulty = "") => {
    const { data } = await axios.get(
      `https://opentdb.com/api.php?amount=10${
        category && `&category=${category}`
      }${difficulty && `&difficulty=${difficulty}`}&type=multiple`
    );
    setQuestions(data.results);
    };

  return (
    <BrowserRouter>
      <div className="App" style={{backgroundImage:"url(./ques.jpg)"}}>
       <Header />

       <Routes>

         <Route path='/' element={<Home  name={name}
              setName={setName}
              fetchQuestions={fetchQuestions} />} />
         <Route path='/quiz' element={<Quiz
               name={name}
               questions={questions}
               score={score}
               setScore={setScore}
               setQuestions={setQuestions}
                /> }/>
         <Route path='/result' element={<Result 
         name={name} score={score}
         />} />

       </Routes>

      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
