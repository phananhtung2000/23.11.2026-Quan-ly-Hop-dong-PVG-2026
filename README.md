# Quản lý hợp đồng PVG 2026 - PV GAS LPG — bản PWA

Gói này biến file HTML đơn lẻ của phần mềm **Quản lý hợp đồng PVG 2026** thành một PWA cài đặt được trên Android (Chrome) và Windows 11 (Edge/Chrome), deploy tĩnh lên GitHub Pages. Toàn bộ đường dẫn trong gói là tương đối — không phụ thuộc tên repo hay tài khoản.

> Lưu ý: đây là một app riêng, khác gói PWA "Quản lý hợp đồng Chi nhánh 2026" (khác `id`, khác kho dữ liệu `pvg_hd_2026`). Hai app cài song song không đụng nhau.

## Các file trong gói

| File | Vai trò |
|---|---|
| `index.html` | Toàn bộ phần mềm (nguyên bản + 1 đoạn script đăng ký PWA chỉ chạy khi mở qua http/https) |
| `manifest.json` | Khai báo tên app, màu, icon để trình duyệt cho cài đặt |
| `sw.js` | Service worker: cache app shell để chạy offline. Chỉ cache file tĩnh, không đụng vào dữ liệu nghiệp vụ (IndexedDB `pvg_hd_2026` và tuỳ chọn giao diện ở localStorage không đi qua service worker) |
| `icon-192.png`, `icon-512.png`, `icon-512-maskable.png` | Icon app, dựng từ logo PV GAS LPG thật nhúng trong file gốc |

## Cách deploy lên GitHub Pages

1. Tạo một repo mới trên GitHub (ví dụ `quan-ly-hop-dong-pvg`).
2. Đưa **cả 6 file trên lên thư mục gốc (root) của repo** — không lồng trong thư mục con.
3. Vào **Settings → Pages**: chọn *Deploy from a branch*, branch `main`, thư mục `/ (root)`, rồi Save.
4. Chờ 1–2 phút, app chạy tại `https://<username>.github.io/<ten-repo>/`.

## Cài đặt

- **Android (Chrome):** mở URL trên → menu ⋮ → *Cài đặt ứng dụng* / *Thêm vào màn hình chính*. App mở full-screen, chạy offline sau lần mở đầu.
- **Windows 11 (Edge/Chrome):** mở URL trên → bấm biểu tượng cài đặt ở thanh địa chỉ (hoặc menu → *Cài đặt ứng dụng này*). App chạy trong cửa sổ riêng.
- **Mở bằng file://:** vẫn double-click `index.html` chạy như file gốc, đầy đủ dữ liệu — khi mở bằng file, phần PWA tự bỏ qua, không phát sinh lỗi.

## Kiểm tra nhanh sau khi deploy

- Mở URL, đợi vài giây rồi bật chế độ máy bay/tắt mạng và tải lại trang: app vẫn mở và đủ 1.818 bản ghi (1.434 đại lý, 86 gas rời, 34 trạm đã ký, 214 trạm chưa ký, 50 công ty).
- Chrome DevTools → Application: Manifest hiện đúng tên "Quản lý hợp đồng PVG 2026 - PV GAS LPG", theme `#083d20`; Service Workers ở trạng thái *activated*.
- (Tuỳ chọn) Lighthouse → mục PWA: đạt "Installable".

## Nếu trình duyệt báo "đã cài đặt rồi" nhưng không thấy app

1. Gỡ bản cài cũ trong danh sách ứng dụng của máy/điện thoại.
2. Xoá dữ liệu trang (DevTools → Application → Clear storage) — **chỉ làm khi chắc chắn dữ liệu hợp đồng đã có bản sao lưu/xuất file**, vì dữ liệu nghiệp vụ nằm trong trình duyệt.
3. Tải lại trang và cài lại.

## Quy tắc cập nhật về sau

- Khi có bản phần mềm mới: thay `index.html` và **tăng số phiên bản cache trong `sw.js`** (ví dụ `quan-ly-hop-dong-pvg-cache-v1` → `-v2`) rồi đẩy lại cả hai file. Người dùng đã cài sẽ tự nhận bản mới ở lần mở sau.
- **Không đổi** các giá trị `name`, `id`, `start_url`, `scope` trong `manifest.json` và không đổi tên 3 file icon — đổi các giá trị này khiến máy đã cài coi như app khác và mất dữ liệu đã lưu trong trình duyệt.
- Service worker chỉ xoá cache cũ có cùng tiền tố `quan-ly-hop-dong-pvg-cache-`, không ảnh hưởng app khác trên cùng domain.
