// 英検4級の単語・熟語・会話表現（オリジナルの例文つき）
// 1行 = 単語|品詞|意味|例文（{ } が見出し語）|例文の訳|重要度（1=最重要 2=重要 3=おさえたい）|変化形|テーマ
// 品詞：名 動 形 副 前 接 代 熟（熟語）会（会話表現）
// テーマ：time 時・曜日・月 / num 数 / people 人・家族 / school 学校 / job 仕事 / food 食べ物 / place 場所
//         travel 乗り物・旅行 / nature 自然・天気・動物 / home 家・持ち物 / hobby 趣味・スポーツ / body 体・健康
//         verb 動詞 / adj 形容詞 / adv 副詞・その他

const W1 = String.raw`
Monday|名|月曜日|We have P.E. on {Monday}.|月曜日に体育があります。|1||time
Tuesday|名|火曜日|The library is closed on {Tuesday}.|図書館は火曜日が休みです。|1||time
Wednesday|名|水曜日|I go to piano lessons every {Wednesday}.|毎週水曜日にピアノのレッスンに行きます。|1||time
Thursday|名|木曜日|We will have a math test on {Thursday}.|木曜日に数学のテストがあります。|1||time
Friday|名|金曜日|Please return the book by {Friday}.|金曜日までに本を返してください。|1||time
Saturday|名|土曜日|I often play soccer on {Saturday}.|私は土曜日によくサッカーをします。|1||time
Sunday|名|日曜日|My family went to the zoo last {Sunday}.|この前の日曜日に家族で動物園へ行きました。|1||time
January|名|1月|My birthday is in {January}.|私の誕生日は1月です。|1||time
February|名|2月|It is very cold in {February}.|2月はとても寒いです。|1||time
March|名|3月|The school year ends in {March} in Japan.|日本では学年は3月に終わります。|1||time
April|名|4月|School starts in {April}.|学校は4月に始まります。|1||time
May|名|5月|We went camping in {May}.|私たちは5月にキャンプに行きました。|1||time
June|名|6月|It rains a lot in {June}.|6月は雨がたくさん降ります。|1||time
July|名|7月|Summer vacation starts in {July}.|夏休みは7月に始まります。|1||time
August|名|8月|We visit our grandparents every {August}.|毎年8月に祖父母を訪ねます。|1||time
September|名|9月|Our sports day is in {September}.|運動会は9月にあります。|1||time
October|名|10月|Halloween is on {October} 31.|ハロウィーンは10月31日です。|1||time
November|名|11月|The leaves turn red in {November}.|11月には葉が赤くなります。|1||time
December|名|12月|Christmas is in {December}.|クリスマスは12月です。|1||time
spring|名|春|Cherry blossoms are beautiful in {spring}.|春は桜がきれいです。|1||time
summer|名|夏|I swim in the sea every {summer}.|私は毎年夏に海で泳ぎます。|1||time
fall|名/動|秋；落ちる|My favorite season is {fall}.|私のいちばん好きな季節は秋です。|1|過去形 fell|time
winter|名|冬|We can ski in {winter}.|冬にはスキーができます。|1||time
season|名|季節|Which {season} do you like the best?|どの季節がいちばん好きですか。|1||time
afternoon|名|午後|Let's play tennis this {afternoon}.|今日の午後テニスをしよう。|1||time
evening|名|夕方；晩|I usually study in the {evening}.|私はふだん夕方に勉強します。|2||time
tonight|副/名|今夜|What are you going to do {tonight}?|今夜は何をする予定ですか。|1||time
tomorrow|副/名|明日|It will be sunny {tomorrow}.|明日は晴れるでしょう。|1||time
yesterday|副/名|昨日|I went to the library {yesterday}.|昨日図書館に行きました。|1||time
weekend|名|週末|What did you do last {weekend}?|先週末は何をしましたか。|1||time
week|名|週|I practice the piano three times a {week}.|週に3回ピアノを練習します。|1||time
month|名|月（1か月）|I read five books last {month}.|先月は本を5冊読みました。|1||time
year|名|年；～歳|My brother is ten {years} old.|弟は10歳です。|1||time
hour|名|1時間|I studied English for two {hours}.|英語を2時間勉強しました。|1||time
minute|名|分|The bus will come in five {minutes}.|バスは5分後に来ます。|1||time
holiday|名|休日；祝日|Tomorrow is a national {holiday}.|明日は国民の祝日です。|2||time
vacation|名|休暇；休み|How was your summer {vacation}?|夏休みはどうでしたか。|1||time
birthday|名|誕生日|Happy {birthday}, Kate!|お誕生日おめでとう、ケイト！|1||time
date|名|日付|What's the {date} today?|今日は何月何日ですか。|2||time
calendar|名|カレンダー|I wrote the party on my {calendar}.|カレンダーにパーティーのことを書きました。|3||time
noon|名|正午|Let's meet at the station at {noon}.|正午に駅で会いましょう。|2||time
future|名|将来；未来|I want to be a teacher in the {future}.|将来先生になりたいです。|1||time
Christmas|名|クリスマス|What do you want for {Christmas}?|クリスマスに何がほしい？|2||time
early|形/副|早い；早く|I got up {early} this morning.|今朝は早く起きました。|1||time
late|形/副|遅れた；遅く|Don't be {late} for school.|学校に遅刻しないでね。|1||time
first|形/名|最初の；1番目|This is my {first} trip to Kyoto.|これが初めての京都旅行です。|1||num
second|形/名|2番目の；秒|The toy shop is on the {second} floor.|おもちゃ屋は2階にあります。|1||num
third|形|3番目の|My sister is in the {third} grade.|妹は3年生です。|1||num
fourth|形|4番目の|The meeting is on April {fourth}.|会議は4月4日です。|2||num
fifth|形|5番目の|Today is my {fifth} day in Canada.|今日はカナダに来て5日目です。|2||num
eighth|形|8番目の|The restaurant is on the {eighth} floor.|レストランは8階にあります。|2||num
ninth|形|9番目の|My brother is in the {ninth} grade.|兄は9年生（中3）です。|2||num
twelfth|形|12番目の|December is the {twelfth} month of the year.|12月は1年で12番目の月です。|3||num
twentieth|形|20番目の|My birthday is on May {twentieth}.|私の誕生日は5月20日です。|3||num
twelve|名|12|There are {twelve} months in a year.|1年には12か月あります。|2||num
forty|名|40|My father is {forty} years old.|父は40歳です。|2||num
fifty|名|50|This pen is {fifty} yen.|このペンは50円です。|3||num
hundred|名|100|There are about one {hundred} students in my grade.|私の学年には約100人の生徒がいます。|1||num
thousand|名|1000|This bike is twenty {thousand} yen.|この自転車は2万円です。|2||num
half|名|半分|I ate {half} of the cake.|私はケーキの半分を食べました。|2||num
once|副|1回|I go swimming {once} a week.|週に1回泳ぎに行きます。|2||num
twice|副|2回|I visit my grandmother {twice} a month.|月に2回祖母を訪ねます。|2||num
number|名|番号；数|What is your phone {number}?|あなたの電話番号は何ですか。|2||num
yen|名|円|This T-shirt is 2,000 {yen}.|このTシャツは2,000円です。|2||num
dollar|名|ドル|The cap is ten {dollars}.|その帽子は10ドルです。|2||num
grandfather|名|祖父|My {grandfather} lives in Nagano.|祖父は長野に住んでいます。|1||people
grandmother|名|祖母|My {grandmother} makes delicious cookies.|祖母はおいしいクッキーを作ります。|1||people
grandparent|名|祖父母（の1人）|I stayed with my {grandparents} during the vacation.|休みの間、祖父母の家に泊まりました。|2||people
parent|名|親|My {parents} are from Osaka.|私の両親は大阪出身です。|2||people
uncle|名|おじ|My {uncle} is a cook at a hotel.|おじはホテルの料理人です。|1||people
aunt|名|おば|My {aunt} gave me a nice bag.|おばがすてきなかばんをくれました。|1||people
cousin|名|いとこ|My {cousin} lives in Hawaii.|いとこはハワイに住んでいます。|2||people
son|名|息子|Mr. Smith has two {sons}.|スミスさんには息子が2人います。|2||people
daughter|名|娘|Their {daughter} is a nurse.|彼らの娘は看護師です。|2||people
husband|名|夫|Her {husband} works at a bank.|彼女の夫は銀行で働いています。|3||people
wife|名|妻|His {wife} is a good singer.|彼の妻は歌が上手です。|3||people
baby|名|赤ちゃん|The {baby} is sleeping now.|赤ちゃんは今眠っています。|2||people
child|名|子ども|The {child} is playing with a ball.|その子どもはボールで遊んでいます。|2|複数形 children|people
people|名|人々|Many {people} came to the festival.|たくさんの人がお祭りに来ました。|1||people
person|名|人|She is a very kind {person}.|彼女はとても親切な人です。|2||people
woman|名|女性|That {woman} is our new teacher.|あの女性は私たちの新しい先生です。|1|複数形 women|people
man|名|男性|A {man} asked me the way to the station.|男の人が駅への道をたずねました。|2|複数形 men|people
friend|名|友達|I played games with my {friends}.|友達とゲームをしました。|1||people
neighbor|名|近所の人|Our {neighbor} has a big dog.|近所の人は大きな犬を飼っています。|3||people
member|名|メンバー；一員|I'm a {member} of the tennis club.|私はテニス部の一員です。|1||people
guest|名|客|We had three {guests} for dinner.|夕食に3人のお客さんが来ました。|2||people
everyone|代|みんな|{Everyone} in my class likes Mr. Brown.|クラスのみんながブラウン先生を好きです。|1||people
someone|代|だれか|{Someone} is at the door.|だれかがドアのところにいます。|2||people
fan|名|ファン|I'm a big {fan} of that singer.|私はあの歌手の大ファンです。|2||people
classroom|名|教室|Let's clean the {classroom}.|教室をそうじしよう。|1||school
gym|名|体育館；ジム|The students are in the {gym} now.|生徒たちは今体育館にいます。|1||school
cafeteria|名|カフェテリア；食堂|We eat lunch in the {cafeteria}.|私たちは食堂で昼食を食べます。|2||school
principal|名|校長|The {principal} made a speech at the ceremony.|校長先生が式でスピーチをしました。|3||school
subject|名|教科|What {subject} do you like?|何の教科が好きですか。|1||school
math|名|数学|I have a {math} test tomorrow.|明日数学のテストがあります。|1||school
science|名|理科；科学|Our {science} teacher is very funny.|理科の先生はとてもおもしろいです。|1||school
history|名|歴史|I'm interested in Japanese {history}.|私は日本の歴史に興味があります。|1||school
art|名|美術；芸術|I like {art} class the best.|美術の授業がいちばん好きです。|1||school
homework|名|宿題|Did you finish your {homework}?|宿題は終わりましたか。|1||school
test|名|テスト|I studied hard for the English {test}.|英語のテストのために一生懸命勉強しました。|1||school
question|名|質問；問題|May I ask you a {question}?|質問してもいいですか。|1||school
answer|名/動|答え；答える|Please {answer} the question in English.|英語で質問に答えてください。|1||school
lesson|名|レッスン；授業|I take swimming {lessons} on Saturdays.|土曜日に水泳のレッスンを受けています。|1||school
club|名|クラブ；部|Which {club} are you in?|どの部に入っていますか。|1||school
textbook|名|教科書|Open your {textbooks} to page ten.|教科書の10ページを開きなさい。|2||school
notebook|名|ノート|I wrote the new words in my {notebook}.|新しい単語をノートに書きました。|2||school
dictionary|名|辞書|Can I use your {dictionary}?|あなたの辞書を使ってもいいですか。|1||school
eraser|名|消しゴム|I forgot my {eraser}.|消しゴムを忘れました。|2||school
uniform|名|制服；ユニフォーム|We wear a {uniform} at school.|私たちは学校で制服を着ます。|2||school
grade|名|学年；成績|My sister is in the fifth {grade}.|妹は5年生です。|2||school
speech|名|スピーチ|I made a {speech} in English.|英語でスピーチをしました。|2||school
contest|名|コンテスト|She won the singing {contest}.|彼女は歌のコンテストで優勝しました。|1||school
report|名|レポート；報告|I have to write a {report} about my town.|町についてのレポートを書かなければなりません。|3||school
college|名|大学|My brother goes to {college} in Tokyo.|兄は東京の大学に通っています。|2||school
university|名|大学|My sister studies music at a {university}.|姉は大学で音楽を勉強しています。|3||school
student|名|生徒；学生|There are thirty {students} in my class.|私のクラスには30人の生徒がいます。|1||school
classmate|名|クラスメート|Ken and I are {classmates}.|ケンと私はクラスメートです。|1||school
idea|名|考え；アイデア|That's a good {idea}!|それはいい考えだね！|1||school
word|名|単語；言葉|I learned ten new {words} today.|今日は新しい単語を10個覚えました。|1||school
story|名|物語；話|My father told me an interesting {story}.|父がおもしろい話をしてくれました。|1||school
page|名|ページ|Please read {page} twenty.|20ページを読んでください。|2||school
problem|名|問題|This math {problem} is difficult.|この数学の問題は難しいです。|1||school
example|名|例|Can you give me an {example}?|例をあげてくれますか。|2||school
language|名|言語；言葉|How many {languages} can you speak?|何か国語を話せますか。|2||school
paper|名|紙|Please write your name on this {paper}.|この紙に名前を書いてください。|2||school
sports day|名|運動会|Our {sports day} is next Saturday.|運動会は次の土曜日です。|2||school
school trip|名|修学旅行|We went to Kyoto on our {school trip}.|修学旅行で京都に行きました。|2||school
event|名|行事；イベント|The school has a big {event} in June.|学校では6月に大きな行事があります。|2||school
information|名|情報|I got {information} about the event on the Internet.|インターネットでその行事の情報を得ました。|3||school
prize|名|賞|She got first {prize} in the contest.|彼女はコンテストで1等賞をとりました。|3||school
volunteer|名|ボランティア|We did {volunteer} work at the park.|公園でボランティア活動をしました。|3||school
reason|名|理由|Please tell me the {reason}.|理由を教えてください。|3||school
job|名|仕事|What is your father's {job}?|お父さんの仕事は何ですか。|1||job
doctor|名|医者|The {doctor} said, "Take this medicine."|医者は「この薬を飲んで」と言いました。|1||job
nurse|名|看護師|My mother works as a {nurse}.|母は看護師として働いています。|1||job
police officer|名|警察官|The {police officer} helped the old man.|警察官がそのおじいさんを助けました。|2||job
firefighter|名|消防士|I want to be a {firefighter}.|私は消防士になりたいです。|2||job
pilot|名|パイロット|The {pilot} flew the plane to Hawaii.|パイロットは飛行機をハワイまで飛ばしました。|2||job
cook|名/動|料理人；料理する|My father likes to {cook} on Sundays.|父は日曜日に料理をするのが好きです。|1||job
singer|名|歌手|She is a famous {singer} in Japan.|彼女は日本で有名な歌手です。|1||job
artist|名|芸術家；画家|The {artist} painted this picture.|その画家がこの絵をかきました。|2||job
writer|名|作家|My dream is to be a {writer}.|私の夢は作家になることです。|2||job
scientist|名|科学者|The {scientist} studies stars.|その科学者は星を研究しています。|2||job
farmer|名|農家の人|The {farmer} grows rice and vegetables.|その農家の人は米と野菜を育てています。|2||job
dentist|名|歯医者|I went to the {dentist} yesterday.|昨日歯医者に行きました。|2||job
driver|名|運転手|The bus {driver} was very kind.|バスの運転手さんはとても親切でした。|2||job
astronaut|名|宇宙飛行士|I want to be an {astronaut} and go to the moon.|宇宙飛行士になって月に行きたいです。|3||job
player|名|選手|He is a good soccer {player}.|彼はサッカーの上手な選手です。|1||job
musician|名|音楽家|My uncle is a {musician}.|おじは音楽家です。|3||job
actor|名|俳優|That {actor} is popular with young people.|その俳優は若者に人気があります。|3||job
clerk|名|店員|The {clerk} showed me a blue shirt.|店員が青いシャツを見せてくれました。|3||job
work|動/名|働く；仕事|My mother {works} at a hospital.|母は病院で働いています。|1||job
breakfast|名|朝食|What did you have for {breakfast}?|朝食に何を食べましたか。|1||food
lunch|名|昼食|Let's have {lunch} together.|いっしょに昼食を食べよう。|1||food
dinner|名|夕食|My mother is cooking {dinner} now.|母は今夕食を作っています。|1||food
food|名|食べ物|What's your favorite {food}?|いちばん好きな食べ物は何ですか。|1||food
sandwich|名|サンドイッチ|I made {sandwiches} for the picnic.|ピクニックのためにサンドイッチを作りました。|2||food
hamburger|名|ハンバーガー|I'd like a {hamburger} and a salad.|ハンバーガーとサラダをください。|2||food
pizza|名|ピザ|Let's order a {pizza} for dinner.|夕食にピザを注文しよう。|2||food
spaghetti|名|スパゲッティ|My sister likes {spaghetti} very much.|妹はスパゲッティが大好きです。|3||food
curry|名|カレー|My father makes {curry} on Sundays.|父は日曜日にカレーを作ります。|2||food
rice|名|米；ごはん|Japanese people eat {rice} every day.|日本人は毎日ごはんを食べます。|2||food
bread|名|パン|I bought some {bread} at the bakery.|パン屋でパンを買いました。|1||food
cake|名|ケーキ|My mother made a birthday {cake} for me.|母が私に誕生日ケーキを作ってくれました。|1||food
cookie|名|クッキー|These {cookies} are delicious.|このクッキーはおいしいです。|1||food
chocolate|名|チョコレート|I gave my father some {chocolate}.|父にチョコレートをあげました。|2||food
candy|名|キャンディー|Don't eat too much {candy}.|キャンディーを食べすぎないで。|3||food
ice cream|名|アイスクリーム|Let's eat {ice cream} in the park.|公園でアイスクリームを食べよう。|2||food
fruit|名|果物|I eat {fruit} every morning.|毎朝果物を食べます。|1||food
vegetable|名|野菜|You should eat more {vegetables}.|もっと野菜を食べたほうがいいよ。|1||food
strawberry|名|いちご|We picked {strawberries} on the farm.|農場でいちごをつみました。|2|複数形 strawberries|food
banana|名|バナナ|Monkeys like {bananas}.|サルはバナナが好きです。|2||food
lemon|名|レモン|I put some {lemon} in my tea.|紅茶にレモンを入れました。|3||food
grape|名|ぶどう|These {grapes} are very sweet.|このぶどうはとても甘いです。|3||food
potato|名|じゃがいも|My grandfather grows {potatoes} in his garden.|祖父は庭でじゃがいもを育てています。|2|複数形 potatoes|food
tomato|名|トマト|Please buy some {tomatoes} at the store.|お店でトマトを買ってきてね。|2|複数形 tomatoes|food
carrot|名|にんじん|Rabbits like {carrots}.|うさぎはにんじんが好きです。|2||food
onion|名|玉ねぎ|I cut the {onions} for the curry.|カレーのために玉ねぎを切りました。|3||food
egg|名|卵|I had two {eggs} for breakfast.|朝食に卵を2つ食べました。|2||food
cheese|名|チーズ|I like pizza with a lot of {cheese}.|チーズがたくさんのったピザが好きです。|3||food
meat|名|肉|My brother likes {meat} more than fish.|兄は魚より肉が好きです。|2||food
chicken|名|鶏肉；ニワトリ|We had {chicken} and salad for dinner.|夕食は鶏肉とサラダでした。|2||food
fish|名|魚|My father caught a big {fish} in the river.|父は川で大きな魚をつりました。|1||food
soup|名|スープ|This {soup} is too hot.|このスープは熱すぎます。|2||food
salad|名|サラダ|I'll make a {salad}.|私がサラダを作ります。|2||food
juice|名|ジュース|Would you like some orange {juice}?|オレンジジュースはいかがですか。|2||food
tea|名|お茶；紅茶|Would you like a cup of {tea}?|お茶を1杯いかがですか。|1||food
coffee|名|コーヒー|My mother drinks {coffee} every morning.|母は毎朝コーヒーを飲みます。|2||food
water|名|水|Can I have a glass of {water}?|水を1杯もらえますか。|1||food
sugar|名|砂糖|Do you want {sugar} in your coffee?|コーヒーに砂糖を入れますか。|3||food
pie|名|パイ|Grandma baked an apple {pie}.|おばあちゃんがアップルパイを焼きました。|3||food
dessert|名|デザート|What do you want for {dessert}?|デザートは何がいい？|2||food
menu|名|メニュー|Can I see the {menu}, please?|メニューを見せてもらえますか。|2||food
chopsticks|名|はし|Can you use {chopsticks}?|はしを使えますか。|3||food
delicious|形|とてもおいしい|This cake is {delicious}.|このケーキはとてもおいしいです。|1||food
hungry|形|おなかがすいた|I'm {hungry}. Let's eat lunch.|おなかがすいた。昼食を食べよう。|1||food
thirsty|形|のどがかわいた|I'm {thirsty}. Can I have some water?|のどがかわいた。水をもらえる？|2||food
sweet|形|甘い|This apple is very {sweet}.|このりんごはとても甘いです。|2||food
`;

