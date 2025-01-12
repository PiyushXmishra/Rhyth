import { NextResponse } from 'next/server';

export default async function handler(req, res) {
    try {
      const response = await fetch('https://rhyth.onrender.com'); // Replace with your backend URL
      const data = await response.json();
  
      console.log('Ping Response:', data);
      res.status(200).json({ message: 'Ping successful', data });
    } catch (error) {
      console.error('Ping Error:', error.message);
      res.status(500).json({ message: 'Ping failed', error: error.message });
    }
  }