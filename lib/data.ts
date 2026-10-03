import { User, Story, Post, NotificationItem, TrendingTopic, ExploreMedia } from './types';

export const CURRENT_USER: User = {
  id: 'current-user',
  name: 'درسا شریفی',
  username: 'dorsa_design',
  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDTGm3cr4erYrtMbWCqvO71xVYOzB7iQeDKL3Ix59dsKTsux7KCoedSo0ZHTUGtFhUyWepOAXbtWfkal6o6LVAxCVwodMGHp0PCScvK1Yk-n_hFRWxHv7-jWKrWWeOSKP4DmNF7dRwRRDGouJKETwY13GXHlY12TELRaW8iAF04c_0GlMOo95u4cEoT_ZrbJrT_-CfDLwS23v5GAVXEhzCW3Rd_Lo4dCML-OXpsHVLjTX9QG37jmMuC',
  verified: true,
  role: 'طراح ارشد محصول و رابط کاربری',
  bio: 'طراح ارشد محصول و رابط کاربری 💻 | شیفته سادگی، تایپوگرافی فارسی و طراحی انسان‌محور | تهران 📍',
  link: 'aura.social/dorsa',
  stats: {
    posts: '۱۲۸',
    followers: '۱۴.۲K',
    following: '۳۸۲'
  }
};

