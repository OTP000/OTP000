/* ==========================================================================
   CONFIG.JS — TẤT CẢ NỘI DUNG CẦN SỬA NẰM Ở ĐÂY (không cần đụng vào app.js)
   --------------------------------------------------------------------------
   1) Thông tin chung / link mạng xã hội  → CONFIG
   2) Đổi nhạc                            → CONFIG.music
   3) Đổi màu                             → CONFIG.theme   (chi tiết trong theme.css)
   4) Thêm / sửa ứng dụng                 → APPS (cuối file)
   ========================================================================== */

const CONFIG = {
  brand:  "NS MOD",
  owner:  "Sonchoigame",
  handle: "NSMOD",
  telegram: "@Sonchoigame123",      // hiện ở màn hình chào

  /* ---- MÀU GIAO DIỆN: "nsmod" | "h2" | "emerald" | "inferno" | "midnight" ---- */
  theme: "nsmod",

  /* ---- ẢNH ĐẠI DIỆN ----
     • file trong repo:   "avatar.jpg"
     • link raw GitHub:   "https://raw.githubusercontent.com/USER/REPO/main/avatar.jpg"
     • link ảnh bất kỳ:   "https://..."
     Không tải được ảnh thì tự hiện chữ thương hiệu.                       */
  /* MẶC ĐỊNH: bỏ ảnh vào thư mục icon/ — icon/avatar.png (hoặc .jpg/.webp, chỉ cần ghi "avatar") */
  avatar: "avatar",

  /* ---- NHẠC NỀN ----
     Cách 1 (khuyên dùng): bỏ file vào thư mục music/ trong repo, đặt tên nhac.mp3
              music: "music/nhac.mp3"
     Cách 2: dán link trực tiếp tới file nhạc (.mp3/.m4a/.ogg/.mp4)
              music: "https://files.catbox.moe/c380oj.mp4"
     Cách 3: link GitHub raw hoặc link blob (tự đổi sang raw)
              music: "https://github.com/USER/REPO/blob/main/music/nhac.mp3"
     Để "" nếu không dùng nhạc.   Lưu ý: GitHub Pages phân biệt HOA/thường.  */
  music:  "music/nhac.mp3",
  volume: 0.6,                    // 0 → 1

  /* ---- ICON ỨNG DỤNG ----
     Trong mỗi mục ở APPS, ô  icon  nhận được:
       • tên file:        "3105.png"   → tự ghép với iconBase bên dưới
       • đường dẫn repo:  "icons/3105.png"
       • link raw GitHub: "https://raw.githubusercontent.com/USER/REPO/main/icons/3105.png"
       • link blob GitHub (tự đổi sang raw)
       • link ảnh bất kỳ hoặc favicon("tenmien.com")
     Muốn dùng hẳn raw GitHub cho cả thư mục icon, sửa iconBase thành:
       "https://raw.githubusercontent.com/USER/REPO/main/icons/"              */
  /* MẶC ĐỊNH: thư mục icon/. Ứng dụng để icon:"" sẽ tự tìm icon/<tên-ứng-dụng>.png (xem icon/README.txt) */
  iconBase: "icon/",

  /* ---- NỀN ĐỘNG ---- */
  background: {
    streaks: 0,                   // số vệt sáng lao ngang (0 = tắt)
    floor:   false,                // mặt đường lưới chạy
  },

  links: {
    youtube:  "#",
    tiktok:   "https://www.tiktok.com/@hanhluoitap?_r=1&_t=ZS-9Aguqurv5pH",
    telegram: "#",
    discord:  "#",
    admin:    "#",                // nút ADMIN trong cửa sổ chi tiết
    download: "#"                 // nút "Sử Dụng Dịch Vụ Ngay" ("#" = cuộn xuống danh sách)
  },

  views: 5044,
  updates: 2026,

  /* Thông báo (chuông). go = tên ứng dụng sẽ mở khi bấm. */
  notices: [
    { ic:"bolt",   t:"APP 3105 CRACK 2.1",          d:"Vừa cập nhật bản mới",     tm:"Hôm nay",      go:"APP 3105 CRACK 2.1" },
    { ic:"shield", t:"DNS ANTIBAN • FF / FFM V2",   d:"Đã sửa lỗi kết nối",       tm:"Hôm qua",      go:"DNS ANTIBAN • FF / FFM V2" },
    { ic:"note",   t:"Nhạc nền đã sẵn sàng",        d:"Bấm nút phát ở góc phải",  tm:"2 ngày trước" },
    { ic:"heart",  t:"Mẹo: thả tim để lưu file",    d:"Xem lại ở mục Yêu thích",  tm:"Tuần này" }
  ]
};

