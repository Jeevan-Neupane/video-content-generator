import {getSession} from "@auth0/nextjs-auth0";
import {addUserIfNotExists} from "@/lib/users";

export default async function Home() {
  const session = await getSession();
  const user = session?.user;

  if (user) {
    await addUserIfNotExists(user);
  }

  return (
    <div className="p-4 text-black">
      {user ? (
        <div>
          <h2>Welcome {user.name}!</h2>
          <a
            href="/api/auth/logout"
            className="text-blue-500 hover:text-blue-700"
          >
            Logout
          </a>
        </div>
      ) : (
        <a href="/api/auth/login" className="text-blue-500 hover:text-blue-700">
          Login
        </a>
      )}
    </div>
  );
}
