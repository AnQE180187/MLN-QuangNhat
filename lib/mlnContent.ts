export type LessonSection = {
  id: string;
  title: string;
  bullets?: string[];
  body?: string;
  images?: Image[];
  examples?: Example[];
};

export type LessonChapter = {
  id: string;
  title: string;
  sections: LessonSection[];
};

export const courseChapters: LessonChapter[] = [
  {
    id: "intro",
    title: "Tổng quan về lợi ích kinh tế",
    sections: [
      {
        id: "intro-1",
        title: "Khái niệm lợi ích kinh tế",
        bullets: [
          "Lợi ích kinh tế là cái mà chủ thể nhận được từ hoạt động kinh tế",
          "Gắn với động cơ, nhu cầu và mục tiêu của các chủ thể",
          "Là yếu tố thúc đẩy hành vi trong nền kinh tế thị trường",
        ],
        body: "Lợi ích kinh tế không chỉ là thu nhập vật chất mà còn bao gồm các giá trị tinh thần như uy tín, vị thế, cơ hội phát triển.",
        images: [
          { src: "https://plus.unsplash.com/premium_photo-1663931932651-ea743c9a0144?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170", alt: "Biểu đồ tăng trưởng kinh tế" },
          { src: "https://media.istockphoto.com/id/160330722/vi/anh/nhi%E1%BB%81u-lo%E1%BA%A1i-ti%E1%BB%81n-t%E1%BB%87-vi%E1%BB%87t-nam.jpg?s=1024x1024&w=is&k=20&c=08IKYNn4V3-KhnlF_n-ahwJlmG6csLaKh-oB8DQ-Lvo=", alt: "Nhóm người trao đổi công việc" }
        ]
      },
      {
        id: "intro-2",
        title: "Phân loại lợi ích",
        bullets: [
          "Lợi ích cá nhân, lợi ích tập thể, lợi ích xã hội",
          "Lợi ích ngắn hạn và dài hạn",
          "Lợi ích vật chất và tinh thần",
        ],
        body: "Việc phân loại giúp nhận diện xung đột và tìm cơ chế hài hòa phù hợp trong từng bối cảnh.",
        examples: [
          {
            title: "Lợi ích cá nhân",
            description: "Tiền lương, thưởng, điều kiện làm việc tốt",
            points: ["Tăng lương theo hiệu suất", "Cơ hội thăng tiến"],
            icon: "👤"
          },
          {
            title: "Lợi ích xã hội",
            description: "Môi trường sống trong lành, an sinh xã hội",
            points: ["Giảm phát thải", "Bình đẳng cơ hội"],
            icon: "🌍"
          }
        ]
      },
    ],
  },
  {
    id: "relations",
    title: "Quan hệ lợi ích trong kinh tế thị trường định hướng XHCN",
    sections: [
      {
        id: "relations-1",
        title: "Đặc điểm quan hệ lợi ích",
        bullets: [
          "Đa dạng chủ thể: cá nhân, doanh nghiệp, Nhà nước",
          "Vừa hợp tác vừa cạnh tranh",
          "Cần cơ chế điều tiết để hài hòa",
        ],
        images: [
          { src: "https://images.unsplash.com/photo-1495020689067-958852a7765e", alt: "Bắt tay hợp tác" }
        ]
      },
      {
        id: "relations-2a",
        title: "Người lao động ↔ Người sử dụng lao động",
        bullets: [
          "Quan hệ lợi ích trung tâm trong KTTT",
          "Thống nhất: cùng hướng tới hiệu quả và lợi nhuận",
          "Mâu thuẫn: chia sẻ giá trị thặng dư, lương – lợi nhuận",
          "Giải pháp: pháp luật lao động, lương tối thiểu, thương lượng tập thể, an sinh",
        ],
      },
      {
        id: "relations-2b",
        title: "Người sử dụng lao động ↔ Người sử dụng lao động",
        bullets: [
          "Cạnh tranh thúc đẩy hiệu quả, đổi mới",
          "Tiêu cực khi cạnh tranh không lành mạnh: độc quyền, gian lận, phá giá",
        ],
      },
      {
        id: "relations-2c",
        title: "Người lao động ↔ Người lao động",
        bullets: [
          "Chênh lệch thu nhập, vị trí, năng lực",
          "Cần chính sách phân phối công bằng, tránh phân hóa quá mức",
        ],
      },
      {
        id: "relations-2d",
        title: "Cá nhân/nhóm ↔ Xã hội",
        bullets: [
          "Lợi ích riêng phải phù hợp lợi ích chung của quốc gia",
          "Lợi ích nhóm tích cực tạo động lực; nhóm tiêu cực cần ngăn chặn",
          "Nguy cơ tha hóa quyền lực, bất công xã hội nếu nhóm lợi ích tiêu cực chi phối",
        ],
      },
      {
        id: "relations-3",
        title: "Mâu thuẫn và hài hòa lợi ích",
        bullets: [
          "Mâu thuẫn phát sinh từ mục tiêu khác nhau",
          "Hài hòa bằng thể chế, chính sách, đối thoại xã hội",
          "Nguyên tắc: đảm bảo lợi ích hợp pháp, công bằng, hiệu quả",
        ],
      },
    ],
  },
  {
    id: "mechanisms",
    title: "Cơ chế hài hòa lợi ích",
    sections: [
      {
        id: "mech-1",
        title: "Nguyên tắc",
        bullets: [
          "Tôn trọng thị trường đi đôi với quản lý Nhà nước",
          "Đảm bảo quyền và lợi ích hợp pháp của các bên",
          "Minh bạch, trách nhiệm giải trình",
        ],
      },
      {
        id: "mech-2",
        title: "Giải pháp",
        bullets: [
          "Hoàn thiện thể chế và chính sách",
          "Đối thoại xã hội, thương lượng tập thể",
          "Công cụ kinh tế: thuế, trợ cấp, tín dụng",
        ],
      },
      {
        id: "mech-3",
        title: "Phương thức thực hiện lợi ích",
        bullets: [
          "Theo cơ chế thị trường: tuân quy luật cung – cầu, cạnh tranh, lợi nhuận",
          "Rủi ro nếu chỉ dựa thị trường: bất bình đẳng, phân hóa",
          "Theo chính sách Nhà nước và tổ chức xã hội: thuế, lương, phúc lợi; chống độc quyền; bảo vệ yếu thế",
        ],
      },
    ],
  },
  {
    id: "factors",
    title: "Nhân tố ảnh hưởng tới quan hệ lợi ích",
    sections: [
      {
        id: "factors-1",
        title: "Các nhân tố chính",
        bullets: [
          "Trình độ lực lượng sản xuất",
          "Quan hệ sản xuất và chế độ sở hữu",
          "Chính sách phân phối và thu nhập",
          "Hội nhập quốc tế, mở rộng thị trường và cạnh tranh",
          "Thể chế, pháp luật và môi trường xã hội",
        ],
      },
    ],
  },
  {
    id: "viewpoint",
    title: "Quan điểm của Đảng và Nhà nước",
    sections: [
      {
        id: "view-1",
        title: "Định hướng chủ đạo",
        bullets: [
          "Lợi ích của nhân dân, đất nước là tối thượng",
          "Hài hòa lợi ích cá nhân – tập thể – xã hội",
          "Khuyến khích làm giàu hợp pháp; chống lợi ích nhóm tiêu cực",
          "Bảo vệ lợi ích hợp pháp, tạo cạnh tranh lành mạnh",
        ],
      },
    ],
  },
  {
    id: "state",
    title: "Vai trò của Nhà nước trong điều tiết lợi ích",
    sections: [

      {
        id: "state-1",
        title: "Nhà nước: Nhạc trưởng & Trọng tài",
        body: "Nhà nước thiết lập pháp luật, đầu tư hạ tầng, điều tiết bằng thuế – chính sách; kiểm soát Hành vi xấu và phân xử tranh chấp để đảm bảo công bằng, ổn định.",
        bullets: [
          "Bảo vệ và mở đường: pháp luật, hạ tầng, định hướng",
          "Điều hòa lợi ích: thuế, phúc lợi, đảm bảo mức sống tối thiểu",
          "Kiểm soát xung đột: chống tham nhũng, hàng giả; hòa giải, phân xử",
        ],
      },
    ],
  },

  {
    id: "practice",
    title: "Liên hệ thực tiễn ở Việt Nam",
    sections: [
      {
        id: "practice-1",
        title: "Ví dụ tích cực (CSR)",
        bullets: [
          "Vinamilk: Quỹ sữa Vươn cao; trang trại GlobalG.A.P",
          "Viettel: Hạ tầng 5G, AI; Internet trường học vùng cao",
          "TH True Milk: Công nghệ cao; chuỗi sản xuất sạch",
        ],
      },
      {
        id: "practice-2",
        title: "Ví dụ tiêu cực & hệ quả",
        bullets: [
          "Vạn Thịnh Phát, AIC, SCB: tham nhũng, thao túng, thất thoát",
          "Bất bình đẳng vùng miền; cơ hội tiếp cận dịch vụ công hạn chế",
        ],
      },
    ],
  },
  {
    id: "conclusion",
    title: "Kết luận và giải pháp",
    sections: [
      {
        id: "conclude-1",
        title: "Khẳng định",
        bullets: [
          "Lợi ích kinh tế là động lực; cần điều tiết hợp lý",
        ],
      },
      {
        id: "conclude-2",
        title: "Giải pháp trọng tâm",
        bullets: [
          "Nâng cao vai trò Nhà nước pháp quyền; chống tham nhũng, lợi ích nhóm",
          "Minh bạch hóa lợi ích: đầu tư công, đấu thầu điện tử, giám sát xã hội",
          "Phát triển kinh tế tư nhân gắn CSR; hỗ trợ SMEs",
          "Giáo dục đạo đức kinh doanh; kinh tế xanh; tiêu dùng có trách nhiệm",
        ],
      },
    ],
  },
];

