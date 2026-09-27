// 筆記（リーディング）問題：本番の形式にならったオリジナル問題（過去問の転載ではありません）
// 選択肢は「正解を先頭」に書き、画面に出すときにシャッフルする

// 大問1：短文の語句空所補充
// 問題文|正解 / 誤答 / 誤答 / 誤答|分野（noun verb adj adv idiom grammar:文法キー）|解説|訳
export const PART1_RAW = String.raw`
My sister wants to be a ( ) because she likes to help sick people.|nurse / pilot / singer / writer|noun|「病気の人を助けるのが好き」なので nurse（看護師）。pilot＝パイロット、singer＝歌手、writer＝作家。|姉は病気の人を助けるのが好きなので、看護師になりたいと思っています。
A: Excuse me. Is there a ( ) near here? B: Yes. You can buy stamps there.|post office / library / hospital / stadium|noun|切手（stamps）が買えるのは post office（郵便局）。|A: すみません。この近くに郵便局はありますか。B: はい。そこで切手を買えますよ。
I forgot my ( ), so I couldn't buy anything at the store.|wallet / umbrella / eraser / uniform|noun|「何も買えなかった」のは wallet（財布）を忘れたから。|財布を忘れたので、店で何も買えませんでした。
A: What ( ) do you like, Emi? B: I like science.|subject / season / sport / animal|noun|science（理科）と答えているので subject（教科）。|A: エミ、何の教科が好き？ B: 理科が好き。
Please be quiet in the ( ). Many people are reading books.|library / gym / kitchen / stadium|noun|本を読んでいる人が多い静かな場所は library（図書館）。|図書館では静かにしてください。多くの人が本を読んでいます。
A: How is the ( ) in Sapporo today? B: It's snowing.|weather / season / world / color|noun|How is the weather? は天気をたずねる決まった言い方。|A: 今日の札幌の天気はどう？ B: 雪が降っているよ。
I have a ( ). I think I ate too much.|stomachache / headache / fever / cold|noun|「食べすぎた」ので stomachache（腹痛）。headache＝頭痛、fever＝熱。|おなかが痛いです。食べすぎたんだと思います。
A: How was your ( ) to Okinawa? B: It was great. I swam in the sea.|trip / job / lesson / hobby|noun|trip to ～＝～への旅行。|A: 沖縄旅行はどうだった？ B: 最高だったよ。海で泳いだんだ。
Many ( ) came to the stadium to watch the game.|fans / cooks / pilots / nurses|noun|試合を見にスタジアムに来たのは fans（ファン）。|たくさんのファンが試合を見にスタジアムに来ました。
Be careful when you cross the ( ). There are many cars.|road / roof / pool / forest|noun|車がたくさん走っているのは road（道路）。|道路を渡るときは気をつけて。車がたくさん走っています。
A: Can I see the ( ), please? B: Here you are. Today's special is fish curry.|menu / map / ticket / letter|noun|レストランで「今日のおすすめ」を話しているので menu（メニュー）。|A: メニューを見せてもらえますか。B: はい、どうぞ。今日のおすすめは魚のカレーです。
My father works at a ( ). He sells bread and cakes.|bakery / bookstore / bank / hospital|noun|パンやケーキを売るのは bakery（パン屋）。|父はパン屋で働いています。パンやケーキを売っています。
We went to the ( ) and saw many fish and dolphins.|aquarium / library / airport / museum|noun|魚やイルカを見る場所は aquarium（水族館）。|私たちは水族館に行って、たくさんの魚やイルカを見ました。
A: What's your favorite ( )? B: I like fall because the leaves are beautiful.|season / subject / sport / color|noun|fall（秋）と答えているので season（季節）。|A: いちばん好きな季節は？ B: 葉がきれいだから秋が好き。
It's very cold today. Wear your ( ) when you go out.|coat / glasses / watch / towel|noun|寒いときに着るのは coat（コート）。|今日はとても寒いよ。出かけるときはコートを着なさい。
Look at that ( ) in the sky! It's flying to the airport.|plane / ship / train / bike|noun|空を飛んで空港へ向かうのは plane（飛行機）。|空のあの飛行機を見て！空港へ飛んでいくよ。
There are twelve ( ) in a year.|months / weeks / days / hours|noun|1年は12か月（months）。|1年には12か月あります。
A: Do you know Mr. Smith's phone ( )? B: Yes. It's 555-1234.|number / name / money / page|noun|電話番号は phone number。|A: スミスさんの電話番号を知ってる？ B: うん。555-1234だよ。
It's raining. I left my ( ) at home. Can I borrow yours?|umbrella / camera / wallet / dictionary|noun|雨が降っているので借りたいのは umbrella（かさ）。|雨が降っているね。かさを家に置いてきちゃった。あなたのを借りてもいい？
The ( ) of our school made a speech at the ceremony.|principal / student / nurse / driver|noun|式でスピーチをしたのは principal（校長先生）。|私たちの学校の校長先生が式でスピーチをしました。
A: Where is the shoe shop? B: It's on the third ( ).|floor / door / window / wall|noun|on the third floor＝3階に。|A: 靴屋はどこですか。B: 3階です。
I want to study history, so I'll go to ( ) after high school.|college / hospital / station / bakery|noun|高校のあとに進学するのは college（大学）。|歴史を勉強したいので、高校のあとは大学に行くつもりです。
Mika won first ( ) in the piano contest.|prize / idea / example / problem|noun|win first prize＝1等賞をとる。|ミカはピアノコンテストで1等賞をとりました。
My grandmother lives in a small ( ) near the mountains.|village / garden / kitchen / classroom|noun|山の近くの小さな village（村）に住んでいる。|祖母は山の近くの小さな村に住んでいます。
A: What ( ) is your new bike? B: It's red.|color / size / time / day|noun|red（赤）と答えているので color（色）。|A: 新しい自転車は何色？ B: 赤だよ。
I'm very hungry. What's for ( ), Mom?|dinner / homework / weather / vacation|noun|おなかがすいたので「夕食は何？」とたずねている。|とてもおなかがすいたよ。お母さん、夕食は何？
Please write your name at the top of the ( ).|paper / sky / river / floor|noun|名前を書くのは paper（紙）。|紙のいちばん上に名前を書いてください。
My uncle is a ( ). He grows rice and vegetables.|farmer / singer / dentist / pilot|noun|米や野菜を育てるのは farmer（農家の人）。|おじは農家です。米や野菜を育てています。
A: Do you have any ( )? B: Yes, I have a dog and two cats.|pets / sisters / friends / toys|noun|犬とねこを飼っている → pets（ペット）。|A: ペットを飼ってる？ B: うん、犬を1匹とねこを2匹飼ってるよ。
We need to buy a ( ) for the train. It's 500 yen.|ticket / present / stamp / map|noun|電車に乗るために買うのは ticket（切符）。|電車の切符を買わなければなりません。500円です。
I'll send you an ( ) tonight. Please check your computer.|e-mail / umbrella / apple / eraser|noun|コンピューターで確かめるのは e-mail（Eメール）。|今夜Eメールを送るね。コンピューターを確認してね。
Ken has a bad ( ), so he can't come to school today.|cold / cat / cake / car|noun|have a cold＝かぜをひいている。|ケンはひどいかぜをひいているので、今日は学校に来られません。
The ( ) is shining, and the sky is blue.|sun / moon / rain / snow|noun|shine（輝く）で空が青いのは sun（太陽）。|太陽が輝いていて、空は青いです。
My sister plays the ( ) in the school band.|drums / games / tennis / cards|noun|バンドで演奏するのは drums（ドラム）。楽器には the をつける。|姉は学校のバンドでドラムを演奏しています。
A: How many ( ) can you speak? B: Two. Japanese and English.|languages / countries / subjects / words|noun|日本語と英語 → languages（言語）。|A: 何か国語話せる？ B: 2つだよ。日本語と英語。
We took a lot of ( ) during our trip to Kyoto.|pictures / trains / lessons / stories|noun|take a picture＝写真を撮る。|京都旅行中にたくさん写真を撮りました。
Can I ( ) your pen? I forgot mine.|borrow / lend / sell / carry|verb|borrow＝（無料で）借りる。lend＝貸す。自分のペンを忘れたので「借りる」。|ペンを借りてもいい？自分のを忘れちゃったんだ。
Could you ( ) me your dictionary? I left mine at home.|lend / borrow / buy / catch|verb|lend 人 物＝人に物を貸す。相手に「貸してくれますか」とたのむ場面。|辞書を貸していただけますか。自分のを家に置いてきてしまいました。
Please ( ) this book to the library by Friday.|return / arrive / hear / wear|verb|return A to B＝AをBに返す。|この本を金曜日までに図書館に返してください。
It started to rain, so we ( ) to stay home.|decided / enjoyed / finished / practiced|verb|decide to ～＝～することに決める。enjoy・finish・practice のあとは ～ing。|雨が降り始めたので、私たちは家にいることにしました。
My mother ( ) me a new watch for my birthday.|gave / said / talked / went|verb|give 人 物＝人に物をあげる。gave は give の過去形。|母は誕生日に新しい腕時計をくれました。
A: What time does the movie ( )? B: At seven.|start / watch / see / take|verb|映画が「始まる」のは start。|A: 映画は何時に始まるの？ B: 7時だよ。
I ( ) my umbrella on the train yesterday. I have to buy a new one.|lost / found / bought / made|verb|新しいのを買わなければならない → なくした（lost）。lose の過去形。|昨日電車でかさをなくしました。新しいのを買わなければなりません。
We ( ) Mt. Fuji last summer. It was hard, but the view was great.|climbed / swam / cooked / wrote|verb|山（Mt. Fuji）に「登った」→ climbed。|去年の夏、富士山に登りました。大変だったけれど、景色はすばらしかったです。
Kenji ( ) at the station at nine and took a taxi to the hotel.|arrived / visited / wanted / showed|verb|arrive at ～＝～に着く。visit は at をつけずに visit the station。|ケンジは9時に駅に着いて、タクシーでホテルへ行きました。
Please ( ) your hands before lunch.|wash / eat / put / close|verb|昼食の前に手を「洗う」→ wash。|昼食の前に手を洗いなさい。
A: Did you ( ) the news about Mr. White? B: No. What happened?|hear / listen / speak / talk|verb|hear the news＝その知らせを聞く。listen は listen to ～ の形で使う。|A: ホワイト先生の知らせを聞いた？ B: いや。何があったの？
My grandfather ( ) this house about fifty years ago.|built / grew / wrote / drew|verb|家を「建てた」→ built（build の過去形）。|祖父は約50年前にこの家を建てました。
I usually ( ) my dog in the park after school.|walk / run / go / ride|verb|walk my dog＝犬を散歩させる。|私はふだん放課後に公園で犬を散歩させます。
A: Can you ( ) me the way to the museum? B: Sure. Go straight and turn left.|tell / say / speak / talk|verb|tell 人 the way＝人に道を教える。say・speak・talk は「人に」を直接つけない。|A: 博物館への道を教えてくれますか。B: いいですよ。まっすぐ行って左に曲がってください。
This soup ( ) good. Can I have some?|smells / eats / cooks / drinks|verb|smell good＝いいにおいがする。|このスープはいいにおいがするね。少しもらってもいい？
Jim ( ) a lot of pictures during his trip to Nara.|took / gave / drank / ran|verb|take a picture＝写真を撮る。took は take の過去形。|ジムは奈良旅行の間にたくさん写真を撮りました。
The students ( ) songs at the school festival.|sang / said / spoke / told|verb|songs（歌）を「歌った」→ sang（sing の過去形）。|生徒たちは文化祭で歌を歌いました。
I ( ) up at six this morning and made breakfast.|got / went / came / put|verb|get up＝起きる。got は get の過去形。|今朝は6時に起きて朝食を作りました。
My father can ( ) a car, but my mother can't.|drive / ride / fly / swim|verb|車を「運転する」は drive a car。|父は車を運転できますが、母はできません。
Please ( ) the window. It's cold in here.|close / open / clean / wash|verb|寒いので窓を「閉めて」→ close。|窓を閉めてください。ここは寒いです。
Kate ( ) a letter to her grandmother in Canada last week.|sent / said / heard / took|verb|send a letter to ～＝～に手紙を送る。sent は send の過去形。|ケイトは先週カナダのおばあさんに手紙を送りました。
We ( ) for the bus for thirty minutes, but it didn't come.|waited / stayed / looked / walked|verb|wait for ～＝～を待つ。|30分バスを待ちましたが、来ませんでした。
Nice to ( ) you, Mr. Green. I'm Kenta.|meet / take / make / get|verb|Nice to meet you.＝はじめまして。|はじめまして、グリーン先生。ケンタです。
My sister ( ) Chinese at college. She wants to work in China.|studies / eats / sleeps / swims|verb|大学で中国語を「勉強している」→ studies。|姉は大学で中国語を勉強しています。中国で働きたいと思っています。
A: Did you ( ) the concert? B: Yes, it was fantastic.|enjoy / listen / arrive / start|verb|enjoy the concert＝コンサートを楽しむ。listen は listen to ～。|A: コンサートは楽しかった？ B: うん、すばらしかったよ。
Tom ( ) the ball, and his dog caught it.|threw / ate / drew / heard|verb|ボールを「投げた」→ threw（throw の過去形）。|トムがボールを投げると、犬がそれをキャッチしました。
The baby is ( ) now. Please be quiet.|sleeping / singing / playing / dancing|verb|「静かにして」と言っているので、赤ちゃんは眠っている（sleeping）。|赤ちゃんは今眠っています。静かにしてください。
Don't ( ) your homework. Bring it to school tomorrow.|forget / remember / finish / start|verb|「明日学校に持ってきて」→「忘れないで」Don't forget。|宿題を忘れないでね。明日学校に持ってきてください。
My mother ( ) flowers in the garden every spring.|plants / bakes / builds / cooks|verb|花を「植える」→ plants。|母は毎年春に庭に花を植えます。
I ( ) my friend's birthday party last Saturday. It was fun.|joined / helped / met / called|verb|パーティーに「参加した」→ joined。|この前の土曜日に友達の誕生日パーティーに参加しました。楽しかったです。
This book is very ( ). I read it three times.|interesting / hungry / sleepy / sick|adj|3回も読んだのは interesting（おもしろい）から。|この本はとてもおもしろいです。3回読みました。
A: Are you ( ) this afternoon? B: Yes. Let's go shopping.|free / busy / sorry / sick|adj|「買い物に行こう」と答えているので free（ひまな）。|A: 今日の午後ひま？ B: うん。買い物に行こう。
My grandfather is eighty years old, but he is very ( ). He walks every day.|healthy / sad / angry / hungry|adj|毎日歩いている → healthy（健康な）。|祖父は80歳ですが、とても元気です。毎日歩いています。
I'm ( ). Can I have something to drink?|thirsty / full / sleepy / angry|adj|何か飲みたい → thirsty（のどがかわいた）。|のどがかわいたよ。何か飲むものをもらえる？
This bag is too ( ). I can't carry it.|heavy / light / cheap / cute|adj|運べないのは heavy（重い）から。|このかばんは重すぎます。運べません。
The tickets were very ( ). They were 10,000 yen each.|expensive / cheap / small / easy|adj|1枚1万円 → expensive（高価な）。|チケットはとても高かったです。1枚1万円でした。
Please speak more ( ). I can't understand your English.|slowly / early / often / always|adv|わからないので「もっとゆっくり」→ slowly。|もっとゆっくり話してください。あなたの英語がわかりません。
I got up ( ) this morning, so I was late for school.|late / early / fast / soon|adv|学校に遅刻した → 起きたのが late（遅く）。|今朝は遅く起きたので、学校に遅刻しました。
My sister ( ) goes to bed at ten. She never goes to bed after eleven.|always / never / ago / yet|adv|「11時より遅く寝ることはない」→ いつも（always）10時に寝る。|妹はいつも10時に寝ます。11時より遅く寝ることは決してありません。
A: Can you come to my house ( )? B: Sorry, I'm busy tomorrow.|tomorrow / yesterday / ago / last|adv|B が「明日はいそがしい」と答えているので tomorrow。|A: 明日うちに来られる？ B: ごめん、明日はいそがしいんだ。
This dictionary is very ( ). I use it every day.|useful / hungry / careful / sleepy|adj|毎日使う → useful（役に立つ）。|この辞書はとても役に立ちます。毎日使っています。
Please be ( ). The road is very busy.|careful / free / famous / delicious|adj|交通量が多いので Be careful.（気をつけて）。|気をつけてね。道路はとても交通量が多いよ。
A: Thank you for the present. B: I'm ( ) you like it.|glad / sorry / afraid / tired|adj|I'm glad ～.＝～してうれしい。|A: プレゼントをありがとう。B: 気に入ってもらえてうれしいよ。
This song is very ( ) with young people in Japan.|popular / hungry / careful / expensive|adj|be popular with ～＝～に人気がある。|この歌は日本の若者にとても人気があります。
I studied very ( ) for the test, so I got a good score.|hard / easy / quiet / sick|adv|study hard＝一生懸命勉強する。この hard は副詞。|テストのために一生懸命勉強したので、いい点がとれました。
My room is small, but my brother's room is ( ).|large / short / young / slow|adj|but（しかし）で small と反対 → large（大きい）。|私の部屋は小さいですが、兄の部屋は大きいです。
A: Is the station ( ) from here? B: No, it's only five minutes on foot.|far / long / high / late|adv|far from ～＝～から遠い。|A: 駅はここから遠いですか。B: いいえ、歩いてたった5分です。
We have ( ) time. The train leaves in an hour.|enough / few / many / every|adj|1時間ある → 時間は enough（十分な）。time は数えられないので many・few は使わない。|時間は十分あります。電車は1時間後に出ます。
The movie was very ( ). Everyone laughed a lot.|funny / sad / quiet / sleepy|adj|みんなよく笑った → funny（おかしい）。|その映画はとてもおかしかったです。みんなたくさん笑いました。
I was ( ) when I heard the news. I didn't know that at all.|surprised / hungry / thirsty / free|adj|知らなかったことを聞いて surprised（驚いた）。|その知らせを聞いて驚きました。まったく知らなかったのです。
It's ( ) today. Take your umbrella.|rainy / sunny / hot / warm|adj|かさを持っていく → rainy（雨の）。|今日は雨だよ。かさを持っていきなさい。
A: How was the test? B: It was ( ). I answered all the questions.|easy / difficult / sick / heavy|adj|全部答えられた → easy（簡単な）。|A: テストはどうだった？ B: 簡単だったよ。全部の問題に答えられたんだ。
I usually take the bus to school, but I ( ) walk when it's sunny.|sometimes / never / ago / yet|adv|ふだんはバスだが、晴れの日はときどき（sometimes）歩く。|ふだんはバスで学校に行きますが、晴れているときはときどき歩きます。
My sister is good ( ) playing the piano.|at / in / on / for|idiom|be good at ～ing＝～するのが得意だ。|姉はピアノをひくのが得意です。
I'm interested ( ) Japanese history.|in / at / on / to|idiom|be interested in ～＝～に興味がある。|私は日本の歴史に興味があります。
Please ( ) care of my dog while I'm on vacation.|take / make / have / give|idiom|take care of ～＝～の世話をする。|私が休暇の間、犬の世話をしてください。
A: What are you looking ( )? B: My key. I can't find it.|for / at / on / to|idiom|look for ～＝～をさがす。|A: 何をさがしているの？ B: かぎだよ。見つからないんだ。
I ( ) up at six every morning.|get / go / come / put|idiom|get up＝起きる。|私は毎朝6時に起きます。
It's cold. ( ) on your coat.|Put / Take / Get / Make|idiom|put on ～＝～を着る。|寒いよ。コートを着なさい。
Please take ( ) your shoes here.|off / on / up / in|idiom|take off ～＝～をぬぐ。|ここで靴をぬいでください。
We had a good ( ) at the party.|time / hour / week / clock|idiom|have a good time＝楽しい時を過ごす。|パーティーで楽しい時を過ごしました。
The library is ( ) to the park.|next / front / between / far|idiom|next to ～＝～のとなりに。|図書館は公園のとなりにあります。
There is a big tree in ( ) of my house.|front / near / next / before|idiom|in front of ～＝～の前に。|家の前に大きな木があります。
My house is far ( ) the station.|from / to / at / in|idiom|far from ～＝～から遠い。|私の家は駅から遠いです。
I go to school ( ) foot.|on / by / in / at|idiom|on foot＝歩いて。バスなら by bus。|私は歩いて学校に行きます。
We waited ( ) the bus for twenty minutes.|for / to / at / on|idiom|wait for ～＝～を待つ。|私たちは20分間バスを待ちました。
Please say hello ( ) your family.|to / for / with / at|idiom|say hello to ～＝～によろしく伝える。|ご家族によろしく伝えてください。
A: Can you help me ( ) my homework? B: Sure.|with / for / to / at|idiom|help 人 with ～＝人の～を手伝う。|A: 宿題を手伝ってくれる？ B: いいよ。
Kenta ( ) a speech in front of the class.|made / went / said / told|idiom|make a speech＝スピーチをする。|ケンタはクラスのみんなの前でスピーチをしました。
I'm looking forward ( ) seeing you again.|to / for / at / with|idiom|look forward to ～ing＝～するのを楽しみに待つ。|またあなたに会えるのを楽しみにしています。
A: Let's go ( ) this weekend. B: Sounds good. I have a new fishing rod.|fishing / shopping / skiing / swimming|idiom|fishing rod（つりざお）を持っている → go fishing（つりに行く）。|A: 今週末つりに行こうよ。B: いいね。新しいつりざおを持ってるんだ。
My brother is ( ) of dogs. He doesn't want to go near them.|afraid / interested / good / full|idiom|be afraid of ～＝～をこわがる。|弟は犬をこわがっています。犬に近づきたがりません。
This town is famous ( ) its beautiful beaches.|for / at / with / on|idiom|be famous for ～＝～で有名だ。|この町は美しい浜辺で有名です。
The box was full ( ) old toys.|of / in / at / to|idiom|be full of ～＝～でいっぱいだ。|その箱は古いおもちゃでいっぱいでした。
A: Can I ( ) on this sweater? B: Sure.|try / wear / make / take|idiom|try on ～＝～を試着する。|A: このセーターを試着してもいいですか。B: どうぞ。
We talked ( ) our summer vacation.|about / at / on / for|idiom|talk about ～＝～について話す。|私たちは夏休みについて話しました。
I ( ) a cold, so I stayed home yesterday.|had / made / did / went|idiom|have a cold＝かぜをひいている。had は have の過去形。|かぜをひいていたので、昨日は家にいました。
Please turn ( ) the TV. I want to watch the news.|on / off / up / at|idiom|ニュースを見たいので turn on（つける）。|テレビをつけてください。ニュースが見たいんです。
We ( ) on a trip to Hokkaido last winter.|went / had / did / came|idiom|go on a trip＝旅行に行く。|去年の冬、北海道へ旅行に行きました。
A: Hurry ( )! The movie will start soon. B: OK.|up / on / off / in|idiom|Hurry up!＝急いで！|A: 急いで！もうすぐ映画が始まるよ。B: わかった。
At ( ), we arrived at the top of the mountain.|last / first / all / once|idiom|at last＝ついに。at first は「最初は」。|ついに私たちは山の頂上に着きました。
I didn't know the answer, so I ( ) up.|gave / made / took / came|idiom|give up＝あきらめる。gave は give の過去形。|答えがわからなかったので、あきらめました。
The shop is open ( ) 10 a.m. to 8 p.m.|from / at / on / by|idiom|from A to B＝AからBまで。|その店は午前10時から午後8時まで開いています。
A: What do you want to be when you grow ( )? B: I want to be a scientist.|up / in / on / out|idiom|grow up＝大人になる。|A: 大人になったら何になりたい？ B: 科学者になりたいな。
Mika and Emi are good friends. They often help each ( ).|other / another / one / all|idiom|each other＝おたがい。|ミカとエミは仲よしです。二人はよくおたがいに助け合います。
I ( ) to the zoo with my family last Sunday.|went / go / goes / going|grammar:past|last Sunday（この前の日曜日）→ 過去形 went。|この前の日曜日に家族と動物園に行きました。
A: ( ) you watch TV last night? B: No, I didn't.|Did / Do / Were / Are|grammar:past|last night の一般動詞の疑問文 → Did。答えも didn't。|A: 昨夜テレビを見た？ B: ううん、見なかった。
My father ( ) a new car yesterday.|bought / buys / buy / buying|grammar:past|yesterday → 過去形。buy の過去形は bought。|父は昨日新しい車を買いました。
It ( ) very cold yesterday, so I stayed home.|was / were / is / are|grammar:past|yesterday で主語が It → was。|昨日はとても寒かったので、家にいました。
Ken and I ( ) in the same class last year.|were / was / are / is|grammar:past|last year・主語が複数（Ken and I）→ were。|ケンと私は去年同じクラスでした。
Emi didn't ( ) her homework last night.|do / did / does / doing|grammar:past|didn't のあとは動詞の原形。|エミは昨夜宿題をしませんでした。
I ( ) taking a bath when you called me.|was / were / am / did|grammar:pastprog|電話したとき「～していた」→ 過去進行形 was ～ing。|あなたが電話したとき、私はおふろに入っていました。
A: What were you doing at eight? B: I was ( ) a book.|reading / read / reads / to read|grammar:pastprog|was のあとに ～ing で過去進行形。|A: 8時に何をしていたの？ B: 本を読んでいたよ。
They ( ) playing soccer in the park at that time.|were / was / are / did|grammar:pastprog|at that time（そのとき）・主語 They → were ～ing。|彼らはそのとき公園でサッカーをしていました。
It ( ) be sunny tomorrow.|will / is / was / does|grammar:future|tomorrow の予想 → will ＋ 原形。|明日は晴れるでしょう。
I'm going ( ) visit my grandparents next week.|to / for / at / and|grammar:future|be going to ＋ 動詞の原形＝～する予定だ。|来週祖父母を訪ねる予定です。
A: What are you going to ( ) this weekend? B: I'm going to play tennis.|do / did / doing / does|grammar:future|be going to のあとは原形。|A: 今週末は何をする予定？ B: テニスをする予定だよ。
My sister ( ) going to study in Canada next year.|is / are / will / does|grammar:future|主語 My sister → is going to。|姉は来年カナダで勉強する予定です。
You ( ) be quiet in the library.|must / does / has / were|grammar:modal|must ＋ 原形＝～しなければならない。|図書館では静かにしなければなりません。
My brother has ( ) get up early tomorrow.|to / for / at / of|grammar:modal|have to ～（主語が3人称単数なら has to）＝～しなければならない。|兄は明日早く起きなければなりません。
A: ( ) I use your eraser? B: Sure.|May / Must / Do / Am|grammar:modal|May I ～?＝～してもいいですか。|A: 消しゴムを使ってもいいですか。B: どうぞ。
You ( ) take a rest. You look tired.|should / shall / are / did|grammar:modal|should ～＝～したほうがよい（アドバイス）。|休んだほうがいいよ。疲れているみたいだから。
Mika can ( ) the piano very well.|play / plays / played / playing|grammar:modal|can のあとは動詞の原形。|ミカはピアノをとても上手にひけます。
A: ( ) I open the window? B: Yes, please. It's hot.|Shall / Will / Do / Are|grammar:request|Shall I ～?＝（私が）～しましょうか。答えは Yes, please.|A: 窓を開けましょうか。B: はい、お願いします。暑いです。
A: How ( ) going to the movies tonight? B: That's a good idea.|about / much / many / long|grammar:request|How about ～ing?＝～するのはどう？|A: 今夜映画に行くのはどう？ B: いい考えだね。
A: Would you ( ) some cake? B: Yes, please.|like / make / take / look|grammar:request|Would you like ～?＝～はいかがですか。|A: ケーキはいかがですか。B: はい、いただきます。
I want ( ) a doctor in the future.|to be / be / being / was|grammar:infinitive|want to ～＝～したい。to のあとは原形 be。|私は将来医者になりたいです。
Tom went to the library ( ) study math.|to / for / at / and|grammar:infinitive|to ＋ 原形＝～するために（目的）。|トムは数学を勉強するために図書館へ行きました。
I'd like something cold ( ) drink.|to / for / and / at|grammar:infinitive|something ＋ 形容詞 ＋ to ～＝何か…な～するもの。|何か冷たい飲み物がほしいです。
We enjoyed ( ) in the sea.|swimming / swim / to swim / swam|grammar:gerund|enjoy ～ing＝～して楽しむ。enjoy to ～ は使わない。|私たちは海で泳いで楽しみました。
Kate finished ( ) the letter.|writing / write / to write / wrote|grammar:gerund|finish ～ing＝～し終える。|ケイトは手紙を書き終えました。
Thank you for ( ) me.|helping / help / to help / helped|grammar:gerund|前置詞 for のあとは ～ing。|手伝ってくれてありがとう。
My brother is ( ) than my father.|taller / tall / tallest / more tall|grammar:compare|than があるので比較級 taller。|兄は父より背が高いです。
This is the ( ) interesting book of all.|most / more / much / very|grammar:compare|the ～ of all＝すべての中でいちばん → the most interesting。|これはすべての中でいちばんおもしろい本です。
Which do you like ( ), summer or winter?|better / good / best / well|grammar:compare|2つを比べて「どちらが好き？」は like better。|夏と冬、どちらが好きですか。
Ken can run as ( ) as his brother.|fast / faster / fastest / more fast|grammar:compare|as ～ as の間は元の形。|ケンはお兄さんと同じくらい速く走れます。
Mt. Fuji is the highest mountain ( ) Japan.|in / of / at / on|grammar:compare|最上級で「～の中で」：場所・範囲は in、複数のものは of。|富士山は日本でいちばん高い山です。
There ( ) three parks in my town.|are / is / was / be|grammar:there|three parks（複数）→ There are。|私の町には公園が3つあります。
There ( ) a lot of people at the festival yesterday.|were / was / are / is|grammar:there|yesterday・a lot of people（複数）→ There were。|昨日のお祭りにはたくさんの人がいました。
I stayed home ( ) I had a cold.|because / but / so / or|grammar:conj|かぜをひいていた（理由）→ because。|かぜをひいていたので家にいました。
( ) it rains tomorrow, we won't go on a picnic.|If / But / So / And|grammar:conj|If ～＝もし～なら。|もし明日雨が降ったら、ピクニックには行きません。
( ) I got home, my sister was watching TV.|When / What / Where / Which|grammar:conj|When ～＝～したとき。|家に帰ったとき、妹はテレビを見ていました。
I think ( ) Mr. Brown is a good teacher.|that / what / which / who|grammar:conj|think that ～＝～だと思う。|ブラウン先生はいい先生だと思います。
A: ( ) is this bag? B: It's 3,000 yen.|How much / How many / How long / How old|grammar:question|値段をたずねるのは How much。|A: このかばんはいくらですか。B: 3,000円です。
A: ( ) umbrella is this? B: It's mine.|Whose / Who / Where / When|grammar:question|It's mine.（私のもの）と答えているので Whose（だれの）。|A: これはだれのかさですか。B: 私のです。
A: ( ) did you stay in Hawaii? B: For ten days.|How long / How many / How often / How far|grammar:question|For ten days（10日間）→ 期間をたずねる How long。|A: ハワイにはどのくらい滞在したの？ B: 10日間だよ。
A: ( ) do you go to the gym? B: Twice a week.|How often / How long / How much / How old|grammar:question|Twice a week（週2回）→ 回数をたずねる How often。|A: どのくらいの頻度でジムに行くの？ B: 週に2回だよ。
A: ( ) were you late? B: Because I missed the bus.|Why / When / Where / What|grammar:question|Because ～ で答えているので Why（なぜ）。|A: なぜ遅れたの？ B: バスに乗り遅れたからです。
A: Is this your notebook? B: Yes, it's ( ).|mine / my / me / I|grammar:pronoun|「私のもの」は mine。|A: これはあなたのノート？ B: うん、私のだよ。
Mr. Green is our teacher. We like ( ) very much.|him / he / his / himself|grammar:pronoun|like のあと（目的語）は him。|グリーン先生は私たちの先生です。私たちは先生が大好きです。
I'm hungry. I want ( ) to eat.|something / someone / somewhere / sometimes|grammar:pronoun|something to eat＝何か食べるもの。|おなかがすいた。何か食べるものがほしいな。
The party will start ( ) six o'clock.|at / on / in / for|grammar:prep|時刻の前は at。|パーティーは6時に始まります。
My birthday is ( ) May 10.|on / in / at / by|grammar:prep|日付の前は on。月だけなら in May。|私の誕生日は5月10日です。
I went to Okinawa ( ) the summer vacation.|during / until / by / from|grammar:prep|during ～＝～の間に。|夏休みの間に沖縄に行きました。
Please finish your homework ( ) Friday.|by / at / in / during|grammar:prep|by ～＝～までに（期限）。|金曜日までに宿題を終わらせてください。
We stayed at the hotel ( ) three days.|for / during / at / on|grammar:prep|for ＋ 期間の長さ＝～の間。|私たちはそのホテルに3日間泊まりました。
The cat is sleeping ( ) the table.|under / of / to / from|grammar:prep|under ～＝～の下で。|ねこはテーブルの下で眠っています。
My uncle ( ) me a nice T-shirt from Hawaii.|sent / said / spoke / talked|grammar:pattern|send 人 物＝人に物を送る。|おじはハワイから私にすてきなTシャツを送ってくれました。
You look ( ) today. Did something good happen?|happy / happily / happiness / to happy|grammar:pattern|look ＋ 形容詞＝～に見える。|今日はうれしそうだね。何かいいことあった？
Can you ( ) me your new camera?|show / look / see / watch|grammar:pattern|show 人 物＝人に物を見せる。|あなたの新しいカメラを見せてくれる？
( ) run in the hallway. It's dangerous.|Don't / Not / No / Doesn't|grammar:pattern|「～してはいけない」は Don't ＋ 原形 ～.|ろうかを走ってはいけません。危ないです。
`;

