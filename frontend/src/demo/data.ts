export interface DemoUser {
  id: string
  phone: string
  name: string
  avatar: string
  role: string
  birth_year: number
  region: string
  cognitive_level: number
}

export interface DemoStoryImage {
  title: string
  era: string
  image_url: string
  source_label: string
  source_url: string
}

export interface DemoStorySection {
  era: string
  title: string
  image_url: string
  source_label: string
  source_url: string
  body: string
}

export interface DemoContentItem {
  id: string
  type: string
  title: string
  description: string
  media_url: string
  thumbnail_url: string
  cover_image_url: string
  era: string
  region: string
  theme_tags: string[]
  emotion_tag: string
  cognitive_level: number
  copyright_status: string
  voice_over_url: string
  view_count: number
  created_at: string
  gallery: DemoStoryImage[]
  story_sections: DemoStorySection[]
}

export interface DemoGameItem {
  id: string
  name: string
  code: string
  description: string
  cognitive_domain: string
  nostalgia_element: string
}

export interface DemoGameQuestion {
  question_id: string
  type: string
  content: string
  options: string[]
  option_media?: Record<string, string>
  correct_answer: string
  hint: string
  media_url: string
}

export interface DemoReport {
  id: string
  report_type: string
  period_start: string
  period_end: string
  memory_score: number
  language_score: number
  spatial_score: number
  semantic_score: number
  overall_score: number
  emotion_summary: Record<string, number>
  suggestions: string
  is_warning: boolean
  created_at: string
}

export const demoUser: DemoUser = {
  id: 'demo-elder-1',
  phone: '13800000001',
  name: '张大爷',
  avatar: '',
  role: 'elder',
  birth_year: 1948,
  region: '碑林区',
  cognitive_level: 1,
}

const now = '2026-04-18T09:00:00+08:00'

export const featuredTitles = [
  '钟楼旧影',
  '回民街的泡馍馆',
  '老火车站',
  '城墙根下的早市',
  '搪瓷缸子',
]

