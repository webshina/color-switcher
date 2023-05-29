export const useServer = (props: { serverId: number }) => {
  const servers = [
    {
      id: 1,
      name: 'web3.0 Engineer Community',
      description:
        'web3.0エンジニアのためのコミュニティです。勉強会やイベントを開催しています。',
      coverImgURL: '/images/mockup/shubham-s-web3-jrAru7fBwA8-unsplash.jpeg',
      iconImgURL: '/images/mockup/icon.jpeg',
      featuredChannels: [
        {
          id: 1,
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
        },
        {
          id: 2,
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
        },
        {
          id: 3,
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
        },
        {
          id: 4,
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
        },
      ],
      categories: [
        {
          id: 1,
          name: 'GET STARTED',
          channels: [
            {
              id: 1,
              name: '👩‍🏫 ルール',
              description: 'このコミュニティの行動規範をチェックしてください',
              activityLevel: 0,
              inviteCode: '',
            },
            {
              id: 2,
              name: '🚀 はじめに',
              description: 'まずはここからスタートしましょう',
              activityLevel: 0,
              inviteCode: '',
            },
            {
              id: 3,
              name: '👋 自己紹介',
              description: '挨拶は大事。あなたのプロフィールを記載してください',
              activityLevel: 3,
              inviteCode: '',
            },
          ],
        },
        {
          id: 2,
          name: 'WEB3.0 エンジニアリング',
          channels: [
            {
              id: 1,
              name: '💻 技術質問',
              description: 'Web3.0に関する技術的な質問はここでどうぞ',
              activityLevel: 5,
              inviteCode: '',
            },
            {
              id: 2,
              name: '📘 チュートリアル',
              description:
                'Web3.0の学習リソースやチュートリアルを共有しましょう',
              activityLevel: 3,
              inviteCode: '',
            },
            {
              id: 3,
              name: '🔖 リソース共有',
              description: '有用なリソースやツールを共有してください',
              activityLevel: 4,
              inviteCode: '',
            },
          ],
        },
        {
          id: 3,
          name: 'プロジェクト & コラボレーション',
          channels: [
            {
              id: 1,
              name: '📢 プロジェクト発表',
              description:
                'あなたのプロジェクトを共有し、フィードバックを得ましょう',
              activityLevel: 4,
              inviteCode: '',
            },
            {
              id: 2,
              name: '🤝 チームメイト募集',
              description: 'チームメイトやコラボレーターを探すことができます',
              activityLevel: 2,
              inviteCode: '',
            },
            {
              id: 3,
              name: '🛠 プロジェクトヘルプ',
              description: 'プロジェクトの問題解決に協力しましょう',
              activityLevel: 3,
              inviteCode: '',
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
      name: 'Web3.0 Engineer Community',
      description:
        'A community for web3.0 engineers. We organize study groups and events.',
      coverImgURL: '/images/mockup/shubham-s-web3-jrAru7fBwA8-unsplash.jpeg',
      iconImgURL: '/images/mockup/icon.jpeg',
      featuredChannels: [
        {
          id: 1,
          name: '📚 Study Group',
          description: 'Study group for web3.0 engineers.',
          imageUrl:
            '/images/mockup/priscilla-du-preez-XkKCui44iM0-unsplash.jpeg',
          activityLevel: 3,
          conversationSummaries: [
            'Discussion: Prioritizing Proof of Stake Blockchain implementation and Zero Knowledge Proof learning.',
            'Resource Sharing: Sharing learning resources like Udemy courses, Zero-Knowledge University, GitHub repositories, etc.',
            'Technological Advancements: Information exchange regarding the transition from wagmi to viem, practical examples of Zero Knowledge Proof, etc.',
          ],
          inviteCode: '',
        },
        {
          id: 2,
          name: '🔧 Technical Questions',
          description:
            'Share technical questions and issues related to web3.0 development and find solutions.',
          imageUrl: '/images/mockup/emily-morter-8xAA0f9yQnE-unsplash.jpeg',
          activityLevel: 1,
          conversationSummaries: [
            'Discussion on the best testing methods for Smart Contracts.',
            'Sharing information about the comparison between Ethereum and Polkadot.',
            'Questions and answers about the use of Web3.0-related APIs and libraries.',
          ],
          inviteCode: '',
        },
        {
          id: 3,
          name: '💼 Job Opportunities',
          description:
            'A place to share job information and work opportunities in the web3.0 industry.',
          imageUrl:
            '/images/mockup/cytonn-photography-n95VMLxqM2I-unsplash.jpeg',
          activityLevel: 2,
          conversationSummaries: [
            'Sharing job opportunities from new Blockchain startups.',
            'Information exchange about freelancing projects in Web3.0 engineering.',
            'Questions and answers about career advice and interview preparation.',
          ],
          inviteCode: '',
        },
        {
          id: 4,
          name: '🚀 Project Showcase',
          description:
            'A place to showcase recent projects and achievements by members.',
          imageUrl: '/images/mockup/marvin-meyer-SYTO3xs06fU-unsplash.jpeg',
          activityLevel: 3,
          conversationSummaries: [
            'Demo and feedback on new Decentralized Applications (DApps).',
            'Sharing results and experiences from recent Web3.0-related hackathons.',
            'Individual code and design reviews and improvement suggestions.',
          ],
          inviteCode: '',
        },
      ],
      categories: [
        {
          id: 1,
          name: 'GET STARTED',
          channels: [
            {
              id: 1,
              name: '👩‍🏫 Rules',
              description: 'Check the code of conduct for this community.',
              activityLevel: 0,
              inviteCode: '',
            },
            {
              id: 2,
              name: '🚀 Introduction',
              description: 'Get started here.',
              activityLevel: 0,
              inviteCode: '',
            },
            {
              id: 3,
              name: '👋 Introductions',
              description: 'Introduce yourself and share your profile.',
              activityLevel: 3,
              inviteCode: '',
            },
          ],
        },
        {
          id: 2,
          name: 'WEB3.0 Engineering',
          channels: [
            {
              id: 1,
              name: '💻 Technical Questions',
              description: 'Ask technical questions related to Web3.0 here.',
              activityLevel: 5,
              inviteCode: '',
            },
            {
              id: 2,
              name: '📘 Tutorials',
              description: 'Share learning resources and tutorials for Web3.0.',
              activityLevel: 3,
              inviteCode: '',
            },
            {
              id: 3,
              name: '🔖 Resource Sharing',
              description: 'Share useful resources and tools.',
              activityLevel: 4,
              inviteCode: '',
            },
          ],
        },
        {
          id: 3,
          name: 'Projects & Collaboration',
          channels: [
            {
              id: 1,
              name: '📢 Project Presentations',
              description: 'Share your projects and get feedback.',
              activityLevel: 4,
              inviteCode: '',
            },
            {
              id: 2,
              name: '🤝 Team Recruitment',
              description: 'Find team members and collaborators.',
              activityLevel: 2,
              inviteCode: '',
            },
            {
              id: 3,
              name: '🛠 Project Help',
              description: 'Collaborate on project problem-solving.',
              activityLevel: 3,
              inviteCode: '',
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
            "I'm a data scientist working in Tokyo. Nice to meet you.",
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
          description: "I'm a designer working in Osaka. Nice to meet you.",
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
            "I'm a marketing manager working in Nagoya. Nice to meet you.",
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
            "I'm a business analyst working in Fukuoka. Nice to meet you.",
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
            "I'm a frontend engineer working in Sapporo. Nice to meet you.",
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
            "I'm a product manager working in Kyoto. Nice to meet you.",
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
          description: "I'm a data engineer working in Kobe. Nice to meet you.",
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
            "I'm a QA engineer working in Hiroshima. Nice to meet you.",
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
            "I'm a backend engineer working in Kumamoto. Nice to meet you.",
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
          description: "I'm a UX designer working in Sendai. Nice to meet you.",
          isBot: false,
        },
      ],
    },
  ];

  const server = servers.find((server) => server.id === Number(props.serverId));
  return server;
};
