// Register page
import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [securityQuestion, setSecurityQuestion] = useState('');
  const [securityAnswer, setSecurityAnswer] = useState('');
  const [error, setError] = useState('');
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await register(username, email, password, securityQuestion, securityAnswer);
      navigate('/home');
    } catch (err) {
      setError(err.response?.data?.detail || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-8">
      <div className="bg-[#0f2a44] p-8 rounded-lg shadow-md w-full max-w-md border border-[#1f3b5c]">
        <h1 className="text-3xl font-bold text-center mb-6 text-white">TechTalk</h1>
        <h2 className="text-xl font-semibold mb-4 text-white">Register</h2>
        
        {error && <div className="bg-red-900/50 text-red-200 p-3 rounded mb-4 border border-red-700">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-[#c9d1d9] mb-2">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-[#0b1c2d] text-white border border-[#1f3b5c] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1f6feb]"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-[#c9d1d9] mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#0b1c2d] text-white border border-[#1f3b5c] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1f6feb]"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-[#c9d1d9] mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#0b1c2d] text-white border border-[#1f3b5c] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1f6feb]"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-[#c9d1d9] mb-2">Security Question</label>
            <input
              type="text"
              value={securityQuestion}
              onChange={(e) => setSecurityQuestion(e.target.value)}
              placeholder="e.g., What's your first pet's name?"
              className="w-full bg-[#0b1c2d] text-white border border-[#1f3b5c] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1f6feb] placeholder:text-[#8b949e]"
              required
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-[#c9d1d9] mb-2">Security Answer</label>
            <input
              type="text"
              value={securityAnswer}
              onChange={(e) => setSecurityAnswer(e.target.value)}
              className="w-full bg-[#0b1c2d] text-white border border-[#1f3b5c] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1f6feb]"
              required
            />
          </div>
          
          <button type="submit" className="w-full bg-[#1f6feb] hover:bg-[#388bfd] text-white py-2 rounded font-medium transition">
            Register
          </button>
        </form>
        
        <p className="mt-4 text-center text-[#c9d1d9]">
          Already have an account? <Link to="/login" className="text-[#1f6feb] hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