export const demoContents: DemoContentItem[] = [
  {
    id: 'museum-clock-tower',
    type: 'photo',
    title: '钟楼旧影',
    description: '从老西安人的进城记忆讲起，顺着钟楼周围的街景与人流，把几代人的旧时光慢慢讲回来。',
    media_url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Xi%27an%20Bell%20Tower%202024.10.jpg',
    thumbnail_url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Xi%27an%20Bell%20Tower%202024.10.jpg',
    cover_image_url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Xi%27an%20Bell%20Tower%202024.10.jpg',
    era: '1960s-2020s',
    region: '西安城中心',
    theme_tags: ['钟楼', '老西安', '城市记忆', '街巷烟火'],
    emotion_tag: 'nostalgic',
    cognitive_level: 1,
    copyright_status: 'public',
    voice_over_url: '',
    view_count: 126,
    created_at: now,
    gallery: [
      {
        title: '钟楼近景',
        era: '2004年',
        image_url: 'https://commons.wikimedia.org/wiki/Special:FilePath/%E8%A5%BF%E5%AE%89%E9%92%9F%E6%A5%BC%20-%20panoramio.jpg',
        source_label: 'Wikimedia Commons',
        source_url: 'https://commons.wikimedia.org/wiki/File:%E8%A5%BF%E5%AE%89%E9%92%9F%E6%A5%BC_-_panoramio.jpg',
      },
      {
        title: '城中心的钟楼',
        era: '2007年',
        image_url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Xi%27an%20Bell%20Tower%20%289912211844%29.jpg',
        source_label: 'Wikimedia Commons',
        source_url: 'https://commons.wikimedia.org/wiki/File:Xi%27an_Bell_Tower_%289912211844%29.jpg',
      },
      {
        title: '夜色中的钟楼',
        era: '2010年',
        image_url: 'https://commons.wikimedia.org/wiki/Special:FilePath/The%20Bell%20Tower%20of%20Xi%27an.JPG',
        source_label: 'Wikimedia Commons',
        source_url: 'https://commons.wikimedia.org/wiki/File:The_Bell_Tower_of_Xi%27an.JPG',
      },
      {
        title: '今天的钟楼',
        era: '2024年',
        image_url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Xi%27an%20Bell%20Tower%202024.10.jpg',
        source_label: 'Wikimedia Commons',
        source_url: 'https://commons.wikimedia.org/wiki/File:Xi%27an_Bell_Tower_2024.10.jpg',
      },
    ],
    story_sections: [
      {
        era: '1960年代',
        title: '那时候的钟楼，是进城时最认得出的方向',
        image_url: 'https://commons.wikimedia.org/wiki/Special:FilePath/%E8%A5%BF%E5%AE%89%E9%92%9F%E6%A5%BC%20-%20panoramio.jpg',
        source_label: 'Wikimedia Commons',
        source_url: 'https://commons.wikimedia.org/wiki/File:%E8%A5%BF%E5%AE%89%E9%92%9F%E6%A5%BC_-_panoramio.jpg',
        body: '很多老人一想起钟楼，先想到的并不是景点，而是“进了城，心就稳了”。那时候谁家进城办事、买东西、看热闹，总会拿钟楼当个准地方。只要远远望见它，心里就不慌。',
      },
      {
        era: '1970年代',
        title: '围着钟楼走一圈，就像把城里的热闹都看了一遍',
        image_url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Xi%27an%20Bell%20Tower%20%289912211844%29.jpg',
        source_label: 'Wikimedia Commons',
        source_url: 'https://commons.wikimedia.org/wiki/File:Xi%27an_Bell_Tower_%289912211844%29.jpg',
        body: '逢年过节，或者单位发了票证，很多人总爱说一句“去钟楼那边转转”。不一定非买什么，更多是看人、看橱窗、看街景。那种高兴很朴实，却很长久。',
      },
      {
        era: '1980年代',
        title: '城越变越新，钟楼还是大家心里的老地方',
        image_url: 'https://commons.wikimedia.org/wiki/Special:FilePath/The%20Bell%20Tower%20of%20Xi%27an.JPG',
        source_label: 'Wikimedia Commons',
        source_url: 'https://commons.wikimedia.org/wiki/File:The_Bell_Tower_of_Xi%27an.JPG',
        body: '街道变宽了，店也变多了，可只要钟楼还在，很多人就觉得这座城还有老底子在。它像个稳稳站着的老长辈，看着人来人往，也替很多人的青春留了位置。',
      },
      {
        era: '今天再看',
        title: '人会变老，钟楼却总能轻轻托住旧时光',
        image_url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Xi%27an%20Bell%20Tower%202024.10.jpg',
        source_label: 'Wikimedia Commons',
        source_url: 'https://commons.wikimedia.org/wiki/File:Xi%27an_Bell_Tower_2024.10.jpg',
        body: '今天再看钟楼，四周早已很不一样了，可很多老人真正被打动的，还是它一直都在。它像个记忆里的老朋友，平常未必时时想起，可真见到了，心就软下来。',
      },
    ],
  },
  {
    id: 'museum-muslim-street',
    type: 'photo',
    title: '回民街的泡馍馆',
    description: '从清晨到夜晚，沿着回民街慢慢走一圈，把泡馍馆里的热气和整条街的人情味讲回来。',
    media_url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Xi%27an_Muslim_Street.jpg',
    thumbnail_url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Xi%27an_Muslim_Street.jpg',
    cover_image_url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Xi%27an_Muslim_Street.jpg',
    era: '1970s-2020s',
    region: '莲湖区',
    theme_tags: ['回民街', '泡馍', '街巷烟火', '老西安味道'],
    emotion_tag: 'warm',
    cognitive_level: 1,
    copyright_status: 'public',
    voice_over_url: '',
    view_count: 118,
    created_at: now,
    gallery: [
      {
        title: '回民街街口',
        era: '2020年',
        image_url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Xi%27an_Muslim_Street.jpg',
        source_label: 'Wikimedia Commons',
        source_url: 'https://commons.wikimedia.org/wiki/File:Xi%27an_Muslim_Street.jpg',
      },
      {
        title: '热闹的饭点',
        era: '2016年',
        image_url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Muslim%20food%20street%20market%2C%20Xi%27an%2C%20China%20-%20panoramio.jpg',
        source_label: 'Wikimedia Commons',
        source_url: 'https://commons.wikimedia.org/wiki/File:Muslim_food_street_market,_Xi%27an,_China_-_panoramio.jpg',
      },
      {
        title: '边走边闻香',
        era: '2016年',
        image_url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Muslim%20food%20street%20market%2C%20Xi%27an%2C%20China%20-%20panoramio%20%281%29.jpg',
        source_label: 'Wikimedia Commons',
        source_url: 'https://commons.wikimedia.org/wiki/File:Muslim_food_street_market,_Xi%27an,_China_-_panoramio_(1).jpg',
      },
      {
        title: '街上的夜色',
        era: '2004年',
        image_url: 'https://commons.wikimedia.org/wiki/Special:FilePath/%E8%A5%BF%E5%AE%89%E5%9B%9E%E6%B0%91%E8%A1%97%EF%BC%8C%E7%83%A4%E4%B8%B2%E5%B0%8F%E5%A4%AB%E5%A6%BB%28%E7%8C%9C%E7%9A%84%20-%29%29%20-%20panoramio.jpg',
        source_label: 'Wikimedia Commons',
        source_url: 'https://commons.wikimedia.org/wiki/File:%E8%A5%BF%E5%AE%89%E5%9B%9E%E6%B0%91%E8%A1%97%EF%BC%8C%E7%83%A4%E4%B8%B2%E5%B0%8F%E5%A4%AB%E5%A6%BB(%E7%8C%9C%E7%9A%84_-%29)_%20-%20panoramio.jpg',
      },
    ],
    story_sections: [
      {
        era: '清晨',
        title: '街口刚醒，第一锅热气就把人心勾住了',
        image_url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Xi%27an_Muslim_Street.jpg',
        source_label: 'Wikimedia Commons',
        source_url: 'https://commons.wikimedia.org/wiki/File:Xi%27an_Muslim_Street.jpg',
        body: '很多老人最先记住的不是最热闹的时候，而是清晨那股刚醒来的劲儿。锅火一开，整条街像被轻轻叫醒了。顺路拐进来闻一口香气，心里就会觉得今天这一趟没白来。',
      },
      {
        era: '晌午',
        title: '到了饭点，泡馍馆里最见人情味',
        image_url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Muslim%20food%20street%20market%2C%20Xi%27an%2C%20China%20-%20panoramio.jpg',
        source_label: 'Wikimedia Commons',
        source_url: 'https://commons.wikimedia.org/wiki/File:Muslim_food_street_market,_Xi%27an,_China_-_panoramio.jpg',
        body: '掰馍这件事，在老西安人心里从来不只是吃饭，更像一种耐心和认真。低着头慢慢掰，旁边坐着家里人或老朋友，边掰边说话，时间也跟着慢下来。',
      },
      {
        era: '下午',
        title: '吃完饭别急着走，顺着街再逛一圈才有味道',
        image_url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Muslim%20food%20street%20market%2C%20Xi%27an%2C%20China%20-%20panoramio%20%281%29.jpg',
        source_label: 'Wikimedia Commons',
        source_url: 'https://commons.wikimedia.org/wiki/File:Muslim_food_street_market,_Xi%27an,_China_-_panoramio_(1).jpg',
        body: '真正懂回民街的人，往往吃完泡馍并不立刻离开，而是慢慢再走一圈。看摊子、听吆喝、顺手带点小吃回家，这一逛，日子就过得有滋有味。',
      },
      {
        era: '夜晚',
        title: '灯一亮，整条街都像一锅热腾腾的人间烟火',
        image_url: 'https://commons.wikimedia.org/wiki/Special:FilePath/%E8%A5%BF%E5%AE%89%E5%9B%9E%E6%B0%91%E8%A1%97%EF%BC%8C%E7%83%A4%E4%B8%B2%E5%B0%8F%E5%A4%AB%E5%A6%BB%28%E7%8C%9C%E7%9A%84%20-%29%29%20-%20panoramio.jpg',
        source_label: 'Wikimedia Commons',
        source_url: 'https://commons.wikimedia.org/wiki/File:%E8%A5%BF%E5%AE%89%E5%9B%9E%E6%B0%91%E8%A1%97%EF%BC%8C%E7%83%A4%E4%B8%B2%E5%B0%8F%E5%A4%AB%E5%A6%BB(%E7%8C%9C%E7%9A%84_-%29)_%20-%20panoramio.jpg',
        body: '一到晚上，街上又是一番样子。灯亮起来以后，热闹更浓了。老人回忆起那时一家人进城逛吃，最忘不掉的常常不是吃了什么，而是那种大家并肩走着、心里亮堂堂的感觉。',
      },
    ],
  },
  {
    id: 'museum-railway',
    type: 'photo',
    title: '老火车站',
    description: '从送别到接站，顺着老火车站的站台、广播和绿皮火车，把一家人的牵挂与团圆慢慢讲回来。',
    media_url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Xian-Station%2007-2005.jpg',
    thumbnail_url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Xian-Station%2007-2005.jpg',
    cover_image_url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Xian-Station%2007-2005.jpg',
    era: '1960s-2020s',
    region: '新城区',
    theme_tags: ['火车站', '绿皮火车', '送别接站', '团圆牵挂'],
    emotion_tag: 'nostalgic',
    cognitive_level: 1,
    copyright_status: 'public',
    voice_over_url: '',
    view_count: 97,
    created_at: now,
    gallery: [
      {
        title: '站前广场',
        era: '2005年',
        image_url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Xian-Station%2007-2005.jpg',
        source_label: 'Wikimedia Commons',
        source_url: 'https://commons.wikimedia.org/wiki/File:Xian-Station_07-2005.jpg',
      },
      {
        title: '写着西安的站房',
        era: '2007年',
        image_url: 'https://commons.wikimedia.org/wiki/Special:FilePath/XiAn%20Railway%20Station.JPG',
        source_label: 'Wikimedia Commons',
        source_url: 'https://commons.wikimedia.org/wiki/File:XiAn_Railway_Station.JPG',
      },
      {
        title: '站前远望',
        era: '2010年',
        image_url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Xi%27an%20train%20station.jpg',
        source_label: 'Wikimedia Commons',
        source_url: 'https://commons.wikimedia.org/wiki/File:Xi%27an_train_station.jpg',
      },
      {
        title: '今天再看火车站',
        era: '2024年',
        image_url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Xi%27an%20Railway%20Station%202024.jpg',
        source_label: 'Wikimedia Commons',
        source_url: 'https://commons.wikimedia.org/wiki/File:Xi%27an_Railway_Station_2024.jpg',
      },
    ],
    story_sections: [
      {
        era: '出门送人',
        title: '去火车站那天，家里总比平常早醒一点',
        image_url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Xian-Station%2007-2005.jpg',
        source_label: 'Wikimedia Commons',
        source_url: 'https://commons.wikimedia.org/wiki/File:Xian-Station_07-2005.jpg',
        body: '一提起老火车站，很多老人想到的先不是站房，而是送别。天还没亮，包袱、饭盒、水壶就都收拾妥当了，嘴上说着别急，脚下谁也不慢。',
      },
      {
        era: '站台挥手',
        title: '火车一响，人还站在原地，心已经跟着车走了',
        image_url: 'https://commons.wikimedia.org/wiki/Special:FilePath/XiAn%20Railway%20Station.JPG',
        source_label: 'Wikimedia Commons',
        source_url: 'https://commons.wikimedia.org/wiki/File:XiAn_Railway_Station.JPG',
        body: '真正让人记一辈子的，往往是站台上那几分钟。广播响着，绿皮火车停在那儿，窗边探出的手和月台上抬起的胳膊，总要来回挥上好几次。',
      },
      {
        era: '回家盼信',
        title: '送完人回来，屋里没少东西，心里却像空了一块',
        image_url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Xi%27an%20train%20station.jpg',
        source_label: 'Wikimedia Commons',
        source_url: 'https://commons.wikimedia.org/wiki/File:Xi%27an_train_station.jpg',
        body: '从火车站往回走的那段路，总比去的时候安静。那时候消息不方便，等一封信、盼一声平安，本身就是日子的一部分。',
      },
      {
        era: '接人回站',
        title: '再进站接人时，远远看见熟悉身影，心一下就落下来了',
        image_url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Xi%27an%20Railway%20Station%202024.jpg',
        source_label: 'Wikimedia Commons',
        source_url: 'https://commons.wikimedia.org/wiki/File:Xi%27an_Railway_Station_2024.jpg',
        body: '和送站相比，接站是另一种心情。远远看见熟悉的人拎着包走出来，哪怕一句话都还没说，心里先就踏实了。',
      },
    ],
  },
  {
    id: 'museum-city-wall',
    type: 'photo',
    title: '城墙根下的早市',
    description: '从清晨早市到节庆灯火，顺着老城墙脚下的人声、晚风和脚步声，把老西安人过日子的踏实劲儿讲回来。',
    media_url: 'https://commons.wikimedia.org/wiki/Special:FilePath/XiAn%20CityWall.JPG',
    thumbnail_url: 'https://commons.wikimedia.org/wiki/Special:FilePath/XiAn%20CityWall.JPG',
    cover_image_url: 'https://commons.wikimedia.org/wiki/Special:FilePath/XiAn%20CityWall.JPG',
    era: '1970s-2010s',
    region: '碑林区',
    theme_tags: ['城墙', '早市', '城墙根生活', '节庆灯火'],
    emotion_tag: 'warm',
    cognitive_level: 1,
    copyright_status: 'public',
    voice_over_url: '',
    view_count: 88,
    created_at: now,
    gallery: [
      {
        title: '城墙上望出去的老西安',
        era: '2007年',
        image_url: 'https://commons.wikimedia.org/wiki/Special:FilePath/XiAn%20CityWall.JPG',
        source_label: 'Wikimedia Commons',
        source_url: 'https://commons.wikimedia.org/wiki/File:XiAn_CityWall.JPG',
      },
      {
        title: '城墙边上的近景',
        era: '2007年',
        image_url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Xi%27an%20-%20City%20wall%20-%20008.jpg',
        source_label: 'Wikimedia Commons',
        source_url: 'https://commons.wikimedia.org/wiki/File:Xi%27an_-_City_wall_-_008.jpg',
      },
      {
        title: '傍晚时分的角楼',
        era: '2013年',
        image_url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Xian%20City%20Wall.jpg',
        source_label: 'Wikimedia Commons',
        source_url: 'https://commons.wikimedia.org/wiki/File:Xian_City_Wall.jpg',
      },
      {
        title: '灯亮起来后的夜色',
        era: '2007年',
        image_url: 'https://commons.wikimedia.org/wiki/Special:FilePath/City%20Wall%20of%20Xi%27an%20at%20Night%202007.jpg',
        source_label: 'Wikimedia Commons',
        source_url: 'https://commons.wikimedia.org/wiki/File:City_Wall_of_Xi%27an_at_Night_2007.jpg',
      },
    ],
    story_sections: [
      {
        era: '清晨早市',
        title: '天刚亮，城墙根下就先热闹起来了',
        image_url: 'https://commons.wikimedia.org/wiki/Special:FilePath/XiAn%20CityWall.JPG',
        source_label: 'Wikimedia Commons',
        source_url: 'https://commons.wikimedia.org/wiki/File:XiAn_CityWall.JPG',
        body: '很多老人一想起城墙，先想起来的不是门楼，而是城墙根下那股晨早就醒过来的烟火气。卖菜的、挑担的、提篮子的，一下就把日子撑起来了。',
      },
      {
        era: '白天纳凉',
        title: '到了晌午，城墙边上总有让人想歇脚的阴凉',
        image_url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Xi%27an%20-%20City%20wall%20-%20008.jpg',
        source_label: 'Wikimedia Commons',
        source_url: 'https://commons.wikimedia.org/wiki/File:Xi%27an_-_City_wall_-_008.jpg',
        body: '忙完事，顺势就在墙根下坐一会儿，是很多老人熟悉的节奏。拿着蒲扇、端着搪瓷缸子，看看来往的人，心就跟着松快下来。',
      },
      {
        era: '傍晚散步',
        title: '吃过晚饭，顺着城墙边慢慢走，心里最踏实',
        image_url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Xian%20City%20Wall.jpg',
        source_label: 'Wikimedia Commons',
        source_url: 'https://commons.wikimedia.org/wiki/File:Xian_City_Wall.jpg',
        body: '饭后并肩走一走，孩子在前面跑，家里人在身边说着琐碎事，那种不紧不慢的安心感，很多年后都还能想起来。',
      },
      {
        era: '节庆灯火',
        title: '一到节日，城墙下的欢喜就像被灯光一点点照亮了',
        image_url: 'https://commons.wikimedia.org/wiki/Special:FilePath/City%20Wall%20of%20Xi%27an%20at%20Night%202007.jpg',
        source_label: 'Wikimedia Commons',
        source_url: 'https://commons.wikimedia.org/wiki/File:City_Wall_of_Xi%27an_at_Night_2007.jpg',
        body: '逢年过节，灯一亮起来，平常就够让人安心的老地方，又添了许多喜气。人群、灯火、孩子的笑声，把团圆的味道托得格外稳。',
      },
    ],
  },
  {
    id: 'museum-enamel-mug',
    type: 'photo',
    title: '搪瓷缸子',
    description: '从清晨倒热水到家里待客，顺着一只搪瓷缸子的热气、磕碰和旧字样，把许多人家过日子的手感与温度讲回来。',
    media_url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Chinese%20porcelain%20cup%20in%20the%20period%20of%20Cultural%20Revolution.jpg',
    thumbnail_url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Chinese%20porcelain%20cup%20in%20the%20period%20of%20Cultural%20Revolution.jpg',
    cover_image_url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Chinese%20porcelain%20cup%20in%20the%20period%20of%20Cultural%20Revolution.jpg',
    era: '1960s-2010s',
    region: '碑林区',
    theme_tags: ['搪瓷缸子', '老物件', '家常日子', '待客喝水'],
    emotion_tag: 'warm',
    cognitive_level: 1,
    copyright_status: 'public',
    voice_over_url: '',
    view_count: 76,
    created_at: now,
    gallery: [
      {
        title: '带着时代字样的搪瓷缸',
        era: '2014年',
        image_url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Chinese%20porcelain%20cup%20in%20the%20period%20of%20Cultural%20Revolution.jpg',
        source_label: 'Wikimedia Commons',
        source_url: 'https://commons.wikimedia.org/wiki/File:Chinese_porcelain_cup_in_the_period_of_Cultural_Revolution.jpg',
      },
      {
        title: '白色搪瓷杯',
        era: '2012年',
        image_url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Enamel%20mug.jpg',
        source_label: 'Wikimedia Commons',
        source_url: 'https://commons.wikimedia.org/wiki/File:Enamel_mug.jpg',
      },
      {
        title: '老式搪瓷口缸',
        era: '2023年',
        image_url: 'https://commons.wikimedia.org/wiki/Special:FilePath/%E5%BE%B7%E5%AE%8F%E5%B7%9E%E5%8D%9A%E7%89%A9%E9%A6%86-%E7%8E%B0%E4%BB%A3-%E6%90%AA%E7%93%B7%E5%8F%A3%E7%BC%B8.jpg',
        source_label: 'Wikimedia Commons',
        source_url: 'https://commons.wikimedia.org/wiki/File:%E5%BE%B7%E5%AE%8F%E5%B7%9E%E5%8D%9A%E7%89%A9%E9%A6%86-%E7%8E%B0%E4%BB%A3-%E6%90%AA%E7%93%B7%E5%8F%A3%E7%BC%B8.jpg',
      },
      {
        title: '粗瓷感很重的老式杯',
        era: '2010年',
        image_url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Granitewaremug.jpg',
        source_label: 'Wikimedia Commons',
        source_url: 'https://commons.wikimedia.org/wiki/File:Granitewaremug.jpg',
      },
    ],
    story_sections: [
      {
        era: '早晨泡茶',
        title: '一天刚开始，桌角那只搪瓷缸子就先冒起热气',
        image_url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Chinese%20porcelain%20cup%20in%20the%20period%20of%20Cultural%20Revolution.jpg',
        source_label: 'Wikimedia Commons',
        source_url: 'https://commons.wikimedia.org/wiki/File:Chinese_porcelain_cup_in_the_period_of_Cultural_Revolution.jpg',
        body: '很多老人记住搪瓷缸子，先记住的是清早那一下白气腾起来的样子。热水一冲，缸壁发烫，手一碰上去，心里都跟着暖一下。',
      },
      {
        era: '单位上班',
        title: '到了单位，桌边那只缸子像是在陪人守日子',
        image_url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Enamel%20mug.jpg',
        source_label: 'Wikimedia Commons',
        source_url: 'https://commons.wikimedia.org/wiki/File:Enamel_mug.jpg',
        body: '家里有，单位里也有。泡着茶叶的搪瓷缸子往桌边一放，就是半天。它不讲究，却结实、顺手，也陪着很多人的上班日子一起过去了。',
      },
      {
        era: '串门待客',
        title: '家里来了人，递上一只搪瓷缸子，就是最实在的热情',
        image_url: 'https://commons.wikimedia.org/wiki/Special:FilePath/%E5%BE%B7%E5%AE%8F%E5%B7%9E%E5%8D%9A%E7%89%A9%E9%A6%86-%E7%8E%B0%E4%BB%A3-%E6%90%AA%E7%93%B7%E5%8F%A3%E7%BC%B8.jpg',
        source_label: 'Wikimedia Commons',
        source_url: 'https://commons.wikimedia.org/wiki/File:%E5%BE%B7%E5%AE%8F%E5%B7%9E%E5%8D%9A%E7%89%A9%E9%A6%86-%E7%8E%B0%E4%BB%A3-%E6%90%AA%E7%93%B7%E5%8F%A3%E7%BC%B8.jpg',
        body: '以前待客的讲究不在贵重，而在是不是让人坐下、喝上一口热水。那只搪瓷缸子一递出去，屋里的话也就慢慢热乎起来了。',
      },
      {
        era: '留在柜里',
        title: '后来杯子越来越多，可人最记得的还是那只旧缸子',
        image_url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Granitewaremug.jpg',
        source_label: 'Wikimedia Commons',
        source_url: 'https://commons.wikimedia.org/wiki/File:Granitewaremug.jpg',
        body: '后来家里杯子越来越精致，可很多老人真正舍不得忘的，还是那只边沿有磕碰、字样有些淡了的旧缸子。它平常，却把一家人的生活痕迹都留住了。',
      },
    ],
  },
  {
    id: 'museum-goose-pagoda',
    type: 'photo',
    title: '大雁塔远眺',
    description: '从远处望见大雁塔的时候，很多人记住的不是景点，而是旧日西安城边缘的开阔与安静。',
    media_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Giant_Wild_Goose_Pagoda.jpg/640px-Giant_Wild_Goose_Pagoda.jpg',
    thumbnail_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Giant_Wild_Goose_Pagoda.jpg/640px-Giant_Wild_Goose_Pagoda.jpg',
    cover_image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Giant_Wild_Goose_Pagoda.jpg/640px-Giant_Wild_Goose_Pagoda.jpg',
    era: '1960s',
    region: '雁塔区',
    theme_tags: ['大雁塔', '地标', '旧城远景'],
    emotion_tag: 'nostalgic',
    cognitive_level: 1,
    copyright_status: 'public',
    voice_over_url: '',
    view_count: 48,
    created_at: now,
    gallery: [],
    story_sections: [],
  },
]