/* Danh sách bộ màu cho nút 🎨 (khớp với tên trong theme.css) */
const THEMES = [
  ["nsmod",    "NS MOD"],
  ["h2",       "Kawasaki H2"],
  ["emerald",  "H2 SX Emerald"],
  ["inferno",  "Inferno"],
  ["midnight", "Midnight"]
];

/* Lấy icon của một trang web bằng tên miền (dùng tạm, sau này thay bằng link raw GitHub của bạn) */
const favicon = d => `https://www.google.com/s2/favicons?domain=${d}&sz=128`;

/* Danh mục game (chip lọc): [id, nhãn, icon]. Icon để "" sẽ hiện chữ cái đầu. */
const CATS = [
  ["all",  "Tất cả",   ""],
  ["lq",   "Liên Quân", favicon("lienquan.garena.vn")],
  ["ff",   "Free Fire", favicon("ff.garena.com")],
  ["app",  "App",       ""],
  ["pubg", "PUBG",      favicon("pubgmobile.com")]
];

const TYPES = ["MOD", "PATCH", "IPA", "TOOL", "CONFIG", "RAW"];

/* Nhãn nhỏ trên thẻ: [chữ hiển thị, class, icon] */
const TAGS = {
  ios:  ["iOS",     "ios",  "apple"],
  anti: ["Antiban", "anti", "shield"],
  ns:   ["NSMOD",   "ns",   "user"],
  win:  ["WINDOW",  "win",  "win"],
  v1:   ["v1",      "ios",  ""]
};

/* Ghi chú nổi bật (note: "video" hoặc "patch") */
const NOTES = {
  video: "Nhớ Xem Video Hướng Dẫn",
  patch: "Nhớ Xem Video PATCH Bằng 3105"
};


/* ==========================================================================
   DANH SÁCH ỨNG DỤNG
   --------------------------------------------------------------------------
   Mỗi mục viết theo thứ tự từ trên xuống:
       name   → tên (hiện to ở trên cùng)
       desc   → mô tả bên dưới. CÓ THỂ NHÚNG LINK:
                  "Dùng cho [APP 3105](https://link-cua-ban)"
                hoặc HTML:  'Xem <a href="https://..." target="_blank">video</a>'
       icon   → link/tên file icon (xem hướng dẫn ở CONFIG.iconBase). "" = hiện chữ cái đầu
       link   → link tải / link mở khi bấm nút trong cửa sổ chi tiết
       dòng sau (tuỳ chọn, ghi đè giá trị mặc định của nhóm):
         game: "lq" | "ff" | "app" | "pubg"
         type: "MOD" | "PATCH" | "IPA" | "TOOL" | "CONFIG" | "RAW"
         btn:  "dl" (TẢI FILE)  |  "ln" (MỞ LIÊN KẾT)
         tags: ["ios","anti","ns","win","v1"]
         note: "video" | "patch"
         new:  true   → gắn nhãn MỚI
   `defaults` của mỗi nhóm = giá trị chung cho mọi mục trong nhóm đó.
   ========================================================================== */
