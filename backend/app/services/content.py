import random

from sqlalchemy.orm import Session

from app.models.content import Content
from app.models.user import User
from app.schemas.content import ContentUploadRequest, ContentResponse


CLOCK_TOWER_TITLE = "钟楼旧影"
CLOCK_TOWER_COVER = "https://commons.wikimedia.org/wiki/Special:FilePath/Xi%27an%20Bell%20Tower%202024.10.jpg"
CLOCK_TOWER_GALLERY = [
    {
        "title": "钟楼近景",
        "era": "2004年",
        "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/%E8%A5%BF%E5%AE%89%E9%92%9F%E6%A5%BC%20-%20panoramio.jpg",
        "source_label": "Wikimedia Commons",
        "source_url": "https://commons.wikimedia.org/wiki/File:%E8%A5%BF%E5%AE%89%E9%92%9F%E6%A5%BC_-_panoramio.jpg",
    },
    {
        "title": "城心里的钟楼",
        "era": "2007年",
        "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/Xi%27an%20Bell%20Tower%20%289912211844%29.jpg",
        "source_label": "Wikimedia Commons",
        "source_url": "https://commons.wikimedia.org/wiki/File:Xi%27an_Bell_Tower_%289912211844%29.jpg",
    },
    {
        "title": "夜色中的钟楼",
        "era": "2010年",
        "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/The%20Bell%20Tower%20of%20Xi%27an.JPG",
        "source_label": "Wikimedia Commons",
        "source_url": "https://commons.wikimedia.org/wiki/File:The_Bell_Tower_of_Xi%27an.JPG",
    },
    {
        "title": "今天的钟楼",
        "era": "2024年",
        "image_url": CLOCK_TOWER_COVER,
        "source_label": "Wikimedia Commons",
        "source_url": "https://commons.wikimedia.org/wiki/File:Xi%27an_Bell_Tower_2024.10.jpg",
    },
]
CLOCK_TOWER_STORY = [
    {
        "era": "1960年代",
        "title": "那时候的钟楼，是进城时最认得出的方向",
        "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/%E8%A5%BF%E5%AE%89%E9%92%9F%E6%A5%BC%20-%20panoramio.jpg",
        "source_label": "Wikimedia Commons",
        "source_url": "https://commons.wikimedia.org/wiki/File:%E8%A5%BF%E5%AE%89%E9%92%9F%E6%A5%BC_-_panoramio.jpg",
        "body": "要是把记忆往前慢慢推回去，很多西安老人想到钟楼，先想到的不是旅游打卡，而是“进了城，心就稳了”。那时候的钟楼四周，还没有如今这样密密的车流和霓虹，街面宽阔处透着一点旧城的朴实，人的脚步却很有精神。谁家要去城里办点事、买点紧要东西、看场热闹，常常都会把钟楼当成碰头的地方。老人们常说，路不一定都记得清，可只要能望见钟楼，心里就不会慌。钟楼像一位站得稳稳当当的老长辈，不说话，却替整座城守着方向。那一代人年轻时日子不算富裕，可进城时衣裳总会收拾得干净，兜里装着布票、粮票，脚步匆匆，眼睛却亮。站在钟楼边上，看人来人往，听着自行车铃声、售货员的吆喝声、远处广播喇叭里传出的播音腔，城市的热闹就这样一点一点进了心里。",
    },
    {
        "era": "1970年代",
        "title": "围着钟楼走一圈，像把城里的烟火气都看了一遍",
        "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/Xi%27an%20Bell%20Tower%20%289912211844%29.jpg",
        "source_label": "Wikimedia Commons",
        "source_url": "https://commons.wikimedia.org/wiki/File:Xi%27an_Bell_Tower_%289912211844%29.jpg",
        "body": "到了七十年代，钟楼周边已经是很多人心里最热闹、最有“城里样子”的地方。要是赶上节庆日子，或者谁家孩子考上学、单位发了点票证，老人们总爱念叨一句：“走，去钟楼那边转转。”这一转，不一定非得买什么大件，更多时候是想去看看橱窗，看看人群，顺带闻一闻街边吃食的香气。那时候的开心其实很实在，买一块点心，带回家能分给一家人；照一张相片，能压在箱底好多年；看见钟楼在暮色里一点点亮起来，回去路上都觉得心里热乎。很多老人回忆年轻时候，都会记得在钟楼附近等人，怕错过，便早到半小时；明明风吹得脸发凉，心里却还带着盼头。钟楼见过的，不只是城市变化，更是普通人日子里那些小小的郑重、小小的欢喜。",
    },
    {
        "era": "1980年代",
        "title": "城越来越新，可钟楼还是大家心里的老地方",
        "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/The%20Bell%20Tower%20of%20Xi%27an.JPG",
        "source_label": "Wikimedia Commons",
        "source_url": "https://commons.wikimedia.org/wiki/File:The_Bell_Tower_of_Xi%27an.JPG",
        "body": "八十年代，西安城里的节奏明显快了起来，街面上的新鲜东西越来越多，许多老人也正是在那个时候，一边忙着工作和家庭，一边真切地感到“城市在往前走”。钟楼依旧立在那儿，却像是看着四周一点点热闹起来。有人第一次在钟楼附近逛大商场，有人坐着公交车穿过城中心，透过车窗一眼望见钟楼，心里就知道离家里熟悉的生活不远了。还有不少人会记得，年轻时带着孩子去城里，孩子仰头看钟楼，总要问一句“这么高的楼，以前的人怎么建的？”大人嘴上随口解释，心里其实也忍不住生出一点骄傲。钟楼是古建筑，可它从来不显得遥远，它一直在陪着一代代普通人往前过日子。哪怕后来街道更亮了、商铺更多了、脚步更快了，只要钟楼还在，许多人就总觉得这座城还有一份老底子在。",
    },
    {
        "era": "今天再看",
        "title": "人会变老，钟楼却替大家把旧时光轻轻托住了",
        "image_url": CLOCK_TOWER_COVER,
        "source_label": "Wikimedia Commons",
        "source_url": "https://commons.wikimedia.org/wiki/File:Xi%27an_Bell_Tower_2024.10.jpg",
        "body": "如今再看钟楼，四周早已和从前大不一样。年轻人举着手机拍照，游客在灯光里来来往往，车流从地下和路口穿梭，城市像一口永远热着的锅，热闹得很。可对很多老人来说，钟楼最打动人的，恰恰不是它有多漂亮，而是它一直还在那里。它像记忆里的老朋友，不一定天天想起，可真见到了，心里一下就软下来。您也许会想起第一次进城时的拘谨，想起和爱人并肩走过的街口，想起给孩子买东西时的小心盘算，想起某个冬天把手揣进袖子里，在钟楼边上等人的样子。钟楼不会替人说话，但它替很多西安人的青春、忙碌、奔波、盼望和团圆都留了个位置。人这一辈子，能有这样一个地方，让你一想到就知道自己从哪里来、曾经怎样认真生活过，这本身就很珍贵。",
    },
]


