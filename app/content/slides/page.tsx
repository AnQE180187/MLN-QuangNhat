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
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhXMD74Qs6slvPntyDkBiT_WEOKlvb6gig8Q&s" alt="Vinamilk" className="rounded mb-3" />
            <div className="font-semibold">Vinamilk – CSR & an sinh</div>
            <ul className="text-sm text-slate-600 list-disc pl-5 mt-2 space-y-1">
              <li>“Quỹ sữa Vươn cao Việt Nam” tặng triệu ly sữa</li>
              <li>Trang trại chuẩn GlobalG.A.P, giảm phát thải</li>
            </ul>
          </div>
          <div className="rounded-xl border p-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="data:image/jpeg;base64,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" alt="Viettel" className="rounded mb-3" />
            <div className="font-semibold">Viettel – Chuyển đổi số</div>
            <ul className="text-sm text-slate-600 list-disc pl-5 mt-2 space-y-1">
              <li>Hạ tầng 5G, AI; chuyển đổi số vùng sâu vùng xa</li>
              <li>An sinh xã hội: Viettel vì em hiếu học, Internet trường học</li>
            </ul>
          </div>
          <div className="rounded-xl border p-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="data:image/jpeg;base64,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" alt="TH True Milk" className="rounded mb-3" />
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


