export const useServer = (props: { serverId: number }) => {
  const servers = [
    {
      id: 1,
      name: 'web3.0 Engineer Community',
      description: `🌐 Web3.0エンジニアコミュニティへようこそ! 👨‍💻👩‍💻

これは、Web 3.0の世界に深く潜り込む革新愛好家、開発者、ビジョナリーのためのグローバルな🌍空間です。ここでは、私たちは次のことを行います:

🔗 ブロックチェーンの最先端のソリューションと分散型技術を共有します
💡 インターネットの未来を形作る最新のアイデアとトレンドを議論します
🚀 協力、メンターシップ、知識の交換を通じてお互いを強化します
📚 新人からベテランまで、すべての人に学習リソースを提供します

分散化された未来を形成するために、私たちと一緒に参加しましょう！🎯🛠️ 一緒に、ウェブの次世代を設計しましょう。🕸️🚀`,
      coverImgURL: '/images/mockup/shubham-s-web3-jrAru7fBwA8-unsplash.jpeg',
      iconImgURL: '/images/mockup/icon.jpeg',
      tags: [
        {
          id: 1,
          name: 'web3.0',
        },
        {
          id: 2,
          name: 'blockchain',
        },
        {
          id: 3,
          name: 'ethereum',
        },
      ],
      channels: [
        {
          id: 15,
          name: '👤 自己紹介',
          description: '新メンバーが自己紹介を投稿する場。',
          imageUrl: '/images/mockup/vladislav-klapin-SymZoeE8quA-unsplash.jpeg',
          activityLevel: 5,
          conversationSummaries: [
            `議論の中心: 新メンバーの自己紹介と歓迎のメッセージ等\n`,
            `リソース共有: メンバーのスキルセット、プロジェクト、興味等\n`,
            `技術の進展: メンバーの個々の貢献と進行中の作業等\n`,
          ],
          inviteCode: '',
          category: {
            id: 12,
            name: 'GET STARTED',
          },
        },
        {
          id: 13,
          name: '📜 ルール',
          description: 'コミュニティのルールとガイドラインについて説明します。',
          imageUrl: '/images/mockup/jason-leung-HM6TMmevbZQ-unsplash.jpeg',
          activityLevel: 0,
          conversationSummaries: [
            `議論の中心: コミュニティの行動規範、利用規約等\n`,
            `リソース共有: ガイドラインの文書、参考リンク等\n`,
            `技術の進展: ルールの改訂とアップデート情報等\n`,
          ],
          inviteCode: '',
          category: {
            id: 12,
            name: 'GET STARTED',
          },
        },
        {
          id: 14,
          name: '🚀 START HERE',
          description: '新規メンバーのための始め方ガイド。',
          imageUrl: '/images/mockup/joshua-earle-s0IZZ8vgRbM-unsplash.jpeg',
          activityLevel: 0,
          conversationSummaries: [
            `議論の中心: コミュニティのナビゲーション、チャンネルの使い方等\n`,
            `リソース共有: 初心者向けのリソース、チュートリアル等\n`,
            `技術の進展: プラットフォームやツールの更新情報等\n`,
          ],
          inviteCode: '',
          category: {
            id: 12,
            name: 'GET STARTED',
          },
        },
        {
          id: 5,
          name: '💰 Decentralized Finance (DeFi)',
          description: 'DeFiの最新情報と学習リソースを共有する場。',
          imageUrl: '/images/mockup/shubham-dhage-V7OKG7WAlV0-unsplash.jpeg',
          activityLevel: 5,
          conversationSummaries: [
            `議論の中心: DeFiプロジェクトのレビューと解析\n`,
            `リソース共有: DeFi関連のコース、ブログ、プロジェクトソースコード等\n`,
            `技術の進展: クロスチェーンDeFi、自動化された市場メーカー等\n`,
          ],
          inviteCode: '',
          category: {
            id: 1,
            name: '技術',
          },
        },
        {
          id: 2,
          name: '🔒 Security',
          description:
            'web3.0エンジニアのためのセキュリティに関するディスカッションと学習。',
          imageUrl: '/images/mockup/scott-webb-yekGLpc3vro-unsplash.jpeg',
          activityLevel: 4,
          conversationSummaries: [
            `議論の中心: Smart Contractsのセキュリティ、ハッキング防止策\n`,
            `リソース共有: Solidityセキュリティガイド、EthereumセキュリティTips等\n`,
            `技術の進展: DeFiプロジェクトにおけるセキュリティ問題の解決策\n`,
          ],
          inviteCode: '',
          category: {
            id: 1,
            name: '技術',
          },
        },
        {
          id: 4,
          name: '🚀 DApps Development',
          description:
            '分散アプリケーション開発に特化したディスカッションとリソース共有の場。',
          imageUrl: '/images/mockup/marvin-meyer-SYTO3xs06fU-unsplash.jpeg',
          activityLevel: 4,
          conversationSummaries: [
            `議論の中心: DApp開発のベストプラクティスとチャレンジ\n`,
            `リソース共有: DApp開発ツール、フレームワーク、チュートリアル等\n`,
            `技術の進展: Layer-2ソリューション、分散ストレージ等\n`,
          ],
          inviteCode: '',
          category: {
            id: 1,
            name: '技術',
          },
        },
        {
          id: 6,
          name: '🎨 Non-Fungible Tokens (NFTs)',
          description: 'NFTsに関する最新情報と開発リソースを共有する場。',
          imageUrl: '/images/mockup/anniespratt-Hddo2x6e0Dg-unsplash.jpeg',
          activityLevel: 3,
          conversationSummaries: [
            `議論の中心: NFTプロジェクトのレビューとトレンド\n`,
            `リソース共有: NFT作成とマーケットプレイスのチュートリアル、リソース等\n`,
            `技術の進展: NFTのスケーラビリティ、新たなユースケース等\n`,
          ],
          inviteCode: '',
          category: {
            id: 1,
            name: '技術',
          },
        },
        {
          id: 12,
          name: '🔧 技術質問',
          description:
            'web3.0開発に関する技術的な質問や困りごとを共有し、解決策を見つけましょう。',
          imageUrl: '/images/mockup/emily-morter-8xAA0f9yQnE-unsplash.jpeg',
          activityLevel: 1,
          conversationSummaries: [
            'Smart Contractの最適なテスト方法についての議論',
            'EthereumとPolkadotの比較に関する情報共有',
            'Web3.0関連のAPIとライブラリの使用についての質問と答え',
          ],
          inviteCode: '',
          category: {
            id: 1,
            name: '技術',
          },
        },
        {
          id: 10,
          name: '📈 Crypto Economics',
          description:
            '暗号資産の経済学とトークンエコノミーについて議論する場。',
          imageUrl: '/images/mockup/dylan-calluy-PQXMUyOYarU-unsplash.jpeg',
          activityLevel: 4,
          conversationSummaries: [
            `議論の中心: トークンエコノミーの設計と分析、暗号資産の価格動向等\n`,
            `リソース共有: トークンエコノミクスに関するコース、ブログ、レポート等\n`,
            `技術の進展: DeFiの経済モデル、NFTの価格決定メカニズム等\n`,
          ],
          inviteCode: '',
          category: {
            id: 2,
            name: 'ビジネス・業界',
          },
        },
        {
          id: 8,
          name: '⚖️ Regulations and Legal',
          description:
            '暗号資産とブロックチェーンに関する法規制と法律について議論する場。',
          imageUrl:
            '/images/mockup/tingey-injury-law-firm-nCJ5kiPzBH4-unsplash.jpeg',
          activityLevel: 3,
          conversationSummaries: [
            `議論の中心: 暗号規制の最新情報、法律的な問題と解決策\n`,
            `リソース共有: 暗号資産関連の法律ガイド、レポート等\n`,
            `技術の進展: ブロックチェーンの法規制、KYC/AMLプロセス等\n`,
          ],
          inviteCode: '',
          category: {
            id: 2,
            name: 'ビジネス・業界',
          },
        },
        {
          id: 14,
          name: '🚀 プロジェクトショーケース',
          description:
            'メンバーが最近取り組んでいるプロジェクトや成果を紹介する場です。',
          imageUrl: '/images/mockup/marvin-meyer-SYTO3xs06fU-unsplash.jpeg',
          activityLevel: 3,
          conversationSummaries: [
            '新しいDecentralized Application (DApp)のデモとフィードバック',
            '最近のWeb3.0関連のハッカソンの結果と経験の共有',
            '個々のコードと設計のレビューと改善提案',
          ],
          inviteCode: '',
          category: {
            id: 2,
            name: 'ビジネス・業界',
          },
        },
        {
          id: 13,
          name: '💼 ジョブ・オポチュニティ',
          description: 'web3.0業界での求人情報や仕事の機会を共有する場所です。',
          imageUrl:
            '/images/mockup/cytonn-photography-n95VMLxqM2I-unsplash.jpeg',
          activityLevel: 2,
          conversationSummaries: [
            '新たなBlockchainスタートアップからの求人情報の共有',
            'Web3.0エンジニアリングのフリーランスプロジェクトについての情報交換',
            'キャリアアドバイスとインタビュー準備についての質問と答え',
          ],
          inviteCode: '',
          category: {
            id: 2,
            name: 'ビジネス・業界',
          },
        },
        {
          id: 10,
          name: '🌐 Global Networking',
          description: '世界中のWeb3.0エンジニアとつながる場。',
          imageUrl: '/images/mockup/akson-1K8pIbIrhkQ-unsplash.jpeg',
          activityLevel: 5,
          conversationSummaries: [
            `議論の中心: 国際的なプロジェクト、コラボレーションの機会等\n`,
            `リソース共有: グローバルなネットワーキングイベント、会議、ワークショップ等\n`,
            `技術の進展: ブロックチェーンのグローバルな普及と影響等\n`,
          ],
          inviteCode: '',
          category: {
            id: 4,
            name: 'コミュニケーション',
          },
        },
        {
          id: 12,
          name: '🤝 Job Opportunities',
          description: 'Web3.0エンジニアのための仕事の機会を共有する場。',
          imageUrl:
            '/images/mockup/cytonn-photography-n95VMLxqM2I-unsplash.jpeg',
          activityLevel: 4,
          conversationSummaries: [
            `議論の中心: ジョブオープニング、インターンシップの機会等\n`,
            `リソース共有: 履歴書のヒント、インタビューのアドバイス、採用情報等\n`,
            `技術の進展: ブロックチェーンとWeb3.0の分野で求められるスキル等\n`,
          ],
          inviteCode: '',
          category: {
            id: 4,
            name: 'コミュニケーション',
          },
        },
        {
          id: 11,
          name: '🎙️ Public Speaking & Presentations',
          description: 'プレゼンテーションと公開スピーチスキルを向上させる場。',
          imageUrl: '/images/mockup/joel-muniz-D6bos5R_ckc-unsplash.jpeg',
          activityLevel: 3,
          conversationSummaries: [
            `議論の中心: 効果的なプレゼンテーションの方法、スピーチの練習等\n`,
            `リソース共有: プレゼンテーションのチュートリアル、リソース、テンプレート等\n`,
            `技術の進展: Web3.0テクノロジーを説明するための効果的なストーリーテリング等\n`,
          ],
          inviteCode: '',
          category: {
            id: 4,
            name: 'コミュニケーション',
          },
        },
        {
          id: 11,
          name: '📚 勉強会',
          description: 'web3.0エンジニアのための勉強会です。',
          imageUrl:
            '/images/mockup/priscilla-du-preez-XkKCui44iM0-unsplash.jpeg',
          activityLevel: 3,
          conversationSummaries: [
            `議論の中心: Proof Of Stake Blockchain実装とゼロ知識証明学習の優先順位\n`,
            `リソース共有: 学習リソースとしてのUdemyコース、Zero-Knowledge University、GitHubリポジトリ等\n`,
            `技術の進展: wagmiからviemへの移行、ゼロ知識証明の実用例等についての情報交換\n`,
          ],
          inviteCode: '',
          category: {
            id: 4,
            name: 'コミュニケーション',
          },
        },
      ],
      members: [
        {
          id: 1,
          displayName: 'Alex',
          userName: 'Alex#1234',
          imgURL: '/images/mockup/art-hauntington-jzY0KRJopEI-unsplash.jpeg',
          activityLevel: 4,
          joinedAtServer: '2022-03-14',
          roles: ['moderator'],
          description:
            '東京で働いているデータサイエンティストです。よろしくお願いします。',
          isBot: false,
        },
        {
          id: 2,
          displayName: 'Jessica',
          userName: 'Jessica#4567',
          imgURL:
            '/images/mockup/christian-velitchkov-mXz64B8-3h0-unsplash.jpeg',
          activityLevel: 5,
          joinedAtServer: '2021-05-22',
          roles: ['admin', 'moderator'],
          description: '大阪で働いているデザイナーです。よろしくお願いします。',
          isBot: false,
        },
        {
          id: 3,
          displayName: 'Brian',
          userName: 'Brian#7890',
          imgURL:
            '/images/mockup/christopher-campbell-rDEOVtE7vOs-unsplash.jpeg',
          activityLevel: 2,
          joinedAtServer: '2022-07-18',
          roles: ['crew'],
          description:
            '名古屋で働いているマーケティングマネージャーです。よろしくお願いします。',
          isBot: false,
        },
        {
          id: 4,
          displayName: 'Sophia',
          userName: 'Sophia#5678',
          imgURL: '/images/mockup/samsung-memory-DI2SR-IxkCg-unsplash.jpeg',
          activityLevel: 3,
          joinedAtServer: '2023-01-25',
          roles: ['crew'],
          description:
            '福岡で働いているビジネスアナリストです。よろしくお願いします。',
          isBot: false,
        },
        {
          id: 5,
          displayName: 'Robert',
          userName: 'Robert#9012',
          imgURL: '/images/mockup/dominic-blignaut-jal0GatJsGk-unsplash.jpeg',
          activityLevel: 5,
          joinedAtServer: '2021-11-30',
          roles: ['moderator'],
          description:
            '札幌で働いているフロントエンドエンジニアです。よろしくお願いします。',
          isBot: false,
        },
        {
          id: 6,
          displayName: 'Amelia',
          userName: 'Amelia#3456',
          imgURL: '/images/mockup/houcine-ncib-B4TjXnI0Y2c-unsplash.jpeg',
          activityLevel: 1,
          joinedAtServer: '2022-08-15',
          roles: ['crew'],
          description:
            '京都で働いているプロダクトマネージャーです。よろしくお願いします。',
          isBot: false,
        },
        {
          id: 7,
          displayName: 'Edward',
          userName: 'Edward#7891',
          imgURL:
            '/images/mockup/imansyah-muhamad-putera-n4KewLKFOZw-unsplash.jpeg',
          activityLevel: 2,
          joinedAtServer: '2023-02-28',
          roles: ['admin'],
          description:
            '神戸で働いているデータエンジニアです。よろしくお願いします。',
          isBot: false,
        },
        {
          id: 8,
          displayName: 'Grace',
          userName: 'Grace#1235',
          imgURL: '/images/mockup/jeffery-erhunse-Z9lbmEjyYjU-unsplash.jpeg',
          activityLevel: 4,
          joinedAtServer: '2022-06-17',
          roles: ['crew'],
          description:
            '広島で働いているQAエンジニアです。よろしくお願いします。',
          isBot: false,
        },
        {
          id: 9,
          displayName: 'Liam',
          userName: 'Liam#4568',
          imgURL: '/images/mockup/lachlan-dempsey-6VPEOdpFNAs-unsplash.jpeg',
          activityLevel: 5,
          joinedAtServer: '2021-12-24',
          roles: ['moderator'],
          description:
            '熊本で働いているバックエンドエンジニアです。よろしくお願いします。',
          isBot: false,
        },
        {
          id: 10,
          displayName: 'Olivia',
          userName: 'Olivia#7892',
          imgURL: '/images/mockup/svetlana-pochatun-DgCaEOnfBdo-unsplash.jpeg',
          activityLevel: 3,
          joinedAtServer: '2023-05-01',
          roles: ['admin', 'crew'],
          description:
            '仙台で働いているUXデザイナーです。よろしくお願いします。',
          isBot: false,
        },
      ],
    },

    {
      id: 2,
      name: 'web3.0 Engineer Community',
      description:
        "Welcome to the Web3.0 Engineer Community! 👨‍💻👩‍💻\n\nThis is a global 🌍 space for innovation enthusiasts, developers, and visionaries diving deep into the world of Web 3.0. Here, we:\n\n🔗 Share cutting-edge blockchain solutions and decentralized technologies\n💡 Discuss the latest ideas and trends shaping the future of the internet\n🚀 Strengthen each other through collaboration, mentorship, and knowledge exchange\n📚 Provide learning resources for everyone, from newcomers to veterans\n\nJoin us to shape the decentralized future! 🎯🛠️ Together, let's design the next generation of the web. 🕸️🚀",
      coverImgURL: '/images/mockup/shubham-s-web3-jrAru7fBwA8-unsplash.jpeg',
      iconImgURL: '/images/mockup/icon.jpeg',
      tags: [
        {
          id: 1,
          name: 'web3.0',
        },
        {
          id: 2,
          name: 'blockchain',
        },
        {
          id: 3,
          name: 'ethereum',
        },
      ],
      channels: [
        {
          id: 15,
          name: '👤 Self-Introductions',
          description: 'A place for new members to introduce themselves.',
          imageUrl: '/images/mockup/vladislav-klapin-SymZoeE8quA-unsplash.jpeg',
          activityLevel: 5,
          conversationSummaries: [
            'Central discussions: Introductions and welcome messages for new members\n',
            'Resource sharing: Member skills, projects, interests, etc.\n',
            'Technical progress: Individual contributions and ongoing work of members\n',
          ],
          inviteCode: '',
          category: {
            id: 12,
            name: 'GET STARTED',
          },
        },
        {
          id: 13,
          name: '📜 Rules',
          description: 'Explains the community rules and guidelines.',
          imageUrl: '/images/mockup/jason-leung-HM6TMmevbZQ-unsplash.jpeg',
          activityLevel: 0,
          conversationSummaries: [
            'Central discussions: Community code of conduct, terms of service, etc.\n',
            'Resource sharing: Documented guidelines, reference links, etc.\n',
            'Technical progress: Rule revisions and update information, etc.\n',
          ],
          inviteCode: '',
          category: {
            id: 12,
            name: 'GET STARTED',
          },
        },
        {
          id: 14,
          name: '🚀 START HERE',
          description: 'A guide for new members to get started.',
          imageUrl: '/images/mockup/joshua-earle-s0IZZ8vgRbM-unsplash.jpeg',
          activityLevel: 0,
          conversationSummaries: [
            'Central discussions: Community navigation, channel usage, etc.\n',
            'Resource sharing: Beginner-friendly resources, tutorials, etc.\n',
            'Technical progress: Platform and tool updates, etc.\n',
          ],
          inviteCode: '',
          category: {
            id: 12,
            name: 'GET STARTED',
          },
        },
        {
          id: 5,
          name: '💰 Decentralized Finance (DeFi)',
          description:
            'A place to share the latest information and learning resources about DeFi.',
          imageUrl: '/images/mockup/shubham-dhage-V7OKG7WAlV0-unsplash.jpeg',
          activityLevel: 5,
          conversationSummaries: [
            'Central discussions: Reviews and analysis of DeFi projects\n',
            'Resource sharing: DeFi-related courses, blogs, project source code, etc.\n',
            'Technical progress: Cross-chain DeFi, automated market makers, etc.\n',
          ],
          inviteCode: '',
          category: {
            id: 1,
            name: 'Technology',
          },
        },
        {
          id: 2,
          name: '🔒 Security',
          description:
            'Discussions and learning about security for web3.0 engineers.',
          imageUrl: '/images/mockup/scott-webb-yekGLpc3vro-unsplash.jpeg',
          activityLevel: 4,
          conversationSummaries: [
            'Central discussions: Smart contract security, hacking prevention measures\n',
            'Resource sharing: Solidity security guides, Ethereum security tips, etc.\n',
            'Technical progress: Security solutions for DeFi projects, etc.\n',
          ],
          inviteCode: '',
          category: {
            id: 1,
            name: 'Technology',
          },
        },
        {
          id: 4,
          name: '🚀 DApps Development',
          description:
            'A space for discussions and resource sharing focused on decentralized application development.',
          imageUrl: '/images/mockup/marvin-meyer-SYTO3xs06fU-unsplash.jpeg',
          activityLevel: 4,
          conversationSummaries: [
            'Central discussions: Best practices and challenges in DApp development\n',
            'Resource sharing: DApp development tools, frameworks, tutorials, etc.\n',
            'Technical progress: Layer-2 solutions, decentralized storage, etc.\n',
          ],
          inviteCode: '',
          category: {
            id: 1,
            name: 'Technology',
          },
        },
        {
          id: 6,
          name: '🎨 Non-Fungible Tokens (NFTs)',
          description:
            'A place to share the latest information and development resources about NFTs.',
          imageUrl: '/images/mockup/anniespratt-Hddo2x6e0Dg-unsplash.jpeg',
          activityLevel: 3,
          conversationSummaries: [
            'Central discussions: Reviews and trends of NFT projects\n',
            'Resource sharing: Tutorials and resources for NFT creation and marketplaces, etc.\n',
            'Technical progress: NFT scalability, new use cases, etc.\n',
          ],
          inviteCode: '',
          category: {
            id: 1,
            name: 'Technology',
          },
        },
        {
          id: 12,
          name: '🔧 Technical Questions',
          description:
            'Share technical questions and challenges related to web3.0 development and find solutions.',
          imageUrl: '/images/mockup/emily-morter-8xAA0f9yQnE-unsplash.jpeg',
          activityLevel: 1,
          conversationSummaries: [
            'Discussion on optimal testing methods for Smart Contracts\n',
            'Information sharing on Ethereum and Polkadot comparison\n',
            'Questions and answers about using web3.0-related APIs and libraries\n',
          ],
          inviteCode: '',
          category: {
            id: 1,
            name: 'Technology',
          },
        },
        {
          id: 10,
          name: '📈 Crypto Economics',
          description:
            'Discussions about the economics of cryptocurrencies and token economies.',
          imageUrl: '/images/mockup/dylan-calluy-PQXMUyOYarU-unsplash.jpeg',
          activityLevel: 4,
          conversationSummaries: [
            'Central discussions: Design and analysis of token economies, cryptocurrency price trends, etc.\n',
            'Resource sharing: Courses, blogs, reports on token economics, etc.\n',
            'Technical progress: Economic models of DeFi, pricing mechanisms of NFTs, etc.\n',
          ],
          inviteCode: '',
          category: {
            id: 2,
            name: 'Business & Industry',
          },
        },
        {
          id: 8,
          name: '⚖️ Regulations and Legal',
          description:
            'Discussions about regulations and legal aspects related to cryptocurrencies and blockchain.',
          imageUrl:
            '/images/mockup/tingey-injury-law-firm-nCJ5kiPzBH4-unsplash.jpeg',
          activityLevel: 3,
          conversationSummaries: [
            'Central discussions: Latest information on crypto regulations, legal issues and solutions\n',
            'Resource sharing: Legal guides, reports related to cryptocurrencies, etc.\n',
            'Technical progress: Blockchain regulations, KYC/AML processes, etc.\n',
          ],
          inviteCode: '',
          category: {
            id: 2,
            name: 'Business & Industry',
          },
        },
        {
          id: 14,
          name: '🚀 Project Showcase',
          description:
            'A place to showcase projects and achievements recently worked on by members.',
          imageUrl: '/images/mockup/marvin-meyer-SYTO3xs06fU-unsplash.jpeg',
          activityLevel: 3,
          conversationSummaries: [
            'Demo and feedback on new Decentralized Applications (DApps)\n',
            'Sharing results and experiences from recent Web3.0-related hackathons\n',
            'Code and design reviews and improvement suggestions\n',
          ],
          inviteCode: '',
          category: {
            id: 2,
            name: 'Business & Industry',
          },
        },
        {
          id: 13,
          name: '💼 Job Opportunities',
          description:
            'A place to share job postings and work opportunities in the web3.0 industry.',
          imageUrl:
            '/images/mockup/cytonn-photography-n95VMLxqM2I-unsplash.jpeg',
          activityLevel: 2,
          conversationSummaries: [
            'Sharing job openings and internship opportunities from new blockchain startups\n',
            'Information exchange about freelancing projects in Web3.0 engineering\n',
            'Questions and answers about career advice and interview preparation\n',
          ],
          inviteCode: '',
          category: {
            id: 2,
            name: 'Business & Industry',
          },
        },
        {
          id: 10,
          name: '🌐 Global Networking',
          description:
            'A place to connect with Web3.0 engineers from around the world.',
          imageUrl: '/images/mockup/akson-1K8pIbIrhkQ-unsplash.jpeg',
          activityLevel: 2,
          conversationSummaries: [
            'Central discussions: Finding collaborators and partners for Web3.0 projects\n',
            'Resource sharing: Events, conferences, and webinars related to the Web3.0 industry\n',
            'Technical progress: Cross-country projects, collaborations, and opportunities\n',
          ],
          inviteCode: '',
          category: {
            id: 3,
            name: 'Community',
          },
        },
        {
          id: 15,
          name: '👥 General Chat',
          description:
            'A place for casual conversations and non-technical discussions.',
          imageUrl: '/images/mockup/marvin-meyer-SYTO3xs06fU-unsplash.jpeg',
          activityLevel: 1,
          conversationSummaries: [
            'Central discussions: General updates, news, and announcements\n',
            'Resource sharing: Non-technical books, podcasts, movies, etc.\n',
            'Technical progress: Sharing personal achievements and goals\n',
          ],
          inviteCode: '',
          category: {
            id: 3,
            name: 'Community',
          },
        },
        {
          id: 12,
          name: '🤝 Collaboration Opportunities',
          description:
            'A space to find collaborators for web3.0 projects and discuss partnership opportunities.',
          imageUrl: '/images/mockup/david-marcu-2l3vELgKYlQ-unsplash.jpeg',
          activityLevel: 1,
          conversationSummaries: [
            'Discussion on finding partners for blockchain projects\n',
            'Information sharing about startup incubation and acceleration programs\n',
            'Questions and answers about funding opportunities for Web3.0 startups\n',
          ],
          inviteCode: '',
          category: {
            id: 3,
            name: 'Community',
          },
        },
      ],
      members: [
        {
          id: 1,
          displayName: 'Alex',
          userName: 'Alex#1234',
          imgURL: '/images/mockup/art-hauntington-jzY0KRJopEI-unsplash.jpeg',
          activityLevel: 4,
          joinedAtServer: '2022-03-14',
          roles: ['moderator'],
          description:
            'I am a data scientist working in Tokyo. Nice to meet you.',
          isBot: false,
        },
        {
          id: 2,
          displayName: 'Jessica',
          userName: 'Jessica#4567',
          imgURL:
            '/images/mockup/christian-velitchkov-mXz64B8-3h0-unsplash.jpeg',
          activityLevel: 5,
          joinedAtServer: '2021-05-22',
          roles: ['admin', 'moderator'],
          description: 'I am a designer working in Osaka. Nice to meet you.',
          isBot: false,
        },
        {
          id: 3,
          displayName: 'Brian',
          userName: 'Brian#7890',
          imgURL:
            '/images/mockup/christopher-campbell-rDEOVtE7vOs-unsplash.jpeg',
          activityLevel: 2,
          joinedAtServer: '2022-07-18',
          roles: ['crew'],
          description:
            'I am a marketing manager working in Nagoya. Nice to meet you.',
          isBot: false,
        },
        {
          id: 4,
          displayName: 'Sophia',
          userName: 'Sophia#5678',
          imgURL: '/images/mockup/samsung-memory-DI2SR-IxkCg-unsplash.jpeg',
          activityLevel: 3,
          joinedAtServer: '2023-01-25',
          roles: ['crew'],
          description:
            'I am a business analyst working in Fukuoka. Nice to meet you.',
          isBot: false,
        },
        {
          id: 5,
          displayName: 'Robert',
          userName: 'Robert#9012',
          imgURL: '/images/mockup/dominic-blignaut-jal0GatJsGk-unsplash.jpeg',
          activityLevel: 5,
          joinedAtServer: '2021-11-30',
          roles: ['moderator'],
          description:
            'I am a frontend engineer working in Sapporo. Nice to meet you.',
          isBot: false,
        },
        {
          id: 6,
          displayName: 'Amelia',
          userName: 'Amelia#3456',
          imgURL: '/images/mockup/houcine-ncib-B4TjXnI0Y2c-unsplash.jpeg',
          activityLevel: 1,
          joinedAtServer: '2022-08-15',
          roles: ['crew'],
          description:
            'I am a product manager working in Kyoto. Nice to meet you.',
          isBot: false,
        },
        {
          id: 7,
          displayName: 'Edward',
          userName: 'Edward#7891',
          imgURL:
            '/images/mockup/imansyah-muhamad-putera-n4KewLKFOZw-unsplash.jpeg',
          activityLevel: 2,
          joinedAtServer: '2023-02-28',
          roles: ['admin'],
          description:
            'I am a data engineer working in Kobe. Nice to meet you.',
          isBot: false,
        },
        {
          id: 8,
          displayName: 'Grace',
          userName: 'Grace#1235',
          imgURL: '/images/mockup/jeffery-erhunse-Z9lbmEjyYjU-unsplash.jpeg',
          activityLevel: 4,
          joinedAtServer: '2022-06-17',
          roles: ['crew'],
          description:
            'I am a QA engineer working in Hiroshima. Nice to meet you.',
          isBot: false,
        },
        {
          id: 9,
          displayName: 'Liam',
          userName: 'Liam#4568',
          imgURL: '/images/mockup/lachlan-dempsey-6VPEOdpFNAs-unsplash.jpeg',
          activityLevel: 5,
          joinedAtServer: '2021-12-24',
          roles: ['moderator'],
          description:
            'I am a backend engineer working in Kumamoto. Nice to meet you.',
          isBot: false,
        },
        {
          id: 10,
          displayName: 'Olivia',
          userName: 'Olivia#7892',
          imgURL: '/images/mockup/svetlana-pochatun-DgCaEOnfBdo-unsplash.jpeg',
          activityLevel: 3,
          joinedAtServer: '2023-05-01',
          roles: ['admin', 'crew'],
          description:
            'I am a UX designer working in Sendai. Nice to meet you.',
          isBot: false,
        },
      ],
    },
  ];

  const server = servers.find((server) => server.id === Number(props.serverId));
  return server;
};