MUSLIM_STREET_TITLE = "回民街的泡馍馆"
MUSLIM_STREET_COVER = "https://commons.wikimedia.org/wiki/Special:FilePath/Xi%27an_Muslim_Street.jpg"
MUSLIM_STREET_GALLERY = [
    {
        "title": "回民街南口",
        "era": "2020年",
        "image_url": MUSLIM_STREET_COVER,
        "source_label": "Wikimedia Commons",
        "source_url": "https://commons.wikimedia.org/wiki/File:Xi%27an_Muslim_Street.jpg",
    },
    {
        "title": "街上最热闹的时候",
        "era": "2016年",
        "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/Muslim%20food%20street%20market%2C%20Xi%27an%2C%20China%20-%20panoramio.jpg",
        "source_label": "Wikimedia Commons",
        "source_url": "https://commons.wikimedia.org/wiki/File:Muslim_food_street_market,_Xi%27an,_China_-_panoramio.jpg",
    },
    {
        "title": "边走边看边闻香",
        "era": "2016年",
        "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/Muslim%20food%20street%20market%2C%20Xi%27an%2C%20China%20-%20panoramio%20%281%29.jpg",
        "source_label": "Wikimedia Commons",
        "source_url": "https://commons.wikimedia.org/wiki/File:Muslim_food_street_market,_Xi%27an,_China_-_panoramio_(1).jpg",
    },
    {
        "title": "回民街上的烟火小摊",
        "era": "2004年",
        "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/%E8%A5%BF%E5%AE%89%E5%9B%9E%E6%B0%91%E8%A1%97%EF%BC%8C%E7%83%A4%E4%B8%B2%E5%B0%8F%E5%A4%AB%E5%A6%BB%28%E7%8C%9C%E7%9A%84%20-%29%29%20-%20panoramio.jpg",
        "source_label": "Wikimedia Commons",
        "source_url": "https://commons.wikimedia.org/wiki/File:%E8%A5%BF%E5%AE%89%E5%9B%9E%E6%B0%91%E8%A1%97%EF%BC%8C%E7%83%A4%E4%B8%B2%E5%B0%8F%E5%A4%AB%E5%A6%BB(%E7%8C%9C%E7%9A%84_-%29)_%20-%20panoramio.jpg",
    },
]
MUSLIM_STREET_STORY = [
    {
        "era": "清晨",
        "title": "街口刚醒，第一锅热气就把人心勾住了",
        "image_url": MUSLIM_STREET_COVER,
        "source_label": "Wikimedia Commons",
        "source_url": "https://commons.wikimedia.org/wiki/File:Xi%27an_Muslim_Street.jpg",
        "body": "要是回忆老西安的回民街，很多人最先想起来的，不一定是最热闹的时候，反倒是清晨那股刚刚醒来的劲儿。街口的门脸还没有完全热起来，石板路上却已经有了来来往往的脚步声。有人提着东西匆匆走过，有人边走边和熟人打招呼，铺子里的人把锅灶一点，火苗一旺，整条街就像被轻轻唤醒了。那时候要是谁家进城办事，顺路拐进回民街，闻见第一锅汤冒出来的香气，心里就会想，今天这一趟算是没白来。老人们常会记得那股味道，不只是牛羊肉和调料的香，还带着晨气、带着人声、带着一种城里日子真正开始流动起来的感觉。",
    },
    {
        "era": "晌午",
        "title": "到了饭点，泡馍馆里最见人情味",
        "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/Muslim%20food%20street%20market%2C%20Xi%27an%2C%20China%20-%20panoramio.jpg",
        "source_label": "Wikimedia Commons",
        "source_url": "https://commons.wikimedia.org/wiki/File:Muslim_food_street_market,_Xi%27an,_China_-_panoramio.jpg",
        "body": "一到晌午，回民街上最打动人的地方，就是泡馍馆里那股热腾腾的人情味。门口有人等位，屋里有人拼桌，伙计脚步快得像踩着风。掰馍这件事，在外地人眼里像个新鲜讲究，在老西安人心里却更像一种耐心和认真。馍要掰得细，不能图省事；掰得越匀，煮出来越入味。很多老人一说起从前吃泡馍，就会想起自己低着头慢慢掰馍的样子，旁边坐着爱人、孩子或者老朋友，一边掰一边说闲话，桌上的时间也跟着慢下来。等到那一碗端上来，热气扑脸，肉烂汤浓，刚才在街上吹来的风、走过的路、等位时的小焦躁，好像一下子都化开了。吃的其实不只是一碗泡馍，也是进城之后给自己、给家里人留的一份郑重。",
    },
    {
        "era": "下午",
        "title": "吃饱以后不急着走，顺着街慢慢逛才有味道",
        "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/Muslim%20food%20street%20market%2C%20Xi%27an%2C%20China%20-%20panoramio%20%281%29.jpg",
        "source_label": "Wikimedia Commons",
        "source_url": "https://commons.wikimedia.org/wiki/File:Muslim_food_street_market,_Xi%27an,_China_-_panoramio_(1).jpg",
        "body": "真正懂回民街的人，吃完泡馍之后往往不会立刻离开，而是顺着街慢慢走一圈。有人看看糕点铺子，有人站在摊前挑点小吃带回家，也有人什么都不买，只是图个热闹，图个心里舒坦。老人们回忆年轻时进城，常常就是这样，一顿饭吃完，肚子暖了，脚步也慢下来。街边有人吆喝，有人切肉，有人忙着招呼客人，孩子在人群里探头探脑，大人嘴上说别乱跑，眼里却是带着笑的。那种感觉不是现在常说的“打卡”，更像是把日子过得有滋有味。回民街的好，不只在嘴里，更在走过以后心里留下的热乎劲儿。",
    },
    {
        "era": "夜晚",
        "title": "灯一亮，整条街像一锅热气腾腾的人间烟火",
        "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/%E8%A5%BF%E5%AE%89%E5%9B%9E%E6%B0%91%E8%A1%97%EF%BC%8C%E7%83%A4%E4%B8%B2%E5%B0%8F%E5%A4%AB%E5%A6%BB%28%E7%8C%9C%E7%9A%84%20-%29%29%20-%20panoramio.jpg",
        "source_label": "Wikimedia Commons",
        "source_url": "https://commons.wikimedia.org/wiki/File:%E8%A5%BF%E5%AE%89%E5%9B%9E%E6%B0%91%E8%A1%97%EF%BC%8C%E7%83%A4%E4%B8%B2%E5%B0%8F%E5%A4%AB%E5%A6%BB(%E7%8C%9C%E7%9A%84_-%29)_%20-%20panoramio.jpg",
        "body": "到了晚上，回民街又是另一番样子。灯亮起来以后，整条街的热闹就像被重新添了一把火，空气里混着烤肉香、汤香、饼香，还有人群说话的热气。老人们会记得，以前要是难得和家里人一块儿进城，晚上走在这样的街上，总会觉得日子其实挺有盼头。孩子眼里尽是新鲜，大人嘴上说别馋这个别馋那个，最后还是会买一点带回去。有人边走边消食，有人找熟铺子再坐一会儿，有人只是在人群里慢慢走着，看看这一街灯火，心里就觉得踏实。回民街最可贵的地方，也许正是这样：它让一顿饭不只是填饱肚子，而是变成一家人、一群老友、一个普通日子里很值得记住的片段。",
    },
]