export const demoGames: DemoGameItem[] = [
  {
    id: 'game-1',
    name: '老物件配对',
    code: 'object_match',
    description: '看图找出记忆里的老物件，轻松练习辨认和记忆。',
    cognitive_domain: 'memory',
    nostalgia_element: '搪瓷缸、蜂窝煤炉、算盘等老物件',
  },
  {
    id: 'game-2',
    name: '跟着戏曲哼旋律',
    code: 'opera_melody',
    description: '跟着熟悉的戏曲问题回想旧日唱段和常识。',
    cognitive_domain: 'language',
    nostalgia_element: '秦腔与老戏台记忆',
  },
  {
    id: 'game-3',
    name: '老地图连线',
    code: 'map_connect',
    description: '用熟悉的西安地标重新唤起方向感和空间记忆。',
    cognitive_domain: 'spatial',
    nostalgia_element: '钟楼、城墙、回民街等老西安地标',
  },
]

const objectMatchQuestions: DemoGameQuestion[] = [
  {
    question_id: 'om1',
    type: 'match',
    content: '请找出与“搪瓷缸”相同的图片',
    options: ['搪瓷缸', '保温杯', '玻璃瓶', '陶瓷碗'],
    option_media: {
      搪瓷缸: 'https://commons.wikimedia.org/wiki/Special:FilePath/Chinese%20porcelain%20cup%20in%20the%20period%20of%20Cultural%20Revolution.jpg',
      保温杯: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Thermos_bottle.jpg/640px-Thermos_bottle.jpg',
      玻璃瓶: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Glass_bottle.jpg/640px-Glass_bottle.jpg',
      陶瓷碗: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Ceramic_bowl.jpg/640px-Ceramic_bowl.jpg',
    },
    correct_answer: '搪瓷缸',
    hint: '以前家家户户都常见，表面多是白底带字。',
    media_url: '',
  },
  {
    question_id: 'om2',
    type: 'match',
    content: '请找出与“蜂窝煤炉”相同的图片',
    options: ['蜂窝煤炉', '煤气灶', '电暖器', '火盆'],
    option_media: {
      蜂窝煤炉: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Honeycomb_briquette_stove.jpg/640px-Honeycomb_briquette_stove.jpg',
      煤气灶: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Gas_stove.jpg/640px-Gas_stove.jpg',
      电暖器: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Electric_heater.jpg/640px-Electric_heater.jpg',
      火盆: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Brazier.jpg/640px-Brazier.jpg',
    },
    correct_answer: '蜂窝煤炉',
    hint: '以前冬天常用来烧水取暖。',
    media_url: '',
  },
  {
    question_id: 'om3',
    type: 'match',
    content: '请找出与“算盘”相同的图片',
    options: ['计算器', '算盘', '尺子', '圆规'],
    option_media: {
      计算器: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Calculator.JPG/640px-Calculator.JPG',
      算盘: 'https://commons.wikimedia.org/wiki/Special:FilePath/Abacus%20%285750178671%29.jpg',
      尺子: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Ruler.jpg/640px-Ruler.jpg',
      圆规: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Compass_%28drawing_tool%29.jpg/640px-Compass_%28drawing_tool%29.jpg',
    },
    correct_answer: '算盘',
    hint: '老一辈算账时很常用。',
    media_url: '',
  },
]

