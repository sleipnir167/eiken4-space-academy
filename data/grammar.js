// 英検4級で出る文法のミニレッスン
// key は大問1・大問3（並べかえ）の問題の「grammar:キー」と対応している（レッスンから関連問題を練習できる）
export const GRAMMAR = [
  {
    key: 'past', title: '過去形', icon: '⏪', level: '最重要',
    summary: '「～した」「～だった」は過去形。一般動詞は -ed をつけるか、形が変わる（不規則動詞）。be動詞は was / were。',
    points: [
      { h: '一般動詞の過去形', t: 'ふつうは -ed（played, visited）。不規則動詞は形が変わる（go → went, eat → ate, buy → bought）。', ex: [['I played tennis yesterday.', '昨日テニスをしました。'], ['We went to the zoo last Sunday.', 'この前の日曜日に動物園へ行きました。']] },
      { h: '否定文・疑問文は did', t: '〈didn\'t ＋ 動詞の原形〉〈Did ＋ 主語 ＋ 動詞の原形 ～?〉。did を使ったら動詞は原形にもどす。', ex: [['I didn\'t watch TV last night.', '昨夜はテレビを見ませんでした。'], ['Did you finish your homework? — Yes, I did.', '宿題は終わった？ — うん、終わったよ。']] },
      { h: 'be動詞の過去形', t: 'am / is → was、are → were。「～だった」「～にいた」。', ex: [['It was sunny yesterday.', '昨日は晴れでした。'], ['Where were you at five?', '5時にどこにいましたか。']] },
    ],
    tips: ['yesterday（昨日）・last ～（この前の～）・～ ago（～前）・then（そのとき）があれば過去形のサイン！', 'つづりに注意：study → studied、stop → stopped、try → tried（「過去形マスター」で練習しよう）'],
  },
  {
    key: 'pastprog', title: '過去進行形', icon: '🎞️', level: '重要',
    summary: '〈was / were ＋ ～ing〉で「（そのとき）～していた」。',
    points: [
      { h: '形と意味', t: '過去のある時点でしている途中だったことを表す。', ex: [['I was reading a book at eight last night.', '昨夜8時に私は本を読んでいました。'], ['They were playing soccer then.', '彼らはそのときサッカーをしていました。']] },
      { h: '疑問文と答え方', t: 'What were you doing ～? と聞かれたら I was ～ing. で答える。', ex: [['What were you doing when I called you?', '私が電話したとき何をしていたの？'], ['I was taking a bath.', 'おふろに入っていたんだ。']] },
    ],
    tips: ['when（～したとき）といっしょによく使われる。', 'was / were を忘れて I reading とはしない。'],
  },
  {
    key: 'future', title: '未来（will / be going to）', icon: '🔮', level: '最重要',
    summary: '〈will ＋ 動詞の原形〉〈be going to ＋ 動詞の原形〉で「～するつもりだ」「～するだろう」。',
    points: [
      { h: 'be going to：予定', t: '前から決めていた予定。be動詞は主語で変わる（I am / He is / They are）。', ex: [['I\'m going to visit my grandmother this weekend.', '今週末は祖母を訪ねる予定です。'], ['What are you going to do tomorrow?', '明日は何をする予定ですか。']] },
      { h: 'will：予想・その場で決めたこと', t: '「～だろう」という予想や、その場で「～します」と決めたこと。', ex: [['It will be rainy tomorrow.', '明日は雨でしょう。'], ['I\'ll help you.', '手伝うよ。']] },
      { h: '否定文・疑問文', t: 'won\'t（will not）＋原形、Will you ～?。be going to は be動詞の文と同じ。', ex: [['I won\'t be late.', '遅れないよ。'], ['Is she going to join the party?', '彼女はパーティーに参加する予定ですか。']] },
    ],
    tips: ['tomorrow・next ～・this weekend・someday は未来のサイン。', 'will のあとの動詞は必ず原形（will goes ×）。'],
  },
  {
    key: 'modal', title: '助動詞（can / must / have to / should / may）', icon: '🛠️', level: '最重要',
    summary: '動詞の前に置いて意味をつけ加える。助動詞のあとの動詞はいつも原形。',
    points: [
      { h: 'can：～できる・～してもよい', t: 'Can I ～?（～してもいい？）、Can you ～?（～してくれる？）。過去形は could。', ex: [['My sister can swim very fast.', '妹はとても速く泳げます。'], ['Can I use your pen?', 'ペンを使ってもいい？']] },
      { h: 'must / have to：～しなければならない', t: 'have to は主語が3人称単数なら has to。don\'t have to は「～しなくてよい」。', ex: [['You must be quiet here.', 'ここでは静かにしなければなりません。'], ['He has to get up early tomorrow.', '彼は明日早く起きなければなりません。']] },
      { h: 'should：～したほうがよい', t: 'アドバイスに使う。', ex: [['You should take a rest.', '休んだほうがいいよ。']] },
      { h: 'may：～してもよい・～かもしれない', t: 'May I ～? はていねいな「～してもよろしいですか」。', ex: [['May I come in?', '入ってもよろしいですか。']] },
    ],
    tips: ['can plays、must goes のように助動詞のあとに -s はつけない。', 'Must I ～? — No, you don\'t have to.（しなくていいよ）の答え方に注意。'],
  },
  {
    key: 'request', title: '依頼・提案・さそいの表現', icon: '🙋', level: '最重要',
    summary: '会話文（大問2）でよく出る決まった言い方。答え方とセットで覚えよう。',
    points: [
      { h: 'たのむ', t: 'Can you ～? / Could you ～? / Will you ～?（～してくれますか）→ Sure. / OK. / Sorry, I can\'t.', ex: [['Could you open the window? — Sure.', '窓を開けていただけますか。— いいですよ。']] },
      { h: 'さそう・提案する', t: 'Let\'s ～. / Shall we ～? / How about ～ing? / Why don\'t you ～?', ex: [['Shall we go shopping? — Yes, let\'s.', '買い物に行きましょうか。— ええ、行きましょう。'], ['How about going to the park?', '公園に行くのはどう？']] },
      { h: '申し出る・すすめる', t: 'Shall I ～?（～しましょうか）/ Would you like ～?（～はいかがですか）→ Yes, please. / No, thank you.', ex: [['Shall I carry your bag? — Thank you.', 'かばんを持ちましょうか。— ありがとう。'], ['Would you like some tea? — Yes, please.', 'お茶はいかがですか。— はい、お願いします。']] },
      { h: 'ほしいもの・したいこと', t: 'I\'d like ～.（～がほしい）/ I\'d like to ～.（～したい）', ex: [['I\'d like a glass of water.', '水を1杯ください。']] },
    ],
    tips: ['Shall I ～? と Shall we ～? は答え方がちがう（Yes, please. / Yes, let\'s.）。', 'How about ～ing? の ～ing（動名詞）を忘れずに。'],
  },
  {
    key: 'infinitive', title: '不定詞（to ＋ 動詞の原形）', icon: '➡️', level: '重要',
    summary: '〈to ＋ 動詞の原形〉で「～すること」「～するために」「～するための」。',
    points: [
      { h: '～すること', t: 'want to ～（～したい）・like to ～・start to ～・decide to ～・hope to ～', ex: [['I want to be a pilot.', '私はパイロットになりたいです。'], ['It started to rain.', '雨が降り始めました。']] },
      { h: '～するために', t: '目的を表す。Why ～? の答えにも使える。', ex: [['I went to the library to study.', '勉強するために図書館へ行きました。']] },
      { h: '～するための・～すべき', t: 'something to drink（何か飲むもの）、a lot of homework to do', ex: [['I want something to eat.', '何か食べるものがほしいです。']] },
    ],
    tips: ['to のあとは必ず原形（to went ×、to go ○）。', 'want to の意味：I want to ～ は「～したい」。'],
  },
  {
    key: 'gerund', title: '動名詞（～ing）', icon: '🏃', level: '重要',
    summary: '動詞の ～ing で「～すること」。',
    points: [
      { h: '～ing をとる動詞', t: 'enjoy ～ing（～して楽しむ）・finish ～ing（～し終える）・stop ～ing（～するのをやめる）', ex: [['We enjoyed swimming in the sea.', '私たちは海で泳いで楽しみました。'], ['I finished doing my homework.', '宿題をし終えました。']] },
      { h: '前置詞のあと', t: 'be good at ～ing（～するのが得意）・How about ～ing?・Thank you for ～ing.', ex: [['Emi is good at singing.', 'エミは歌うのが得意です。'], ['Thank you for helping me.', '手伝ってくれてありがとう。']] },
      { h: '主語になる', t: '～ing が文の主語になる。', ex: [['Playing the piano is fun.', 'ピアノをひくことは楽しいです。']] },
    ],
    tips: ['enjoy・finish のあとに to ～ は使わない（enjoy to swim ×）。', 'like は like to ～ と like ～ing のどちらも OK。'],
  },
  {
    key: 'compare', title: '比較', icon: '⚖️', level: '最重要',
    summary: '2つを比べるときは比較級 ＋ than、3つ以上の中で「いちばん」は the ＋ 最上級。',
    points: [
      { h: '比較級：～より…だ', t: '短い語は -er（tall → taller）、長い語は more（popular → more popular）。', ex: [['Ken is taller than his father.', 'ケンはお父さんより背が高いです。'], ['This book is more interesting than that one.', 'この本はあの本よりおもしろいです。']] },
      { h: '最上級：いちばん…だ', t: 'in ＋ 場所・集団（in my class）、of ＋ 複数（of the three / of all）。', ex: [['Mt. Fuji is the highest mountain in Japan.', '富士山は日本でいちばん高い山です。'], ['Who is the fastest runner in your class?', 'クラスでいちばん速く走るのはだれですか。']] },
      { h: 'as ～ as …：…と同じくらい～', t: '否定の not as ～ as … は「…ほど～でない」。', ex: [['My bag is as big as yours.', '私のかばんはあなたのと同じくらい大きいです。']] },
      { h: '好きなものを比べる', t: 'Which do you like better, A or B? — I like A better. ／ What ～ do you like the best?', ex: [['Which do you like better, dogs or cats?', '犬とねこ、どちらが好きですか。']] },
    ],
    tips: ['good / well → better → best、many / much → more → most は不規則。', 'big → bigger（g を重ねる）、easy → easier（y を i に）。'],
  },
  {
    key: 'there', title: 'There is / There are', icon: '📍', level: '重要',
    summary: '〈There is ＋ 単数〉〈There are ＋ 複数〉で「～がある・いる」。過去は was / were。',
    points: [
      { h: '基本の形', t: '後ろの名詞が1つなら is、2つ以上なら are。', ex: [['There is a cat under the table.', 'テーブルの下にねこがいます。'], ['There are three parks in my town.', '私の町には公園が3つあります。']] },
      { h: '疑問文・数をたずねる', t: 'Is there ～? / How many ～ are there?', ex: [['Is there a bank near here? — Yes, there is.', 'この近くに銀行はありますか。— はい、あります。'], ['How many students are there in your class?', 'あなたのクラスには生徒が何人いますか。']] },
      { h: '過去の文', t: 'There was ～. / There were ～.', ex: [['There were many people at the festival.', 'お祭りにはたくさんの人がいました。']] },
    ],
    tips: ['「ある」ものが特定のもの（my bag など）のときは My bag is on the desk. のように言う。'],
  },
  {
    key: 'conj', title: '接続詞（when / if / because / that）', icon: '🔗', level: '重要',
    summary: '文と文をつなぐことば。',
    points: [
      { h: 'when：～するとき', t: '「～のとき」。文の前半にも後半にも置ける。', ex: [['When I got home, my mother was cooking.', '家に帰ったとき、母は料理をしていました。']] },
      { h: 'if：もし～なら', t: 'if の文の中は未来のことでも現在形。', ex: [['If it is sunny tomorrow, we will go on a picnic.', '明日晴れたら、ピクニックに行きます。']] },
      { h: 'because：～なので', t: '理由を表す。Why ～? の答えにも使う。', ex: [['I stayed home because I had a cold.', 'かぜをひいていたので家にいました。']] },
      { h: 'that：～ということ', t: 'think that ～・know that ～・hope that ～。that は省略できる。', ex: [['I think that this movie is great.', 'この映画はすばらしいと思います。']] },
      { h: 'and / but / so / or', t: 'そして / しかし / だから / または', ex: [['I was tired, so I went to bed early.', '疲れていたので早く寝ました。']] },
    ],
    tips: ['so（だから）の前が理由、後ろが結果。because は逆。'],
  },
  {
    key: 'question', title: '疑問詞（How many / How much / Which / Whose / Why …）', icon: '❓', level: '最重要',
    summary: '何をたずねているかで、答え方が決まる。会話文とリスニングで大活躍！',
    points: [
      { h: 'How ～?', t: 'How many（数）・How much（値段・量）・How long（長さ・期間）・How old（年れい）・How often（回数）・How far（きょり）', ex: [['How much is this bag? — It\'s 2,000 yen.', 'このかばんはいくら？ — 2,000円です。'], ['How long did you stay there? — For a week.', 'そこにどのくらいいたの？ — 1週間。']] },
      { h: 'Which / Whose', t: 'Which（どちら・どの）・Whose（だれの）', ex: [['Whose notebook is this? — It\'s Ken\'s.', 'これはだれのノート？ — ケンのです。']] },
      { h: 'Why / When / Where / What time', t: 'Why → Because ～. / To ～.、When → 時、Where → 場所、What time → 時刻', ex: [['Why were you late? — Because I missed the bus.', 'なぜ遅れたの？ — バスに乗り遅れたからです。']] },
    ],
    tips: ['What time ～? には At seven.、When ～? には Next Sunday. などと答える。'],
  },
  {
    key: 'pronoun', title: '代名詞（mine / yours / something）', icon: '👉', level: '重要',
    summary: '「～のもの」「何か」などを表す代名詞。',
    points: [
      { h: '「～のもの」', t: 'mine（私のもの）・yours（あなたのもの）・his（彼のもの）・hers（彼女のもの）・ours（私たちのもの）・theirs（彼らのもの）', ex: [['This bike is mine.', 'この自転車は私のものです。'], ['Is that umbrella yours?', 'あのかさはあなたのものですか。']] },
      { h: '目的格', t: 'me / you / him / her / us / them（動詞や前置詞のあと）', ex: [['Please help me.', '手伝ってください。'], ['I often play with them.', 'よく彼らと遊びます。']] },
      { h: 'something / anything / someone', t: '肯定文は something、疑問文・否定文は anything が基本。', ex: [['Do you have anything to drink?', '何か飲み物はありますか。']] },
    ],
    tips: ['one は同じ種類の「もの」をさす（a red one＝赤いもの）。'],
  },
  {
    key: 'prep', title: '前置詞（at / on / in / by / for / during / until）', icon: '🧭', level: '重要',
    summary: '時・場所・方法を表すことば。セットで覚えるのがコツ。',
    points: [
      { h: '時を表す', t: 'at ＋ 時刻（at seven）、on ＋ 曜日・日付（on Monday）、in ＋ 月・季節・年（in May / in summer）', ex: [['The party starts at six on Saturday.', 'パーティーは土曜日の6時に始まります。']] },
      { h: '期間を表す', t: 'for ＋ 期間（for two hours）、during ＋ 期間の名前（during the vacation）、until ～まで（ずっと）、by ～までに', ex: [['I stayed in Kyoto for three days.', '京都に3日間滞在しました。'], ['Please come back by five.', '5時までにもどってね。']] },
      { h: '場所・方法', t: 'in front of（前）・behind（後ろ）・between A and B（間）・next to（となり）・by bus（バスで）・on foot（歩いて）', ex: [['The bank is between the park and the station.', '銀行は公園と駅の間にあります。']] },
    ],
    tips: ['by（～までに：期限）と until（～までずっと：継続）のちがいに注意。'],
  },
  {
    key: 'pattern', title: '文の形（give 人 物 / look ＋ 形容詞）', icon: '🧱', level: 'ふつう',
    summary: '動詞のあとの語順が決まっている文の形。並べかえ問題でよく出る！',
    points: [
      { h: '〈動詞 ＋ 人 ＋ 物〉', t: 'give・show・tell・teach・send・buy・make ＋ 人 ＋ 物＝「人に物を～する」', ex: [['My father gave me a watch.', '父が私に腕時計をくれました。'], ['Can you show me your picture?', 'あなたの絵を見せてくれる？']] },
      { h: '〈look / sound / become ＋ 形容詞〉', t: 'look happy（うれしそうに見える）・sound fun（楽しそう）・become famous（有名になる）', ex: [['You look tired.', '疲れているみたいだね。'], ['That sounds great!', 'それはすばらしいね！']] },
      { h: '〈命令文〉', t: '動詞の原形で始める。否定は Don\'t ～.、さそいは Let\'s ～.', ex: [['Don\'t run in the classroom.', '教室で走ってはいけません。']] },
    ],
    tips: ['「人に物を」は give me a book、「物を人に」なら give a book to me の形になる。'],
  },
];
