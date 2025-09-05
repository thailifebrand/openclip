document.addEventListener('DOMContentLoaded', () => {
    const videoPlayer = document.getElementById('video-player');
    const statusMessage = document.getElementById('status-message');
    let hasPlayedToEnd = false;

    // เนื่องจาก Google Drive ไม่ได้มี API มาตรฐานเหมือน YouTube หรือ Vimeo
    // เราจึงต้องใช้ localStorage เพื่อบันทึกสถานะการดูของผู้ใช้
    // และใช้ window.onbeforeunload เพื่อดักจับการปิดหน้าเว็บ

    const updateStatus = () => {
        if (hasPlayedToEnd) {
            statusMessage.textContent = 'เปิดครบ 50 วินาทีแล้ว 🎉';
            statusMessage.classList.add('complete');
            statusMessage.classList.remove('incomplete');
        } else {
            statusMessage.textContent = 'ยังเปิดไม่ครบ 50 วินาที 😢';
            statusMessage.classList.add('incomplete');
            statusMessage.classList.remove('complete');
        }
    };

    // จำลองการดูจบ
    // โดยปกติการดูวิดีโอจาก iframe Google Drive ไม่สามารถตรวจจับเหตุการณ์ 'ended' ได้โดยตรง
    // จึงต้องใช้วิธีการนี้เป็นตัวอย่าง
    // ในการใช้งานจริง อาจจะต้องใช้ความร่วมมือจาก backend เพื่อตรวจสอบเวลาการดู
    // หรือใช้วิธีอื่น ๆ ที่ซับซ้อนกว่านี้
    
    // ตั้งค่าเวลาที่จะถือว่าดูจบ (ในที่นี้คือ 50 วินาที)
    setTimeout(() => {
        hasPlayedToEnd = true;
        updateStatus();
    }, 50000); // สมมติว่าวิดีโอมีความยาว 50 วินาที และเมื่อเล่นครบแล้วจะอัปเดตสถานะ

    // ดักจับเหตุการณ์เมื่อผู้ใช้กำลังจะปิดหน้าเว็บ
    window.addEventListener('beforeunload', (event) => {
        if (!hasPlayedToEnd) {
            event.preventDefault();
            event.returnValue = ''; // ข้อความจะถูกกำหนดโดยเบราว์เซอร์
        }
    });

    // เริ่มต้นการแสดงสถานะ
    updateStatus();

});