// File: src/services/certificateService.ts
// Đọc URL từ biến môi trường
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
// 1. Hàm Mint trực tiếp (Dùng cho user)
// Sử dụng type 'any' để tránh lỗi TypeScript không cần thiết lúc này
export async function mintCertificateApi(recipientAddress, imageUrl, courseName, studentName) {
    try {
        const certificateId = `CERT-${Date.now()}`;
        const response = await fetch(`${BACKEND_URL}/api/certificates/issue`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                studentAddress: recipientAddress,
                certificateId: certificateId,
                title: `Certificate: ${courseName}`,
                description: `Chứng chỉ hoàn thành khóa học cấp cho ${studentName}`,
                imageUrl: imageUrl
            }),
        });
        // Kiểm tra response status trước khi parse JSON
        let data;
        try {
            data = await response.json();
        }
        catch (parseError) {
            throw new Error(`Lỗi khi nhận phản hồi từ server: ${response.status} ${response.statusText}`);
        }
        if (!response.ok) {
            throw new Error(data.message || `Lỗi từ server: ${response.status} ${response.statusText}`);
        }
        return data.data;
    }
    catch (error) {
        console.error("Lỗi gọi API mint:", error);
        // Cải thiện thông báo lỗi cho người dùng
        if (error.name === 'TypeError' && (error.message.includes('fetch') || error.message.includes('Failed to fetch'))) {
            throw new Error(`Không thể kết nối đến server backend tại ${BACKEND_URL}. Vui lòng đảm bảo server đang chạy (chạy lệnh: cd backend && npm run dev)`);
        }
        else if (error.message) {
            throw error;
        }
        else {
            throw new Error(`Lỗi kết nối: ${error.message || 'Failed to fetch'}`);
        }
    }
}
// 2. Hàm User gửi yêu cầu
export async function submitCertificateRequest(data) {
    try {
        const response = await fetch(`${BACKEND_URL}/api/certificates/request`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        let result;
        try {
            result = await response.json();
        }
        catch (parseError) {
            throw new Error(`Lỗi khi nhận phản hồi từ server: ${response.status} ${response.statusText}`);
        }
        if (!result.success)
            throw new Error(result.message);
        return result.data;
    }
    catch (error) {
        console.error("Lỗi gửi yêu cầu:", error);
        if (error.name === 'TypeError' && (error.message.includes('fetch') || error.message.includes('Failed to fetch'))) {
            throw new Error(`Không thể kết nối đến server backend tại ${BACKEND_URL}. Vui lòng đảm bảo server đang chạy (chạy lệnh: cd backend && npm run dev)`);
        }
        else if (error.message) {
            throw error;
        }
        else {
            throw new Error(`Lỗi kết nối: ${error.message || 'Failed to fetch'}`);
        }
    }
}
// 3. Hàm Admin lấy danh sách
export async function getAdminRequests() {
    try {
        const response = await fetch(`${BACKEND_URL}/api/certificates/requests`);
        let result;
        try {
            result = await response.json();
        }
        catch (parseError) {
            console.error("Lỗi parse response:", parseError);
            return [];
        }
        return result.data || [];
    }
    catch (error) {
        console.error("Lỗi lấy danh sách Admin:", error);
        if (error.name === 'TypeError' && (error.message.includes('fetch') || error.message.includes('Failed to fetch'))) {
            console.error(`Backend server không chạy tại ${BACKEND_URL}`);
        }
        return [];
    }
}
// 4. Hàm Admin duyệt (SỬA QUAN TRỌNG: Dùng 'any' cho data)
export async function approveCertificateApi(data) {
    try {
        // Kiểm tra dữ liệu đầu vào để tránh crash
        if (!data || !data.wallet) {
            throw new Error("Dữ liệu không hợp lệ: Thiếu địa chỉ ví");
        }
        const response = await fetch(`${BACKEND_URL}/api/certificates/issue`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                studentAddress: data.wallet,
                certificateId: data.requestId,
                title: `Certificate: ${data.courseName}`,
                description: `Chứng nhận hoàn thành khóa học cho học viên ${data.studentName}`,
                imageUrl: data.certificatePreview || "https://assets.suiedu.com/certificate-placeholder.png"
            }),
        });
        let result;
        try {
            result = await response.json();
        }
        catch (parseError) {
            throw new Error(`Lỗi khi nhận phản hồi từ server: ${response.status} ${response.statusText}`);
        }
        if (!result.success) {
            throw new Error(result.message || "Lỗi khi cấp chứng chỉ");
        }
        return result.data;
    }
    catch (error) {
        console.error("Lỗi duyệt yêu cầu:", error);
        if (error.name === 'TypeError' && (error.message.includes('fetch') || error.message.includes('Failed to fetch'))) {
            throw new Error(`Không thể kết nối đến server backend tại ${BACKEND_URL}. Vui lòng đảm bảo server đang chạy (chạy lệnh: cd backend && npm run dev)`);
        }
        else if (error.message) {
            throw error;
        }
        else {
            throw new Error(`Lỗi kết nối: ${error.message || 'Failed to fetch'}`);
        }
    }
}
