import Modal from "../../../components/Modal";
// import Tabs from "../../../components/Tabs";
import Accordion from "../../../components/Accordion";

export default async function EditFlagPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  return (
    <Modal>
      <h3>{id}</h3>
      {/* <Tabs tabs={tabs} /> */}
      <Accordion editFlag={id} />
    </Modal>
  );
}
