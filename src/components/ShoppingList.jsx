import { useState, useEffect, useCallback, memo } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase/config';
import { collection, addDoc, query, where, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import {
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  TextField,
  Button,
  Typography,
  Checkbox,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Snackbar
} from '@mui/material';
import { Delete, Share, Add, Edit } from '@mui/icons-material';

const ShoppingList = memo(function ShoppingList() {
  const [lists, setLists] = useState([]);
  const [newItemName, setNewItemName] = useState('');
  const [selectedList, setSelectedList] = useState(null);
  const [shareUrl, setShareUrl] = useState('');
  const [openShareDialog, setOpenShareDialog] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) {
      loadLists();
    }
  }, [currentUser]);

  const loadLists = useCallback(async () => {
    try {
      const q = query(collection(db, 'lists'), where('userId', '==', currentUser.uid));
      const querySnapshot = await getDocs(q);
      const loadedLists = [];
      querySnapshot.forEach((doc) => {
        loadedLists.push({ id: doc.id, ...doc.data() });
      });
      setLists(loadedLists);
    } catch (error) {
      console.error('Error al cargar las listas:', error);
    }
  }

  const handleAddItem = useCallback(async () => {
    if (!newItemName.trim()) return;

    try {
      const newList = {
        name: newItemName,
        items: [],
        userId: currentUser.uid,
        createdAt: new Date().toISOString(),
        shared: false
      };

      const docRef = await addDoc(collection(db, 'lists'), newList);
      setLists([...lists, { id: docRef.id, ...newList }]);
      setNewItemName('');
    } catch (error) {
      console.error('Error al añadir item:', error);
    }
  }

  const handleDeleteList = useCallback(async (listId) => {
    try {
      await deleteDoc(doc(db, 'lists', listId));
      setLists(lists.filter(list => list.id !== listId));
    } catch (error) {
      console.error('Error al eliminar la lista:', error);
    }
  }

  const handleShare = useCallback((list) => {
    setSelectedList(list);
    const shareLink = `${window.location.origin}/shared/${list.id}`;
    setShareUrl(shareLink);
    setOpenShareDialog(true);
  }

  const handleCopyLink = useCallback(() => {
    navigator.clipboard.writeText(shareUrl);
    setOpenShareDialog(false);
    setSnackbarOpen(true);
  }

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', p: 2 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Mis Listas de Compras
      </Typography>

      <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Nueva lista de compras"
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
        />
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleAddItem}
        >
          Añadir
        </Button>
      </Box>

      <List>
        {lists.map((list) => (
          <ListItem
            key={list.id}
            sx={{ bgcolor: 'background.paper', mb: 1, borderRadius: 1 }}
          >
            <ListItemText primary={list.name} secondary={new Date(list.createdAt).toLocaleDateString()} />
            <ListItemSecondaryAction>
              <IconButton edge="end" onClick={() => handleShare(list)}>
                <Share />
              </IconButton>
              <IconButton edge="end" onClick={() => handleDeleteList(list.id)}>
                <Delete />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>

      <Dialog open={openShareDialog} onClose={() => setOpenShareDialog(false)}>
        <DialogTitle>Compartir Lista</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            value={shareUrl}
            InputProps={{ readOnly: true }}
            variant="outlined"
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenShareDialog(false)}>Cancelar</Button>
          <Button onClick={handleCopyLink} variant="contained">
            Copiar Enlace
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message="Enlace copiado al portapapeles"
      />
    </Box>
  );
});

export default ShoppingList;