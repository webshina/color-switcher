export const useGuilds = () => {
  const categories = [
    {
      id: 1,
      name: '🪙 Web3.0',
      guilds: [
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
          iconImgURL: '/images/mockup/web3.0_icon.png',
          coverImgURL:
            '/images/mockup/shubham-s-web3-jrAru7fBwA8-unsplash.jpeg',
          category: {
            id: 1,
            name: 'Web3.0',
          },
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
          memberCnt: 1014,
        },
        {
          id: 2,
          name: 'web3.0 Engineer Community',
          description:
            "🌐 Welcome to the Web3.0 Engineer Community! This is a global space for innovation enthusiasts, developers, and visionaries who are deeply immersed in the world of Web 3.0. Here, we share cutting-edge blockchain solutions and decentralized technologies, discuss the latest ideas and trends shaping the future of the internet, strengthen each other through collaboration, mentorship, and knowledge exchange, and provide learning resources for everyone, from newcomers to veterans. Join us in shaping the decentralized future! 🎯🛠️ Together, let's design the next generation of the web. 🕸️🚀",
          iconImgURL: '/images/mockup/web3.0_icon_2.jpeg',
          coverImgURL: '/images/mockup/shubham-dhage-V7OKG7WAlV0-unsplash.jpeg',
          category: {
            id: 1,
            name: 'Web3.0',
          },
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
          memberCnt: 1014,
        },
      ],
    },
    {
      id: 2,
      name: '🧠 AI & Machine Learning',
      guilds: [
        {
          id: 2,
          name: 'AI Masters',
          description:
            '🧠 Welcome to the AI Masters Community! This is a hub for AI enthusiasts, researchers, developers, and thought leaders. Here, we share the latest breakthroughs and advancements in AI & ML, discuss novel ideas and trends shaping the future of technology, collaborate on projects and ideas, and offer resources for continuous learning. Join us to delve deeper into the world of AI! 🤖',
          iconImgURL:
            '/images/mockup/google-deepmind-mWztzk66I7Q-unsplash.jpeg',
          coverImgURL:
            '/images/mockup/andrea-de-santis-zwd435-ewb4-unsplash.jpeg',
          category: {
            id: 2,
            name: 'AI & Machine Learning',
          },
          tags: [
            {
              id: 4,
              name: 'AI',
            },
            {
              id: 5,
              name: 'machine learning',
            },
            {
              id: 6,
              name: 'deep learning',
            },
          ],
          memberCnt: 805,
        },
      ],
    },
    {
      id: 3,
      name: '🎮 Game',
      guilds: [
        {
          id: 3,
          name: 'Game Creators Guild',
          description:
            "🕹️ Welcome to the Game Creators Guild! This is a community for game developers, artists, designers, and enthusiasts. Here, we share our creations, discuss the latest trends and advancements in game technology, collaborate on projects, and offer resources for learning and development. Whether you're a professional developer or a passionate hobbyist, you're welcome here. Join us and let's create amazing games together! 🎮",
          iconImgURL: '/images/mockup/bird.png',
          coverImgURL:
            '/images/mockup/lorenzo-herrera-p0j-mE6mGo4-unsplash.jpeg',
          category: {
            id: 3,
            name: 'Game Development',
          },
          tags: [
            {
              id: 7,
              name: 'game development',
            },
            {
              id: 8,
              name: 'unity',
            },
            {
              id: 9,
              name: 'unreal engine',
            },
          ],
          memberCnt: 1200,
        },
      ],
    },
  ];
  return categories;
};
