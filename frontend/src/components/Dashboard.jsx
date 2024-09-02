import React, { useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode";
import axios from 'axios';

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            setError("You are not logged in.");
            return;
        }

        try {
            const decodedToken = jwtDecode(token);
            const userId = decodedToken.id;

            const fetchData = async () => {
                try {
                    const response = await axios.post(`http://localhost:8000/user/${userId}`);
                    setUser(response.data.user);
                } catch (err) {
                    setError("Failed to fetch data.");
                }
            };

            fetchData();
        } catch (err) {
            setError("Failed to decode token.");
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/';
    };

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-200">
                <p className="text-red-500 text-lg font-semibold">{error}</p>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-200">
                <p className="text-gray-600 text-lg font-semibold">Loading...</p>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-600 to-gray-800">
            <div className="bg-gray-700 shadow-xl rounded-3xl p-10 max-w-lg w-full transform hover:scale-105 transition-transform duration-300">
                <h1 className="text-4xl font-extrabold text-gray-200 mb-6 text-center">Welcome, {user.userName}</h1>
                <div className="flex justify-center mb-6">
                    {user.profilePicture && (
                        <img src={user.profilePicture} alt="Profile" className="h-32 w-32 rounded-full border-4 border-gray-500 shadow-lg" />
                    )}
                </div>
                <p className="text-gray-300 text-lg text-center mb-8">Email: {user.email}</p>
                <button
                    onClick={handleLogout}
                    className="w-full py-3 bg-gray-500 text-white text-lg font-semibold rounded-xl hover:bg-gray-600 focus:outline-none focus:ring-4 focus:ring-gray-400 transition duration-300"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Dashboard;
