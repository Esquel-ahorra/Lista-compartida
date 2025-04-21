import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase/config';
import { doc, getDoc } from 'firebase/firestore';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Alert
} from '@mui/material';

export default function SharedList() {
  const { listId } = useParams();
  const [list, setList] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchList() {
      try {
        const listRef = doc(db, 'lists', listId);
        const listSnap = await getDoc(listRef);

        if (listSnap.exists()) {
          setList({ id: listSnap.id, ...listSnap.data() });
        } else {
          setError('La lista no existe');
        }
      } catch (error) {
        setError('Error al cargar la lista: ' + error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchList();
  }, [listId]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ maxWidth: 600, mx: 'auto', p: 2 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', p: 2 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Lista Compartida: {list?.name}
      </Typography>
      
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        Creada el {new Date(list?.createdAt).toLocaleDateString()}
      </Typography>

      <List>
        {list?.items?.map((item, index) => (
          <ListItem key={index} sx={{ bgcolor: 'background.paper', mb: 1, borderRadius: 1 }}>
            <ListItemText primary={item} />
          </ListItem>
        )) || (
          <Typography variant="body1" color="text.secondary">
            Esta lista está vacía
          </Typography>
        )}
      </List>
    </Box>
  );
}