// 大問2：会話文の文空所補充
// 会話（"話者: 文 // 話者: 文"、空所は ( )）|正解 / 誤答 / 誤答 / 誤答|解説|訳
export const PART2_RAW = String.raw`
Girl: Dad, can I use your computer? // Father: ( ) I'm not using it now.|Of course. / No, it isn't. / You're welcome. / I bought it.|「使ってもいい？」への答え。今は使っていないので Of course.（もちろん）。|女の子：お父さん、コンピューターを使ってもいい？ 父：もちろん。今は使っていないよ。
Boy: Mom, I'm going to Ken's house. // Mother: OK. ( ) // Boy: Before six.|What time will you come back? / How did you go there? / Who is Ken? / Where is his house?|「6時前に」と答えているので、帰る時間をたずねている。|男の子：お母さん、ケンの家に行ってくるね。母：わかったわ。何時に帰ってくるの？ 男の子：6時前に。
Woman: Excuse me. How much is this cap? // Man: ( ) // Woman: OK. I'll take it.|It's fifteen dollars. / It's blue. / It's on the shelf. / It's for my son.|How much（いくら）に値段で答える。|女性：すみません。この帽子はいくらですか。男性：15ドルです。女性：わかりました。それをください。
Girl: I have a cold, so I can't go to the party. // Boy: ( ) Get well soon.|That's too bad. / That's a good idea. / Nice to meet you. / Here you are.|かぜで行けない相手に That's too bad.（それは残念だね）。|女の子：かぜをひいているからパーティーに行けないの。男の子：それは残念だね。早くよくなってね。
Man: Would you like some more tea? // Woman: ( ) I'm full.|No, thank you. / Yes, please. / Here you are. / You're welcome.|「おなかいっぱい」なので断る No, thank you.|男性：お茶をもう少しいかがですか。女性：いいえ、けっこうです。おなかいっぱいです。
Boy: ( ) // Girl: It's Wednesday.|What day is it today? / What's the date today? / What time is it? / How's the weather?|曜日（Wednesday）を答えているので What day is it today?|男の子：今日は何曜日？ 女の子：水曜日だよ。
Girl: Where did you go last weekend? // Boy: ( ) I saw many animals.|I went to the zoo. / I'll go to the zoo. / I like animals. / I'm going to the park.|過去の質問（did）なので過去形 went で答える。|女の子：先週末はどこに行ったの？ 男の子：動物園に行ったよ。たくさんの動物を見たんだ。
Mother: Tom, dinner is ready. // Son: ( ) I'll be there in a minute.|I'm coming. / Here it is. / See you. / I'm full.|呼ばれて「今行くよ」は I'm coming.|母：トム、夕食ができたわよ。息子：今行く。すぐ行くよ。
Boy: Thank you for helping me with my homework. // Girl: ( )|You're welcome. / I'm sorry. / Yes, I do. / Good idea.|お礼を言われたら You're welcome.（どういたしまして）。|男の子：宿題を手伝ってくれてありがとう。女の子：どういたしまして。
Man: Can I help you? // Woman: ( ) I'm looking for a birthday present for my son.|Yes, please. / No, thank you. / Here you are. / I'm fine.|さがし物があるので Yes, please.（はい、お願いします）。|男性：いらっしゃいませ。女性：はい、お願いします。息子の誕生日プレゼントをさがしているんです。
Girl: Shall we go to the library after school? // Boy: ( ) I have to study for the test.|Yes, let's. / No, it isn't. / I went there. / You're welcome.|Shall we ～? には Yes, let's. で答える。テスト勉強のために図書館へ行く。|女の子：放課後図書館に行かない？ 男の子：うん、行こう。テスト勉強をしないといけないんだ。
Boy: Your bag looks heavy. ( ) // Woman: Oh, thank you. That's very kind of you.|Shall I carry it for you? / Where did you buy it? / Is it your bag? / Can I have it?|女性が「ご親切に」とお礼を言っているので、手伝いを申し出る Shall I ～?|男の子：かばんが重そうですね。お持ちしましょうか。女性：まあ、ありがとう。ご親切に。
Girl: How was your trip to Kyoto? // Boy: ( ) I visited many old temples.|It was great. / By train. / For three days. / With my family.|How was ～?（～はどうだった？）には感想で答える。|女の子：京都旅行はどうだった？ 男の子：最高だったよ。古いお寺をたくさん訪れたんだ。
Man: How long does it take to the airport by bus? // Woman: ( )|About forty minutes. / At seven. / Every hour. / Two tickets.|How long does it take ～?（どのくらい時間がかかる？）→ About forty minutes.|男性：バスで空港までどのくらいかかりますか。女性：40分くらいです。
Woman: Excuse me. Where is the post office? // Man: ( ) It's next to the bank.|Go straight and turn right. / It's ten o'clock. / I bought some stamps. / It's a letter.|場所をたずねられたので道順を教える。|女性：すみません。郵便局はどこですか。男性：まっすぐ行って右に曲がってください。銀行のとなりです。
Boy: Mom, where is my baseball cap? // Mother: ( ) I saw it on the sofa.|Look in the living room. / It's blue. / You bought it last year. / It's very cool.|ソファーの上で見た → 居間をさがして、が自然。|男の子：お母さん、ぼくの野球帽はどこ？ 母：居間を見てごらん。ソファーの上にあったわよ。
Girl: Do you want to play tennis this afternoon? // Boy: ( ) I have to visit my grandmother.|Sorry, I can't. / Yes, I do. / That sounds fun. / I like tennis.|祖母を訪ねなければならないので断る。|女の子：今日の午後テニスをしない？ 男の子：ごめん、できないんだ。おばあちゃんの家に行かないといけなくて。
Teacher: You did very well on the test, Mika. // Student: ( ) I studied a lot.|Thank you. / You're welcome. / I'm sorry. / See you.|ほめられたので Thank you.|先生：ミカ、テストとてもよくできていたね。生徒：ありがとうございます。たくさん勉強しました。
Boy: What do you want to be in the future? // Girl: ( ) I love animals.|A vet. / Next year. / In Tokyo. / Very much.|将来なりたいもの → A vet.（獣医）。動物が大好きだから。|男の子：将来何になりたい？ 女の子：獣医さん。動物が大好きなの。
Woman: Which bus goes to the museum? // Man: ( )|The number five bus. / It's two dollars. / At the station. / Every day.|Which bus（どのバス）→ 5番のバス。|女性：どのバスが博物館に行きますか。男性：5番のバスです。
Girl: Whose notebook is this? // Boy: ( ) Look, his name is on it.|It's Ken's. / It's new. / It's on the desk. / It's 200 yen.|Whose（だれの）には持ち主で答える。his name → 男の子のもの。|女の子：これはだれのノート？ 男の子：ケンのだよ。ほら、名前が書いてある。
Father: Did you finish your homework? // Son: ( ) I'll do it after dinner.|Not yet. / Yes, I did. / It's easy. / Here you are.|夕食のあとでやる → まだ終わっていない Not yet.|父：宿題は終わったかい？ 息子：まだ。夕食のあとでやるよ。
Girl: Happy birthday, Mike! This is for you. // Boy: Wow! ( )|Can I open it? / How old are you? / Where are you going? / Is it yours?|プレゼントをもらって「開けてもいい？」が自然。|女の子：誕生日おめでとう、マイク！これどうぞ。男の子：わあ！開けてもいい？
Man: What would you like to drink? // Woman: ( )|Orange juice, please. / Yes, I would. / A hamburger, please. / I'm thirsty.|飲み物をたずねられているので飲み物で答える。|男性：お飲み物は何になさいますか。女性：オレンジジュースをお願いします。
Boy: I'm going to Hawaii next week. // Girl: Really? ( )|Have a nice trip. / Welcome home. / Nice to meet you. / Good morning.|旅行に行く人に Have a nice trip.（よい旅を）。|男の子：来週ハワイに行くんだ。女の子：本当？よい旅を。
Girl: This cake is delicious. Did you make it? // Boy: Yes. ( )|My mother taught me. / I bought it at the store. / It's 500 yen. / I'm not hungry.|自分で作った（Yes）ので、作り方を教わった話が自然。|女の子：このケーキおいしい。あなたが作ったの？ 男の子：うん。母が教えてくれたんだ。
Woman: Can I speak to Mr. Brown? // Man: ( ) He's out now.|I'm sorry. / Speaking. / Hold on, please. / Thank you.|彼は外出中なので「すみません」。Speaking. は「私です」。|女性：ブラウンさんをお願いできますか。男性：すみません。今外出しています。
Boy: Let's have lunch in the park. // Girl: ( ) It's a nice day today.|That's a good idea. / That's too bad. / I'm sorry. / No, thank you.|いい天気なので賛成する。|男の子：公園で昼食を食べよう。女の子：いい考えね。今日はいい天気だし。
Mother: You look tired, Jim. // Son: ( ) I played soccer for three hours.|Yes, I am. / No, it isn't. / Yes, you can. / No, I didn't.|3時間サッカーをした → 疲れている Yes, I am (tired).|母：ジム、疲れているみたいね。息子：うん、疲れたよ。3時間サッカーをしたんだ。
Girl: How often do you practice the piano? // Boy: ( )|Every day. / For an hour. / At home. / Last week.|How often（どのくらいの頻度で）→ Every day.|女の子：どのくらいピアノを練習するの？ 男の子：毎日だよ。
Man: Excuse me. Is this seat free? // Woman: ( ) Please sit down.|Yes, it is. / No, it isn't. / Yes, I am. / No, thanks.|「どうぞすわって」→ 空いている Yes, it is.|男性：すみません。この席は空いていますか。女性：はい、空いています。どうぞおすわりください。
Boy: I lost my eraser. // Girl: ( ) You can use mine.|Don't worry. / Good job. / Congratulations. / See you later.|困っている相手に Don't worry.（心配しないで）。|男の子：消しゴムをなくしちゃった。女の子：心配しないで。私のを使っていいよ。
Girl: What time does the movie start? // Boy: ( ) We have to hurry.|In ten minutes. / For two hours. / It was fun. / At the theater.|「急がないと」→ あと10分で始まる。|女の子：映画は何時に始まるの？ 男の子：あと10分だよ。急がないと。
Woman: How do you go to school? // Boy: ( )|By bike. / With my sister. / At eight. / Every day.|How（どうやって）→ 交通手段 By bike.|女性：どうやって学校に行くの？ 男の子：自転車です。
Boy: Can you come to my house on Saturday? // Girl: I'd love to. ( )|What time should I come? / Where did you go? / How was it? / Who are you?|行くことにしたので、何時に行けばいいかたずねる。|男の子：土曜日にうちに来られる？ 女の子：ぜひ行きたい。何時に行けばいい？
Clerk: That's 800 yen. // Customer: ( ) // Clerk: Here's your change.|Here's 1,000 yen. / I'm just looking. / It's too big. / For here, please.|おつりをもらう前にお金をわたしている。|店員：800円です。客：1,000円でお願いします。店員：おつりです。
Girl: Is Emi at school today? // Boy: No. ( ) She has a fever.|She's sick at home. / She's in the gym. / She's my friend. / She's twelve.|熱がある → 病気で家にいる。|女の子：エミは今日学校に来てる？ 男の子：ううん。病気で家にいるよ。熱があるんだって。
Father: It's raining. ( ) // Daughter: OK. Thanks, Dad.|Take an umbrella with you. / Let's go swimming. / It's sunny today. / Open the window.|雨なので「かさを持っていきなさい」。|父：雨が降っているよ。かさを持っていきなさい。娘：わかった。ありがとう、お父さん。
Boy: Which season do you like the best? // Girl: ( ) I can go skiing.|Winter. / Swimming. / Tomorrow. / Hokkaido.|スキーができる季節 → Winter.|男の子：どの季節がいちばん好き？ 女の子：冬。スキーに行けるから。
Man: How many brothers do you have? // Boy: ( )|Just one. / He's ten. / Twelve years old. / Very tall.|How many（何人）→ 数で答える。|男性：兄弟は何人いるの？ 男の子：1人だけです。
Girl: I'm going to make curry tonight. // Mother: ( ) Do you need any help?|Sounds good. / That's too bad. / I'm sorry. / Excuse me.|夕食を作るという話に「いいわね」。|女の子：今夜カレーを作るね。母：いいわね。手伝いはいる？
Woman: Hello. This is Lisa. Can I speak to Kate? // Man: ( ) I'll get her.|Just a moment, please. / She's out now. / Wrong number. / Goodbye.|「呼んでくるね」→ 少々お待ちください。|女性：もしもし。リサです。ケイトさんをお願いできますか。男性：少々お待ちください。呼んできます。
Boy: Where do you live? // Girl: ( ) It's near the station.|In Midori Town. / By bus. / Ten years. / At seven.|Where（どこ）→ 場所で答える。|男の子：どこに住んでいるの？ 女の子：みどり町だよ。駅の近くなの。
Girl: Shall I help you wash the dishes? // Boy: ( ) Thank you.|Yes, please. / Yes, let's. / No, I'm not. / Here you are.|Shall I ～? には Yes, please. で答える。|女の子：お皿洗いを手伝おうか？ 男の子：うん、お願い。ありがとう。
Boy: What did you have for breakfast? // Girl: ( )|Toast and milk. / At seven. / In the kitchen. / Yes, I did.|何を食べたか → 食べ物で答える。|男の子：朝食に何を食べたの？ 女の子：トーストと牛乳。
Woman: Are you ready for the trip? // Man: ( ) I still have to pack my bag.|Not yet. / Yes, let's. / It was fun. / I'm home.|まだ荷造りしないといけない → Not yet.|女性：旅行の準備はできた？ 男性：まだなんだ。まだかばんに荷物をつめないといけない。
Girl: I'm going to the bookstore. ( ) // Boy: Sure. I'll get my jacket.|Do you want to come with me? / What did you buy? / Where is it? / How much was it?|「いいよ、上着を取ってくる」→ いっしょに行こうとさそっている。|女の子：本屋に行くんだけど、いっしょに来る？ 男の子：うん。上着を取ってくるね。
Man: Excuse me. Do you have this shirt in a smaller size? // Woman: ( ) Here you are.|Yes, we do. / No, it isn't. / You're welcome. / I'm just looking.|「はい、どうぞ」とわたしているので、ある Yes, we do.|男性：すみません。このシャツでもっと小さいサイズはありますか。女性：はい、ございます。どうぞ。
Boy: Whose turn is it? // Girl: ( ) Go ahead, Ken.|It's yours. / It's mine. / It's Monday. / It's ten.|ケンに「どうぞ」と言っているので、ケン（あなた）の番。|男の子：だれの番？ 女の子：あなたの番よ。どうぞ、ケン。
Girl: Can I borrow this book? // Librarian: Yes. ( ) // Girl: OK. I'll bring it back next Friday.|Please return it in a week. / It's very interesting. / It's on the table. / We're closed today.|「来週金曜日に返します」→ 返す期限を伝えている。|女の子：この本を借りられますか。司書：はい。1週間後に返してください。女の子：わかりました。次の金曜日に返しに来ます。
Boy: What's wrong, Aya? // Girl: ( ) I can't find it anywhere.|I lost my key. / I'm fine. / It's my birthday. / I'm happy.|「どこにも見つからない」→ 何かをなくした。|男の子：アヤ、どうしたの？ 女の子：かぎをなくしちゃったの。どこにも見つからないの。
Man: Let's meet at the station at ten. // Woman: ( ) See you then.|OK. / No, thank you. / Excuse me. / How about you?|約束に同意して「じゃあそのときに」。|男性：10時に駅で会おう。女性：わかった。じゃあそのときにね。
Girl: This is a picture of my family. // Boy: ( ) Who is this tall man?|What a nice picture! / How much is it? / Here you are. / Nice to meet you.|家族の写真を見せられて「すてきな写真だね」。|女の子：これは私の家族の写真よ。男の子：すてきな写真だね！この背の高い男の人はだれ？
`;

