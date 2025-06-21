import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get, set, increment } from 'firebase/database';

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

// Khởi tạo Realtime Database
export const database = getDatabase(app);

// Hàm để lấy số lần bấm nút "tải ngay" từ Realtime Database
export const getCount = async () => {
  try {
    const countRef = ref(database, 'downloads/count');
    const snapshot = await get(countRef);
    
    if (snapshot.exists()) {
      return snapshot.val() || 0;
    } else {
      // Nếu dữ liệu chưa tồn tại, tạo mới với giá trị 0
      await set(countRef, 0);
      return 0;
    }
  } catch (error) {
    console.error('Lỗi khi lấy số lần tải:', error);
    return 0;
  }
};

// Hàm để tăng số lần bấm nút "tải ngay" trong Realtime Database
export const incrementCount = async () => {
  try {
    const countRef = ref(database, 'downloads/count');
    await set(countRef, increment(1));
    console.log('Đã tăng số lần tải thành công');
  } catch (error) {
    console.error('Lỗi khi tăng số lần tải:', error);
  }
}; 