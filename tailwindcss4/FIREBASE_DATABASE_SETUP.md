# Hướng dẫn Setup Firebase Database

## 🔍 Phân tích hiện tại

**Code đang sử dụng:** Firestore Database (NoSQL document database)

## 📋 Setup Firebase Console

### Bước 1: Truy cập Firebase Console
1. Mở https://console.firebase.google.com/
2. Đăng nhập với Google account
3. Chọn project: **tydy-12c68**

### Bước 2: Chọn loại Database

Bạn có 2 lựa chọn:

## 🗄️ Option 1: Firestore Database (Đang sử dụng)

### Setup Firestore:
1. **Trong sidebar, chọn "Firestore Database"**
2. **Chọn "Create database"**
3. **Chọn chế độ bảo mật:**
   - ✅ **Test mode** (cho development - cho phép đọc/ghi)
   - ⚠️ **Production mode** (cho production - cần cấu hình rules)
4. **Chọn vị trí database:**
   - ✅ `asia-southeast1` (Singapore - gần Việt Nam)
   - ✅ `us-central1` (Mỹ - mặc định)

### Cấu hình Rules Firestore:
Trong Firestore Database > Rules, cập nhật:

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

### Cấu trúc dữ liệu Firestore:
```
Collection: downloads
  └── Document: count
      └── Field: downloadCount (number)
```

---

## ⚡ Option 2: Realtime Database

### Setup Realtime Database:
1. **Trong sidebar, chọn "Realtime Database"**
2. **Chọn "Create database"**
3. **Chọn vị trí database:**
   - ✅ `asia-southeast1` (Singapore)
   - ✅ `us-central1` (Mỹ)
4. **Chọn chế độ bảo mật:**
   - ✅ **Test mode** (cho development)
   - ⚠️ **Locked mode** (cho production)

### Cấu hình Rules Realtime Database:
Trong Realtime Database > Rules, cập nhật:

```json
{
  "rules": {
    "downloads": {
      "count": {
        ".read": true,
        ".write": true
      }
    }
  }
}
```

### Cấu trúc dữ liệu Realtime Database:
```json
{
  "downloads": {
    "count": 0
  }
}
```

---

## 🔄 Chuyển đổi giữa 2 loại Database

### Để sử dụng Realtime Database:
1. Thay đổi import trong `src/App.jsx`:
```javascript
// Thay đổi từ:
import { getCount, incrementCount } from './firebase';

// Thành:
import { getCount, incrementCount } from './firebase-realtime';
```

2. Setup Realtime Database trong Firebase Console
3. Cấu hình rules như hướng dẫn trên

### Để sử dụng Firestore Database:
1. Giữ nguyên import trong `src/App.jsx`:
```javascript
import { getCount, incrementCount } from './firebase';
```

2. Setup Firestore Database trong Firebase Console
3. Cấu hình rules như hướng dẫn trên

---

## 📊 So sánh 2 loại Database

| Tính năng | Firestore | Realtime Database |
|-----------|-----------|-------------------|
| **Cấu trúc** | Document-based | JSON tree |
| **Query** | Mạnh mẽ | Đơn giản |
| **Real-time** | ✅ | ✅ |
| **Offline** | ✅ | ✅ |
| **Scaling** | Tự động | Tự động |
| **Pricing** | Pay per use | Pay per use |
| **Phù hợp** | Ứng dụng phức tạp | Ứng dụng đơn giản |

---

## 🎯 Khuyến nghị

**Cho dự án này (đếm số lần tải):**
- ✅ **Realtime Database** - Đơn giản, phù hợp cho counter
- ✅ **Firestore** - Linh hoạt hơn cho tương lai

**Lý do chọn Realtime Database:**
- Đơn giản cho việc đếm số
- Real-time sync tốt
- Ít phức tạp hơn

---

## 🧪 Test sau khi setup

1. **Chạy dự án:**
```bash
npm run dev
```

2. **Mở trình duyệt và test:**
   - Bấm nút "Tải ứng dụng"
   - Kiểm tra số lần tải được cập nhật
   - Xem dữ liệu trong Firebase Console

3. **Kiểm tra Console:**
   - Mở Developer Tools
   - Xem log khi bấm nút
   - Kiểm tra lỗi nếu có

---

## 🚨 Lưu ý quan trọng

- **Test mode**: Chỉ dùng cho development
- **Production**: Cần cấu hình rules bảo mật
- **Location**: Chọn gần với người dùng để giảm latency
- **Backup**: Dữ liệu quan trọng nên có backup 