// 大問4：長文の内容一致選択（A 掲示 / B Eメール・手紙 / C 説明文・物語）
// qs[].c は正解を先頭に書く
export const PASSAGES = [
  {
    id: '4A-festival', type: 'A', title: 'Midori City Summer Festival',
    body: `Midori City Summer Festival

Date: Saturday, August 5
Time: 4 p.m. to 9 p.m.
Place: Midori Park

Come and enjoy food, games, and music!
There will be a dance show at 6 p.m. At 8:30 p.m., you can see fireworks over the lake.

Please don't bring your pets.
For more information, call 123-4567.`,
    ja: 'みどり市 夏祭り\n日にち：8月5日（土）\n時間：午後4時から9時まで\n場所：みどり公園\n食べ物やゲーム、音楽を楽しみに来てください！午後6時にはダンスショーがあります。午後8時30分には湖の上の花火が見られます。\nペットは連れてこないでください。くわしくは123-4567にお電話ください。',
    qs: [
      { q: 'What time will the dance show start?', c: ['At 6 p.m.', 'At 4 p.m.', 'At 8:30 p.m.', 'At 9 p.m.'], x: '"There will be a dance show at 6 p.m." とある。' },
      { q: 'What can people see at 8:30 p.m.?', c: ['Fireworks over the lake.', 'A dance show.', 'Games in the park.', 'Many pets.'], x: '"At 8:30 p.m., you can see fireworks over the lake." とある。' },
    ],
  },
  {
    id: '4A-library', type: 'A', title: 'To All Students',
    body: `To All Students

The school library will be closed from March 20 to March 31 because we are going to paint the walls.

You can borrow up to ten books before March 19. Please return them by April 10.

New books will be on the shelves when the library opens again on April 1. Come and see them!

Ms. Tanaka, Librarian`,
    ja: '生徒のみなさんへ\n学校の図書館は、かべをぬりかえるため、3月20日から3月31日まで閉館します。\n3月19日までに最大10冊まで借りられます。4月10日までに返してください。\n4月1日に図書館が再開するとき、新しい本が本だなに並びます。見に来てください！\n司書 タナカ',
    qs: [
      { q: 'Why will the library be closed?', c: ['Because the walls will be painted.', 'Because there are no new books.', 'Because the librarian is sick.', 'Because it is too old.'], x: '"because we are going to paint the walls" とある。' },
      { q: 'When should students return the books?', c: ['By April 10.', 'By March 19.', 'By March 31.', 'By April 1.'], x: '"Please return them by April 10." とある。' },
    ],
  },
  {
    id: '4A-cooking', type: 'A', title: "Kids' Cooking Class",
    body: `Kids' Cooking Class at Green Community Center

Let's make pizza together!

When: Every Sunday in June, from 10 a.m. to 12 p.m.
Who: Children from 8 to 12 years old
Cost: 500 yen each time

Please bring an apron and a towel. You can eat your pizza for lunch after the class!
If you want to join, please call Mr. Ito by May 25.`,
    ja: 'グリーン・コミュニティセンター 子ども料理教室\nいっしょにピザを作ろう！\nいつ：6月の毎週日曜日、午前10時から午後12時\n対象：8歳から12歳の子ども\n費用：1回500円\nエプロンとタオルを持ってきてください。教室のあとは、作ったピザを昼食に食べられます！\n参加したい人は5月25日までにイトウさんに電話してください。',
    qs: [
      { q: 'How much does the class cost each time?', c: ['500 yen.', '800 yen.', '1,000 yen.', 'It is free.'], x: '"Cost: 500 yen each time" とある。' },
      { q: 'What do children need to bring?', c: ['An apron and a towel.', 'Some cheese and tomatoes.', 'Their lunch.', 'A pizza box.'], x: '"Please bring an apron and a towel." とある。' },
    ],
  },
  {
    id: '4A-cat', type: 'A', title: 'Lost Cat!',
    body: `Lost Cat!

Have you seen our cat, Momo?
She is white with a black tail. She is three years old and very friendly. She wears a small red bell.

We lost her near Sakura Station on Tuesday evening.

If you find her, please call Emma at 555-0192.
We will give you a present!`,
    ja: 'ねこをさがしています！\nうちのねこのモモを見かけませんでしたか。白くてしっぽが黒いねこです。3歳でとても人なつっこいです。小さな赤い鈴をつけています。\n火曜日の夕方、さくら駅の近くでいなくなりました。\n見つけたら、エマ（555-0192）に電話してください。お礼をさしあげます！',
    qs: [
      { q: 'What does Momo look like?', c: ['She is white with a black tail.', 'She is black with a white tail.', 'She is brown and small.', 'She has a blue bell.'], x: '"She is white with a black tail." とある。' },
      { q: 'When did the family lose Momo?', c: ['On Tuesday evening.', 'On Tuesday morning.', 'Three years ago.', 'Last Sunday.'], x: '"We lost her near Sakura Station on Tuesday evening." とある。' },
    ],
  },
  {
    id: '4A-pool', type: 'A', title: 'Blue Sky City Pool',
    body: `Blue Sky City Pool

Open: July 15 – August 31
Hours: 9:00 a.m. – 5:00 p.m. (closed on Mondays)
Price: Adults 400 yen / Children under 15: 200 yen

Swimming lessons for children are held every Saturday morning.
You need to wear a swimming cap in the pool. You can buy one at the front desk.`,
    ja: 'ブルースカイ市民プール\n営業期間：7月15日～8月31日\n時間：午前9時～午後5時（月曜日休み）\n料金：大人400円／15歳未満の子ども200円\n子ども向けの水泳教室を毎週土曜日の午前中に開いています。\nプールの中では水泳帽をかぶる必要があります。受付で買えます。',
    qs: [
      { q: 'When is the pool closed?', c: ['On Mondays.', 'On Saturdays.', 'In July.', 'At noon.'], x: '"(closed on Mondays)" とある。' },
      { q: 'What do people need to wear in the pool?', c: ['A swimming cap.', 'A T-shirt.', 'Glasses.', 'A watch.'], x: '"You need to wear a swimming cap in the pool." とある。' },
    ],
  },
  {
    id: '4B-lake', type: 'B', title: 'Weekend',
    body: `From: Emily Clark
To: Haruka Sato
Date: June 10
Subject: Weekend

Hi Haruka,
How are you? My family is going to go to Lake Hikari this Saturday. We'll have a barbecue and go fishing. Would you like to come with us? My father will drive, so we'll pick you up at your house at nine in the morning. Please bring a hat because it will be sunny and hot.
Your friend,
Emily

From: Haruka Sato
To: Emily Clark
Date: June 10
Subject: Thank you!

Hi Emily,
Thank you for inviting me! I asked my mother, and she said yes. I've never been fishing before, so I'm very excited. I'll make some cookies for everyone. See you on Saturday!
Haruka`,
    ja: '差出人：エミリー・クラーク／宛先：サトウ・ハルカ／日付：6月10日／件名：週末\nこんにちは、ハルカ。元気？うちの家族は今週の土曜日にひかり湖に行くの。バーベキューをして、つりをするよ。いっしょに来ない？父が運転するから、朝9時にあなたの家まで迎えに行くね。晴れて暑くなるから帽子を持ってきてね。あなたの友達、エミリー\n\n差出人：サトウ・ハルカ／宛先：エミリー・クラーク／日付：6月10日／件名：ありがとう！\nこんにちは、エミリー。さそってくれてありがとう！母に聞いたら、いいって。つりは一度もしたことがないから、とてもわくわくしているよ。みんなのためにクッキーを作っていくね。土曜日に会おうね！ハルカ',
    qs: [
      { q: "What will Emily's family do on Saturday?", c: ['Have a barbecue and go fishing.', 'Go swimming in the sea.', "Visit Haruka's house for lunch.", 'Make cookies together.'], x: '"We\'ll have a barbecue and go fishing." とある。' },
      { q: 'Why should Haruka bring a hat?', c: ['Because it will be sunny and hot.', 'Because it will rain.', 'Because she will ride a boat.', 'Because she lost her hat.'], x: '"Please bring a hat because it will be sunny and hot." とある。' },
      { q: 'What will Haruka make?', c: ['Some cookies.', 'A cake.', 'Some sandwiches.', 'A barbecue.'], x: 'ハルカの返信に "I\'ll make some cookies for everyone." とある。' },
    ],
  },
  {
    id: '4B-canada', type: 'B', title: 'Your stay in Canada',
    body: `From: Mike Wilson
To: Kenta Mori
Date: July 2
Subject: Your stay in Canada

Dear Kenta,
We are happy that you will stay with us next month. Our house is near a big lake, and in summer we often go swimming there.
My son, Ben, is fourteen years old, the same age as you. He plays basketball, and he wants to play with you. My wife, Sarah, loves cooking. She wants to learn how to make Japanese food, so please teach her!
It gets cold at night here, so please bring a jacket.
See you soon,
Mike Wilson`,
    ja: '差出人：マイク・ウィルソン／宛先：モリ・ケンタ／日付：7月2日／件名：カナダでの滞在について\nケンタへ\nあなたが来月うちに滞在することになってうれしいです。家は大きな湖の近くにあって、夏にはよくそこへ泳ぎに行きます。\n息子のベンは14歳で、あなたと同じ年です。バスケットボールをしていて、あなたといっしょにやりたがっています。妻のサラは料理が大好きです。和食の作り方を習いたがっているので、ぜひ教えてあげてください！\nこちらは夜は寒くなるので、上着を持ってきてください。\nまたすぐに。マイク・ウィルソン',
    qs: [
      { q: 'How old is Ben?', c: ['Fourteen.', 'Twelve.', 'Fifteen.', 'Sixteen.'], x: '"My son, Ben, is fourteen years old" とある。' },
      { q: 'What does Sarah want to do?', c: ['Learn how to make Japanese food.', 'Play basketball with Kenta.', 'Swim in the lake every day.', 'Visit Japan next month.'], x: '"She wants to learn how to make Japanese food" とある。' },
      { q: 'Why should Kenta bring a jacket?', c: ['Because it gets cold at night.', 'Because they will go swimming.', 'Because it will rain a lot.', 'Because Ben wants one.'], x: '"It gets cold at night here, so please bring a jacket." とある。' },
    ],
  },
  {
    id: '4B-festival', type: 'B', title: 'School festival',
    body: `From: Lucy Brown
To: Aya Suzuki
Date: October 3
Subject: School festival

Hi Aya,
Thank you for telling me about your school festival. I really want to go! My host mother said she will take me there on Sunday. What will your class do at the festival? I heard your class is going to open a café. Can I help you? I can make pancakes.
Lucy

From: Aya Suzuki
To: Lucy Brown
Date: October 3
Subject: Re: School festival

Hi Lucy,
Yes, our class will open a café in Room 2-B. We're going to sell drinks and cakes. Pancakes are a great idea! Can you come to our school on Saturday afternoon? We'll practice then. The festival starts at ten on Sunday.
See you,
Aya`,
    ja: '差出人：ルーシー・ブラウン／宛先：スズキ・アヤ／日付：10月3日／件名：文化祭\nこんにちは、アヤ。文化祭のことを教えてくれてありがとう。ぜひ行きたい！ホストマザーが日曜日に連れていってくれるって。あなたのクラスは文化祭で何をするの？カフェを開くって聞いたよ。手伝ってもいい？パンケーキを作れるよ。ルーシー\n\n差出人：スズキ・アヤ／宛先：ルーシー・ブラウン／日付：10月3日／件名：Re: 文化祭\nこんにちは、ルーシー。そう、私たちのクラスは2-Bの教室でカフェを開くの。飲み物とケーキを売る予定だよ。パンケーキはすてきなアイデア！土曜日の午後に学校に来られる？そのときに練習するの。文化祭は日曜日の10時に始まるよ。またね、アヤ',
    qs: [
      { q: 'Who will take Lucy to the festival?', c: ['Her host mother.', 'Aya.', 'Her teacher.', "Aya's mother."], x: '"My host mother said she will take me there on Sunday." とある。' },
      { q: "What will Aya's class sell?", c: ['Drinks and cakes.', 'Only pancakes.', 'Books and toys.', 'Flowers.'], x: '"We\'re going to sell drinks and cakes." とある。' },
      { q: "When will Aya's class practice?", c: ['On Saturday afternoon.', 'On Sunday morning.', 'On Friday after school.', 'On October 3.'], x: '"Can you come to our school on Saturday afternoon? We\'ll practice then." とある。' },
    ],
  },
  {
    id: '4B-grandma', type: 'B', title: 'Snow festival',
    body: `From: Grandma
To: Yuki
Date: January 15
Subject: Snow festival

Dear Yuki,
Thank you for the nice birthday card. I put it on my desk.
It snowed a lot here last week, and our town is all white now. Next month, there will be a snow festival in our town. People make big animals and buildings with snow. Why don't you come with your parents?
You can go skiing with your cousin, Riku, too. He goes skiing every weekend, and he is very good at it now.
Love,
Grandma`,
    ja: '差出人：おばあちゃん／宛先：ユキ／日付：1月15日／件名：雪まつり\nユキへ\nすてきな誕生日カードをありがとう。机の上にかざっているよ。\n先週ここでは雪がたくさん降って、町はすっかり真っ白です。来月、町で雪まつりがあります。雪で大きな動物や建物を作るんだよ。お父さんお母さんといっしょに来ない？\nいとこのリクといっしょにスキーにも行けるよ。リクは毎週末スキーに行っていて、今はとても上手になったの。\nおばあちゃんより',
    qs: [
      { q: 'What did Yuki send to her grandmother?', c: ['A birthday card.', 'A letter about skiing.', 'A picture of snow.', 'Some snow.'], x: '"Thank you for the nice birthday card." とある。' },
      { q: 'What will happen next month?', c: ['A snow festival.', "Riku's birthday party.", 'A skiing contest.', "Yuki's school trip."], x: '"Next month, there will be a snow festival in our town." とある。' },
      { q: 'What does Riku do every weekend?', c: ['He goes skiing.', 'He makes snow animals.', 'He writes letters.', 'He visits Yuki.'], x: '"He goes skiing every weekend" とある。' },
    ],
  },
  {
    id: '4B-soccer', type: 'B', title: 'Soccer game',
    body: `From: Ben Harris
To: Sota Kimura
Date: May 8
Subject: Soccer game

Hi Sota,
Are you free next Sunday? My brother's team has a big soccer game at Kita Stadium. It starts at 1 p.m. My mother bought four tickets, so you can come with us. After the game, let's eat hamburgers at the new restaurant near the stadium. Please write back by Friday.
Ben

From: Sota Kimura
To: Ben Harris
Date: May 9
Subject: Re: Soccer game

Hi Ben,
Thanks! I'd love to go. I have a piano lesson on Sunday morning, but it finishes at eleven. Can we meet at the stadium at 12:30? I'll bring my camera and take pictures of your brother.
Sota`,
    ja: '差出人：ベン・ハリス／宛先：キムラ・ソウタ／日付：5月8日／件名：サッカーの試合\nやあ、ソウタ。次の日曜日はひま？兄のチームがきたスタジアムで大事なサッカーの試合をするんだ。午後1時に始まるよ。母がチケットを4枚買ったから、いっしょに来られるよ。試合のあと、スタジアムの近くの新しいレストランでハンバーガーを食べよう。金曜日までに返事をちょうだい。ベン\n\n差出人：キムラ・ソウタ／宛先：ベン・ハリス／日付：5月9日／件名：Re: サッカーの試合\nやあ、ベン。ありがとう！ぜひ行きたいな。日曜日の午前中はピアノのレッスンがあるけど、11時に終わるよ。12時30分にスタジアムで会える？カメラを持っていって、お兄さんの写真を撮るね。ソウタ',
    qs: [
      { q: 'Who bought the tickets?', c: ["Ben's mother.", "Ben's brother.", 'Sota.', "Sota's father."], x: '"My mother bought four tickets" とある（ベンの母）。' },
      { q: 'What does Sota do on Sunday morning?', c: ['He has a piano lesson.', 'He plays soccer.', 'He eats hamburgers.', 'He buys tickets.'], x: '"I have a piano lesson on Sunday morning" とある。' },
      { q: 'Where will Ben and Sota meet?', c: ['At the stadium.', 'At the restaurant.', "At Sota's house.", 'At the station.'], x: '"Can we meet at the stadium at 12:30?" とある。' },
    ],
  },
  {
    id: '4C-bread', type: 'C', title: "Riko's New Hobby",
    body: `Riko's New Hobby

Riko is a junior high school student in Nagoya. Last summer, she stayed at her grandmother's house in Nagano for a week. Her grandmother makes bread every morning. One morning, Riko said, "Can you teach me how to make bread?" Her grandmother smiled and said, "Of course."

They made bread together every day. At first, it was difficult for Riko. Her bread was too hard. But on the last day, she made delicious bread with apples. Her grandmother said, "Great job!"

After Riko came home, she made bread for her family every Sunday. Her father liked it very much. In December, Riko joined a cooking contest at her school. She made apple bread, and she won second prize. Now, she wants to open her own bakery in the future.`,
    ja: 'リコの新しい趣味\nリコは名古屋の中学生です。去年の夏、長野のおばあさんの家に1週間泊まりました。おばあさんは毎朝パンを焼きます。ある朝、リコは「パンの作り方を教えてくれる？」と言いました。おばあさんはほほえんで「もちろん」と言いました。\n二人は毎日いっしょにパンを作りました。最初、リコにはそれが難しいことでした。リコのパンはかたすぎました。でも最終日には、りんご入りのおいしいパンを作りました。おばあさんは「よくできたね！」と言いました。\n家に帰ってから、リコは毎週日曜日に家族のためにパンを作りました。お父さんはとても気に入りました。12月、リコは学校の料理コンテストに参加しました。りんごのパンを作って、2等賞をとりました。今、リコは将来自分のパン屋を開きたいと思っています。',
    qs: [
      { q: "How long did Riko stay at her grandmother's house?", c: ['For a week.', 'For a month.', 'For three days.', 'For two weeks.'], x: '"she stayed at her grandmother\'s house in Nagano for a week" とある。' },
      { q: 'What did Riko ask her grandmother?', c: ['To teach her how to make bread.', 'To buy her some apples.', 'To come to Nagoya.', 'To join a contest.'], x: '"Can you teach me how to make bread?" と言っている。' },
      { q: "At first, Riko's bread was", c: ['too hard.', 'too sweet.', 'very big.', 'delicious.'], x: '"At first, it was difficult for Riko. Her bread was too hard." とある。' },
      { q: 'What did Riko do every Sunday after she came home?', c: ['She made bread for her family.', 'She visited her grandmother.', 'She went to a bakery.', 'She joined a contest.'], x: '"she made bread for her family every Sunday" とある。' },
      { q: 'What does Riko want to do in the future?', c: ['Open her own bakery.', 'Live in Nagano.', 'Win first prize.', 'Teach cooking at school.'], x: '"she wants to open her own bakery in the future" とある。' },
    ],
  },
  {
    id: '4C-jack', type: 'C', title: 'A New Friend',
    body: `A New Friend

Ken is thirteen years old. In April, a new student came to his class. His name was Jack, and he was from Australia. Jack couldn't speak Japanese well, so he was often alone during lunch time.

One day, Ken saw Jack in the library. Jack was reading a Japanese comic book. Ken said, "I like that comic, too!" Jack was happy, and they talked about the comic for a long time. After that, they became good friends.

Ken helped Jack with Japanese, and Jack taught Ken English. They studied together at the library every Wednesday. In July, Ken got a very good score on his English test. His teacher was surprised.

During the summer vacation, Jack went back to Australia for two weeks. He sent Ken a postcard with a picture of a kangaroo. It said, "Next year, please come to Australia with me!" Now Ken is saving money for the trip.`,
    ja: '新しい友達\nケンは13歳です。4月、クラスに新しい生徒が来ました。名前はジャックで、オーストラリア出身でした。ジャックは日本語をうまく話せなかったので、昼休みはひとりでいることが多くありました。\nある日、ケンは図書館でジャックを見かけました。ジャックは日本のまんがを読んでいました。ケンは「ぼくもそのまんがが好き！」と言いました。ジャックは喜び、二人は長い間そのまんがについて話しました。それから二人は仲よしになりました。\nケンはジャックの日本語を手伝い、ジャックはケンに英語を教えました。二人は毎週水曜日に図書館でいっしょに勉強しました。7月、ケンは英語のテストでとてもいい点をとりました。先生は驚きました。\n夏休みの間、ジャックは2週間オーストラリアに帰りました。ジャックはカンガルーの写真のはがきをケンに送りました。そこには「来年、いっしょにオーストラリアに来てね！」と書いてありました。今、ケンはその旅行のためにお金をためています。',
    qs: [
      { q: 'Where was Jack from?', c: ['Australia.', 'America.', 'Canada.', 'England.'], x: '"he was from Australia" とある。' },
      { q: 'Where did Ken see Jack reading a comic book?', c: ['In the library.', 'In the classroom.', 'At a bookstore.', "At Jack's house."], x: '"One day, Ken saw Jack in the library. Jack was reading a Japanese comic book." とある。' },
      { q: 'What did Ken and Jack do every Wednesday?', c: ['They studied together at the library.', 'They played soccer after school.', 'They read comics at home.', 'They went to an English school.'], x: '"They studied together at the library every Wednesday." とある。' },
      { q: "Why was Ken's teacher surprised?", c: ['Ken got a very good score on his English test.', 'Jack spoke Japanese very well.', 'Ken went to Australia.', 'Jack sent a postcard to the teacher.'], x: '"Ken got a very good score on his English test. His teacher was surprised." とある。' },
      { q: 'What is Ken doing now?', c: ['He is saving money for a trip to Australia.', 'He is writing a postcard to Jack.', 'He is teaching Japanese at school.', 'He is looking for a kangaroo.'], x: '"Now Ken is saving money for the trip." とある。' },
    ],
  },
  {
    id: '4C-zoo', type: 'C', title: "Mika's Dream Job",
    body: `Mika's Dream Job

Mika loves animals. Last month, she visited Midori Zoo with her class. A zookeeper, Ms. Sato, showed the students around the zoo and told them about her job. "I get up at five every morning," she said. "I clean the animals' rooms and give them food. The elephants eat about 100 kilograms of food every day!" The students were very surprised.

Ms. Sato also said, "Last year, a baby panda was born here. It was very small and weak, so I stayed with it all night for many days." Now the baby panda is healthy and very popular with visitors.

After the trip, Mika wrote a report about Ms. Sato's job. She wrote, "Zookeepers work very hard, but they look happy." Now, Mika wants to be a zookeeper in the future. She is going to visit the zoo again this weekend with her father.`,
    ja: 'ミカの夢の仕事\nミカは動物が大好きです。先月、クラスでみどり動物園を訪れました。飼育員のサトウさんが生徒たちに動物園を案内し、仕事について話してくれました。「私は毎朝5時に起きます」とサトウさんは言いました。「動物の部屋をそうじして、えさをあげます。ゾウは毎日約100キロの食べ物を食べるんですよ！」生徒たちはとても驚きました。\nサトウさんはこうも言いました。「去年、ここでパンダの赤ちゃんが生まれました。とても小さくて弱かったので、何日も一晩中そばにいました。」今ではパンダの赤ちゃんは元気で、来園者にとても人気があります。\n見学のあと、ミカはサトウさんの仕事についてレポートを書きました。「飼育員はとても一生懸命働いているけれど、幸せそうに見えます」と書きました。今、ミカは将来飼育員になりたいと思っています。今週末、お父さんともう一度動物園に行く予定です。',
    qs: [
      { q: 'Who showed the students around the zoo?', c: ['Ms. Sato.', "Mika's father.", "Mika's teacher.", 'A doctor.'], x: '"A zookeeper, Ms. Sato, showed the students around the zoo" とある。' },
      { q: 'What time does Ms. Sato get up?', c: ['At five.', 'At six.', 'At seven.', 'At eight.'], x: '"I get up at five every morning" と言っている。' },
      { q: 'Why were the students surprised?', c: ['The elephants eat a lot of food.', 'The zoo was very big.', 'Ms. Sato lived in the zoo.', 'The pandas were sleeping.'], x: '"The elephants eat about 100 kilograms of food every day!" のあとに驚いたとある。' },
      { q: 'What did Ms. Sato do last year?', c: ['She stayed with a baby panda all night.', 'She went to China.', 'She wrote a report.', 'She bought a panda.'], x: '"I stayed with it all night for many days" とある。' },
      { q: 'What will Mika do this weekend?', c: ['Visit the zoo with her father.', 'Write a report at home.', "Clean the animals' rooms.", 'Meet Ms. Sato at school.'], x: '"She is going to visit the zoo again this weekend with her father." とある。' },
    ],
  },
  {
    id: '4C-tom', type: 'C', title: "Tom's First Trip to Japan",
    body: `Tom's First Trip to Japan

Tom lives in Chicago in America. Last spring, he went to Japan with his parents. It was his first trip to a foreign country. First, they stayed in Tokyo for three days. They went to a big department store and bought many things. Tom liked Japanese pens and notebooks very much.

Then they took a train to Kyoto. In Kyoto, they visited many old temples. But at one temple, Tom lost his bag. His camera was in it, and he was very sad. His father talked to a police officer.

A few hours later, the police officer called Tom's father. A high school student found the bag and took it to the police. Tom was very happy. He wanted to thank the student, so he wrote a letter to her.

Now Tom is studying Japanese. He wants to go back to Japan and meet the student someday.`,
    ja: 'トムの初めての日本旅行\nトムはアメリカのシカゴに住んでいます。去年の春、両親と日本に行きました。初めての外国旅行でした。まず東京に3日間泊まりました。大きなデパートに行って、たくさんのものを買いました。トムは日本のペンやノートがとても気に入りました。\nそれから電車で京都に行きました。京都では古いお寺をたくさん訪れました。ところが、あるお寺でトムはかばんをなくしてしまいました。中にはカメラが入っていて、トムはとても悲しくなりました。お父さんは警察官に話しました。\n数時間後、警察官からお父さんに電話がありました。高校生がかばんを見つけて警察に届けてくれたのです。トムはとても喜びました。その生徒にお礼を言いたかったので、手紙を書きました。\n今、トムは日本語を勉強しています。いつか日本にもどって、その生徒に会いたいと思っています。',
    qs: [
      { q: "How long did Tom's family stay in Tokyo?", c: ['For three days.', 'For a week.', 'For two days.', 'For a month.'], x: '"they stayed in Tokyo for three days" とある。' },
      { q: 'What did Tom like very much?', c: ['Japanese pens and notebooks.', 'Old temples in Tokyo.', 'The police officer.', 'The food in Chicago.'], x: '"Tom liked Japanese pens and notebooks very much." とある。' },
      { q: 'What happened at a temple in Kyoto?', c: ['Tom lost his bag.', 'Tom met a high school student.', 'Tom bought a camera.', 'Tom wrote a letter.'], x: '"at one temple, Tom lost his bag" とある。' },
      { q: "Who found Tom's bag?", c: ['A high school student.', 'A police officer.', "Tom's father.", "Tom's mother."], x: '"A high school student found the bag" とある。' },
      { q: 'What does Tom want to do someday?', c: ['Go back to Japan and meet the student.', 'Live in Kyoto with his family.', 'Become a police officer.', 'Teach English in Japan.'], x: '"He wants to go back to Japan and meet the student someday." とある。' },
    ],
  },
  {
    id: '4C-garden', type: 'C', title: 'Yuta and the Vegetable Garden',
    body: `Yuta and the Vegetable Garden

Yuta's grandfather has a big vegetable garden behind his house. Every spring, he grows tomatoes, potatoes, and carrots there. Last April, Yuta's grandfather became sick and had to stay in the hospital for a month. He was worried about his garden.

Yuta said, "Don't worry, Grandpa. I'll take care of it." Every day after school, Yuta went to the garden and gave water to the plants. On weekends, his friend Daiki helped him, too. It was hard work, but Yuta enjoyed it.

In July, Yuta's grandfather came home. He saw many big red tomatoes in the garden and was very happy. He said, "Thank you, Yuta. You're a great farmer!" That evening, Yuta's family ate a salad with the tomatoes. Yuta thought it was the best salad in the world.`,
    ja: 'ユウタと野菜畑\nユウタのおじいさんは家の裏に大きな野菜畑を持っています。毎年春、そこでトマトやじゃがいも、にんじんを育てています。去年の4月、おじいさんは病気になり、1か月入院しなければなりませんでした。おじいさんは畑のことを心配していました。\nユウタは「心配しないで、おじいちゃん。ぼくが世話をするよ」と言いました。毎日放課後、ユウタは畑に行って植物に水をあげました。週末には友達のダイキも手伝ってくれました。大変な仕事でしたが、ユウタは楽しみました。\n7月、おじいさんが家に帰ってきました。畑に大きな赤いトマトがたくさんなっているのを見て、とても喜びました。「ありがとう、ユウタ。きみはすばらしい農家だね！」と言いました。その晩、ユウタの家族はそのトマトでサラダを食べました。ユウタは世界一のサラダだと思いました。',
    qs: [
      { q: "What does Yuta's grandfather grow in spring?", c: ['Tomatoes, potatoes, and carrots.', 'Only tomatoes.', 'Flowers and trees.', 'Rice and onions.'], x: '"he grows tomatoes, potatoes, and carrots there" とある。' },
      { q: "Why did Yuta's grandfather stay in the hospital?", c: ['He became sick.', 'He worked there.', 'He visited a friend.', 'He was a doctor.'], x: '"Yuta\'s grandfather became sick and had to stay in the hospital" とある。' },
      { q: 'What did Yuta do every day after school?', c: ['He gave water to the plants.', 'He visited the hospital.', 'He played with Daiki.', 'He made salad.'], x: '"Every day after school, Yuta went to the garden and gave water to the plants." とある。' },
      { q: 'Who helped Yuta on weekends?', c: ['His friend Daiki.', 'His grandfather.', 'His mother.', 'A farmer.'], x: '"On weekends, his friend Daiki helped him, too." とある。' },
      { q: "When did Yuta's grandfather come home?", c: ['In July.', 'In April.', 'In May.', 'In June.'], x: '"In July, Yuta\'s grandfather came home." とある。' },
    ],
  },
];
