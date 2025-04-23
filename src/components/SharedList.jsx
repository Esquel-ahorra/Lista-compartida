import { useState, useEffect, useCallback, memo } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase/config';
import { doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField
} from '@mui/material';

const SharedList = memo(function SharedList() {
  const { listId } = useParams();
  const [list, setList] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [newItem, setNewItem] = useState('');

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

  const handleAddItem = useCallback(async () => {
    if (!newItem.trim()) return;

    try {
      const listRef = doc(db, 'lists', listId);
      await updateDoc(listRef, {
        items: arrayUnion(newItem)
      });
      
      setList(prevList => ({
        ...prevList,
        items: [...(prevList.items || []), newItem]
      }));
      
      setNewItem('');
      setOpenAddDialog(false);
    } catch (error) {
      setError('Error al agregar el producto: ' + error.message);
    }
  }, [newItem, listId]);

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4" component="h1">
          Lista Compartida: {list?.name}
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => setOpenAddDialog(true)}
        >
          Agregar Producto
        </Button>
      </Box>
      
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

      <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)}>
        <DialogTitle>Agregar Producto</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Nombre del producto"
            type="text"
            fullWidth
            variant="outlined"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddItem()}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddDialog(false)}>Cancelar</Button>
          <Button onClick={handleAddItem} variant="contained" color="primary">
            Agregar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
});

export default SharedList;