export const INITIAL_STORIES: Story[] = [
  {
    id: 'story-self',
    user: {
      ...CURRENT_USER,
      name: 'استوری شما',
    },
    hasUnread: false,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBbJcOBAQ1HYZPD8Mj0GNsdipCCQv4rGEOsTnTT4TcxCXecB0el1XFdDeXkrmviwMlfW7y1ZYhjmj9yrmaBXJ5yvXPqd2A0y9xg554WzeR07BM-plepRl03RzEk75jhsxgRgJ5Qw5fm_bQ900ArueHUTfWfcDqffpgUwH4v8fgGS43m-eqWQUYJih-EbrTVnmmBfqDE2KhCq9eNZOXQRmGicT6AkzhZwqNX-6Y2769aGam7t91E7nmJ',
    timestamp: 'همین الان',
    caption: 'روزکاری خلاقانه در استودیوی دیزاین ☕'
  },
  {
    id: 'story-1',
    user: {
      id: 'sara-rad',
      name: 'سارا رادمنش',
      username: 'sara.rad',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuANdrmiuPR8lfGzqVScvxWI5eL0sNva6knf3c6I_MhtGfTy32dEwyuc6pOLPobJ09ZijrV3XFQIwxiWPcMKXiWQJ-jMLkmYWbzk3E8ZVkTJHg6bSkNKhnhFBfZ-ax1WIEuGexPSYJmjv_Lrsqe5L5XyHbjYWlADG_XFB3PYGp8lm_zUfxNTrD-Psw8n9Mx_thA3yCJLDgPUc5qd3YZMuTssDGGAuwuhVgvK2slzUvUsBwDI_sNGXFWj',
      verified: true
    },
    hasUnread: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDb6MefPnMSJ-T2rlR1ozLQHaE5inYy75cl0VyCnaVk_0sbcH9_smTINGrbuWzEp_Hcrb83nrCJUFXD4kLd-q-TvE13vWi4iSMEfybq1gBKIM0I7G9pG62C2qSAagO7PwkX0GSuEESnb3L0316zx38GonnkAcomZgmXaZWPyI7F06MCHrbplkfCSl1V7dt7uqNptLj_hWTQh5cGYgf_qggKgGMCGp_qKGzFLtMCA-OHYzIKebnILJ0z',
    timestamp: '۴۵ دقیقه پیش',
    caption: 'طراحی هویت بصری پویا با الهام از امواج نور 🔮'
  },
  {
    id: 'story-2',
    user: {
      id: 'navid-karimi',
      name: 'نوید کریمی',
      username: 'navid.code',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAf3xgQM2Y5VzA8cJdi9hdEE_x0u7I4p0aheBt5fiYwdIZGLFu1Oy09dG4_hqRFl1b4kuNq4veaMB3IEGHQQffvzpeYXu-zZMVWPthcvO7an7ev9hHeS7Rr4EjWT--TpnncRCxccFOE4Uz07if2chmdv-Ow0MP_gfqF-4SFj20Sm3EkBVxK8y689agBOMLnUh9FynSOK3gcvV4mVZoTH06TtgEp329EbNm0aTZTmzLV4nmzmeLNQZJq',
      verified: false
    },
    hasUnread: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDae1uTtGQUs5Pi6QHf1LTBVpRa4Tj4O4mW3oP5KvBQ6M8w_QfBQ0UAdWiOvShCZxjPCz7wY1EqrYsdHsiAXG2P599JWMcDYuAXyH-NtW0bs9ZMAJpkUt2reBQt2IXbJXiY9tqOfoZwdssuPfQsHPHLKHHq12scC_Odw2_zPBs9SBZhyTQ5EdUONxOBOhJ28u6EyKxNC8v7YVzxlZWzw5FL6O7QZf3ZytjnNSVk0K5BfP5N-SCaDCdz',
    timestamp: '۲ ساعت پیش',
    caption: 'کدنویسی قابلیت‌های ریل‌تایم روی وبساکت ⚡'
  },
  {
    id: 'story-3',
    user: {
      id: 'taraneh',
      name: 'ترانه مهدوی',
      username: 'taraneh_m',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAHu-Yh-Hy65wLiqUiVQK6ti4EdLNUUHqekz5yjiGt-SoV4UVn5DgpwzOUQWVbHuSOZPYsLCl9VcqXcWYGgZfAMjF120bYDRwRSGZ6MvL6dO68BmXJk9tH5_TFNRmLg3usj-lueZGXhtUCYUo17DOoxoLypcfJtsrp8Ghcefs8PaeAyCw6-RT7JY521vIMP1sTL9AJBzV7K-AXuqyBFNvxfqCUpC8bTyJIpqWP_jbL-gLpCC_h0-gQI',
      verified: true
    },
    hasUnread: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBzMDnRYwgjdUw6om9sWVMGHXBYIYwK7c2X8kGFUxeBAbKa9EQiSr4FVG8hmmJ6aVDBI58n9joWUxlsNJqVa0H2uj6l_AWs_KMZGAZW0zk3h1iUVJx42v5MIXcWpnDhV94AtX0jhGlzPi_H4jps70SBfN_3magGoNeAVXt2VMCmspZizsk-fEAw9KNVxm7oBsMIFJOHbcPqYDaD09efl50TAXdmvMDM7bkbul8NvcGgUueKspycu5p3',
    timestamp: '۳ ساعت پیش',
    caption: 'سفر به دامنه‌های دماوند در هوای مه‌آلود پاییزی 🍂'
  },
  {
    id: 'story-4',
    user: {
      id: 'amir-arsalan',
      name: 'امیر ارسلان',
      username: 'amir_arsalan',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDzf9ikneRLimP2-N9R-BTQxGynadgA4qDQoKeLYi3Tt4pTGLSBWO4-eu0LFkj2hobj3t4lAGk03rLd3buBAfYjqJNiEhGC6k-aYAhHRBX6afSqnPGsLVhtHxbzjLKp69IMDTFj4bp7VpZOVe0AJkiMwkmyVvLK_NQpT0rC_95thxCuHlm2K7C99JK9DCxyUZOQKWngDnKgu7Z6Vi6qVQMpM7l2MWmWzb019PxxHkq5zEIx2-MmtlmW',
      verified: false
    },
    hasUnread: false,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCOWoyjssYdgtQfvXHhecqWhCwl8ktGxNUMEOCBgNhtOu-CextGHshLfMdXk--gvFT9EuulCsvc6kC3aTH8eFaDr1C1O2AJnb4LNRGZ8hv0wmTrqaxzS8kFvax0tZivMEeq1e5KJy-egt3tLJM82zW1VL9MRZUftP-hDqyDm_yMSOC6W0tqLlW_prJDRM39S-S2jmAuuEb37u6vFB7FNTcqWmfLOMFyqTBiM-k1I6jB-Jk9odf970Cn',
    timestamp: '۵ ساعت پیش',
    caption: 'طراحی مینیمال استایل پاییزه تهران'
  },
  {
    id: 'story-5',
    user: {
      id: 'studio-design',
      name: 'دیزاین استودیو',
      username: 'design_studio',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCnaJKqwXD8KHHoBwNQEpCfmeQrfVZInsxJsNDB4b4J2K67dp2f8CdaiGXi11Z3UW1yZsiOiicKGPhhM4yas6yNjI1rSg9oSvZJJQjs4r36neBXCeGr47kehKkXVG6Fg9Uo-fYljiBCkUKhUrf1hcye__Nx87NsFyhBGy1MsdxPLFE0FaAtPBPwd-RKfc7YOPY55zXm-LCxcM6PKBHj1iQ62gNLv_G0F8G0AHvFg5F6oaCi0G8Jwi2u',
      verified: true
    },
    hasUnread: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBjK9uFLC9qSp3eA9JE-2-ByxX8PGO18qtoVUsoqEk9rWYQguvVUrMByHZHR1vNxE7qztZ59p2xhq6J6H-2K_hvGB_Hv8zSQUo0hzdwW6EpihbHj7PMpxFVUIFTJOwmn2PJHf9Nbj0IMOIucIlnu-nB8QSX-R5zdbotXkfh4PWmtpqgSONjp_r933jSg7gsX8YKDgMcDds3_gV-knRiuFKEQ5Z5oAn-zD3fgTDbPbXwvFSfc7GfJttd',
    timestamp: '۶ ساعت پیش',
    caption: 'بررسی پوسترهای تایپوگرافی معاصر فارسی'
  }
];

