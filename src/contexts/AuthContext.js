// Contexto de Autenticação
// Fornece `isAuthenticated`, `user`, `login` e `logout` para toda a aplicação.
// Este arquivo implementa um provedor simples usado pelo `AuthProvider`.
import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const login = (email, senha) => {
    // Login temporário - aceita qualquer credencial
    setUser({ email });
    setIsAuthenticated(true);
  };

  // Atualiza campos do perfil do usuário localmente
  const updateProfile = (data) => {
    setUser((prev) => ({ ...(prev || {}), ...data }));
  };

  // Altera a senha localmente (placeholder)
  // Retorna true se a nova senha atender aos requisitos básicos
  const changePassword = (currentPassword, newPassword) => {
    if (typeof newPassword === 'string' && newPassword.length >= 6) {
      // Em implementação real, chamar API para atualizar a senha
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, updateProfile, changePassword }}>
      {children}
    </AuthContext.Provider>
  );
}
