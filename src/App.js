import './App.css';
import { Route, Routes } from 'react-router-dom';
import {SignIn, Main, NotFoundPage, Projects, SignUp, Tasks} from './components/Components';

function App() {
  return (
    <div className="App">
      <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/projects/:projectId' element={<Projects />}>
              <Route path='tasks/:taskId' element={<Tasks />} />
          </Route>
          <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
