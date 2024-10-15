import { createLazyFileRoute } from "@tanstack/react-router";
import Signin from "../pages/Signin";

export const Route = createLazyFileRoute("/signin")({
  component: Signin,
});
