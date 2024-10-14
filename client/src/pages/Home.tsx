import React from "react";

const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl">Welcome to buzz.</h1>
      <p>This is the home page for logged-in users.</p>
    </div>
  );
};

export default Home;