export const INITIAL_POSTS: Post[] = [
  {
    id: 'post-1',
    author: {
      id: 'nima-kian',
      name: 'نیما کیان',
      username: 'nima.ux',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDy3GArCRUHuTla3lr10ZaEYETL7Z9LIVLHo_1TZ2Hko-rFjaSOP3qbS5F2GpESxZ7n4AGfoGzEUmqo2Zu5gRlZQf2Fa8dIwmX5ZClSGAZvZHwStu7VV_deBheBrLB3vxsdB-y7NfqiOEVxBYU7KldeHsQd2wjDMnvASCuuOrHb2toAPwK4-RQVVFMyGBpJHuMFVfZ6kByGB5soxTAGqpww8gKNcfZ532Sj-aXksOdxlne9_12l8H8q',
      verified: true
    },
    timeAgo: '۲ ساعت پیش',
    timeAgoEn: '2 hours ago',
    content: 'تجربه بازطراحی سیستم ناوبری موبایل با رویکرد مینیمالیسم و توجه ویژه به اصول نگارش و ارگونومی راست‌به‌چپ (RTL) 🎨 نظر شما درباره ساختار بصری جدید چیه؟',
    contentEn: 'Mobile navigation redesign experience focusing on minimalism and right-to-left (RTL) ergonomics. What are your thoughts on the new visual hierarchy?',
    hashtags: ['#طراحی_رابط_کاربری', '#تجربه_کاربری', '#مینیمال'],
    media: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC2fm6wXnCR5BNEKUGTMkGfi3Bp-2ibKnXpGppA_RkwiFkFRdSKVq8Cw7htlEOkXhU_0Gia6YHrlvizyB0SgIKRUbu-6n5tvi9cK5aH2qe-zo2NmIHuY87kx1VdZhecIGWLXL1Cvuk_t9gXDEG06xCEMMrs0znsBro9HRYSlE7xRT5w4Uoz_XN3jmeTdKbExnFf8eUDvlvYExYUZ6tFAdCzfK2BfPuSCtidZiAztSfHKUM6cWHewwNy',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC0r98DvhasLPmH4u3TpuQgANuyIdDINzE4HQxJh1Gr0zH-uhuXt6wgUYoZeHo5xVBfLAx7l_8_gYIUIWeDU6o6JUwZThOokTUYzx31zTGTMvsdphfYdBGq-s73gVAlcjsDGUN3BSuOuROSnzBJJ12g_HD2XQEazE63WPrN-Lrd11X8CcHmKNIP3MWLbI7uNmG2JWuj52EW_IFWtGj_tPGpGQWWi8yNki4kQBlhP27CwfRsw1_r7qll',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDae1uTtGQUs5Pi6QHf1LTBVpRa4Tj4O4mW3oP5KvBQ6M8w_QfBQ0UAdWiOvShCZxjPCz7wY1EqrYsdHsiAXG2P599JWMcDYuAXyH-NtW0bs9ZMAJpkUt2reBQt2IXbJXiY9tqOfoZwdssuPfQsHPHLKHHq12scC_Odw2_zPBs9SBZhyTQ5EdUONxOBOhJ28u6EyKxNC8v7YVzxlZWzw5FL6O7QZf3ZytjnNSVk0K5BfP5N-SCaDCdz'
    ],
    aspectRatio: '4/3',
    likesCount: 1420,
    commentsCount: 84,
    repostsCount: 42,
    isLiked: false,
    isSaved: false,
    badge: '۱/۳',
    comments: [
      {
        id: 'c1',
        user: {
          id: 'user-sara',
          name: 'سارا نظری',
          username: 'sara_nazari',
          avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuANdrmiuPR8lfGzqVScvxWI5eL0sNva6knf3c6I_MhtGfTy32dEwyuc6pOLPobJ09ZijrV3XFQIwxiWPcMKXiWQJ-jMLkmYWbzk3E8ZVkTJHg6bSkNKhnhFBfZ-ax1WIEuGexPSYJmjv_Lrsqe5L5XyHbjYWlADG_XFB3PYGp8lm_zUfxNTrD-Psw8n9Mx_thA3yCJLDgPUc5qd3YZMuTssDGGAuwuhVgvK2slzUvUsBwDI_sNGXFWj'
        },
        text: 'طراحی فوق‌العاده تمیز و ارگونومیکه نیما جان! فاصله دکمه‌های ناوبری در گوشی‌های با صفحه کشیده عالی تست شده؟',
        timeAgo: '۱ ساعت پیش',
        likes: 12
      }
    ]
  },
  {
    id: 'post-2',
    author: {
      id: 'mona-soltani',
      name: 'مونا سلطانی',
      username: 'mona_art',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB15TtAvDy7tY8yv_62bH-fIqXp5JDK3dDiyng_IULKJbEerkTPseuXlxxRFE_8fIohcRNXDyiRd5zsAdpU9NZHKxarTvZR-Jouud9Ab8FJgfwY3igmyxytUufp022-H8k58zmE_m8Il0PIILJyzHZY7tf4xeJAkrwq9E7Ap1plTZLhMyJ2lsZs5Sd-tfdUyJl16cWN0oL42eynfe1tfgLy60Uk1y2H-NwVWHl4YdfjVdNnmVrriIVp',
      verified: true
    },
    timeAgo: '۴ ساعت پیش',
    timeAgoEn: '4 hours ago',
    content: 'سکوت غروب در حوضچه‌های باداب سورت... نور ملایمی که لایه به لایه روی رسوبات معدنی می‌تابه، حسی از آرامش بی‌پایان به همراه داره. ایران ما پر از این شگفتی‌های پنهانه 🌿✨',
    contentEn: 'Sunset serenity at Badab-e Surt travertine terraces. The golden light bouncing off mineral strata evokes boundless calm. Iran is full of these hidden wonders 🌿✨',
    hashtags: ['#طبیعت_گردی', '#عکاسی_منظره', '#ایران_زیبا'],
    media: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCtVEBkicFaFHodMjV6NJ4SC1YkSscBoU6IBZzkGsDnxkkuJkJD2GVKoBqZDxw9R6tVdJXDKtjPJwM2rPhwRY3o5XeoA1UwrJgAVA6ZhmaBJnMF5TSIkJS8XG--Px2NhdXpZYhwvbk7EoOPQOrzxtVUP2LIDWLT007MdmtADHmLv9IeIoBeGA1107vcH3-bCZMkxXcH8ls3svqBqHjmxORC0Lhlc9F6q4zFGVM5XzrTkv6SCqaGMIjm'
    ],
    aspectRatio: '4/5',
    location: 'باداب سورت، مازندران',
    likesCount: 2895,
    commentsCount: 156,
    repostsCount: 67,
    isLiked: true,
    isSaved: true,
    comments: [
      {
        id: 'c2',
        user: {
          id: 'user-saman',
          name: 'سامان افشار',
          username: 'saman.afshar',
          avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAhicXOFv8l0LzUpL3wgci_5OEy-NEaRJMLGaAD8_RgRL_QPlQJvrxlSmYDjSRBcnQt0vdFbldy3fRXoZxIEAWViJq42W_Pn2GG30Aba8qTcnNNlRXNlLLe6mnmD9mQLQtUhaHWsy9_c3RtSpVJBlccIEiSVNeQ-iXVOoDTMgYuAFxPPLL7Z0oY2wycTw2MLkTzY3ziIugY1-CCko1yvGy6POx25bQESuyt9AJkXLQirndAzIrmq0G8'
        },
        text: 'رنگ‌بندی این شات بی‌نظیره مونا جان، با چه دوربینی ثبت کردی؟',
        timeAgo: '۲ ساعت پیش',
        likes: 34
      }
    ]
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    type: 'like',
    user: {
      id: 'ali-rezaei',
      name: 'علی رضایی',
      username: 'ali_rezaei',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAhicXOFv8l0LzUpL3wgci_5OEy-NEaRJMLGaAD8_RgRL_QPlQJvrxlSmYDjSRBcnQt0vdFbldy3fRXoZxIEAWViJq42W_Pn2GG30Aba8qTcnNNlRXNlLLe6mnmD9mQLQtUhaHWsy9_c3RtSpVJBlccIEiSVNeQ-iXVOoDTMgYuAFxPPLL7Z0oY2wycTw2MLkTzY3ziIugY1-CCko1yvGy6POx25bQESuyt9AJkXLQirndAzIrmq0G8'
    },
    otherUsersCount: 12,
    timeAgo: '۱۵ دقیقه پیش',
    isUnread: true,
    postThumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDn2C9W6Cd0M9gLLf32uqkQUvwK4TPa7HQ7uvwxwTNHYPIG4ACm31edrPINuVbDAPkYWkMaAk4DWmZH8Jbz0ELNhAHrPCQRd53qkKg92AJ35GFLSH3XQprnKCMUh7Y1x-94vigB30xIzRUWikrATLMyIAro3Bh7peRPQQiDF4wnZGTL3sqz-nqqTBY8cLv0wFDA3rTyH5eoLtLKx274ZiVrHOp3g4aQP8lw-Mdh--1bXgaO9Wm2RFSX',
    category: 'interactions'
  },
  {
    id: 'notif-2',
    type: 'comment',
    user: {
      id: 'sara-nazari',
      name: 'سارا نظری',
      username: 'sara_nazari',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCFB3OpFGKHrmIkQDNUr100GL8fTmpA9jDfvu8jkmfBvqFNXkDg7s09ZBTwP5C-04UhLgzwsczxQOUr7dg_bsQY8UGI_LRgWhE8l8Q9IxWpRzM-AGBiu3qhuyWhwodYr-SZpvbB1mX1J1TcVzs1vUhUh2PEeOIcbf5fa9RUCUFSeXkJjCB7a9_pMug79C2B_L9K6f0wJBUH3nwGXRkbiHXS_n8ZhbE9ol1aLvWPME1W7-JjxfWC9E3h'
    },
    commentText: '«طراحی فوق‌العاده تمیز و حرفه‌ایه!»',
    timeAgo: '۱ ساعت پیش',
    isUnread: true,
    postThumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDb6MefPnMSJ-T2rlR1ozLQHaE5inYy75cl0VyCnaVk_0sbcH9_smTINGrbuWzEp_Hcrb83nrCJUFXD4kLd-q-TvE13vWi4iSMEfybq1gBKIM0I7G9pG62C2qSAagO7PwkX0GSuEESnb3L0316zx38GonnkAcomZgmXaZWPyI7F06MCHrbplkfCSl1V7dt7uqNptLj_hWTQh5cGYgf_qggKgGMCGp_qKGzFLtMCA-OHYzIKebnILJ0z',
    category: 'interactions'
  },
  {
    id: 'notif-3',
    type: 'follow',
    user: {
      id: 'navid-kazemi',
      name: 'نوید کاظمی',
      username: 'navid_kazemi',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBbWF53G8-DYUKBk1J_eHvr9TT8hHGUG6o6-W_3P6iPylgoyLo6C-piKraeSZvZvA_a4FgDZW-JymU4Ba5nOLAlHbu6Kok6ioaKsx4nrCLTEMxDOZ_fnxg7Mc_-lCbLIRDsiyJoDUtRiX0ld94IjOqYokg-lDBgJ3fzc0o-DnNz3jxQTrXgVfZMF1Bar2EkKhcgmdevb_A1bzUyzlotyD_vfaati1zVU3Z9-wlsd3sfvRpYDYR--bK1'
    },
    timeAgo: '۳ ساعت پیش • دنبال‌کننده مشترک با علی',
    isUnread: true,
    isFollowedBack: false,
    category: 'followers'
  },
  {
    id: 'notif-4',
    type: 'mention',
    user: {
      id: 'niloofar-abbasi',
      name: 'نیلوفر عباسی',
      username: 'niloofar_a',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCB_6rjMQLzYNqRKrBgu4zeD_FaCsURfHcm1sMKL7yqQTRi29ebSnEH6ylEzVp-fc07A0ysETbitgOUUMa1Cu0uq7cM1BcYgdsZGY6bzCTYGneL6Xie37UZTFRnUj284BFC5x2bZhzSorYnAra1Cc0mi1MO1IphMu6upyuFtbsdPDBwqNgU0yPSQug1S3cJbrkSSElHmzGd0gERvnGOc9Yy-sNi5XD6OO5dkGvNRupzuf5iJ35m6DvX'
    },
    commentText: '«نمونه کارهای @dorsa_design دقیقا همون حسی رو داره که تیم ما براش دنبال ایده بود.»',
    timeAgo: '۲ روز پیش',
    isUnread: false,
    postThumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBN7g61AVi2GoKWCKCvZ52-fwQzixxMiCJbBgapT0IFYYaWNJL-0hAYgJaUjE3UDsx7YVdtrlGpaoV_wzMLgA49AHZ-ra6DLb2iaVMrH5gOu0qiuf0FC7WT5NOf-u8qGEuZSImB-MJt9FHAqFVG4u0i971r_vfw-FzPGYHZF82Q0xyU6UmLw5E-q1pXLqKIWtCZXfvoNLigFDsLSyxMt1tqwOZB9ezf_xRr1XG05gWvsBTaFkMCN3DU',
    category: 'interactions'
  },
  {
    id: 'notif-5',
    type: 'milestone',
    milestoneTitle: 'پست شما به بیش از ۱,۰۰۰ بازدید رسید 🎉',
    milestoneDesc: 'این پست در صدر بازخوردهای این هفته شما قرار دارد.',
    timeAgo: '۴ روز پیش',
    isUnread: false,
    category: 'interactions'
  },
  {
    id: 'notif-6',
    type: 'system',
    milestoneTitle: 'به‌روزرسانی نسخه جدید آئورا',
    milestoneDesc: 'نسخه جدید با قابلیت تماس صوتی، پخش زنده و ارسال تصاویر Ultra HD برای حساب شما فعال گردید.',
    timeAgo: '۵ روز پیش',
    isUnread: false,
    category: 'all'
  }
];

