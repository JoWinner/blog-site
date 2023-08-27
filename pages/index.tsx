import Head from "next/head";
import "slick-carousel/slick/slick.css";
import Banner from "../components/Banner";
import BannerBottom from "../components/BannerBottom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { sanityClient, urlFor } from "../sanity";
import { Post } from "../typings";
import Image from "next/image";
import Link from "next/link";

interface Props {
  posts: [Post];
  banners: {
    image: string;
    alt: string;
    loading: "lazy" | "eager" | undefined;
  }[];
}

export default function Home({ posts, banners }: Props) {
  return (
    <div>
      <Head>
        <title>My Blog | Explore the new horizon</title>
        <link rel="icon" href="/smallLogo.ico" />
      </Head>

      <main className="font-bodyFont">
        {/* ============ Header Start here ============ */}
        <Header />
        {/* ============ Header End here ============== */}
        {/* ============ Banner Start here ============ */}
        <Banner banners={banners} />
        {/* ============ Banner End here ============== */}
        <div className="max-w-7xl mx-auto h-60 relative">
          <BannerBottom />
        </div>
        {/* ============ Banner-Bottom End here ======= */}
        {/* ============ Post Part Start here ========= */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-2  py-6 px-3">
          {posts.map((post) => (
            <Link key={post._id} href={`/post/${post.slug.current}`}>
              <div className="border-[1px] border-secondaryColor border-opacity-40 h-[420px] group">
                <div className="h-3/5 w-full overflow-hidden">
                  <Image
                    width={380}
                    height={350}
                    src={urlFor(post.mainImage).url()!}
                    alt={post.title}
                    className="w-full h-full object-cover brightness-75 group-hover:brightness-100 duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="h-2/5 w-full">
                  <div className="flex gap-4 items-center px-2 py-2 border-b-[1px] border-b-gray-500">
                    <img
                      className="w-12 h-12 rounded-full object-cover"
                      src={urlFor(post.author.image).url()}
                      alt={post.author.name}
                    />
                    <p className="uppercase text-base tracking-wide">
                      {post.title}
                    </p>
                  </div>
                  <p className="py-3 px-2 text-sm">
                    {post.description.substring(0, 100)}... by -{" "}
                    <span className="font-semibold">{post.author.name}</span>
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
        {/* ============ Post Part End here =========== */}
        {/* ============ Footer Start here============= */}
        <Footer />
        {/* ============ Footer End here ============== */}
      </main>
    </div>
  );
}

export const getServerSideProps = async () => {
  const postQuery = `*[_type == "post"]{
    _id,
    title,
    author -> {
      name,
      image
    },
    description,
    mainImage,
    slug
  }`;

  const bannerQuery = `*[_type == "banner"] {
    image,
    alt,
    loading
  }`;

  try {
    const [posts, banners] = await Promise.all([
      sanityClient.fetch(postQuery),
      sanityClient.fetch(bannerQuery),
    ]);

    return {
      props: {
        posts,
        banners,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        posts: [],
        banners: [],
      },
    };
  }
};