import type { DemoGameItem, DemoGameQuestion } from './data'

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
    name: '戏曲看图辨物',
    code: 'opera_melody',
    description: '通过乐器和戏曲元素图片，唤起熟悉的舞台记忆。',
    cognitive_domain: 'language',
    nostalgia_element: '秦腔乐器与老戏台记忆',
  },
  {
    id: 'game-3',
    name: '老西安地标认图',
    code: 'map_connect',
    description: '看图认出熟悉的西安地标，把旧城方向感慢慢找回来。',
    cognitive_domain: 'spatial',
    nostalgia_element: '钟楼、城墙、鼓楼等老西安地标',
  },
]

const objectMatchQuestions: DemoGameQuestion[] = [
  {
    question_id: 'om1',
    type: 'match',
    content: '找出搪瓷缸',
    options: ['搪瓷缸', '保温杯', '玻璃瓶', '陶瓷碗'],
    option_media: {
      搪瓷缸: './demo-images/enamel-cup.jpg',
      保温杯: './demo-images/thermos-bottle.jpg',
      玻璃瓶: './demo-images/glass-bottle.jpg',
      陶瓷碗: './demo-images/ceramic-bowl.jpg',
    },
    correct_answer: '搪瓷缸',
    hint: '以前家家户户都常见，表面多是白底带字。',
    media_url: '',
  },
  {
    question_id: 'om2',
    type: 'match',
    content: '找出蜂窝煤炉',
    options: ['蜂窝煤炉', '煤气灶', '电暖器', '火盆'],
    option_media: {
      蜂窝煤炉: './demo-images/briquette-stove.jpg',
      煤气灶: './demo-images/gas-stove.jpg',
      电暖器: './demo-images/electric-heater.jpg',
      火盆: './demo-images/brazier.jpg',
    },
    correct_answer: '蜂窝煤炉',
    hint: '以前冬天常用来烧水取暖。',
    media_url: '',
  },
  {
    question_id: 'om3',
    type: 'match',
    content: '找出算盘',
    options: ['计算器', '算盘', '尺子', '圆规'],
    option_media: {
      计算器: './demo-images/calculator.jpg',
      算盘: './demo-images/abacus.jpg',
      尺子: './demo-images/ruler.jpg',
      圆规: './demo-images/compass.jpg',
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
    content: '点出板胡',
    options: ['二胡', '板胡', '琵琶', '古筝'],
    option_media: {
      二胡: './demo-images/erhu.png',
      板胡: './demo-images/banhu.jpg',
      琵琶: './demo-images/pipa.jpg',
      古筝: './demo-images/guzheng.jpg',
    },
    correct_answer: '板胡',
    hint: '声音最亮、最有陕西味的那一种。',
    media_url: '',
  },
  {
    question_id: 'qm2',
    type: 'choice',
    content: '再找一次板胡',
    options: ['二胡', '板胡', '琵琶', '古筝'],
    option_media: {
      二胡: './demo-images/erhu.png',
      板胡: './demo-images/banhu.jpg',
      琵琶: './demo-images/pipa.jpg',
      古筝: './demo-images/guzheng.jpg',
    },
    correct_answer: '板胡',
    hint: '比二胡更高亢，很多老人一听就熟。',
    media_url: '',
  },
]

const mapQuestions: DemoGameQuestion[] = [
  {
    question_id: 'mc1',
    type: 'choice',
    content: '点出永宁门',
    options: ['永宁门', '钟楼', '鼓楼', '城墙角楼'],
    option_media: {
      永宁门: './demo-images/yongning-gate.jpg',
      钟楼: './demo-images/bell-tower.jpg',
      鼓楼: './demo-images/drum-tower.jpg',
      城墙角楼: './demo-images/xian-city-wall.jpg',
    },
    correct_answer: '永宁门',
    hint: '南门是老西安最热闹、最容易认出来的一座门。',
    media_url: '',
  },
  {
    question_id: 'mc2',
    type: 'choice',
    content: '点出钟楼',
    options: ['钟楼', '永宁门', '鼓楼', '城墙'],
    option_media: {
      钟楼: './demo-images/bell-tower.jpg',
      永宁门: './demo-images/yongning-gate.jpg',
      鼓楼: './demo-images/drum-tower.jpg',
      城墙: './demo-images/xian-citywall.jpg',
    },
    correct_answer: '钟楼',
    hint: '它在老西安城中心，样子最像四面临街的高楼。',
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