const W2 = String.raw`
restaurant|名|レストラン|We had dinner at an Italian {restaurant}.|イタリア料理のレストランで夕食を食べました。|1||place
library|名|図書館|I borrowed three books from the {library}.|図書館から本を3冊借りました。|1||place
museum|名|博物館；美術館|We saw old pictures at the {museum}.|美術館で古い絵を見ました。|1||place
aquarium|名|水族館|We saw dolphins at the {aquarium}.|水族館でイルカを見ました。|2||place
hospital|名|病院|My grandmother is in the {hospital}.|祖母は入院しています。|1||place
station|名|駅|Let's meet in front of the {station}.|駅の前で会いましょう。|1||place
airport|名|空港|We went to the {airport} by train.|私たちは電車で空港へ行きました。|1||place
bank|名|銀行|The {bank} is next to the post office.|銀行は郵便局のとなりです。|2||place
post office|名|郵便局|I bought some stamps at the {post office}.|郵便局で切手を買いました。|1||place
supermarket|名|スーパーマーケット|My mother goes to the {supermarket} every day.|母は毎日スーパーに行きます。|1||place
department store|名|デパート|I bought a present at the {department store}.|デパートでプレゼントを買いました。|2||place
bookstore|名|本屋|There is a big {bookstore} near the station.|駅の近くに大きな本屋があります。|1||place
store|名|店|That {store} sells nice shoes.|あの店はすてきな靴を売っています。|1||place
shop|名/動|店；買い物をする|I like to {shop} with my friends.|友達と買い物をするのが好きです。|2||place
bakery|名|パン屋|The {bakery} opens at seven.|パン屋は7時に開きます。|2||place
flower shop|名|花屋|I bought some roses at the {flower shop}.|花屋でバラを買いました。|3||place
convenience store|名|コンビニ|There is a {convenience store} near my house.|家の近くにコンビニがあります。|2||place
hotel|名|ホテル|We stayed at a {hotel} near the sea.|海の近くのホテルに泊まりました。|1||place
theater|名|劇場；映画館|Let's see a movie at the {theater}.|映画館で映画を見よう。|2||place
stadium|名|スタジアム；競技場|Many people were at the baseball {stadium}.|野球場にはたくさんの人がいました。|2||place
amusement park|名|遊園地|We had a great time at the {amusement park}.|遊園地でとても楽しく過ごしました。|3||place
pool|名|プール|Let's go to the {pool} this afternoon.|今日の午後プールに行こう。|2||place
office|名|事務所；会社|My father's {office} is in Tokyo.|父の会社は東京にあります。|2||place
city|名|市；都市|Sapporo is a big {city} in Hokkaido.|札幌は北海道の大きな都市です。|1||place
town|名|町|I live in a small {town}.|私は小さな町に住んでいます。|1||place
village|名|村|My grandparents live in a small {village}.|祖父母は小さな村に住んでいます。|3||place
country|名|国；いなか|I want to visit many {countries}.|たくさんの国を訪れたいです。|1||place
world|名|世界|I want to travel around the {world}.|世界中を旅したいです。|1||place
street|名|通り|There are many shops on this {street}.|この通りにはたくさんの店があります。|2||place
road|名|道路|Be careful when you cross the {road}.|道路を渡るときは気をつけてね。|2||place
bridge|名|橋|There is an old {bridge} over the river.|川に古い橋がかかっています。|2||place
building|名|建物；ビル|That tall {building} is a hotel.|あの高い建物はホテルです。|1||place
temple|名|寺|We visited an old {temple} in Nara.|奈良の古い寺を訪れました。|2||place
shrine|名|神社|Many people visit the {shrine} on New Year's Day.|元日には多くの人が神社を訪れます。|3||place
castle|名|城|We took pictures in front of the {castle}.|城の前で写真を撮りました。|2||place
church|名|教会|There is a beautiful {church} in the town.|町には美しい教会があります。|3||place
farm|名|農場|My uncle has a {farm} in Hokkaido.|おじは北海道に農場を持っています。|2||place
place|名|場所|This park is a nice {place} for a picnic.|この公園はピクニックにいい場所です。|1||place
way|名|道；方法|Can you tell me the {way} to the station?|駅への道を教えてくれますか。|1||place
corner|名|角|Turn left at the next {corner}.|次の角を左に曲がってください。|2||place
center|名|中心；センター|We went to the shopping {center}.|ショッピングセンターに行きました。|3||place
bus|名|バス|I go to school by {bus}.|私はバスで学校に行きます。|2||travel
train|名|電車|We took the {train} to Osaka.|電車に乗って大阪に行きました。|1||travel
subway|名|地下鉄|Let's take the {subway}.|地下鉄に乗ろう。|3||travel
taxi|名|タクシー|We went to the hotel by {taxi}.|タクシーでホテルに行きました。|2||travel
plane|名|飛行機|We went to Okinawa by {plane}.|飛行機で沖縄に行きました。|1||travel
ship|名|船|We saw a big {ship} on the sea.|海で大きな船を見ました。|3||travel
boat|名|ボート；船|We rode a {boat} on the lake.|湖でボートに乗りました。|2||travel
bike|名|自転車|I ride my {bike} to school.|自転車で学校に行きます。|1||travel
car|名|車|My father washes his {car} every Sunday.|父は毎週日曜日に車を洗います。|1||travel
trip|名|旅行|How was your {trip} to Hokkaido?|北海道旅行はどうでしたか。|1||travel
travel|動|旅行する|I want to {travel} to Canada someday.|いつかカナダを旅行したいです。|1||travel
ticket|名|切符；チケット|I bought two {tickets} for the concert.|コンサートのチケットを2枚買いました。|1||travel
map|名|地図|Let's look at the {map}.|地図を見てみよう。|2||travel
suitcase|名|スーツケース|My {suitcase} is very heavy.|私のスーツケースはとても重いです。|3||travel
tour|名|ツアー；見学|We joined a bus {tour} of the city.|市内のバスツアーに参加しました。|3||travel
guide|名|案内人；ガイド|Our {guide} told us about the castle.|ガイドさんが城について話してくれました。|3||travel
foreign|形|外国の|I want to learn a {foreign} language.|外国語を学びたいです。|2||travel
Canada|名|カナダ|My friend lives in {Canada}.|友達はカナダに住んでいます。|2||travel
America|名|アメリカ|My aunt lives in {America}.|おばはアメリカに住んでいます。|2||travel
Australia|名|オーストラリア|Koalas live in {Australia}.|コアラはオーストラリアに住んでいます。|2||travel
China|名|中国|My friend came from {China}.|私の友達は中国から来ました。|3||travel
France|名|フランス|I want to visit {France} someday.|いつかフランスを訪れたいです。|3||travel
London|名|ロンドン|My uncle works in {London}.|おじはロンドンで働いています。|3||travel
weather|名|天気|How is the {weather} today?|今日の天気はどうですか。|1||nature
sunny|形|晴れた|It will be {sunny} tomorrow.|明日は晴れるでしょう。|1||nature
cloudy|形|くもった|It was {cloudy} this morning.|今朝はくもっていました。|1||nature
rainy|形|雨の|It was {rainy} yesterday, so I stayed home.|昨日は雨だったので家にいました。|1||nature
snowy|形|雪の降る|It's {snowy} in Sapporo today.|今日の札幌は雪です。|2||nature
windy|形|風の強い|It's {windy} today. Be careful.|今日は風が強いよ。気をつけて。|2||nature
rain|名/動|雨；雨が降る|It {rained} a lot last night.|昨夜は雨がたくさん降りました。|1||nature
snow|名/動|雪；雪が降る|We made a snowman with the {snow}.|雪で雪だるまを作りました。|1||nature
wind|名|風|The {wind} is very strong today.|今日は風がとても強いです。|3||nature
warm|形|暖かい|It's getting {warm}. Spring is coming.|暖かくなってきたね。春が来るよ。|1||nature
sky|名|空|Look at the {sky}! It's so blue.|空を見て！とても青いよ。|2||nature
sun|名|太陽|The {sun} rises in the east.|太陽は東からのぼります。|2||nature
moon|名|月|The {moon} is beautiful tonight.|今夜は月がきれいです。|2||nature
star|名|星|We saw many {stars} at the camp.|キャンプでたくさんの星を見ました。|1||nature
cloud|名|雲|There are no {clouds} in the sky.|空には雲が一つもありません。|3||nature
space|名|宇宙|I want to go to {space} someday.|いつか宇宙に行きたいです。|3||nature
earth|名|地球|We must take care of the {earth}.|私たちは地球を大切にしなければなりません。|3||nature
nature|名|自然|I like to walk in {nature}.|自然の中を歩くのが好きです。|3||nature
beach|名|浜辺|We played volleyball on the {beach}.|浜辺でバレーボールをしました。|1||nature
mountain|名|山|We climbed a {mountain} last summer.|去年の夏、山に登りました。|1||nature
river|名|川|The children are swimming in the {river}.|子どもたちが川で泳いでいます。|1||nature
lake|名|湖|We went fishing at the {lake}.|湖へつりに行きました。|2||nature
sea|名|海|I like to swim in the {sea}.|海で泳ぐのが好きです。|1||nature
island|名|島|There are many beautiful {islands} in Okinawa.|沖縄には美しい島がたくさんあります。|3||nature
forest|名|森|Many animals live in the {forest}.|森にはたくさんの動物が住んでいます。|2||nature
flower|名|花|These {flowers} smell nice.|この花はいいにおいがします。|1||nature
tree|名|木|There is a big {tree} in the park.|公園に大きな木があります。|1||nature
leaf|名|葉|The {leaves} turn red and yellow in fall.|秋には葉が赤や黄色になります。|3|複数形 leaves|nature
animal|名|動物|What {animal} do you like?|何の動物が好きですか。|1||nature
pet|名|ペット|Do you have any {pets}?|ペットを飼っていますか。|1||nature
bird|名|鳥|A {bird} is singing in the tree.|鳥が木の上で鳴いています。|1||nature
horse|名|馬|I rode a {horse} on the farm.|農場で馬に乗りました。|2||nature
rabbit|名|うさぎ|My sister has a white {rabbit}.|妹は白いうさぎを飼っています。|2||nature
bear|名|くま|We saw a {bear} at the zoo.|動物園でくまを見ました。|2||nature
lion|名|ライオン|The {lion} is sleeping.|ライオンは眠っています。|3||nature
tiger|名|トラ|{Tigers} are big and strong.|トラは大きくて強いです。|3||nature
elephant|名|ゾウ|{Elephants} have long noses.|ゾウは長い鼻を持っています。|2||nature
monkey|名|サル|The {monkeys} are eating bananas.|サルたちがバナナを食べています。|2||nature
panda|名|パンダ|Many people came to see the {pandas}.|多くの人がパンダを見に来ました。|3||nature
penguin|名|ペンギン|{Penguins} can't fly, but they can swim well.|ペンギンは飛べないけれど、上手に泳げます。|2||nature
dolphin|名|イルカ|The {dolphins} jumped out of the water.|イルカが水からジャンプしました。|3||nature
kitchen|名|台所|My father is in the {kitchen}.|父は台所にいます。|1||home
bedroom|名|寝室|My {bedroom} is on the second floor.|私の寝室は2階にあります。|2||home
bathroom|名|浴室；トイレ|Where is the {bathroom}?|トイレはどこですか。|2||home
living room|名|居間|We watch TV in the {living room}.|居間でテレビを見ます。|2||home
garden|名|庭|My mother grows flowers in the {garden}.|母は庭で花を育てています。|1||home
room|名|部屋|Please clean your {room}.|部屋をそうじしなさい。|1||home
door|名|ドア|Please close the {door}.|ドアを閉めてください。|1||home
window|名|窓|Can you open the {window}?|窓を開けてくれますか。|1||home
wall|名|かべ|There is a map on the {wall}.|かべに地図がはってあります。|3||home
floor|名|床；階|The shoe shop is on the third {floor}.|靴屋は3階にあります。|1||home
sofa|名|ソファー|The cat is sleeping on the {sofa}.|ねこがソファーの上で寝ています。|3||home
bed|名|ベッド|I went to {bed} at ten last night.|昨夜は10時に寝ました。|1||home
box|名|箱|What's in this {box}?|この箱の中には何が入っているの？|2||home
bag|名|かばん|Your {bag} is under the desk.|あなたのかばんは机の下にあります。|1||home
hat|名|（ふちのある）帽子|Put on your {hat}. It's sunny today.|帽子をかぶりなさい。今日は日差しが強いよ。|2||home
cap|名|（野球）帽子|He is wearing a red {cap}.|彼は赤い帽子をかぶっています。|2||home
shirt|名|シャツ|I bought a new {shirt}.|新しいシャツを買いました。|2||home
jacket|名|上着；ジャケット|It's cold. Take your {jacket}.|寒いよ。上着を持っていきなさい。|2||home
coat|名|コート|I need a warm {coat} for winter.|冬用の暖かいコートが必要です。|2||home
sweater|名|セーター|My grandmother made this {sweater} for me.|祖母がこのセーターを作ってくれました。|3||home
shoe|名|靴|These {shoes} are too small for me.|この靴は私には小さすぎます。|1||home
dress|名|ドレス|She wore a pink {dress} to the party.|彼女はパーティーにピンクのドレスを着ていきました。|3||home
glasses|名|めがね|My father wears {glasses}.|父はめがねをかけています。|2||home
umbrella|名|かさ|Take an {umbrella} with you. It will rain.|かさを持っていきなさい。雨が降るよ。|1||home
watch|名/動|腕時計；見る|I got a new {watch} for my birthday.|誕生日に新しい腕時計をもらいました。|1||home
clock|名|時計|Look at the {clock}. It's already nine.|時計を見て。もう9時だよ。|2||home
camera|名|カメラ|I took pictures with my new {camera}.|新しいカメラで写真を撮りました。|2||home
phone|名|電話|Can I use your {phone}?|電話を借りてもいいですか。|1||home
computer|名|コンピューター|My father uses a {computer} at work.|父は仕事でコンピューターを使います。|1||home
Internet|名|インターネット|I often use the {Internet} to study.|私は勉強によくインターネットを使います。|2||home
e-mail|名|Eメール|I got an {e-mail} from my friend in Canada.|カナダの友達からEメールが来ました。|1||home
key|名|かぎ|I can't find my {key}.|かぎが見つかりません。|2||home
wallet|名|財布|I left my {wallet} at home.|家に財布を忘れてきました。|2||home
money|名|お金|I saved {money} to buy a new bike.|新しい自転車を買うためにお金をためました。|1||home
present|名|プレゼント|This is a birthday {present} for you.|これはあなたへの誕生日プレゼントです。|1||home
letter|名|手紙；文字|I wrote a {letter} to my grandmother.|祖母に手紙を書きました。|1||home
card|名|カード|I sent a New Year's {card} to my teacher.|先生に年賀状を送りました。|2||home
stamp|名|切手|I need a {stamp} for this letter.|この手紙に切手が必要です。|2||home
toy|名|おもちゃ|My little brother has many {toys}.|弟はおもちゃをたくさん持っています。|2||home
doll|名|人形|My sister made a {doll}.|妹は人形を作りました。|3||home
towel|名|タオル|Don't forget your {towel} for the pool.|プールのタオルを忘れないでね。|3||home
newspaper|名|新聞|My grandfather reads the {newspaper} every morning.|祖父は毎朝新聞を読みます。|2||home
bottle|名|びん；ボトル|I bought a {bottle} of water.|水を1本買いました。|2||home
glass|名|コップ；ガラス|He drank a {glass} of milk.|彼は牛乳を1杯飲みました。|2||home
plate|名|皿|Please put the cookies on the {plate}.|クッキーをお皿にのせてください。|3||home
dish|名|皿；料理|I washed the {dishes} after dinner.|夕食のあとで皿を洗いました。|2|複数形 dishes|home
thing|名|もの；こと|I have many {things} to do today.|今日はやることがたくさんあります。|1||home
color|名|色|What {color} is your bag?|あなたのかばんは何色ですか。|1||home
size|名|サイズ|Do you have a bigger {size}?|もっと大きいサイズはありますか。|2||home
news|名|ニュース；知らせ|I have good {news}!|いい知らせがあるよ！|2||home
message|名|伝言；メッセージ|Can I leave a {message}?|伝言をお願いできますか。|2||home
sport|名|スポーツ|What {sport} do you play?|何のスポーツをしますか。|1||hobby
game|名|試合；ゲーム|We won the {game} yesterday.|昨日の試合に勝ちました。|1||hobby
team|名|チーム|Our {team} won the game.|私たちのチームは試合に勝ちました。|1||hobby
volleyball|名|バレーボール|We play {volleyball} in P.E. class.|体育の授業でバレーボールをします。|2||hobby
table tennis|名|卓球|I'm on the {table tennis} team.|私は卓球部です。|2||hobby
race|名|競走；レース|I won the {race} at the sports day.|運動会の競走で1位になりました。|2||hobby
guitar|名|ギター|My brother plays the {guitar} well.|兄はギターを上手にひきます。|1||hobby
piano|名|ピアノ|She can play the {piano} very well.|彼女はピアノをとても上手にひけます。|1||hobby
violin|名|バイオリン|I started to learn the {violin}.|バイオリンを習い始めました。|3||hobby
drum|名|ドラム|He plays the {drums} in a band.|彼はバンドでドラムをたたいています。|3||hobby
music|名|音楽|I listen to {music} every night.|毎晩音楽を聞きます。|1||hobby
song|名|歌|Let's sing a {song} together.|いっしょに歌を歌おう。|1||hobby
band|名|バンド|My sister is in a rock {band}.|姉はロックバンドに入っています。|2||hobby
concert|名|コンサート|We went to a {concert} last night.|昨夜コンサートに行きました。|1||hobby
movie|名|映画|Let's see a {movie} this weekend.|今週末映画を見よう。|1||hobby
video|名|ビデオ；動画|I watched a funny {video} on the Internet.|インターネットでおもしろい動画を見ました。|2||hobby
video game|名|テレビゲーム|My brother plays {video games} every day.|弟は毎日テレビゲームをします。|2||hobby
comic|名|まんが|I like reading {comics}.|まんがを読むのが好きです。|2||hobby
magazine|名|雑誌|I read a soccer {magazine} at the library.|図書館でサッカー雑誌を読みました。|3||hobby
party|名|パーティー|We had a birthday {party} for Mike.|マイクのために誕生日パーティーを開きました。|1||hobby
festival|名|祭り|The summer {festival} is next Saturday.|夏祭りは次の土曜日です。|1||hobby
hobby|名|趣味|My {hobby} is collecting stamps.|私の趣味は切手を集めることです。|1||hobby
dance|動/名|踊る；ダンス|Let's {dance} together!|いっしょに踊ろう！|1||hobby
cooking|名|料理|My father is good at {cooking}.|父は料理が得意です。|2||hobby
shopping|名|買い物|Let's go {shopping} at the mall.|ショッピングモールに買い物に行こう。|1||hobby
picnic|名|ピクニック|Let's go on a {picnic} tomorrow.|明日ピクニックに行こう。|2||hobby
camp|名/動|キャンプ；キャンプする|We {camped} by the lake.|湖のそばでキャンプしました。|2||hobby
picture|名|絵；写真|Can I take a {picture} here?|ここで写真を撮ってもいいですか。|1||hobby
photo|名|写真|Look at this {photo} of my dog.|私の犬のこの写真を見て。|2||hobby
poster|名|ポスター|There is a {poster} about the festival on the wall.|かべにお祭りのポスターがはってあります。|3||hobby
dream|名/動|夢；夢を見る|My {dream} is to be a pilot.|私の夢はパイロットになることです。|1||hobby
fun|名|楽しみ；楽しいこと|The party was a lot of {fun}.|パーティーはとても楽しかったです。|1||hobby
luck|名|運|Good {luck} on your test!|テストがんばってね！|2||hobby
head|名|頭|He put his cap on his {head}.|彼は頭に帽子をかぶりました。|2||body
face|名|顔|Wash your {face} before breakfast.|朝食の前に顔を洗いなさい。|2||body
eye|名|目|She has big blue {eyes}.|彼女は大きな青い目をしています。|2||body
ear|名|耳|Rabbits have long {ears}.|うさぎは長い耳をしています。|2||body
nose|名|鼻|My {nose} is red because of the cold.|寒さで鼻が赤いです。|3||body
mouth|名|口|Open your {mouth}, please.|口を開けてください。|3||body
hand|名|手|Wash your {hands} before dinner.|夕食の前に手を洗いなさい。|1||body
arm|名|腕|The baby is in her mother's {arms}.|赤ちゃんはお母さんの腕の中にいます。|3||body
leg|名|脚（足）|My {legs} are tired after the long walk.|長く歩いたので足が疲れました。|2||body
foot|名|足|I go to school on {foot}.|私は歩いて学校に行きます。|2|複数形 feet|body
tooth|名|歯|Brush your {teeth} after meals.|食後は歯をみがきなさい。|2|複数形 teeth|body
hair|名|髪|She has long {hair}.|彼女は長い髪をしています。|2||body
cold|名/形|かぜ；寒い|I have a {cold}, so I'll stay home.|かぜをひいているので家にいます。|1||body
headache|名|頭痛|I have a {headache}.|頭が痛いです。|2||body
stomachache|名|腹痛|I had a {stomachache} last night.|昨夜おなかが痛かったです。|3||body
fever|名|熱|He has a high {fever}.|彼は高い熱があります。|3||body
medicine|名|薬|Take this {medicine} after dinner.|夕食後にこの薬を飲みなさい。|3||body
health|名|健康|Walking is good for your {health}.|歩くことは健康にいいです。|3||body
sick|形|病気の|My brother is {sick} in bed.|弟は病気で寝ています。|1||body
tired|形|疲れた|I'm very {tired} today.|今日はとても疲れました。|1||body
sleepy|形|眠い|I'm {sleepy}. I'll go to bed.|眠いな。もう寝るね。|2||body
healthy|形|健康な|Eat vegetables to stay {healthy}.|健康でいるために野菜を食べなさい。|3||body
fine|形|元気な；晴れた|I'm {fine}, thank you.|元気です、ありがとう。|1||body
`;

