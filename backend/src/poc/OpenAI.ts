import { createCompletion } from '@/lib/openAI';

async function summarizeArticle(prompt: string) {
  // Check that the article isn't longer than the API's character limit
  if (prompt.length > 2048) {
    throw new Error('Article exceeds character limit for API.');
  }

  const result = await createCompletion({
    prompt,
    maxTokens: 512,
  });

  return result;
}

const prompt = `Create messages to be shared on social networking sites.
-Use below Channel Data.
-Only in Japanese.
-Response within 100 characters or less.
-Use some emojis for easy viewing.

Channel data:
[{\"name\":\"一般\",\"summaries\":[\" 最近暗号通貨に興味が出てきた人が、おすすめの通貨を尋ねる\",\" ビットコインとイーサリアムが一般的によく知られていると回答\",\" ビットコインはデジタルゴールド、イーサリアムはスマートコントラクトのプラットフォームと説明\",\" 信頼性のある取引所を選び、アカウントを作成することから始めることをアドバイス\",\" 良いアドバイスを受けた人が勉強することを決め、感謝を伝える\",\" 質問があればいつでも聞けると回答\"]},{\"name\":\"ブロックチェーン基本理論\",\"summaries\":[\" \\\"ブロックチェーンの分散型ネットワークの利用方法について質問があります\\\"\",\" \\\"ビットコインでは、取引記録を共有し改ざんを防止しています\\\"\"]},{\"name\":\"ビットコイントーク\",\"summaries\":[\" ビットコイン価格の予測は難しい\",\" 経済状況や政策、マーケットセンチメントに影響を受ける\",\" ビットコイン投資は高リスク・高リターン\"]},{\"name\":\"イーサリアムとスマートコントラクト\",\"summaries\":[\" スマートコントラクトの良い例はDeFi（分散型金融）とNFT（非代替性トークン）の自動化可能性。\",\" 貸借や取引を自動化し、スマートコントラクトを活用している。\"]},{\"name\":\"アルトコイン情報交換\",\"summaries\":[\"カルダノ（ADA）が注目されている。\",\"投資はリスクを理解して行わなければならない。\",\"新しいプロジェクトも出てきているので、情報収集が重要。\"]},{\"name\":\"暗号資産税法\",\"summaries\":[\"暗号資産の利益は所得税の一部として課税されます\",\"資産の買い売りだけでなく、マイニングなども税務上の影響を受ける可能性がある\",\"詳細は専門家に相談するべき\"]},{\"name\":\"solidity\",\"summaries\":[\"アップグレーダブルなコントラクトの実装についてのサンプルコードが共有されました。\",\"サンプルコードの一部はChatGPTによって書かれました。\",\"GPT-4はGPT-3.5よりも指示が少なくても問題なく作業できました。\",\"コントラクトのstorage slotを参照できるサイトが紹介されました。\"]},{\"name\":\"frontend\",\"summaries\":[\" HTMLの規格自体はシンプルで使いやすいが、ライブラリの多様化や抽象化についていけない感じがする。\",\" エコシステムの技術負債が20年超に重なり、AIに丸投げすればフロントエンドエンジニアリングは無くなるのではと思える。\",\" OpenAIのAPIを使いストリーミングでデータ取得しているが、文字のフラグメンテーションが起こる現象について知見が欲しい。\",\" Reactではないが、OpenAIとストリーミングを試しているが、フラグメンテーションの原因はconst chunkValue = decoder.decode(value)かもしれない。\",\" decoder.decode(value, {stream, true})を試してみると良いかもしれない。\",\" Svelteはシンプルで必要なものだけがあり、好きな感じだが、仕様が小さくて語るネタが少ない。\"]},{\"name\":\"rules\",\"summaries\":[\"行動規範を読んで理解してください。\",\"敬意を持って接してください。\",\"スパムや自己宣伝は禁止。\",\"攻撃的なコンテンツや詐欺に注意。\",\"管理者に問題を報告してください。\",\"読んだ方は✅を押し、他のチャンネルにアクセスできます。\"]},{\"name\":\"announcement\",\"summaries\":[\"UniswapV3の勉強会が開催される。\",\"Bootcamp開催のお知らせがあり、進捗2Earnのプロダクトも持ち込み可能。\",\"アイディアから事業化に導くブートキャンプ。\",\"Web3の事業領域に挑む勉強会。\",\"Skyland Venturesがサポートや投資を行う。\",\"L2 ZK-EVM Type 1 TaikoやSuperfluidとのパートナーシップが決定。\",\"イベントページと詳細資料のリンクあり。\"]}]

Message:
`;
summarizeArticle(prompt).then((summary) => {
  console.log(summary);
});
