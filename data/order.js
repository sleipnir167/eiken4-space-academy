// 大問3：日本文つき短文の語句整序（並べかえ）…本番の形式にならったオリジナル問題
// 1行 = 日本文|（ ）の前|語句1 / 語句2 / 語句3 / 語句4 / 語句5（正しい順）|（ ）のあと|文法キー|解説
// 本番と同じく、（ ）の中では文のはじめにくる語も小文字で書く（I・固有名詞は大文字）
export const ORDER_RAW = String.raw`
あなたはどんな種類の音楽が好きですか。||what / kind / of / music / do|you like?|question|What kind of ～?＝どんな種類の～？ そのあとに do you like? と疑問文を続ける。
私の姉は料理をするのがとても得意です。|My sister|is / very / good / at / cooking|.|gerund|be good at ～ing＝～するのが得意。very は good の前。
ケンは昨日、図書館から本を3冊借りました。|Ken|borrowed / three / books / from / the|library yesterday.|past|borrow A from B＝BからAを借りる。
明日は雨が降るでしょう。||it / will / be / rainy / tomorrow|.|future|will ＋ 動詞の原形。天気の文の主語は it。
私は将来、医者になりたいです。|I|want / to / be / a / doctor|in the future.|infinitive|want to be ～＝～になりたい。
窓を開けましょうか。||shall / I / open / the / window|?|request|Shall I ～?＝（私が）～しましょうか。
このかばんはあのかばんより大きいです。|This bag|is / bigger / than / that / one|.|compare|比較級 ＋ than。one は bag のくり返しをさける。
私の家の近くに大きな公園があります。|There|is / a / big / park / near|my house.|there|There is ＋ 単数の名詞 ＋ 場所。
ユミは私が電話したとき、テレビを見ていました。|Yumi|was / watching / TV / when / I|called her.|pastprog|was ～ing（過去進行形）＋ when ～（～したとき）。
ここで写真を撮ってもいいですか。||can / I / take / a / picture|here?|modal|Can I ～?＝～してもいい？ take a picture＝写真を撮る。
私は宿題を終えたあとで夕食を食べました。|I|ate / dinner / after / I / finished|my homework.|conj|after ～＝～したあとで。after のあとに「主語＋動詞」が続く。
あなたは東京にどのくらい滞在しましたか。||how / long / did / you / stay|in Tokyo?|question|How long ～?＝どのくらいの間。過去の疑問文なので did ＋ 原形。
私たちはその試合に勝ってうれしかったです。|We|were / glad / to / win / the|game.|infinitive|be glad to ～＝～してうれしい。
母は私に新しい自転車を買ってくれました。|My mother|bought / me / a / new / bike|.|pattern|buy 人 物＝人に物を買う。
夕食の前に手を洗いなさい。||wash / your / hands / before / dinner|.|pattern|命令文は動詞の原形で始める。before ～＝～の前に。
ケンは私たちのクラスでいちばん背が高いです。|Ken|is / the / tallest / in / our|class.|compare|the ＋ 最上級 ＋ in ～（範囲）。
公園で走ってはいけません。|You|must / not / run / in / the|park.|modal|must not ～＝～してはいけない。
あなたは何時に起きますか。||what / time / do / you / get|up?|question|What time ～?＝何時に～？ get up＝起きる。
私は昨夜この本を読み終えました。|I|finished / reading / this / book / last|night.|gerund|finish ～ing＝～し終える。last night＝昨夜。
私は何か温かい飲み物がほしいです。|I|want / something / hot / to / drink|.|infinitive|something ＋ 形容詞 ＋ to ～＝何か…な～するもの。
父は週末に私たちのために料理をするのが好きです。|My father|likes / to / cook / for / us|on weekends.|infinitive|like to ～＝～するのが好き。for us＝私たちのために。
駅への道を教えていただけますか。||could / you / tell / me / the|way to the station?|request|Could you ～?＝～していただけますか。tell 人 the way to ～＝人に～への道を教える。
あなたは昨夜、何をしていましたか。||what / were / you / doing / last|night?|pastprog|過去進行形の疑問文：What were you doing ～?
私たちは駅の前で会いました。|We|met / in / front / of / the|station.|prep|in front of ～＝～の前で。
雨が降っていたので、私たちは家にいました。|We|stayed / home / because / it / was|raining.|conj|because ～＝～なので。stay home＝家にいる。
もし明日晴れたら、海に行きましょう。||if / it / is / sunny / tomorrow|, let's go to the sea.|conj|If ～,＝もし～なら。if の中は未来のことでも現在形。
あなたのためにこのケーキを作ったのはだれですか。||who / made / this / cake / for|you?|question|Who が主語の疑問文：Who ＋ 動詞 ～?
いすの上のあのかさはだれのものですか。||whose / umbrella / is / that / on|the chair?|question|Whose ＋ 名詞 ～?＝だれの～？
私は少し英語を話すことができます。|I|can / speak / English / a / little|.|modal|can ＋ 原形。a little＝少し。
トムは日本の歴史に興味があります。|Tom|is / interested / in / Japanese / history|.|idiom|be interested in ～＝～に興味がある。
私たちはおたがいに助け合わなければなりません。|We|have / to / help / each / other|.|modal|have to ～＝～しなければならない。each other＝おたがい。
私はその知らせを聞いて驚きました。|I|was / surprised / to / hear / the|news.|infinitive|be surprised to ～＝～して驚く。
あなたはどの季節がいちばん好きですか。||which / season / do / you / like|the best?|compare|Which ＋ 名詞 do you like the best?＝どの～がいちばん好き？
私の町には図書館が2つあります。|There|are / two / libraries / in / my|town.|there|複数なので There are。
このコンピューターの使い方を教えてください。||please / tell / me / how / to|use this computer.|infinitive|how to ～＝～のしかた。tell 人 ～＝人に～を教える。
彼は昨日の朝、何時に起きましたか。||what / time / did / he / get|up yesterday morning?|past|過去の疑問文 did ＋ 主語 ＋ 原形。
私は今週末、祖母を訪ねるつもりです。|I|am / going / to / visit / my|grandmother this weekend.|future|be going to ＋ 原形＝～するつもりだ。
次の日曜日に買い物に行きませんか。||why / don't / we / go / shopping|next Sunday?|request|Why don't we ～?＝（いっしょに）～しませんか。
私の妹は大きな犬をこわがっています。|My sister|is / afraid / of / big / dogs|.|idiom|be afraid of ～＝～をこわがる。
彼女はピアノをひくのをやめて、寝ました。|She|stopped / playing / the / piano / and|went to bed.|gerund|stop ～ing＝～するのをやめる。
私は兄と同じくらい速く走ることができます。|I|can / run / as / fast / as|my brother.|compare|as ～ as …＝…と同じくらい～。as と as の間は元の形（fast）。
ジョンはとても歌が上手です。|John|is / a / very / good / singer|.|pattern|a good singer＝歌が上手な人。
テーブルの上にりんごがいくつありますか。||how / many / apples / are / there|on the table?|question|How many ＋ 複数名詞 ＋ are there ～?
私は昨日、英語の宿題をしませんでした。|I|didn't / do / my / English / homework|yesterday.|past|didn't ＋ 原形。do one's homework＝宿題をする。
兄はそのとき部屋で音楽を聞いていました。|My brother|was / listening / to / music / in|his room then.|pastprog|was ～ing。listen to ～＝～を聞く。
水を1杯もらえますか。||can / I / have / a / glass|of water?|request|Can I have ～?＝～をもらえますか。a glass of ～＝コップ1杯の～。
あなたはその箱を運ぶ必要はありません。|You|don't / have / to / carry / the|box.|modal|don't have to ～＝～しなくてよい。
彼の話を聞いたとき、みんな笑いました。|Everyone|laughed / when / they / heard / his|story.|conj|when ～＝～したとき。
このTシャツを試着してもいいですか。||can / I / try / on / this|T-shirt?|idiom|try on ～＝～を試着する。
あなたに私の家族の写真を見せましょう。|I'll|show / you / a / picture / of|my family.|pattern|show 人 物＝人に物を見せる。
その店は9時から5時まで開いています。|The shop|is / open / from / nine / to|five.|prep|from A to B＝AからBまで。
母は夕食のあとにコーヒーを飲むのが好きです。|My mother|likes / to / drink / coffee / after|dinner.|infinitive|like to ～＝～するのが好き。
私たちはその映画をとても楽しみました。|We|enjoyed / watching / the / movie / very|much.|gerund|enjoy ～ing＝～して楽しむ。very much＝とても。
冬と夏では、どちらが好きですか。||which / do / you / like / better|, winter or summer?|compare|Which do you like better, A or B?
今日は昨日より寒いです。|It|is / colder / today / than / yesterday|.|compare|比較級 colder ＋ than。
彼は将来何になりたいのですか。||what / does / he / want / to|be in the future?|infinitive|What do / does ～ want to be?＝何になりたいの？
父は車で私を駅まで送ってくれました。|My father|drove / me / to / the / station|.|past|drive 人 to ～＝人を車で～まで送る。drove は drive の過去形。
私は明日、早く起きなければなりません。|I|have / to / get / up / early|tomorrow.|modal|have to ～＝～しなければならない。get up early＝早く起きる。
ユキは友達と話すのが好きです。|Yuki|likes / talking / with / her / friends|.|gerund|like ～ing＝～するのが好き。talk with ～＝～と話す。
公園にはたくさんの子どもたちがいました。|There|were / a / lot / of / children|in the park.|there|過去・複数なので There were。
放課後、テニスをしましょう。||let's / play / tennis / after / school|.|request|Let's ～.＝～しよう。after school＝放課後。
あなたはなぜ昨日、家にいたのですか。||why / did / you / stay / home|yesterday?|question|Why ～?＝なぜ～？ 過去なので did。
この問題はあの問題より難しいです。|This question|is / more / difficult / than / that|one.|compare|長い形容詞の比較級は more ～。
`;