const W3 = String.raw`
go|動|行く|We {went} to the zoo last Sunday.|この前の日曜日に動物園へ行きました。|1|過去形 went|verb
have|動|持っている；食べる|We {had} a good time at the party.|パーティーで楽しい時間を過ごしました。|1|過去形 had|verb
arrive|動|着く|The train {arrived} at Tokyo Station at ten.|電車は10時に東京駅に着きました。|1||verb
ask|動|たずねる；頼む|Can I {ask} you something?|ちょっと聞いてもいいですか。|1||verb
begin|動|始まる；始める|The concert will {begin} at six.|コンサートは6時に始まります。|1|過去形 began|verb
borrow|動|借りる|Can I {borrow} your pen?|ペンを借りてもいい？|1||verb
lend|動|貸す|Could you {lend} me your dictionary?|辞書を貸してもらえますか。|2|過去形 lent|verb
bring|動|持ってくる|Please {bring} your lunch tomorrow.|明日はお弁当を持ってきてください。|1|過去形 brought|verb
build|動|建てる|They {built} a new school in our town.|町に新しい学校が建てられました。|2|過去形 built|verb
buy|動|買う|I {bought} a new bag yesterday.|昨日新しいかばんを買いました。|1|過去形 bought|verb
sell|動|売る|That store {sells} fresh fruit.|あの店は新鮮な果物を売っています。|1|過去形 sold|verb
call|動|電話する；呼ぶ|I'll {call} you tonight.|今夜電話するね。|1||verb
carry|動|運ぶ|Can you help me {carry} this box?|この箱を運ぶのを手伝ってくれる？|1|過去形 carried|verb
catch|動|つかまえる；（乗り物に）間に合う|I {caught} a big fish.|大きな魚をつかまえました。|1|過去形 caught|verb
change|動|変える；乗りかえる|You have to {change} trains at Shinjuku.|新宿で電車を乗りかえなければなりません。|2||verb
choose|動|選ぶ|Please {choose} one card.|カードを1枚選んでください。|2|過去形 chose|verb
clean|動/形|そうじする；きれいな|We {clean} our classroom every day.|私たちは毎日教室をそうじします。|1||verb
close|動|閉める|Please {close} the window. It's cold.|窓を閉めてください。寒いです。|1||verb
open|動|開ける；開く|The shop {opens} at ten.|その店は10時に開きます。|1||verb
come|動|来る|My aunt {came} to see us last week.|先週おばが会いに来ました。|1|過去形 came|verb
cry|動|泣く|The baby started to {cry}.|赤ちゃんが泣き始めました。|2|過去形 cried|verb
cut|動|切る|Please {cut} the cake into six pieces.|ケーキを6つに切ってください。|2|過去形 cut|verb
decide|動|決める|We {decided} to go to the beach.|私たちは海に行くことに決めました。|2||verb
draw|動|（線で絵を）かく|I like to {draw} pictures of animals.|動物の絵をかくのが好きです。|1|過去形 drew|verb
paint|動|（絵の具で）かく；ぬる|We {painted} the wall blue.|かべを青くぬりました。|2||verb
drink|動/名|飲む；飲み物|I {drank} a lot of water after the game.|試合のあとで水をたくさん飲みました。|1|過去形 drank|verb
eat|動|食べる|I {ate} curry for lunch.|昼食にカレーを食べました。|1|過去形 ate|verb
enjoy|動|楽しむ|Did you {enjoy} the party?|パーティーは楽しかったですか。|1||verb
feel|動|感じる|I {feel} happy when I play soccer.|サッカーをするとき幸せな気分になります。|2|過去形 felt|verb
find|動|見つける|I {found} my key under the bed.|ベッドの下でかぎを見つけました。|1|過去形 found|verb
finish|動|終える|I {finished} my homework before dinner.|夕食前に宿題を終えました。|1||verb
fly|動|飛ぶ|Birds can {fly}.|鳥は飛ぶことができます。|2|過去形 flew|verb
forget|動|忘れる|Don't {forget} your umbrella.|かさを忘れないで。|1|過去形 forgot|verb
get|動|手に入れる；着く|I {got} a letter from Tom.|トムから手紙をもらいました。|1|過去形 got|verb
give|動|あたえる|My father {gave} me a watch.|父が私に腕時計をくれました。|1|過去形 gave|verb
grow|動|育てる；成長する|My mother {grows} tomatoes.|母はトマトを育てています。|2|過去形 grew|verb
hear|動|聞こえる|I {heard} a strange sound.|変な音が聞こえました。|1|過去形 heard|verb
help|動|手伝う；助ける|Can you {help} me with my homework?|宿題を手伝ってくれる？|1||verb
hope|動|望む|I {hope} you like it.|気に入ってくれるといいな。|2||verb
hurry|動|急ぐ|{Hurry}, or you'll be late.|急いで、そうしないと遅れるよ。|2||verb
invite|動|招待する|Thank you for {inviting} me.|招待してくれてありがとう。|2||verb
join|動|参加する|Why don't you {join} us?|いっしょに参加しない？|1||verb
keep|動|保つ；とっておく|Please {keep} the room clean.|部屋をきれいにしておいてね。|2|過去形 kept|verb
know|動|知っている|Do you {know} that girl?|あの女の子を知っていますか。|1|過去形 knew|verb
laugh|動|笑う|Everyone {laughed} at his joke.|みんな彼の冗談に笑いました。|2||verb
learn|動|学ぶ；覚える|I want to {learn} Chinese.|中国語を学びたいです。|1||verb
leave|動|出発する；置いていく|The bus {left} at eight.|バスは8時に出発しました。|1|過去形 left|verb
listen|動|聞く|Please {listen} to me.|私の話を聞いてください。|1||verb
live|動|住む|My cousin {lives} in Kobe.|いとこは神戸に住んでいます。|1||verb
lose|動|なくす；負ける|I {lost} my umbrella on the train.|電車でかさをなくしました。|1|過去形 lost|verb
make|動|作る|My sister {made} a cake for me.|姉が私にケーキを作ってくれました。|1|過去形 made|verb
meet|動|会う|Nice to {meet} you.|はじめまして。|1|過去形 met|verb
move|動|動かす；引っ越す|My friend {moved} to Osaka last month.|友達が先月大阪に引っ越しました。|2||verb
need|動|必要とする|I {need} a new notebook.|新しいノートが必要です。|1||verb
pay|動|払う|I {paid} 500 yen for the book.|その本に500円払いました。|3|過去形 paid|verb
plan|動/名|計画する；計画|We are {planning} a party for Emi.|エミのためにパーティーを計画しています。|2||verb
practice|動/名|練習する；練習|I {practice} the guitar every day.|毎日ギターを練習します。|1||verb
put|動|置く|{Put} your bag on the chair.|かばんをいすの上に置いて。|1|過去形 put|verb
read|動|読む|I {read} three books last week.|先週本を3冊読みました。|1|過去形 read（発音は「レッド」）|verb
remember|動|覚えている；思い出す|Do you {remember} his name?|彼の名前を覚えていますか。|1||verb
rest|名/動|休み；休む|You should take a {rest}.|休んだほうがいいよ。|2||verb
return|動|返す；帰る|Please {return} the book by Friday.|金曜日までに本を返してください。|2||verb
ride|動|乗る|I {ride} my bike to the park.|自転車に乗って公園に行きます。|1|過去形 rode|verb
run|動|走る|He {ran} to the station.|彼は駅まで走りました。|1|過去形 ran|verb
say|動|言う|What did you {say}?|何て言ったの？|1|過去形 said|verb
see|動|見る；会う|I {saw} a rainbow this morning.|今朝にじを見ました。|1|過去形 saw|verb
send|動|送る|I {sent} an e-mail to my teacher.|先生にEメールを送りました。|1|過去形 sent|verb
show|動|見せる|Please {show} me your notebook.|ノートを見せてください。|1||verb
sing|動|歌う|We {sang} songs at the party.|パーティーで歌を歌いました。|1|過去形 sang|verb
sit|動|すわる|Please {sit} down.|すわってください。|1|過去形 sat|verb
sleep|動|眠る|I {slept} for nine hours last night.|昨夜は9時間眠りました。|1|過去形 slept|verb
smile|動/名|ほほえむ；笑顔|She always {smiles} at me.|彼女はいつも私にほほえみます。|3||verb
speak|動|話す|Can you {speak} English?|英語を話せますか。|1|過去形 spoke|verb
spend|動|過ごす；（お金を）使う|I {spent} the weekend with my family.|家族と週末を過ごしました。|2|過去形 spent|verb
stand|動|立つ|Please {stand} up.|立ってください。|2|過去形 stood|verb
start|動|始める；始まる|The game will {start} at two.|試合は2時に始まります。|1||verb
stay|動|滞在する；とどまる|I {stayed} at my aunt's house.|おばの家に泊まりました。|1||verb
stop|動|止まる；やめる|The rain {stopped}.|雨がやみました。|1|過去形 stopped|verb
study|動|勉強する|I {studied} English for an hour.|英語を1時間勉強しました。|1|過去形 studied|verb
swim|動|泳ぐ|We {swam} in the river.|私たちは川で泳ぎました。|1|過去形 swam|verb
take|動|取る；持っていく；（乗り物に）乗る|{Take} the number 3 bus.|3番のバスに乗ってください。|1|過去形 took|verb
talk|動|話す|I {talked} with my friend on the phone.|友達と電話で話しました。|1||verb
teach|動|教える|Ms. Green {teaches} music.|グリーン先生は音楽を教えています。|1|過去形 taught|verb
tell|動|伝える；言う|Please {tell} me about your trip.|旅行について話してください。|1|過去形 told|verb
thank|動|感謝する|{Thank} you for your help.|手伝ってくれてありがとう。|1||verb
think|動|思う；考える|I {think} it will rain.|雨が降ると思います。|1|過去形 thought|verb
throw|動|投げる|{Throw} the ball to me.|ボールを私に投げて。|2|過去形 threw|verb
touch|動|さわる|Please don't {touch} the pictures.|絵にさわらないでください。|2||verb
try|動|試す；やってみる|Let's {try} again.|もう一度やってみよう。|1|過去形 tried|verb
turn|動|曲がる；回す|{Turn} right at the corner.|角を右に曲がってください。|1||verb
understand|動|理解する|I can't {understand} this question.|この問題が理解できません。|1|過去形 understood|verb
use|動|使う|Can I {use} your computer?|コンピューターを使ってもいいですか。|1||verb
visit|動|訪れる|We {visited} Kyoto last year.|去年京都を訪れました。|1||verb
wait|動|待つ|Please {wait} here.|ここで待っていてください。|1||verb
walk|動/名|歩く；散歩|I {walk} my dog every morning.|毎朝犬を散歩させます。|1||verb
wash|動|洗う|I {washed} the dishes after dinner.|夕食後に皿を洗いました。|1||verb
wear|動|着ている|She is {wearing} a white dress.|彼女は白いドレスを着ています。|2|過去形 wore|verb
win|動|勝つ|Our team {won} the game.|私たちのチームは試合に勝ちました。|1|過去形 won|verb
worry|動|心配する|Don't {worry}. You can do it!|心配しないで。きみならできるよ！|2|過去形 worried|verb
write|動|書く|I {wrote} a letter to my friend.|友達に手紙を書きました。|1|過去形 wrote|verb
save|動|救う；（お金を）ためる|I'm {saving} money for a new game.|新しいゲームのためにお金をためています。|3||verb
share|動|分け合う|Let's {share} this pizza.|このピザを分け合おう。|2||verb
check|動|確かめる|Please {check} your answers.|答えを確かめてください。|2||verb
climb|動|登る|We {climbed} Mt. Fuji last summer.|去年の夏、富士山に登りました。|2||verb
cross|動|渡る|Be careful when you {cross} the street.|通りを渡るときは気をつけて。|2||verb
hold|動|持つ；（会などを）開く|Please {hold} my bag for a minute.|少しの間かばんを持っていてください。|3|過去形 held|verb
jump|動|跳ぶ|The cat {jumped} onto the table.|ねこがテーブルに飛び乗りました。|2||verb
pick|動|つむ；拾う|We {picked} apples on the farm.|農場でりんごをつみました。|3||verb
plant|動/名|植える；植物|We {planted} flowers in the garden.|庭に花を植えました。|3||verb
drive|動|運転する|My mother {drives} me to school when it rains.|雨の日は母が学校まで車で送ってくれます。|2|過去形 drove|verb
wake|動|目を覚ます|I {woke} up at six.|6時に目が覚めました。|2|過去形 woke|verb
sound|動/名|～に聞こえる；音|That {sounds} fun!|それは楽しそうだね！|1||verb
look|動|見る；～に見える|You {look} happy today.|今日はうれしそうだね。|1||verb
smell|動|においがする|This soup {smells} good.|このスープはいいにおいがします。|3||verb
taste|動|味がする|This cake {tastes} great.|このケーキはとてもおいしいです。|3||verb
become|動|～になる|She {became} a famous singer.|彼女は有名な歌手になりました。|2|過去形 became|verb
break|動|こわす|Who {broke} the window?|だれが窓を割ったの？|3|過去形 broke|verb
guess|動|推測する|{Guess} what! I got a new dog.|ねえ聞いて！新しい犬を飼ったんだ。|3||verb
welcome|動/形|歓迎する；ようこそ|{Welcome} to our school!|私たちの学校へようこそ！|2||verb
collect|動|集める|I {collect} stamps.|私は切手を集めています。|2||verb
beautiful|形|美しい|The sunset was very {beautiful}.|夕日はとても美しかったです。|1||adj
pretty|形|かわいい；きれいな|What a {pretty} dress!|なんてかわいいドレスでしょう！|2||adj
cute|形|かわいい|Your puppy is so {cute}!|あなたの子犬はとてもかわいいね！|1||adj
cool|形|涼しい；かっこいい|Your new jacket is {cool}!|あなたの新しいジャケット、かっこいいね！|1||adj
hot|形|暑い；熱い|It's very {hot} today.|今日はとても暑いです。|1||adj
great|形|すばらしい|That's a {great} idea!|それはすばらしい考えだね！|1||adj
wonderful|形|すばらしい|We had a {wonderful} time in Hawaii.|ハワイですばらしい時間を過ごしました。|2||adj
famous|形|有名な|Kyoto is {famous} for its old temples.|京都は古い寺で有名です。|1||adj
popular|形|人気のある|This song is {popular} with students.|この歌は生徒たちに人気があります。|1||adj
favorite|形|いちばん好きな|What's your {favorite} color?|いちばん好きな色は何ですか。|1||adj
important|形|大切な|It's {important} to eat breakfast.|朝食を食べることは大切です。|1||adj
interesting|形|おもしろい；興味深い|This book is very {interesting}.|この本はとてもおもしろいです。|1||adj
exciting|形|わくわくさせる|The soccer game was {exciting}.|サッカーの試合はわくわくしました。|1||adj
excited|形|わくわくした|I'm {excited} about the trip.|旅行にわくわくしています。|2||adj
surprised|形|驚いた|I was {surprised} at the news.|その知らせに驚きました。|3||adj
difficult|形|難しい|The test was {difficult}.|テストは難しかったです。|1||adj
easy|形|簡単な|This question is {easy}.|この問題は簡単です。|1||adj
hard|形/副|難しい；一生懸命に|Ken studies very {hard}.|ケンはとても一生懸命勉強します。|1||adj
busy|形|いそがしい|I'm {busy} today. How about tomorrow?|今日はいそがしいんだ。明日はどう？|1||adj
free|形|ひまな；無料の|Are you {free} this afternoon?|今日の午後ひまですか。|1||adj
ready|形|用意ができた|Dinner is {ready}!|夕食ができたよ！|1||adj
sure|形/副|確信して；もちろん|"Can you help me?" "{Sure}."|「手伝ってくれる？」「もちろん」|1||adj
sorry|形|すまなく思って；残念で|I'm {sorry} I'm late.|遅れてごめんなさい。|1||adj
glad|形|うれしい|I'm {glad} to hear that.|それを聞いてうれしいです。|2||adj
happy|形|幸せな；うれしい|I'm {happy} to see you again.|また会えてうれしいです。|1||adj
sad|形|悲しい|The movie was very {sad}.|その映画はとても悲しかったです。|2||adj
angry|形|怒った|My mother was {angry} with me.|母は私に怒っていました。|2||adj
afraid|形|こわがって|My sister is {afraid} of dogs.|妹は犬をこわがっています。|2||adj
kind|形/名|親切な；種類|What {kind} of food do you like?|どんな種類の食べ物が好きですか。|1||adj
friendly|形|親しみやすい|The people in this town are {friendly}.|この町の人たちは親しみやすいです。|2||adj
funny|形|おかしい|The movie was really {funny}.|その映画はとてもおかしかったです。|2||adj
large|形|大きい|This T-shirt is too {large} for me.|このTシャツは私には大きすぎます。|2||adj
little|形|小さい；少しの|I have a {little} brother.|私には弟がいます。|1||adj
long|形|長い|This river is very {long}.|この川はとても長いです。|1||adj
short|形|短い；背が低い|My hair is {short}.|私の髪は短いです。|1||adj
tall|形|背が高い|My brother is {tall}.|兄は背が高いです。|1||adj
high|形|高い|That mountain is very {high}.|あの山はとても高いです。|2||adj
young|形|若い|My aunt is very {young}.|おばはとても若いです。|2||adj
heavy|形|重い|This box is {heavy}.|この箱は重いです。|2||adj
light|形/名|軽い；明かり|Turn off the {light}, please.|明かりを消してください。|2||adj
expensive|形|（値段が）高い|This watch is too {expensive}.|この腕時計は高すぎます。|1||adj
cheap|形|安い|This shirt was very {cheap}.|このシャツはとても安かったです。|2||adj
fast|形/副|速い；速く|He can run very {fast}.|彼はとても速く走れます。|1||adj
slow|形|遅い|This computer is very {slow}.|このコンピューターはとても遅いです。|2||adj
quiet|形|静かな|Please be {quiet} in the library.|図書館では静かにしてください。|1||adj
dark|形|暗い|It's getting {dark}. Let's go home.|暗くなってきた。家に帰ろう。|2||adj
careful|形|注意深い|Be {careful}! Cars are coming.|気をつけて！車が来るよ。|1||adj
useful|形|役に立つ|This dictionary is very {useful}.|この辞書はとても役に立ちます。|2||adj
special|形|特別な|Today is a {special} day for me.|今日は私にとって特別な日です。|2||adj
different|形|ちがった|My sister and I like {different} food.|姉と私は好きな食べ物がちがいます。|2||adj
same|形|同じ|We are in the {same} class.|私たちは同じクラスです。|1||adj
strong|形|強い|The wind is very {strong} today.|今日は風がとても強いです。|2||adj
full|形|いっぱいの；満腹の|I'm {full}. I can't eat any more.|おなかいっぱい。もう食べられないよ。|2||adj
dirty|形|汚い|Your shoes are {dirty}.|あなたの靴は汚れています。|3||adj
rich|形|金持ちの|He became {rich} and famous.|彼はお金持ちで有名になりました。|3||adj
own|形|自分自身の|I want my {own} room.|自分の部屋がほしいです。|3||adj
enough|形/副|十分な|We have {enough} time.|時間は十分あります。|3||adj
right|形/名|正しい；右|Turn {right} at the bank.|銀行のところで右に曲がって。|1||adj
left|形/名|左の；左|The station is on your {left}.|駅は左手にあります。|1||adj
wrong|形|まちがった；具合が悪い|What's {wrong}?|どうしたの？|1||adj
other|形|ほかの|Do you have any {other} colors?|ほかの色はありますか。|2||adj
another|形|もう1つの|Can I have {another} cookie?|クッキーをもう1枚もらえますか。|2||adj
next|形|次の|See you {next} week.|また来週ね。|1||adj
last|形|この前の；最後の|I saw him {last} Sunday.|この前の日曜日に彼に会いました。|1||adj
always|副|いつも|I {always} get up at six.|私はいつも6時に起きます。|1||adv
usually|副|ふつう；たいてい|I {usually} walk to school.|私はたいてい歩いて学校に行きます。|1||adv
often|副|よく；しばしば|We {often} play tennis after school.|放課後よくテニスをします。|1||adv
sometimes|副|ときどき|I {sometimes} cook dinner.|私はときどき夕食を作ります。|1||adv
never|副|決して～ない|My father {never} drinks coffee.|父は決してコーヒーを飲みません。|2||adv
soon|副|すぐに|Dinner will be ready {soon}.|もうすぐ夕食ができるよ。|1||adv
later|副|あとで|See you {later}!|またあとでね！|1||adv
ago|副|～前に|I met him two years {ago}.|私は2年前に彼に会いました。|1||adv
again|副|もう一度|Please say that {again}.|もう一度言ってください。|1||adv
also|副|～もまた|I {also} like baseball.|私は野球も好きです。|1||adv
too|副|～も；～すぎる|This bag is {too} big for me.|このかばんは私には大きすぎます。|1||adv
together|副|いっしょに|Let's go {together}.|いっしょに行こう。|1||adv
really|副|本当に|I {really} like this song.|私は本当にこの歌が好きです。|1||adv
maybe|副|たぶん|{Maybe} it will rain tomorrow.|たぶん明日は雨が降るでしょう。|2||adv
still|副|まだ|He is {still} sleeping.|彼はまだ眠っています。|2||adv
just|副|ちょうど；ただ～だけ|I'm {just} looking.|見ているだけです。|2||adv
only|副/形|ただ～だけ|I have {only} 100 yen.|100円しか持っていません。|2||adv
then|副|そのとき；それから|We ate lunch, and {then} we went shopping.|昼食を食べて、それから買い物に行きました。|1||adv
finally|副|ついに|We {finally} arrived at the hotel.|ついにホテルに着きました。|2||adv
well|副/形|上手に；元気な|She speaks English very {well}.|彼女は英語をとても上手に話します。|1||adv
outside|副|外で|Let's play {outside}.|外で遊ぼう。|2||adv
someday|副|いつか|I want to go to Hawaii {someday}.|いつかハワイに行きたいです。|2||adv
back|副|もとへ；帰って|I'll be {back} soon.|すぐもどります。|2||adv
alone|副|ひとりで|My grandmother lives {alone}.|祖母はひとりで暮らしています。|3||adv
abroad|副|外国に|I want to study {abroad}.|留学したいです。|3||adv
near|前/形|～の近くに|I live {near} the station.|私は駅の近くに住んでいます。|1||adv
far|副/形|遠くに|Is the museum {far} from here?|博物館はここから遠いですか。|1||adv
around|前/副|～のまわりに|We walked {around} the lake.|湖のまわりを歩きました。|2||adv
about|前/副|～について；約|The movie is {about} a dog and a boy.|その映画は犬と男の子の話です。|1||adv
before|前/接|～の前に|Wash your hands {before} lunch.|昼食の前に手を洗いなさい。|1||adv
after|前/接|～のあとで|Let's play tennis {after} school.|放課後テニスをしよう。|1||adv
during|前|～の間に|I went to Okinawa {during} the summer vacation.|夏休みの間に沖縄に行きました。|2||adv
until|前/接|～まで（ずっと）|I waited for him {until} five.|5時まで彼を待ちました。|2||adv
between|前|～の間に|The bank is {between} the hotel and the park.|銀行はホテルと公園の間にあります。|2||adv
behind|前|～の後ろに|The cat is {behind} the sofa.|ねこはソファーの後ろにいます。|2||adv
across|前|～の向こう側に|The shop is {across} the street.|その店は通りの向こう側にあります。|3||adv
without|前|～なしで|I can't live {without} music.|音楽なしでは生きられません。|3||adv
because|接|～なので|I stayed home {because} it was rainy.|雨だったので家にいました。|1||adv
when|接/副|～のとき；いつ|{When} I was young, I lived in Kyoto.|小さいころ京都に住んでいました。|1||adv
if|接|もし～なら|{If} it's sunny tomorrow, let's go hiking.|もし明日晴れたら、ハイキングに行こう。|1||adv
so|接/副|だから；とても|It was cold, {so} I wore a coat.|寒かったのでコートを着ました。|1||adv
or|接|または|Which do you like, tea {or} coffee?|紅茶とコーヒーのどちらが好きですか。|2||adv
than|接|～よりも|My brother is taller {than} me.|兄は私より背が高いです。|1||adv
something|代|何か|I want {something} to drink.|何か飲み物がほしいです。|1||adv
anything|代|何か；何も|Do you need {anything}?|何か必要なものはありますか。|2||adv
everything|代|すべてのこと|Thank you for {everything}.|いろいろとありがとう。|2||adv
each|形/代|それぞれの|{Each} student has a computer.|それぞれの生徒がコンピューターを持っています。|3||adv
both|代/形|両方|{Both} of my parents are teachers.|両親は二人とも先生です。|2||adv
all|形/代|すべての|{All} the students went to the gym.|生徒全員が体育館へ行きました。|2||adv
every|形|すべての；毎～|I walk my dog {every} morning.|毎朝犬の散歩をします。|1||adv
most|形/副|最も；ほとんどの|This is the {most} popular song now.|これは今いちばん人気のある歌です。|2||adv
more|形/副|もっと|Can I have {more} rice?|ごはんをもっともらえますか。|2||adv
much|形/副|たくさんの；とても|Thank you very {much}.|どうもありがとう。|1||adv
many|形|たくさんの|How {many} brothers do you have?|兄弟は何人いますか。|1||adv
some|形|いくつかの|I bought {some} apples.|りんごをいくつか買いました。|1||adv
any|形|いくらかの；何も|Do you have {any} pets?|ペットを飼っていますか。|1||adv
whose|代|だれの|{Whose} umbrella is this?|これはだれのかさですか。|2||adv
which|代|どちら；どの|{Which} is your bag?|どれがあなたのかばんですか。|1||adv
why|副|なぜ|{Why} were you late?|なぜ遅れたのですか。|1||adv
how|副|どのように；どのくらい|{How} long does it take?|どのくらい時間がかかりますか。|1||adv
mine|代|私のもの|This pen is {mine}.|このペンは私のものです。|1||adv
yours|代|あなたのもの|Is this bag {yours}?|このかばんはあなたのものですか。|1||adv
hers|代|彼女のもの|That cap is {hers}.|あの帽子は彼女のものです。|2||adv
ours|代|私たちのもの|That red car is {ours}.|あの赤い車は私たちのものです。|3||adv
`;

