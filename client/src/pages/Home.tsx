import React from "react";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { useAuthRedirect } from "../hooks/useAuthRedirect";
import Card from "../components/Card";
import { SendHorizonal } from "lucide-react";
import { Button } from "../components/ui/button";
import { Textarea } from "../components/ui/textarea";

const Home: React.FC = () => {
  const { user, isLoading, error } = useCurrentUser();

  useAuthRedirect("/home");

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  if (error) return <div>Error: {error.message}</div>;
  if (!user) return null;

  const dummyPosts = [
    {
      id: 1,
      content: "Just launched a new feature! Check it out!",
      author: {
        name: "John Doe",
        image: "https://via.placeholder.com/150",
      },
    },
    {
      id: 2,
      content: "Excited to announce our latest product update!",
      author: {
        name: "Jane Smith",
        image: "https://via.placeholder.com/150",
      },
    },
    {
      id: 3,
      content: "What's your favorite programming language?",
      author: {
        name: "Alex Johnson",
        image: "https://via.placeholder.com/150",
      },
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <main className="flex-grow flex flex-col items-center p-4 bg-white dark:bg-black">
        <div className="w-full max-w-7xl">
          <h1 className="text-4xl font-bold mb-2 text-black dark:text-white">
            Hey, {user.firstName}!
          </h1>
          <div className="w-full space-y-px mt-5">
            <div className="w-full border border-gray-800 dark:border-gray-800 p-4 bg-white dark:bg-black text-black dark:text-white">
              <div className="flex items-start justify-center space-x-4">
                <img
                  src={user.profileImageUrl || "https://via.placeholder.com/40"}
                  alt={`${user.firstName}'s profile`}
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex-grow">
                  <Textarea
                    className="w-full h-24 bg-transparent resize-none outline-none placeholder-gray-500 focus:outline-none focus:bg-transparent dark:placeholder-gray-400 mt-2 border-none"
                    placeholder="What's buzzing?"
                  />
                  <div className="flex justify-start mt-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                    >
                      <SendHorizonal size={24} />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            {dummyPosts.map((post) => (
              <Card key={post.id} content={post.content} author={post.author} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
