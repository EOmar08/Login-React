
const AuthResponse = {
    body: {
      user: { ...User }, 
      accessToken: '',
      refreshToken: ''
    }
};
  
const AuthResponseError = {
    body: {
      error: ''
    }
};


const User = {
    _id: '',
    name: '',
    username: ''
};
  
  // Exportamos los objetos si es necesario en otros archivos
export { AuthResponse, AuthResponseError, User }