OLD_RAILWAY_STATION_TITLE = "老火车站"
OLD_RAILWAY_STATION_COVER = "https://commons.wikimedia.org/wiki/Special:FilePath/Xian-Station%2007-2005.jpg"
OLD_RAILWAY_STATION_GALLERY = [
    {
        "title": "站前广场的老印象",
        "era": "2005年",
        "image_url": OLD_RAILWAY_STATION_COVER,
        "source_label": "Wikimedia Commons",
        "source_url": "https://commons.wikimedia.org/wiki/File:Xian-Station_07-2005.jpg",
    },
    {
        "title": "那座写着西安的站房",
        "era": "2007年",
        "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/XiAn%20Railway%20Station.JPG",
        "source_label": "Wikimedia Commons",
        "source_url": "https://commons.wikimedia.org/wiki/File:XiAn_Railway_Station.JPG",
    },
    {
        "title": "站前远望",
        "era": "2010年",
        "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/Xi%27an%20train%20station.jpg",
        "source_label": "Wikimedia Commons",
        "source_url": "https://commons.wikimedia.org/wiki/File:Xi%27an_train_station.jpg",
    },
    {
        "title": "今天再看火车站",
        "era": "2024年",
        "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/Xi%27an%20Railway%20Station%202024.jpg",
        "source_label": "Wikimedia Commons",
        "source_url": "https://commons.wikimedia.org/wiki/File:Xi%27an_Railway_Station_2024.jpg",
    },
]
OLD_RAILWAY_STATION_STORY = [
    {
        "era": "出门送人",
        "title": "去火车站那天，家里总比平常早醒一点",
        "image_url": OLD_RAILWAY_STATION_COVER,
        "source_label": "Wikimedia Commons",
        "source_url": "https://commons.wikimedia.org/wiki/File:Xian-Station_07-2005.jpg",
        "body": "很多老人一提起老火车站，最先冒出来的不是站房有多大，也不是火车有多快，而是“要送人出门了”。那种日子，家里总会比平常早醒一点。天还没大亮，包袱、布袋、铝饭盒、水壶就已经收拾妥当，嘴上都说着“别急别急，时间还早”，可脚下谁都走得不慢。有人是送孩子去外地上学，有人是送爱人去出差、去当兵、去谋生，也有人只是送亲戚回老家。一路往火车站去，心里明明知道只是送一程，却总觉得要替对方多操心一点，生怕忘带票，生怕错过车，生怕上了车没人照应。那时候的火车站，对很多家庭来说，不只是一个出发的地方，更像是把惦记、盼头、嘱咐和不舍都集中在了一起。",
    },
    {
        "era": "站台挥手",
        "title": "火车一响，人还站在原地，心已经跟着车走了",
        "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/XiAn%20Railway%20Station.JPG",
        "source_label": "Wikimedia Commons",
        "source_url": "https://commons.wikimedia.org/wiki/File:XiAn_Railway_Station.JPG",
        "body": "真正让人记一辈子的，往往是站台上那几分钟。广播一遍遍响着，站台上人来人往，提包的、抱孩子的、找车厢的、抹眼泪的，全都挤在一片热气和喧闹里。绿皮火车停在那儿，看着笨重，真要开动的时候却一点不等人。窗户边伸出来的手，月台上抬起来的胳膊，总要来回挥上好几次。嘴里叮嘱的，常常也就是那几句最朴素的话：“路上小心”“到了来信”“别舍不得花钱”。可越是这样普通的话，越让人鼻子发酸。等汽笛一响，车轮一动，人还站在原地，心却像已经跟着车走了。很多老人到现在都还记得，火车慢慢开出去时，自己会忍不住跟着往前走几步，哪怕看不清了，也还想多望一眼。",
    },
    {
        "era": "回家盼信",
        "title": "送完人回来，屋里没少东西，心里却像空了一块",
        "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/Xi%27an%20train%20station.jpg",
        "source_label": "Wikimedia Commons",
        "source_url": "https://commons.wikimedia.org/wiki/File:Xi%27an_train_station.jpg",
        "body": "从火车站往回走的那段路，常常比去的时候安静得多。刚才还忙着看票、找站台、递东西，等人真的走了，整个人反倒空下来，脚步也慢了。回到家里，桌子还是那张桌子，板凳还是那张板凳，可总觉得少了一点声音。老人们很熟悉那种感觉，不一定是大哭大闹，就是心里挂着，惦记着，想着对方现在坐到哪儿了、有没有吃上热饭、晚上冷不冷。那时候没有今天这样方便的联系，等消息、盼来信，本身就是日子的一部分。邮递员、自行车铃声、街口有人喊名字，都会让人心里一动。老火车站留在记忆里的，不只有出发时的热闹，还有分别之后那种安安静静的牵挂。正因为牵挂重，后来收到平安消息时，心里才会那么踏实。",
    },
    {
        "era": "接人回站",
        "title": "再进站接人时，远远看见熟悉身影，心一下就落下来了",
        "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/Xi%27an%20Railway%20Station%202024.jpg",
        "source_label": "Wikimedia Commons",
        "source_url": "https://commons.wikimedia.org/wiki/File:Xi%27an_Railway_Station_2024.jpg",
        "body": "和送站相比，接站是另一种心情。也是早早出门，也是站在出站口左看右看，可整个人的盼头是往回收的。老人们都懂，接人时最怕错过，一双眼睛总在人群里找，生怕熟人已经走出来了自己还没看见。等那个熟悉的身影终于出现，哪怕只是拎着包往这边走，心里也会忽然松一大截。有人嘴上还埋怨一句“怎么才到”，其实手已经伸过去接包了；有人一路上问个不停，饿不饿、累不累、车上挤不挤；也有人什么都不多说，只是并肩走着，就觉得这一趟算圆满了。老火车站之所以让人难忘，不只是因为它送走过多少人，更因为它也迎回来过多少人。人生里那些奔波、离别和团圆，很多都在这里打了个照面。",
    },
]


