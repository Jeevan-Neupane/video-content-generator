import {getSession} from "@auth0/nextjs-auth0";
import {addUserIfNotExists} from "@/lib/users";
import Login from "@/components/login";
import {redirect} from "next/navigation";

export default async function Home() {
  const session = await getSession();
  const user = session?.user;

  if (user) {
    await addUserIfNotExists(user);
    redirect("/dashboard");
  }

  return <Login />;
}
