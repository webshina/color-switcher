import Head from 'next/head';

const HeadComponent = () => {
  return (
    <>
      <Head>
        <title>Discord Home AI</title>
        <meta
          name="description"
          content="Organize hard-to-see Discord server channels and members into a beautiful home page"
        />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1.0,minimum-scale=1.0"
        ></meta>
      </Head>
    </>
  );
};

export default HeadComponent;
