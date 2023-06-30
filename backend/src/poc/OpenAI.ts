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

const prompt = `Create description of Discord server using following channel data. 
-Describe only in Japanese.
-Be sure to write within 300 characters or less.
-Include purpose of the server and characteristics of participants.
-Never describe individual channels.
-Use some emojis for easy viewing.

Channel data:\n[{\"name\":\"一般\",\"summaries\":[\" 暗号通貨に興味を持ち、おすすめを聞く\",\" ビットコインやイーサリアムが一般的\",\" ビットコインはデジタルゴールド、イーサリアムはスマートコントラクト\",\" 取引所選び、アカウント作成から始めることを勧める\",\" 勉強して質問があれば聞くこと\"]},{\"name\":\"ブロックチェーン基本理論\",\"summaries\":[\"ブロックチェーンは分散型ネットワークで、ビットコインでは取引記録を共有し改ざんを防ぐために利用される。\",\"取引での利用方法についての詳細は言及されていない。\"]},{\"name\":\"ビットコイントーク\",\"summaries\":[\" ビットコイン価格の予測は難しいと話し合われました。\",\" 経済状況や政策、マーケットセンチメントが価格に大きく影響すると言われました。\",\" ビットコイン投資は高リスク・高リターンだと合意されました。\"]},{\"name\":\"イーサリアムとスマートコントラクト\",\"summaries\":[\"スマートコントラクトの良い例は、DeFiとNFTの自動化による貸借や取引が挙げられる。\"]},{\"name\":\"アルトコイン情報交換\",\"summaries\":[\" ADA（Cardano）が注目されている\",\" 投資はリスクを理解して行うべき\",\" 新たなプロジェクトの情報収集が大切\"]},{\"name\":\"暗号資産税法\",\"summaries\":[\"暗号資産の利益は所得税の一部として課税される。\",\"詳細は専門家に相談するべき。\",\"資産の買い売りだけでなく、マイニングも税務上の影響を受ける。\"]},{\"name\":\"solidity\",\"summaries\":[\" アップグレーダブルなコントラクトの実装に関するサンプルコードをGithubで共有する\",\" アップグレーダブルに関する記事は参考になる\",\" サンプルコードは一部ChatGPTが書いた\",\" GPT-4では指示が少なくてもうまくいく\",\" コントラクトのstorage slotを参照できるサイトがある\"]},{\"name\":\"frontend\",\"summaries\":[\" HTMLの規格はシンプルだが、ライブラリの多様化や抽象化についていけないと感じる\",\" AIの進化でフロントエンドエンジニアリングがなくなるかもしれないと思える\",\" OpenAIのストリーミングで文字が前後してしまう現象に対しての解決方法が知りたい\",\" Streamingの実装で困っていたが、解決方法が見つかり助かった\",\" Svelteはシンプルで便利なフレームワークだが、語るネタが少ないとも思える\"]},{\"name\":\"rules\",\"summaries\":[\" 行動規範をよく読み、内容を理解する。\",\" 敬意を持って接する。\",\" スパムや自己宣伝はしない。\",\" NSFWや攻撃的なコンテンツは禁止。\",\" 管理者に違反や危険を報告する。\",\" 詐欺には気をつける。\",\" 上記を理解したら✅を押して承認を得る。\"]},{\"name\":\"announcement\",\"summaries\":[\" UniswapV3の勉強会が開催される。\",\" Skyland VenturesのBootcamp開催のお知らせ。\",\" ブートキャンプでアイディアから事業化をサポート。\",\" CryptoBaseの使用OK。\",\" テックメンターに相談できる。\",\" PITCH DAYでプレゼン。\",\" SVが優秀な事業に投資。\",\" L2 ZK-EVM Type 1 TaikoとSuperfluidのパートナーシップ。\",\" スケジュールは7/8のキックオフと7/29のPITCH DAY。\",\" 進捗2Earnのプロダクトも持ち込み可能。\"]}]

Description:

`;
summarizeArticle(prompt).then((summary) => {
  console.log(summary);
});
