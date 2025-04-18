import Sidebar from "@/components/fragments/Sidebar";

type Proptypes = {
  children: React.ReactNode;
};

const listItem = [
  {
    name: "Dashboard",
    url: "/admin",
    icon: "bx bxs-dashboard",
  },
  {
    name: "Products",
    url: "/admin/products",
    icon: "bx bxs-box",
  },
  {
    name: "Users",
    url: "/admin/users",
    icon: "bx bxs-group",
  },
];

const AdminLayout = (props: Proptypes) => {
  const { children } = props;

  return (
    <div className="flex flex-col lg:grid grid-cols-[288px_1fr] w-full">
      <Sidebar listItem={listItem} />
      <div className="p-5 lg:p-10 w-full">{children}</div>
    </div>
  );
};

export default AdminLayout;
