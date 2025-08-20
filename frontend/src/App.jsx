import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { getUsers, addUser, claimPoints, getLeaderboard, getHistory } from './api';
import UserSelector from './components/UserSelector';
import AddUserForm from './components/AddUserForm';
import ClaimPanel from './components/ClaimPanel';
import Leaderboard from './components/Leaderboard';
import HistoryTable from './components/HistoryTable';

const SOCKET_URL = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace('/api', '') : 'http://localhost:5000';

export default function App() {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [leaderboard, setLeaderboard] = useState([]);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    loadAll();
    const socket = io(SOCKET_URL);
    socket.on('leaderboardUpdated', (data) => {
      setLeaderboard(data);
    });
    return () => socket.disconnect();
  }, []);

  const loadAll = async () => {
    try {
      const u = await getUsers();
      setUsers(u);
      if (u.length && !selectedUserId) setSelectedUserId(u[0]._id);
      const lb = await getLeaderboard();
      setLeaderboard(lb);
      const h = await getHistory();
      setHistory(h);
    } catch (err) {
      console.error(err);
      toast.error('Failed to load data');
    }
  };

  const handleAddUser = async (name) => {
    try {
      const newUser = await addUser({ name });
      setUsers(prev => [...prev, newUser]);
      setSelectedUserId(newUser._id);
      toast.success(`User ${newUser.name} added`);
    } catch (err) {
      console.error(err);
      toast.error('Add user failed');
    }
  };

  const handleClaim = async () => {
    if (!selectedUserId) return toast.warning('Select a user first');
    try {
      const res = await claimPoints({ userId: selectedUserId });
      toast.success(`You got ${res.points} points!`);
      // the leaderboard will update via socket event; but refresh history for immediate view
      const h = await getHistory();
      setHistory(h);
    } catch (err) {
      console.error(err);
      toast.error('Claim failed');
    }
  };

  return (
    <div className="app-root">
      <div className="top-decor">
        <div className="badge-hero"> 
          <div className="crown">🏆</div>
        </div>
      </div>

      <div className="container">
        <div className="left-panel">
          <UserSelector users={users} selected={selectedUserId} onChange={setSelectedUserId} />
          <div style={{height:12}} />
          <ClaimPanel user={users.find(u => u._id === selectedUserId)} onClaim={handleClaim} />
          <div style={{height:12}} />
          <AddUserForm onAdd={handleAddUser} />
        </div>

        <div className="right-panel">
          <Leaderboard data={leaderboard} />
          <HistoryTable data={history} />
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={2500} />
    </div>
  );
}