CITY_WALL_TITLE = "城墙根下的早市"
CITY_WALL_COVER = "https://commons.wikimedia.org/wiki/Special:FilePath/XiAn%20CityWall.JPG"
CITY_WALL_GALLERY = [
    {
        "title": "城墙上望出去的老西安",
        "era": "2007年",
        "image_url": CITY_WALL_COVER,
        "source_label": "Wikimedia Commons",
        "source_url": "https://commons.wikimedia.org/wiki/File:XiAn_CityWall.JPG",
    },
    {
        "title": "城墙边上的近景",
        "era": "2007年",
        "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/Xi%27an%20-%20City%20wall%20-%20008.jpg",
        "source_label": "Wikimedia Commons",
        "source_url": "https://commons.wikimedia.org/wiki/File:Xi%27an_-_City_wall_-_008.jpg",
    },
    {
        "title": "傍晚时分的城墙角楼",
        "era": "2013年",
        "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/Xian%20City%20Wall.jpg",
        "source_label": "Wikimedia Commons",
        "source_url": "https://commons.wikimedia.org/wiki/File:Xian_City_Wall.jpg",
    },
    {
        "title": "灯亮起来后的城墙夜色",
        "era": "2007年",
        "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/City%20Wall%20of%20Xi%27an%20at%20Night%202007.jpg",
        "source_label": "Wikimedia Commons",
        "source_url": "https://commons.wikimedia.org/wiki/File:City_Wall_of_Xi%27an_at_Night_2007.jpg",
    },
]
CITY_WALL_STORY = [
    {
        "era": "清晨早市",
        "title": "天刚亮，城墙根下就先热闹起来了",
        "image_url": CITY_WALL_COVER,
        "source_label": "Wikimedia Commons",
        "source_url": "https://commons.wikimedia.org/wiki/File:XiAn_CityWall.JPG",
        "body": "很多老人一想起城墙，先想起来的并不是门楼有多高、砖墙有多厚，而是城墙根下那股一到清晨就醒过来的烟火气。天刚蒙蒙亮，卖菜的、挑担的、提篮子的、顺路进城办事的，就已经在墙根下凑出了热闹。有人把青菜码得整整齐齐，有人把葱蒜一把一把摊开，嘴里带着一点晨气喊着价，声音顺着城墙脚往远处飘。那时候的热闹不是喧哗得让人心烦，而是让人觉得日子正在一点点开张。老人们常会记得，自己小时候跟着大人出来买菜，手里攥着几角钱，眼睛却总往别的摊子上瞟，看谁家豆腐白，看谁家油条香。城墙就那么静静立在后头，不说话，却把这份市井生活衬得格外踏实，好像只要它还在，老西安的日子就不会散。早市上的人彼此多半都眼熟，买不买都能先寒暄两句，问一声昨晚睡得可好，问一句家里孩子是不是又长高了。对很多老人来说，城墙根下的早市，买的不只是菜，也是熟人气、生活气，是一天里最先暖起来的人情味。",
    },
    {
        "era": "白天纳凉",
        "title": "到了晌午，城墙边上总有让人想歇脚的阴凉",
        "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/Xi%27an%20-%20City%20wall%20-%20008.jpg",
        "source_label": "Wikimedia Commons",
        "source_url": "https://commons.wikimedia.org/wiki/File:Xi%27an_-_City_wall_-_008.jpg",
        "body": "等到太阳升高，城墙边上的节奏就慢下来了。有人提着东西办完事，顺势就在墙根下找个地方坐一会儿；有人推着自行车靠边停下，抹把汗，再和熟人聊上几句。老人们最懂这种片刻的轻松，忙完家里的事，搬个小板凳出来，在城墙脚边坐坐，看看来往的人，听听孩子闹腾，心里就觉得舒展开了。那时候没有那么多消遣，可光是坐在那里，吹着风，望着墙头上偶尔走过的人影，就已经很有味道。有人拿着蒲扇，有人端着搪瓷缸子，有人一边看孩子追跑，一边和身边人讲旧事，说谁家孩子在外头工作了，说哪家媳妇今天又做了什么可口饭。城墙边上像一处天然的歇脚地，替许多普通人把一天的辛苦缓一缓。老人后来再回想，记住的往往不是哪一句话，而是那种人坐在阴凉里、心也跟着安静下来的感觉。好像再忙的生活，只要能靠着城墙歇一歇，就总还有喘口气的地方。",
    },
    {
        "era": "傍晚散步",
        "title": "吃过晚饭，顺着城墙边慢慢走，心里最踏实",
        "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/Xian%20City%20Wall.jpg",
        "source_label": "Wikimedia Commons",
        "source_url": "https://commons.wikimedia.org/wiki/File:Xian_City_Wall.jpg",
        "body": "城墙边最让老人怀念的，还有傍晚那段散步的辰光。饭吃完了，碗也收了，天还没完全黑下来，很多人就愿意出来走一走。老人并肩走，孩子在前头跑，年轻人在后头推着车，整条路都带着一种不紧不慢的熟悉节奏。走到城墙边，风比白天柔了些，墙体在暮色里显得更稳重，连说话声都像被放轻了。有人边走边说今天家里的琐碎事，有人谈起谁从外地回来了，也有人什么都不说，只是静静走着。那种陪着家里人散步的感觉，对很多老人来说，比热闹更珍贵。它不轰轰烈烈，却把一家人的日子慢慢串在了一起。孩子会突然指着高高的墙问东问西，大人嘴里应着，脚下却依旧稳稳地走。很多年后，人会忘掉那天具体说了什么，却忘不掉晚风吹在脸上的感觉，忘不掉身边有熟人、有家人在，抬眼还能看见老城墙的安心。",
    },
    {
        "era": "节庆灯火",
        "title": "一到节日，城墙下的欢喜就像被灯光一点点照亮了",
        "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/City%20Wall%20of%20Xi%27an%20at%20Night%202007.jpg",
        "source_label": "Wikimedia Commons",
        "source_url": "https://commons.wikimedia.org/wiki/File:City_Wall_of_Xi%27an_at_Night_2007.jpg",
        "body": "要是赶上过年过节，城墙边上的气氛就又不一样了。平日里已经够让人安心的老地方，一到灯亮起来的时候，忽然就添了许多喜气。老人们会记得，小时候跟着大人去看热闹，衣服穿得比平常整齐，口袋里塞着点零嘴，走在人群里，眼睛怎么都看不够。有人卖小吃，有人卖玩意儿，有人站在一边专门看人，也觉得高兴。等自己成了大人，再带着孩子出来，心情又不同了，像是把小时候得来的那份热闹，又稳稳当当地递给了下一辈。城墙亮灯的时候，老西安的夜像一下子有了节日的骨架，热闹却不乱，欢喜也带着分寸。对很多老人来说，真正难忘的，不是灯有多漂亮，而是那种一家人走在一起、心里亮堂堂的感觉。城墙见过太多人来来往往，可每逢节庆，它又像个老熟人一样，把大家心里那点对团圆、对安稳、对好日子的盼头，全都温温地托住了。",
    },
]


