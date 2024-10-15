import React from "react";
import { MessageCircle, Repeat2, Heart, Share } from "lucide-react";
import { Button } from "./ui/button";

interface CardProps {
  content: string;
  author: {
    name: string;
    image: string;
  };
}

const Card: React.FC<CardProps> = ({ content, author }) => {
  return (
    <div className="w-full border border-gray-800 dark:border-gray-800 p-4 bg-white dark:bg-black text-black dark:text-white">
      <div className="flex mb-3">
        <img
          src={author.image}
          alt={author.name}
          className="w-12 h-12 rounded-full mr-3"
        />
        <div>
          <span className="font-bold text-lg">{author.name}</span>
          <p className="text-base">{content}</p>
        </div>
      </div>
      <div className="flex justify-between text-gray-500 dark:text-gray-400 ml-12">
        <Button
          variant="ghost"
          size="icon"
          className="hover:text-black dark:hover:text-white"
        >
          <MessageCircle size={20} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="hover:text-black dark:hover:text-white"
        >
          <Repeat2 size={20} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="hover:text-black dark:hover:text-white"
        >
          <Heart size={20} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="hover:text-black dark:hover:text-white"
        >
          <Share size={20} />
        </Button>
      </div>
    </div>
  );
};

export default Card;
