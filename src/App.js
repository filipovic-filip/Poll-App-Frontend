import logo from './logo.svg';
import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './components/users/Login';
import Register from './components/users/Register';
import NavBar from './components/NavBar';
import Polls from './components/polls/Polls';
import UserPolls from './components/polls/UserPolls';
import ViewPoll from './components/polls/ViewPoll';
import ModifyPoll from './components/polls/ModifyPoll';
import CreatePoll from './components/polls/CreatePoll';
import ViewVoters from './components/polls/ViewVoters';

const App = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/polls" element={<Polls />} />
        <Route path="/user-polls" element={<UserPolls />} />
        <Route path="/poll/view/:pollId" element={<ViewPoll />} />
        <Route path="/poll/modify/:pollId" element={<ModifyPoll />} />
        <Route path="/poll/create" element={<CreatePoll />} />

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </>
  )
}

export default App;
