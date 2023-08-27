import React, { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { sanityClient, urlFor } from "../../sanity";
import { Post } from "../../typings";
import { GetStaticProps } from "next";
import PortableText from "react-portable-text";
import { useForm, SubmitHandler } from "react-hook-form";
import { error } from "console";
import { useSession, signIn, signOut } from "next-auth/react";

interface Props {
  post: Post;
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

type Inputs = {
  _id: string;
  name: string;
  email: string;
  comment: string;
};

const Post = ({ post }: Props) => {
  const [submitted, setSubmitted] = useState(false);
  const [userErr, setUserErr] = useState("");
  const { data: session } = useSession();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    fetch("/api/createComment", {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then(() => {
        setSubmitted(true);
      })
      .catch((error) => {
        setSubmitted(false);
      });
  };

  const handleUserErr = () => {
    if (!session) {
      setUserErr("Please sign in to Comment");
    } else {
      setUserErr("");
    }
  };

  return (
    <div>
      <Header />
      {/*mainImage*/}
      <img
        className="w-full h-96 object-cover"
        src={urlFor(post.mainImage).url()}
        alt={post.title}
      />
      {/* Article */}
      <div
        className="max-w-3xl mx-auto mb-10
      "
      >
        <article className="w-full mx-auto p-5 bg-secondaryColor/5 leading-7 ">
          <h1 className="font-titleFont font-medium text-[32px] text-primary border-b-[1px] border-b-cyan-800 mt-10 mb-3">
            {post.title}
          </h1>
          <h2 className="font-bodyFont text-[18px] text-gray-500 mb-2">
            {post.description}
          </h2>
          <div className=" flex items-center gap-2">
            <img
              className="rounded-full w-12 h-12 object-cover bg-red-400"
              src={urlFor(post.author.image).url()!}
              alt={post.author.name}
            />
            <p>
              Post by <span>{post.author.name}</span> - Published at{" "}
              {new Date(post.publishedAt).toLocaleDateString()}
            </p>
          </div>
          <div className="mt-10 font-bodyFont">
            <PortableText
              dataset={dataset}
              projectId={projectId}
              content={post.body}
              serializers={{
                h1: (props: any) => (
                  <h1
                    className="text-3xl font-bold my-5 font-titleFont"
                    {...props}
                  />
                ),

                h2: (props: any) => (
                  <h2
                    className="text-2xl font-titleFont my-5 font-bold"
                    {...props}
                  />
                ),

                h3: (props: any) => (
                  <h3
                    className="text-2xl font-titleFont my-5 font-bold"
                    {...props}
                  />
                ),

                li: ({ children }: any) => (
                  <li className="ml-4 list-disc py-1">{children}</li>
                ),

                link: ({ href, children }: any) => (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-500 hover:underline"
                  >
                    {children}
                  </a>
                ),
              }}
            />
          </div>
        </article>
        <hr className="max-w-lg my-5 mx-auto border-[1px] border-y-secondaryColor " />

        {submitted ? (
          <div className="flex flex-col items-center gap-2 p-10 my-10 bg-bgColor text-white mx-auto">
            <h1 className="text-2xl font-bold">
              Thank you for submitting your comment!
            </h1>
            <p>Once it has been approved, it will appear below!</p>
          </div>
        ) : (
          <div>
            <p className="text-xs text-secondaryColor uppercase font-titleFont font-bold">
              Enjoyed this article?
            </p>
            <h3 className="font-titleFont text-3xl font-bold">
              Leave a comment below!
            </h3>
            <hr className="py-3 mt-2" />
            {/* Comment Form*/}
            <input
              {...register("_id")}
              type="hidden"
              name="_id"
              value={post._id}
            />
            <form
              className="mt-7 flex flex-col gap-6"
              onSubmit={handleSubmit(onSubmit)}
            >
              <label className="flex flex-col">
                <span className="font-titleFont font-semibold text-base">
                  Name
                </span>
                <input
                  {...register("name", { required: true })}
                  className="text-base placeholder:text-sm border-b-[1px] border-secondaryColor py-1 px-4 outline-none focus-within:shadow-xl shadow-secondaryColor"
                  type="text"
                  placeholder="Please enter your name"
                />
                {/*Error message*/}
                {errors.name && (
                  <p className="text-sm font-titleFont font-semibold text-red-500 my-1 px-4">
                    Name is required!
                  </p>
                )}
              </label>
              <label className="flex flex-col">
                <span className="font-titleFont font-semibold text-base">
                  Email
                </span>
                <input
                  {...register("email", { required: true })}
                  className="text-base placeholder:text-sm border-b-[1px] border-secondaryColor py-1 px-4 outline-none focus-within:shadow-xl shadow-secondaryColor"
                  type="email"
                  placeholder="Please enter your email"
                />
                {errors.email && (
                  <p className="text-sm font-titleFont font-semibold text-red-500 my-1 px-4">
                    Email is required!
                  </p>
                )}
              </label>
              <label className="flex flex-col">
                <span className="font-titleFont font-semibold text-base">
                  Comment
                </span>
                <textarea
                  {...register("comment", { required: true })}
                  className="text-base placeholder:text-sm border-b-[1px] border-secondaryColor py-1 px-4 outline-none focus-within:shadow-xl shadow-secondaryColor"
                  placeholder="Write your comment here"
                  rows={6}
                />
                {errors.comment && (
                  <p className="text-sm font-titleFont font-semibold text-red-500 my-1 px-4">
                    Please enter your comments!
                  </p>
                )}
              </label>
              {session && (
                <button
                  className="w-full bg-bgColor text-white text-base font-titleFont font-semibold tracking-wider uppercase py-2 rounded-sm hover:bg-secondaryColor duration-300"
                  type="submit"
                >
                  Submit
                </button>
              )}
            </form>
            {!session && (
              <button
                onClick={handleUserErr}
                className="w-full bg-bgColor text-white text-base font-titleFont font-semibold tracking-wider uppercase py-2 rounded-sm hover:bg-secondaryColor duration-300"
              >
                Submit
              </button>
            )}
            {userErr && (
              <p className="text-sm font-titleFont text-center font-semibold text-red-500  my-1 px-4 animate-bounce">
                <span className="text-base font-bold italic mr-2 ">!</span>
                {userErr}
              </p>
            )}
            {/* Comments */}
            <div className="w-full flex flex-col p-10 my-10 mx-auto shadow-bgColor shadow-lg space-y-2">
              <h3 className="text-3xl font-titleFont font-semibold">
                Comments
              </h3>
              <hr />
              {post.comments.map((comment) => (
                <div key={comment._id} className="py-3">
                  <div className="flex-1 border rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed">
                    <strong className="py-1 px-2 rounded-md bg-gray-200 text-secondaryColor">
                      {comment.name}
                    </strong>
                    <p className="text-sm font-bodyFont">{comment.comment}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Post;

export const getStaticPaths = async () => {
  const query = `*[_type == "post"]{
        _id,
        slug{
        current
        }
    }`;
  const posts = await sanityClient.fetch(query);
  const paths = posts.map((post: Post) => ({
    params: {
      slug: post.slug.current,
    },
  }));
  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `*[_type == "post" && slug.current == $slug][0]{
  _id,
  publishedAt,
    title,
    author -> {
      name,
      image,
    },
    "comments":*[_type == "comment" && post._ref == ^._id && approved == true],
    description,
    mainImage,
    slug,
    body
}`;
  const post = await sanityClient.fetch(query, { slug: params?.slug });
  if (!post) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      post,
    },
    revalidate: 60,
  };
};