export function flattenSections(): LessonSection[] {
  return courseChapters.flatMap((c) => c.sections);
}

export function searchSections(query: string, limit = 3): LessonSection[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  const sections = flattenSections();
  const scored = sections
    .map((s) => {
      const text = [s.title, ...(s.bullets ?? []), s.body ?? ""].join(" \n ").toLowerCase();
      let score = 0;
      q.split(/\s+/).forEach((w) => {
        if (!w) return;
        const matches = text.split(w).length - 1;
        score += matches * (w.length >= 4 ? 2 : 1);
      });
      return { section: s, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.section);
  return scored;
}

export type Image = {
  src: string;
  alt: string;
  caption?: string;
};

export type Example = {
  title: string;
  description: string;
  points: string[];
  icon?: string;
  image?: Image;
};

type BaseBlock = {
  layout?: 'full' | 'left' | 'right' | 'center';
  style?: 'default' | 'highlight' | 'card' | 'banner';
};

export type FeatureBlock = BaseBlock & {
  type: 'feature';
  icon: string;
  title: string;
  description: string;
  color?: string;
};

export type TextBlock = BaseBlock & {
  type: 'text';
  content: string;
};

export type ImageBlock = BaseBlock & {
  type: 'image';
  content: Image;
};

export type QuoteBlock = BaseBlock & {
  type: 'quote';
  content: string;
};

export type ListBlock = BaseBlock & {
  type: 'list';
  content: string[];
};

export type ContentBlock = FeatureBlock | TextBlock | ImageBlock | QuoteBlock | ListBlock;

export type Slide = {
  id: string;
  title: string;
  description: string;
  chapter?: number; // Thêm thuộc tính chapter
  type: 'intro' | 'content' | 'example' | 'conclusion';
  backgroundImage?: Image;
  image?: Image; // Thêm thuộc tính image
  blocks?: ContentBlock[];
  content?: {
    mainPoints?: string[];
    examples?: Example[];
    note?: string;
    blocks?: ContentBlock[];
  };
};

export const slides: Slide[] = [
  {
    id: 'intro',
    title: 'Lợi ích Kinh tế',
    description: 'Hiểu nhanh bản chất và vai trò động lực của lợi ích kinh tế',
    chapter: 1, // Thêm số chương
    type: 'intro',
    backgroundImage: {
      src: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40',
      alt: 'Người làm việc trên máy tính với biểu đồ tài chính',
    },
    image: {
      src: 'https://images.unsplash.com/photo-1599658880436-c61792e70672',
      alt: 'Các đồng tiền và biểu đồ tăng trưởng',
    },
    blocks: [
      {
        type: 'feature',
        icon: '💵',
        title: 'Lợi ích vật chất',
        description: 'Thu nhập, tài sản, điều kiện sống',
        color: 'green-500',
      },
      {
        type: 'feature',
        icon: '💜',
        title: 'Lợi ích tinh thần',
        description: 'Danh dự, uy tín, phát triển bản thân',
        color: 'purple-500',
      },
    ],
    content: {
      mainPoints: [
        'Lợi ích kinh tế là sự thỏa mãn nhu cầu vật chất của con người thông qua hoạt động kinh tế – xã hội',
        'Là động lực trực tiếp thúc đẩy sáng tạo và phát triển',
        'Có hai dạng: Lợi ích vật chất (tiền lương, lợi nhuận) và lợi ích tinh thần (danh tiếng, vị thế)',
      ],
      note: 'Lợi ích kinh tế là động lực cơ bản thúc đẩy sự phát triển của xã hội',
    },
  },
  {
    id: 'types',
    title: 'Các loại Lợi ích và Mối quan hệ',
    description: 'Tóm tắt nhóm lợi ích và cách chúng tương tác (thống nhất – mâu thuẫn)',
    chapter: 2, // Thêm số chương
    type: 'content',
    backgroundImage: {
      src: 'https://images.unsplash.com/photo-1521791136064-7986c2920216',
      alt: 'Người dân đô thị hiện đại làm việc cùng nhau',
    },
    blocks: [
      {
        type: 'feature',
        icon: '👤',
        title: 'Lợi ích cá nhân',
        description: 'Thu nhập, tài sản, đời sống của từng người',
        color: 'blue-500',
      },
      {
        type: 'feature',
        icon: '🏢',
        title: 'Lợi ích tập thể',
        description: 'Doanh nghiệp, tổ chức, cộng đồng',
        color: 'green-500',
      },
      {
        type: 'feature',
        icon: '🌍',
        title: 'Lợi ích xã hội',
        description: 'Quốc gia, dân tộc, toàn xã hội',
        color: 'orange-500',
      },
    ],
    content: {
      mainPoints: [
        'Lợi ích cá nhân: nhu cầu và mong muốn của mỗi người trong xã hội',
        'Lợi ích tập thể: lợi ích chung của một nhóm hoặc cộng đồng',
        'Lợi ích xã hội: lợi ích của toàn bộ xã hội, bao gồm cả lợi ích kinh tế và phi kinh tế',
      ],
      note: 'Hài hòa lợi ích cá nhân, tập thể và xã hội là chìa khóa để phát triển bền vững',
    },
  },
  {
    id: 'relations-overview',
    title: 'Các quan hệ lợi ích cơ bản',
    description: 'Gộp các quan hệ chính để trình bày ngắn gọn, dễ theo dõi',
    type: 'content',
    blocks: [
      { type: 'feature', icon: '🤝', title: 'LĐ ↔ NSDLĐ', description: 'Trung tâm: thống nhất về hiệu quả, mâu thuẫn ở phân phối', color: 'orange-500' },
      { type: 'feature', icon: '🏭', title: 'DN ↔ DN', description: 'Cạnh tranh thúc đẩy đổi mới; tránh độc quyền/gian lận', color: 'blue-500' },
      { type: 'feature', icon: '👥', title: 'NLĐ ↔ NLĐ', description: 'Chênh lệch năng lực/thu nhập; cần phân phối công bằng', color: 'green-500' },
      { type: 'feature', icon: '🌐', title: 'Cá nhân/nhóm ↔ Xã hội', description: 'Phù hợp lợi ích chung; ngăn nhóm lợi ích tiêu cực', color: 'purple-500' },
    ],
    content: {
      mainPoints: [
        'Giải pháp khung: pháp luật, lương tối thiểu, thương lượng tập thể, an sinh',
        'Nguyên tắc: đảm bảo quyền lợi hợp pháp, công bằng, hiệu quả',
      ],
    },
  },
  {
    id: 'state-role',
    title: 'Nhà nước: Nhạc trưởng & Trọng tài',
    description: 'Thiết lập luật chơi, đầu tư hạ tầng, điều tiết – phân xử xung đột',
    type: 'content',
    backgroundImage: {
      src: 'https://images.unsplash.com/photo-1523292562811-8fa7962a78c8',
      alt: 'Tòa nhà chính phủ trang nghiêm',
    },
    blocks: [
      {
        type: 'image',
        content: {
          src: 'https://images.unsplash.com/photo-1589578527966-fdac0f44566c',
          alt: 'Cán bộ nhà nước làm việc',
          caption: 'Hoạt động điều hành, quản lý của cơ quan nhà nước',
        },
        layout: 'right',
      },
      {
        type: 'text',
        content:
          'Nhà nước với vai trò là người điều phối tối cao, có trách nhiệm đảm bảo sự cân bằng và hài hòa giữa các lợi ích trong xã hội. Thông qua hệ thống pháp luật và chính sách, Nhà nước tạo ra môi trường thuận lợi cho sự phát triển của mọi thành phần kinh tế.',
        layout: 'left',
        style: 'highlight',
      },
    ],
    content: {
      mainPoints: [
        'Điều tiết và cân bằng các lợi ích thông qua chính sách kinh tế vĩ mô',
        'Ban hành và thực thi pháp luật để đảm bảo môi trường kinh doanh lành mạnh',
        'Giải quyết kịp thời và công bằng các xung đột lợi ích',
        'Bảo vệ quyền và lợi ích hợp pháp của mọi chủ thể kinh tế',
      ],
      note: 'Nhà nước đóng vai trò then chốt trong việc đảm bảo hài hòa lợi ích và thúc đẩy phát triển bền vững',
    },
  },
  {
    id: 'mechanisms-factors',
    title: 'Cơ chế hài hòa & Nhân tố ảnh hưởng',
    description: 'Tổng hợp nguyên tắc – giải pháp và các nhân tố chi phối',
    type: 'content',
    blocks: [
      {
        type: 'list', content: [
          'Nguyên tắc: thị trường + quản lý Nhà nước; minh bạch; bảo vệ quyền lợi hợp pháp',
          'Giải pháp: hoàn thiện thể chế; đối thoại xã hội; công cụ kinh tế (thuế, trợ cấp...)',
        ]
      },
      {
        type: 'list', content: [
          'Nhân tố: lực lượng sản xuất; quan hệ sản xuất; sở hữu; hội nhập; pháp luật – thể chế',
        ]
      }
    ],
  },
  {
    id: 'practice',
    title: 'Liên hệ Thực tiễn',
    description: 'Ví dụ tích cực (CSR) và tiêu cực (nhóm lợi ích) tại Việt Nam',
    type: 'example',
    backgroundImage: {
      src: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab',
      alt: 'Tòa nhà văn phòng hiện đại',
    },
    content: {
      examples: [
        {
          title: 'Vinamilk',
          description: 'Doanh nghiệp vì sức khỏe cộng đồng',
          points: [
            'Chương trình "Quỹ sữa Vươn cao Việt Nam"',
            'Phát triển nông nghiệp xanh, giảm phát thải',
          ],
          icon: '🥛',
          image: {
            src: 'https://images.unsplash.com/photo-1544681280-d25a782d4384',
            alt: 'Trang trại bò sữa hiện đại',
          },
        },
        {
          title: 'Viettel',
          description: 'Phát triển công nghệ vì cộng đồng',
          points: [
            'Đầu tư hạ tầng 5G và AI',
            'Chương trình Internet trường học vùng cao',
          ],
          icon: '📱',
          image: {
            src: 'https://images.unsplash.com/photo-1603322199363-14380ec2ba31',
            alt: 'Cơ sở hạ tầng viễn thông',
          },
        },
        {
          title: 'TH True Milk',
          description: 'Nông nghiệp xanh bền vững',
          points: [
            'Ứng dụng công nghệ cao trong chăn nuôi',
            'Chuỗi sản xuất sạch toàn diện',
          ],
          icon: '🌱',
          image: {
            src: 'https://images.unsplash.com/photo-1515486191131-efd6be9f711f',
            alt: 'Trang trại nông nghiệp công nghệ cao',
          },
        },
      ],
      note: 'Các doanh nghiệp Việt Nam đang ngày càng chú trọng hài hòa giữa lợi nhuận và trách nhiệm xã hội',
    },
  },
  {
    id: 'conclusion',
    title: 'Kết luận & Giải pháp',
    description: 'Tổng kết thông điệp chính và đề xuất định hướng hành động',
    type: 'conclusion',
    backgroundImage: {
      src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f',
      alt: 'Bắt tay hợp tác trong kinh doanh',
    },
    content: {
      blocks: [
        {
          type: 'image',
          content: {
            src: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf',
            alt: 'Hội nghị thảo luận chính sách',
            caption: 'Thảo luận và đề xuất giải pháp phát triển bền vững',
          },
          layout: 'center',
        },
        {
          type: 'text',
          content:
            'Để xây dựng một nền kinh tế phát triển bền vững, cần có sự đồng lòng và nỗ lực của tất cả các bên liên quan. Từ cơ quan quản lý nhà nước đến doanh nghiệp và người dân, mỗi chủ thể đều cần nhận thức rõ vai trò và trách nhiệm của mình.',
          layout: 'center',
          style: 'highlight',
        },
      ],
      mainPoints: [
        'Hoàn thiện thể chế, nâng cao hiệu quả quản lý nhà nước',
        'Đẩy mạnh cải cách hành chính, minh bạch hóa hoạt động kinh tế',
        'Thúc đẩy phát triển kinh tế tư nhân có trách nhiệm xã hội',
        'Tăng cường giáo dục đạo đức kinh doanh và văn hóa doanh nghiệp',
      ],
      note: 'Hướng tới một nền kinh tế thị trường định hướng XHCN: Công bằng - Văn minh - Bền vững',
    },
  },
];