export const WORDS_RAW = [W1, W2, W3].join('\n');

// 熟語：熟語|熟|意味|例文|訳|重要度
export const IDIOMS_RAW = String.raw`
a lot of|熟|たくさんの|There were {a lot of} people at the park.|公園にはたくさんの人がいました。|1
a little|熟|少し|I can speak Japanese {a little}.|私は日本語を少し話せます。|2
a few|熟|少しの；いくつかの|I stayed in Kyoto for {a few} days.|数日間京都に滞在しました。|2
a cup of|熟|カップ1杯の|Would you like {a cup of} tea?|お茶を1杯いかがですか。|1
a glass of|熟|コップ1杯の|I drink {a glass of} milk every morning.|毎朝牛乳を1杯飲みます。|1
a piece of|熟|1切れの；1枚の|Can I have {a piece of} cake?|ケーキを1切れもらえますか。|2
a pair of|熟|1組の；1足の|I bought {a pair of} shoes.|靴を1足買いました。|2
a member of|熟|～の一員|I'm {a member of} the brass band.|私は吹奏楽部の一員です。|2
after school|熟|放課後|Let's play soccer {after school}.|放課後サッカーをしよう。|1
all day|熟|一日中|It rained {all day} yesterday.|昨日は一日中雨でした。|1
all over the world|熟|世界中で|This song is popular {all over the world}.|この歌は世界中で人気があります。|2
arrive at|熟|～に着く|We {arrived at} the station at ten.|10時に駅に着きました。|1
at first|熟|最初は|{At first}, I didn't like natto.|最初は納豆が好きではありませんでした。|2
at home|熟|家で|I stayed {at home} last Sunday.|この前の日曜日は家にいました。|1
at last|熟|ついに|{At last}, we got to the top of the mountain.|ついに山の頂上に着きました。|2
at night|熟|夜に|I study {at night}.|私は夜に勉強します。|1
at the end of|熟|～の終わりに|We have a test {at the end of} June.|6月の終わりにテストがあります。|3
be able to|熟|～することができる|I'll {be able to} swim next summer.|来年の夏には泳げるようになるでしょう。|2
be afraid of|熟|～をこわがる|My brother {is afraid of} spiders.|弟はクモをこわがります。|2
be born|熟|生まれる|I {was born} in Hokkaido.|私は北海道で生まれました。|2
be busy with|熟|～でいそがしい|I'm {busy with} my homework.|宿題でいそがしいです。|2
be different from|熟|～とちがう|My idea {is different from} yours.|私の考えはあなたのとちがいます。|3
be famous for|熟|～で有名である|This town {is famous for} its beautiful lake.|この町は美しい湖で有名です。|2
be full of|熟|～でいっぱいである|The box {was full of} toys.|箱はおもちゃでいっぱいでした。|3
be glad to|熟|～してうれしい|I'm {glad to} meet you.|お会いできてうれしいです。|2
be good at|熟|～が得意である|Emi {is good at} playing the piano.|エミはピアノをひくのが得意です。|1
be going to|熟|～するつもりだ|I'm {going to} visit my uncle this weekend.|今週末おじを訪ねるつもりです。|1
be interested in|熟|～に興味がある|I'm {interested in} Japanese history.|私は日本の歴史に興味があります。|1
be kind to|熟|～に親切である|Please {be kind to} animals.|動物にやさしくしてね。|3
be late for|熟|～に遅れる|Don't {be late for} school.|学校に遅れないように。|1
be over|熟|終わる|The summer vacation {is over}.|夏休みが終わりました。|3
be ready for|熟|～の準備ができている|Are you {ready for} the trip?|旅行の準備はできた？|2
be sick in bed|熟|病気で寝ている|Tom {is sick in bed} today.|トムは今日病気で寝ています。|3
both A and B|熟|AもBも両方|I like {both} dogs {and} cats.|私は犬もねこも好きです。|2
by bus|熟|バスで|I go to school {by bus}.|私はバスで学校に行きます。|1
by the way|熟|ところで|{By the way}, where is Ken?|ところで、ケンはどこ？|2
catch a cold|熟|かぜをひく|Wear a coat, or you'll {catch a cold}.|コートを着ないとかぜをひくよ。|3
clean up|熟|きれいにそうじする|Let's {clean up} the park.|公園をきれいにしよう。|2
come back|熟|もどる|Please {come back} by six.|6時までにもどってきてね。|1
come home|熟|帰宅する|My father {comes home} at seven.|父は7時に帰宅します。|1
come in|熟|中に入る|Please {come in}.|どうぞお入りください。|1
come true|熟|実現する|I hope your dream will {come true}.|あなたの夢がかなうといいですね。|3
do one's homework|熟|宿題をする|I {do my homework} after dinner.|夕食後に宿題をします。|1
each other|熟|おたがい|We help {each other}.|私たちはおたがいに助け合います。|2
far from|熟|～から遠い|My house is {far from} the station.|私の家は駅から遠いです。|1
for a long time|熟|長い間|I waited {for a long time}.|長い間待ちました。|1
for example|熟|たとえば|I like fruit, {for example}, apples and bananas.|果物が好きです、たとえばりんごやバナナです。|2
for the first time|熟|初めて|I saw snow {for the first time}.|初めて雪を見ました。|2
from A to B|熟|AからBまで|The shop is open {from} ten {to} eight.|その店は10時から8時まで開いています。|2
get home|熟|家に着く|I {got home} at five.|5時に家に着きました。|1
get on|熟|（乗り物に）乗る|Let's {get on} the bus.|バスに乗ろう。|2
get off|熟|（乗り物から）降りる|{Get off} the train at the next station.|次の駅で電車を降りてください。|2
get to|熟|～に着く|How can I {get to} the museum?|博物館へはどうやって行けますか。|2
get up|熟|起きる|I {get up} at six every morning.|毎朝6時に起きます。|1
give up|熟|あきらめる|Don't {give up}!|あきらめないで！|2
go back|熟|もどる；帰る|I have to {go back} to school.|学校にもどらなければなりません。|2
go camping|熟|キャンプに行く|We {went camping} by the lake.|湖のそばへキャンプに行きました。|2
go fishing|熟|つりに行く|My father often {goes fishing} on Sundays.|父は日曜日によくつりに行きます。|2
go for a walk|熟|散歩に行く|Let's {go for a walk} after lunch.|昼食後に散歩に行こう。|2
go hiking|熟|ハイキングに行く|Let's {go hiking} this weekend.|今週末ハイキングに行こう。|2
go on a trip|熟|旅行に行く|We {went on a trip} to Okinawa.|私たちは沖縄に旅行に行きました。|2
go out|熟|外出する|Let's {go out} for dinner.|夕食を食べに出かけよう。|2
go shopping|熟|買い物に行く|I {went shopping} with my mother.|母と買い物に行きました。|1
go skiing|熟|スキーに行く|We {go skiing} in Nagano every winter.|毎年冬に長野へスキーに行きます。|2
go to bed|熟|寝る|I {went to bed} early last night.|昨夜は早く寝ました。|1
grow up|熟|成長する；大人になる|I want to be a doctor when I {grow up}.|大人になったら医者になりたいです。|2
have a cold|熟|かぜをひいている|I {have a cold}, so I can't go.|かぜをひいているので行けません。|2
have a good time|熟|楽しい時を過ごす|We {had a good time} at the beach.|海で楽しい時を過ごしました。|1
have a party|熟|パーティーを開く|We {had a party} for Mika.|ミカのためにパーティーを開きました。|2
have fun|熟|楽しむ|{Have fun} at the party!|パーティーを楽しんでね！|1
have to|熟|～しなければならない|I {have to} clean my room.|部屋をそうじしなければなりません。|1
hear about|熟|～について聞く|Did you {hear about} the new teacher?|新しい先生のことを聞いた？|3
help A with B|熟|AのBを手伝う|Can you {help} me {with} my homework?|宿題を手伝ってくれる？|1
how about|熟|～はどうですか|{How about} going to the movies?|映画に行くのはどう？|1
how far|熟|どのくらい遠く|{How far} is it from here to the park?|ここから公園までどのくらいの距離ですか。|2
how long|熟|どのくらい長く|{How long} does it take to the station?|駅までどのくらいかかりますか。|1
how many|熟|いくつの；何人の|{How many} people are there in your family?|何人家族ですか。|1
how much|熟|いくら|{How much} is this cap?|この帽子はいくらですか。|1
how often|熟|どのくらいの頻度で|{How often} do you go to the gym?|どのくらいの頻度でジムに行きますか。|2
hurry up|熟|急ぐ|{Hurry up}! The bus is coming.|急いで！バスが来るよ。|2
in front of|熟|～の前に|Let's meet {in front of} the library.|図書館の前で会おう。|1
in the future|熟|将来|I want to live abroad {in the future}.|将来は外国に住みたいです。|2
in the morning|熟|午前中に；朝に|I jog {in the morning}.|私は朝ジョギングをします。|1
laugh at|熟|～を笑う|Don't {laugh at} me.|私を笑わないで。|3
listen to|熟|～を聞く|I like to {listen to} music.|音楽を聞くのが好きです。|1
look at|熟|～を見る|{Look at} that bird!|あの鳥を見て！|1
look for|熟|～をさがす|I'm {looking for} my cat.|ねこをさがしています。|1
look forward to|熟|～を楽しみに待つ|I'm {looking forward to} the trip.|旅行を楽しみにしています。|2
look like|熟|～のように見える|That cloud {looks like} a rabbit.|あの雲はうさぎみたいに見えます。|2
make a speech|熟|スピーチをする|Tom {made a speech} at the festival.|トムはお祭りでスピーチをしました。|3
move to|熟|～に引っ越す|My family {moved to} Nagoya last year.|家族は去年名古屋に引っ越しました。|2
next to|熟|～のとなりに|The bank is {next to} the park.|銀行は公園のとなりにあります。|1
not ~ at all|熟|まったく～ない|I'm {not} tired {at all}.|まったく疲れていません。|3
of course|熟|もちろん|"Can I use this?" "{Of course}."|「これを使ってもいい？」「もちろん」|1
on foot|熟|歩いて|I go to school {on foot}.|歩いて学校に行きます。|1
on one's way to|熟|～へ行く途中で|I met Ken {on my way to} school.|学校へ行く途中でケンに会いました。|3
on TV|熟|テレビで|I watched the game {on TV}.|その試合をテレビで見ました。|2
one day|熟|ある日|{One day}, a boy found a small dog.|ある日、男の子が小さな犬を見つけました。|2
one of|熟|～のうちの1つ（1人）|Kyoto is {one of} my favorite cities.|京都は私の好きな都市の1つです。|2
over there|熟|向こうに|Look at the girl {over there}.|向こうにいる女の子を見て。|1
pick up|熟|拾う；車で迎えに行く|I'll {pick} you {up} at the station.|駅に車で迎えに行くよ。|3
play catch|熟|キャッチボールをする|Let's {play catch} in the park.|公園でキャッチボールをしよう。|3
put on|熟|～を着る；身につける|{Put on} your coat. It's cold.|コートを着なさい。寒いよ。|2
right now|熟|今すぐ；ちょうど今|I'm busy {right now}.|今いそがしいんです。|2
say hello to|熟|～によろしく伝える|Please {say hello to} your family.|ご家族によろしく伝えてください。|2
sit down|熟|すわる|Please {sit down}.|おすわりください。|1
speak to|熟|～と話す|Can I {speak to} Mr. Smith, please?|スミスさんをお願いできますか。|2
stand up|熟|立ち上がる|{Stand up}, please.|起立してください。|1
stay home|熟|家にいる|I {stayed home} and read a book.|家にいて本を読みました。|2
stay with|熟|～の家に泊まる|I {stayed with} my aunt in Osaka.|大阪のおばの家に泊まりました。|2
take a bath|熟|おふろに入る|I {take a bath} before dinner.|夕食の前におふろに入ります。|2
take a picture|熟|写真を撮る|Can I {take a picture} here?|ここで写真を撮ってもいいですか。|1
take a shower|熟|シャワーを浴びる|I {took a shower} after the game.|試合のあとでシャワーを浴びました。|2
take a walk|熟|散歩する|Let's {take a walk} in the park.|公園を散歩しよう。|2
take care of|熟|～の世話をする|I {take care of} my little sister.|妹の世話をしています。|2
take off|熟|～をぬぐ|Please {take off} your shoes here.|ここで靴をぬいでください。|2
talk about|熟|～について話す|We {talked about} our summer plans.|夏の計画について話しました。|2
talk to|熟|～と話す|Can I {talk to} you for a minute?|少し話してもいいですか。|1
tell A to ~|熟|Aに～するように言う|The teacher {told} us {to} be quiet.|先生は私たちに静かにするように言いました。|2
ask A to ~|熟|Aに～するように頼む|My mother {asked} me {to} wash the dishes.|母は私に皿を洗うように頼みました。|2
thank A for B|熟|BのことでAに感謝する|{Thank} you {for} the nice present.|すてきなプレゼントをありがとう。|1
these days|熟|最近|I'm very busy {these days}.|最近とてもいそがしいです。|3
think about|熟|～について考える|I'll {think about} it.|考えておきます。|2
throw away|熟|捨てる|Don't {throw away} the box.|その箱を捨てないで。|3
try on|熟|試着する|Can I {try on} this jacket?|このジャケットを試着してもいいですか。|2
turn off|熟|（電気などを）消す|Please {turn off} the TV.|テレビを消してください。|2
turn on|熟|（電気などを）つける|Can you {turn on} the light?|電気をつけてくれる？|2
wait for|熟|～を待つ|I'm {waiting for} the bus.|バスを待っています。|1
wake up|熟|目を覚ます|I {woke up} at seven.|7時に目が覚めました。|2
walk to|熟|～へ歩いて行く|I {walk to} school every day.|毎日歩いて学校へ行きます。|2
want to be|熟|～になりたい|I {want to be} a vet.|獣医になりたいです。|1
what time|熟|何時|{What time} does the movie start?|映画は何時に始まりますか。|1
why don't you|熟|～したらどう？|{Why don't you} ask your teacher?|先生に聞いてみたら？|2
would like to|熟|～したい（ていねい）|I {would like to} visit your country.|あなたの国を訪れたいです。|2
write to|熟|～に手紙を書く|I often {write to} my grandmother.|祖母によく手紙を書きます。|2
`;