export const TRENDING_TOPICS: TrendingTopic[] = [
  { tag: 'طراحی_رابط_کاربری', count: '۲۴.۵K پست', category: 'دیزاین' },
  { tag: 'عکاسی_خیابانی', count: '۱۸.۲K پست', category: 'هنر' },
  { tag: 'هوش_مصنوعی', count: '۳۱.۸K پست', category: 'فناوری' },
  { tag: 'استارتاپ_ایران', count: '۱۲.۱K پست', category: 'کسب‌وکار' },
  { tag: 'معماری_معاصر', count: '۹.۴K پست', category: 'معماری' }
];

export const SUGGESTED_CREATORS: User[] = [
  {
    id: 'sug-1',
    name: 'پرستو شایگان',
    username: 'parastoo.ux',
    role: 'طراح ارشد تجربه کاربر',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDnVRZqOBdi52eWKidFU12Mh_cFr0-f47Lv8zZPjTLc-SISw-4j0Hz6J8LXKvE8tSykHKgtKVbKuJtEISoggoR1NaC0WmcUnznM-7LlAEF6rY8-sCvZSZRkj5fC_B9JkAdgMnfC6eJTtnp9taw_umlZj5E-Ht4_pxMaFzVXSlwB10-YIS9Zt7Q1WI1sX_ofkZd9WqmIFL_QHa9UYqVlncCe0GvyDA8bh-corUo94-Zp46tJmAtHdqXS',
    verified: true
  },
  {
    id: 'sug-2',
    name: 'کیان آذرنیا',
    username: 'kian_arch',
    role: 'عکاس معماری و فضا',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAu6fisccKJbQWcSJJJL2q3kLMCe6spFA-AJBfF9onxhsGpLjJJkJC8OifMs0Ja2hkQWN4quhZO2AQ2mAAeGtE4OEfFMFFAwQLldVjkccIL5EJXdH94JZC4Dd0oib5XImH2-5wuwoK7LXWNgKMtF-779FXeRbIaMcbMR7Jw8hBFETcp4Y6Z2QA2F9vQSLi-VVzU6YSDj0z2m2lUbaGT04DffrL3YJ97S_8uAabdudfZbs-NLd1asm_e',
    verified: true
  },
  {
    id: 'sug-3',
    name: 'نیلوفر کیهان',
    username: 'niloofar.ceramics',
    role: 'هنرمند تجسمی و سفال',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBF9OfN8XUw6H1SYIrHAGCQ3JjW2dP503lXuVZMjJuRgDjM5YYP6VUZxrd3w7C6Q3nSPkyqfLM-XTm3GSdbpPM5bPVKMQI3xLR4OFjiFU4L9pp-Wagld9jt0XbTDhYv9H7-LKcyE6heKuHxpzD7i0352Ye5iiuP8IBDPc9kCD3QHlfvh1Pd_PLYxOlpUz9SKDu479bUVEbkpvnkUIan40A5ekl00sal9eQsqr-XPIiqGZBWwZU3OIFi',
    verified: false
  },
  {
    id: 'sug-4',
    name: 'بردیا رستمی',
    username: 'bardia_ai',
    role: 'بنیان‌گذار هوش مصنوعی',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC2EJiZaBCi1YWwLoB6KvQrbInLE_0IsHilOmX4-Hal_NDFnN5_4hCHYVYcRZ9SZG60S-ktBDePeWHr--Ytj-P3UuGX8vQMtoYkod3AAsdaDwBsDr9jbV55NvL9D8azlC5YXyTwKeWYYbACwCzfmBDblmJHue8CEarL7JeVa6OhMuas6fzFr-czmDddloINlfwXQOw-voVUPlhSwq6AoIGrrlC66Q256hsaXFRQWnLZeBI8jYqUbiXB',
    verified: true
  }
];

