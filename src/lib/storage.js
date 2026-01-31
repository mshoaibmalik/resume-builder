import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from './firebase';

export async function uploadProfileImage(uid, resumeId, file) {
  const path = `profileImages/${uid}/${resumeId || 'temp'}-${file.name}`;
  const storageRef = ref(storage, path);
  const snap = await uploadBytes(storageRef, file);
  return await getDownloadURL(snap.ref);
}