// 会話表現：表現|会|意味|例（会話）|訳|重要度
export const PHRASES_RAW = String.raw`
Here you are.|会|はい、どうぞ。（物をわたすとき）|A: Can I see your ticket? B: Sure. {Here you are.}|A: チケットを見せてもらえますか。B: はい、どうぞ。|1
You're welcome.|会|どういたしまして。|A: Thank you for your help. B: {You're welcome.}|A: 手伝ってくれてありがとう。B: どういたしまして。|1
Excuse me.|会|すみません。（話しかけるとき）|{Excuse me.} Where is the station?|すみません。駅はどこですか。|1
That's too bad.|会|それは残念ですね；お気の毒に。|A: I have a cold. B: {That's too bad.}|A: かぜをひいているんだ。B: それは大変だね。|1
That's a good idea.|会|それはいい考えですね。|A: Let's go to the beach. B: {That's a good idea.}|A: 海に行こう。B: いい考えだね。|1
Sounds good.|会|いいですね。|A: How about pizza for lunch? B: {Sounds good.}|A: 昼食はピザにしない？B: いいね。|1
Sounds fun.|会|楽しそうですね。|A: We're going to have a party on Sunday. B: {Sounds fun.}|A: 日曜日にパーティーをするんだ。B: 楽しそうだね。|1
Good luck.|会|がんばってね；幸運を。|A: I have a test tomorrow. B: {Good luck.}|A: 明日テストなんだ。B: がんばってね。|1
Congratulations!|会|おめでとう！|A: I won the contest! B: {Congratulations!}|A: コンテストで優勝したよ！B: おめでとう！|2
Me, too.|会|私もです。|A: I'm hungry. B: {Me, too.}|A: おなかすいた。B: 私も。|1
No problem.|会|いいですよ；問題ないよ。|A: Can you help me? B: {No problem.}|A: 手伝ってくれる？B: いいよ。|1
Sorry, I can't.|会|ごめん、できないんだ。|A: Can you come to my party? B: {Sorry, I can't.} I have to visit my grandma.|A: パーティーに来られる？B: ごめん、行けないんだ。おばあちゃんの家に行かなきゃいけなくて。|1
Can I help you?|会|いらっしゃいませ；お手伝いしましょうか。|A: {Can I help you?} B: Yes. I'm looking for a T-shirt.|A: いらっしゃいませ。B: はい。Tシャツをさがしています。|1
I'm just looking.|会|見ているだけです。|A: Can I help you? B: No, thanks. {I'm just looking.}|A: いらっしゃいませ。B: いえ、けっこうです。見ているだけです。|2
How much is it?|会|いくらですか。|A: I like this bag. {How much is it?} B: It's 3,000 yen.|A: このかばんいいな。いくらですか。B: 3,000円です。|1
I'll take it.|会|それをください。|A: It's 20 dollars. B: OK. {I'll take it.}|A: 20ドルです。B: わかりました。それをください。|1
Do you have ~?|会|～はありますか。|A: {Do you have} this in blue? B: Yes, we do.|A: これの青はありますか。B: はい、ございます。|2
What's wrong?|会|どうしたの？|A: {What's wrong?} B: I lost my key.|A: どうしたの？B: かぎをなくしちゃったの。|1
What's the matter?|会|どうしたの？|A: You look sad. {What's the matter?} B: My dog is sick.|A: 悲しそうだね。どうしたの？B: 犬が病気なの。|2
What happened?|会|何があったの？|A: {What happened?} B: I fell off my bike.|A: 何があったの？B: 自転車から落ちちゃったんだ。|2
Are you OK?|会|大丈夫？|A: {Are you OK?} B: Yes, I'm fine.|A: 大丈夫？B: うん、平気。|1
Take care.|会|気をつけてね；お大事に。|A: I'm going home now. B: OK. {Take care.}|A: もう帰るね。B: うん。気をつけてね。|2
Don't worry.|会|心配しないで。|A: I forgot my pencil case. B: {Don't worry.} You can use mine.|A: 筆箱を忘れちゃった。B: 心配しないで。私のを使っていいよ。|1
Be careful.|会|気をつけて。|{Be careful.} The floor is wet.|気をつけて。床がぬれているよ。|1
Shall we ~?|会|（いっしょに）～しましょうか。|A: {Shall we} play tennis? B: Yes, let's.|A: テニスをしましょうか。B: ええ、しましょう。|2
Shall I ~?|会|（私が）～しましょうか。|A: {Shall I} open the window? B: Yes, please.|A: 窓を開けましょうか。B: はい、お願いします。|2
Would you like ~?|会|～はいかがですか。|A: {Would you like} some cookies? B: Yes, please.|A: クッキーはいかがですか。B: はい、いただきます。|1
Yes, please.|会|はい、お願いします。|A: Would you like some tea? B: {Yes, please.}|A: お茶はいかがですか。B: はい、お願いします。|1
No, thank you.|会|いいえ、けっこうです。|A: More cake? B: {No, thank you.} I'm full.|A: ケーキもっとどう？B: いいえ、けっこうです。おなかいっぱいです。|1
Could you ~?|会|～していただけますか。|A: {Could you} tell me the way to the library? B: Sure.|A: 図書館への道を教えていただけますか。B: いいですよ。|2
Just a moment.|会|少々お待ちください。|A: Is Mr. Smith there? B: {Just a moment}, please.|A: スミスさんはいらっしゃいますか。B: 少々お待ちください。|2
Hold on, please.|会|（電話で）切らずにお待ちください。|A: Can I speak to Emi? B: {Hold on, please.}|A: エミさんをお願いします。B: そのままお待ちください。|2
Can I speak to ~?|会|（電話で）～さんをお願いします。|A: Hello. {Can I speak to} Lisa? B: Sorry, she's out now.|A: もしもし。リサさんをお願いします。B: すみません、今出かけています。|2
Can I leave a message?|会|伝言をお願いできますか。|A: Sorry, he's out. B: {Can I leave a message?}|A: すみません、彼は外出中です。B: 伝言をお願いできますか。|3
What time is it?|会|何時ですか。|A: {What time is it?} B: It's three thirty.|A: 何時？B: 3時半だよ。|1
What day is it today?|会|今日は何曜日ですか。|A: {What day is it today?} B: It's Wednesday.|A: 今日は何曜日？B: 水曜日だよ。|1
What's the date today?|会|今日は何月何日ですか。|A: {What's the date today?} B: It's May 5th.|A: 今日は何月何日？B: 5月5日だよ。|2
How's the weather?|会|天気はどうですか。|A: {How's the weather} in Tokyo? B: It's rainy.|A: 東京の天気はどう？B: 雨だよ。|1
How was ~?|会|～はどうでしたか。|A: {How was} your trip? B: It was great.|A: 旅行はどうだった？B: 最高だったよ。|1
How about you?|会|あなたはどうですか。|A: I like summer. {How about you?} B: I like winter.|A: 私は夏が好き。あなたは？B: ぼくは冬が好き。|1
Where are you from?|会|どちらの出身ですか。|A: {Where are you from?} B: I'm from Canada.|A: どちらの出身ですか。B: カナダ出身です。|1
Nice to meet you.|会|はじめまして。|A: I'm Tom. B: I'm Emi. {Nice to meet you.}|A: トムです。B: エミです。はじめまして。|1
See you later.|会|またあとでね。|A: I'm going to the library. B: OK. {See you later.}|A: 図書館に行ってくるね。B: わかった。またあとでね。|1
See you tomorrow.|会|また明日。|A: Bye, Ken. B: {See you tomorrow.}|A: じゃあね、ケン。B: また明日。|1
Have a nice day.|会|よい一日を。|A: Bye, Mom. B: {Have a nice day.}|A: 行ってきます、お母さん。B: 行ってらっしゃい。|1
Have a nice weekend.|会|よい週末を。|A: {Have a nice weekend.} B: You, too.|A: よい週末を。B: あなたもね。|2
Same to you.|会|あなたもね。|A: Have a nice weekend! B: Thanks. {Same to you.}|A: よい週末を！B: ありがとう。あなたもね。|2
Happy birthday!|会|誕生日おめでとう！|{Happy birthday!} This is for you.|誕生日おめでとう！これ、あなたにね。|1
Help yourself.|会|ご自由にどうぞ。|A: These cookies look good. B: {Help yourself.}|A: このクッキーおいしそう。B: 自由に取ってね。|2
Anything else?|会|ほかに何かありますか。|A: A hamburger, please. B: {Anything else?}|A: ハンバーガーをください。B: ほかにご注文は？|2
For here or to go?|会|こちらでめし上がりますか、お持ち帰りですか。|A: {For here or to go?} B: For here, please.|A: こちらでめし上がりますか、お持ち帰りですか。B: ここで食べます。|3
That's all.|会|それで全部です。|A: Anything else? B: No, {that's all.}|A: ほかに何かございますか。B: いいえ、それで全部です。|3
Here's your change.|会|おつりです。|A: {Here's your change.} B: Thank you.|A: おつりです。B: ありがとう。|3
Can I try it on?|会|試着してもいいですか。|A: I like this jacket. {Can I try it on?} B: Of course.|A: このジャケットいいな。試着してもいいですか。B: もちろんです。|2
Which one?|会|どれですか。|A: Can you pass me that book? B: {Which one?}|A: その本を取ってくれる？B: どれ？|2
I see.|会|なるほど；わかりました。|A: The shop is closed on Mondays. B: {I see.}|A: その店は月曜日は休みだよ。B: なるほど。|1
I think so, too.|会|私もそう思います。|A: This movie is great. B: {I think so, too.}|A: この映画、最高だね。B: 私もそう思う。|2
I don't think so.|会|そうは思いません。|A: It will rain today. B: {I don't think so.} Look at the sky.|A: 今日は雨が降るね。B: そうは思わないよ。空を見て。|3
Really?|会|本当？|A: I saw a famous singer at the station. B: {Really?}|A: 駅で有名な歌手を見たよ。B: 本当？|1
That's right.|会|そのとおりです。|A: You're Ken's sister, right? B: {That's right.}|A: ケンのお姉さんだよね？B: そのとおり。|2
Sure.|会|もちろん；いいよ。|A: Can you open the door? B: {Sure.}|A: ドアを開けてくれる？B: いいよ。|1
All right.|会|わかりました；いいよ。|A: Please wash your hands. B: {All right.}|A: 手を洗ってね。B: わかった。|1
Not yet.|会|まだです。|A: Did you finish your homework? B: {Not yet.}|A: 宿題終わった？B: まだ。|1
Good job!|会|よくできました！|A: I got 100 on the test. B: {Good job!}|A: テストで100点をとったよ。B: よくやったね！|1
Nice try.|会|おしかったね；よくがんばったね。|A: I lost the race. B: {Nice try.}|A: 競走に負けちゃった。B: よくがんばったね。|3
Go ahead.|会|どうぞ（お先に）。|A: Can I use your phone? B: Sure. {Go ahead.}|A: 電話を使ってもいい？B: いいよ。どうぞ。|2
Wait a minute.|会|ちょっと待って。|{Wait a minute.} I'll get my bag.|ちょっと待って。かばんを取ってくるね。|2
I'm coming.|会|今行きます。|A: Dinner is ready! B: {I'm coming.}|A: 夕食ができたよ！B: 今行く。|2
I'm home.|会|ただいま。|A: {I'm home.} B: Welcome home.|A: ただいま。B: おかえり。|2
Let me see.|会|ええと。|A: What do you want for lunch? B: {Let me see.} Spaghetti.|A: お昼は何がいい？B: ええと。スパゲッティ。|2
It's my turn.|会|私の番です。|A: {It's my turn.} B: OK. Go ahead.|A: 私の番だよ。B: わかった。どうぞ。|3
It's time for ~.|会|～の時間です。|{It's time for} dinner!|夕食の時間よ！|2
Welcome to ~.|会|～へようこそ。|{Welcome to} Japan!|日本へようこそ！|2
Here it is.|会|はい、ここにありますよ。|A: Where's my pen? B: {Here it is.}|A: ぼくのペンはどこ？B: ここにあるよ。|2
Long time no see.|会|久しぶり。|A: Hi, Mike! {Long time no see.} B: Hi, Emi!|A: やあ、マイク！久しぶり。B: やあ、エミ！|3
`;