export const EXPLORE_MEDIA_ITEMS: ExploreMedia[] = [
  {
    id: 'ex-1',
    title: 'معماری نوین شیراز',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCfmxKKU01qwUpmLEodSr__3jGhu6Y_hFew5s2BpyJxE9DBoP1YJmPvKmg4gts-Wyt31EbtGO0sZ89ZMynUrZWJkYB13Rgu4Kjmo1y_h9bxKVxDvU9zGZsKbyXJBmyPI4jz_To9z1C7_x_Qbo1i2w9NjUJ7haA9uLt_5riKgZlPPGWBeyUNJGCRNFsLWk59KVe-dQSFLcIxcX8NG2nFUScDEr593blbEU-zWaslaNSbCBmkBD14Q3tn',
    type: 'video',
    duration: '۰:۳۴',
    likes: '۳.۱K',
    aspect: 'aspect-[4/5]'
  },
  {
    id: 'ex-2',
    title: 'دیزاین سیستم آئورا',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDae1uTtGQUs5Pi6QHf1LTBVpRa4Tj4O4mW3oP5KvBQ6M8w_QfBQ0UAdWiOvShCZxjPCz7wY1EqrYsdHsiAXG2P599JWMcDYuAXyH-NtW0bs9ZMAJpkUt2reBQt2IXbJXiY9tqOfoZwdssuPfQsHPHLKHHq12scC_Odw2_zPBs9SBZhyTQ5EdUONxOBOhJ28u6EyKxNC8v7YVzxlZWzw5FL6O7QZf3ZytjnNSVk0K5BfP5N-SCaDCdz',
    type: 'carousel',
    carouselCount: 3,
    likes: '۱.۸K',
    aspect: 'aspect-[3/4]'
  },
  {
    id: 'ex-3',
    title: 'طعم هنر مدرن',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBdK4mq8qV6X2bccxZxf9s5zFcWgYU14EjA-luTYG_fm_TaSc9T2qmHUfX0oeJrojve-3s6fANbyWt_yk0FVIvdw1tqgq-bSbHeaSFe0o9hIjHN5WtGg8IzsQw9-lVLUVYYh8JqGWhDn42iEPnA-YjnRuUwNqM6YXceOAqbx7BL2X3rJ71Iwx4_YoLPM-IzpKzxbuv4kZVsdU7lWWjXGie4q5o3hQLEVE7nP3YSGlm_qXrcO2U_qbgX',
    type: 'image',
    likes: '۱.۴K',
    aspect: 'aspect-square'
  },
  {
    id: 'ex-4',
    title: 'تایپوگرافی معاصر',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBjK9uFLC9qSp3eA9JE-2-ByxX8PGO18qtoVUsoqEk9rWYQguvVUrMByHZHR1vNxE7qztZ59p2xhq6J6H-2K_hvGB_Hv8zSQUo0hzdwW6EpihbHj7PMpxFVUIFTJOwmn2PJHf9Nbj0IMOIucIlnu-nB8QSX-R5zdbotXkfh4PWmtpqgSONjp_r933jSg7gsX8YKDgMcDds3_gV-knRiuFKEQ5Z5oAn-zD3fgTDbPbXwvFSfc7GfJttd',
    type: 'image',
    likes: '۲.۹K',
    aspect: 'aspect-[4/5]'
  },
  {
    id: 'ex-5',
    title: 'استایل پاییزه تهران',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCOWoyjssYdgtQfvXHhecqWhCwl8ktGxNUMEOCBgNhtOu-CextGHshLfMdXk--gvFT9EuulCsvc6kC3aTH8eFaDr1C1O2AJnb4LNRGZ8hv0wmTrqaxzS8kFvax0tZivMEeq1e5KJy-egt3tLJM82zW1VL9MRZUftP-hDqyDm_yMSOC6W0tqLlW_prJDRM39S-S2jmAuuEb37u6vFB7FNTcqWmfLOMFyqTBiM-k1I6jB-Jk9odf970Cn',
    type: 'carousel',
    carouselCount: 4,
    likes: '۴.۲K',
    aspect: 'aspect-[3/4]'
  },
  {
    id: 'ex-6',
    title: 'طبیعت شگفت‌انگیز دریاچه',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAVHFosdHTjm4ICc-z9gTWGjhaYrJ3PjDnQMTJOG8hjPZJu8vzhv4fJ94yKM-B9EdpaSqIdtiv-KeZtjvZoca1yF0H4I3LRWKMve5mSzmoOC5H5AUyDlW8Nv9OCuc5VpO6iX2aTOOviX8aR8ESo4qGeiYxMng-Ubl6_q3Gd3wUiDtV_F6T4n26T_JO6ajf4oZCwRp00Vdy6Ri66B3-eQ_JVNvSU_S7Vemfn8w2N5TrfCKJb8kB7KVbp',
    type: 'video',
    duration: '۰:۱۸',
    likes: '۵.۰K',
    aspect: 'aspect-square'
  }
];

