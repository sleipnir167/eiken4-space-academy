# AI 中継サーバー（Cloudflare Worker）

アプリの「アプリ内蔵AI」は、Cloudflare Worker を通して Modellix の無料 LLM（`modellix-ai/free-llm`）を呼びます。

## ふだんの設定：英検3級アプリの中継を共用（追加作業なし）

`js/config.js` の `BUILTIN_AI.baseUrl` は、英検3級アプリ用にすでに公開している
`https://eiken3-ai.sleipnir167.workers.dev/v1` を指しています。

- 中継サーバーが受け付けるのは「サイト（オリジン）」単位です。4級アプリも `https://sleipnir167.github.io/…` で公開すれば
  オリジンは3級と同じ `https://sleipnir167.github.io` なので、**そのまま使えます**
- 手元（`http://localhost:8767`）で AI を試したいときだけ、3級の `proxy/wrangler.toml` の `ALLOWED_ORIGINS` に
  `http://localhost:8767` を足して `npx wrangler@latest deploy` してください（足さない場合、手元では「サーバーに接続できません」と表示されます）

## 4級専用の中継にしたいとき（任意）

利用回数の制限（IP ごとに1分12回）を3級と分けたいときは、このフォルダを別の Worker として公開します。

```bash
cd proxy
npx wrangler@latest login
npx wrangler@latest deploy
npx wrangler@latest secret put MODELLIX_API_KEY --name eiken4-ai
```

表示された URL の末尾に `/v1` をつけて、`js/config.js` の `baseUrl` に書きます。

- **API キーは Cloudflare の Secret にだけ保存**し、アプリのコードや GitHub には入れません
- 許可したサイト（`ALLOWED_ORIGINS`）からの呼び出しだけを受け付け、モデルと出力トークン数を固定しています
- 設定の意味は `wrangler.toml` のコメントを参照してください
