import React, { useEffect, useState } from 'react';

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch('http://localhost:3000/user');
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      } else {
        console.error('Error fetching user data');
      }
    };

    fetchUsers();
  }, [users]); //isse bar bar page relod nahi krna hoga

  const handleEdit = (user) => {
    setEditingUser(user);
    setEmail(user.email);
    setPassword(user.password);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedUser = { ...editingUser, email, password };

    const response = await fetch(`http://localhost:3000/user/${editingUser.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedUser),
    });

    if (response.ok) {
      const updatedUsers = users.map(user => (user.id === editingUser.id ? updatedUser : user));
      setUsers(updatedUsers);
      setEditingUser(null);
      setEmail('');
      setPassword('');
    } else {
      console.error('Error updating user');
    }
  };

  const handleDelete = async (userId) => {
    const response = await fetch(`http://localhost:3000/user/${userId}`, { method: 'DELETE' });
    if (response.ok) {
      setUsers(users.filter(user => user.id !== userId));
    } else {
      console.error('Error deleting user');
    }
  };

  return (
    <div className="h-screen p-4 bg-gray-900">
      <h1 className="text-2xl font-bold mb-4 text-white">Admin</h1>
      <ul>
        <li className="mb-2 flex justify-between items-center">
          <span className="text-white font-bold w-1/2 text-left">Email</span>
          <span className="text-white font-bold -translate-x-[20%] w-1/2 text-left">Password</span>
        </li>
        {users.map(user => (
          <li key={user.id} className="mb-2 flex justify-between items-center">
            <span className="text-white w-1/2 text-left border-b-2 pb-4">{user.email}</span>
            <span className="text-white w-1/2 text-left border-b-2 pb-4">{user.password}</span>
            <div className="flex w-1/4 justify-end border-b-2 p-1">
              <button onClick={() => handleEdit(user)} className="bg-yellow-600 text-white p-1 rounded mr-2 hover:bg-yellow-500">Edit</button>
              <button onClick={() => handleDelete(user.id)} className="bg-red-700 text-white p-1 rounded hover:bg-red-600">Delete</button>
            </div>
          </li>
        ))}
      </ul>
      {editingUser && (
        <form onSubmit={handleUpdate} className="mt-4">
          <h2 className="text-xl font-bold text-white">Edit User</h2>
          <div className="mb-4">
            <label className="block text-gray-300" htmlFor="edit-email">Email</label>
            <input
              className="border border-gray-600 p-2 w-full rounded bg-gray-700 text-white"
              type="email"
              id="edit-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300" htmlFor="edit-password">Password</label>
            <input
              className="border border-gray-600 p-2 w-full rounded bg-gray-700 text-white"
              type="password"
              id="edit-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="bg-blue-600 text-white p-2 rounded w-full hover:bg-blue-700" type="submit">Update User</button>
        </form>
      )}
    </div>
  );
}

export default Admin;