export const PROFILE_POSTS = [
  {
    id: 'p-1',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAvPwQ3BYFc-bEna4t_Tp4GuVLoxJjwAd9tGe2PZXvIirhvtTxa-_rzP7YnBxnGasP8RK1zV2psaDHP3RecDYwq5zpK6fOlVt86cuuGHJ4A_BteoWLUYr3WCAeeoAub0JznPG3lHSxbhS7RsXRVFDLWOU_j1oM4kDzu1Oytt3ZDPH_C-ugpzCdZGVYj1dMhy60s-K5iAhktEdnxs5PqhIsgs8CyPjJOX3Ea1iRDvohd047eCD863mXn',
    likes: '۴۲۰',
    comments: '۳۲',
    isCarousel: true
  },
  {
    id: 'p-2',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDwgfx-2Tx0sXBmTOt8oiPJT4W_EHf4aaZWEpHVHfnblR6LscTXJSUa9miy9VqBkyHeADNwl98u3cnHfuTcNzsK07OUuL5snS1aCZCnlKWn-b1gvk54xRbcq3_hLXuEpv4cyN5P346mB9QJFECiS-mvUi3aJtLPTPOVxnOlwV13NLpusY4v9TouSdE_KBEwP99PSfInCvEqfH1dDCwSJr5Wbjj7vd2-Jj2JXAp239Zj4jS6aOGl1Hh3',
    likes: '۸۹۵',
    comments: '۶۴'
  },
  {
    id: 'p-3',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAbX8KF2bWNdIT36k-6U0I0Msu7ok3worjyTmhuqTHMJj5w1jIUitmCSFYsZ7B5_4tUtiRPxxoz5nGavD3AoCUDmMjaKZowdfHZMWm5QNHrQ2iRaMiYM8tYTiHAsXJsr0CzJ4PEOuwvFGfStljR3S-0ad5tievhZIh1E2GR4FT0-eGmTP_r_UtZq_Afbu0QeZ86iPaty-MwvyFXZVA6Zc5VSYrafg6oDt09hR9eY7lAV6irSGklD3J1',
    likes: '۱.۱K',
    comments: '۹۸'
  },
  {
    id: 'p-4',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDX5FBUmjHOkYdq5OvEyIvFt3Jd5hP1w8jG-3ltz1Rod8ki8xfyAU9hI-m-3F6vAdFhJUH1nKNZ8CZnyZ9jHP57COHlzoBGtw-zVnMxHyBDIWc6QRXiKshpTdB0U-tpp767bI0aUvf6OZSI6CrkZydBWH1g_iRMSoMfIBVE-2MysI-Ihqk1-7EGW55jMsefSvPTEkM4Cr6eDz8FUz76MkXaj2Bz9yQHMGaqN2JANt_yIsBhUM6p4Yjb',
    likes: '۵۳۴',
    comments: '۴۱'
  },
  {
    id: 'p-5',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDy6Taguv9SJMcO4T-73C1OfZTgDlewexi6EeQxjpHQ0a7jNRkLPBEDsYMhDO47gHKV7lH-DShmjCSlC9ED-o5UuOM0RGsO_aAVGm7rfT7EBhvMAyDQUvGCd7UDzIpaozs-WvP0deQ1yOCvL_SQagaalfQc9-JrDlwGAFOJi_CqnDICXuP7JjkHj4zaJvS_3D4h-QKBUWdx1_MZUnJTAm1fgiC1IcWurQB78o8m5mL0fDMvzkahVO4h',
    likes: '۲.۳K',
    comments: '۱۸۲'
  },
  {
    id: 'p-6',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDXfb0W3W1gq6mwVFH-6-l81iH-L98tZMQnvk_2kR5uBEgdH2j9tt23sksTq2STK7wr2fOm1cDIuEAC11Pb-b7SbuFRJY21GWb3FCSYuifmE6uMZujxjnMRZwbzYgFw4G_NxUXOotegUuSlMzsylVQKubm2STs4p8hs0BR8LZkbiGaiXXpUlIKw2AWU7SBW1xJL-qY5qk34YYJtuDQC90YRqoq-VPRneFJ38j9-3Xm6sbnuTLqh8l6a',
    likes: '۶۷۰',
    comments: '۵۲',
    isCarousel: true
  }
];

