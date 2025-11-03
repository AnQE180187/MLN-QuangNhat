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
          { src: "data:image/jpeg;base64,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", alt: "Biểu đồ tăng trưởng kinh tế" },
          { src: "https://images.unsplash.com/photo-1553729784-e91953dec042", alt: "Nhóm người trao đổi công việc" }
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
        title: "Công cụ điều tiết",
        bullets: [
          "Hệ thống pháp luật và chính sách",
          "Thuế, phí và điều tiết thu nhập",
          "An sinh xã hội và phúc lợi công",
        ],
        examples: [
          {
            title: "Thuế luỹ tiến",
            description: "Điều tiết thu nhập, giảm chênh lệch giàu nghèo",
            points: ["Mức thuế tăng theo thu nhập", "Nguồn lực cho phúc lợi"],
            icon: "💰"
          },
          {
            title: "Trợ cấp mục tiêu",
            description: "Hỗ trợ nhóm yếu thế, đảm bảo an sinh",
            points: ["BHYT hộ nghèo", "Hỗ trợ giáo dục"],
            icon: "🛡️"
          }
        ]
      },
      {
        id: "state-2",
        title: "Mục tiêu điều tiết",
        bullets: [
          "Ổn định vĩ mô, tăng trưởng bền vững",
          "Công bằng xã hội, giảm bất bình đẳng",
          "Khuyến khích đổi mới, nâng cao năng suất",
        ],
      },
      {
        id: "state-3",
        title: "Nhà nước: Nhạc trưởng & Trọng tài",
        body: "Nhà nước thiết lập luật chơi, đầu tư hạ tầng, điều tiết bằng thuế – chính sách; kiểm soát hành vi xấu và phân xử tranh chấp để đảm bảo công bằng, ổn định.",
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