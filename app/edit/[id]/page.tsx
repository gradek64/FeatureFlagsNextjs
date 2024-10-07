import { HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { dehydrate } from "@tanstack/query-core";
import Modal from "../../../components/Modal";
// import Tabs from "../../../components/Tabs";
import Accordion from "../../../components/Accordion";
import TabsContent from "../../../components/TabsContent";
import { fetchConfig } from "../../../actions/fetchFlagsData";

export default async function EditFlagPage({
  params,
}: {
  params: { id: string; state: any };
}) {
  const { id } = params;

  const queryClient = new QueryClient();

  // Prefetch the data
  const serverData = await queryClient.prefetchQuery({
    queryKey: ["hydrate-flags"],
    queryFn: fetchConfig,
  });
  // Check if the data is in the cache
  const cachedData = queryClient.getQueryData(["hydrate-flags"]);

  const data = (cachedData || serverData) as Record<string, any>;

  //get types of values
  const flagValueType = typeof data[id];

  console.log("flagValueType", flagValueType);

  const tabs = [
    {
      label: `Simple Tab ${flagValueType.toUpperCase()}`,
      component: <TabsContent activeTab={0} flagValueType={flagValueType} />,
    },
    {
      label: `Complex Tab ${flagValueType.toUpperCase()}`,
      component: <TabsContent activeTab={1} flagValueType={flagValueType} />,
    },
  ];

  return (
    <Modal>
      <HydrationBoundary state={data || dehydrate(queryClient)}>
        <h2>Editing: {id}</h2>
        {/* <Tabs tabs={tabs} /> */}
        <Accordion />
      </HydrationBoundary>
    </Modal>
  );
}
