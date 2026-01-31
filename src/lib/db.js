import { collection, addDoc, updateDoc, deleteDoc, doc, getDoc, serverTimestamp, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from './firebase';

const resumesCol = (uid) => collection(db, 'users', uid, 'resumes');
const resumeDoc = (uid, id) => doc(db, 'users', uid, 'resumes', id);

export async function createResume(uid, data) {
  const now = serverTimestamp();
  const docRef = await addDoc(resumesCol(uid), { ...data, createdAt: now, updatedAt: now });
  return docRef.id;
}

export async function updateResume(uid, id, data) {
  const ref = resumeDoc(uid, id);
  await updateDoc(ref, { ...data, updatedAt: serverTimestamp() });
}

export async function deleteResume(uid, id) {
  const ref = resumeDoc(uid, id);
  await deleteDoc(ref);
}

export async function getResume(uid, id) {
  const snap = await getDoc(resumeDoc(uid, id));
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}

export function listenResumes(uid, cb) {
  const q = query(resumesCol(uid), orderBy('updatedAt', 'desc'));
  const unsub = onSnapshot(q, (snapshot) => {
    const items = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
    cb(items);
  });
  return unsub;
}
