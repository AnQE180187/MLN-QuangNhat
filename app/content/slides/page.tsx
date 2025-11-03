'use client';

import { useState } from 'react';
import { FullSlideSection } from '@/components/FullSlideSection';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Coins, Star, Users, Factory, Handshake, Globe, Scale, Zap, BrainCircuit, Landmark } from 'lucide-react';

const sections = [
  { id: 's1', title: 'Khái niệm & Vai trò' },
  { id: 's2', title: 'Các loại lợi ích' },
  { id: 's3', title: 'Các quan hệ cơ bản' },
  { id: 's4', title: 'Mâu thuẫn & Thống nhất' },
  { id: 's5', title: 'Nhân tố ảnh hưởng' },
  { id: 's6', title: 'Phương thức thực hiện' },
  { id: 's7', title: 'Quan điểm Đảng & Nhà nước' },
  { id: 's8', title: 'Liên hệ thực tiễn' },
  { id: 's9', title: 'Kết luận & Giải pháp' },
];

export default function SlidesPage() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative snap-y snap-mandatory h-[calc(100vh-4rem)] w-full overflow-y-scroll bg-slate-50">
      {/* Fixed header for this page */}
      

      {/* Slide 1 */}
      <FullSlideSection id="s1" className="bg-gradient-to-b from-white to-slate-50">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-montserrat font-bold text-slate-900 mb-4">Lợi ích kinh tế là động lực của phát triển</h2>
            <p className="text-lg text-slate-600 mb-4">Lợi ích là cái chủ thể nhận được từ hoạt động kinh tế – xã hội; vừa vật chất vừa tinh thần, là động lực trực tiếp của sáng tạo và năng suất.</p>
            <ul className="list-disc pl-6 text-slate-700 space-y-2 mb-6">
              <li>Gắn với nhu cầu, mục tiêu và động cơ của mỗi chủ thể</li>
              <li>Chi phối hành vi lựa chọn, phân bổ nguồn lực, hợp tác và cạnh tranh</li>
              <li>Phát huy tích cực khi được định hướng và điều tiết phù hợp</li>
            </ul>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-xl border p-4 bg-white">
                <div className="flex items-center gap-2 mb-1 text-slate-800"><Coins className="w-5 h-5 text-orange-500" /><span className="font-semibold">Lợi ích vật chất</span></div>
                <div className="text-slate-600 text-sm">Tiền lương, lợi nhuận, thu nhập, tài sản, cổ tức...</div>
              </div>
              <div className="rounded-xl border p-4 bg-white">
                <div className="flex items-center gap-2 mb-1 text-slate-800"><Star className="w-5 h-5 text-yellow-500" /><span className="font-semibold">Lợi ích tinh thần</span></div>
                <div className="text-slate-600 text-sm">Danh tiếng, vị thế, sự tôn trọng, cơ hội phát triển, ghi nhận</div>
              </div>
            </div>
          </div>
          <div className="relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40" alt="Biểu đồ tăng trưởng" className="rounded-2xl shadow border" />
            <div className="text-xs text-slate-500 mt-2">Minh họa: tăng trưởng là kết quả của động lực lợi ích</div>
          </div>
        </div>
      </FullSlideSection>

      {/* Slide 2 */}
      <FullSlideSection id="s2" className="bg-white">
        <div className="text-center">
          <h2 className="text-4xl font-montserrat font-bold text-slate-900 mb-2">Các loại lợi ích và mối quan hệ giữa chúng</h2>
          <p className="text-slate-600 mb-6">Cá nhân – Tập thể – Xã hội vừa thống nhất (cùng phụ thuộc phát triển) vừa có mâu thuẫn khi lợi ích xung đột.</p>
          <div className="relative w-full max-w-xl h-80 mx-auto mb-6">
            <div className="absolute rounded-full bg-blue-200/60 w-60 h-60 top-0 left-16 flex items-center justify-center font-semibold text-blue-800">Cá nhân</div>
            <div className="absolute rounded-full bg-green-200/60 w-60 h-60 bottom-0 left-0 flex items-center justify-center font-semibold text-green-800">Tập thể</div>
            <div className="absolute rounded-full bg-red-200/60 w-60 h-60 bottom-0 right-0 flex items-center justify-center font-semibold text-red-800">Xã hội</div>
          </div>
          <div className="max-w-3xl mx-auto text-left">
            <ul className="list-disc pl-6 text-slate-700 space-y-2">
              <li>Thống nhất: mọi cấp lợi ích đều cần môi trường kinh tế – xã hội phát triển</li>
              <li>Mâu thuẫn: phân bổ nguồn lực, chia sẻ rủi ro – lợi ích, mục tiêu ngắn/dài hạn</li>
              <li>Định hướng hài hòa: cơ chế, pháp luật, đối thoại xã hội, chuẩn mực đạo đức</li>
            </ul>
          </div>
        </div>
      </FullSlideSection>

      {/* Slide 3 */}
      <FullSlideSection id="s3" className="bg-slate-50">
        <h2 className="text-4xl font-montserrat font-bold text-slate-900 mb-8 text-center">Các quan hệ lợi ích kinh tế chủ yếu</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-xl border p-4 bg-white">
            <div className="flex items-center gap-2 font-medium"><Handshake className="w-5 h-5 text-orange-500" />LĐ ↔ NSDLĐ</div>
            <ul className="text-sm text-slate-600 mt-2 list-disc pl-5 space-y-1">
              <li>Thống nhất: hiệu quả sản xuất, ổn định</li>
              <li>Mâu thuẫn: lương – lợi nhuận, điều kiện làm việc</li>
              <li>Giải pháp: lương tối thiểu, thương lượng tập thể, an sinh</li>
            </ul>
          </div>
          <div className="rounded-xl border p-4 bg-white">
            <div className="flex items-center gap-2 font-medium"><Factory className="w-5 h-5 text-orange-500" />DN ↔ DN</div>
            <ul className="text-sm text-slate-600 mt-2 list-disc pl-5 space-y-1">
              <li>Cạnh tranh thúc đẩy đổi mới, hiệu quả</li>
              <li>Rủi ro: độc quyền, gian lận, phá giá</li>
              <li>Giải pháp: luật cạnh tranh, tiêu chuẩn minh bạch</li>
            </ul>
          </div>
          <div className="rounded-xl border p-4 bg-white">
            <div className="flex items-center gap-2 font-medium"><Users className="w-5 h-5 text-orange-500" />NLĐ ↔ NLĐ</div>
            <ul className="text-sm text-slate-600 mt-2 list-disc pl-5 space-y-1">
              <li>Chênh lệch năng lực, vị trí, thu nhập</li>
              <li>Giải pháp: cơ hội đào tạo, chính sách phân phối công bằng</li>
            </ul>
          </div>
          <div className="rounded-xl border p-4 bg-white">
            <div className="flex items-center gap-2 font-medium"><Globe className="w-5 h-5 text-orange-500" />Cá nhân/nhóm ↔ Xã hội</div>
            <ul className="text-sm text-slate-600 mt-2 list-disc pl-5 space-y-1">
              <li>Lợi ích riêng phải phù hợp lợi ích quốc gia</li>
              <li>Ngăn lợi ích nhóm tiêu cực, tha hóa quyền lực</li>
            </ul>
          </div>
        </div>
      </FullSlideSection>

      {/* Slide 4 */}
      <FullSlideSection id="s4" className="bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="text-center">
            <Scale className="w-20 h-20 mx-auto text-green-500 mb-3" />
            <div className="text-xl font-semibold text-slate-800 mb-1">Thống nhất</div>
            <div className="text-slate-600">Mục tiêu chung: tăng trưởng và phát triển</div>
          </div>
          <div className="text-center">
            <Zap className="w-20 h-20 mx-auto text-red-500 mb-3" />
            <div className="text-xl font-semibold text-slate-800 mb-1">Mâu thuẫn</div>
            <div className="text-slate-600">Khác biệt sở hữu, vai trò, phân phối</div>
          </div>
        </div>
        <div className="max-w-3xl mx-auto mt-6">
          <p className="text-slate-700 text-center">Hài hòa lợi ích thông qua: pháp luật, chính sách công, đối thoại xã hội, cơ chế giám sát – minh bạch, và giáo dục đạo đức kinh doanh.</p>
        </div>
      </FullSlideSection>

      {/* Slide 5 */}
      <FullSlideSection id="s5" className="bg-slate-50">
        <h2 className="text-4xl font-montserrat font-bold text-slate-900 mb-8 text-center">Nhân tố ảnh hưởng</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          <div className="text-center"><BrainCircuit className="w-10 h-10 mx-auto text-orange-500 mb-2" /><div className="text-sm">Lực lượng sản xuất</div></div>
          <div className="text-center"><Users className="w-10 h-10 mx-auto text-orange-500 mb-2" /><div className="text-sm">Quan hệ sản xuất</div></div>
          <div className="text-center"><Coins className="w-10 h-10 mx-auto text-orange-500 mb-2" /><div className="text-sm">Phân phối</div></div>
          <div className="text-center"><Landmark className="w-10 h-10 mx-auto text-orange-500 mb-2" /><div className="text-sm">Pháp luật</div></div>
          <div className="text-center"><Globe className="w-10 h-10 mx-auto text-orange-500 mb-2" /><div className="text-sm">Hội nhập</div></div>
        </div>
      </FullSlideSection>

      {/* Slide 6 */}
      <FullSlideSection id="s6" className="bg-white">
        <h2 className="text-3xl md:text-4xl font-montserrat font-bold text-slate-900 mb-6 text-center">Theo cơ chế thị trường & chính sách Nhà nước</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-2xl border p-6 bg-orange-50">
            <div className="text-lg font-semibold mb-2">Cơ chế thị trường</div>
            <ul className="text-slate-700 text-sm list-disc pl-5 space-y-1">
              <li>Quy luật: cung – cầu, cạnh tranh, lợi nhuận</li>
              <li>Ưu điểm: hiệu quả, khuyến khích sáng tạo</li>
              <li>Hạn chế: bất bình đẳng, ngoại tác tiêu cực nếu thiếu điều tiết</li>
            </ul>
          </div>
          <div className="rounded-2xl border p-6 bg-slate-50">
            <div className="text-lg font-semibold mb-2">Chính sách Nhà nước</div>
            <ul className="text-slate-700 text-sm list-disc pl-5 space-y-1">
              <li>Công cụ: thuế, lương, an sinh, trợ cấp mục tiêu</li>
              <li>Quản lý thị trường: chống độc quyền, bảo vệ người tiêu dùng</li>
              <li>Bảo vệ nhóm yếu thế; thúc đẩy phát triển bền vững</li>
            </ul>
          </div>
        </div>
      </FullSlideSection>

      {/* Slide 7 */}
      <FullSlideSection id="s7" className="bg-orange-50">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-orange-600 mb-4">Nhà nước là “Nhạc trưởng & Trọng tài”</h2>
          <div className="text-left max-w-3xl mx-auto text-lg text-slate-700 space-y-2">
            <p>• Đặt lợi ích của nhân dân, đất nước lên hàng đầu</p>
            <p>• Hài hòa lợi ích cá nhân – tập thể – xã hội</p>
            <p>• Chống lợi ích nhóm tiêu cực; minh bạch, trách nhiệm giải trình</p>
          </div>
          <div className="max-w-3xl mx-auto text-left text-slate-700 mt-4">
            <ul className="list-disc pl-6 space-y-2">
              <li>Thiết lập luật chơi, bảo đảm quyền sở hữu, quyền tự do kinh doanh hợp pháp</li>
              <li>Đầu tư hạ tầng thiết yếu; định hướng bằng chiến lược, quy hoạch, chính sách</li>
              <li>Giải quyết xung đột dựa trên pháp luật; trừng trị hành vi xâm hại lợi ích chung</li>
            </ul>
          </div>
        </div>
      </FullSlideSection>

      {/* Slide 8 */}
      <FullSlideSection id="s8" className="bg-white">
        <h2 className="text-4xl font-montserrat font-bold text-slate-900 mb-8 text-center">Liên hệ thực tiễn</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-xl border p-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://images.unsplash.com/photo-1544681280-d25a782d4384" alt="Vinamilk" className="rounded mb-3" />
            <div className="font-semibold">Vinamilk – CSR & an sinh</div>
            <ul className="text-sm text-slate-600 list-disc pl-5 mt-2 space-y-1">
              <li>“Quỹ sữa Vươn cao Việt Nam” tặng triệu ly sữa</li>
              <li>Trang trại chuẩn GlobalG.A.P, giảm phát thải</li>
            </ul>
          </div>
          <div className="rounded-xl border p-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://images.unsplash.com/photo-1603322199363-14380ec2ba31" alt="Viettel" className="rounded mb-3" />
            <div className="font-semibold">Viettel – Chuyển đổi số</div>
            <ul className="text-sm text-slate-600 list-disc pl-5 mt-2 space-y-1">
              <li>Hạ tầng 5G, AI; chuyển đổi số vùng sâu vùng xa</li>
              <li>An sinh xã hội: Viettel vì em hiếu học, Internet trường học</li>
            </ul>
          </div>
          <div className="rounded-xl border p-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://images.unsplash.com/photo-1515486191131-efd6be9f711f" alt="TH True Milk" className="rounded mb-3" />
            <div className="font-semibold">TH True Milk – Nông nghiệp xanh</div>
            <ul className="text-sm text-slate-600 list-disc pl-5 mt-2 space-y-1">
              <li>Ứng dụng công nghệ cao, dữ liệu lớn</li>
              <li>Chuỗi sản xuất “sạch từ đồng cỏ đến ly sữa”</li>
            </ul>
          </div>
        </div>
      </FullSlideSection>

      {/* Slide 9 */}
      <FullSlideSection id="s9" className="bg-[#FED7AA]">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">Kết luận & Giải pháp</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto text-left">
            <div className="rounded-lg bg-white/70 border p-4">
              <div className="font-semibold mb-1">Nâng cao vai trò Nhà nước pháp quyền</div>
              <div className="text-sm text-slate-700">Tăng thanh tra, xử lý nghiêm tham nhũng, lợi ích nhóm; hoàn thiện khung pháp lý minh bạch</div>
            </div>
            <div className="rounded-lg bg-white/70 border p-4">
              <div className="font-semibold mb-1">Minh bạch hóa lợi ích</div>
              <div className="text-sm text-slate-700">Công khai đầu tư công, đấu thầu điện tử, mở rộng giám sát của người dân và báo chí</div>
            </div>
            <div className="rounded-lg bg-white/70 border p-4">
              <div className="font-semibold mb-1">Phát triển CSR trong doanh nghiệp</div>
              <div className="text-sm text-slate-700">Tích hợp mục tiêu xã hội – môi trường vào chiến lược; hỗ trợ SMEs tham gia chương trình CSR</div>
            </div>
            <div className="rounded-lg bg-white/70 border p-4">
              <div className="font-semibold mb-1">Giáo dục đạo đức kinh doanh</div>
              <div className="text-sm text-slate-700">Đưa “đạo đức kinh doanh”, “kinh tế xanh” vào nhà trường; thúc đẩy tiêu dùng có trách nhiệm</div>
            </div>
          </div>
          <p className="mt-6 text-lg text-slate-800">Hướng tới nền kinh tế thị trường định hướng XHCN – Công bằng, Văn minh, Bền vững.</p>
        </div>
      </FullSlideSection>
    </div>
  );
}


