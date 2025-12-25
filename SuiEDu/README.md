## HƯỚNG DẪN SETUP

## Cài dependencies:
# dùng pnpm nếu bạn dùng pnpm, hoặc npm
npm install
# hoặc pnpm install
## Chạy server proxy:
node server/index.js
# hoặc (nếu muốn song song) npm run server
## Chạy frontend dev:
npm run dev


# Mở app, vào Quản lý bài giảng → kéo-thả video hoặc chọn file → điền Tiêu đề → nhấn Lưu lên Chain. Frontend sẽ gửi file đến /api/upload-walrus (server proxy), server sẽ chuyển tiếp tới Walrus (dùng API key trong server/.env). Sau khi upload thành công, bạn sẽ thấy Blob ID và video xuất hiện trong Course Library.