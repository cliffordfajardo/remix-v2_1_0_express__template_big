import { LoaderFunctionArgs, defer } from "@remix-run/node";
import { Await, useLoaderData } from "@remix-run/react";
import { Suspense } from "react";

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const getUser = async () => {
  await sleep(4000)
  console.log('called getUser!')
  return "freddy"
}

export async function loader({ }: LoaderFunctionArgs) {
  return defer({
    foo: getUser,
  });
};


export default function Index() {
  const { foo } = useLoaderData<typeof loader>();

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <Suspense fallback={<p>Fallback .....</p>}>
        <Await resolve={foo}>
          {(foo) => (
            <div>{foo} from loader</div>
          )}
        </Await>
      </Suspense>
    </div>
  );
}