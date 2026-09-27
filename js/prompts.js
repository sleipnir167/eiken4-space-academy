// AI への指示文（プロンプト）
//  出力を短く・JSON にして、安いモデルや小さなモデル（Gemma など）でも安定して動くようにしている

const SYS_TEACHER = `あなたは日本の小学生・中学生に英語を教える、やさしくて的確な英検対策の先生です。
英検4級（中学中級程度）の学習者に向けて、日本語でわかりやすく説明します。むずかしい専門用語は使わず、具体例を添えてください。
説明は必ず自然な日本語で書きます（中国語の簡体字や、英語だけの説明文を混ぜません）。英語の例文・語句だけは英語で書きます。`;

/** 4択問題の解説 */
export function explainPrompt({ question, choices, answer, chosen, passage }) {
  return [
    { role: 'system', content: SYS_TEACHER },
    {
      role: 'user',
      content: `英検4級の問題です。${chosen != null && chosen !== answer ? `生徒は「${choices[chosen]}」を選んでまちがえました。` : ''}
${passage ? `【本文】\n${passage}\n\n` : ''}【問題】
${question}
【選択肢】
${choices.map((c, i) => `${i + 1}. ${c}`).join('\n')}
【正解】${answer + 1}. ${choices[answer]}

次の形で、全体で300字以内にまとめてください。
■ 正解の理由
■ ほかの選択肢がちがう理由（1つずつ短く）
■ 覚えておきたいポイント（関連する表現や文法）
■ 例文（英文と日本語訳を1つ）`,
    },
  ];
}

/** 並べかえ問題の解説 */
export function explainOrderPrompt({ ja, sentence, got, grammar }) {
  return [
    { role: 'system', content: SYS_TEACHER },
    {
      role: 'user',
      content: `英検4級の並べかえ問題です。
【日本文】${ja}
【正しい英文】${sentence}
${got ? `【生徒の答え】${got}\n` : ''}${grammar ? `【文法のテーマ】${grammar}\n` : ''}
次の形で、全体で250字以内にまとめてください。
■ 語順のポイント（どの順番で考えるとよいか。「だれが→どうする→何を→どこで→いつ」など）
${got ? '■ 生徒の答えのどこがちがうか\n' : ''}■ 同じ形を使った例文（英文と日本語訳を1つ）`,
    },
  ];
}

/** 英文を書こう（和文英訳）の添削：正解例とちがう答えが正しいかを判定 */
export function checkSentencePrompt({ ja, model, text }) {
  return [
    { role: 'system', content: `${SYS_TEACHER}\nあなたは英作文の採点者です。模範解答と表現がちがっても、日本文の意味を正しく表した自然な英文なら正解にします。大文字・小文字やピリオドのちがいは気にしません。` },
    {
      role: 'user',
      content: `次の日本文を英語にする問題です。
【日本文】${ja}
【模範解答】${model}
【生徒の答え】${text}

次の JSON だけを出力してください（説明文やコードブロックは不要）。comment は日本語で、小学生にもわかる言葉で書くこと。
{"ok": true または false, "corrected": "生徒の答えを最小限だけ直した英文（正しければそのまま）", "comment": "ひとこと（60字以内）"}`,
    },
  ];
}

/** 解説へのフォローアップ質問 */
export function followupPrompt({ context, question }) {
  return [
    { role: 'system', content: `${SYS_TEACHER}\n回答は200字以内で簡潔に。` },
    { role: 'user', content: `【問題と解説】\n${context}\n\n【生徒の質問】\n${question}` },
  ];
}

/** スピーキングテストの採点 */
export function gradeSpeakingPrompt({ card, readingRatio, readingText, answers }) {
  const qa = answers.map((a, i) => `No.${i + 1}\n質問: ${a.q}\n模範解答の例: ${a.model || '(自由回答)'}\n受験者の答え: ${a.text || '(無回答)'}`).join('\n\n');
  return [
    { role: 'system', content: `${SYS_TEACHER}\nあなたは英検4級スピーキングテストの採点者です。音声認識で書き起こした答えなので、句読点や大文字小文字の誤り、軽い認識ミスは減点しないでください。` },
    {
      role: 'user',
      content: `英検4級のスピーキング練習の結果を採点してください。
【問題カード】
タイトル: ${card.title}
${card.passage}

【音読】原文との一致率（音声認識による目安）: ${Math.round(readingRatio * 100)}%
読み取った音読: ${readingText || '(なし)'}

【質問と答え】
${qa}

【採点の基準】
- reading（音読）0〜5点：意味のまとまりに注意して、正しく読めているか（一致率を参考に）
- 各質問 0〜5点：質問に正しく答えているか。主語と動詞のある文で答えられていればより高く（4級は単語だけの答えでも内容が合っていれば部分点）。No.4 は Yes/No と、そのあとの質問への答えの両方を見る

次の JSON だけを出力してください。comment・summary・tips は必ず日本語で、小学生にもわかる言葉で書くこと（better だけは英文）。
{
 "reading": {"score": 0-5, "comment": "音読へのコメント（短く）"},
 "answers": [{"no": 1, "score": 0-5, "comment": "短いコメント", "better": "よりよい答えの例（英文）"}],
 "summary": "全体の総評（2〜3文）",
 "tips": ["次に向けたアドバイス（2〜3個）"]
}`,
    },
  ];
}

/** 新しい問題を作る（大問1形式） */
export function generateQuizPrompt({ words, grammar, count = 5 }) {
  return [
    { role: 'system', content: 'You are an expert item writer for the Japanese EIKEN Grade 4 test (junior-high-school 2nd-year level, CEFR A1). You write natural, correct, simple English.' },
    {
      role: 'user',
      content: `Write ${count} original multiple-choice questions in the style of EIKEN Grade 4, Part 1 (短文の語句空所補充).
Each question is one short sentence or a short A/B dialogue with one blank written as "( )". Give 4 choices of the same part of speech; exactly one is correct.
${words?.length ? `Target words/phrases (use them as the correct answers): ${words.join(', ')}` : ''}
${grammar ? `Target grammar: ${grammar}` : ''}
Use only vocabulary appropriate for EIKEN Grade 4. Do not use the present perfect or the passive voice.
Output ONLY a JSON array like:
[{"q":"A: ... B: ... ( ) ...","c":["...","...","...","..."],"a":0,"x":"日本語の短い解説（正解の理由とポイント）","j":"問題文の日本語訳"}]
"a" is the 0-based index of the correct choice. Vary the position of the correct answer.`,
    },
  ];
}