ENAMEL_MUG_TITLE = "搪瓷缸子"
ENAMEL_MUG_COVER = "https://commons.wikimedia.org/wiki/Special:FilePath/Chinese%20porcelain%20cup%20in%20the%20period%20of%20Cultural%20Revolution.jpg"
ENAMEL_MUG_GALLERY = [
    {
        "title": "带着时代字样的搪瓷缸",
        "era": "2014年",
        "image_url": ENAMEL_MUG_COVER,
        "source_label": "Wikimedia Commons",
        "source_url": "https://commons.wikimedia.org/wiki/File:Chinese_porcelain_cup_in_the_period_of_Cultural_Revolution.jpg",
    },
    {
        "title": "柜子里常见的白色搪瓷杯",
        "era": "2012年",
        "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/Enamel%20mug.jpg",
        "source_label": "Wikimedia Commons",
        "source_url": "https://commons.wikimedia.org/wiki/File:Enamel_mug.jpg",
    },
    {
        "title": "博物馆里的老式搪瓷口缸",
        "era": "2023年",
        "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/%E5%BE%B7%E5%AE%8F%E5%B7%9E%E5%8D%9A%E7%89%A9%E9%A6%86-%E7%8E%B0%E4%BB%A3-%E6%90%AA%E7%93%B7%E5%8F%A3%E7%BC%B8.jpg",
        "source_label": "Wikimedia Commons",
        "source_url": "https://commons.wikimedia.org/wiki/File:%E5%BE%B7%E5%AE%8F%E5%B7%9E%E5%8D%9A%E7%89%A9%E9%A6%86-%E7%8E%B0%E4%BB%A3-%E6%90%AA%E7%93%B7%E5%8F%A3%E7%BC%B8.jpg",
    },
    {
        "title": "粗瓷感很重的老式搪瓷杯",
        "era": "2010年",
        "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/Granitewaremug.jpg",
        "source_label": "Wikimedia Commons",
        "source_url": "https://commons.wikimedia.org/wiki/File:Granitewaremug.jpg",
    },
]
ENAMEL_MUG_STORY = [
    {
        "era": "早晨泡茶",
        "title": "一天刚开始，桌角那只搪瓷缸子就先冒起热气",
        "image_url": ENAMEL_MUG_COVER,
        "source_label": "Wikimedia Commons",
        "source_url": "https://commons.wikimedia.org/wiki/File:Chinese_porcelain_cup_in_the_period_of_Cultural_Revolution.jpg",
        "body": "很多老人一提起搪瓷缸子，脑子里先浮出来的不是它长什么样，而是清早倒热水时那一下白气腾起来的样子。天刚亮，屋里还带着一点凉意，桌角那只缸子已经放好了，里面也许是白开水，也许泡着几片茶叶。热水一冲，缸壁微微发烫，手指碰上去，心里都跟着暖一下。那时候家里东西不多，可一只搪瓷缸子总像有固定的位置，饭桌边、窗台上、床头柜旁，谁都知道它该放在哪儿。老人们常记得，小时候家里大人用缸子喝水，孩子总想凑过去也喝一口，觉得大人杯里的水格外香。缸子外头印着字、印着花，边上有些小磕碰，拿久了连把手都磨得发亮，可越是这样，越像家里离不开的老物件。它不贵，也不稀奇，却陪着一户人家从清晨开始，把一天慢慢唤醒。",
    },
    {
        "era": "单位上班",
        "title": "到了单位，桌边那只搪瓷缸子像是在陪人守日子",
        "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/Enamel%20mug.jpg",
        "source_label": "Wikimedia Commons",
        "source_url": "https://commons.wikimedia.org/wiki/File:Enamel_mug.jpg",
        "body": "搪瓷缸子最常见的地方，不只是家里，也是在单位、车间、门房和办公室。很多老人都记得，上班时桌上总要放一只缸子，里面泡着茶叶，忙起来顾不上喝，等稍微歇口气再端起来，水已经温了，可还是照样顺口。缸子有时候装的是茶，有时候是白开水，也有人拿它装稀饭、装汤，怎么用都顺手。它不像现在的杯子那么讲究，却结实、耐用，摔了也未必坏，磕出一点口子照样接着使。老人回忆上班日子时，常会把很多小细节和那只缸子连在一起，比如冬天把手焐在缸边取暖，比如午后阳光照到桌面，缸子边缘反一点亮光，比如同事过来借火、借笔，顺口先问一句今天泡的什么茶。那只缸子像个不多话的老同事，陪着人守着工位，也陪着人把平常日子一天天过扎实。",
    },
    {
        "era": "串门待客",
        "title": "家里来了人，递上一只搪瓷缸子，就是最实在的热情",
        "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/%E5%BE%B7%E5%AE%8F%E5%B7%9E%E5%8D%9A%E7%89%A9%E9%A6%86-%E7%8E%B0%E4%BB%A3-%E6%90%AA%E7%93%B7%E5%8F%A3%E7%BC%B8.jpg",
        "source_label": "Wikimedia Commons",
        "source_url": "https://commons.wikimedia.org/wiki/File:%E5%BE%B7%E5%AE%8F%E5%B7%9E%E5%8D%9A%E7%89%A9%E9%A6%86-%E7%8E%B0%E4%BB%A3-%E6%90%AA%E7%93%B7%E5%8F%A3%E7%BC%B8.jpg",
        "body": "以前家里来客，待客的讲究往往不在多贵重，而在是不是让人坐下、喝上一口热水。很多老人都熟悉那一幕：人刚进门，主人先招呼坐，再转身去倒水，端出来的多半就是搪瓷缸子。夏天是凉开水，冬天是热腾腾的茶，缸子往人手里一递，话也就跟着热乎起来了。亲戚来串门，邻居来借东西，朋友来坐一会儿，大家端着各自的缸子聊天，屋里很快就有了人气。孩子在边上跑，大人有一句没一句说着家常，谁家最近办了喜事，谁家的孩子又长高了，都是从这只缸子旁边慢慢聊开的。那时候的热情不靠排场，靠的是心意，是手里那杯热水，是一句别客气再坐会儿。搪瓷缸子看着朴素，却总能把家里的温度稳稳托住。",
    },
    {
        "era": "留在柜里",
        "title": "后来杯子越来越多，可人最记得的还是那只旧缸子",
        "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/Granitewaremug.jpg",
        "source_label": "Wikimedia Commons",
        "source_url": "https://commons.wikimedia.org/wiki/File:Granitewaremug.jpg",
        "body": "这些年家里的杯子越添越多，玻璃杯、保温杯、茶具，都比从前精致得多，可很多老人真正舍不得忘的，还是那只陪了很多年的搪瓷缸子。也许它早就不常用了，也许已经放进柜子最里面，边沿还有一点磕碰，字样也淡了，可一看见它，人就会想起以前的日子。想起清晨倒水时的热气，想起上班时桌边那一口茶，想起家里来客时的笑声，也想起自己年轻时拎着缸子出门、回家、过日子的样子。老物件最动人的地方，往往就在这里，它明明只是个普通杯子，却把一家人的生活痕迹都留住了。老人看到它，不一定会说很多话，可心里会有一种很熟的踏实感，像是从前那些认真生活过的日子，并没有真的走远。",
    },
]