const APPS = [

  /* ───────────── 1 ───────────── */
  {
    section: "HƯỚNG DẪN + ACC",
    title:   "HƯỚNG DẪN SỬ DỤNG",
    defaults: { game:"app", type:"TOOL", btn:"dl", tags:["ios"] },
    items: [
      {
        name: "CÁCH MỞ KHÓA ACC FACEBOOK",
        desc: "XEM HƯỚNG DẪN THẬT KỸ NHÉ",
        icon: favicon("facebook.com"),
        link: "#"
      }
    ]
  },

  /* ───────────── 2 ───────────── */
  {
    section: "FAKE GPS + CONFIG",
    title:   "TÀI NGUYÊN TẢI XUỐNG",
    defaults: { game:"app", type:"CONFIG", btn:"dl", tags:["ios"] },
    items: [
      {
        name: "HƯỚNG DẪN FAKE GPS VỊ TRÍ FULL IOS",
        desc: "BẰNG SHADOW ROCKET",
        icon: "",
        link: "#"
      },
      {
        name: "MỞ KHÓA ICLOUD VIP",
        desc: "DÀNH CHO CON VỢ BỊ KHÓA",
        icon: favicon("icloud.com"),
        link: "#",
        type: "TOOL"
      },
      {
        name: "CONFIG UNLOCK PREMIUM 10 APP",
        desc: "YOUTUBE, SPOTIFY, PICARTS,...",
        icon: "",
        link: "#"
      }
    ]
  },

  /* ───────────── 3 ───────────── */
  {
    section: "HÌNH NỀN + PASSCODE THEMES",
    title:   "PASSCODE THEMES",
    defaults: { game:"app", type:"IPA", btn:"dl", tags:["ios"], note:"patch" },
    items: [
      {
        name: "IPA AIRCARD",
        desc: "CÀI PASSCODE",
        icon: "",
        link: "#"
      },
      {
        name: "FILE TỔNG HỢP PASSCODE THEMES",
        desc: "DÙNG CHO APP AIRCARD",
        icon: "",
        link: "#",
        type: "CONFIG"
      },
      {
        name: "APP ILOADER",
        desc: "CÀI FILE PLIST...",
        icon: "",
        link: "#"
      }
    ]
  },

  /* ───────────── 4 ───────────── */
  {
    section: "PATCH LIÊN QUÂN",
    title:   "PATCH & NGUỒN RAW",
    defaults: { game:"app", type:"PATCH", btn:"dl", tags:["ios"], note:"patch" },
    items: [
      {
        name: "PATCH LQ AIM + FULL SKIN",
        desc: "DÙNG CHO APP 3105",
        icon: favicon("lienquan.garena.vn"),
        link: "#",
        game: "lq"
      },
      {
        name: "PATCH FULL SKIN, ESP, CAM XA, HUD",
        desc: "DÙNG CHO APP 3105",
        icon: favicon("lienquan.garena.vn"),
        link: "#",
        game: "lq"
      },
      {
        name: "RESET TRẬN LQ",
        desc: "DÙNG CHO APP 3105",
        icon: favicon("lienquan.garena.vn"),
        link: "#",
        game: "lq"
      },
      {
        name: "PATCH LQ ESP + FULL SKIN + CAM XA",
        desc: "DÙNG CHO APP 3105",
        icon: favicon("lienquan.garena.vn"),
        link: "#",
        game: "lq"
      },
      {
        name: "PATCH HACK PVZ2",
        desc: "DÙNG CHO APP 3105",
        icon: favicon("ea.com"),
        link: "#"
      },
      {
        name: "PATCH LOCKET GOLD 30s",
        desc: "UP LOCKET GOLD , QUAY 30s,...",
        icon: favicon("locketcamera.com"),
        link: "#"
      },
      {
        name: "PATCH CADY CRUSH",
        desc: "DÙNG CHO APP 3105",
        icon: favicon("king.com"),
        link: "#"
      },
      {
        name: "NGUỒN RAW FULL LQ",
        desc: "DÁN VÀO APP 3105",
        icon: favicon("lienquan.garena.vn"),
        link: "#",
        game: "lq", type: "RAW", note: "video"
      },
      {
        name: "NGUỒN RAW PUBG",
        desc: "DÁN VÀO APP 3105",
        icon: favicon("pubgmobile.com"),
        link: "#",
        game: "pubg", type: "RAW", note: "video"
      },
      {
        name: "NGUỒN HÌNH NỀN + APP",
        desc: "CAPCUT, DAZZCAM, ISCREEN PREMIUM",
        icon: favicon("capcut.com"),
        link: "#",
        type: "RAW", note: "video"
      }
    ]
  },

  /* ───────────── 5 ───────────── */
  {
    section: "BYPASS + ANTIBAN",
    title:   "BYPASS & ANTIBAN",
    defaults: { game:"app", type:"TOOL", btn:"dl", tags:["ios"] },
    items: [
      {
        name: "FILE BYPASS AI DEEPSEEK",
        desc: "DÁN VÀO CHAT",
        icon: favicon("deepseek.com"),
        link: "#"
      },
      {
        name: "FILE BYPASS AI CLAUDE",
        desc: "DÁN INSTRUCTION",
        icon: favicon("claude.ai"),
        link: "#"
      },
      {
        name: "FILE BYPASS AI CHATGPT",
        desc: "DÁN VÀO CHAT",
        icon: favicon("chatgpt.com"),
        link: "#"
      },
      {
        name: "IPA + TOOL ĐỔI PASS CHỨNG CHỈ",
        desc: "CHO CẢ IOS + PC",
        icon: "",
        link: "#",
        type: "IPA", tags: ["win","ios","ns"]
      }
    ]
  },

  /* ───────────── 6 ───────────── */
  {
    section: "ANTIBAN",
    title:   "FILE MOD & ANTIBAN",
    defaults: { game:"ff", type:"MOD", btn:"dl", tags:["ios","anti"] },
    items: [
      {
        name: "DNS ANTIBAN • FF / FFM V2",
        desc: "Dùng cho 3105 & Filza",
        icon: favicon("ff.garena.com"),
        link: "#",
        new: true
      },
      {
        name: "SING BOX ANTIBAN FF V2",
        desc: "FIX BAN ID",
        icon: favicon("sing-box.sagernet.org"),
        link: "#"
      }
    ]
  },

  /* ───────────── 7 ───────────── */
  {
    section: "APP CRACK + MODS GAME",
    title:   "TẢI IPA",
    defaults: { game:"app", type:"IPA", btn:"ln", tags:[] },
    items: [
      {
        name: "UNLOCK GEMINI PRO",
        desc: "PRO VIPP",
        icon: favicon("gemini.google.com"),
        link: "#",
        tags: ["v1","ns"]
      },
      {
        name: "APP 3105",
        desc: "CẬP NHẬT 28/9",
        icon: "",
        link: "#"
      },
      {
        name: "APP 3105 CRACK 2.1",
        desc: "CẬP NHẬT 3/10",
        icon: "",
        link: "#",
        new: true
      },
      {
        name: "UNLOCK 3105",
        desc: "CẬP NHẬT 10/10",
        icon: "",
        link: "#",
        new: true
      },
      {
        name: "APP 3105 CRACK BETA 3",
        desc: "CẬP NHẬT 8/10",
        icon: "",
        link: "#"
      },
      {
        name: "APP 3105 CŨ",
        desc: "v1.1.1",
        icon: "",
        link: "#"
      },
      {
        name: "IPA MENU NO KEY 8BP",
        desc: "Đã cập nhật 29/8",
        icon: favicon("miniclip.com"),
        link: "#",
        type: "MOD", tags: ["ios","anti"]
      },
      {
        name: "UNLOCK 120HZ IOS",
        desc: "GIÚP MÀN HÌNH MƯỢT HƠN",
        icon: favicon("apple.com"),
        link: "#",
        type: "TOOL"
      },
      {
        name: "UNLOCK DUOLINGO MAX",
        desc: "CÓ CHẾ ĐỘ GỌI",
        icon: favicon("duolingo.com"),
        link: "#"
      },
      {
        name: "MESSENGER VIPP",
        desc: "XEM ĐƯỢC TIN NHẮN THU HỒI ,...",
        icon: favicon("messenger.com"),
        link: "#"
      },
      {
        name: "YOUTUBE PREMIUM",
        desc: "ĐÃ CẬP NHẬT 9/9",
        icon: favicon("youtube.com"),
        link: "#"
      },
      {
        name: "CAPCUT PRO",
        desc: "ĐÃ CẬP NHẬT 9/9",
        icon: favicon("capcut.com"),
        link: "#"
      },
      {
        name: "Filza Mod",
        desc: "Tích Hợp APP 3105, Mond",
        icon: "",
        link: "#",
        type: "TOOL"
      },
      {
        name: "PUBG IOS ZERO",
        desc: "MENU VIP • NO KEY",
        icon: favicon("pubgmobile.com"),
        link: "#",
        game: "pubg", type: "MOD"
      },
      {
        name: "FACEBOOK MENU IQ+PLUS",
        desc: "UPDATE 26/9",
        icon: favicon("facebook.com"),
        link: "#",
        type: "MOD"
      },
      {
        name: "IPA SPOTIFY PREMIUM",
        desc: "UNLOCK PREMIUM • MOD APPLE MUSIC",
        icon: favicon("spotify.com"),
        link: "#"
      },
      {
        name: "DISCORD FAKE GIỌNG",
        desc: "VÀO CUỘC GỌI RỒI CHỌN GIỌNG",
        icon: favicon("discord.com"),
        link: "#",
        type: "MOD"
      }
    ]
  }

];
