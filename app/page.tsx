/*
To use Server Actions in Next.js, you'll need to be on a version of Next.js that supports this feature,
 which is introduced with Next.js 13 and above in the App Router. 
 Server Actions allow you to run server-side code directly from your components, 
 making it easier to handle server-side logic like fetching data, 
 updating databases, or interacting with files.
*/

import React from "react";
import { HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { dehydrate } from "@tanstack/query-core";
import { fetchConfig } from "../actions/fetchFlagsData";
import SearchFlagList from "../components/SearchFlag";
// import DispalyObjectTest from "../components/DispalyObjectTest";

const HomePage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["hydrate-flags"],
    queryFn: fetchConfig,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {/*HydrationBoundary is a wrapper that let you hydrate server fetched data
      down to the client components*/}
      <SearchFlagList />
      {/* <DispalyObjectTest /> */}
    </HydrationBoundary>
  );
};

export default HomePage;
