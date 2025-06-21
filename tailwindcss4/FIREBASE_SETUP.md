# Hướng dẫn cấu hình Firebase

## ✅ Firebase đã được cấu hình thành công!

Dự án này đã được cấu hình với Firebase project: **tydy-12c68**

## Cấu hình hiện tại

File `src/firebase.js` đã được cấu hình với thông tin Firebase thực tế:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyAryZS4G2SxCARzuW3x9zwR_e8LaaYXaUw",
  authDomain: "tydy-12c68.firebaseapp.com",
  databaseURL: "https://tydy-12c68-default-rtdb.firebaseio.com",
  projectId: "tydy-12c68",
  storageBucket: "tydy-12c68.appspot.com",
  messagingSenderId: "25597445730",
  appId: "1:25597445730:web:d34a868909bc17eb23f33b"
};
```

## Bước tiếp theo: Cấu hình Firestore Database

1. Truy cập [Firebase Console](https://console.firebase.google.com/)
2. Chọn project **tydy-12c68**
3. Trong sidebar, chọn "Firestore Database"
4. Chọn "Create database"
5. Chọn chế độ bảo mật:
   - **Test mode** (cho development)
   - **Production mode** (cho production)
6. Chọn vị trí database (nên chọn `asia-southeast1` cho Việt Nam)

## Cấu hình quy tắc bảo mật Firestore

Trong Firestore Database > Rules, cập nhật quy tắc:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Cho phép đọc/ghi document downloads/count
    match /downloads/{document} {
      allow read, write: if true;
    }
  }
}
```

## Cấu trúc dữ liệu

Dữ liệu sẽ được lưu trong Firestore với cấu trúc:
- Collection: `downloads`
- Document: `count`
- Field: `downloadCount` (number)

## Tính năng đã triển khai

1. **Hàm getCount()**: Lấy số lần bấm nút "tải ngay" từ Firebase
2. **Hàm incrementCount()**: Tăng số lần bấm nút "tải ngay" lên 1
3. **Hiển thị real-time**: Số lần tải được hiển thị ngay dưới nút
4. **Loading state**: Hiển thị trạng thái đang tải khi bấm nút
5. **Success notification**: Thông báo thành công khi tải xong
6. **Error handling**: Xử lý lỗi khi không thể kết nối Firebase
7. **Count loading**: Hiển thị "Đang tải..." khi lấy số liệu

## Cách sử dụng

1. Chạy dự án: `npm run dev`
2. Mở trình duyệt và truy cập ứng dụng
3. Bấm nút "Tải ứng dụng" để test chức năng
4. Số lần tải sẽ được cập nhật real-time
5. Kiểm tra Firebase Console để xem dữ liệu

## Lưu ý

- Đảm bảo Firebase đã được cài đặt: `npm install firebase`
- Kiểm tra kết nối internet để Firebase hoạt động
- Nếu gặp lỗi CORS, hãy kiểm tra cấu hình domain trong Firebase Console
- Đảm bảo Firestore Database đã được tạo và cấu hình đúng quy tắc bảo mật 