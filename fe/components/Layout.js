import Head from "next/head"

const Layout = ({ children }) => (
  <div className="container">
    <Head>
      <title>Plant tracker app</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main>
      <div className="max-w-7xl mx-auto px-6 md:px-8 pb-6">{children}</div>
    </main>

    <footer className="mt-8"></footer>
  </div>
)

export default Layout