export const PROFILE_REELS = [
  {
    id: 'reel-1',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBdDr7U8y-Gv981IcvoZ9O1WYGl9CHiiqtryyGRkbsnFRU7t9MzIKX6UIYlDKrRjnY7Xwm69KPUvZLbNhDtAIv-CjJFWFYLfyRfTq0vUg1WIomgQJyxpsTWhBgWEKiv2llV5_6SIv9b8mIJiOKU0W35Z6AT6nku2G5M4QHyX4dtfYyaVAXGbdiwHVnA4O70WD6Ea3qVdmMOWjND_SnVpjPd1UIFMpa-fYbEq9lQ6jgecwoAkf_rCouo',
    views: '۲.۱K'
  },
  {
    id: 'reel-2',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBcdHHV93rbjZWPA20IZmQfT1i_XUhjLlaQDcpyj2sBPzS9C9M5SjwVuXy3NlNlaG_DVFzA488pIq3u7O7_qbjzmUpNmcrzU_2T_zdNWbtr-1vmSrpEbGOgnH1I-tww4nyqCkxnP62FykmP1L_4VLdV0qSicUCS8LUNpnt_b55fCCCGId4ERmiiMB8Vxq7NunIJ59oU_HueCNlUZHRtabHCRidfOj7IRjZqvAKOMohMQpzSz3TKok0_',
    views: '۸.۴K'
  },
  {
    id: 'reel-3',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDGUYtImKMWSgabNywgD1KD7kjyxbDAU0-RJNIKF0FlDE2l4q6CMx9asBwVhLk9w3GzaOueCxL_288sNX3XgvJtOu8gJ_gDY51bST4ldAVkSK9q9LoWCaNiuHvkPwgvSX1mtUjaEV9ZOXLjJnO8jP7vm-RDXD9ElmEY7MJYDxwK8PI6VX6EUXtlSO31vp_jLPlfpsXoAy3OM8jjzgeQvgvZQcC-G6rVGRBQFrPLK4_hqTJLFb6khaPY',
    views: '۵.۶K'
  }
];