const operaQuestions: DemoGameQuestion[] = [
  {
    question_id: 'qm1',
    type: 'choice',
    content: '秦腔《三滴血》讲的是什么故事？',
    options: ['兄弟相认', '父子团圆', '夫妻重逢', '朋友相聚'],
    correct_answer: '兄弟相认',
    hint: '这是一个关于真假兄弟的故事。',
    media_url: '',
  },
  {
    question_id: 'qm2',
    type: 'choice',
    content: '秦腔中最常见的主奏乐器是什么？',
    options: ['二胡', '板胡', '琵琶', '古筝'],
    correct_answer: '板胡',
    hint: '声音高亢，最有陕西味。',
    media_url: '',
  },
]

const mapQuestions: DemoGameQuestion[] = [
  {
    question_id: 'mc1',
    type: 'choice',
    content: '老西安城墙的南门叫什么？',
    options: ['永宁门', '安定门', '长乐门', '安远门'],
    correct_answer: '永宁门',
    hint: '南门是最热闹的一座门。',
    media_url: '',
  },
  {
    question_id: 'mc2',
    type: 'choice',
    content: '回民街在西安城墙的哪个门附近？',
    options: ['西门', '北门', '南门', '东门'],
    correct_answer: '西门',
    hint: '靠近鼓楼那片老街区。',
    media_url: '',
  },
]

