import ShimmerButton from "./components/ui/shimmer-button";
import { TextGenerateEffect } from "./components/ui/text-generate-effect";
import { Link } from "@tanstack/react-router";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow flex items-center justify-center">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 text-center">
          <h1 className="text-7xl sm:text-[120px] md:text-[170px] lg:text-[200px] xl:text-[270px] mb-4 sm:mb-6 md:mb-8">
            buzz.
          </h1>
          <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl mx-auto">
            <TextGenerateEffect words="Where the hive mind meets." />
          </div>
          <div className="flex justify-center mt-10">
            <Link to="/signup">
              <ShimmerButton>
                <div className="text-xl font-semibold">start today.</div>
              </ShimmerButton>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
