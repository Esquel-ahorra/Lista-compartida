import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography, Container, Alert } from '@mui/material';
import { signInWithGoogle } from '../auth/googleAuth';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError('');
      setLoading(true);
      await login(email, password);
      navigate('/');
    } catch (error) {
      setError('Error al iniciar sesión: ' + error.message);
    }
    setLoading(false);
  }

  const handleGoogleSignIn = async () => {
      try {
          await signInWithGoogle();
          // Redirigir al usuario después del inicio de sesión exitoso
          navigate('/dashboard');
      } catch (error) {
          console.error("Error en el inicio de sesión con Google:", error);
          // Manejar el error apropiadamente
      }
  };

  // En tu JSX, agrega el botón de Google:
  <Button
      variant="contained"
      color="primary"
      onClick={handleGoogleSignIn}
      startIcon={<GoogleIcon />}
  >
      Iniciar sesión con Google
  </Button>

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Iniciar Sesión
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Correo Electrónico"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            Iniciar Sesión
          </Button>
          <Button
            fullWidth
            variant="text"
            onClick={() => navigate('/signup')}
          >
            ¿No tienes una cuenta? Regístrate
          </Button>
        </Box>
      </Box>
    </Container>
  );
}