FEATURED_CONTENT_TITLES = [
    CLOCK_TOWER_TITLE,
    MUSLIM_STREET_TITLE,
    OLD_RAILWAY_STATION_TITLE,
    CITY_WALL_TITLE,
    ENAMEL_MUG_TITLE,
]


def _sort_featured_first(items: list[Content]) -> list[Content]:
    featured_order = {title: index for index, title in enumerate(FEATURED_CONTENT_TITLES)}
    return sorted(items, key=lambda item: featured_order.get(item.title, len(FEATURED_CONTENT_TITLES)))


def build_clock_tower_story_payload() -> dict:
    return {
        "cover_image_url": CLOCK_TOWER_COVER,
        "gallery": CLOCK_TOWER_GALLERY,
        "story_sections": CLOCK_TOWER_STORY,
    }


def build_muslim_street_story_payload() -> dict:
    return {
        "cover_image_url": MUSLIM_STREET_COVER,
        "gallery": MUSLIM_STREET_GALLERY,
        "story_sections": MUSLIM_STREET_STORY,
    }


def build_old_railway_station_story_payload() -> dict:
    return {
        "cover_image_url": OLD_RAILWAY_STATION_COVER,
        "gallery": OLD_RAILWAY_STATION_GALLERY,
        "story_sections": OLD_RAILWAY_STATION_STORY,
    }


