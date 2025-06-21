import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, setDoc, increment } from 'firebase/firestore';

// Cấu hình Firebase thực tế
const firebaseConfig = {
  apiKey: "AIzaSyAryZS4G2SxCARzuW3x9zwR_e8LaaYXaUw",
  authDomain: "tydy-12c68.firebaseapp.com",
  databaseURL: "https://tydy-12c68-default-rtdb.firebaseio.com",
  projectId: "tydy-12c68",
  storageBucket: "tydy-12c68.appspot.com",
  messagingSenderId: "25597445730",
  appId: "1:25597445730:web:d34a868909bc17eb23f33b"
};

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);

// Khởi tạo Firestore
export const db = getFirestore(app);

// Hàm để lấy số lần bấm nút "tải ngay"
export const getCount = async () => {
  try {
    const countDoc = doc(db, 'downloads', 'count');
    const countSnapshot = await getDoc(countDoc);
    
    if (countSnapshot.exists()) {
      return countSnapshot.data().downloadCount || 0;
    } else {
      // Nếu document chưa tồn tại, tạo mới với giá trị 0
      await setDoc(countDoc, { downloadCount: 0 });
      return 0;
    }
  } catch (error) {
    console.error('Lỗi khi lấy số lần tải:', error);
    return 0;
  }
};

// Hàm để tăng số lần bấm nút "tải ngay"
export const incrementCount = async () => {
  try {
    const countDoc = doc(db, 'downloads', 'count');
    await setDoc(countDoc, { downloadCount: increment(1) }, { merge: true });
    console.log('Đã tăng số lần tải thành công');
  } catch (error) {
    console.error('Lỗi khi tăng số lần tải:', error);
  }
}; 