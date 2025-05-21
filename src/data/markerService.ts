import { collection, addDoc, getDocs, query, where, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../../src/firebase';
import { ResourceMarker } from './types';

const COLLECTION_NAME = 'markers';

// Converter o objeto ResourceMarker para o formato do Firestore
const toFirestore = (marker: ResourceMarker) => {
  return {
    ...marker,
    addedOn: marker.addedOn.toISOString()
  };
};

// Converter o documento do Firestore para ResourceMarker
const fromFirestore = (doc: any): ResourceMarker => {
  const data = doc.data();
  return {
    ...data,
    id: doc.id,
    addedOn: new Date(data.addedOn)
  };
};

// Salvar um novo marcador
export const addMarker = async (marker: ResourceMarker): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), toFirestore(marker));
    return docRef.id;
  } catch (error) {
    console.error('Erro ao adicionar marcador:', error);
    throw error;
  }
};

// Obter todos os marcadores públicos
export const getPublicMarkers = async (): Promise<ResourceMarker[]> => {
  try {
    const q = query(collection(db, COLLECTION_NAME), where('public', '==', true));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(fromFirestore);
  } catch (error) {
    console.error('Erro ao obter marcadores públicos:', error);
    throw error;
  }
};

// Obter marcadores de um usuário específico
export const getUserMarkers = async (userId: string): Promise<ResourceMarker[]> => {
  try {
    const q = query(collection(db, COLLECTION_NAME), where('addedBy', '==', userId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(fromFirestore);
  } catch (error) {
    console.error('Erro ao obter marcadores do usuário:', error);
    throw error;
  }
};

// Remover um marcador
export const removeMarker = async (markerId: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, COLLECTION_NAME, markerId));
  } catch (error) {
    console.error('Erro ao remover marcador:', error);
    throw error;
  }
}; 