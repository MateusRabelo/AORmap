import React, { useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../../../../src/firebase';

interface AuthProps {
  currentUser: any | null;
}

const Auth: React.FC<AuthProps> = ({ currentUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    try {
      if (isRegistering) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      setEmail('');
      setPassword('');
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error: any) {
      setError(error.message);
    }
  };

  if (currentUser) {
    return (
      <div className="p-4 bg-white rounded shadow-lg">
        <p className="mb-2">Logado como: {currentUser.email}</p>
        <button 
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Sair
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded shadow-lg">
      <h2 className="text-xl font-bold mb-4">
        {isRegistering ? 'Criar Conta' : 'Login'}
      </h2>
      
      {error && (
        <div className="mb-4 p-2 bg-red-100 text-red-800 rounded">
          {error}
        </div>
      )}
      
      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <label className="block mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block mb-1">Senha</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        
        <div className="flex flex-col gap-2">
          <button 
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            {isRegistering ? 'Registrar' : 'Entrar'}
          </button>
          
          <button 
            type="button"
            onClick={() => setIsRegistering(!isRegistering)}
            className="text-blue-500 underline"
          >
            {isRegistering ? 'Já tem conta? Faça login' : 'Novo? Crie uma conta'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Auth; 