export const PROFILE_HIGHLIGHTS = [
  {
    id: 'h-1',
    title: 'پروژه‌ها',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC0r98DvhasLPmH4u3TpuQgANuyIdDINzE4HQxJh1Gr0zH-uhuXt6wgUYoZeHo5xVBfLAx7l_8_gYIUIWeDU6o6JUwZThOokTUYzx31zTGTMvsdphfYdBGq-s73gVAlcjsDGUN3BSuOuROSnzBJJ12g_HD2XQEazE63WPrN-Lrd11X8CcHmKNIP3MWLbI7uNmG2JWuj52EW_IFWtGj_tPGpGQWWi8yNki4kQBlhP27CwfRsw1_r7qll'
  },
  {
    id: 'h-2',
    title: 'رویدادها',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAOv3GTucXHpZY1OULvl56dFWOrmXAaBtEls6YMtiphMS2hZ3X8sCBXHEN6iN4YbzpWRjeBf-1SegbZpwjRElA69O6u-RThUN1KUHP71ABjNdydj8zskw9Yno3gYbjcKQhowON8T7Y6MlYQ08aIqbpPQP7BdV5JJYPly0cbR1m3Xa2lmrS9wdtPzcIhsoHibhPx77ABuK1E11JYksW0XR6T_mV2k_eKURtlgiwxFavJQC1hwYHI8gwU'
  },
  {
    id: 'h-3',
    title: 'پادکست',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCvXcukgMkkqAKwXpfaaacsGkLAd3-jK3t0xf_pdWhwKZmPTDsGoj_3LEYL-Yk1SoqrUTHxthi3zRM7cTZfOfK9e7KKDHUCqSuPxeFp7tol-U4hl6fKhoEOBJPvRUIBxVQSboH5FIdMxWJSKknPkm_SWAVIrHPsEn5B1nDGjZSNKLN9eif8HYGUt2wR4oGfpj9cqHJmUyJjqFO-_txaWRvwc6BD5TBNKyzwoDleebdOoR_zYjMZ8K4k'
  },
  {
    id: 'h-4',
    title: 'نکته‌های دیزاین',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDeZzDjU8ksoifWF5wG-NwcrsJnDcyHRMFLKJkpbxPa16D2p2Vt69wqECDjD_mJOxt0cU4S8kx0sEUvAXMGfd7g_QwahsHJjuNIIqBPC2Hb5vycUCZuVj7Ehqx-0im6tYoODXKTHgtR1mOiffzahSoi2gxW3JsISE3QdEAuPO_XKZ3_7dKrJacHThcLvfyhZ9XT7r4BuRmJZ7S1u1Nq1yCxRPUcmdIPwfn8HsRqVT-URppbOmG2cx1c'
  },
  {
    id: 'h-5',
    title: 'سفر',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBzMDnRYwgjdUw6om9sWVMGHXBYIYwK7c2X8kGFUxeBAbKa9EQiSr4FVG8hmmJ6aVDBI58n9joWUxlsNJqVa0H2uj6l_AWs_KMZGAZW0zk3h1iUVJx42v5MIXcWpnDhV94AtX0jhGlzPi_H4jps70SBfN_3magGoNeAVXt2VMCmspZizsk-fEAw9KNVxm7oBsMIFJOHbcPqYDaD09efl50TAXdmvMDM7bkbul8NvcGgUueKspycu5p3'
  }
];

export const HIMORA_INFO = {
  name: 'گروه نرم‌افزاری هیمورا',
  nameEn: 'Himora Software Group',
  phone: '09354467269',
  phoneFormatted: '۰۹۳۵۴۴۶۷۲۶۹',
  description: 'طراحی، توسعه و پیاده‌سازی حرفه‌ای اپلیکیشن‌های موبایل، پلتفرم‌های ابری و وبسایت‌های مقیاس‌پذیر سازمانی.',
  services: [
    'توسعه اپلیکیشن‌های نیتیو و مدرن موبایل (iOS & Android)',
    'طراحی اختصاصی UI/UX و سیستم‌های طراحی برندینگ',
    'پلتفرم‌های تحت وب پیشرفته و سرورلس',
    'پشتیبانی، مقیاس‌پذیری و مشاوره فنی تخصصی'
  ]
};
