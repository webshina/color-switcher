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
            `新入メンバー、ブロックチェーン専門家自己紹介。\n`,
            `キャリアと共にパーソナルプロジェクト共有。\n`,
            `語学好きで、5ヶ国語を話せると語った。\n`,
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
            `コミュニティのルールと行動規範を議論。\n`,
            `不適切な行動に対する制裁措置を説明。\n`,
            `新メンバーへの入門ガイドを提供。\n`,
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
            `新規メンバーへの歓迎と基本的なガイドライン。\n`,
            `登録やログインに関する質問が答えられた。\n`,
            `サーバー機能と規則についての詳細な説明。\n`,
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
            `DeFiの新技術について議論が行われた。\n`,
            `スマートコントラクトの利用例について学んだ。\n`,
            `流動性マイニングについて詳しく説明された。\n`,
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
            `ウェブ3.0セキュリティ課題について議論。\n`,
            `新たな暗号化技術の活用方法を学んだ。\n`,
            `ディフィのセキュリティ対策について質問した。\n`,
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
            `スマートコントラクトの最新技術を議論。\n`,
            `Ethereumと他のブロックチェーンの比較。\n`,
            `ディフィプロジェクトのセキュリティ課題を解決。\n`,
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
            `NFTの新作品発表、フィードバック多数。\n`,
            `デジタルアートの価値について議論した。\n`,
            `NFT市場の最新動向を共有した。\n`,
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
            `Web3.0の開発における問題と解決策を議論。\n`,
            `Smart Contractの設定方法を尋ねた。\n`,
            `dApp開発でのデータ保管とプライバシーについて学んだ。\n`,
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
            `トークンエコノミーの進化について議論した。\n`,
            `暗号通貨の価値を理解するための指標提案。\n`,
            `デフィのセキュリティ問題、それぞれの見解を共有。\n`,
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
            `法規制と暗号資産の関係を議論した。\n`,
            `ブロックチェーンの法的問題点について論じた。\n`,
            `各国の暗号資産法律を比較検討した。\n`,
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
            `AI技術を用いた新アプリ開発成功。\n`,
            `ゲームデザインの進捗状況を報告。\n`,
            `ロボット工学の最新研究結果を共有。\n`,
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
            `Web3.0技術についての詳細な議論が進行中。\n`,
            `データプライバシーとブロックチェーンの相互作用について。\n`,
            `エンジニア間での最新DApp開発戦略の共有。\n`,
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
            `プレゼンテーション技巧の意義について語った。\n`,
            `公開スピーチの克服法を共有した。\n`,
            `実践的なプレゼンテーションヒントを提供。\n`,
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
            `Web3.0の基本概念を共有しました。\n`,
            `エンジニアとしてのスキルアップ方法を討論。\n`,
            `具体的なプロジェクトでのWeb3.0の活用事例を紹介。\n`,
          ],
          inviteCode: '',
          category: {
            id: 4,
            name: 'コミュニケーション',
          },
        },
      ],
      managementMembers: [
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
          socialMedias: [
            {
              id: 1,
              name: 'Twitter',
              url: 'https://twitter.com/',
            },
          ],
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
          socialMedias: [
            {
              id: 1,
              name: 'Twitter',
              url: 'https://twitter.com/',
            },
          ],
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
          socialMedias: [
            {
              id: 1,
              name: 'Twitter',
              url: 'https://twitter.com/',
            },
          ],
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
          socialMedias: [
            {
              id: 1,
              name: 'Twitter',
              url: 'https://twitter.com/',
            },
          ],
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
          socialMedias: [
            {
              id: 1,
              name: 'Twitter',
              url: 'https://twitter.com/',
            },
          ],
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
          socialMedias: [
            {
              id: 1,
              name: 'Twitter',
              url: 'https://twitter.com/',
            },
          ],
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
          socialMedias: [
            {
              id: 1,
              name: 'Twitter',
              url: 'https://twitter.com/',
            },
          ],
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
          socialMedias: [
            {
              id: 1,
              name: 'Twitter',
              url: 'https://twitter.com/',
            },
          ],
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
          socialMedias: [
            {
              id: 1,
              name: 'Twitter',
              url: 'https://twitter.com/',
            },
          ],
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
          socialMedias: [
            {
              id: 1,
              name: 'Twitter',
              url: 'https://twitter.com/',
            },
          ],
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
          socialMedias: [
            {
              id: 1,
              name: 'Twitter',
              url: 'https://twitter.com/',
            },
          ],
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
          socialMedias: [
            {
              id: 1,
              name: 'Twitter',
              url: 'https://twitter.com/',
            },
          ],
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
          socialMedias: [
            {
              id: 1,
              name: 'Twitter',
              url: 'https://twitter.com/',
            },
          ],
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
            `New member shares Blockchain knowledge.\n`,
            `Questions about practical transaction use.\n`,
            `Discussion on Bitcoin's fraud prevention.\n`,
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
            `Detailed overview of community conduct.\n`,
            `Questions about guidelines clarified.\n`,
            `Discussion on rule amendments and updates.\n`,
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
            `Explored the basics of getting started.\n`,
            `Discussed roles and server rules.\n`,
            `Clarified doubts about channel functionality.\n`,
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
            `Discussed Ethereum's potential in DeFi.\n`,
            `Shared latest Yield Farming strategies.\n`,
            `Debated over security concerns in DeFi.\n`,
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
            `Explored blockchain's distributed networks.\n`,
            `Inquired about practical transaction uses.\n`,
            `Discussed Bitcoin's tamper-proof shared transaction records.\n`,
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
            `Deep dive into Ethereum smart contracts.\n`,
            `Discussed the use of IPFS for DApp storage.\n`,
            `Exploring security aspects of blockchain coding.\n`,
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
            `Discussed the workings of decentralized networks.`,
            `Explored practical applications of NFTs in transactions.`,
            `Explored the concept of shared transaction records in Bitcoin.`,
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
            `Explored advanced techniques for smart contract development.\n`,
            `Asked about integrating decentralized identity solutions.\n`,
            `Discussed the benefits of using IPFS for data storage.\n`,
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
            `Discussed the mechanics of decentralized blockchain networks.`,
            `Explored practical applications of cryptocurrencies in transactions.`,
            `Examined how Bitcoin enables shared transaction records among participants.`,
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
            `Explored the intricacies of decentralized networks.`,
            `Inquired about practical applications in transactions.`,
            `Discussed how Bitcoin shares transaction records among participants to prevent tampering.`,
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
            'Explored deeper understanding of decentralized networks.',
            'Inquired about practical applications in transactions.',
            'Discussed how Bitcoin shares transaction records among all participants to prevent tampering.',
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
            `Discussed decentralized network in blockchain.\n`,
            `Inquired about practical applications in transactions.\n`,
            `For example, Bitcoin shares transaction records with all participants for tamper resistance.\n`,
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
            `Deepened understanding of decentralized networks in blockchain.`,
            `Asked how to utilize it in real transactions.`,
            `For example, in Bitcoin, transaction records are shared by all participants for tamper resistance.`,
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
            `Discussed the fundamentals of decentralized networks like blockchain.`,
            `Inquired about practical applications of blockchain in real transactions.`,
            `Explored how Bitcoin ensures tamper-proof transaction records through shared consensus.`,
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
            `Explored decentralized networks in blockchain.\n`,
            `Asked about real-world applications in transactions.\n`,
            `For example, Bitcoin shares transaction records among all participants to prevent tampering.\n`,
          ],
          inviteCode: '',
          category: {
            id: 3,
            name: 'Community',
          },
        },
      ],
      managementMembers: [
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
          socialMedias: [
            {
              id: 1,
              name: 'Twitter',
              url: 'https://twitter.com/',
            },
          ],
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
          socialMedias: [
            {
              id: 1,
              name: 'Twitter',
              url: 'https://twitter.com/',
            },
          ],
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
          socialMedias: [
            {
              id: 1,
              name: 'Twitter',
              url: 'https://twitter.com/',
            },
          ],
        },
      ],
      members: [
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
          socialMedias: [
            {
              id: 1,
              name: 'Twitter',
              url: 'https://twitter.com/',
            },
          ],
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
          socialMedias: [
            {
              id: 1,
              name: 'Twitter',
              url: 'https://twitter.com/',
            },
          ],
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
          socialMedias: [
            {
              id: 1,
              name: 'Twitter',
              url: 'https://twitter.com/',
            },
          ],
        },
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
          socialMedias: [
            {
              id: 1,
              name: 'Twitter',
              url: 'https://twitter.com/',
            },
          ],
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
          socialMedias: [
            {
              id: 1,
              name: 'Twitter',
              url: 'https://twitter.com/',
            },
          ],
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
          socialMedias: [
            {
              id: 1,
              name: 'Twitter',
              url: 'https://twitter.com/',
            },
          ],
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
          socialMedias: [
            {
              id: 1,
              name: 'Twitter',
              url: 'https://twitter.com/',
            },
          ],
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
          socialMedias: [
            {
              id: 1,
              name: 'Twitter',
              url: 'https://twitter.com/',
            },
          ],
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
          socialMedias: [
            {
              id: 1,
              name: 'Twitter',
              url: 'https://twitter.com/',
            },
          ],
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
          socialMedias: [
            {
              id: 1,
              name: 'Twitter',
              url: 'https://twitter.com/',
            },
          ],
        },
      ],
    },
  ];

  const server = servers.find((server) => server.id === Number(props.serverId));
  return server;
};