def build_city_wall_story_payload() -> dict:
    return {
        "cover_image_url": CITY_WALL_COVER,
        "gallery": CITY_WALL_GALLERY,
        "story_sections": CITY_WALL_STORY,
    }


def build_enamel_mug_story_payload() -> dict:
    return {
        "cover_image_url": ENAMEL_MUG_COVER,
        "gallery": ENAMEL_MUG_GALLERY,
        "story_sections": ENAMEL_MUG_STORY,
    }


def build_content_response(content: Content) -> ContentResponse:
    payload = {
        "id": content.id,
        "type": content.type,
        "title": content.title,
        "description": content.description or "",
        "media_url": content.media_url,
        "thumbnail_url": content.thumbnail_url or "",
        "era": content.era,
        "region": content.region,
        "theme_tags": content.theme_tags or [],
        "emotion_tag": content.emotion_tag,
        "cognitive_level": content.cognitive_level,
        "copyright_status": content.copyright_status,
        "voice_over_url": content.voice_over_url or "",
        "view_count": content.view_count or 0,
        "created_at": content.created_at,
        "cover_image_url": content.thumbnail_url or content.media_url,
        "gallery": [],
        "story_sections": [],
    }

    if content.title == CLOCK_TOWER_TITLE:
        payload.update(build_clock_tower_story_payload())
    if content.title == MUSLIM_STREET_TITLE:
        payload.update(build_muslim_street_story_payload())
    if content.title == OLD_RAILWAY_STATION_TITLE:
        payload.update(build_old_railway_station_story_payload())
    if content.title == CITY_WALL_TITLE:
        payload.update(build_city_wall_story_payload())
    if content.title == ENAMEL_MUG_TITLE:
        payload.update(build_enamel_mug_story_payload())

    return ContentResponse.model_validate(payload)


