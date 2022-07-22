import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "./components/login";
import QuizPage from "./components/quiz-page"
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />}/>
      <Route path="/quiz-page" element={<QuizPage />}/>
    </Routes>
  </BrowserRouter>
  );
}

export default App;