export const demoGameSessions: Record<string, { difficulty: number; questions: DemoGameQuestion[] }> = {
  object_match: { difficulty: 1, questions: objectMatchQuestions },
  opera_melody: { difficulty: 1, questions: operaQuestions },
  map_connect: { difficulty: 1, questions: mapQuestions },
}

export const demoDailyGame = {
  game: demoGames[0],
  recommended_difficulty: 1,
  reason: '今天适合先从看图识物开始，轻松热热脑子。',
}

export const demoReports: DemoReport[] = [
  {
    id: 'report-weekly-1',
    report_type: 'weekly',
    period_start: '2026-04-12',
    period_end: '2026-04-18',
    memory_score: 82,
    language_score: 78,
    spatial_score: 74,
    semantic_score: 80,
    overall_score: 79,
    emotion_summary: { happy: 4, neutral: 2, sad: 1 },
    suggestions: '这周整体状态不错，建议继续保持每天一次轻量健脑活动。策展馆里的“搪瓷缸子”和“老火车站”很适合慢慢看，也适合和家里人聊聊从前的事。',
    is_warning: false,
    created_at: '2026-04-18T09:00:00+08:00',
  },
  {
    id: 'report-weekly-0',
    report_type: 'weekly',
    period_start: '2026-04-05',
    period_end: '2026-04-11',
    memory_score: 76,
    language_score: 72,
    spatial_score: 69,
    semantic_score: 75,
    overall_score: 73,
    emotion_summary: { happy: 3, neutral: 3, anxious: 1 },
    suggestions: '可以继续多看看熟悉的老物件和老地方，边看边讲，比单纯做题更容易进入状态。',
    is_warning: false,
    created_at: '2026-04-11T09:00:00+08:00',
  },
]

export function getDemoChatReply(message: string) {
  if (message.includes('西安') || message.includes('钟楼') || message.includes('城墙')) {
    return {
      reply: '老西安这些地方，一说起来就像能闻见旧街上的风味。你要是愿意，咱们可以从钟楼、城墙，或者回民街慢慢聊起。',
      emotion_detected: 'happy',
      suggestions: ['聊聊钟楼', '说说城墙根', '回民街最热闹的时候'],
    }
  }
  if (message.includes('心情') || message.includes('难受') || message.includes('不舒服')) {
    return {
      reply: '别着急，咱慢慢说。心里有点闷的时候，讲讲以前熟悉的人和事，常常会舒服一些。我在这儿陪着你。',
      emotion_detected: 'sad',
      suggestions: ['想起以前的日子', '说说最想念的人', '聊点开心的事'],
    }
  }
  return {
    reply: '我在呢。你想聊老西安、老物件，还是今天的心情，都可以慢慢说。',
    emotion_detected: 'neutral',
    suggestions: ['聊聊老西安', '说说搪瓷缸子', '今天想起了什么'],
  }
}
