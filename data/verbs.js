// 過去形マスター：4級で大事な動詞の過去形（不規則動詞・つづりに注意する規則動詞）
// 1行 = 原形|過去形|意味|例文（{ } が過去形）|訳|種類（i=不規則 r=規則だけどつづりに注意）
export const VERBS_RAW = String.raw`
be|was|～である；いる|I {was} very tired yesterday.|昨日はとても疲れていました。|i
have|had|持っている；食べる|We {had} pizza for lunch.|昼食にピザを食べました。|i
do|did|する|I {did} my homework after dinner.|夕食後に宿題をしました。|i
go|went|行く|We {went} to the beach last summer.|去年の夏、海に行きました。|i
come|came|来る|My cousin {came} to my house yesterday.|昨日いとこが家に来ました。|i
get|got|手に入れる；着く|I {got} a nice present from my aunt.|おばからすてきなプレゼントをもらいました。|i
make|made|作る|My father {made} curry for us.|父が私たちにカレーを作ってくれました。|i
take|took|取る；（乗り物に）乗る|We {took} a bus to the zoo.|バスに乗って動物園に行きました。|i
see|saw|見る|I {saw} a big fish in the river.|川で大きな魚を見ました。|i
eat|ate|食べる|I {ate} three cookies.|クッキーを3枚食べました。|i
drink|drank|飲む|He {drank} some orange juice.|彼はオレンジジュースを飲みました。|i
buy|bought|買う|I {bought} a new notebook.|新しいノートを買いました。|i
bring|brought|持ってくる|Emi {brought} her dog to the park.|エミは公園に犬を連れてきました。|i
think|thought|思う；考える|I {thought} the test was easy.|テストは簡単だと思いました。|i
teach|taught|教える|Mr. Brown {taught} us a new song.|ブラウン先生は私たちに新しい歌を教えてくれました。|i
catch|caught|つかまえる|My brother {caught} a big fish.|兄は大きな魚をつかまえました。|i
give|gave|あたえる|My grandmother {gave} me a book.|祖母は私に本をくれました。|i
write|wrote|書く|I {wrote} a letter to my friend.|友達に手紙を書きました。|i
read|read|読む|I {read} a comic book last night.|昨夜まんがを読みました。|i
run|ran|走る|Ken {ran} to school this morning.|ケンは今朝学校まで走りました。|i
swim|swam|泳ぐ|We {swam} in the pool.|私たちはプールで泳ぎました。|i
sing|sang|歌う|We {sang} a song for Mom.|お母さんのために歌を歌いました。|i
begin|began|始まる；始める|The concert {began} at six.|コンサートは6時に始まりました。|i
sit|sat|すわる|She {sat} next to me.|彼女は私のとなりにすわりました。|i
stand|stood|立つ|He {stood} in front of the door.|彼はドアの前に立っていました。|i
understand|understood|理解する|I {understood} the question.|その質問が理解できました。|i
say|said|言う|She {said}, "Thank you."|彼女は「ありがとう」と言いました。|i
tell|told|伝える；話す|My mother {told} me a story.|母が私にお話をしてくれました。|i
sell|sold|売る|The shop {sold} all the bread.|その店はパンを全部売りました。|i
send|sent|送る|I {sent} a card to my grandfather.|祖父にカードを送りました。|i
spend|spent|過ごす|We {spent} a week in Hawaii.|私たちはハワイで1週間過ごしました。|i
lend|lent|貸す|Ken {lent} me his umbrella.|ケンは私にかさを貸してくれました。|i
build|built|建てる|My uncle {built} a new house.|おじは新しい家を建てました。|i
leave|left|出発する；置いていく|I {left} my bag on the train.|電車にかばんを置き忘れました。|i
feel|felt|感じる|I {felt} sick this morning.|今朝は気分が悪かったです。|i
keep|kept|保つ；飼う|We {kept} a bird when I was little.|私が小さいころ、鳥を飼っていました。|i
sleep|slept|眠る|The baby {slept} well last night.|赤ちゃんは昨夜よく眠りました。|i
meet|met|会う|I {met} my teacher at the station.|駅で先生に会いました。|i
lose|lost|なくす；負ける|Our team {lost} the game.|私たちのチームは試合に負けました。|i
find|found|見つける|I {found} a wallet on the street.|通りで財布を見つけました。|i
hear|heard|聞こえる|I {heard} a bird singing.|鳥が鳴いているのが聞こえました。|i
know|knew|知っている|I {knew} the answer.|私は答えを知っていました。|i
grow|grew|育てる；成長する|We {grew} tomatoes in the garden.|庭でトマトを育てました。|i
throw|threw|投げる|He {threw} the ball to me.|彼は私にボールを投げました。|i
fly|flew|飛ぶ|The bird {flew} away.|鳥は飛んでいきました。|i
draw|drew|（絵を）かく|Mika {drew} a picture of her cat.|ミカはねこの絵をかきました。|i
ride|rode|乗る|I {rode} a horse for the first time.|初めて馬に乗りました。|i
drive|drove|運転する|My father {drove} us to the airport.|父が空港まで車で送ってくれました。|i
speak|spoke|話す|She {spoke} English at the meeting.|彼女は会議で英語を話しました。|i
break|broke|こわす|I {broke} my mother's cup.|母のカップを割ってしまいました。|i
choose|chose|選ぶ|I {chose} the red one.|私は赤いのを選びました。|i
wake|woke|目を覚ます|I {woke} up at five.|5時に目が覚めました。|i
wear|wore|着ている|She {wore} a yellow dress.|彼女は黄色いドレスを着ていました。|i
win|won|勝つ|Our class {won} the relay race.|私たちのクラスがリレーで勝ちました。|i
become|became|～になる|He {became} a doctor.|彼は医者になりました。|i
forget|forgot|忘れる|I {forgot} my homework.|宿題を忘れました。|i
fall|fell|落ちる|The leaves {fell} from the tree.|木から葉が落ちました。|i
hold|held|持つ；開く|Our school {held} a festival.|学校はお祭りを開きました。|i
put|put|置く|I {put} the book on the desk yesterday.|昨日その本を机の上に置きました。|i
cut|cut|切る|Mom {cut} the cake into eight pieces.|母はケーキを8つに切りました。|i
hit|hit|打つ|He {hit} a home run.|彼はホームランを打ちました。|i
pay|paid|払う|I {paid} 300 yen for the ice cream.|アイスクリームに300円払いました。|i
ring|rang|鳴る|The phone {rang} at night.|夜に電話が鳴りました。|i
study|studied|勉強する|I {studied} math for two hours.|数学を2時間勉強しました。|r
try|tried|やってみる|I {tried} Japanese food for the first time.|初めて和食を食べてみました。|r
cry|cried|泣く|The little boy {cried} a lot.|その小さな男の子はたくさん泣きました。|r
carry|carried|運ぶ|He {carried} the heavy box.|彼はその重い箱を運びました。|r
worry|worried|心配する|My mother {worried} about me.|母は私のことを心配しました。|r
stop|stopped|止まる；やめる|The bus {stopped} at the corner.|バスは角で止まりました。|r
plan|planned|計画する|We {planned} a party for Dad.|お父さんのためにパーティーを計画しました。|r
drop|dropped|落とす|I {dropped} my phone.|携帯電話を落としました。|r
enjoy|enjoyed|楽しむ|We {enjoyed} the concert.|コンサートを楽しみました。|r
play|played|遊ぶ；（スポーツを）する|We {played} soccer after school.|放課後サッカーをしました。|r
live|lived|住む|I {lived} in Osaka when I was five.|5歳のとき大阪に住んでいました。|r
use|used|使う|I {used} my sister's bike.|姉の自転車を使いました。|r
dance|danced|踊る|They {danced} at the festival.|彼らはお祭りで踊りました。|r
arrive|arrived|着く|We {arrived} at the hotel at noon.|正午にホテルに着きました。|r
visit|visited|訪れる|We {visited} a castle in Himeji.|姫路の城を訪れました。|r
want|wanted|ほしい|I {wanted} a new bike.|新しい自転車がほしかったです。|r
`;