def get_content_by_id(db: Session, content_id: str) -> Content | None:
    return db.query(Content).filter(Content.id == content_id, Content.is_active == True).first()


def list_contents(
    db: Session,
    era: str | None = None,
    region: str | None = None,
    emotion_tag: str | None = None,
    content_type: str | None = None,
    page: int = 1,
    page_size: int = 20,
) -> tuple[list[Content], int]:
    query = db.query(Content).filter(Content.is_active == True)
    if era:
        query = query.filter(Content.era == era)
    if region:
        query = query.filter(Content.region == region)
    if emotion_tag:
        query = query.filter(Content.emotion_tag == emotion_tag)
    if content_type:
        query = query.filter(Content.type == content_type)
    total = query.count()
    all_items = query.order_by(Content.created_at.desc()).all()
    ordered_items = _sort_featured_first(all_items)
    page_items = ordered_items[(page - 1) * page_size: page * page_size]
    return page_items, total


def recommend_contents(
    db: Session,
    user: User,
    limit: int = 10,
    era: str | None = None,
    region: str | None = None,
    emotion_tag: str | None = None,
) -> list[Content]:
    if not era and not region and not emotion_tag:
        featured = (
            db.query(Content)
            .filter(
                Content.is_active == True,
                Content.cognitive_level <= user.cognitive_level,
                Content.title.in_(FEATURED_CONTENT_TITLES),
            )
            .all()
        )
        featured_by_title = {item.title: item for item in featured}
        ordered_featured = [
            featured_by_title[title]
            for title in FEATURED_CONTENT_TITLES
            if title in featured_by_title
        ]

        query = db.query(Content).filter(
            Content.is_active == True,
            Content.cognitive_level <= user.cognitive_level,
        )
        if user.region:
            query = query.filter(Content.region == user.region)

        remaining = [item for item in query.all() if item.title not in FEATURED_CONTENT_TITLES]
        random.shuffle(remaining)
        return (ordered_featured + remaining)[:limit]

    query = db.query(Content).filter(
        Content.is_active == True,
        Content.cognitive_level <= user.cognitive_level,
    )
    if era:
        query = query.filter(Content.era == era)
    elif user.region:
        query = query.filter(Content.region == user.region)
    if region:
        query = query.filter(Content.region == region)
    if emotion_tag:
        query = query.filter(Content.emotion_tag == emotion_tag)

    items = _sort_featured_first(query.all())
    if len(items) <= limit:
        return items
    return items[:limit]


def create_content(
    db: Session,
    uploader_id: str,
    req: ContentUploadRequest,
    media_url: str,
    thumbnail_url: str = "",
) -> Content:
    content = Content(
        type=req.type,
        title=req.title,
        description=req.description,
        media_url=media_url,
        thumbnail_url=thumbnail_url,
        era=req.era,
        region=req.region,
        theme_tags=req.theme_tags,
        emotion_tag=req.emotion_tag,
        copyright_status="user_uploaded",
        uploader_id=uploader_id,
    )
    db.add(content)
    db.commit()
    db.refresh(content)
    return content


def increment_view_count(db: Session, content_id: str):
    content = db.query(Content).filter(Content.id == content_id).first()
    if content:
        content.view_count = (content.view_count or 0) + 1
        db.commit()
